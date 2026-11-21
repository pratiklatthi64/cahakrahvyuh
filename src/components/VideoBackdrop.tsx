import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Seconds into the 15s fly-through shown on each inner page (scrubs a little with scroll).
const PAGE_FRAME: Record<string, number> = {
  '/how-it-works': 4, '/journey': 9, '/prizes': 12.5, '/judges': 6.5, '/partners': 5,
  '/register': 14, '/shortlist': 7.5, '/faq': 10, '/contact': 3,
}

export const lowMotion =
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true)

/** Fixed full-screen reference video, scrubbed by scroll. Falls back to a still frame in low-motion mode. */
export default function VideoBackdrop() {
  const { pathname } = useLocation()
  const vid = useRef<HTMLVideoElement>(null)
  const dim = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(lowMotion)
  const [gone, setGone] = useState(lowMotion)
  const src = typeof window !== 'undefined' && window.innerWidth < 768 ? '/bg-sm.mp4' : '/bg.mp4'

  // Preloader: hide once the video can play, or after 5s at most.
  useEffect(() => {
    const v = vid.current
    if (!v) return
    const done = () => setReady(true)
    v.addEventListener('loadeddata', done)
    const t = setTimeout(done, 5000)
    return () => { v.removeEventListener('loadeddata', done); clearTimeout(t) }
  }, [])
  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => setGone(true), 900)
    return () => clearTimeout(t)
  }, [ready])

  // Scroll -> video time + dim level.
  useEffect(() => {
    const v = vid.current
    const d = dim.current
    if (!v || !d || lowMotion) return
    const isHome = pathname === '/'
    const base = PAGE_FRAME[pathname] ?? 8
    const state = { t: isHome ? 0 : base }
    let target = state.t
    const seek = () => { if (v.readyState >= 2 && Math.abs(v.currentTime - state.t) > 0.02) v.currentTime = state.t }
    const apply = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight)
      let dimLevel = 0.72
      if (isHome) {
        const fly = document.getElementById('fly')
        const end = fly ? fly.offsetTop + fly.offsetHeight - innerHeight : max
        const p = Math.min(1, Math.max(0, scrollY / Math.max(1, end)))
        target = Math.max(0, p * (v.duration || 15) - 0.05)
        const after = Math.min(1, Math.max(0, (scrollY - end) / (innerHeight * 0.8)))
        dimLevel = 0.38 - Math.min(0.2, p * 4) + after * 0.5 + (1 - Math.min(1, p * 6)) * 0.0
      } else {
        target = base + (scrollY / max) * 1.5
      }
      gsap.to(state, { t: target, duration: 0.5, ease: 'power3.out', overwrite: true, onUpdate: seek })
      gsap.to(d, { opacity: dimLevel, duration: 0.5, overwrite: 'auto' })
    }
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: apply, onRefresh: apply })
    apply()
    const r = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => { st.kill(); clearTimeout(r); gsap.killTweensOf(state) }
  }, [pathname])

  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-20 bg-obsidian overflow-hidden">
        <img src="/bg-poster.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        {!lowMotion && (
          <video ref={vid} src={src} muted playsInline preload="auto" tabIndex={-1}
            className="absolute inset-0 w-full h-full object-cover scale-[1.25] origin-top-left" />
        )}
        <div ref={dim} className="absolute inset-0 bg-obsidian" style={{ opacity: 0.4 }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#07090d_100%)]" />
      </div>
      {!gone && (
        <div role="status" aria-label="Loading" className={`fixed inset-0 z-[90] bg-obsidian grid place-items-center transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}>
          <svg viewBox="-50 -50 100 100" className="w-28 h-28">
            <circle r="40" fill="none" stroke="#b08d4a" strokeOpacity=".3" strokeWidth="2" />
            <circle r="40" fill="none" stroke="#2de2e6" strokeWidth="3" strokeDasharray="60 200" className="spin-slow" style={{ animationDuration: '1.6s' }} />
            <circle r="9" fill="#2de2e6" className="pulse" />
          </svg>
        </div>
      )}
    </>
  )
}
