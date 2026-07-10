# Lead tracking — Google Sheet + Apps Script (server side)

The site has **no backend**: leads are logged to a Google Sheet through the
Apps Script web app whose URL is in `src/utils/trackLead.js`
(`APPS_SCRIPT_URL`). `Code.gs` in this folder is the full replacement script —
it adds the qualification fields, the visitor **ref** (`MDP-XXXX`), lead
**status** tracking, and the **OCI (Offline Conversion Import) CSV export**.

## How the system fits together

1. **Landing** — `AttributionCapture` stores `gclid`/`wbraid`/`gbraid`/UTMs in
   the `mdp_attr` cookie (90 days = the OCI upload window) and assigns the
   visitor a stable ref like `MDP-4F7K`.
2. **Lead** — every WhatsApp tap, phone tap and devis-form submit posts a row
   to the Sheet with the ref + attribution. WhatsApp opens pre-filled with
   *"Bonjour, je souhaite un devis pour mon projet (Réf: MDP-4F7K)"*.
3. **Qualification (you, weekly)** — when a WhatsApp conversation turns into a
   real prospect, find their Réf in the Sheet and set `status` to `qualified`,
   then `devis-envoye` / `client` / `perdu` as it progresses. The script
   auto-stamps `statusUpdatedAt` (OCI needs a conversion time after the click).
4. **Export** — open the export URL (below); it downloads the OCI CSV and
   marks those rows `conversionUploaded` so they are never exported twice.
5. **Upload** — Google Ads → Tools → Conversions → Uploads → upload the CSV.

## Installing the script (one-time, ~5 min)

1. Open the leads spreadsheet → **Extensions → Apps Script**.
2. Replace the existing code with `Code.gs` from this folder.
3. In `CONFIG` at the top, set `ADMIN_TOKEN` to a long random string.
4. **Deploy → Manage deployments → ✏️ edit the existing deployment →
   Version: New version → Deploy.** Editing the existing deployment keeps the
   same `/exec` URL, so the site needs no change. (A brand-new deployment
   would mint a new URL — then `APPS_SCRIPT_URL` in `trackLead.js` must be
   updated.)
5. The script writes to a tab named **`Leads`** and creates it with headers on
   first use. Your old rows stay untouched in the old tab.

## How leads reach your WhatsApp (no bot, no API)

After submitting the devis form, the visitor's own WhatsApp opens with all
their answers pre-filled (nom, tél, ville, projet, budget, message + Réf) —
they tap "Envoyer" and the lead arrives in your WhatsApp **from the lead
themselves**, so you reply in the same thread. If they don't tap send, the
lead is still fully logged in the Sheet — nothing is lost.

Optional email copy: set `CONFIG.NOTIFY_EMAIL` to an address (empty = off).
`NOTIFY_ON`: `"form"` = form submits only · `"all"` = every lead · `""` = off.
A notification failure never blocks the lead from being logged.

## Status values

| status | meaning | OCI value (MAD) |
| --- | --- | --- |
| `new` | just arrived (default) | — |
| `qualified` | real prospect confirmed in WhatsApp | 200 |
| `devis-envoye` | quote sent | 500 |
| `client` | signed | 3000 |
| `perdu` | dead lead | — |

Values are tunable in `CONFIG.OCI_VALUES`. Only rows with an OCI-mapped
status **and** a `gclid` **and** `conversionUploaded` ≠ TRUE are exported —
WhatsApp taps that never qualify are never sent to Google Ads.

## Export URL

```
<APPS_SCRIPT_URL>?action=oci&token=<ADMIN_TOKEN>
```

Bookmark it. It downloads `oci-export-YYYYMMDD-HHmm.csv` in the exact format
Google Ads expects:

```
Parameters:TimeZone=+0100
Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency
<gclid>,Lead Qualifié (OCI),2026-07-10 14:30:00,200,MAD
```

## Google Ads manual steps (after deploy)

1. Create conversion action **"Lead Formulaire Devis"** (Website → Submit lead
   form, value 200 MAD, count One, 90-day click window) → copy its **label**
   into `FORM_CONVERSION_LABEL` in `src/utils/conversions.js` → redeploy the
   site. Until then the form falls back to the legacy shared label so nothing
   is lost.
2. Create conversion action **"Lead Qualifié (OCI)"** (Import → Conversions
   from clicks, count One). The name must match `CONFIG.CONVERSION_NAME`
   exactly.
3. Demote the existing WhatsApp/phone click conversion to **Secondary**;
   set the two new actions as **Primary**.
4. After ~1 week of form data: consider Maximize Conversions with
   tCPA 120–150 MAD. Expect 1–2 weeks of learning-mode volatility.
