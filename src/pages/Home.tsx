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

const shadow = { textShadow: '0 2px 24px rgba(0,0,0,.92)' }

const CHAPTERS = [
  {
    step: '01',
    title: 'Free for all students',
    line: 'Any branch, any college. Compete solo or in a team of up to 4.',
  },
  {
    step: '02',
    title: 'Round 1 closes 8 Dec',
    line: 'Deploy a live working project and submit a 2-minute demo video.',
  },
  {
    step: '03',
    title: 'Round 2 live on 12 Dec',
    line: '6 hours at Reading Room, DYPCOE Akurdi. Any AI tools allowed. Bring college ID.',
  },
  {
    step: '04',
    title: 'Win Intellobyte internships',
    line: 'Judged on UI/UX and execution. Results announced at 7:00 PM same day.',
  },
]

const AT_A_GLANCE = [
  { k: 'Eligibility', v: 'Any student, 1 to 4 members' },
  { k: 'Entry fee', v: 'Free' },
  { k: 'Round 1 deadline', v: '8 Dec 2026 (online)' },
  { k: 'Round 2', v: '12 Dec, 11 AM to 6 PM IST' },
  { k: 'Venue', v: 'Reading Room, DYPCOE Akurdi' },
  { k: 'Prize', v: 'Intellobyte internships' },
]

