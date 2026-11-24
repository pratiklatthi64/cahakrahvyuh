import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHAKRAVYUH_VIDEOS, ROUTE_SHOT, getHomeScrollShot } from '../data/videos'
import { lowMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)


export default function VideoBackdrop() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // Active shot drives which video is visible
  const [activeShot, setActiveShot] = useState<number>(
    isHome ? 0 : (ROUTE_SHOT[pathname] ?? 0)
  )
  const [ready, setReady] = useState(lowMotion)
  const [gone, setGone] = useState(lowMotion)

  // Individual video element refs — no array-of-refs (avoids lint exhaustive-deps)
  const v0 = useRef<HTMLVideoElement>(null)
  const v1 = useRef<HTMLVideoElement>(null)
  const v2 = useRef<HTMLVideoElement>(null)
  const v3 = useRef<HTMLVideoElement>(null)
  const v4 = useRef<HTMLVideoElement>(null)
  const v5 = useRef<HTMLVideoElement>(null)
  const videoEls = [v0, v1, v2, v3, v4, v5]

  const dim = useRef<HTMLDivElement>(null)

  // ── PRELOADER ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (lowMotion) return
    let loaded = 0
    const mark = () => { if (++loaded === 1) setReady(true) }
    const els = [v0.current, v1.current, v2.current, v3.current, v4.current, v5.current]
    els.forEach(v => { if (v) v.addEventListener('loadeddata', mark, { once: true }) })
    const id = setTimeout(() => setReady(true), 4500)
    return () => {
      els.forEach(v => { if (v) v.removeEventListener('loadeddata', mark) })
      clearTimeout(id)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const id = setTimeout(() => setGone(true), 900)
    return () => clearTimeout(id)
  }, [ready])

  // ── PLAY ACTIVE SHOT ───────────────────────────────────────────────────────
  useEffect(() => {
    if (lowMotion) return
    const v = videoEls[activeShot]?.current
    if (v) v.play().catch(() => {/* muted autoplay fine */})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeShot])

  // ── ROUTE-BASED SHOT SELECTION (non-Home) ─────────────────────────────────
  useEffect(() => {
    if (lowMotion || isHome) return
    const target = ROUTE_SHOT[pathname] ?? 0
    setActiveShot(target)
    if (dim.current) gsap.to(dim.current, { opacity: 0.68, duration: 0.7, ease: 'power2.out' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // ── HOME SCROLL → SHOT CROSSFADE ──────────────────────────────────────────
  useEffect(() => {
    if (lowMotion || !isHome) return

    const DIM_BY_SHOT = [0.38, 0.40, 0.42, 0.44, 0.38, 0.50]

    const apply = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, window.scrollY / max))
      const shot = getHomeScrollShot(progress)
      setActiveShot(shot)
      if (dim.current) {
        gsap.to(dim.current, {
          opacity: DIM_BY_SHOT[shot] ?? 0.4,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }

    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: apply, onRefresh: apply })
    apply()
    return () => st.kill()
  }, [isHome])

  return (
    <>
      {/* ─── BACKGROUND LAYER ──────────────────────────────────────────────── */}
      <div aria-hidden className="fixed inset-0 -z-20 bg-obsidian overflow-hidden">
        {/* Poster fallback (hides once videos ready) */}
        <img
          src="/bg-poster.jpg"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* 6 stacked video elements — only the active one is fully opaque */}
        {!lowMotion && CHAKRAVYUH_VIDEOS.map((vid, idx) => {
          const isActive = activeShot === idx
          return (
            <video
              key={vid.id}
              ref={videoEls[idx]}
              src={vid.src}
              muted
              playsInline
              loop
              autoPlay
              preload={idx <= 1 ? 'auto' : 'metadata'}
              tabIndex={-1}
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.04)',
                transition: 'opacity 1.4s cubic-bezier(0.4,0,0.2,1), transform 2.5s ease-out',
                filter: 'contrast(1.07) brightness(0.9)',
                willChange: 'opacity, transform',
                pointerEvents: 'none',
              }}
            />
          )
        })}

        {/* Dynamic dim overlay */}
        <div
          ref={dim}
          className="absolute inset-0 bg-obsidian"
          style={{ opacity: 0.42, transition: 'opacity 0.5s' }}
        />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_40%,#07090d_100%)]" />

        {/* Bronze edge bleed top + bottom */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-obsidian/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian/90 to-transparent pointer-events-none" />

        {/* HUD status bar — IIT Techfest style */}
        <div className="hidden md:flex fixed bottom-4 left-5 z-40 items-center gap-2 pointer-events-none select-none">
          {/* Shot indicators */}
          <div className="flex gap-1 items-center">
            {CHAKRAVYUH_VIDEOS.map((_, i) => (
              <span
                key={i}
                className="block rounded-full transition-all duration-700"
                style={{
                  width: activeShot === i ? 20 : 6,
                  height: 4,
                  background: activeShot === i ? '#2de2e6' : 'rgba(176,141,74,0.4)',
                  boxShadow: activeShot === i ? '0 0 8px #2de2e6' : 'none',
                }}
              />
            ))}
          </div>
          <span
            className="font-mono text-[0.6rem] tracking-[0.22em] uppercase"
            style={{ color: 'rgba(224,184,102,0.65)' }}
          >
            {CHAKRAVYUH_VIDEOS[activeShot]?.name}
          </span>
        </div>

        {/* Mobile minimal indicator */}
        <div className="flex md:hidden fixed bottom-4 left-4 z-40 gap-1 pointer-events-none">
          {CHAKRAVYUH_VIDEOS.map((_, i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{
                width: activeShot === i ? 14 : 4,
                height: 3,
                background: activeShot === i ? '#2de2e6' : 'rgba(176,141,74,0.35)',
                transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── PRELOADER OVERLAY ─────────────────────────────────────────────── */}
      {!gone && (
        <div
          role="status"
          aria-label="Entering the Chakravyuh"
          className="fixed inset-0 z-[90] bg-obsidian grid place-items-center"
          style={{
            opacity: ready ? 0 : 1,
            pointerEvents: ready ? 'none' : undefined,
            transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Six-ring preloader matching the Chakravyuh 6-layer concept */}
            <svg viewBox="-60 -60 120 120" className="w-36 h-36" aria-hidden>
              {[46, 36, 27, 19, 12, 6].map((r, i) => (
                <circle
                  key={r}
                  r={r}
                  fill="none"
                  stroke={i === 0 ? '#b08d4a' : i === 5 ? '#2de2e6' : '#e0b866'}
                  strokeOpacity={0.15 + i * 0.14}
                  strokeWidth={i === 5 ? 3 : 1.2}
                  strokeDasharray={i === 5 ? '0' : `${r * 0.9} ${r * 0.4}`}
                  className={i % 2 === 0 ? 'spin-slow' : 'spin-rev'}
                  style={{ animationDuration: `${9 + i * 5}s` }}
                />
              ))}
              <circle r="4" fill="#2de2e6" className="pulse" />
            </svg>
            <div className="text-center">
              <p className="font-mono text-[0.65rem] tracking-[0.3em] text-cyan uppercase animate-pulse">
                Entering the Chakravyuh
              </p>
              <p className="font-mono text-[0.55rem] tracking-[0.2em] mt-1" style={{ color: 'rgba(224,184,102,0.5)' }}>
                SHOT {activeShot + 1} / {CHAKRAVYUH_VIDEOS.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
