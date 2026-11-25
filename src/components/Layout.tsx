import { lazy, Suspense, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lowMotion } from '../lib/motion'
import VideoBackdrop from './VideoBackdrop'
import SoundToggle from './SoundToggle'

const ChakravyuhScene = lazy(() => import('./ChakravyuhScene'))
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { event, judgeDisclaimer } from '../data/event'

const nav = [
  ['/how-it-works', 'How it works'],
  ['/journey', 'Journey'],
  ['/prizes', 'Prizes'],
  ['/judges', 'Judges'],
  ['/partners', 'Partners'],
  ['/shortlist', 'Shortlist'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => {
    if (lowMotion) return
    const lenis = new Lenis({ lerp: 0.09 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])
  return (
    <div className="grain min-h-screen flex flex-col">
      <VideoBackdrop />
      {!lowMotion && <Suspense fallback={null}><ChakravyuhScene /></Suspense>}
      <SoundToggle />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] btn btn-primary">Skip to content</a>
      <nav className="fixed top-0 inset-x-0 z-50 bg-obsidian/85 backdrop-blur border-b border-bronze/30">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-extrabold tracking-[.12em] text-gold no-underline text-sm sm:text-base" onClick={() => setOpen(false)}>
            CHAKRAVYUH <span className="text-cyan">VIBE CODING</span>
          </Link>
          <ul className="hidden lg:flex gap-5 list-none m-0 p-0">
            {nav.map(([to, l]) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => `font-mono text-[.7rem] tracking-[.15em] uppercase no-underline ${isActive ? 'text-cyan' : 'text-[#c9c3b4] hover:text-gold'}`}>{l}</NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link to="/register" className="btn btn-primary !py-2 !px-3 !min-h-10 !tracking-[.1em] whitespace-nowrap" onClick={() => setOpen(false)}>Register free</Link>
            <button className="lg:hidden btn !px-3 !py-2" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
          </div>
        </div>
        {open && (
          <ul className="lg:hidden list-none m-0 p-5 pt-2 bg-obsidian border-t border-bronze/30 grid gap-1">
            {nav.map(([to, l]) => (
              <li key={to}><NavLink to={to} onClick={() => setOpen(false)} className="block py-3 font-mono text-sm tracking-[.15em] uppercase no-underline text-[#e9e4d8]">{l}</NavLink></li>
            ))}
          </ul>
        )}
      </nav>
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={loc.pathname} initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="border-t border-bronze/30 bg-obsidian/90 px-5 py-10">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          <div>
            <p className="font-display text-gold text-lg">{event.name}</p>
            <p className="text-[#c9c3b4]">{event.tagline}</p>
            <p className="text-sm text-[#9a958a] mt-2">Organised by {event.organizer}. Hiring partner: {event.hiringPartner}.</p>
          </div>
          <p className="text-sm text-[#9a958a]">{judgeDisclaimer}</p>
        </div>
      </footer>
    </div>
  )
}
