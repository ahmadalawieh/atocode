import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const projects = JSON.parse(await fs.readFile(path.join(root, "content/projects.json"), "utf8"));
const posts = JSON.parse(await fs.readFile(path.join(root, "content/posts.json"), "utf8"));
const titles = { default: "Ahmad Alawieh / ATOCODE", home: "Websites that make the next step obvious.", work: "Selected work", services: "Website services", hire: "Résumé and engineering work", audit: "Free website audit", blog: "Notes from the work", about: "About Ahmad", contact: "Let's talk", privacy: "Privacy", checklist: "Website launch checklist", project: "Selected project", post: "Journal" };
const pages = [...Object.entries(titles), ...projects.map((p) => [p.slug, `${p.name} / Case study`]), ...posts.map((p) => [p.slug, p.title])];
const escape = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
await fs.mkdir(path.join(root, "public/og"), { recursive: true });
for (const [slug, title] of pages) {
  const words = title.split(" ");
  const lines = [];
  while (words.length) {
    let line = "";
    while (words.length && (line + " " + words[0]).trim().length <= 24) line = `${line} ${words.shift()}`.trim();
    lines.push(line || words.shift());
  }
  const text = lines.slice(0, 3).map((line, i) => `<text x="90" y="${260 + i * 86}" font-size="72" font-weight="700" fill="#f6f3ee">${escape(line)}</text>`).join("");
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#0a0a0f"/><rect x="0" y="0" width="13" height="630" fill="#ff794f"/><path d="M90 112H1110" stroke="#43434b"/><path d="M90 532H1110" stroke="#43434b"/><text x="90" y="86" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#ff794f">&lt;A/&gt;  ATOCODE</text><g font-family="Arial,sans-serif">${text}</g><text x="90" y="585" font-family="Arial,sans-serif" font-size="23" fill="#b9b6b2">Ahmad Alawieh  ·  atocode.online</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(root, "public/og", `${slug}.png`));
}
await sharp(path.join(root, "public/projects/b1-ventures.png")).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 70 }).toFile(path.join(root, "public/projects/b1-ventures-hero.webp"));

const missingPreview = path.join(root, "public/projects/danalandkids.png");
try { await fs.access(missingPreview); } catch {
  await fs.mkdir(path.dirname(missingPreview), { recursive: true });
  const svg = `<svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg"><rect width="1440" height="900" fill="#17171d"/><path d="M90 160H1350M90 740H1350" stroke="#4c4c55"/><text x="90" y="120" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="#ff794f">ATOCODE / PROJECT ARCHIVE</text><text x="90" y="410" font-family="Arial,sans-serif" font-size="100" font-weight="700" fill="#f6f3ee">DanaLand</text><text x="90" y="485" font-family="Arial,sans-serif" font-size="32" fill="#b9b6b2">Live screenshot unavailable. Asset pending.</text><text x="90" y="805" font-family="Arial,sans-serif" font-size="24" fill="#b9b6b2">danalandkids.com</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(missingPreview);
}
