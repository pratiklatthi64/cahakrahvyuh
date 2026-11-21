// Single source of truth for site content. Mirrors INFO.md. All times are IST (UTC+05:30).
// Empty string = TBD: the UI shows "Coming soon" / disables the matching button.

/** Flip to true on 10-11 Dec 2026 after filling shortlist.json. */
export const SHORTLIST_PUBLISHED = false

export const links = {
  googleForm: '',
  whatsapp: '',
  instagram: '',
  linkedin: '',
  email: '',
  phone: '',
}

export const event = {
  name: 'Chakravyuh Vibe Coding',
  tagline: 'Vibe. Ship. Conquer.',
  organizer: 'DY Patil College of Engineering (DYPCOE), Akurdi, Pune',
  hiringPartner: 'Intellobyte Tech Solutions',
  venue: 'Reading Room, DY Patil College of Engineering, Akurdi, Pune',
  // UNCONFIRMED: registration deadline time of day is TBD. 11:59 PM IST is a placeholder.
  registrationDeadline: '2026-12-08T23:59:00+05:30',
  round2Start: '2026-12-12T11:00:00+05:30',
  shortlistWindowStart: '2026-12-10T00:00:00+05:30',
  resultsTime: '2026-12-12T19:00:00+05:30',
}

export const facts = [
  { k: 'Fee', v: 'Free' },
  { k: 'Team size', v: '1 to 4 members' },
  { k: 'Open to', v: 'Any student, any college' },
  { k: 'Perk', v: 'Internship opportunities with Intellobyte' },
  { k: 'Video', v: 'Max 2 minutes' },
]

export const journey = [
  { stage: 'Register', date: 'Until 8 Dec', detail: 'Sign up free on the Google Form. Solo or a team of up to 4, any branch, any college.' },
  { stage: 'Submit your video', date: 'Until 8 Dec', detail: 'A video of at most 2 minutes about your live project, submitted as a YouTube or Google Drive link in the same form.' },
  { stage: 'Get shortlisted', date: 'Around 10 to 11 Dec', detail: 'Shortlisted participants get a personal WhatsApp message and are listed on the Shortlist page.' },
  { stage: 'Live hackathon', date: 'Sat 12 Dec, 11:00 AM', detail: 'Problem statements revealed on the day. Build live at the Reading Room, DYPCOE Akurdi.' },
  { stage: 'Judging', date: '12 Dec, after submission', detail: 'Submit your GitHub repo at 6:00 PM. Judges look at UI/UX and how smoothly your product works.' },
  { stage: 'The core', date: '12 Dec, 7:00 PM', detail: 'Results are announced, and winners earn internship opportunities with Intellobyte.' },
]

export const videoQuestions = [
  'What have you built?',
  'Why does it exist?',
  'What is different from other products?',
  'Which tech stack did you use?',
]

export const round1Steps = [
  'Build and deploy a project on an idea of your choice. It must already be live and working.',
  'Record a video of at most 2 minutes that answers all four questions below.',
  'Register through the Google Form and submit your video as a YouTube link or a Google Drive link.',
]

export const round2Points = [
  'Problem statements are revealed on the day. They are not published beforehand.',
  'A 6-hour live hackathon, 11:00 AM to about 6:00 PM.',
  'Any AI tools and any tech stack are allowed.',
  'Final submission at 6:00 PM: your GitHub repo link, submitted through a form shared in the hackathon WhatsApp community.',
  'Results at 7:00 PM the same day.',
]

export const round2Phases = [
  { name: 'Research', detail: '30 minutes' },
  { name: 'Build', detail: '3 hours' },
  { name: 'Inspection', detail: 'A progress check on how much is built and how much works' },
  { name: 'Build on', detail: 'Keep building until the end' },
]

export const judges = [
  { name: 'Bill Gates', slug: 'bill-gates' },
  { name: 'Elon Musk', slug: 'elon-musk' },
  { name: 'Sam Altman', slug: 'sam-altman' },
  { name: 'Dario Amodei', slug: 'dario-amodei' },
]

export const judgeDisclaimer =
  'Judge agents are AI systems inspired by public perspectives of these individuals. They are not the real people and are not affiliated with or endorsed by them.'

export const faq = [
  { q: 'Who can participate?', a: 'Any student from any branch and any college.' },
  { q: 'What is the team size?', a: '1 to 4 members. Solo is allowed.' },
  { q: 'How much does it cost?', a: 'Nothing. Registration is free.' },
  { q: 'Does my project need to be finished?', a: 'In Round 1 it must be live and working.' },
  { q: 'What video do I submit?', a: 'A video of at most 2 minutes covering what you built, why it exists, what is different, and your tech stack. Share a YouTube or Google Drive link.' },
  { q: 'Are AI tools allowed?', a: 'Yes, any.' },
  { q: 'What happens in Round 2?', a: 'Problem statements are revealed on the day. You build in a live hackathon and submit your GitHub repo.' },
  { q: 'What do I bring?', a: 'Your college ID card. Without it you cannot enter the campus.' },
  { q: 'When are shortlists announced?', a: 'Around 10 to 11 Dec, by WhatsApp and on the website.' },
  { q: 'What do winners get?', a: 'Internship opportunities with Intellobyte. Other prizes will be announced soon.' },
  { q: 'How are projects judged?', a: 'On UI/UX and how smoothly the product works.' },
  { q: 'Certificates, food, accommodation, travel?', a: 'Details coming soon.' },
]

export const rules = [
  'Students only; any branch, any college. Each participant must show their own college ID card at the gate.',
  'Team size 1 to 4.',
  'The Round 1 project must be live and working.',
  'Any AI tools are allowed.',
  'The Round 2 repo is submitted via the WhatsApp-community form by 6:00 PM.',
]