export default function Home() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animation and 3D/video sync preserved intact
    gsap.to('.hero-copy', {
      opacity: 0,
      y: -40,
      scale: 0.97,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: '#fly', start: 'top 95%', end: 'top 25%', scrub: true },
    })

    const chapters = gsap.utils.toArray<HTMLElement>('.fly-chapter')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#fly', start: 'top top', end: 'bottom bottom', scrub: 0.5 },
    })
    chapters.forEach((el) => {
      tl.fromTo(
        el,
        { opacity: 0, y: 26, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }
      ).to(el, { opacity: 0, y: -22, scale: 0.98, duration: 0.45, ease: 'power2.in' }, '+=0.9')
    })

    gsap.from('.core-copy > *', {
      opacity: 0,
      y: 24,
      stagger: 0.08,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#core', start: 'top 75%', once: true },
    })

    gsap.utils.toArray<HTMLElement>('.flow-section').forEach((sec) => {
      gsap.from(sec, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sec, start: 'top 85%', once: true },
      })
    })
  }, { scope: root })

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-5 pt-24 pb-12">
        <div className="hero-copy flex flex-col items-center" style={shadow}>
          <p className="font-mono text-xs tracking-[.2em] uppercase text-[#c9c3b4] mb-4">
            DYPCOE Akurdi &amp; Intellobyte Tech Solutions
          </p>
          <h1 className="bronze-text font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-[1.04]">
            CHAKRAVYUH
            <br />
            VIBE CODING
          </h1>
          <p className="font-display text-xl sm:text-2xl text-cyan mt-5 tracking-[.18em]">{event.tagline}</p>
          <p className="mt-4 text-[#e9e4d8]">
            Student vibe-coding hackathon. Round 1 closes 8 Dec. Live finals 12 Dec.
          </p>
          <div className="mt-8">
            <Countdown target={event.registrationDeadline} label="Registration closes in" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/register" className="btn btn-primary">Register free</Link>
            <a href="#fly" className="btn">How it works</a>
          </div>
        </div>
      </section>

      {/* Scroll Walkthrough: crisp, scannable statements directly over the 3D/video tunnel */}
      <section id="fly" className="relative h-[300vh]" aria-label="Key hackathon details">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center px-5">
          {CHAPTERS.map((ch) => (
            <div
              key={ch.step}
              className="fly-chapter absolute w-full max-w-2xl text-center px-6 py-8 bg-obsidian/70 backdrop-blur-md border-y border-bronze/35 opacity-0"
              style={shadow}
            >
              <span className="font-mono text-xs tracking-[.22em] text-cyan">{ch.step} / 04</span>
              <h2 className="bronze-text text-3xl sm:text-5xl font-extrabold mt-2">{ch.title}</h2>
              <p className="mt-3 text-lg sm:text-xl text-[#f3efe6] max-w-xl mx-auto">{ch.line}</p>
            </div>
          ))}
          <p className="font-mono text-xs tracking-[.22em] uppercase text-[#c9c3b4] absolute bottom-10 inset-x-0 text-center pulse">
            Scroll to continue
          </p>
        </div>
      </section>

      {/* The Core: clean editorial spec sheet + CTA */}
      <section id="core" className="min-h-screen flex items-center justify-center px-5 py-20">
        <div className="core-copy w-full max-w-4xl bg-obsidian/80 backdrop-blur-md border border-bronze/35 p-6 sm:p-12" style={shadow}>
          <div className="text-center">
            <h2 className="bronze-text text-3xl sm:text-5xl font-extrabold">Ready to enter?</h2>
            <p className="mt-3 text-[#d8d3c6] max-w-xl mx-auto">
              Deploy a working project, record a 2-minute video, and register before 8 Dec.
            </p>
          </div>

          <dl className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 border-y border-bronze/25 py-6 m-0 text-left">
            {AT_A_GLANCE.map((item) => (
              <div key={item.k}>
                <dt className="font-mono text-xs tracking-[.15em] uppercase text-bronze">{item.k}</dt>
                <dd className="m-0 mt-1 text-lg text-[#f3efe6] font-semibold">{item.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col items-center gap-6">
            <Countdown target={event.round2Start} label="Round 2 starts in" />
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/register" className="btn btn-primary">Register free</Link>
              <Link to="/how-it-works" className="btn">Read rules</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lower sections */}
      <div className="bg-gradient-to-b from-transparent via-obsidian/70 to-obsidian/95">
        <Section className="!pt-12 flow-section">
          <div id="enter" className="grid gap-10 lg:grid-cols-2 items-start border-t border-bronze/25 pt-12">
            <div style={shadow}>
              <h2 className="text-3xl sm:text-4xl text-gold">Two rounds. One goal.</h2>
              <p className="mt-4 text-[#d8d3c6] max-w-lg">
                Chakravyuh Vibe Coding finds top student builders for Intellobyte Tech Solutions. Winners earn internship opportunities.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 m-0">
              {facts.map((f) => (
                <div key={f.k} className="border-b border-bronze/20 pb-3">
                  <dt className="font-mono text-xs tracking-[.15em] uppercase text-bronze">{f.k}</dt>
                  <dd className="m-0 mt-1 text-lg text-[#f3efe6]">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section className="flow-section">
          <div className="border-y border-bronze/30 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-4xl bronze-text">Internship opportunities with Intellobyte</h2>
              <p className="mt-2 text-[#c9c3b4]">Awarded to winners. Additional prizes will be announced soon.</p>
            </div>
            <Link to="/prizes" className="btn shrink-0">View prizes</Link>
          </div>
        </Section>

        <Section className="flow-section">
          <h2 className="text-3xl sm:text-4xl text-gold mb-8" style={shadow}>The journey</h2>
          <JourneyRings compact />
          <div className="mt-6">
            <Link to="/journey" className="btn">Full timeline</Link>
          </div>
        </Section>

        <Section className="flow-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl sm:text-4xl text-gold" style={shadow}>AI Judge Agents</h2>
              <p className="mt-1 text-[#c9c3b4]">AI agents that think like the world's biggest tech leaders</p>
            </div>
            <Link to="/judges" className="btn shrink-0">All judges</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {judges.map((j, i) => (
              <div key={j.slug} className="bg-obsidian/75 border border-bronze/30">
                <JudgeAvatar name={j.name} variant={i} />
                <div className="p-4 border-t border-bronze/20">
                  <p className="font-display text-gold">AI JUDGE AGENT</p>
                  <p className="text-sm text-[#c9c3b4] mt-1">Modeled on the thinking of {j.name}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section className="text-center flow-section">
          <h2 className="text-3xl sm:text-4xl text-gold mb-4" style={shadow}>Stay updated</h2>
          <LinkButton href={links.whatsapp}>Join WhatsApp community</LinkButton>
        </Section>
      </div>
    </div>
  )
}
