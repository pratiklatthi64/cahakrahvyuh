import { Link } from 'react-router-dom'
import { faq } from '../data/event'
import { PageHero, Section } from '../components/ui'

export default function Faq() {
  return (
    <>
      <PageHero eyebrow="Answers" title="FAQ" />
      <Section>
        <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 divide-y divide-bronze/20">
          {faq.map((x) => (
            <details key={x.q} className="p-5 sm:p-6 group">
              <summary className="cursor-pointer font-display text-lg text-gold list-none flex items-center justify-between gap-4">
                <span>{x.q}</span>
                <span className="font-mono text-cyan text-sm transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[#d8d3c6] max-w-3xl">{x.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/register" className="btn btn-primary">Register free</Link>
          <Link to="/contact" className="btn">Contact organizers</Link>
        </div>
      </Section>
    </>
  )
}
