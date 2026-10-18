// Converts public/portfolio/*.png to WebP (max 600 px wide, quality 0.8) with
// headless Chrome's encoder — no sharp/native dependency. Run after adding a
// project screenshot: node scripts/portfolio-webp.cjs
const { readFileSync, writeFileSync, readdirSync } = require("node:fs");
const { join } = require("node:path");
const puppeteer = require("puppeteer");

const dir = join(__dirname, "..", "public", "portfolio");
const MAX_W = 600;

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".png"))) {
    const src = "data:image/png;base64," + readFileSync(join(dir, file)).toString("base64");
    const { b64, w, h, nw, nh } = await page.evaluate(async (src, MAX_W) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const scale = Math.min(1, MAX_W / img.naturalWidth);
      const c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * scale);
      c.height = Math.round(img.naturalHeight * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      const url = c.toDataURL("image/webp", 0.8);
      return { b64: url.split(",")[1], w: c.width, h: c.height, nw: img.naturalWidth, nh: img.naturalHeight };
    }, src, MAX_W);
    const out = file.replace(/\.png$/, ".webp");
    const buf = Buffer.from(b64, "base64");
    writeFileSync(join(dir, out), buf);
    const before = readFileSync(join(dir, file)).length;
    console.log(`${file} ${nw}x${nh} ${Math.round(before / 1024)}KB -> ${out} ${w}x${h} ${Math.round(buf.length / 1024)}KB`);
  }
  await browser.close();
})();
