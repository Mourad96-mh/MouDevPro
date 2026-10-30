/**
 * Google Ads specifics: waste classification and change-history alerts.
 *
 * The waste list is read from ads/negative-keywords.md rather than
 * hard-coded, so maintaining that one file keeps detection current. Its
 * "do NOT negate these" section is honoured — those terms convert.
 */

import { readFileSync, existsSync } from "node:fs";

/** Seeds that earn their place from observed spend, not from the repo list. */
const OBSERVED_WASTE = [
  "gratis", "gratuit", "free", "liveweave", "opencart", "godaddy",
  "google site", "site google", "yolasite", "wix", "shopify", "blogger",
  "template", "demo", "tutorial", "cours", "formation", "apprendre",
  "website builder", "site builder", "no code", "webflow", "wordpress com",
];

/** Parse the repo's negative-keyword list into { block, keep } term sets. */
export function loadNegativeTerms(path) {
  if (!existsSync(path)) return { block: new Set(OBSERVED_WASTE), keep: new Set() };

  const md = readFileSync(path, "utf-8");
  const keep = new Set();
  const block = new Set(OBSERVED_WASTE);

  // Everything under the "do NOT negate" warning until the next h2 converts.
  const keepSection = md.split(/^##\s/m).find((s) => /do NOT negate/i.test(s)) ?? "";
  for (const m of keepSection.matchAll(/`([^`]+)`/g)) keep.add(m[1].toLowerCase().trim());

  // Fenced blocks under section 1 (hard negatives) are the block list.
  const hard = md.split(/^##\s/m).filter((s) => /^1\.\s*Hard negatives/i.test(s));
  for (const section of hard) {
    for (const fence of section.matchAll(/```([\s\S]*?)```/g)) {
      for (const line of fence[1].split("\n")) {
        const t = line.trim().toLowerCase();
        if (t && !t.startsWith("#")) block.add(t);
      }
    }
  }
  return { block, keep };
}

/** True when a search term looks like DIY / free / tooling intent. */
export function isWaste(term, { block, keep }) {
  const t = String(term).toLowerCase();
  for (const k of keep) if (t.includes(k)) return false;
  for (const b of block) if (b.length > 2 && t.includes(b)) return true;
  return false;
}

/**
 * Alerts from the change-history export. These are the patterns that
 * invalidate measurement, so they are surfaced before any metric.
 */
export function changeAlerts(rows) {
  const alerts = [];

  const status = rows.filter(
    (r) => r.resource_type === "CAMPAIGN" && r.changed_fields === "status"
  );
  if (status.length) {
    const days = new Set(status.map((r) => r.change_date_time.slice(0, 10)));
    const perDay = status.length / Math.max(days.size, 1);
    if (perDay >= 1.5) {
      alerts.push({
        level: "critical",
        title: `Campaigns are being switched on and off ${perDay.toFixed(1)}× a day`,
        detail:
          `${status.length} status changes across ${days.size} days. Smart Bidding cannot ` +
          `settle while this continues, so CPA and CPC comparisons below are unreliable.`,
      });
    }
  }

  const auto = rows.filter((r) => r.client_type === "GOOGLE_ADS_RECOMMENDATIONS");
  if (auto.length) {
    alerts.push({
      level: "critical",
      title: `Google auto-applied ${auto.length} change(s) to the account`,
      detail: auto
        .map((r) => `${r.change_date_time} · ${r.campaign || "account"} · ${r.changed_fields}`)
        .join("; "),
    });
  }

  const assets = rows.filter(
    (r) => r.resource_type === "ASSET" && r.client_type === "INTERNAL_TOOL"
  );
  if (assets.length >= 20) {
    alerts.push({
      level: "review",
      title: `Google auto-created ${assets.length} ad assets`,
      detail:
        "Automatically created assets write ad copy unreviewed. Check they do not " +
        "contradict the freelance voice rules in CLAUDE.md §8.",
    });
  }

  return alerts;
}

/** Distribution of spend across Quality Score bands. */
export function qsBands(rows) {
  const bands = new Map();
  let scored = 0;
  let weighted = 0;
  let weight = 0;

  for (const r of rows) {
    const qs = r.quality_score === "" ? null : Number(r.quality_score);
    const cost = Number(r.cost_mad || 0);
    if (qs === null || Number.isNaN(qs)) continue;
    scored++;
    weighted += qs * cost;
    weight += cost;
    const b = bands.get(qs) ?? { keywords: 0, cost: 0 };
    b.keywords++;
    b.cost += cost;
    bands.set(qs, b);
  }
  return { bands, scored, weightedQs: weight ? weighted / weight : 0 };
}

/** Share of spend on each landing-page-experience grade. */
export function landingPageMix(rows) {
  const mix = new Map();
  let total = 0;
  for (const r of rows) {
    if (!r.landing_page_exp) continue;
    const cost = Number(r.cost_mad || 0);
    mix.set(r.landing_page_exp, (mix.get(r.landing_page_exp) ?? 0) + cost);
    total += cost;
  }
  return { mix, total };
}
