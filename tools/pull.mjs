#!/usr/bin/env node
/**
 * `npm run pull` — turn dated exports in data/ into a "what moved" report.
 *
 * Two stages:
 *
 *   1. INGEST   Any raw MCP payloads dropped in tools/inbox/ are normalised
 *               into dated CSVs under data/. See tools/inbox/README.md.
 *   2. COMPARE  For every report type, the two most recent dated files are
 *               diffed and written to data/reports/changes-<date>.md.
 *
 * Fetching is deliberately NOT here. Search Console and Google Ads are reached
 * through MCP servers, which only the agent can call — a Node script has no way
 * in without its own OAuth credentials. So the agent fetches and drops JSON in
 * the inbox; everything after that is deterministic and lives in this file.
 * CrUX is the exception and self-fetches via `npm run cwv`.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCsv, toCsv, num } from "./lib/csv.mjs";
import { compare, total, weightedMean, topMovers, arrow, fmtDelta } from "./lib/compare.mjs";
import { loadNegativeTerms, isWaste, changeAlerts, qsBands, landingPageMix } from "./lib/ads.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(root, "data");
const INBOX = join(root, "tools", "inbox");
const REPORTS = join(DATA, "reports");
const today = new Date().toISOString().slice(0, 10);

const out = [];
const say = (s = "") => {
  out.push(s);
  console.log(s);
};

/* ── discovery ───────────────────────────────────────────────────────────── */

/** Every dated CSV in data/<source>/, grouped by report name, newest first. */
function datedFiles(source) {
  const dir = join(DATA, source);
  if (!existsSync(dir)) return new Map();
  const groups = new Map();
  for (const f of readdirSync(dir)) {
    const m = f.match(/^(.+)-(\d{4}-\d{2}-\d{2})\.csv$/);
    if (!m) continue;
    const [, report, date] = m;
    if (!groups.has(report)) groups.set(report, []);
    groups.get(report).push({ date, path: join(dir, f) });
  }
  for (const list of groups.values()) list.sort((a, b) => b.date.localeCompare(a.date));
  return groups;
}

const read = (p) => parseCsv(readFileSync(p, "utf-8"));

/* ── stage 1: ingest ─────────────────────────────────────────────────────── */

/** Flatten a GAQL row ({campaign:{name}, metrics:{...}}) using a field map. */
function flatten(row, map) {
  const get = (path) => path.split(".").reduce((o, k) => (o ?? {})[k], row);
  return Object.fromEntries(Object.entries(map).map(([col, path]) => [col, get(path) ?? ""]));
}

const INGEST = {
  "ads.campaigns": {
    dir: "ads",
    name: "campaigns",
    map: {
      campaign: "campaign.name",
      status: "campaign.status",
      bid_strategy: "campaign.biddingStrategyType",
      budget_micros: "campaignBudget.amountMicros",
      impressions: "metrics.impressions",
      clicks: "metrics.clicks",
      cost_micros: "metrics.costMicros",
      conversions: "metrics.conversions",
    },
  },
  "ads.search-terms": {
    dir: "ads",
    name: "search-terms",
    map: {
      search_term: "searchTermView.searchTerm",
      campaign: "campaign.name",
      impressions: "metrics.impressions",
      clicks: "metrics.clicks",
      cost_micros: "metrics.costMicros",
      conversions: "metrics.conversions",
    },
  },
};

function ingest() {
  if (!existsSync(INBOX)) return 0;
  const files = readdirSync(INBOX).filter((f) => f.endsWith(".json"));
  let written = 0;

  for (const f of files) {
    const spec = INGEST[f.replace(/\.json$/, "")];
    if (!spec) {
      say(`  ! no ingest rule for ${f} — skipped`);
      continue;
    }
    const raw = JSON.parse(readFileSync(join(INBOX, f), "utf-8"));
    const rows = (Array.isArray(raw) ? raw : (raw.results ?? [])).map((r) => flatten(r, spec.map));
    if (!rows.length) continue;

    // Money arrives in micro-units; store it readable.
    for (const r of rows) {
      if ("cost_micros" in r) {
        r.cost_mad = (Number(r.cost_micros || 0) / 1e6).toFixed(2);
        delete r.cost_micros;
      }
      if ("budget_micros" in r) {
        r.budget_mad = (Number(r.budget_micros || 0) / 1e6).toFixed(2);
        delete r.budget_micros;
      }
    }
    const dest = join(DATA, spec.dir, `${spec.name}-${today}.csv`);
    writeFileSync(dest, toCsv(rows), "utf-8");
    say(`  ingested ${f} → data/${spec.dir}/${spec.name}-${today}.csv (${rows.length} rows)`);
    written++;
  }
  return written;
}

