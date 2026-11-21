# CHAKRAVYUH VIBE CODING — INFORMATION FILE

Single source of truth for all site content. PROMPT.md tells the builder how to build; this file says what goes on the site.

**Rules for the builder**
- Use only what is written here. Never invent dates, names, prizes, sponsors, quotes or statistics.
- Anything marked `TBD` must show as a tidy "Coming soon" placeholder, never fake content. Buttons whose link is TBD must render disabled with the label "Link coming soon".
- All content lives in `src/data/event.ts` (plus `src/data/shortlist.json`) so it can be edited without touching components.
- All times are IST (Asia/Kolkata, UTC+05:30). English only.

---

## 1. Event basics
| Field | Value |
|---|---|
| Event name | Chakravyuh Vibe Coding |
| Tagline | Vibe. Ship. Conquer. |
| What it is | A two-round vibe-coding hackathon for students |
| Purpose | Find the best vibe coders for Intellobyte Tech Solutions; winners get internship opportunities |
| Organizer | DY Patil College of Engineering (DYPCOE), Akurdi, Pune |
| Hiring partner | Intellobyte Tech Solutions (show as hiring partner; co-organizer status TBD) |
| Open to | Students only, any branch, any college |
| Team size | 1 to 4 members (solo allowed) |
| Registration fee | Free |
| Registration | Google Form (link TBD). Video link is submitted in the same form |
| Registration deadline | 8 Dec 2026 (time of day TBD; use 11:59 PM IST until confirmed, and mark as unconfirmed in a code comment) |
| Round 2 date and time | Saturday, 12 Dec 2026, 11:00 AM to about 6:00 PM IST |
| Round 2 venue | Reading Room, DY Patil College of Engineering, Akurdi, Pune |
| Results | 12 Dec 2026, 7:00 PM IST |
| Prizes and perks | Internship opportunities with Intellobyte for winners. Everything else TBD |
| WhatsApp community | Link TBD (embed as a "Join the community" button) |
| Edition, logo, college brand colors | TBD (use a text wordmark until a logo is supplied; do not show an edition number) |

## 2. Theme
The Chakravyuh is the spiral battle formation from the Mahabharata, made of concentric layers. Abhimanyu entered it but could not get out. On this site, participants enter the formation, break through its layers, and reach the core.
- There are only 2 real rounds. The concentric layers are a visual metaphor for the journey. Never write "seven rounds" or "seven layers" anywhere on the site.
- Tone: epic, ancient-meets-futuristic. Bronze and black marble with cyan circuit glow.

## 3. Visual direction
- Reference video: `reference/reference.mp4` (frames in `reference/`). A sealed bronze gate on a circular marble platform with a glowing cyan lock opens; the camera flies down a corridor with glowing floor circuits and holographic wall panels, ending at a glowing armillary-sphere core.
- Palette: obsidian black, aged bronze and gold, cyan energy glow, deep navy.
- Inspiration (do not copy assets or code): IIT Bombay Techfest and other IIT fest sites. More reference URLs TBD.
- Do not ship the reference video (it carries a generator watermark).

## 4. Pages (final list)
| # | Route | Purpose | Content |
|---|---|---|---|
| 1 | `/` Home | Cinematic entry and conversion | Preloader, 3D gate, scroll fly-through to the core. Hero: name, tagline "Vibe. Ship. Conquer.", dates, venue, countdown, Register button. Short "what is this" blurb, the internship perk, the six-stage journey preview, judges preview, WhatsApp button, footer |
| 2 | `/how-it-works` | Explain both rounds | Round 1 and Round 2 in detail (section 5), video rules, what to bring |
| 3 | `/journey` | Timeline | The six stages as concentric rings (section 6) with dates |
| 4 | `/prizes` | Rewards | Headline perk: internship opportunities with Intellobyte. All other prizes "Announcing soon" |
| 5 | `/judges` | Judges | Section 8. AI judge agents, with required labeling |
| 6 | `/partners` | Partners | Intellobyte (hiring partner) and DYPCOE (host). Other sponsors "Coming soon" |
| 7 | `/register` | Conversion | Steps, free, deadline countdown, video checklist, Google Form button, WhatsApp button |
| 8 | `/shortlist` | Round 1 results | Before publish: "Shortlist will be announced around 10 to 11 Dec" with a countdown. After publish: list from `shortlist.json`. Always show: "Shortlisted participants also get a personal WhatsApp message. Check this page regularly." |
| 9 | `/faq` | Answer doubts | Section 9 |
| 10 | `/contact` | Reach organizers | Organizer names, email, phone, socials, map: all TBD. Show form-free contact block with placeholders |

The shortlist is controlled by one flag, `SHORTLIST_PUBLISHED`, in `event.ts` (default `false`).

