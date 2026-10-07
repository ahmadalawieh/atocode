import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const browser = await chromium.launch({ headless: true });
const targets = [
  { slug: "umbrella500", url: "https://www.umbrella500.com/", dismiss: "Decline", clipHeight: 780 },
  { slug: "inbalance-ai", url: "https://inbalance.ai/", wait: 6000 },
  { slug: "fraise-studio", url: "https://fraise.studio/", scroll: 900 },
  { slug: "umbrella500-mobile", url: "https://www.umbrella500.com/", width: 390, height: 844, clipHeight: 620 },
];
for (const target of targets) {
  const width = target.width || 1440;
  const page = await browser.newPage({ viewport: { width, height: target.height || 900 }, deviceScaleFactor: 1 });
  try {
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForTimeout(target.wait || 2200);
    if (target.dismiss) await page.getByRole("button", { name: target.dismiss }).click({ timeout: 2000 }).catch(() => {});
    if (target.scroll) await page.evaluate((amount) => window.scrollTo(0, amount), target.scroll);
    await page.waitForTimeout(500);
    await fs.mkdir(path.join(process.cwd(), "public/projects"), { recursive: true });
    await page.screenshot({ path: path.join(process.cwd(), "public/projects", `${target.slug}.png`), ...(target.clipHeight ? { clip: { x: 0, y: 0, width, height: target.clipHeight } } : {}) });
    console.log(`Captured ${target.slug}`);
  } catch (error) { console.error(`Could not capture ${target.slug}: ${error.message}`); }
  await page.close();
}
await browser.close();
