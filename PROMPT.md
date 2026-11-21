# BUILD PROMPT: CHAKRAVYUH VIBE CODING WEBSITE

You are a senior creative developer. Build a cinematic, 3D, scroll-driven website for **Chakravyuh Vibe Coding** ("Vibe. Ship. Conquer."), a two-round student vibe-coding hackathon at DY Patil College of Engineering, Akurdi, with Intellobyte Tech Solutions as hiring partner. Winners get internship opportunities.

## 0. Ground rules
1. Read `INFO.md` first and fully. It is the only source of content. Never invent dates, names, prizes, sponsors, quotes or statistics. Render every `TBD` as a tidy "Coming soon" placeholder. A button whose link is empty renders disabled with the label "Link coming soon".
2. Keep all content in `src/data/event.ts` (and `src/data/shortlist.json`) so it can be edited without touching components. Links (Google Form, WhatsApp community, socials) are empty strings until supplied.
3. Hard content rules from `INFO.md`: there are only 2 rounds, so never write "seven rounds" or "seven layers"; never show judging weights; judges are labeled as AI agents exactly as `INFO.md` section 8 says, with non-photographic avatars; never use real photos of any person.
4. Use `reference/reference.mp4` frames as the visual target: sealed bronze gate on a marble platform with a glowing cyan lock, gate opens, camera flies down a corridor with glowing floor circuits and holographic wall panels, ends at a glowing armillary-sphere core. Do not ship the video.
5. Take inspiration from IIT Bombay Techfest and other IIT fest sites (immersive scroll, bold type, strong theme). Do not copy their assets, copy or code.
6. All times are IST. Countdown targets: registration deadline (8 Dec 2026, 11:59 PM IST until confirmed, flag in a code comment) and Round 2 start (12 Dec 2026, 11:00 AM IST). Use fixed IST timestamps, not the visitor's local timezone.
7. Work in phases (section 8). After each phase: run the dev server, check desktop and a 390px mobile viewport, fix console errors, summarize briefly, and stop for approval.

## 0.5 Setup: download everything first (before writing code)
Run in the project root, confirm each installed, and skim each SKILL.md before relying on it (they are community-made instructions). If a command fails, report the error and continue with the rest.

**Skills (install into `.claude/skills`)**
```bash
# Official GSAP skills: timelines, ScrollTrigger, React (useGSAP), performance
npx skills add https://github.com/greensock/gsap-skills

# Scroll-driven 3D architecture: syncs GSAP timelines with the Three.js camera
npx -y skills add freshtechbro/claudedesignskills --skill web3d-integration-patterns --agent claude-code
npx -y skills add freshtechbro/claudedesignskills --skill react-three-fiber --agent claude-code

# Three.js API knowledge (scene setup, loaders, materials, shaders)
npx -y skills add cloudai-x/threejs-skills --agent claude-code

# Pragmatic 3D performance guidance
npx -y skills add sickn33/antigravity-awesome-skills --skill 3d-web-experience --agent claude-code
```
Also enable Anthropic's **frontend-design** plugin for art direction. Optional, for the review phase: the **audit-suite** plugin (web-animation-design, web-design-guidelines, performance and accessibility audits).

**Project and packages**
```bash
npm create vite@latest chakravyuh -- --template react-ts && cd chakravyuh
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing \
      gsap @gsap/react lenis framer-motion react-router-dom
npm i -D tailwindcss @tailwindcss/vite @types/three
```
Copy `INFO.md`, `PROMPT.md` and `CLAUDE.md` into the project root.

**Assets**
- `reference/reference.mp4`, then extract frames: `ffmpeg -i reference/reference.mp4 -vf fps=1/1.5 reference/frame_%02d.jpg`.
- Fonts (self-hosted): Cinzel, Rajdhani (or Space Grotesk), JetBrains Mono.
- Optional CC0 textures (black marble, bronze) from Poly Haven, compressed to WebP/KTX2. Log every asset's license in `ASSETS.md`.

## 1. Stack
- Vite + React + TypeScript, React Router
- three, @react-three/fiber, @react-three/drei, @react-three/postprocessing (bloom, subtle vignette)
- GSAP + ScrollTrigger (`@gsap/react` useGSAP), Lenis smooth scroll
- Tailwind CSS, Framer Motion for UI and page transitions
- Build the gate, corridor, core and judge avatars procedurally (three.js shapes, instancing, emissive materials; SVG for avatars). If a `.glb` is supplied later, load with drei `useGLTF` and Draco.

## 2. Look and feel
- Palette: obsidian `#07090d`, marble `#12161c`, bronze `#b08d4a`, bright gold `#e0b866`, cyan glow `#2de2e6`, deep navy `#0a1020`. Cyan is only for energy and interactive elements.
- Type: Cinzel (headings), Rajdhani or Space Grotesk (body), JetBrains Mono (labels, HUD text).
- Motifs: concentric circles and spiral, bronze line-art frames, holographic HUD panels with thin cyan borders, drifting dust, subtle film grain.
- Motion: slow and weighty. Ease like `power3.inOut`. No bounce.