## 5. How it works
**Round 1: online, until 8 Dec 2026**
1. Build and deploy a project on an idea of your choice. It must already be live and working.
2. Record a video of at most 2 minutes. It must answer all four: (a) what have you built, (b) why does it exist, (c) what is different from other products, (d) which tech stack did you use.
3. Register through the Google Form and submit your video as a YouTube link or a Google Drive link.

**Shortlist: around 10 to 11 Dec 2026**
Shortlisted participants get a personal WhatsApp message and are listed on the Shortlist page. Check it regularly.

**Round 2: live, Saturday 12 Dec 2026, Reading Room, DYPCOE Akurdi**
- Problem statements are revealed on the day. They are not published beforehand.
- 6-hour live hackathon, 11:00 AM to about 6:00 PM.
- Phases: 30 minutes of research, then 3 hours of building, then an inspection (a progress check on how much is built and how much works), then building continues until the end. Exact clock times for each phase: TBD, so show phases without clock times.
- Final submission at 6:00 PM: your GitHub repo link, submitted through a form shared in the hackathon WhatsApp community.
- Any AI tools and any tech stack are allowed.
- Results at 7:00 PM the same day.

**What to bring:** your own college ID card. Without it you cannot enter the campus. Laptop and charger: TBD (do not state it).

**How you are judged:** UI/UX and how smoothly your product works. The judges decide. Do not show weights or a scoring table.

## 6. The journey (six stages, shown as concentric rings, outer to inner)
| Ring | Stage | Date |
|---|---|---|
| 1 | Register | Until 8 Dec |
| 2 | Submit your video | Until 8 Dec |
| 3 | Get shortlisted | Around 10 to 11 Dec |
| 4 | Live hackathon | Sat 12 Dec, 11:00 AM |
| 5 | Judging | 12 Dec, after submission |
| 6 | The core: results and internships | 12 Dec, 7:00 PM |

## 7. Rules
- Students only; any branch, any college. Each participant must show their own college ID card at the gate.
- Team size 1 to 4.
- Round 1 project must be live and working.
- Any AI tools allowed.
- Round 2 repo is submitted via the WhatsApp-community form by 6:00 PM.
- Code of conduct: TBD.

## 8. Judges: AI judge agents
Judging is done by AI agents, each built to reason like a well-known tech leader: **Bill Gates, Elon Musk, Sam Altman, Dario Amodei**. These are AI agents. The real people are not judging.

Presentation rules (mandatory):
- Section heading: **"THE JUDGES"** in large type, with the sub-heading "AI agents that think like the world's biggest tech leaders".
- Every judge card shows an **"AI JUDGE AGENT"** label at normal readable size (not tiny, not hidden), then the line "Modeled on the thinking of Bill Gates" (and so on for each).
- Footer line on the page and in the site footer: "Judge agents are AI systems inspired by public perspectives of these individuals. They are not the real people and are not affiliated with or endorsed by them."
- Images: stylized, non-photographic avatar art (bronze-and-cyan silhouettes in the Chakravyuh style), generated by the builder as SVG or by the owner later. Never use real photos of these people. Avatar paths: `public/judges/<name>.webp`, with a built-in SVG fallback.
- Human oversight of results: TBD. Show nothing about it until confirmed.

## 9. FAQ (write answers only from this file)
- Who can participate? Any student from any branch and any college.
- Team size? 1 to 4.
- Cost? Free.
- Does my project need to be finished? In Round 1 it must be live and working.
- What video do I submit? Max 2 minutes covering: what you built, why it exists, what is different, your tech stack. YouTube or Drive link.
- Are AI tools allowed? Yes, any.
- What happens in Round 2? Problem statements are revealed on the day; you build in a live hackathon and submit your GitHub repo.
- What do I bring? Your college ID card (needed for campus entry).
- When are shortlists announced? Around 10 to 11 Dec, by WhatsApp and on the website.
- What do winners get? Internship opportunities with Intellobyte. Other prizes TBD.
- How are projects judged? UI/UX and how smoothly the product works.
- Certificates, food, accommodation, travel: TBD. Do not answer these; show "Details coming soon".

## 10. Contact and links
All TBD: email, phone, Instagram, LinkedIn, Google Form URL, WhatsApp community URL, organizer names. Put them in `event.ts` as empty strings; the UI disables the matching buttons.

## 11. Technical constraints
- Hosting and domain: TBD. Target Vercel or Netlify as a static site.
- Audience: mostly students on phones. Mobile performance matters more than desktop polish.
- Registration is open now, so a working v1 must go live first (see PROMPT.md, Phase 1).

## 12. Open items to fill after the build starts
Google Form link, WhatsApp community link, registration deadline time, Round 2 phase clock times, prize details, sponsors, organizer and contact details, logo, certificates/food/travel info, human result sign-off, code of conduct, more reference sites.
