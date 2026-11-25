import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHAKRAVYUH_VIDEOS, ROUTE_SHOT, TOTAL_SHOTS } from '../data/videos'
import { lowMotion } from '../lib/motion'
import { getShotOpacity, scrollSync } from '../lib/scrollSync'

gsap.registerPlugin(ScrollTrigger)

const DIM_BY_SHOT = [0.36, 0.40, 0.42, 0.44, 0.36, 0.46]

export default function VideoBackdrop() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const [ready, setReady] = useState(lowMotion)
  const [gone, setGone] = useState(lowMotion)

  const v0 = useRef<HTMLVideoElement>(null)
  const v1 = useRef<HTMLVideoElement>(null)
  const v2 = useRef<HTMLVideoElement>(null)
  const v3 = useRef<HTMLVideoElement>(null)
  const v4 = useRef<HTMLVideoElement>(null)
  const v5 = useRef<HTMLVideoElement>(null)

  const dimRef = useRef<HTMLDivElement>(null)
  const hudTextRef = useRef<HTMLSpanElement>(null)
  const pipRefs = useRef<(HTMLSpanElement | null)[]>([])
  const mobPipRefs = useRef<(HTMLSpanElement | null)[]>([])

  // ── PRELOADER ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (lowMotion) return
    let loaded = 0
    const mark = () => {
      if (++loaded === 1) setReady(true)
    }
    const els = [v0.current, v1.current, v2.current, v3.current, v4.current, v5.current]
    els.forEach((v) => {
      if (v) v.addEventListener('loadeddata', mark, { once: true })
    })
    const id = setTimeout(() => setReady(true), 4000)
    return () => {
      els.forEach((v) => {
        if (v) v.removeEventListener('loadeddata', mark)
      })
      clearTimeout(id)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const id = setTimeout(() => setGone(true), 850)
    return () => clearTimeout(id)
  }, [ready])

  // ── ROUTE & SCROLL SYNC ────────────────────────────────────────────────────
  useEffect(() => {
    scrollSync.isHome = isHome
    if (!isHome) {
      const targetShot = ROUTE_SHOT[pathname] ?? 0
      scrollSync.progress = targetShot / (TOTAL_SHOTS - 1)
      scrollSync.smoothProgress = scrollSync.progress
      scrollSync.shotFloat = targetShot
      return
    }

    if (lowMotion) return

    let lastScrollY = window.scrollY
    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const currentY = window.scrollY
      const p = Math.min(1, Math.max(0, currentY / max))
      const deltaY = currentY - lastScrollY
      lastScrollY = currentY

      scrollSync.progress = p
      // Normalized velocity impulse for warp dust & video speed modulation
      scrollSync.velocity = Math.max(-3, Math.min(3, deltaY * 0.04))
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: updateScroll,
      onRefresh: updateScroll,
    })
    updateScroll()

    return () => st.kill()
  }, [isHome, pathname])

  // ── 60FPS CONTINUOUS VIDEO CROSSFADE + VELOCITY SYNC ───────────────────────
  useEffect(() => {
    if (lowMotion) return

    const els = [v0.current, v1.current, v2.current, v3.current, v4.current, v5.current]
    let lastLabelIdx = -1

    const tick = () => {
      // Smoothly track shotFloat [0..5]
      const targetShotFloat = scrollSync.isHome
        ? scrollSync.smoothProgress * (TOTAL_SHOTS - 1)
        : (ROUTE_SHOT[pathname] ?? 0)

      scrollSync.shotFloat += (targetShotFloat - scrollSync.shotFloat) * 0.14
      const sf = scrollSync.shotFloat
      const speedBoost = 0.9 + Math.min(0.9, Math.abs(scrollSync.smoothVelocity) * 0.45)

      // Update each video's opacity, subtle depth scale, and play/pause state
      for (let i = 0; i < TOTAL_SHOTS; i++) {
        const v = els[i]
        if (!v) continue
        const op = getShotOpacity(i, sf)
        v.style.opacity = op.toFixed(3)

        // Subtle continuous zoom-in as you pass through each layer
        const offset = sf - i // -1 (entering) -> 0 (center) -> +1 (leaving)
        const scale = 1.03 + offset * 0.035
        v.style.transform = `scale(${scale.toFixed(4)})`

        if (op > 0.02) {
          if (v.paused) {
            v.play().catch(() => { /* muted autoplay */ })
          }
          if (Math.abs(v.playbackRate - speedBoost) > 0.05) {
            v.playbackRate = speedBoost
          }
        } else if (!v.paused) {
          v.pause()
        }
      }

      // Smoothly interpolate dim overlay between shots
      if (dimRef.current) {
        if (!scrollSync.isHome) {
          dimRef.current.style.opacity = '0.68'
        } else {
          const i0 = Math.floor(sf)
          const i1 = Math.min(TOTAL_SHOTS - 1, i0 + 1)
          const frac = sf - i0
          const d = (DIM_BY_SHOT[i0] ?? 0.4) * (1 - frac) + (DIM_BY_SHOT[i1] ?? 0.4) * frac
          dimRef.current.style.opacity = d.toFixed(3)
        }
      }

      // Update HUD label & pips without React re-renders
      const nearest = Math.round(sf)
      if (nearest !== lastLabelIdx) {
        lastLabelIdx = nearest
        if (hudTextRef.current) {
          hudTextRef.current.textContent = CHAKRAVYUH_VIDEOS[nearest]?.name ?? ''
        }
        for (let i = 0; i < TOTAL_SHOTS; i++) {
          const active = i === nearest
          const dPip = pipRefs.current[i]
          if (dPip) {
            dPip.style.width = active ? '22px' : '6px'
            dPip.style.background = active ? '#2de2e6' : 'rgba(176,141,74,0.4)'
            dPip.style.boxShadow = active ? '0 0 8px #2de2e6' : 'none'
          }
          const mPip = mobPipRefs.current[i]
          if (mPip) {
            mPip.style.width = active ? '14px' : '4px'
            mPip.style.background = active ? '#2de2e6' : 'rgba(176,141,74,0.35)'
          }
        }
      }
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
    }
  }, [pathname])

  const videoRefs = [v0, v1, v2, v3, v4, v5]

  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-20 bg-obsidian overflow-hidden">
        {/* Still poster fallback */}
        <img
          src="/bg-poster.jpg"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* 6 stacked video elements — continuous smoothstep crossfade via GSAP ticker */}
        {!lowMotion &&
          CHAKRAVYUH_VIDEOS.map((vid, idx) => (
            <video
              key={vid.id}
              ref={videoRefs[idx]}
              src={vid.src}
              muted
              playsInline
              loop
              preload={idx <= 2 ? 'auto' : 'metadata'}
              tabIndex={-1}
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                opacity: idx === 0 ? 1 : 0,
                filter: 'contrast(1.07) brightness(0.9)',
                willChange: 'opacity, transform',
              }}
            />
          ))}

        {/* Dynamic dim overlay */}
        <div ref={dimRef} className="absolute inset-0 bg-obsidian" style={{ opacity: 0.4 }} />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_40%,#07090d_100%)]" />

        {/* Bronze edge bleed top + bottom */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-obsidian/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian/90 to-transparent pointer-events-none" />

        {/* HUD status bar — Desktop */}
        <div className="hidden md:flex fixed bottom-4 left-5 z-40 items-center gap-2 pointer-events-none select-none">
          <div className="flex gap-1 items-center">
            {CHAKRAVYUH_VIDEOS.map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  pipRefs.current[i] = el
                }}
                className="block rounded-full transition-all duration-500"
                style={{
                  width: i === 0 ? 22 : 6,
                  height: 4,
                  background: i === 0 ? '#2de2e6' : 'rgba(176,141,74,0.4)',
                }}
              />
            ))}
          </div>
          <span
            ref={hudTextRef}
            className="font-mono text-[0.6rem] tracking-[0.22em] uppercase"
            style={{ color: 'rgba(224,184,102,0.7)' }}
          >
            {CHAKRAVYUH_VIDEOS[0]?.name}
          </span>
        </div>

        {/* HUD status bar — Mobile */}
        <div className="flex md:hidden fixed bottom-4 left-4 z-40 gap-1 pointer-events-none">
          {CHAKRAVYUH_VIDEOS.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                mobPipRefs.current[i] = el
              }}
              className="block rounded-full transition-all duration-500"
              style={{
                width: i === 0 ? 14 : 4,
                height: 3,
                background: i === 0 ? '#2de2e6' : 'rgba(176,141,74,0.35)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Preloader */}
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
