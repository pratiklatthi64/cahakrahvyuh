import { useState } from 'react'
import { Link } from 'react-router-dom'
import { event, faq, judgeDisclaimer, judges, links, SHORTLIST_PUBLISHED, round1Steps, round2Phases, round2Points, rules, videoQuestions } from '../data/event'
import shortlist from '../data/shortlist.json'
import { ComingSoon, Countdown, LinkButton, PageHero, Section } from '../components/ui'
import JourneyRings from '../components/JourneyRings'
import JudgeAvatar from '../components/JudgeAvatar'

const Q = () => (
  <ol className="grid gap-2 list-none p-0 m-0">
    {videoQuestions.map((q, i) => (
      <li key={q} className="holo px-4 py-3"><span className="label mr-3">0{i + 1}</span>{q}</li>
    ))}
  </ol>
)

export function HowItWorks() {
  return (
    <>
      <PageHero eyebrow="Two rounds" title="How it works" sub="One online round to earn your place, one live round to prove it." />
      <Section className="grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <p className="label">Round 1 · Online · until 8 Dec 2026</p>
          <h2 className="text-2xl text-gold mt-2 mb-4">Build, record, submit</h2>
          <ol className="pl-5 grid gap-3">{round1Steps.map((s) => <li key={s}>{s}</li>)}</ol>
          <p className="label mt-6 mb-2">Your video must answer</p>
          <Q />
          <p className="mt-4 text-[#c9c3b4]">Video length: at most 2 minutes. YouTube or Google Drive link.</p>
        </div>
        <div className="panel p-6">
          <p className="label">Round 2 · Live · Sat 12 Dec 2026</p>
          <h2 className="text-2xl text-gold mt-2 mb-4">Reading Room, DYPCOE Akurdi</h2>
          <ul className="pl-5 grid gap-3">{round2Points.map((s) => <li key={s}>{s}</li>)}</ul>
          <p className="label mt-6 mb-2">Phases</p>
          <ol className="list-none p-0 m-0 grid gap-2">
            {round2Phases.map((p) => <li key={p.name} className="holo px-4 py-3"><strong className="text-gold">{p.name}</strong> · {p.detail}</li>)}
          </ol>
          <p className="mt-3 text-sm text-[#9a958a]">Exact clock times for each phase: <ComingSoon /></p>
        </div>
      </Section>
      <Section className="grid gap-6 md:grid-cols-2">
        <div className="holo p-6">
          <p className="label">What to bring</p>
          <p className="text-2xl font-display text-gold mt-2">Your own college ID card</p>
          <p className="text-[#c9c3b4]">Without it you cannot enter the campus.</p>
        </div>
        <div className="panel p-6">
          <p className="label">How you are judged</p>
          <p className="mt-2">UI/UX and how smoothly your product works. The judges decide.</p>
        </div>
      </Section>
      <Section>
        <h2 className="text-2xl text-gold mb-3">Rules</h2>
        <ul className="pl-5 grid gap-2">{rules.map((r) => <li key={r}>{r}</li>)}<li>Code of conduct: <ComingSoon /></li></ul>
      </Section>
    </>
  )
}

export function Journey() {
  return (
    <>
      <PageHero eyebrow="The formation" title="The journey" sub="Six rings, outer to inner. Break through each one to reach the core." />
      <Section><JourneyRings /></Section>
    </>
  )
}

export function Prizes() {
  return (
    <>
      <PageHero eyebrow="Rewards" title="Prizes" />
      <Section>
        <div className="panel p-8 text-center">
          <p className="label">Headline perk</p>
          <h2 className="bronze-text text-3xl sm:text-5xl mt-3">Internship opportunities with Intellobyte</h2>
          <p className="mt-3 text-[#c9c3b4]">For the winners.</p>
        </div>
        <div className="mt-6 holo p-6 text-center"><p>All other prizes and perks</p><div className="mt-2"><ComingSoon>Announcing soon</ComingSoon></div></div>
      </Section>
    </>
  )
}

