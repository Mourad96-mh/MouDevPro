# Technical — trailing-slash URL duplication

Google is indexing slashed and unslashed variants of the same page as separate URLs and reporting
them separately in Search Console. Seven pages are affected.

## Evidence

| Logical page | Unslashed | Slashed | Notes |
| --- | --- | --- | --- |
| `/en` | 0 impr *(196 previous window)* | **853** | flipped between windows |
| `/en/rabat` | 0 *(62 previous)* | **146** | flipped between windows |
| `/en/marrakech` | 16 | **145** | both live simultaneously |
| `/ar` | 0 *(24 previous)* | **54** | flipped between windows |
| `/ar/marrakech` | 2 | 5 | both live simultaneously |
| `/rabat` | **236** | 1 | mostly consolidated |
| `/blog/web-statistics-morocco-2026` | 139 | **3,431** | both live, heavy volume |

The English stats article is the clearest case: **3,431 impressions on the slashed URL and 139 on
the unslashed one**, both in the same window, both indexed.

The `/en`, `/en/rabat` and `/ar` rows are more telling still — impressions moved *entirely* from
the unslashed variant in the previous window to the slashed variant in the current one. Google is
switching which variant it treats as canonical, which is exactly what happens when a site serves
both and gives no redirect signal.

## Cause

> **Corrected 2026-08-13 after testing the live server.** The original reading below was wrong and
> is kept for the record.
>
> ~~`public/.htaccess` has no trailing-slash canonicalisation rule. The SPA fallback serves
> `index.html` for any path that is not a real file or directory, so both `/en` and `/en/` return
> 200 with identical content.~~

`curl -I` against production shows the unslashed form **already 301s to the slashed form**:

```
/en         → 301 → /en/
/rabat      → 301 → /rabat/
/casablanca → 301 → /casablanca/
/blog/web-statistics-morocco-2026 → 301 → /blog/web-statistics-morocco-2026/
```

There is no rule in `.htaccess` doing this. It is Apache's `mod_dir` `DirectorySlash`: the prerender
writes `dist/<route>/index.html`, so every route is a real **directory** on disk, and a directory
request without a trailing slash gets redirected to add one.

So the problem was never a missing redirect — it is a **contradiction**. Every signal the site
emits uses the unslashed form:

| Signal | Form | Count |
| --- | --- | --- |
| `dist/sitemap.xml` `<loc>` | unslashed | 30 |
| `<link rel="canonical">` | unslashed | 24 |
| `og:url`, hreflang, schema `url` | unslashed | all |
| Internal `<Link to>` / prerendered `<a href>` | unslashed | all |
| Google Ads final URLs (root `CLAUDE.md` §11) | unslashed | all |

Google is told the canonical is `/en`, follows `/en`, is 301'd to `/en/`, and gets a page whose
canonical tag points back at `/en`. That loop of contradictory signals is why the indexed variant
flipped between windows.

The deleted `vercel.json` did carry `"trailingSlash": false` — but Vercel has never run for this
site (deploys are a manual upload to LiteSpeed), so that setting was never in effect. Removing it
changed nothing.

## Why it matters

- Link equity and relevance signals split across two URLs instead of accumulating on one.
- Impression and click history fragments, which is why these pages look erratic window over window.
- The prerender step writes `dist/en/index.html`, so the *directory* form is what the server
  actually has on disk — meaning `/en/` is the natural canonical here, not `/en`.

## Fix — applied 2026-08-13

Since the source of truth (canonicals, sitemap, internal links, Ads final URLs) is already
unanimously **unslashed**, the cheaper and lower-risk direction is to make the server agree with it,
rather than rewriting ~100 URL strings across ~15 files to add slashes.

Two rules added to `public/.htaccess`, after the legacy 301s and before the SPA fallback:

```apache
DirectorySlash Off

# 1. Strip the trailing slash (cannot match "/", the pattern is empty there)
RewriteRule ^(.+)/$ /$1 [R=301,L]

# 2. Serve the prerendered index for the unslashed form, internally
RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
RewriteRule ^(.+?)/?$ /$1/index.html [L]
```

`Options -Indexes` was added on line 1 alongside `-MultiViews`. It is **required**: with
`DirectorySlash Off`, a directory request that misses rule 2 no longer gets mod_dir's redirect and
would otherwise fall through to a directory listing.

Rule 2 runs in mod_rewrite's fixup phase, before mod_dir would see a directory request at all, so
the behaviour holds even if LiteSpeed ignores `DirectorySlash`. That redundancy is deliberate —
if only rule 1 took effect and mod_dir stayed active, `/rabat` → `/rabat/` → `/rabat` would loop.

### Why unslashed and not slashed

- **0 source files change.** All 30 sitemap `<loc>`, 24 canonicals, every `og:url`/hreflang/schema
  `url` and every internal link become correct the moment this deploys.
- **Ads landing pages stop eating a 301 hop.** Every Ads final URL in root `CLAUDE.md` §11 is
  unslashed and currently redirects. Removing a redirect from the landing path helps landing-page
  experience, which feeds Quality Score — relevant to the QS 2 problem in root `CLAUDE.md` §5.4.
- The cost is that Google must re-consolidate onto the unslashed variant, since it currently indexes
  the slashed one more heavily (853 impressions on `/en/`, 3,431 on the slashed stats article). The
  301s handle that, and the canonical tags already point where we want it to land.

### Verify after upload

This is a server-only change — no JS was touched — so it can be deployed as a **single file
upload** (`.htaccess`), independently of any content change. Confirm before anything else ships:

```bash
for u in / /casablanca /rabat /marrakech /tarifs /ecommerce /services /contact \
         /en /en/rabat /ar /blog /blog/web-statistics-morocco-2026; do
  printf '%-40s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' -I https://www.moudevpro.com$u)"
done
```

Expected: **200 with an empty redirect field** for every unslashed path, and `/` still 200. Then
spot-check that the slashed form redirects exactly once:

```bash
curl -sIL -w '%{url_effective} %{http_code}\n' -o /dev/null https://www.moudevpro.com/rabat/
```

Expected: one hop to `https://www.moudevpro.com/rabat`, final 200. A **loop or a 403 is the failure
mode to watch for** — if either appears, revert `.htaccess` immediately; the previous version is in
git and the site works without this change.

## Priority

High value, moderate risk. It is the only finding in this audit fixed by a single file across seven
pages — but also the only one that can break live Ads landing pages if done carelessly. Deploy it on
its own, verify with the commands above, and do not bundle it with content changes.
