// Core Web Vitals field data from the Chrome UX Report (CrUX) API.
//
// Why this exists: the Search Console API has no Core Web Vitals endpoint. The
// CWV report in the GSC UI is fed by CrUX, which is a separate service, so the
// only way to read those numbers programmatically is to query CrUX directly.
//
// Field data, not lab data — these are real Chrome visitors, the same source
// GSC reports on. Lighthouse gives lab numbers, which will not match.
//
// Zero dependencies: Node 18+ native fetch only. Read-only, no billing.
//
// Usage:  npm run cwv            (writes a dated report + prints a table)
//         npm run cwv -- --quiet (no file, just the table)

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");

const ORIGIN = "https://www.moudevpro.com";

// Origin-level first, then the pages that matter commercially. At this site's
// traffic level most individual URLs will have no CrUX record — that is an
// expected 404, not a failure. See NOTE at the bottom of the output.
const PAGES = [
  "/",
  "/casablanca",
  "/rabat",
  "/marrakech",
  "/tarifs",
  "/ecommerce",
  "/contact",
  "/france",
  "/blog/web-statistics-morocco-2026",
];

// [good, needs-improvement] upper bounds. Above the second value is "poor".
// Source: web.dev/vitals. LCP/INP/FCP/TTFB in ms, CLS unitless.
const THRESHOLDS = {
  largest_contentful_paint: [2500, 4000],
  interaction_to_next_paint: [200, 500],
  cumulative_layout_shift: [0.1, 0.25],
  first_contentful_paint: [1800, 3000],
  experimental_time_to_first_byte: [800, 1800],
};

const LABELS = {
  largest_contentful_paint: "LCP",
  interaction_to_next_paint: "INP",
  cumulative_layout_shift: "CLS",
  first_contentful_paint: "FCP",
  experimental_time_to_first_byte: "TTFB",
};

// The three metrics Google actually ranks on. The other two are diagnostic.
const CORE = ["largest_contentful_paint", "interaction_to_next_paint", "cumulative_layout_shift"];

function loadKey() {
  if (process.env.CRUX_API_KEY) return process.env.CRUX_API_KEY.trim();
  try {
    const env = readFileSync(join(repoRoot, ".env"), "utf-8");
    const line = env.split(/\r?\n/).find((l) => l.startsWith("CRUX_API_KEY="));
    if (line) {
      const value = line.slice("CRUX_API_KEY=".length).trim();
      if (value) return value;
    }
  } catch {
    /* no .env file — fall through to the error below */
  }
  console.error(
    [
      "",
      "  Missing CRUX_API_KEY.",
      "",
      "  1. https://console.cloud.google.com/apis/library/chromeuxreport.googleapis.com",
      "     → Enable",
      "  2. https://console.cloud.google.com/apis/credentials",
      "     → Create credentials → API key",
      "  3. cp .env.example .env  and paste the key into it",
      "",
      "  No billing is required. .env is gitignored.",
      "",
    ].join("\n")
  );
  process.exit(1);
}

function rate(metric, p75) {
  const t = THRESHOLDS[metric];
  if (!t) return "";
  if (p75 <= t[0]) return "good";
  if (p75 <= t[1]) return "needs work";
  return "POOR";
}

function format(metric, p75) {
  return metric === "cumulative_layout_shift" ? Number(p75).toFixed(3) : `${Math.round(p75)} ms`;
}

