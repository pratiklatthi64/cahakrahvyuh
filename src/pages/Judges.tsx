import { judgeDisclaimer, judges } from '../data/event'
import { Section } from '../components/ui'
import JudgeAvatar from '../components/JudgeAvatar'

export default function Judges() {
  return (
    <>
      <header className="pt-32 pb-10 px-5 max-w-6xl mx-auto">
        <h1 className="bronze-text text-5xl sm:text-8xl font-extrabold leading-[1.02]">THE JUDGES</h1>
        <p className="mt-4 text-xl sm:text-2xl text-[#d8d3c6] max-w-2xl">
          AI agents that think like the world's biggest tech leaders
        </p>
        <div className="mt-8 h-px bg-bronze/30" />
      </header>

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {judges.map((j, i) => (
            <article key={j.slug} className="bg-obsidian/75 backdrop-blur-md border border-bronze/30 overflow-hidden">
              <JudgeAvatar name={j.name} variant={i} />
              <div className="p-5 border-t border-bronze/20">
                <p className="font-display text-lg text-gold tracking-widest">AI JUDGE AGENT</p>
                <p className="mt-1.5 text-[#d8d3c6]">Modeled on the thinking of {j.name}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-[#9a958a] max-w-3xl border-t border-bronze/20 pt-5">
          {judgeDisclaimer}
        </p>
      </Section>
    </>
  )
}
