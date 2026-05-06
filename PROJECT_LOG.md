# ATOCODE Project Log

This file is the working memory for the ATOCODE website. Update it after every meaningful edit so future sessions can resume quickly.

## Current Status

- Live site: https://www.atocode.online
- GitHub repo: https://github.com/ahmadalawieh/atocode
- Vercel project: `atocode`
- Production branch: `main`
- Local project folder: `C:\Users\Ahmad\OneDrive\Documents\ATOCODE`
- Brand: ATOCODE by Ahmad Alawieh
- Service area: Worldwide
- Contact email: `ahmad.alawieh77@gmail.com`
- WhatsApp: `+961 70 332 361`

## Stack

- Static HTML/CSS/JavaScript
- Hosted on Vercel
- GitHub connected to Vercel for automatic production deploys from `main`
- No build step

## Site Features

- Neon Editorial landing page direction chosen from generated visual concepts
- Large hero headline, pill navigation, live-status dashboard hero, capability rail, service rows, pricing cards, process cards, selected work grid, and contact form
- Motion layer includes animated background beams, dashboard scan/glow, sparkline drawing, status pulse, card hover states, scroll reveals, and desktop dashboard tilt
- Mobile-first header toggle with menu links and CTA inside the dropdown
- Services: web development, UI design, hosting setup, maintenance
- Packages:
  - Launch: from `$700`
  - Care: from `$120/mo`
  - Growth: custom quote
- Selected work section with 8 portfolio links
- Contact form currently opens a prepared email to `ahmad.alawieh77@gmail.com`
- Direct email and WhatsApp links
- SEO basics:
  - favicon
  - Open Graph image
  - `robots.txt`
  - `sitemap.xml`
  - `site.webmanifest`
  - JSON-LD structured data

## Selected Work

- B1 Ventures: https://b1-ventures.com/
- Kaizen Firm: https://kaizen-firm.com/
- Umbrella500: https://www.umbrella500.com/
- Stagaway: https://stagaway.world/
- DioramaVR: https://dioramavr.com/
- Inbalance AI: https://inbalance.ai/
- Fraise Studio: https://fraise.studio/
- DanaLand: https://danalandkids.com/

## Deployment History

- `9bd6a93` - Initial ATOCODE website
- `de3ed43` - Add contact form and SEO basics
- `5d16854` - Add brand details packages and selected work

## Next Recommended Work

- Replace mailto form with direct submissions using Formspree or Resend.
- Add richer portfolio case studies with screenshots, roles, and outcomes.
- Add privacy policy if collecting form submissions.
- Improve mobile visual QA after major layout changes.
- Add analytics if needed, preferably privacy-friendly.

## Edit Log

### 2026-05-05

- Added this `PROJECT_LOG.md` file to preserve project state and future edit history.
- Rebuilt the landing page design around the provided Webflow references while keeping the existing ATOCODE content, services, packages, selected work, and contact details.
- Replaced the prior neon card layout with a larger editorial dark hero, lime capability marquee, light package/work sections, row-based services, refined process cards, and responsive mobile fixes.
- Verified desktop and mobile first-viewport screenshots locally with headless Chrome and removed temporary QA screenshots before commit.
- Updated the accent system from lime to a more tech-forward violet, cyan, and magenta palette across CSS, canvas animation, favicon, and Open Graph image.
- Aligned the desktop header with the same responsive page gutters as the hero, increased hero text line height, added live canvas data streams/orbiting motion, animated studio cards, and replaced the messy mobile header with a toggle dropdown menu that includes nav links plus the CTA.

### 2026-05-06

- Implemented the selected `05 Neon Editorial` concept as the new homepage direction.
- Replaced the abstract hero canvas/studio cards with a live-status dashboard containing uptime, response time, active sites, deployments, and service monitor rows.
- Reworked the page into dark premium full-width bands with violet, cyan, blue, magenta, and green status accents while preserving existing services, packages, selected work, and contact details.
- Added interaction polish: animated header mark shine, hero beams, dashboard scan, sparkline drawing, status pulse, scroll reveal transitions, desktop dashboard tilt, and refined hover states.
- Focused responsive behavior on the mobile header dropdown, stacked hero, flexible dashboard cards, single-column service/package/process/work grids, and non-overflowing contact links/form fields.
- Verified JavaScript syntax and desktop/mobile first-viewport screenshots with headless Chrome; removed temporary QA screenshots before commit.
- Fixed the intro `Positioning` kicker so the grid no longer stretches it into a tall vertical pill.
- Moved the intro `Positioning` kicker above the intro title so it matches the section-heading pattern used elsewhere on the site.
- Created the ATOCODE brand logo system with a geometric `A` monogram framed by code brackets, including SVG source files, PNG social/avatar exports, updated favicon, updated Open Graph image, and website header/footer logo usage.
