import { useState } from 'react'
import { event, SHORTLIST_PUBLISHED } from '../data/event'
import shortlist from '../data/shortlist.json'
import { Countdown, PageHero, Section } from '../components/ui'

export default function Shortlist() {
  const [f, setF] = useState('')
  const rows = (shortlist as { name: string; team?: string; college?: string }[]).filter((r) =>
    JSON.stringify(r).toLowerCase().includes(f.toLowerCase())
  )

  return (
    <>
      <PageHero eyebrow="Round 1 results" title="Shortlist" />
      <Section className="grid gap-6">
        {!SHORTLIST_PUBLISHED ? (
          <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl text-gold mb-6">
              Shortlist will be announced around 10 to 11 Dec
            </h2>
            <Countdown target={event.shortlistWindowStart} label="Announcement window opens in" />
          </div>
        ) : (
          <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8">
            <label className="font-mono text-xs tracking-[.15em] uppercase text-cyan block mb-2" htmlFor="flt">
              Filter by name, team or college
            </label>
            <input
              id="flt"
              value={f}
              onChange={(e) => setF(e.target.value)}
              placeholder="Search..."
              className="border border-bronze/40 px-4 py-3 w-full max-w-md bg-obsidian/80 text-white placeholder:text-[#9a958a]"
            />
            <ul className="mt-6 divide-y divide-bronze/20 list-none p-0 m-0">
              {rows.map((r, i) => (
                <li key={i} className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                  <strong className="text-gold font-display">{r.name}</strong>
                  <span className="text-sm text-[#c9c3b4]">
                    {[r.team, r.college].filter(Boolean).join(' · ')}
                  </span>
                </li>
              ))}
              {rows.length === 0 && <li className="py-4 text-[#c9c3b4]">No matches.</li>}
            </ul>
          </div>
        )}

        <p className="text-[#d8d3c6] border-t border-bronze/25 pt-5">
          Shortlisted participants also get a personal WhatsApp message. Check this page regularly.
        </p>
      </Section>
    </>
  )
}
