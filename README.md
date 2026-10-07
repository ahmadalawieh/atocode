# ATOCODE / Ahmad Alawieh

Personal portfolio and client inquiry site. Built with Next.js App Router, TypeScript, Tailwind CSS, JSON content, and a small amount of client-side code for filters and forms. English routes live at `/`; Arabic routes live at `/ar`.

## Local setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The contact and audit forms use the previous site's Formspree endpoint until `FORMSPREE_ENDPOINT` is set. Replace it with your own verified endpoint in Vercel. Do not commit `.env.local`.

## Content editing

- Edit case studies and project cards in `content/projects.json`.
- Edit published journal posts in `content/posts.json`.
- Edit page copy in `components/PageView.tsx` and navigation in `components/SiteChrome.tsx`.
- Add real project captures to `public/projects/` and update each JSON record's `image` and `alt` fields.
- `TODO.md` lists claims and assets that need verification. Do not publish unverified results or testimonials.

The build runs `scripts/generate-og.mjs` to create 1200×630 PNG Open Graph images for each page and article. If you change titles, rebuild before deployment. The CV download uses the PDF supplied by Ahmad in October 2026; replace `public/Ahmad_Alawieh_CV.pdf` when that document changes.

## Checks

```powershell
npm run typecheck
npm run lint
npm run build
```

Run `npm run qa` against a local production server for visual and accessibility checks at 360, 768, 1280, and 1920 pixels for `/` and `/ar`, plus key routes and form validation. See `QA_REPORT.md` for measured Lighthouse/axe results and gaps.

## Deployment

Set the Vercel project root to this repository, framework to Next.js, and add `FORMSPREE_ENDPOINT`. Optionally add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and `NEXT_PUBLIC_BOOKING_URL`. Deploy the branch as a preview and verify form delivery before promoting it to production. Historical `/blog.html`, `/checklist.html`, `/privacy.html`, and `/articles/*.html` paths redirect permanently.

The serverless form route includes validation, a honeypot, and a best-effort per-instance rate limit. For persistent limits across instances, connect a shared store before increasing form traffic.
