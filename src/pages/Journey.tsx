import { Link } from 'react-router-dom'
import { PageHero, Section } from '../components/ui'
import JourneyRings from '../components/JourneyRings'

export default function Journey() {
  return (
    <>
      <PageHero
        eyebrow="Timeline"
        title="The journey"
        sub="Six stages from registration to results."
      />
      <Section>
        <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-10">
          <JourneyRings />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/register" className="btn btn-primary">Register free</Link>
          <Link to="/how-it-works" className="btn">How it works</Link>
        </div>
      </Section>
    </>
  )
}
