/**
 * attribution — first-party capture of Google Ads click IDs + UTMs.
 *
 * Stored as JSON in the `mdp_attr` cookie (90 days = the Google Ads
 * click-to-conversion upload window for Offline Conversion Import) and
 * mirrored to localStorage as fallback. A new click ID (gclid/wbraid/gbraid)
 * overwrites the stored one; a visit without click ID never erases it.
 *
 * Also owns the visitor reference (`mdp_ref`, e.g. "MDP-4F7K") used to match
 * WhatsApp conversations back to their Sheet row (and thus their gclid).
 */

const COOKIE_NAME = "mdp_attr";
const REF_KEY = "mdp_ref";
const MAX_AGE_DAYS = 90;

// No 0/O/1/I/L — refs are read back over WhatsApp, avoid ambiguity
const REF_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

function readCookie(name) {
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeCookie(name, value) {
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function safeGetLocal(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLocal(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode / storage full — cookie is the primary store anyway */
  }
}

/** Current stored attribution, or {} — cookie first, localStorage fallback. */
export function getAttribution() {
  const raw = readCookie(COOKIE_NAME) || safeGetLocal(COOKIE_NAME);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function storeAttribution(attr) {
  const json = JSON.stringify(attr);
  writeCookie(COOKIE_NAME, json);
  safeSetLocal(COOKIE_NAME, json);
}

/**
 * Read gclid/wbraid/gbraid/utm_source/utm_campaign from the current URL and
 * persist them. Overwrites only when the visit carries a NEW click ID;
 * UTMs alone are stored only if nothing is stored yet.
 */
export function captureAttribution() {
  const p = new URLSearchParams(window.location.search);
  const incoming = {};
  for (const key of ["gclid", "wbraid", "gbraid", "utm_source", "utm_campaign"]) {
    const v = p.get(key);
    if (v) incoming[key] = v;
  }

  const hasNewClickId = incoming.gclid || incoming.wbraid || incoming.gbraid;
  const existing = getAttribution();

  if (hasNewClickId) {
    storeAttribution({ ...incoming, capturedAt: new Date().toISOString() });
  } else if (Object.keys(incoming).length > 0 && Object.keys(existing).length === 0) {
    storeAttribution({ ...incoming, capturedAt: new Date().toISOString() });
  }
  // else: nothing new — never erase a stored gclid with an empty visit
}

/**
 * Stable per-visitor reference, e.g. "MDP-4F7K". Created on first call,
 * persisted so the same person keeps the same ref across pages and visits —
 * one WhatsApp conversation maps to one ref.
 */
export function getVisitorRef() {
  const existing = safeGetLocal(REF_KEY);
  if (existing) return existing;

  let chars = "";
  const rand = new Uint32Array(4);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(rand);
  } else {
    for (let i = 0; i < 4; i++) rand[i] = Math.floor(Math.random() * 0xffffffff);
  }
  for (let i = 0; i < 4; i++) {
    chars += REF_ALPHABET[rand[i] % REF_ALPHABET.length];
  }

  const ref = `MDP-${chars}`;
  safeSetLocal(REF_KEY, ref);
  return ref;
}
