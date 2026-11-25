import { ComingSoon, PageHero, Section } from '../components/ui'

export default function Partners() {
  return (
    <>
      <PageHero eyebrow="Backed by" title="Partners" />
      <Section className="grid gap-8 md:grid-cols-2">
        <article className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">Hiring partner</p>
            <h2 className="text-2xl sm:text-3xl text-gold mt-2">Intellobyte Tech Solutions</h2>
            <p className="mt-3 text-[#d8d3c6]">Winners get internship opportunities.</p>
          </div>
          <p className="mt-6 text-xs font-mono tracking-[.12em] uppercase text-[#9a958a] flex items-center gap-2">
            <span>Co-organizer status:</span>
            <ComingSoon />
          </p>
        </article>

        <article className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">Host</p>
          <h2 className="text-2xl sm:text-3xl text-gold mt-2">DY Patil College of Engineering</h2>
          <p className="mt-3 text-[#d8d3c6]">Akurdi, Pune. Reading Room hosts Round 2.</p>
        </article>

        <div className="md:col-span-2 border-y border-bronze/25 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xl font-display text-gold">Other sponsors</p>
          <ComingSoon />
        </div>
      </Section>
    </>
  )
}
