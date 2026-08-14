#!/usr/bin/env node
/**
 * Google Business Profile MCP server — local, zero-dependency.
 *
 * Speaks MCP over stdio (JSON-RPC 2.0, newline-delimited) using nothing but
 * Node 22 built-ins and global fetch. No SDK, no third-party proxy: the OAuth
 * refresh token stays on this machine and talks straight to Google.
 *
 * Why hand-rolled: the hosted GBP connectors (Porter, Windsor, Two Minute
 * Reports) route your business data through their servers, are read-only, and
 * charge monthly. Same reasoning as ads/docx.py — the surface we need is small
 * enough that owning it beats depending on it.
 *
 * ── Prerequisite that is NOT optional ────────────────────────────────────────
 * The Business Profile APIs return nothing until Google approves your Cloud
 * project. Check Cloud Console → APIs & Services → Quotas:
 *     0 QPM   = still pending, every call below will 403
 *     300 QPM = approved
 * See https://developers.google.com/my-business/content/prereqs
 *
 * ── Credentials ──────────────────────────────────────────────────────────────
 * Unlike the `gsc` server, this cannot use a service account: a
 * *.gserviceaccount.com address cannot be added as a manager on a Business
 * Profile, so the API needs OAuth consent from a real owner/manager account.
 *
 *   GBP_CLIENT_ID       OAuth 2.0 client ID (Desktop app)
 *   GBP_CLIENT_SECRET   OAuth 2.0 client secret
 *   GBP_REFRESH_TOKEN   refresh token for the owner/manager Google account
 *   GBP_ALLOW_WRITES    optional; set to "1" to enable gbp_reply_to_review
 *
 * Scope required: https://www.googleapis.com/auth/business.manage
 *
 * ── Register with Claude Code ────────────────────────────────────────────────
 * Use the default `local` scope. It stores the entry in ~/.claude.json, outside
 * the repo — same place the `gsc` server lives. Do NOT use --scope project:
 * that writes .mcp.json *inside* the repo, and these are OAuth secrets.
 *
 *   node tools/gbp-mcp.mjs --auth        # once, to mint the refresh token
 *
 *   claude mcp add gbp \
 *     --env GBP_CLIENT_ID=... --env GBP_CLIENT_SECRET=... \
 *     --env GBP_REFRESH_TOKEN=... \
 *     -- node ./tools/gbp-mcp.mjs
 *
 * Then restart Claude Code and run /mcp to confirm it connected.
 */

import { createInterface } from "node:readline";

const PROTOCOL_VERSION = "2026-07-28";
const SCOPE = "https://www.googleapis.com/auth/business.manage";

// Google split GBP across several hosts. Reviews were never migrated off the
// legacy v4 service, so replying to a review uses a different host from
// everything else — that is expected, not a mistake.
const ACCOUNTS = "https://mybusinessaccountmanagement.googleapis.com/v1";
const INFO = "https://mybusinessbusinessinformation.googleapis.com/v1";
const PERF = "https://businessprofileperformance.googleapis.com/v1";
const V4 = "https://mybusiness.googleapis.com/v4";

const DAILY_METRICS = [
  "BUSINESS_IMPRESSIONS_DESKTOP_MAPS",
  "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH",
  "BUSINESS_IMPRESSIONS_MOBILE_MAPS",
  "BUSINESS_IMPRESSIONS_MOBILE_SEARCH",
  "BUSINESS_CONVERSATIONS",
  "BUSINESS_DIRECTION_REQUESTS",
  "CALL_CLICKS",
  "WEBSITE_CLICKS",
  "BUSINESS_BOOKINGS",
  "BUSINESS_FOOD_ORDERS",
  "BUSINESS_FOOD_MENU_CLICKS",
];

const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

// stdout is the protocol channel — anything human-readable must go to stderr.
const log = (...a) => process.stderr.write(a.join(" ") + "\n");

/* ───────────────────────────── auth ───────────────────────────────────────── */

let cached = { token: null, expires: 0 };

