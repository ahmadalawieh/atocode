# ATOCODE Website — Version History

**Project:** ATOCODE Landing Page  
**Developer:** Ahmad Alawieh  
**Repository:** https://github.com/ahmadalawieh/atocode  
**Live URL:** https://www.atocode.online  

---

## Current Version: **2.6.0** (2026-05-10)

---

## Version History

### v2.6.0 (2026-05-10)

- **Critical CSS inlining:** Above-the-fold styles inlined in `<style>` tag, full stylesheet deferred with `media="print" onload` pattern
- **404 page:** Custom `404.html` with matching dark theme, amber accent, and back-to-home CTA
- **Clean URLs:** Added `_redirects` file for Vercel — `/blog` and `/privacy` without `.html`

### v2.5.0 (2026-05-10)

- **Active nav highlighting:** Nav links glow amber when their section scrolls into view
- **Blog expansion:** 6 articles across 6 categories, newsletter CTA, dark/light mode toggle
- **Privacy page:** Added dark/light mode toggle, richer OG metadata
- **OG metadata:** Added `og:image:width/height`, `og:locale`, `og:site_name`, `twitter:creator` to all pages
- **Footer animation:** Subtle amber border glow cycling every 6 seconds

### v2.4.0 (2026-05-10)

- **Formspree integration:** Replaced mailto contact form with Formspree API submission with success/error feedback
- **Privacy policy:** New `privacy.html` page with GDPR-friendly privacy policy
- **Font preloading:** Added `<link rel="preload">` for Clash Display to improve LCP
- **Tools & Stack section:** New section showcasing frontend, backend, infrastructure, and design tools
- **Case studies:** New section with 3 detailed project case studies (B1 Ventures, Kaizen Firm, Umbrella500)
- **Blog:** New `blog.html` page with 3 articles (static sites, design, hosting)
- **Footer:** Added blog and privacy policy links

### v2.3.1 (2026-05-10)

- Fixed mobile menu dropdown not appearing (removed `display:none` blocking `visibility:visible`)
- Fixed mobile menu JS selector targeting
- Cleaned up CSS conflicts between header-actions and mobile-header-actions

### v2.3.0 (2026-05-10)

- **Mobile UX overhaul:**
  - Theme toggle positioned beside burger menu on mobile
  - Desktop: theme toggle beside CTA in header-actions
  - Projects section becomes horizontal slider on mobile with scroll-snap
  - Hero reordered: image appears before stats on tablet/mobile
- Header/footer logo updated to match brand mark (amber brackets + A)
- Custom SVG placeholders for all 8 portfolio projects

### v2.2.0 (2026-05-09)

- Added **testimonials section** with 3 client quotes between Work and Contact
- Added **dark/light theme toggle** with localStorage persistence
- Added **lazy loading** (`loading="lazy"`) to all work images
- Updated all brand assets to amber/coral palette:
  - `favicon.svg`, `og-image.svg`
  - `brand/atocode-mark.svg`, `brand/atocode-lockup.svg`, `brand/atocode-social-avatar.svg`

### v2.1.0 (2026-05-08)

- Updated brand identity: amber/coral palette (`#f59e0b`, `#f97316`, `#fbbf24`)
- Added custom SVG project placeholder images (8 projects):
  - B1 Ventures, Kaizen Firm, Umbrella500, Stagaway
  - DioramaVR, Inbalance AI, Fraise Studio, DanaLand
- Each placeholder has a unique design matching the project's industry

### v2.0.0 (2026-05-07)

- **Complete design revamp:**
  - New **amber/coral** color palette replacing violet/cyan/magenta
  - New **Clash Display** font for headings, JetBrains Mono for code
  - Hero redesigned with code editor visual + floating info cards
  - Services redesigned as visual cards with icons and tags
  - Packages redesigned with clear feature lists
  - Work section with image thumbnails and hover effects
  - Contact section redesigned as two-column layout
  - Footer enhanced with GitHub & LinkedIn social links
  - Scroll reveal animations, floating card animations, hover effects

### v1.1.0 (2026-05-06)

- Added ATOCODE brand logo system
- Geometric A monogram framed by code brackets in SVG/PNG
- Social avatar exports, updated favicon, updated Open Graph image
- Website header/footer logo usage

### v1.0.0 (2026-05-05)

- Initial ATOCODE website with Neon Editorial landing page
- Live-status dashboard hero (uptime, response time, active sites, deployments)
- Pill navigation, service rows, pricing cards, process cards, work grid
- Animated hero beams, dashboard scan, sparkline drawing, status pulse
- Mobile-first header toggle with dropdown menu
- Contact form (mailto-based)
- SEO basics: favicon, Open Graph, robots.txt, sitemap.xml, JSON-LD

---

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Clash Display (headings), Inter (body), JetBrains Mono (code) |
| Hosting | Vercel (auto-deploy from GitHub `main`) |
| Version Control | Git + GitHub |
| SEO | robots.txt, sitemap.xml, site.webmanifest, JSON-LD, OG tags |

---

## File Structure

```
ATOCODE/
├── index.html              ← Main landing page
├── styles.css               ← All styles (~1430 lines)
├── script.js                ← Interactive features
├── favicon.svg              ← Browser favicon
├── og-image.svg             ← Open Graph / social preview
├── robots.txt               ← SEO
├── sitemap.xml              ← SEO
├── site.webmanifest         ← PWA manifest
├── PROJECT_LOG.md           ← Working memory + edit log
├── VERSION.md               ← This file — version history
├── brand/                   ← Logo assets (SVG + PNG)
└── images/                  ← Project placeholder SVGs
```

---

## Changelog Convention

- **MAJOR** (`X.0.0`): Complete redesign, new color palette, structural overhauls
- **MINOR** (`0.X.0`): New features, new sections, significant UX changes
- **PATCH** (`0.0.X`): Bug fixes, CSS tweaks, minor adjustments
