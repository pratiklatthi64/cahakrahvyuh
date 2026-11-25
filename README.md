# Chakravyuh Vibe Coding

Cinematic, scroll-driven 3D + 6-shot video website for **Chakravyuh Vibe Coding** ("Vibe. Ship. Conquer."), a two-round student hackathon organised by DY Patil College of Engineering (DYPCOE), Akurdi, Pune with hiring partner Intellobyte Tech Solutions.

## Commands

```bash
npm install
npm run dev      # Start local dev server
npm run lint     # Run oxlint
npm run build    # TypeScript check + Vite production build (outputs dist/)
```

## Editing Content & Links

All event copy, dates, rules, FAQs, and external links live in `src/data/event.ts`:
- Paste your **Google Form**, **WhatsApp community**, **Instagram**, **LinkedIn**, **email**, and **phone** into `links` in `src/data/event.ts`.
- Any empty string (`''`) automatically renders a disabled `"Link coming soon"` button or `"Coming soon"` placeholder.
- Confirm `registrationDeadline` time of day (currently placeholder `2026-12-08T23:59:00+05:30`).

## Publishing the Shortlist (10–11 Dec 2026)

1. Open `src/data/shortlist.json` and add entries:
   ```json
   [
     { "name": "Participant Name", "team": "Team Name", "college": "College Name" }
   ]
   ```
2. Open `src/data/event.ts` and change:
   ```ts
   export const SHORTLIST_PUBLISHED = true
   ```
3. Commit and redeploy.

## Swapping Videos & Judge Avatars

- **6-Shot Video Layers:** Stored in `public/videos/` and registered in `src/data/videos.ts`. Continuous scroll crossfading is handled by `src/components/VideoBackdrop.tsx` and `src/lib/scrollSync.ts`, synced with the 6-ring 3D tunnel in `src/components/ChakravyuhScene.tsx`.
- **Judge Avatars:** Non-photographic SVG silhouettes in `src/components/JudgeAvatar.tsx`. Keep the `"AI JUDGE AGENT"` label and disclaimer intact.

## Deploying to Vercel or Netlify

- **Vercel:** Connect the GitHub repository at [vercel.com/new](https://vercel.com/new). `vercel.json` is already configured for SPA routing.
- **Netlify:** Run `npm run build` and deploy `dist/` with a `/* /index.html 200` `_redirects` rule.

## Open `TBD` Items Still Showing on the Site

- Google Form registration link (`links.googleForm`)
- WhatsApp community link (`links.whatsapp`)
- Organizer names, email, phone, Instagram, LinkedIn (`links` + `/contact`)
- Round 2 venue map embed (`/contact`)
- Registration deadline exact time of day (11:59 PM IST placeholder)
- Round 2 phase exact clock times (`/how-it-works`)
- Additional prizes & perks beyond Intellobyte internships (`/prizes`)
- Other sponsors (`/partners`) and Intellobyte co-organizer status
- Code of conduct (`/how-it-works`)
- Certificates, food, accommodation, travel details (`/faq`)