async function accessToken() {
  if (cached.token && Date.now() < cached.expires - 60_000) return cached.token;

  const { GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN } = process.env;
  const missing = ["GBP_CLIENT_ID", "GBP_CLIENT_SECRET", "GBP_REFRESH_TOKEN"]
    .filter((k) => !process.env[k]);
  if (missing.length) throw new Error(`Missing env: ${missing.join(", ")}`);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GBP_CLIENT_ID,
      client_secret: GBP_CLIENT_SECRET,
      refresh_token: GBP_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Token refresh failed (${res.status}): ${body.error_description || body.error || "unknown"}`,
    );
  }
  cached = { token: body.access_token, expires: Date.now() + body.expires_in * 1000 };
  return cached.token;
}

async function api(url, init = {}) {
  const token = await accessToken();
  const res = await fetch(url, {
    ...init,
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json", ...init.headers },
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const msg = body?.error?.message || res.statusText;
    // The single most common failure, worth naming explicitly rather than
    // letting it surface as a bare 403.
    if (res.status === 403 && /quota|permission/i.test(msg)) {
      throw new Error(
        `${res.status}: ${msg}\n\nIf your quota reads 0 QPM in Cloud Console, the project is ` +
          `not approved yet — that is the cause, not the credentials. Scope needed: ${SCOPE}`,
      );
    }
    throw new Error(`${res.status}: ${msg}`);
  }
  return body;
}

/* ───────────────────────────── helpers ────────────────────────────────────── */

const ymd = (d) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
  if (!m) throw new Error(`Date must be YYYY-MM-DD, got "${d}"`);
  return { year: +m[1], month: +m[2], day: +m[3] };
};

// Business Information returns "locations/123"; the v4 reviews service wants
// "accounts/456/locations/123". Accept either form from the caller.
const locId = (s) => String(s).split("/").pop();

/* ───────────────────────────── tools ──────────────────────────────────────── */

const TOOLS = [
  {
    name: "gbp_list_locations",
    description:
      "List Business Profile accounts and their locations (id, name, address, website). " +
      "Run this first — every other tool needs a location id.",
    inputSchema: { type: "object", properties: {} },
    async run() {
      const { accounts = [] } = await api(`${ACCOUNTS}/accounts`);
      if (!accounts.length) return "No accounts found for this Google account.";

      const out = [];
      for (const acc of accounts) {
        out.push(`${acc.name}  ${acc.accountName || ""} (${acc.type || "?"})`);
        const readMask = "name,title,storefrontAddress,websiteUri,phoneNumbers";
        const { locations = [] } = await api(
          `${INFO}/${acc.name}/locations?readMask=${readMask}&pageSize=100`,
        );
        if (!locations.length) out.push("    (no locations)");
        for (const l of locations) {
          const a = l.storefrontAddress;
          const where = a ? [a.locality, a.administrativeArea].filter(Boolean).join(", ") : "";
          out.push(`    ${l.name}  ${l.title || ""}${where ? `  — ${where}` : ""}`);
          if (l.websiteUri) out.push(`        ${l.websiteUri}`);
        }
      }
      return out.join("\n");
    },
  },

  {
    name: "gbp_performance",
    description:
      "Daily performance metrics for one location over a date range: impressions (Search/Maps, " +
      "desktop/mobile), website clicks, calls, direction requests. Returns a per-day table plus totals.",
    inputSchema: {
      type: "object",
      required: ["location", "start_date", "end_date"],
      properties: {
        location: { type: "string", description: 'Location id, e.g. "locations/123" or "123"' },
        start_date: { type: "string", description: "YYYY-MM-DD" },
        end_date: { type: "string", description: "YYYY-MM-DD" },
        metrics: {
          type: "array",
          items: { type: "string", enum: DAILY_METRICS },
          description: `Defaults to website clicks, calls, directions and both search impression types.`,
        },
      },
    },
    async run({ location, start_date, end_date, metrics }) {
      const chosen = metrics?.length
        ? metrics
        : [
            "WEBSITE_CLICKS",
            "CALL_CLICKS",
            "BUSINESS_DIRECTION_REQUESTS",
            "BUSINESS_IMPRESSIONS_MOBILE_SEARCH",
            "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH",
          ];
      const bad = chosen.filter((m) => !DAILY_METRICS.includes(m));
      if (bad.length) throw new Error(`Unknown metric(s): ${bad.join(", ")}`);

      const s = ymd(start_date);
      const e = ymd(end_date);
      const q = new URLSearchParams();
      for (const m of chosen) q.append("dailyMetrics", m);
      for (const [k, v] of Object.entries(s)) q.set(`dailyRange.start_date.${k}`, v);
      for (const [k, v] of Object.entries(e)) q.set(`dailyRange.end_date.${k}`, v);

      const url = `${PERF}/locations/${locId(location)}:fetchMultiDailyMetricsTimeSeries?${q}`;
      const body = await api(url);

      // Response nests one series per metric; flatten into date -> {metric: value}.
      const byDate = new Map();
      const series = body.multiDailyMetricTimeSeries || [];
      for (const outer of series) {
        for (const s2 of outer.dailyMetricTimeSeries || []) {
          const metric = s2.dailyMetric;
          for (const dv of s2.timeSeries?.datedValues || []) {
            const key = `${dv.date.year}-${String(dv.date.month).padStart(2, "0")}-${String(dv.date.day).padStart(2, "0")}`;
            if (!byDate.has(key)) byDate.set(key, {});
            byDate.get(key)[metric] = Number(dv.value || 0);
          }
        }
      }
      if (!byDate.size) return "No data returned for that range.";

      const dates = [...byDate.keys()].sort();
      const head = ["date", ...chosen.map((m) => m.replace(/^BUSINESS_/, ""))];
      const rows = dates.map((d) => [d, ...chosen.map((m) => byDate.get(d)[m] ?? 0)]);
      const totals = chosen.map((m) => rows.reduce((n, r, i) => n + (byDate.get(dates[i])[m] ?? 0), 0));

      const w = head.map((h, i) => Math.max(h.length, ...rows.map((r) => String(r[i]).length)));
      const line = (cells) => cells.map((c, i) => String(c).padEnd(w[i])).join("  ");
      return [
        line(head),
        ...rows.map(line),
        "",
        line(["TOTAL", ...totals]),
      ].join("\n");
    },
  },

  {
    name: "gbp_list_reviews",
    description:
      "List reviews for a location: rating, author, text, date, and whether you have already " +
      "replied. Use unanswered_only to find the ones still waiting on a reply.",
    inputSchema: {
      type: "object",
      required: ["account", "location"],
      properties: {
        account: { type: "string", description: 'Account id, e.g. "accounts/456" or "456"' },
        location: { type: "string", description: 'Location id, e.g. "locations/123" or "123"' },
        unanswered_only: { type: "boolean", description: "Only reviews with no reply yet" },
        limit: { type: "number", description: "Max reviews to return (default 20)" },
      },
    },
    async run({ account, location, unanswered_only, limit = 20 }) {
      const path = `accounts/${locId(account)}/locations/${locId(location)}`;
      const body = await api(`${V4}/${path}/reviews?pageSize=${Math.min(limit, 50)}`);
      let reviews = body.reviews || [];
      if (unanswered_only) reviews = reviews.filter((r) => !r.reviewReply);
      if (!reviews.length) return unanswered_only ? "No unanswered reviews." : "No reviews found.";

      const header =
        `${body.totalReviewCount ?? reviews.length} reviews · average ` +
        `${body.averageRating?.toFixed?.(2) ?? "?"}★\n`;

      return (
        header +
        reviews
          .slice(0, limit)
          .map((r) => {
            const stars = STARS[r.starRating] ?? "?";
            const when = (r.createTime || "").slice(0, 10);
            const who = r.reviewer?.displayName || "Anonymous";
            const replied = r.reviewReply
              ? `REPLIED ${(r.reviewReply.updateTime || "").slice(0, 10)}: ${r.reviewReply.comment}`
              : "NO REPLY YET";
            return [
              `${"★".repeat(Number(stars) || 0)}${"☆".repeat(5 - (Number(stars) || 0))}  ${who}  ${when}`,
              `  id: ${r.reviewId}`,
              r.comment ? `  ${r.comment.replace(/\n/g, "\n  ")}` : "  (rating only, no text)",
              `  → ${replied}`,
            ].join("\n");
          })
          .join("\n\n")
      );
    },
  },

  {
    name: "gbp_reply_to_review",
    description:
      "Publish a public reply to a review. WRITE OPERATION — visible immediately on your " +
      "Business Profile. Disabled unless GBP_ALLOW_WRITES=1 is set.",
    inputSchema: {
      type: "object",
      required: ["account", "location", "review_id", "comment"],
      properties: {
        account: { type: "string", description: 'Account id, e.g. "accounts/456"' },
        location: { type: "string", description: 'Location id, e.g. "locations/123"' },
        review_id: { type: "string", description: "reviewId from gbp_list_reviews" },
        comment: { type: "string", description: "The public reply text" },
      },
    },
    async run({ account, location, review_id, comment }) {
      if (process.env.GBP_ALLOW_WRITES !== "1") {
        throw new Error(
          "Writes are disabled. This would post a public reply on the live profile. " +
            "Set GBP_ALLOW_WRITES=1 in the server env to enable it.",
        );
      }
      if (!comment?.trim()) throw new Error("comment is empty");

      const path = `accounts/${locId(account)}/locations/${locId(location)}/reviews/${review_id}`;
      const body = await api(`${V4}/${path}/reply`, {
        method: "PUT",
        body: JSON.stringify({ comment }),
      });
      return `Reply published ${(body.updateTime || "").slice(0, 10)}:\n${body.comment}`;
    },
  },
];

/* ───────────────────────────── one-time auth ──────────────────────────────── */

/**
 * `node tools/gbp-mcp.mjs --auth` — run once to mint GBP_REFRESH_TOKEN.
 *
 * Spins a throwaway listener on 127.0.0.1 to catch the OAuth redirect, so the
 * code never has to be copy-pasted out of a URL bar. Needs GBP_CLIENT_ID and
 * GBP_CLIENT_SECRET in the environment; prints the refresh token and exits.
 */
async function authFlow() {
  const { createServer } = await import("node:http");
  const { GBP_CLIENT_ID, GBP_CLIENT_SECRET } = process.env;
  if (!GBP_CLIENT_ID || !GBP_CLIENT_SECRET) {
    console.error("Set GBP_CLIENT_ID and GBP_CLIENT_SECRET first (OAuth 2.0 'Desktop app' client).");
    process.exit(1);
  }

  const code = await new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, "http://127.0.0.1");
      const c = url.searchParams.get("code");
      const err = url.searchParams.get("error");
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(`<p>${c ? "Authorised — you can close this tab." : `Failed: ${err}`}</p>`);
      server.close();
      c ? resolve(c) : reject(new Error(err || "no code returned"));
    });
    server.listen(0, "127.0.0.1", () => {
      const redirect = `http://127.0.0.1:${server.address().port}`;
      const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      auth.search = new URLSearchParams({
        client_id: GBP_CLIENT_ID,
        redirect_uri: redirect,
        response_type: "code",
        scope: SCOPE,
        access_type: "offline", // required for a refresh token
        prompt: "consent", // force one even if previously granted
      }).toString();
      console.log("\nOpen this URL and sign in as an OWNER/MANAGER of the profile:\n");
      console.log(auth.toString() + "\n");
      server.once("close", () => {});
      process.once("SIGINT", () => { server.close(); process.exit(1); });
      // Stash for the exchange step below.
      authFlow.redirect = redirect;
    });
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: GBP_CLIENT_ID,
      client_secret: GBP_CLIENT_SECRET,
      redirect_uri: authFlow.redirect,
      grant_type: "authorization_code",
    }),
  });
  const body = await res.json();
  if (!res.ok || !body.refresh_token) {
    console.error(`Exchange failed: ${body.error_description || body.error || res.status}`);
    if (res.ok) console.error("No refresh_token returned — revoke prior access and retry.");
    process.exit(1);
  }
  console.log("GBP_REFRESH_TOKEN=" + body.refresh_token + "\n");
  console.log("Store it with the server registration; it does not expire unless revoked.");
  process.exit(0);
}

