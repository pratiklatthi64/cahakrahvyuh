import { event, links, round1Steps, videoQuestions } from '../data/event'
import { Countdown, LinkButton, PageHero, Section } from '../components/ui'

export default function Register() {
  return (
    <>
      <PageHero
        eyebrow="Free for students"
        title="Register"
        sub="Solo or a team of up to 4. Any branch, any college."
      />
      <Section className="grid gap-8 lg:grid-cols-2 items-start">
        <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8">
          <Countdown target={event.registrationDeadline} label="Registration closes in" />
          <p className="mt-3 text-sm text-[#9a958a]">
            Deadline: 8 Dec 2026, 11:59 PM IST (time to be confirmed).
          </p>

          <ol className="list-none p-0 m-0 mt-7 pt-6 border-t border-bronze/25 divide-y divide-bronze/20">
            {round1Steps.map((s, i) => (
              <li key={s} className="py-3.5 first:pt-0 flex gap-4 items-baseline">
                <span className="font-mono text-xs text-bronze shrink-0">0{i + 1}</span>
                <span className="text-[#e9e4d8]">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href={links.googleForm} primary>Register on Google Form</LinkButton>
            <LinkButton href={links.whatsapp}>Join WhatsApp community</LinkButton>
          </div>
        </div>

        <div className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[.15em] uppercase text-cyan">Video checklist</p>
          <h2 className="text-2xl text-gold mt-2 mb-5">Max 2 minutes, covering all four</h2>
          <ol className="list-none p-0 m-0 divide-y divide-bronze/20">
            {videoQuestions.map((q, i) => (
              <li key={q} className="py-3.5 first:pt-0 flex gap-4 items-baseline">
                <span className="font-mono text-xs text-cyan shrink-0">0{i + 1}</span>
                <span className="text-[#e9e4d8]">{q}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 pt-5 border-t border-bronze/25 text-sm text-[#c9c3b4]">
            Your project must already be live and working. Keep your college ID card ready for Round 2.
          </p>
        </div>
      </Section>
    </>
  )
}
