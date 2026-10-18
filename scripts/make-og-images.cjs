// Generates the 1200×630 JPG share images (og:image). WhatsApp, Facebook and
// LinkedIn ignore AVIF and shrink square logos to a thumbnail, so every page
// shares one of these instead:
//   public/og-default.jpg   branded card, used by all non-blog pages
//   public/og/<name>.jpg    cover crop of each blog hero (/<name>.avif)
// Run: node scripts/make-og-images.cjs   (uses the puppeteer devDependency)
const { readFileSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");
const puppeteer = require("puppeteer");

const root = join(__dirname, "..");
const pub = join(root, "public");
const BLOG_IMAGES = ["web-dev", "web-dev-1", "home-dev-1", "setup"];

const font = readFileSync(join(pub, "fonts/rubik-latin.woff2")).toString("base64");
const card = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Rubik; font-weight: 300 800; src: url(data:font/woff2;base64,${font}) format("woff2"); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #121212; color: #fff; font-family: Rubik, sans-serif;
  padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between;
  background-image: radial-gradient(circle at 100% 0%, rgba(237,33,73,.35), transparent 55%); }
.logo { font-size: 40px; font-weight: 700; } .logo b { color: #ed2149; }
h1 { font-size: 66px; line-height: 1.08; font-weight: 700; letter-spacing: -1px; }
h1 span { color: #ed2149; }
.sub { font-size: 30px; color: #cbcbcb; margin-top: 22px; font-weight: 400; }
.foot { display: flex; justify-content: space-between; align-items: center; font-size: 26px; }
.pill { background: #ed2149; padding: 14px 28px; border-radius: 999px; font-weight: 600; }
.url { color: #cbcbcb; }
</style></head><body>
<div class="logo"><b>Mou</b>DEV</div>
<div><h1>Création de site web<br>à <span>Casablanca</span></h1>
<p class="sub">Développeur web freelance · Casablanca, Rabat, Marrakech</p></div>
<div class="foot"><span class="pill">Devis gratuit sous 24h · dès 2 000 DH</span><span class="url">moudevpro.com</span></div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  await page.setContent(card, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(pub, "og-default.jpg"), type: "jpeg", quality: 85 });
  console.log("public/og-default.jpg");

  mkdirSync(join(pub, "og"), { recursive: true });
  for (const name of BLOG_IMAGES) {
    const src = "data:image/avif;base64," + readFileSync(join(pub, `${name}.avif`)).toString("base64");
    await page.setContent(
      `<body style="margin:0"><img src="${src}" style="width:1200px;height:630px;object-fit:cover;display:block"></body>`,
      { waitUntil: "load" }
    );
    await page.evaluate(() => document.querySelector("img").decode());
    await page.screenshot({ path: join(pub, "og", `${name}.jpg`), type: "jpeg", quality: 82 });
    console.log(`public/og/${name}.jpg`);
  }
  await browser.close();
})();