export function Judges() {
  return (
    <>
      <header className="pt-32 pb-10 px-5 max-w-6xl mx-auto">
        <h1 className="bronze-text text-5xl sm:text-8xl font-extrabold">THE JUDGES</h1>
        <p className="mt-4 text-xl sm:text-2xl text-[#c9c3b4]">AI agents that think like the world's biggest tech leaders</p>
      </header>
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {judges.map((j, i) => (
            <article key={j.slug} className="panel overflow-hidden">
              <JudgeAvatar name={j.name} variant={i} />
              <div className="p-4">
                <p className="font-display text-lg text-gold tracking-widest">AI JUDGE AGENT</p>
                <p className="text-[#c9c3b4]">Modeled on the thinking of {j.name}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-[#9a958a] max-w-3xl">{judgeDisclaimer}</p>
      </Section>
    </>
  )
}

export function Partners() {
  return (
    <>
      <PageHero eyebrow="Backed by" title="Partners" />
      <Section className="grid gap-6 md:grid-cols-2">
        <div className="panel p-6"><p className="label">Hiring partner</p><h2 className="text-2xl text-gold mt-2">Intellobyte Tech Solutions</h2><p className="mt-2 text-[#c9c3b4]">Winners get internship opportunities.</p></div>
        <div className="panel p-6"><p className="label">Host</p><h2 className="text-2xl text-gold mt-2">DY Patil College of Engineering</h2><p className="mt-2 text-[#c9c3b4]">Akurdi, Pune.</p></div>
        <div className="holo p-6 md:col-span-2"><p className="label">Other sponsors</p><div className="mt-2"><ComingSoon /></div></div>
      </Section>
    </>
  )
}

export function Register() {
  return (
    <>
      <PageHero eyebrow="Free · Students only" title="Register" sub="Solo or a team of up to 4. Any branch, any college." />
      <Section className="grid gap-6 lg:grid-cols-2">
        <div>
          <Countdown target={event.registrationDeadline} label="Registration closes in" />
          <p className="mt-2 text-sm text-[#9a958a]">Deadline: 8 Dec 2026, 11:59 PM IST (time to be confirmed).</p>
          <ol className="pl-5 mt-6 grid gap-3">{round1Steps.map((s) => <li key={s}>{s}</li>)}</ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={links.googleForm} primary>Register on Google Form</LinkButton>
            <LinkButton href={links.whatsapp}>Join WhatsApp community</LinkButton>
          </div>
        </div>
        <div className="panel p-6">
          <p className="label mb-3">Video checklist · max 2 minutes</p>
          <Q />
          <p className="mt-4 text-[#c9c3b4]">Your project must already be live and working. Have your college ID card ready for Round 2.</p>
        </div>
      </Section>
    </>
  )
}

export function Shortlist() {
  const [f, setF] = useState('')
  const rows = (shortlist as { name: string; team?: string; college?: string }[]).filter((r) => JSON.stringify(r).toLowerCase().includes(f.toLowerCase()))
  return (
    <>
      <PageHero eyebrow="Round 1 results" title="Shortlist" />
      <Section>
        {!SHORTLIST_PUBLISHED ? (
          <div className="panel p-8">
            <h2 className="text-2xl text-gold mb-4">Shortlist will be announced around 10 to 11 Dec</h2>
            <Countdown target={event.shortlistWindowStart} label="Announcement window opens in" />
          </div>
        ) : (
          <div>
            <label className="label block mb-2" htmlFor="flt">Filter by name, team or college</label>
            <input id="flt" value={f} onChange={(e) => setF(e.target.value)} className="holo px-4 py-3 w-full max-w-md bg-transparent text-white" />
            <ul className="mt-5 grid gap-2 list-none p-0">
              {rows.map((r, i) => (
                <li key={i} className="panel px-4 py-3"><strong className="text-gold">{r.name}</strong>{r.team && ` · ${r.team}`}{r.college && ` · ${r.college}`}</li>
              ))}
              {rows.length === 0 && <li>No matches.</li>}
            </ul>
          </div>
        )}
        <p className="mt-6 holo p-4">Shortlisted participants also get a personal WhatsApp message. Check this page regularly.</p>
      </Section>
    </>
  )
}

export function Faq() {
  return (
    <>
      <PageHero eyebrow="Doubts" title="FAQ" />
      <Section className="grid gap-3">
        {faq.map((x) => (
          <details key={x.q} className="panel p-4 group">
            <summary className="cursor-pointer font-display text-gold">{x.q}</summary>
            <p className="mt-2 text-[#c9c3b4]">{x.a}</p>
          </details>
        ))}
      </Section>
    </>
  )
}

export function Contact() {
  const rowsData: [string, string, string][] = [
    ['Organizers', '', ''],
    ['Email', links.email, links.email && `mailto:${links.email}`],
    ['Phone', links.phone, links.phone && `tel:${links.phone}`],
    ['Instagram', links.instagram, links.instagram],
    ['LinkedIn', links.linkedin, links.linkedin],
  ]
  return (
    <>
      <PageHero eyebrow="Reach us" title="Contact" />
      <Section className="grid gap-6 md:grid-cols-2">
        <ul className="panel p-6 list-none m-0 grid gap-3">
          {rowsData.map(([k, v, h]) => (
            <li key={k} className="flex justify-between gap-4"><span className="label !text-bronze">{k}</span>{v ? <a href={h || undefined}>{v}</a> : <ComingSoon />}</li>
          ))}
        </ul>
        <div className="holo p-6">
          <p className="label">Venue</p>
          <p className="mt-2">{event.venue}</p>
          <p className="label mt-4">Map</p><div className="mt-2"><ComingSoon /></div>
          <div className="mt-5"><Link to="/faq" className="btn">Read the FAQ</Link></div>
        </div>
      </Section>
    </>
  )
}

export function NotFound() {
  return (
    <div className="pt-40 pb-20 text-center px-5">
      <h1 className="bronze-text text-4xl sm:text-6xl">Lost in the formation</h1>
      <p className="mt-3 text-[#c9c3b4]">That page does not exist.</p>
      <div className="mt-6"><Link to="/" className="btn btn-primary">Back to the gate</Link></div>
    </div>
  )
}