/* ── stage 2: compare ────────────────────────────────────────────────────── */

const GSC_METRICS = {
  clicks: { field: "Clicks" },
  impressions: { field: "Impressions" },
  position: { field: "Position", lowerIsBetter: true },
};

function gscSection(report, label, keyCol, singular) {
  const files = datedFiles("gsc").get(report);
  if (!files?.length) return;

  const curr = read(files[0].path);
  say(`### ${label}`);
  say("");

  if (files.length < 2) {
    say(`Only one pull exists (${files[0].date}) — nothing to compare yet.`);
    say("");
    return;
  }

  const prev = read(files[1].path);
  const c = { clicks: total(curr, "Clicks"), impr: total(curr, "Impressions") };
  const p = { clicks: total(prev, "Clicks"), impr: total(prev, "Impressions") };
  const cPos = weightedMean(curr, "Position", "Impressions");
  const pPos = weightedMean(prev, "Position", "Impressions");

  say(`\`${files[1].date}\` → \`${files[0].date}\``);
  say("");
  say("| | Clicks | Impressions | CTR | Avg position |");
  say("| --- | --- | --- | --- | --- |");
  const ctr = (x) => (x.impr ? ((x.clicks / x.impr) * 100).toFixed(2) + "%" : "—");
  say(`| Previous | ${p.clicks} | ${p.impr.toLocaleString()} | ${ctr(p)} | ${pPos.toFixed(2)} |`);
  say(`| Current | ${c.clicks} | ${c.impr.toLocaleString()} | ${ctr(c)} | ${cPos.toFixed(2)} |`);
  const d = c.clicks - p.clicks;
  say(
    `| Change | **${d >= 0 ? "+" : ""}${d}** ${arrow(d >= 0)} | ` +
      `${c.impr - p.impr >= 0 ? "+" : ""}${(c.impr - p.impr).toLocaleString()} | | ` +
      `${(cPos - pPos).toFixed(2)} ${arrow(cPos < pPos)} |`
  );
  say("");

  const diff = compare(prev, curr, (r) => r[keyCol], GSC_METRICS);
  const movers = topMovers(diff.moved, "clicks", 8);
  if (movers.length) {
    say(`**Biggest click movers**`);
    say("");
    say(`| ${singular} | Clicks | Impressions | Position |`);
    say("| --- | --- | --- | --- |");
    for (const m of movers) {
      const k = m.deltas.clicks;
      const pos = m.deltas.position;
      say(
        `| ${m.key.slice(0, 58)} | ${k.before} → ${k.after} ${arrow(k.improved)} | ` +
          `${fmtDelta(m.deltas.impressions)} | ${pos.before.toFixed(1)} → ${pos.after.toFixed(
            1
          )} ${arrow(pos.improved)} |`
      );
    }
    say("");
  }

  const gained = diff.added.filter((a) => num(a.row.Clicks) > 0);
  const lost = diff.removed.filter((a) => num(a.row.Clicks) > 0);
  if (gained.length) say(`**New with clicks (${gained.length}):** ` + gained.slice(0, 10).map((g) => g.key).join(" · "));
  if (lost.length) say(`**Lost (had clicks) (${lost.length}):** ` + lost.slice(0, 10).map((g) => g.key).join(" · "));
  if (gained.length || lost.length) say("");
}

