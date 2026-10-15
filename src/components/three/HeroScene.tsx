import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

type HeroSceneProps = {
  /** Number of product nodes orbiting the core. */
  nodeCount?: number
  reducedMotion?: boolean
  onReady?: () => void
  onFail?: () => void
}

const ACCENT = new THREE.Color('#4c8dff')
const VIOLET = new THREE.Color('#8b7eff')
const GOLD = new THREE.Color('#d6a648')

/**
 * "Qode core": a faceted metallic core (the platform) with three tilted orbits
 * carrying product nodes. Each node is wired to the core and data pulses travel
 * inward along those connections. Pointer and scroll gently shift the composition.
 */
export default function HeroScene({ nodeCount = 10, reducedMotion = false, onReady, onFail }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const callbacks = useRef({ onReady, onFail })

  useEffect(() => {
    callbacks.current = { onReady, onFail }
  }, [onReady, onFail])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isSmall = window.matchMedia('(max-width: 767px)').matches
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: true, powerPreference: 'high-performance' })
    } catch {
      callbacks.current.onFail?.()
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.25 : 1.75))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0.4, 11)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const roomEnvironment = new RoomEnvironment()
    const envTexture = pmrem.fromScene(roomEnvironment, 0.04).texture
    scene.environment = envTexture

    const disposables: { dispose: () => void }[] = [pmrem, envTexture]
    const track = <T extends { dispose: () => void }>(item: T) => {
      disposables.push(item)
      return item
    }

    // Lighting: cool key, violet rim, warm brand accent from below.
    scene.add(new THREE.AmbientLight(0x8fa6ff, 0.25))
    const key = new THREE.DirectionalLight(0xdfe8ff, 1.6)
    key.position.set(4, 6, 6)
    scene.add(key)
    const rim = new THREE.PointLight(VIOLET, 40, 30)
    rim.position.set(-5, 2, -4)
    scene.add(rim)
    const warm = new THREE.PointLight(GOLD, 18, 20)
    warm.position.set(2, -4, 3)
    scene.add(warm)

    const root = new THREE.Group()
    scene.add(root)

    // Core
    const coreGeometry = track(new THREE.IcosahedronGeometry(1.25, 0))
    const coreMaterial = track(
      new THREE.MeshPhysicalMaterial({
        color: 0x23356a,
        metalness: 0.85,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        flatShading: true,
        envMapIntensity: 0.9,
      }),
    )
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    root.add(core)

    const shellGeometry = track(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.75, 1)))
    const shellMaterial = track(new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.32 }))
    const shell = new THREE.LineSegments(shellGeometry, shellMaterial)
    root.add(shell)

    const haloGeometry = track(new THREE.TorusGeometry(1.5, 0.012, 8, 160))
    const haloMaterial = track(new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.85 }))
    const halo = new THREE.Mesh(haloGeometry, haloMaterial)
    halo.rotation.x = Math.PI / 2.2
    root.add(halo)

    // Orbits and product nodes
    const orbitDefs = [
      { radius: 2.6, tilt: new THREE.Euler(1.2, 0.2, 0.1), speed: 0.12 },
      { radius: 3.3, tilt: new THREE.Euler(0.5, -0.6, 0.4), speed: -0.08 },
      { radius: 4.0, tilt: new THREE.Euler(1.75, 0.5, -0.3), speed: 0.05 },
    ]

    const orbitGroups: THREE.Group[] = []
    const orbitLineMaterial = track(new THREE.MeshBasicMaterial({ color: 0x9fb4e6, transparent: true, opacity: 0.16 }))
    const nodeGeometry = track(new THREE.SphereGeometry(0.075, 16, 16))
    const nodeHaloGeometry = track(new THREE.SphereGeometry(0.17, 16, 16))
    const nodeMaterial = track(new THREE.MeshBasicMaterial({ color: 0xdce6ff }))
    const nodeGoldMaterial = track(new THREE.MeshBasicMaterial({ color: GOLD }))
    const nodeHaloMaterial = track(
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }),
    )

    const nodes: THREE.Object3D[] = []
    orbitDefs.forEach((def, orbitIndex) => {
      const group = new THREE.Group()
      group.rotation.copy(def.tilt)
      group.userData.speed = def.speed
      const ringGeometry = track(new THREE.TorusGeometry(def.radius, 0.006, 6, 220))
      group.add(new THREE.Mesh(ringGeometry, orbitLineMaterial))

      const count = Math.round(nodeCount / orbitDefs.length) + (orbitIndex === 0 ? nodeCount % orbitDefs.length : 0)
      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2 + orbitIndex * 0.7
        const node = new THREE.Group()
        node.position.set(Math.cos(angle) * def.radius, Math.sin(angle) * def.radius, 0)
        node.add(new THREE.Mesh(nodeGeometry, (i + orbitIndex) % 4 === 0 ? nodeGoldMaterial : nodeMaterial))
        node.add(new THREE.Mesh(nodeHaloGeometry, nodeHaloMaterial))
        group.add(node)
        nodes.push(node)
      }
      root.add(group)
      orbitGroups.push(group)
    })

    // Connections from each node to the core, plus pulses travelling inward.
    const linkPositions = new Float32Array(nodes.length * 6)
    const linkGeometry = track(new THREE.BufferGeometry())
    linkGeometry.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3))
    const linkMaterial = track(new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.22 }))
    const links = new THREE.LineSegments(linkGeometry, linkMaterial)
    root.add(links)

    const pulsePositions = new Float32Array(nodes.length * 3)
    const pulseGeometry = track(new THREE.BufferGeometry())
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3))
    const pulseMaterial = track(
      new THREE.PointsMaterial({ color: 0xbfd4ff, size: 0.09, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    const pulses = new THREE.Points(pulseGeometry, pulseMaterial)
    root.add(pulses)
    const pulseOffsets = nodes.map((_, index) => (index * 0.37) % 1)

    // Ambient depth particles
    const starCount = isSmall ? 140 : 360
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i += 1) {
      const r = 6 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      starPositions[i * 3 + 2] = r * Math.cos(phi) - 6
    }
    const starGeometry = track(new THREE.BufferGeometry())
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMaterial = track(new THREE.PointsMaterial({ color: 0x8ea2d8, size: 0.03, transparent: true, opacity: 0.55, depthWrite: false }))
    scene.add(new THREE.Points(starGeometry, starMaterial))

    // Sizing
    const resize = () => {
      const { clientWidth, clientHeight } = container
      if (!clientWidth || !clientHeight) return
      renderer.setSize(clientWidth, clientHeight, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = clientWidth / clientHeight
      // Pull back on narrow aspect ratios so the outer orbit stays in frame.
      camera.position.z = camera.aspect < 0.9 ? 14 : camera.aspect < 1.2 ? 12 : 11
      camera.updateProjectionMatrix()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    // Interaction state
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const onPointerMove = (event: PointerEvent) => {
      pointer.tx = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.ty = (event.clientY / window.innerHeight - 0.5) * 2
    }
    let scrollProgress = 0
    const onScroll = () => {
      scrollProgress = Math.min(1, window.scrollY / Math.max(1, window.innerHeight))
    }
    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    const worldA = new THREE.Vector3()
    const updateLinks = (time: number) => {
      root.updateMatrixWorld()
      const inverse = root.matrixWorld.clone().invert()
      nodes.forEach((node, index) => {
        node.getWorldPosition(worldA).applyMatrix4(inverse)
        linkPositions.set([worldA.x, worldA.y, worldA.z, 0, 0, 0], index * 6)
        const t = (time * 0.18 + pulseOffsets[index]) % 1
        pulsePositions.set([worldA.x * (1 - t), worldA.y * (1 - t), worldA.z * (1 - t)], index * 3)
      })
      linkGeometry.attributes.position.needsUpdate = true
      pulseGeometry.attributes.position.needsUpdate = true
    }

    const clock = new THREE.Clock()
    let frameId = 0
    let running = false

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime()
      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04

      core.rotation.y = elapsed * 0.18
      core.rotation.x = Math.sin(elapsed * 0.3) * 0.15
      shell.rotation.y = -elapsed * 0.06
      shell.rotation.z = elapsed * 0.03
      halo.rotation.z = elapsed * 0.25
      orbitGroups.forEach((group) => {
        group.rotation.z += (group.userData.speed as number) * 0.01
      })

      root.rotation.y = pointer.x * 0.25 + scrollProgress * 0.9
      root.rotation.x = pointer.y * 0.12 + scrollProgress * 0.25
      const scale = 1 - scrollProgress * 0.18
      root.scale.setScalar(scale)
      root.position.y = scrollProgress * 0.8

      updateLinks(elapsed)
      renderer.render(scene, camera)
    }

    const loop = () => {
      renderFrame()
      frameId = window.requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reducedMotion) return
      running = true
      clock.start()
      frameId = window.requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      window.cancelAnimationFrame(frameId)
    }

    // First frame immediately so the composition is visible even with reduced motion.
    root.rotation.set(0.08, -0.35, 0)
    updateLinks(0.6)
    renderer.render(scene, camera)
    callbacks.current.onReady?.()

    const intersection = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start()
        else stop()
      },
      { threshold: 0.01 },
    )
    intersection.observe(container)
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (container.getBoundingClientRect().bottom > 0) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const onContextLost = (event: Event) => {
      event.preventDefault()
      stop()
      callbacks.current.onFail?.()
    }
    renderer.domElement.addEventListener('webglcontextlost', onContextLost)

    return () => {
      stop()
      intersection.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
      disposables.forEach((item) => item.dispose())
      roomEnvironment.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [nodeCount, reducedMotion])

  return <div ref={containerRef} className="absolute inset-0" />
}
