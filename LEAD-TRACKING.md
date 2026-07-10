# Lead Tracking — How the System Works

> Written 2026-07-10. Explains the gclid + ref + OCI system end to end.
> Technical setup steps live in `integrations/apps-script/README.md`.
> Code: `src/utils/attribution.js`, `src/utils/trackLead.js`,
> `src/utils/conversions.js`, `src/hooks/useConversion.js`,
> `src/components/sections/DevisForm.jsx`, `integrations/apps-script/Code.gs`.

---

## The problem this solves

Before this system, Google Ads only knew one thing: "someone tapped the
WhatsApp button." It couldn't tell a curious tire-kicker from a client who
signed a 15 000 DH project. So its bidding optimized for **taps**, not
**clients**. And the contact form sent its data nowhere at all.

Now every lead is logged with the ad click that produced it, and you report
back to Google which leads became real business. Google then finds more
people like the ones who **pay**, not the ones who tap.

---

## The journey of one visitor (example: Karim)

### 1. Karim clicks your ad

Google appends a unique click ID to the URL:

```
moudevpro.com/?gclid=Cj0KCQ...
```

That `gclid` identifies this exact click — keyword, campaign, time. It's the
thread that connects everything that follows.

### 2. The site remembers him — AttributionCapture

The moment any page loads, the site:

- saves the `gclid` (+ UTMs) in a first-party cookie `mdp_attr`, valid
  **90 days** (= Google's upload window for offline conversions)
- assigns Karim a permanent visitor reference like **`MDP-4F7K`**
  (alphabet avoids 0/O/1/I/L so it's unambiguous over WhatsApp)

Why the cookie matters: the gclid used to live only in the URL and died on
the first navigation. Now it survives browsing, and even a return visit days
later — the cookie still knows Karim originally came from that ad.
A later visit without a gclid never erases a stored one; a NEW ad click
overwrites it (last non-empty click wins).

### 3. Karim becomes a lead — two doors

**Door A — the devis form** (`/contact` or homepage `#devis`):
name, phone, project type, budget. On submit, two things fire at once:

1. A row lands in the Google Sheet:
   `MDP-4F7K | form | Karim | 06... | ecommerce | 5000-15000 | gclid: Cj0KCQ...`
2. A conversion pings Google Ads instantly — "this click produced a form
   lead." This is the **primary** conversion the bidding learns from.
   (The form has a honeypot field + duplicate-phone guard against bots.)

**City tracking:** every lead row also records a `city`. For form leads it's
the "Ville" field the visitor typed; if empty (and for all WhatsApp/phone
taps) it's detected from the page they acted on — a tap on `/rabat` logs
`rabat`, on `/marrakech` logs `marrakech`, on `/usa` logs `usa`. The full
`page_url` is logged too. (For the visitor's physical location on paid
clicks, use Google Ads → Locations report.)

**Door B — WhatsApp** (any button on the site):
WhatsApp opens with the message pre-filled:

> Bonjour, je souhaite un devis pour mon projet (Réf: MDP-4F7K)

and simultaneously a row lands in the Sheet:
`MDP-4F7K | whatsapp | gclid: Cj0KCQ...`

The trick: **the ref in his WhatsApp message matches the ref in the Sheet,
and that row carries his gclid.** You now know which conversation came from
which ad click — a link that never existed before.

### 4. You qualify — the human step (weekly, ~5 min)

A WhatsApp tap alone is worth little. But *you* know which conversations
turned real. In the Sheet, find the lead's ref and set `status`:

| status | meaning | value reported to Google |
| --- | --- | --- |
| `new` | just arrived (default) | — |
| `qualified` | real prospect confirmed | 200 MAD |
| `devis-envoye` | quote sent | 500 MAD |
| `client` | signed | 3 000 MAD |
| `perdu` | dead lead | — |

The Apps Script stamps `statusUpdatedAt` automatically when you edit the
status — Google requires the conversion time to be AFTER the click time.

### 5. You tell Google the truth — OCI export

Open your export URL (bookmark it):

```
<APPS_SCRIPT_URL>?action=oci&token=<ADMIN_TOKEN>
```

It downloads a CSV like:

```
Parameters:TimeZone=+0100
Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency
Cj0KCQ...,Lead Qualifié (OCI),2026-07-18 14:30:00,3000,MAD
```

Upload it in **Google Ads → Tools → Conversions → Uploads**. Google matches
the gclid back to the original click and records: *"the click on keyword X
produced 3 000 MAD."* Exported rows are flagged `conversionUploaded` so they
are never sent twice. Only status-qualified leads with a gclid are exported —
WhatsApp taps that never qualify are never sent.

---

## Why the loop pays

- **Week 1:** Google optimizes on form leads (already better than taps —
  a form submit proves name + phone + budget intent).
- **After a few OCI uploads:** Google sees which clicks became 200 / 500 /
  3 000 MAD and shifts budget toward the searches, hours, devices and
  audiences that produce **payers**. Same budget, better leads.
- The old WhatsApp click conversion stays measured but **Secondary** — it no
  longer steers bidding; real value does.

## Honest limits

- OCI only works for visitors who arrived via an ad (they have a gclid).
  Organic visitors still get refs and Sheet rows — useful for you — but
  there's no click to report to Google. Expected and fine.
- If a visitor blocks cookies/localStorage entirely, the ref falls back to a
  new one per page and attribution may be empty. Rare, acceptable.
- Refs are per-visitor, not per-message: the same person always sends the
  same ref. Two different people getting the same 4-char ref is possible but
  very unlikely; date + phone disambiguate.

## The weekly routine (the only recurring work)

1. Real prospect in WhatsApp → find their Réf → set `status` in the Sheet.
2. Open the export URL → CSV downloads.
3. Google Ads → Tools → Conversions → Uploads → upload it.
4. Done. Uploads must happen within 90 days of the click — weekly is plenty.
