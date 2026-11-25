import { Link } from 'react-router-dom'
import { ComingSoon, PageHero, Section } from '../components/ui'

export default function Prizes() {
  return (
    <>
      <PageHero
        eyebrow="Rewards"
        title="Prizes"
        sub="What winners take home from Chakravyuh Vibe Coding."
      />
      <Section className="grid gap-8">
        <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/35 p-8 sm:p-12">
          <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">Headline perk</p>
          <h2 className="bronze-text text-3xl sm:text-5xl font-extrabold mt-3">
            Internship opportunities with Intellobyte
          </h2>
          <p className="mt-4 text-lg text-[#d8d3c6] max-w-xl">
            Awarded to the winners of the hackathon.
          </p>
          <div className="mt-7">
            <Link to="/register" className="btn btn-primary">Register free</Link>
          </div>
        </div>

        <div className="border-y border-bronze/25 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xl font-display text-gold">All other prizes and perks</p>
          <ComingSoon>Announcing soon</ComingSoon>
        </div>
      </Section>
    </>
  )
}
