import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollSync } from '../lib/scrollSync'

const RING_COUNT = 6
const RING_SPACING = 14
const START_Z = 6
const END_Z = -(RING_COUNT - 1) * RING_SPACING - 4 // -74

function generateTunnelDust(count: number): { positions: Float32Array; colors: Float32Array } {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const gold = new THREE.Color('#e0b866')
  const cyan = new THREE.Color('#2de2e6')

  for (let i = 0; i < count; i++) {
    const r1 = Math.sin(i * 12.9898 + 1.1) * 43758.5453
    const r2 = Math.sin(i * 78.233 + 2.3) * 43758.5453
    const r3 = Math.sin(i * 45.164 + 3.7) * 43758.5453
    const r4 = Math.sin(i * 93.989 + 4.9) * 43758.5453

    const angle = (r1 - Math.floor(r1)) * Math.PI * 2
    const radius = 1.4 + (r2 - Math.floor(r2)) * 7.5
    const z = 10 - (r3 - Math.floor(r3)) * 96 // spans +10 to -86

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = Math.sin(angle) * radius
    positions[i * 3 + 2] = z

    // 75% warm gold dust, 25% cyan energy sparks
    const c = (r4 - Math.floor(r4)) > 0.75 ? cyan : gold
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }
  return { positions, colors }
}

function ChakravyuhTunnel({ dustCount }: { dustCount: number }) {
  const dustRef = useRef<THREE.Points>(null)
  const ringGroupRefs = useRef<(THREE.Group | null)[]>([])
  const cyanMatRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([])
  const bronzeMatRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([])
  const [{ positions, colors }] = useState(() => generateTunnelDust(dustCount))

  useFrame((state, dt) => {
    // Clamp delta to avoid huge jumps on tab switch
    const delta = Math.min(dt, 0.05)

    // Smoothly interpolate scroll progress & velocity
    scrollSync.smoothProgress += (scrollSync.progress - scrollSync.smoothProgress) * Math.min(1, delta * 7)
    scrollSync.smoothVelocity += (scrollSync.velocity - scrollSync.smoothVelocity) * Math.min(1, delta * 6)
    scrollSync.velocity *= Math.pow(0.08, delta) // decay instantaneous velocity

    // Camera Z travels down the 6-ring Chakravyuh tunnel on Home, or gentle idle on inner pages
    const targetZ = scrollSync.isHome
      ? START_Z + scrollSync.smoothProgress * (END_Z - START_Z)
      : START_Z - scrollSync.shotFloat * RING_SPACING + 5

    const cam = state.camera as THREE.PerspectiveCamera
    cam.position.z += (targetZ - cam.position.z) * Math.min(1, delta * 8)

    // Subtle mouse parallax + gentle breathing roll
    const px = state.pointer.x * 0.55
    const py = state.pointer.y * 0.35
    cam.position.x += (px - cam.position.x) * Math.min(1, delta * 4)
    cam.position.y += (py - cam.position.y) * Math.min(1, delta * 4)
    cam.rotation.z = -cam.position.x * 0.04 + scrollSync.smoothProgress * 0.18
    cam.rotation.y = -cam.position.x * 0.03
    cam.rotation.x = cam.position.y * 0.03

    // Dynamic FOV warp boost when scrolling fast
    const targetFov = 55 + Math.min(9, Math.abs(scrollSync.smoothVelocity) * 3.5)
    if (Math.abs(cam.fov - targetFov) > 0.05) {
      cam.fov += (targetFov - cam.fov) * Math.min(1, delta * 5)
      cam.updateProjectionMatrix()
    }

    // Animate each of the 6 Chakravyuh portal rings
    const t = state.clock.elapsedTime
    for (let i = 0; i < RING_COUNT; i++) {
      const grp = ringGroupRefs.current[i]
      if (!grp) continue

      const ringZ = -i * RING_SPACING
      const dist = Math.abs(cam.position.z - ringZ)
      // Proximity factor [0..1] peaks when camera is near/passing through this ring
      const proximity = Math.max(0, 1 - dist / (RING_SPACING * 1.1))

      // Counter-rotating concentric feel + speed up as camera passes through
      const dir = i % 2 === 0 ? 1 : -1
      grp.rotation.z = t * (0.08 + proximity * 0.25) * dir + i * 0.5

      const cyanMat = cyanMatRefs.current[i]
      if (cyanMat) {
        cyanMat.opacity = 0.08 + proximity * 0.55
      }
      const bronzeMat = bronzeMatRefs.current[i]
      if (bronzeMat) {
        bronzeMat.opacity = 0.12 + proximity * 0.35
      }
    }

    // Animate dust particles with scroll velocity
    if (dustRef.current) {
      dustRef.current.rotation.z += delta * (0.015 + Math.abs(scrollSync.smoothVelocity) * 0.08)
    }
  })

  return (
    <>
      {/* Tunnel Dust & Cyan Sparks */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* 6 Concentric Chakravyuh Portal Rings spaced along the scroll corridor */}
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <group
          key={i}
          position={[0, 0, -i * RING_SPACING]}
          ref={(el) => {
            ringGroupRefs.current[i] = el
          }}
        >
          {/* Outer Aged Bronze Segmented Ring */}
          <mesh>
            <torusGeometry args={[3.8, 0.035, 8, 48, Math.PI * 1.65]} />
            <meshBasicMaterial
              ref={(el) => {
                bronzeMatRefs.current[i] = el
              }}
              color="#b08d4a"
              transparent
              opacity={0.22}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Inner Glowing Cyan Energy Ring */}
          <mesh rotation={[0, 0, Math.PI * 0.6]}>
            <torusGeometry args={[3.25, 0.02, 8, 48, Math.PI * 1.35]} />
            <meshBasicMaterial
              ref={(el) => {
                cyanMatRefs.current[i] = el
              }}
              color="#2de2e6"
              transparent
              opacity={0.25}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}

export default function ChakravyuhScene() {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={[1, mobile ? 1.25 : 1.5]}
        camera={{ position: [0, 0, START_Z], fov: 55, near: 0.1, far: 120 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <ChakravyuhTunnel dustCount={mobile ? 140 : 360} />
      </Canvas>
    </div>
  )
}