## 3. Home page experience
One persistent `<Canvas>` behind the page, driven by scroll:
1. **Preloader:** glowing ring fills around the gate lock while assets and fonts load.
2. **Gate:** sealed gate, slow push-in, starfield and dust. Hero text over the scene: "CHAKRAVYUH VIBE CODING", tagline "Vibe. Ship. Conquer.", "12 Dec 2026 · DYPCOE Akurdi", countdown to registration deadline, buttons "Register free" and "Enter the Chakravyuh" (scrolls on).
3. **Gate opens:** lock rings rotate, doors part, light spills out.
4. **Corridor:** camera dollies along a spline. Floor circuits pulse toward the camera. Holographic wall panels show the key facts from `INFO.md` (free, 1 to 4 members, any college, internship with Intellobyte, 2-minute video).
5. **Core:** camera reaches the spinning armillary sphere; rings speed up on arrival. Register button and countdown appear.
6. **After the core:** normal scrolling sections: how it works in brief, the six-stage journey preview, judges preview, partners strip, WhatsApp button, footer.
Drive camera position and lookAt from scroll progress via a CatmullRomCurve3. Lenis for smoothing, subtle mouse parallax. Per-frame values live in refs and GSAP, never React state.

## 4. Pages
Build exactly the pages in `INFO.md` section 4: Home, How It Works, Journey, Prizes, Judges, Partners, Register, Shortlist, FAQ, Contact. Shared look: dark marble, lighter 3D backdrop (slow concentric rings and particles), gate-iris page transitions. Signature elements:
- **Journey:** six concentric rings (outer to inner = Register, Submit video, Get shortlisted, Live hackathon, Judging, The core). Scroll or hover highlights a ring and shows its date and detail. On mobile it becomes a vertical stepper.
- **How It Works:** Round 1 and Round 2 as two large bronze panels; video checklist with the four questions; "what to bring" callout (college ID card).
- **Judges:** large heading "THE JUDGES". Four framed cards, each with a non-photo avatar, an "AI JUDGE AGENT" label at readable size, and "Modeled on the thinking of <name>". Mandatory disclaimer text from `INFO.md` section 8 on this page and in the footer.
- **Shortlist:** controlled by `SHORTLIST_PUBLISHED`. Before publish: countdown plus the "check regularly / WhatsApp message" notice. After publish: filterable list from `shortlist.json` (name, team, college).
- **Register:** steps, deadline countdown, video checklist, "Register on Google Form" and "Join WhatsApp community" buttons.

## 5. Performance and fallbacks (mostly phones)
- 60fps on a mid-range laptop, 30fps or better on mid-range phones. DPR cap 1.5 desktop, 1.25 mobile. Instancing, no real-time shadows, fake baked-looking light, bloom only on emissive parts.
- Detect low-end devices and `prefers-reduced-motion`; serve a lightweight mode (static gate image, CSS animation, no postprocessing).
- Lazy-load the 3D scene. Every page must be usable before the 3D finishes loading.
- Initial JS under about 300 KB gzipped excluding the lazy 3D chunk. Lighthouse performance 80 or higher on desktop.

## 6. Quality bar
- Responsive from 360px to 4K, keyboard accessible, visible focus, AA contrast over 3D (use dark scrims), alt text, semantic HTML.
- SEO and share: title, description, Open Graph image (generate a simple branded one), favicon, sitemap.
- No console errors, no layout shift.
- Disabled-state handling for every empty link in `event.ts`.

## 7. Deliverables
1. Working project: `npm run dev`, `npm run build`.
2. `README.md`: how to edit `event.ts` and `shortlist.json`, how to publish the shortlist (flip `SHORTLIST_PUBLISHED`), how to swap 3D assets and judge avatars, how to deploy to Vercel or Netlify.
3. A list of every `TBD` still showing on the site.

## 8. Implementation plan
Registration is open now, so ship a working v1 early and add the 3D on top. Skills to use: frontend-design for Phases 1, 4 and 5; GSAP and web3d skills for Phases 2 and 3; audit-suite (if installed) for Phase 7.

| Phase | Goal | Done when |
|---|---|---|
| 0 | Setup (section 0.5) | Skills installed, project runs, reference frames extracted |
| 1 | **v1 live-ready** | Design tokens, Tailwind, router, shared layout; all 10 pages built with real content from `INFO.md` and a simple CSS version of the look (dark marble, bronze and cyan, concentric-ring motif, no WebGL yet); countdowns; disabled-link handling; deploy to Vercel or Netlify so the Register button can go live |
| 2 | Hero 3D scene | Persistent `<Canvas>`; procedural gate on a circular platform with glowing cyan lock, starfield, dust, bloom; preloader ring; hero text overlay; low-end fallback wired in |
| 3 | Scroll journey | Lenis plus ScrollTrigger drive the camera: gate opens, corridor with pulsing floor circuits and holographic panels, arrival at the spinning core; content panels fade in per scene |
| 4 | Signature pages | Journey rings, How It Works panels, Judges cards and avatars, gate-iris transitions, lightweight 3D backdrop on inner pages |
| 5 | Polish | Hover and cursor effects, optional sound toggle (off by default), film grain, 404 page, Open Graph image |
| 6 | Performance | Low-end and reduced-motion mode verified, lazy loading, asset compression, bundle check, test on a real phone |
| 7 | QA and launch | Accessibility pass, Chrome/Safari/Firefox check, Lighthouse, README, final deploy, `TBD` list |

Risks to handle explicitly: Safari and iOS WebGL memory limits (keep textures small), scroll jank from React state in the render loop, text readability over bright glow, and the judge presentation rules in `INFO.md` section 8.

Begin with Phase 0, then Phase 1. Stop and show me after Phase 1.
