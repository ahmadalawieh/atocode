# ATOCODE Project Log

This file is the working memory for the ATOCODE website. Update it after every meaningful edit so future sessions can resume quickly.

## Current Status

- **Version:** 2.3.1 (see VERSION.md)
- Live site: https://www.atocode.online
- GitHub repo: https://github.com/ahmadalawieh/atocode
- Vercel project: `atocode`
- Production branch: `main`
- Local project folder: `C:\Users\Ahmad\Desktop\ATOCODE`
- Brand: ATOCODE by Ahmad Alawieh
- Service area: Worldwide
- Contact email: `ahmad.alawieh77@gmail.com`
- WhatsApp: `+961 70 332 361`

## Stack

- Static HTML/CSS/JavaScript
- Hosted on Vercel
- GitHub connected to Vercel for automatic production deploys from `main`
- No build step

## Design System

- **Palette:** Amber/coral accents (`#f59e0b`, `#f97316`, `#fbbf24`) on dark background (`#0a0a0f`)
- **Fonts:** Clash Display (headings), Inter (body), JetBrains Mono (code)
- **Logo:** Geometric A monogram with code brackets (amber + coral gradient)
- **Dark/Light mode:** Theme toggle with localStorage persistence
- **Scoped CSS variables** in `:root`

## Site Features

- Warm amber/coral editorial dark theme
- Code editor visual hero with floating info cards and animated syntax highlighting
- Stats bar (30+ projects, 99.9% uptime, global client base)
- Card-based services grid (web dev, UI design, hosting, maintenance) with hover effects
- Package cards: Launch ($700+), Care ($120/mo), Growth (custom)
- 3 client testimonials with quote styling
- Work grid: 8 projects with custom SVG placeholders, hover overlays, link icons
- Contact section: two-column layout with email + WhatsApp links and form
- Footer: brand, nav links, GitHub + LinkedIn social icons
- Mobile: horizontal slider for projects, bottom tab nav, toggle + burger side by side
- Theme toggle on desktop (beside CTA) and mobile (beside burger)
- Scroll reveal animations throughout
- Lazy loading on all work images

## Services

- Web Development (responsive builds, landing pages, custom websites)
- UI Design (visual systems, UX flows, design refreshes)
- Hosting Setup (domains, SSL, deployment)
- Maintenance (updates, monitoring, support)

## Packages

- Launch: from `$700` — custom design, up to 5 pages, mobile responsive, SEO, 1 month support
- Care: from `$120/mo` — updates, security, backups, content edits, priority support
- Growth: custom quote — features, UI/UX, speed, SEO, integrations, dedicated support

## Selected Work

- B1 Ventures: https://b1-ventures.com/ (Finance)
- Kaizen Firm: https://kaizen-firm.com/ (Recruitment)
- Umbrella500: https://www.umbrella500.com/ (Venture Studio)
- Stagaway: https://stagaway.world/ (Travel)
- DioramaVR: https://dioramavr.com/ (VR)
- Inbalance AI: https://inbalance.ai/ (AI)
- Fraise Studio: https://fraise.studio/ (Creative Studio)
- DanaLand: https://danalandkids.com/ (Education)

## Deployment History

- `9bd6a93` - Initial ATOCODE website
- `de3ed43` - Add contact form and SEO basics
- `5d16854` - Add brand details packages and selected work
- `dfc4713` - Neon Editorial revamp (v1.0.0)
- `bf2961f` - Complete design revamp: amber palette, code editor hero (v2.0.0)
- `3225663` - Testimonials, theme toggle, lazy loading (v2.2.0)
- `d802621` - Mobile UX overhaul, toggle positioning (v2.3.0)
- `765642f` - Mobile menu dropdown fix (v2.3.1)

## Next Recommended Work

- Replace placeholder images with actual project screenshots
- Replace mailto form with direct submissions using Formspree or Resend
- Add richer portfolio case studies with screenshots, roles, and outcomes
- Add privacy policy if collecting form submissions
- Add analytics (privacy-friendly: Fathom, Plausible)
- Improve mobile visual QA
- Add a dedicated blog/insights section

## Edit Log

### 2026-05-10 — v2.3.1

- Fixed mobile menu dropdown not appearing (removed `display:none` blocking `visibility:visible`)
- Fixed mobile menu JS selector targeting
- Cleaned up CSS conflicts between header-actions and mobile-header-actions
- Created VERSION.md and updated PROJECT_LOG.md with version tracking
- Added version meta tag to HTML and CSS

### 2026-05-10 — v2.3.0

- Mobile header: theme toggle beside burger menu on mobile, beside CTA on desktop
- Projects section: horizontal slider with scroll-snap on mobile
- Hero: image before stats on tablet/mobile
- Header/footer logo SVG updated to match brand mark design
- Custom SVG placeholders for all 8 portfolio projects

### 2026-05-09 — v2.2.0

- Testimonials section (3 client quotes between Work and Contact)
- Dark/light theme toggle with localStorage persistence
- Lazy loading on all work images
- Updated brand identity: amber/coral palette for all SVGs (favicon, OG, brand marks)

### 2026-05-08 — v2.1.0

- Custom SVG project placeholder images (8 projects, each with unique design)

### 2026-05-07 — v2.0.0

- Complete redesign: amber/coral palette, code editor hero, card-based layout
- Clash Display typography for headings, JetBrains Mono for code
- Services as cards, packages with feature lists, work with image thumbnails
- Two-column contact section, footer with GitHub & LinkedIn social links
- Scroll reveal animations, floating card effects, hover transitions

### 2026-05-06 — v1.1.0

- ATOCODE brand logo system with geometric A monogram and code brackets
- SVG/PNG exports for social media, updated favicon and Open Graph image

### 2026-05-05 — v1.0.0

- Initial build with Neon Editorial landing page
- Live-status dashboard hero, animated beams, sparkline charts
- Mobile-first header toggle, service rows, packages, work grid
- SEO: robots.txt, sitemap.xml, site.webmanifest, JSON-LD
