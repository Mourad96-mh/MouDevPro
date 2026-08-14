/**
 * Generic "what moved since last pull" comparison.
 *
 * Every dataset here is a keyed table (a query, a page, a keyword, a campaign),
 * so one comparator covers all of them. Callers say how to key a row and which
 * numeric fields matter; this returns movers, arrivals and departures.
 */

import { num } from "./csv.mjs";

/**
 * @param {object[]} prev  rows from the previous pull
 * @param {object[]} curr  rows from this pull
 * @param {(r:object)=>string} key
 * @param {Record<string,{field:string, lowerIsBetter?:boolean}>} metrics
 */
export function compare(prev, curr, key, metrics) {
  const p = new Map(prev.map((r) => [key(r), r]));
  const c = new Map(curr.map((r) => [key(r), r]));

  const moved = [];
  for (const [k, cr] of c) {
    const pr = p.get(k);
    if (!pr) continue;
    const deltas = {};
    let changed = false;
    for (const [name, spec] of Object.entries(metrics)) {
      const before = num(pr[spec.field]);
      const after = num(cr[spec.field]);
      const delta = after - before;
      if (delta !== 0) changed = true;
      deltas[name] = {
        before,
        after,
        delta,
        improved: spec.lowerIsBetter ? delta < 0 : delta > 0,
      };
    }
    if (changed) moved.push({ key: k, row: cr, deltas });
  }

  return {
    moved,
    added: [...c.keys()].filter((k) => !p.has(k)).map((k) => ({ key: k, row: c.get(k) })),
    removed: [...p.keys()].filter((k) => !c.has(k)).map((k) => ({ key: k, row: p.get(k) })),
  };
}

/** Sum a numeric field across rows. */
export const total = (rows, field) => rows.reduce((s, r) => s + num(r[field]), 0);

/** Impression-weighted mean — the only correct way to average GSC position. */
export function weightedMean(rows, valueField, weightField) {
  let w = 0;
  let sum = 0;
  for (const r of rows) {
    const wt = num(r[weightField]);
    w += wt;
    sum += num(r[valueField]) * wt;
  }
  return w ? sum / w : 0;
}

/** Biggest absolute movers on one metric, largest first. */
export function topMovers(moved, metric, limit = 10) {
  return [...moved]
    .filter((m) => m.deltas[metric] && m.deltas[metric].delta !== 0)
    .sort((a, b) => Math.abs(b.deltas[metric].delta) - Math.abs(a.deltas[metric].delta))
    .slice(0, limit);
}

export const arrow = (improved) => (improved ? "▲" : "▼");

export function fmtDelta(d, decimals = 0) {
  const sign = d.delta > 0 ? "+" : "";
  return `${sign}${d.delta.toFixed(decimals)}`;
}
