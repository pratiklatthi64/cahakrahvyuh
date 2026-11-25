import { Link } from 'react-router-dom'
import { round1Steps, round2Phases, round2Points, rules, videoQuestions } from '../data/event'
import { ComingSoon, PageHero, Section } from '../components/ui'

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="Format"
        title="How it works"
        sub="Two rounds. One online qualifier, one live build at DYPCOE Akurdi."
      />

      <Section className="grid gap-10 lg:grid-cols-2 items-start">
        <article className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">Round 1 · Online · Until 8 Dec</p>
          <h2 className="text-2xl sm:text-3xl text-gold mt-2 mb-5">Build, record, submit</h2>

          <ol className="list-none p-0 m-0 divide-y divide-bronze/20">
            {round1Steps.map((step, i) => (
              <li key={step} className="py-3.5 first:pt-0 flex gap-4 items-baseline">
                <span className="font-mono text-xs text-bronze shrink-0">0{i + 1}</span>
                <span className="text-[#e9e4d8]">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 pt-5 border-t border-bronze/30">
            <p className="font-mono text-xs tracking-[.15em] uppercase text-bronze mb-3">
              Your 2-minute video must cover
            </p>
            <ul className="list-none p-0 m-0 grid gap-2 text-[#d8d3c6]">
              {videoQuestions.map((q, i) => (
                <li key={q}>
                  <span className="font-mono text-xs text-cyan mr-2.5">0{i + 1}</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">Round 2 · Live · Sat 12 Dec</p>
          <h2 className="text-2xl sm:text-3xl text-gold mt-2 mb-5">Reading Room, DYPCOE Akurdi</h2>

          <ul className="list-none p-0 m-0 divide-y divide-bronze/20">
            {round2Points.map((pt) => (
              <li key={pt} className="py-3.5 first:pt-0 text-[#e9e4d8]">
                {pt}
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-5 border-t border-bronze/30">
            <p className="font-mono text-xs tracking-[.15em] uppercase text-bronze mb-3">Phases</p>
            <dl className="m-0 grid gap-2">
              {round2Phases.map((p) => (
                <div key={p.name} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-1.5 border-b border-bronze/15 last:border-b-0">
                  <dt className="text-gold font-semibold">{p.name}</dt>
                  <dd className="m-0 text-sm text-[#c9c3b4]">{p.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-[#9a958a] flex items-center gap-2 flex-wrap">
              <span>Exact clock times:</span>
              <ComingSoon />
            </p>
          </div>
        </article>
      </Section>

      <Section className="grid gap-6 md:grid-cols-2">
        <div className="border-t border-bronze/35 pt-6">
          <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">What to bring</p>
          <h3 className="text-2xl font-display text-gold mt-2">Your own college ID card</h3>
          <p className="mt-2 text-[#d8d3c6]">Without it you cannot enter the campus.</p>
        </div>
        <div className="border-t border-bronze/35 pt-6">
          <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">Judging</p>
          <h3 className="text-2xl font-display text-gold mt-2">UI/UX and execution</h3>
          <p className="mt-2 text-[#d8d3c6]">UI/UX and how smoothly your product works. The judges decide.</p>
        </div>
      </Section>

      <Section>
        <div className="border-t border-bronze/30 pt-8">
          <h2 className="text-2xl sm:text-3xl text-gold mb-5">Rules</h2>
          <ul className="list-none p-0 m-0 grid gap-3 sm:grid-cols-2 text-[#e9e4d8]">
            {rules.map((r) => (
              <li key={r} className="border-b border-bronze/20 pb-3">{r}</li>
            ))}
            <li className="border-b border-bronze/20 pb-3 flex items-center justify-between gap-3">
              <span className="text-[#c9c3b4]">Code of conduct</span>
              <ComingSoon />
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary">Register free</Link>
            <Link to="/journey" className="btn">View timeline</Link>
          </div>
        </div>
      </Section>
    </>
  )
}
