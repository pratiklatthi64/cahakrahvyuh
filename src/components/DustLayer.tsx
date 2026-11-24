import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function generatePositions(count: number): Float32Array {
  const a = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Pseudo-random deterministic distribution based on index
    const r1 = Math.sin(i * 12.9898) * 43758.5453
    const r2 = Math.sin((i + 1) * 78.233) * 43758.5453
    const r3 = Math.sin((i + 2) * 45.164) * 43758.5453
    a[i * 3] = ((r1 - Math.floor(r1)) - 0.5) * 14
    a[i * 3 + 1] = ((r2 - Math.floor(r2)) - 0.5) * 8
    a[i * 3 + 2] = ((r3 - Math.floor(r3)) - 0.5) * 8
  }
  return a
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const [pos] = useState(() => generatePositions(count))

  // Per-frame values stay in refs/Three objects, never React state.
  useFrame((s, dt) => {
    const p = ref.current
    if (!p) return
    p.rotation.y += dt * 0.02
    p.position.y += dt * 0.05
    if (p.position.y > 1) p.position.y = -1
    p.position.x += (s.pointer.x * 0.4 - p.position.x) * 0.03
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#e0b866" transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}

export default function DustLayer() {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas dpr={[1, mobile ? 1.25 : 1.5]} camera={{ position: [0, 0, 5], fov: 55 }} gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}>
        <Dust count={mobile ? 120 : 320} />
      </Canvas>
    </div>
  )
}
