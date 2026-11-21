# Chakravyuh Vibe Coding: project memory

- Cinematic 3D website for the Chakravyuh Vibe Coding hackathon (DYPCOE Akurdi, hiring partner Intellobyte).
- Content source of truth: `INFO.md`. Build instructions: `PROMPT.md`. Never invent content; show TBD as "Coming soon".
- Stack: Vite, React, TypeScript, React Router, three, @react-three/fiber, drei, postprocessing, GSAP + ScrollTrigger, Lenis, Tailwind, Framer Motion.
- All content in `src/data/event.ts` and `src/data/shortlist.json`.
- Hard rules: never write "seven rounds" or "seven layers" (there are 2 rounds); never show judging weights; judges are labeled AI agents and use non-photo avatars; never ship the reference video.
- Per-frame 3D values go through refs and GSAP, never React state.
- Work in the phases listed in `PROMPT.md` section 8. After each phase run the dev server, check desktop and a 390px viewport, then stop and report.
- Commands: `npm run dev`, `npm run build`.
