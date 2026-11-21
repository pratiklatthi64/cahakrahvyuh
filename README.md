# Chakravyuh Vibe Coding

Phase 1 (CSS-only v1, no WebGL yet). `npm run dev`, `npm run build`.

- Edit all content and links in `src/data/event.ts`. Empty link strings render disabled "Link coming soon" buttons.
- Publish the shortlist: fill `src/data/shortlist.json` (`[{ "name", "team", "college" }]`), set `SHORTLIST_PUBLISHED = true`, redeploy.
- Deploy: `npm run build`, upload `dist/` to Vercel or Netlify (add an SPA rewrite of all paths to `/index.html`).
- Judge avatars: SVG placeholders in `src/components/JudgeAvatar.tsx`.

## TBD still showing
Google Form link, WhatsApp link, registration deadline time (11:59 PM IST placeholder), Round 2 phase clock times, other prizes, other sponsors, code of conduct, contact details and map, certificates/food/travel.
