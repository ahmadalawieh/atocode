# QA report - 2026-10-07

Measured against a local production build at `http://localhost:3001` with Lighthouse 12.8.2 and Playwright/axe-core. Scores are lab measurements, not a guarantee for the Vercel deployment.

| Page and profile | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| English home, mobile | 89 | 100 | 100 | 100 | 3.4 s | 120 ms | 0 |
| Arabic home, mobile | 92 | 100 | 100 | 100 | 3.4 s | 90 ms | 0 |
| English home, desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 ms | 0 |

The requested 95+ mobile Performance target is **not met**. The hero image is prioritized and optimized, but its render time is still the LCP bottleneck in the simulated mobile run. The image remains static while text and project reveals animate; one variable Cairo font serves the Arabic interface. Recheck on the Vercel preview with real hosting and repeat runs before making larger visual tradeoffs.

## Passed

- `npm run build`, `npm run lint`, and `npm run typecheck`.
- `npm run qa`: no horizontal overflow or axe violations on English and Arabic home pages at 360, 768, 1280, and 1920 px; hero image loaded at each size.
- Key pages and Arabic routes return 200 with one H1 each; historical blog, checklist, privacy, and article paths return 301.
- Supplied CV returns a valid PDF from `/hire`; Arabic headings use Cairo; reduced-motion mode suppresses decorative animation.
- Invalid inquiry returns 400 and the honeypot is accepted without delivery; mobile navigation and empty work-filter state work.
- Visual screenshots inspected for English and Arabic mobile layouts.
- `npm audit --omit=dev`: zero production vulnerabilities.

## Not yet verified

- Live Formspree delivery and receipt of a real inquiry; do this on the Vercel preview with Ahmad's endpoint before launch.
- Plausible events and booking URL, because neither is configured.
- Native Arabic copy review, current availability, project claims, screenshots, and prices listed in `TODO.md`. The résumé details on `/hire` come from the supplied CV.
- Full `npm audit` currently reports five high-severity advisories in the dev-only `eslint-config-next` dependency chain. Do not apply the suggested downgrade to Next 14 without evaluating compatibility; monitor for an upstream fix.
