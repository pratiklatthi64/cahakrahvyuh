# HOW TO BUILD THIS SITE WITH CLAUDE CODE

## Your timeline (registration closes 8 Dec)
Do not wait for the 3D to be perfect before registrations can start. Aim for:
- **Day 1 to 2:** Phase 0 and Phase 1. This gives you a complete, working site with the Register button. Deploy it and start promoting.
- **Day 3 to 7:** Phases 2 and 3 (the 3D gate and fly-through).
- **Before 8 Dec:** Phases 4 to 7 (signature pages, polish, phone testing).
- **10 to 11 Dec:** publish the shortlist (see step 6).

## Step 1: Install Claude Code
Pick one (from the official docs): the native installer, Homebrew (`brew install --cask claude-code`), or npm with Node 18 or newer (`npm install -g @anthropic-ai/claude-code`). Then open a new terminal and check with `claude --version`. You need a Claude plan (Pro, Max, Team or Enterprise) or a Console account to log in.

## Step 2: Prepare the project folder
1. Create a folder, for example `chakravyuh-site`, and put these inside it:
   - `INFO.md`, `PROMPT.md`, `CLAUDE.md` (from me)
   - `reference/reference.mp4` (your video)
2. Open a terminal in that folder.
3. Install ffmpeg if you don't have it (needed to extract video frames).

## Step 3: Start Claude Code
Run `claude` in the folder. It reads `CLAUDE.md` automatically at the start of every session, so the project rules are always loaded.

## Step 4: Give it the first instruction
Paste this as your first message:

> Read PROMPT.md and INFO.md completely. Do Phase 0 (setup, installing every skill and package listed), then Phase 1. Follow all the rules in PROMPT.md. When Phase 1 is done, run the dev server, check it on desktop and a 390px mobile viewport, then stop and tell me what to review.

Then for each next phase, send:

> Approved. Do Phase N from PROMPT.md. Same rules. Stop when done.

## Step 5: Review each phase yourself
After every phase, open `http://localhost:5173` (or the port it prints) on your computer, and also on your phone on the same Wi-Fi. Check:
- Does it match the video's look (bronze gate, cyan glow)?
- Does it run smoothly on your phone? If it lags, tell Claude: "Phone is laggy at the corridor scene, optimize it."
- Are the facts correct: dates, 2-minute video, 1 to 4 team size, free, ID card?
- Are the judges clearly labeled as AI agents?

Useful fix prompts:
- "The gate looks too flat. Add more bronze detail, an engraved door pattern and a stronger cyan glow on the lock."
- "Compare the scene with reference/frame_05.jpg and tell me the three biggest differences, then fix them."
- "Run the build and fix every warning."

## Step 6: Operating the site after launch
- **Add links:** open `src/data/event.ts` and paste the Google Form link, WhatsApp community link and social links. Disabled buttons turn on automatically.
- **Publish the shortlist (10 to 11 Dec):** put the names in `src/data/shortlist.json`, set `SHORTLIST_PUBLISHED` to `true` in `event.ts`, then redeploy. Send each shortlisted person their WhatsApp message at the same time.
- **Confirm the registration deadline time** and Round 2 phase times, then update `event.ts`.

## Step 7: Deploy
Ask Claude: "Deploy this to Vercel (or Netlify) and tell me the steps I need to do myself." You will need a free account there. Connect your domain later if you have one.

## Things I'd check before you go public
1. **Judges page:** it uses AI-agent labeling and non-photo avatars on purpose. Real names and photos shown as if the real people are judging could mislead students and cause trouble with the people named. Keep the labeling.
2. **Human sign-off:** winners receive internships, so decide who (for example an Intellobyte founder or a faculty member) signs off on final results, and tell students.
3. **Round 2 timing:** "6-hour" hackathon, 11:00 AM to about 6:00 PM is 7 hours. Pick one wording and use it everywhere.
4. **Google Form:** add the video link field, team members (1 to 4), college name, and a WhatsApp number so you can message the shortlist. Ask participants to confirm they have a college ID card.
5. **Test on a real phone** before sharing the link. Most visitors will be on phones.
