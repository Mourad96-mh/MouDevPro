/**
 * CSV read/write for the data/ exports.
 *
 * Handles both shapes already in the repo: the 2026-06-19 GSC files are bare
 * and unquoted, the 2026-08-13 ones are BOM-prefixed and fully quoted. Anything
 * written from here uses one consistent shape (no BOM, quote only when needed).
 */

/** Parse CSV text into an array of row objects keyed by header name. */
export function parseCsv(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // strip BOM

  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (!rows.length) return [];

  const headers = rows[0].map((h) => h.trim());
  return rows
    .slice(1)
    .filter((r) => r.some((v) => v !== ""))
    .map((r) => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? "").trim()])));
}

const needsQuote = (v) => /[",\n\r]/.test(v);

/** Serialise row objects to CSV text. Column order comes from `headers`. */
export function toCsv(rows, headers) {
  const cols = headers ?? (rows.length ? Object.keys(rows[0]) : []);
  const line = (vals) =>
    vals
      .map((v) => {
        const s = v === null || v === undefined ? "" : String(v);
        return needsQuote(s) ? `"${s.replace(/"/g, '""')}"` : s;
      })
      .join(",");
  return [line(cols), ...rows.map((r) => line(cols.map((c) => r[c])))].join("\n") + "\n";
}

/** "12.5%" -> 12.5 · "1,234" -> 1234 · "" -> 0 */
export function num(v) {
  if (v === null || v === undefined || v === "") return 0;
  const n = parseFloat(String(v).replace(/[%\s,]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