function adsSection() {
  const groups = datedFiles("ads");

  const ch = groups.get("change-history");
  if (ch?.length) {
    const alerts = changeAlerts(read(ch[0].path));
    if (alerts.length) {
      say("### Alerts");
      say("");
      say("These invalidate measurement — read them before any number below.");
      say("");
      for (const a of alerts) {
        say(`- **${a.level === "critical" ? "⚠ " : ""}${a.title}** — ${a.detail}`);
      }
      say("");
    }
  }

  const qs = groups.get("keywords-quality-score");
  if (qs?.length) {
    const curr = read(qs[0].path);
    const { bands, scored, weightedQs } = qsBands(curr);
    const { mix, total: mixTotal } = landingPageMix(curr);
    say("### Quality Score");
    say("");
    say(
      `Spend-weighted **${weightedQs.toFixed(2)}** across ${scored} scored keywords ` +
        `(${curr.length} total).`
    );
    say("");
    say("| QS | Keywords | Spend | Share |");
    say("| --- | --- | --- | --- |");
    const grand = [...bands.values()].reduce((s, b) => s + b.cost, 0);
    for (const q of [...bands.keys()].sort((a, b) => b - a)) {
      const b = bands.get(q);
      say(
        `| ${q} | ${b.keywords} | ${b.cost.toFixed(2)} MAD | ` +
          `${grand ? ((b.cost / grand) * 100).toFixed(1) : "0"}% |`
      );
    }
    say("");
    if (mixTotal) {
      const parts = [...mix.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k.toLowerCase().replace(/_/g, " ")} ${((v / mixTotal) * 100).toFixed(0)}%`);
      say(`**Landing page experience by spend:** ${parts.join(" · ")}`);
      say("");
    }

    if (qs.length >= 2) {
      const prev = read(qs[1].path);
      const diff = compare(prev, curr, (r) => `${r.campaign}|${r.keyword}|${r.match_type}`, {
        qs: { field: "quality_score" },
      });
      const shifted = diff.moved.filter((m) => m.deltas.qs.before && m.deltas.qs.after);
      if (shifted.length) {
        say(`**Quality Score changes since ${qs[1].date}**`);
        say("");
        for (const m of shifted.slice(0, 12)) {
          const d = m.deltas.qs;
          say(`- ${m.key.split("|")[1]} — ${d.before} → ${d.after} ${arrow(d.improved)}`);
        }
        say("");
      }
    }
  }

  const st = groups.get("search-terms");
  if (st?.length) {
    const terms = loadNegativeTerms(join(root, "ads", "negative-keywords.md"));
    const curr = read(st[0].path);
    const wasteful = curr
      .filter((r) => isWaste(r.search_term, terms) && num(r.cost_mad) > 0)
      .sort((a, b) => num(b.cost_mad) - num(a.cost_mad));
    if (wasteful.length) {
      const cost = wasteful.reduce((s, r) => s + num(r.cost_mad), 0);
      const all = curr.reduce((s, r) => s + num(r.cost_mad), 0);
      say("### Wasteful search terms");
      say("");
      say(
        `${wasteful.length} terms · **${cost.toFixed(2)} MAD** ` +
          `(${all ? ((cost / all) * 100).toFixed(1) : "0"}% of attributed spend)`
      );
      say("");
      say("| Term | Cost | Clicks | Conv |");
      say("| --- | --- | --- | --- |");
      for (const r of wasteful.slice(0, 15)) {
        say(`| ${r.search_term} | ${num(r.cost_mad).toFixed(2)} | ${r.clicks} | ${r.conversions} |`);
      }
      say("");
      say("Add these to the shared negative list, then update `ads/negative-keywords.md`.");
      say("");
    }
  }

  const camp = groups.get("campaigns");
  if (camp?.length >= 2) {
    const curr = read(camp[0].path);
    const prev = read(camp[1].path);
    const cpa = (r) => (num(r.conversions) ? num(r.cost_mad) / num(r.conversions) : 0);
    say(`### Campaigns · \`${camp[1].date}\` → \`${camp[0].date}\``);
    say("");
    say("| Campaign | Spend | Conv | CPA | Change |");
    say("| --- | --- | --- | --- | --- |");
    for (const c of curr) {
      const p = prev.find((x) => x.campaign === c.campaign);
      const now = cpa(c);
      const before = p ? cpa(p) : 0;
      const delta = before ? now - before : 0;
      say(
        `| ${c.campaign} | ${num(c.cost_mad).toFixed(2)} | ${c.conversions} | ` +
          `${now.toFixed(2)} | ${before ? `${delta >= 0 ? "+" : ""}${delta.toFixed(2)} ${arrow(delta < 0)}` : "—"} |`
      );
    }
    say("");
  }
}

/* ── run ─────────────────────────────────────────────────────────────────── */

console.log(`\nData pull — ${today}\n`);
const ingested = ingest();
if (ingested) console.log("");

out.length = 0;
say(`# Data changes — ${today}`);
say("");
say("Generated by `npm run pull`. Compares the two most recent dated exports per report.");
say("");
say("## Search Console");
say("");
gscSection("pages", "Pages", "Top pages", "Page");
gscSection("queries", "Queries", "Top queries", "Query");
say("## Google Ads");
say("");
adsSection();

const cwv = existsSync(join(DATA, "cwv"))
  ? readdirSync(join(DATA, "cwv")).sort().reverse()[0]
  : null;
say("## Core Web Vitals");
say("");
say(cwv ? `Latest: \`data/cwv/${cwv}\` — refresh with \`npm run cwv\`.` : "No CrUX report yet.");
say("");

mkdirSync(REPORTS, { recursive: true });
const dest = join(REPORTS, `changes-${today}.md`);
writeFileSync(dest, out.join("\n"), "utf-8");
console.log(`\n✅ Report written to data/reports/changes-${today}.md\n`);
