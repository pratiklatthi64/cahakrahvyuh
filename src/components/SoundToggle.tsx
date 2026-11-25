import { useEffect, useRef, useState } from 'react'

/**
 * Optional ambient Chakravyuh drone using Web Audio API (off by default).
 * Zero external audio files required.
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const toggle = () => {
    if (!on) {
      if (!ctxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        const master = ctx.createGain()
        master.gain.value = 0.0001

        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 240

        const osc1 = ctx.createOscillator()
        osc1.type = 'sine'
        osc1.frequency.value = 55 // A1 deep drone

        const osc2 = ctx.createOscillator()
        osc2.type = 'triangle'
        osc2.frequency.value = 82.41 // E2 fifth harmonic

        const g2 = ctx.createGain()
        g2.gain.value = 0.3

        osc1.connect(filter)
        osc2.connect(g2)
        g2.connect(filter)
        filter.connect(master)
        master.connect(ctx.destination)

        osc1.start()
        osc2.start()

        ctxRef.current = ctx
        gainRef.current = master
      }

      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume().catch(() => {})
      }
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.04, ctxRef.current.currentTime + 0.8)
      }
      setOn(true)
    } else {
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctxRef.current.currentTime + 0.5)
      }
      setOn(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Enable ambient sound'}
      className="fixed bottom-4 right-4 z-40 font-mono text-[0.65rem] tracking-[0.18em] uppercase px-3 py-1.5 bg-obsidian/80 backdrop-blur-md border border-bronze/40 text-gold hover:border-cyan hover:text-cyan transition-colors cursor-pointer"
    >
      {on ? 'Sound · On' : 'Sound · Off'}
    </button>
  )
}
