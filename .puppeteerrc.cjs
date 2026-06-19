const { join } = require("path");

/**
 * Pin Puppeteer's browser cache to a project-local path inside node_modules.
 *
 * Why: Vercel restores `node_modules` between builds but NOT the default
 * `~/.cache/puppeteer`. Keeping the browser under `node_modules/.cache` makes the
 * download location predictable and lets it ride along with the node_modules cache.
 * The build command also runs `puppeteer browsers install chrome` (idempotent) so
 * Chromium is guaranteed present even on a cold cache.
 *
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: join(__dirname, "node_modules", ".cache", "puppeteer"),
};