if (process.argv.includes("--auth")) {
  await authFlow();
}

/* ───────────────────────────── JSON-RPC loop ──────────────────────────────── */

const send = (msg) => process.stdout.write(JSON.stringify(msg) + "\n");
const ok = (id, result) => send({ jsonrpc: "2.0", id, result });
const fail = (id, code, message) => send({ jsonrpc: "2.0", id, error: { code, message } });

async function handle(msg) {
  const { id, method, params } = msg;

  // Notifications carry no id and expect no response.
  if (id === undefined) return;

  switch (method) {
    case "initialize":
      return ok(id, {
        // Echo the client's version when it offers one, so this keeps working
        // as the spec revs rather than pinning to whatever was current today.
        protocolVersion: params?.protocolVersion || PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: "gbp", version: "1.0.0" },
      });

    case "ping":
      return ok(id, {});

    case "tools/list":
      return ok(id, {
        tools: TOOLS.map(({ name, description, inputSchema }) => ({
          name,
          description,
          inputSchema,
        })),
      });

    case "tools/call": {
      const tool = TOOLS.find((t) => t.name === params?.name);
      if (!tool) return fail(id, -32602, `Unknown tool: ${params?.name}`);
      try {
        const text = await tool.run(params.arguments || {});
        return ok(id, { content: [{ type: "text", text }] });
      } catch (err) {
        // Tool-level failures belong in the result with isError, not as a
        // JSON-RPC error — that way the model can read and react to them.
        return ok(id, { content: [{ type: "text", text: `Error: ${err.message}` }], isError: true });
      }
    }

    default:
      return fail(id, -32601, `Method not found: ${method}`);
  }
}

createInterface({ input: process.stdin }).on("line", (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return fail(null, -32700, "Parse error");
  }
  handle(msg).catch((err) => {
    log(`[gbp] unhandled: ${err.stack || err.message}`);
    if (msg?.id !== undefined) fail(msg.id, -32603, err.message);
  });
});

log("[gbp] ready on stdio");
