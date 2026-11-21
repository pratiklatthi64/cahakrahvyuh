import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { event, facts, judges, links } from '../data/event'
import { Countdown, LinkButton, Section } from '../components/ui'
import JourneyRings from '../components/JourneyRings'
import JudgeAvatar from '../components/JudgeAvatar'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const shadow = { textShadow: '0 2px 24px rgba(0,0,0,.9)' }

export default function Home() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Hero text fades as the gate begins to open.
    gsap.to('.hero-copy', {
      opacity: 0, y: -60, ease: 'power3.inOut',
      scrollTrigger: { trigger: '#fly', start: 'top top', end: '+=40%', scrub: true },
    })
    // Fly-through fact panels: one at a time as the camera moves down the corridor.
    const panels = gsap.utils.toArray<HTMLElement>('.fly-panel')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#fly', start: 'top top', end: 'bottom bottom', scrub: 0.6 },
    })
    tl.to({}, { duration: 1 }) // hold while the gate opens
    panels.forEach((p, i) => {
      const side = i % 2 === 0 ? -1 : 1
      tl.fromTo(p, { opacity: 0, x: 60 * side, scale: 0.94 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
        .to(p, { opacity: 0, x: -40 * side, duration: 0.5, ease: 'power3.in' }, '+=0.7')
    })
    tl.to({}, { duration: 0.6 })
    // Core call-to-action reveal.
    gsap.from('.core-copy > *', {
      opacity: 0, y: 40, stagger: 0.12, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#core', start: 'top 60%' },
    })
  }, { scope: root })

  return (
    <div ref={root}>
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-5 pt-24 pb-12">
        <div className="hero-copy flex flex-col items-center" style={shadow}>
          <p className="label mb-4">DYPCOE Akurdi · Hiring partner Intellobyte</p>
          <h1 className="bronze-text font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-[1.05]">CHAKRAVYUH<br />VIBE CODING</h1>
          <p className="font-display text-xl sm:text-3xl text-cyan mt-5 tracking-[.2em]">{event.tagline}</p>
          <p className="font-mono text-sm mt-4 text-[#e9e4d8]">12 Dec 2026 · DYPCOE Akurdi</p>
          <div className="mt-8"><Countdown target={event.registrationDeadline} label="Registration closes in" /></div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/register" className="btn btn-primary">Register free</Link>
            <a href="#fly" className="btn">Enter the Chakravyuh</a>
          </div>
        </div>
      </section>

      {/* Fly-through: the video scrubs from the sealed gate to the core while panels appear. */}
      <section id="fly" className="relative h-[480vh]" aria-label="Fly-through: key facts">
        <div className="sticky top-0 h-screen overflow-hidden">
          {facts.map((f, i) => (
            <div key={f.k} className={`fly-panel holo absolute top-1/2 -translate-y-1/2 p-5 sm:p-8 max-w-[82vw] sm:max-w-md opacity-0 ${i % 2 === 0 ? 'left-[6vw]' : 'right-[6vw]'}`}>
              <p className="label">{f.k}</p>
              <p className="font-display text-2xl sm:text-4xl bronze-text mt-2">{f.v}</p>
            </div>
          ))}
          <p className="label absolute bottom-6 inset-x-0 text-center pulse">Keep scrolling</p>
        </div>
      </section>

      <section id="core" className="min-h-screen grid place-items-center px-5 text-center">
        <div className="core-copy" style={shadow}>
          <p className="label mb-3">The core</p>
          <h2 className="bronze-text text-4xl sm:text-6xl font-extrabold">You reached the centre.</h2>
          <p className="mt-3 text-lg text-[#e9e4d8] max-w-xl mx-auto">Register free, submit your video, and earn your place in the live round on 12 Dec.</p>
          <div className="mt-6 flex justify-center"><Countdown target={event.round2Start} label="Round 2 starts in" /></div>
          <div className="mt-6"><Link to="/register" className="btn btn-primary">Register free</Link></div>
        </div>
      </section>

      <div className="bg-obsidian/70 backdrop-blur-sm">
        <Section className="!pt-16">
          <div id="enter" className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="label mb-2">What is this</p>
              <h2 className="text-3xl sm:text-4xl text-gold">Enter the formation. Break the layers. Reach the core.</h2>
              <p className="mt-4 text-[#c9c3b4]">Chakravyuh Vibe Coding is a two-round vibe-coding hackathon for students. We are looking for the best vibe coders for Intellobyte Tech Solutions, and winners earn internship opportunities.</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 list-none m-0 p-0">
              {facts.map((f) => (
                <li key={f.k} className="holo p-4"><span className="label !text-bronze">{f.k}</span><span className="block text-lg mt-1">{f.v}</span></li>
              ))}
            </ul>
          </div>
        </Section>

        <Section>
          <div className="panel p-6 sm:p-10 text-center">
            <p className="label mb-2">The perk</p>
            <h2 className="text-2xl sm:text-4xl bronze-text">Internship opportunities with Intellobyte</h2>
            <p className="mt-3 text-[#c9c3b4]">Winners get the chance to work with our hiring partner. More prizes announcing soon.</p>
            <div className="mt-5"><Link to="/prizes" className="btn">See prizes</Link></div>
          </div>
        </Section>

        <Section>
          <p className="label mb-2">The journey</p>
          <h2 className="text-3xl sm:text-4xl text-gold mb-8">Six stages, one core</h2>
          <JourneyRings compact />
          <div className="mt-6"><Link to="/journey" className="btn">Full timeline</Link></div>
        </Section>

        <Section>
          <p className="label mb-2">The judges</p>
          <h2 className="text-3xl sm:text-4xl text-gold mb-6">AI agents that think like the world's biggest tech leaders</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {judges.map((j, i) => (
              <div key={j.slug} className="panel overflow-hidden">
                <JudgeAvatar name={j.name} variant={i} />
                <div className="p-3"><p className="font-display text-gold">AI JUDGE AGENT</p><p className="text-sm text-[#c9c3b4]">Modeled on the thinking of {j.name}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-6"><Link to="/judges" className="btn">Meet the judges</Link></div>
        </Section>

        <Section className="text-center">
          <h2 className="text-3xl sm:text-4xl text-gold mb-4">Join the community</h2>
          <LinkButton href={links.whatsapp}>Join WhatsApp community</LinkButton>
        </Section>
      </div>
    </div>
  )
}
