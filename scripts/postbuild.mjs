// Runs after the Vite builds. Writes every page as finished HTML (what search
// engines, link previews and slow phones see first), the sitemap, the sharing
// image, and converts the stylesheet so older browsers can read it.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
import { PNG } from "pngjs";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const { render, headTags, PAGES, SITE } = await import(pathToFileURL(path.join(root, "dist-server/entry-server.js")).href);

// Browsers the stylesheet must work in. Matches the JavaScript targets in vite.config.js.
export const BROWSERS = [
  "chrome >= 70", "and_chr >= 70", "edge >= 79", "firefox >= 68",
  "safari >= 12", "ios_saf >= 12", "samsung >= 10", "opera >= 57", "and_uc >= 12",
];

// 1. Stylesheet for older browsers: layers flattened safely, modern colours given
//    plain equivalents, and new screen width rules rewritten in the older form.
for (const file of fs.readdirSync(path.join(dist, "assets")).filter((f) => f.endsWith(".css"))) {
  const full = path.join(dist, "assets", file);
  const result = await postcss([
    postcssPresetEnv({
      browsers: BROWSERS,
      stage: 2,
      features: {
        "cascade-layers": true,
        "media-query-ranges": true,
        "oklab-function": { preserve: false },
        "nesting-rules": true,
        "is-pseudo-class": false,
      },
    }),
  ]).process(fs.readFileSync(full, "utf8"), { from: full });
  fs.writeFileSync(full, result.css);
  console.log(`stylesheet converted: ${file}`);
}

// React 19 holds back large sections and slots them in with a small script once
// the page loads. Do that slotting now, so the HTML is complete even for browsers
// and preview bots that do not run JavaScript (Opera Mini, WhatsApp, Facebook).
function inlineDeferred(html) {
  const calls = [...html.matchAll(/\$RC\("(B:\d+)","(S:\d+)"\)/g)];
  for (const [, boundaryId, segmentId] of calls) {
    const open = `<div hidden id="${segmentId}">`;
    const start = html.indexOf(open);
    if (start < 0) continue;
    let depth = 0, i = start, end = -1;
    const tag = /<\/?div\b[^>]*>/g;
    tag.lastIndex = start;
    for (let m; (m = tag.exec(html)); ) {
      depth += m[0].startsWith("</") ? -1 : 1;
      if (depth === 0) { end = m.index + m[0].length; i = m.index; break; }
    }
    if (end < 0) throw new Error(`Unclosed segment ${segmentId}`);
    const content = html.slice(start + open.length, i);
    html = html.slice(0, start) + html.slice(end);
    const marker = `<!--$?--><template id="${boundaryId}"></template>`;
    const b = html.indexOf(marker);
    const close = html.indexOf("<!--/$-->", b);
    if (b < 0 || close < 0) throw new Error(`Boundary ${boundaryId} not found`);
    html = html.slice(0, b) + "<!--$-->" + content + html.slice(close);
  }
  // Remove React's slotting scripts, now that nothing is left to slot in.
  html = html.replace(/<script>([\s\S]*?)<\/script>/g, (tag, body) => (/\$R[BCTVX]\b|\$R[BCTVX]=/.test(body) ? "" : tag));
  if (/<div hidden id="S:|\$RC\(|<template id="B:/.test(html)) throw new Error("Deferred content left in page");
  return html;
}

// 2. Finished HTML for every page.
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const routes = Object.keys(PAGES).filter((p) => p !== "404");
function writePage(url, seoPath, outFile) {
  return render(url).then((html) => {
    const page = template
      .replace(/<!--seo-->[\s\S]*<!--\/seo-->/, headTags(seoPath))
      .replace('<div id="root"></div>', `<div id="root">${inlineDeferred(html)}</div>`);
    fs.writeFileSync(path.join(dist, outFile), page);
    console.log(`prerendered ${url} -> ${outFile}`);
  });
}
for (const route of routes) {
  await writePage(route, route, route === "/" ? "index.html" : `${route.slice(1)}.html`);
}
await writePage("/page-that-does-not-exist", "/page-that-does-not-exist", "404.html");

// 3. Sitemap of indexable pages.
const today = new Date().toISOString().slice(0, 10);
const indexable = routes.filter((r) => !PAGES[r].noindex);
const priority = (r) => (r === "/" ? "1.0" : ["/business", "/markets", "/economy", "/companies"].includes(r) ? "0.9" : "0.5");
const freq = (r) => (priority(r) === "0.5" ? "monthly" : "hourly");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    indexable
      .map((r) => `  <url><loc>${SITE.url}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod><changefreq>${freq(r)}</changefreq><priority>${priority(r)}</priority></url>`)
      .join("\n") +
    `\n</urlset>\n`,
);
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
);
console.log(`sitemap: ${indexable.length} pages`);

// 4. Sharing image for WhatsApp, Facebook, X and LinkedIn (1200 x 630, logo on brand navy).
const logo = PNG.sync.read(fs.readFileSync(path.join(root, "public/pwa-512.png")));
const og = new PNG({ width: 1200, height: 630 });
const navy = [7, 20, 38];
for (let i = 0; i < og.data.length; i += 4) {
  og.data[i] = navy[0]; og.data[i + 1] = navy[1]; og.data[i + 2] = navy[2]; og.data[i + 3] = 255;
}
const scale = 420 / Math.max(logo.width, logo.height);
const w = Math.round(logo.width * scale), h = Math.round(logo.height * scale);
const ox = Math.round((1200 - w) / 2), oy = Math.round((630 - h) / 2);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const sx = Math.min(logo.width - 1, Math.floor(x / scale)), sy = Math.min(logo.height - 1, Math.floor(y / scale));
    const si = (sy * logo.width + sx) * 4, di = ((oy + y) * 1200 + (ox + x)) * 4;
    const a = logo.data[si + 3] / 255;
    for (let c = 0; c < 3; c++) og.data[di + c] = Math.round(logo.data[si + c] * a + og.data[di + c] * (1 - a));
  }
}
fs.writeFileSync(path.join(dist, "og-image.png"), PNG.sync.write(og));
console.log("sharing image written");
