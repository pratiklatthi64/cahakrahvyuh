import { Link } from 'react-router-dom'
import { event, links } from '../data/event'
import { ComingSoon, PageHero, Section } from '../components/ui'

export default function Contact() {
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
      <Section className="grid gap-8 md:grid-cols-2 items-start">
        <ul className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8 list-none m-0 divide-y divide-bronze/20">
          {rowsData.map(([k, v, h]) => (
            <li key={k} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <span className="font-mono text-xs tracking-[.15em] uppercase text-bronze">{k}</span>
              {v ? (
                <a href={h || undefined} className="text-cyan hover:underline">
                  {v}
                </a>
              ) : (
                <ComingSoon />
              )}
            </li>
          ))}
        </ul>

        <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">Round 2 venue</p>
          <h2 className="text-2xl text-gold mt-2">{event.venue}</h2>
          <div className="mt-6 pt-5 border-t border-bronze/25 flex items-center justify-between gap-4">
            <span className="font-mono text-xs tracking-[.15em] uppercase text-bronze">Map</span>
            <ComingSoon />
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/faq" className="btn">Read the FAQ</Link>
            <Link to="/register" className="btn btn-primary">Register free</Link>
          </div>
        </div>
      </Section>
    </>
  )
}
