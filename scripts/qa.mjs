import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
import path from "node:path";

const origin = process.env.QA_ORIGIN || "http://127.0.0.1:3001";
const out = path.join(process.cwd(), "tmp/qa");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
let failures = 0;
for (const locale of ["en", "ar"]) {
  for (const width of [360, 768, 1280, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const url = `${origin}${locale === "ar" ? "/ar" : "/"}`;
    await page.goto(url, { waitUntil: "networkidle" });
    const data = await page.evaluate(() => ({ htmlLang: document.documentElement.lang, dir: document.documentElement.dir || document.querySelector(".site-shell")?.getAttribute("dir"), scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, title: document.title, heroImageLoaded: !!document.querySelector(".hero-media")?.complete && document.querySelector(".hero-media")?.naturalWidth > 0 }));
    await page.screenshot({ path: path.join(out, `${locale}-${width}.png`), fullPage: true });
    const axe = await new AxeBuilder({ page }).analyze();
    const violations = axe.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    const fail = data.scrollWidth > width + 1 || data.htmlLang !== locale || !data.heroImageLoaded || violations.length > 0;
    if (fail) failures++;
    console.log(JSON.stringify({ locale, width, ...data, violations, pass: !fail }));
    await context.close();
  }
}
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const route of ["/work", "/work/b1-ventures", "/services", "/hire", "/audit", "/blog", "/blog/wordpress-plugins", "/about", "/contact", "/privacy", "/checklist", "/ar/work", "/ar/audit"]) {
  const response = await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
  const h1 = await page.locator("h1").first().textContent();
  if (response.status() !== 200 || !h1) failures++;
  console.log(JSON.stringify({ route, status: response.status(), h1 }));
}
for (const oldPath of ["/blog.html", "/checklist.html", "/privacy.html", "/articles/wordpress-plugins.html"]) {
  const redirect = await page.request.get(`${origin}${oldPath}`, { maxRedirects: 0 });
  if (redirect.status() !== 301) failures++;
  console.log(JSON.stringify({ redirect: oldPath, status: redirect.status(), location: redirect.headers().location }));
}
const archiveImage = await page.request.get(`${origin}/projects/danalandkids.png`);
if (archiveImage.status() !== 200) failures++;
console.log(JSON.stringify({ danaLandPlaceholderStatus: archiveImage.status() }));
const invalid = await page.request.post(`${origin}/api/inquiry`, { data: { type: "audit", name: "X", email: "bad" } });
if (invalid.status() !== 400) failures++;
console.log(JSON.stringify({ invalidFormStatus: invalid.status() }));
const spam = await page.request.post(`${origin}/api/inquiry`, { data: { type: "audit", company_website: "https://spam.example" } });
if (spam.status() !== 200) failures++;
console.log(JSON.stringify({ honeypotStatus: spam.status() }));
await page.goto(`${origin}/work`, { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "WooCommerce" }).click();
const emptyFilter = await page.locator(".empty-state").isVisible();
if (!emptyFilter) failures++;
console.log(JSON.stringify({ emptyWooCommerceFilter: emptyFilter }));
const mobile = await browser.newPage({ viewport: { width: 360, height: 760 } });
await mobile.goto(origin, { waitUntil: "domcontentloaded" });
await mobile.locator(".mobile-nav summary").click();
const menuVisible = await mobile.locator(".mobile-nav nav").isVisible();
if (!menuVisible) failures++;
console.log(JSON.stringify({ mobileMenuVisible: menuVisible }));
await mobile.close();
await browser.close();
console.log(`QA failures: ${failures}`);
process.exitCode = failures ? 1 : 0;