async function query(key, body) {
  const res = await fetch(
    `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (res.status === 404) return { noData: true };

  const json = await res.json();
  if (!res.ok) {
    const msg = json?.error?.message ?? `HTTP ${res.status}`;
    // A disabled API and a bad key both land here, and the messages are
    // similar enough to be confusing — spell out the likely cause.
    if (res.status === 403) {
      return { error: `${msg} (is the Chrome UX Report API enabled for this key?)` };
    }
    return { error: msg };
  }
  return { record: json.record };
}

const key = loadKey();
const targets = [
  { label: `${ORIGIN} (origin, PHONE)`, body: { origin: ORIGIN, formFactor: "PHONE" } },
  { label: `${ORIGIN} (origin, DESKTOP)`, body: { origin: ORIGIN, formFactor: "DESKTOP" } },
  ...PAGES.map((p) => ({ label: p, body: { url: ORIGIN + p } })),
];

const rows = [];
let period = null;

for (const t of targets) {
  const { record, noData, error } = await query(key, t.body);

  if (error) {
    console.error(`  ✗ ${t.label} — ${error}`);
    rows.push({ label: t.label, status: `error: ${error}` });
    continue;
  }
  if (noData) {
    console.log(`  – ${t.label} — no CrUX record (not enough traffic)`);
    rows.push({ label: t.label, status: "no data" });
    continue;
  }

  period ??= record.collectionPeriod;
  const metrics = {};
  for (const [name, data] of Object.entries(record.metrics ?? {})) {
    const p75 = data?.percentiles?.p75;
    if (p75 === undefined) continue;
    const n = Number(p75);
    metrics[name] = { p75: n, verdict: rate(name, n), text: format(name, n) };
  }

  const core = CORE.filter((m) => metrics[m]);
  const worst = core.some((m) => metrics[m].verdict === "POOR")
    ? "POOR"
    : core.some((m) => metrics[m].verdict === "needs work")
      ? "needs work"
      : "good";

  console.log(
    `  ✓ ${t.label} — ${worst}  ` +
      core.map((m) => `${LABELS[m]} ${metrics[m].text}`).join("  ")
  );
  rows.push({ label: t.label, status: worst, metrics });
}

if (process.argv.includes("--quiet")) process.exit(0);

// ── Markdown report ────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const cols = [...CORE, "first_contentful_paint", "experimental_time_to_first_byte"];

const periodText = period
  ? `${period.firstDate.year}-${String(period.firstDate.month).padStart(2, "0")}-${String(period.firstDate.day).padStart(2, "0")}` +
    ` → ${period.lastDate.year}-${String(period.lastDate.month).padStart(2, "0")}-${String(period.lastDate.day).padStart(2, "0")}`
  : "unknown";

const md = [
  `# Core Web Vitals (CrUX field data) — ${today}`,
  "",
  `> Source: Chrome UX Report API. **Field data** — real Chrome visitors, the same source behind`,
  `> the Core Web Vitals report in the Search Console UI. Lighthouse lab numbers will not match.`,
  `> Collection period: **${periodText}** (28-day rolling).`,
  "",
  `All values are the 75th percentile, which is what Google assesses against.`,
  "",
  `| Target | Verdict | ${cols.map((c) => LABELS[c]).join(" | ")} |`,
  `| --- | --- | ${cols.map(() => "---").join(" | ")} |`,
  ...rows.map((r) => {
    if (!r.metrics) return `| ${r.label} | ${r.status} | ${cols.map(() => "—").join(" | ")} |`;
    const cells = cols.map((c) => (r.metrics[c] ? `${r.metrics[c].text} (${r.metrics[c].verdict})` : "—"));
    return `| ${r.label} | **${r.status}** | ${cells.join(" | ")} |`;
  }),
  "",
  "## Thresholds",
  "",
  "| Metric | Good | Needs work | Poor |",
  "| --- | --- | --- | --- |",
  "| LCP | ≤ 2.5 s | ≤ 4.0 s | > 4.0 s |",
  "| INP | ≤ 200 ms | ≤ 500 ms | > 500 ms |",
  "| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |",
  "| FCP | ≤ 1.8 s | ≤ 3.0 s | > 3.0 s |",
  "| TTFB | ≤ 800 ms | ≤ 1800 ms | > 1800 ms |",
  "",
  "LCP, INP and CLS are the ranking-relevant Core Web Vitals; FCP and TTFB are diagnostic only.",
  "",
  "## Note on missing rows",
  "",
  '`no data` means CrUX has no record for that URL — it needs a minimum number of real Chrome',
  "visitors before Google will report it. At this site's traffic level that is expected for most",
  "individual pages, and origin-level figures are the reliable ones to track.",
  "",
].join("\n");

const outDir = join(repoRoot, "data", "cwv");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, `crux-${today}.md`);
writeFileSync(outPath, md, "utf-8");

console.log(`\n✅ Report written to data/cwv/crux-${today}.md`);
