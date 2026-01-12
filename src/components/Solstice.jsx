/**
 * Solstice
 *
 * A canvas-based organic blob background with flowing, aurora-like motion.
 *
 * Technical approach:
 * - Multi-layered canvas drawing with radial gradients
 * - Organic noise functions for natural, breathing movement
 * - Mouse interaction with magnetic drift and stretch effects
 * - Ripple effects on cursor entry
 * - Scroll-based parallax and fade effects
 *
 * Props:
 * - static: Disables scroll effects (for use in contained cards)
 * - position: 'center' | 'topLeft' | 'topRight' | 'bottomLeft'
 * - scale: Size multiplier (default 1)
 * - intensity: Animation intensity (default 1)
 * - seed: Unique seed for varied movement patterns
 */

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Solstice({ static: isStatic = false, position = 'center', scale = 1, intensity = 1, seed = 0 }) {
  const { isDark } = useTheme()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Scroll-based effects state (disabled when static)
  const [scrollEffects, setScrollEffects] = useState({ blur: 0, opacity: 1, translateY: 0 })

  // Intersection Observer to pause when offscreen
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  // Mouse tracking
  const mouseRef = useRef({
    x: 0,
    y: 0,
    isNear: false,
    isInside: false,
  })

  // Smooth spring-based mouse position
  const springRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 })

  // Magnetic drift - blob center lazily follows cursor
  const magneticRef = useRef({ x: 0, y: 0 })

  // Stretch accumulator - tracks how much the blob is being pulled
  const stretchRef = useRef({
    amount: 0,        // Current stretch amount (0-1, capped to prevent break-off)
    angle: 0,         // Direction of stretch
  })

  // Ripple effects on mouseover
  const ripplesRef = useRef([])
  const wasInsideRef = useRef(false)

  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY

      // Skip scroll effects if static
      if (isStatic) return

      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY

      // STAGGERED DIMENSIONAL SCROLL:
      // Background stays completely pinned for first 80% of viewport scroll
      // This lets hero content exit fully while blob stays fixed
      // After 80%, background starts scrolling (parallax) and dissolving
      // Extended so blob overlaps significantly with Crafting section
      const pinnedUntil = viewportHeight * 0.8
      const scrollPastPinned = Math.max(0, scrollY - pinnedUntil)
      const scrollProgress = Math.min(scrollPastPinned / (viewportHeight * 1.0), 1) // Dissolves over 100% viewport (very slow)

      // TranslateY: simulates scrolling after the pinned period
      // Moves at 30% of scroll speed for gentle parallax
      const translateY = -scrollPastPinned * 0.3

      // Blur: starts at 0, reaches 16px (more blur for dreamy effect)
      const blurAmount = scrollProgress * 16

      // Opacity: fades out after pinned period
      const opacityAmount = 1 - scrollProgress

      setScrollEffects({
        blur: blurAmount,
        opacity: opacityAmount,
        translateY: translateY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    const PHI = 1.618033988749
    const SQRT2 = 1.41421356237

    // Organic noise - flowing, continuous motion
    const organicNoise = (angle, time, seed = 0, intensity = 1, ripples = []) => {
      // Smooth breathing - fewer frequencies, more cohesive
      const breath1 = Math.sin(time * 0.18 + angle * 2 + seed) * 0.2
      const breath2 = Math.sin(time * 0.14 * PHI + angle * 2.5 + seed * 2.1) * 0.15

      // Flowing wave - travels in one direction (creates sense of current)
      const flowSpeed = time * 0.1
      const flow1 = Math.sin(angle - flowSpeed) * 0.18
      const flow2 = Math.sin(angle * 1.5 - flowSpeed * 1.2) * 0.12

      // Smooth morphs - reduced, more intentional
      const morph1 = Math.sin(time * 0.1 + seed) * Math.cos(angle * 1.5 + time * 0.12) * 0.25
      const morph2 = Math.cos(time * 0.08 * PHI + seed * 1.5) * Math.sin(angle * 2 + time * 0.1) * 0.2

      // Single traveling bulge - like a wave passing through
      const bulgeSpeed = time * 0.08
      const bulge = Math.pow(Math.max(0, Math.sin(angle - bulgeSpeed + seed)), 2.5) * 0.28

      // Horizontal stretch - emphasizes flow direction
      const stretchAmount = Math.sin(time * 0.06) * 0.3 + 0.7
      const horizontalFlow = Math.pow(Math.cos(angle), 2) * stretchAmount * 0.15

      // Gentle pulse
      const pulse = Math.sin(time * 0.12) * 0.05

      // Ripple effects
      let rippleEffect = 0
      for (const ripple of ripples) {
        const rippleWave = Math.sin(angle * 3 - ripple.phase * 8) * ripple.strength
        rippleEffect += rippleWave * 0.12
      }

      return (breath1 + breath2 +
              flow1 + flow2 +
              morph1 + morph2 +
              bulge +
              horizontalFlow +
              pulse + rippleEffect) * intensity
    }

    // Blobby noise for satellite
    const blobbyNoise = (angle, time, seed = 0, intensity = 1) => {
      const wave1 = Math.sin(time * 0.2 + angle * 2 + seed) * 0.2
      const wave2 = Math.cos(time * 0.18 * PHI + angle * 3 + seed * 1.7) * 0.16
      const wave3 = Math.sin(time * 0.15 + angle * 2.5 + seed * 2.3) * 0.12

      const bulge1 = Math.pow(Math.max(0, Math.sin(angle * 1.5 - time * 0.12 + seed)), 2) * 0.28
      const bulge2 = Math.pow(Math.max(0, Math.cos(angle * 0.8 + time * 0.1 + seed * 2)), 2) * 0.22

      const squashAngle = time * 0.08 + seed
      const squash = Math.pow(Math.cos(angle - squashAngle), 2) * Math.sin(time * 0.1 + seed) * 0.25

      const pulse = Math.sin(time * 0.12 + seed) * 0.08

      return (wave1 + wave2 + wave3 + bulge1 + bulge2 + squash + pulse) * intensity
    }

    // Generate main blob with stretch toward mouse
    const generateLivingBlob = (centerX, centerY, baseRadius, points, time, spring, stretchState, seed = 0, intensity = 1, aspectRatio = 1.5, ripples = []) => {
      const pathPoints = []
      const hStretch = aspectRatio
      const vStretch = 1 / Math.sqrt(aspectRatio)

      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2
        let deformation = organicNoise(angle, time, seed, intensity, ripples)

        // Time-varying elongation
        const elongationAngle = time * 0.025
        const elongation = Math.pow(Math.cos(angle - elongationAngle), 2) * 0.18

        // Mouse-induced stretch - this is the key interaction
        if (stretchState.amount > 0.01) {
          let angleDiff = angle - stretchState.angle
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2

          // Points aligned with stretch direction bulge out
          const alignment = Math.cos(angleDiff)
          if (alignment > 0) {
            // Stretch increases dramatically as it builds up
            const stretchIntensity = Math.pow(stretchState.amount, 0.7) * 0.8
            deformation += alignment * alignment * stretchIntensity
          } else {
            // Opposite side compresses slightly
            deformation += alignment * stretchState.amount * 0.15
          }
        }

        const r = baseRadius * (1 + deformation + elongation)

        pathPoints.push({
          x: centerX + Math.cos(angle) * r * hStretch,
          y: centerY + Math.sin(angle) * r * vStretch
        })
      }
      return pathPoints
    }

    // Generate satellite blob
    const generateSatelliteBlob = (centerX, centerY, baseRadius, points, time, seed, stretchDir = null) => {
      const pathPoints = []

      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2
        let deformation = blobbyNoise(angle, time, seed, 1)

        if (stretchDir) {
          let angleDiff = angle - stretchDir.angle
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
          const alignment = Math.cos(angleDiff)
          if (alignment > 0) {
            deformation += alignment * stretchDir.strength * 0.35
          }
        }

        const r = baseRadius * (1 + deformation)
        pathPoints.push({
          x: centerX + Math.cos(angle) * r,
          y: centerY + Math.sin(angle) * r
        })
      }
      return pathPoints
    }

    // Draw smooth shape
    const drawSmoothShape = (ctx, points) => {
      if (points.length < 3) return
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 0; i < points.length; i++) {
        const p0 = points[(i - 1 + points.length) % points.length]
        const p1 = points[i]
        const p2 = points[(i + 1) % points.length]
        const p3 = points[(i + 2) % points.length]

        const tension = 0.4
        const cp1x = p1.x + (p2.x - p0.x) * tension
        const cp1y = p1.y + (p2.y - p0.y) * tension
        const cp2x = p2.x - (p3.x - p1.x) * tension
        const cp2y = p2.y - (p3.y - p1.y) * tension

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
      }
      ctx.closePath()
    }

    const animate = (timestamp) => {
      // Skip heavy calculations when not visible
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const time = timestamp / 1000 + seed * 100 // Offset time by seed for unique movement
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      const mouse = mouseRef.current
      const spring = springRef.current
      const stretch = stretchRef.current
      const magnetic = magneticRef.current

      // Very viscous spring - slow, gooey following
      const springStiffness = 0.04
      const springDamping = 0.88
      spring.vx += (mouse.x - spring.x) * springStiffness
      spring.vy += (mouse.y - spring.y) * springStiffness
      spring.vx *= springDamping
      spring.vy *= springDamping
      spring.x += spring.vx
      spring.y += spring.vy

      // Main blob position - smooth flowing drift
      // Primary horizontal flow - like a gentle current
      const flowX = Math.sin(time * 0.025) * 55 + Math.sin(time * 0.018 * PHI) * 35
      // Secondary gentle wobble
      const wobbleX = Math.sin(time * 0.04) * 15
      const wanderX = flowX + wobbleX

      // Vertical - very subtle, stays centered
      const flowY = Math.sin(time * 0.02) * 20 + Math.cos(time * 0.015 * PHI) * 12
      const wanderY = flowY

      // Gentle tilt follows the flow
      const tiltOffset = Math.sin(time * 0.022) * 10

      // Delay parallax until name + title start exiting (1.0vh)
      const effectStart = height * 1.0
      const scrollOffset = Math.max(0, scrollRef.current - effectStart)
      const parallaxY = isStatic ? 0 : scrollOffset * 0.1

      // Base blob position (before magnetic attraction)
      // Position variants for different placements
      const positions = {
        center: { x: width * 0.55, y: height * 0.48 },
        topLeft: { x: width * 0.15, y: height * 0.18 },
        topRight: { x: width * 0.75, y: height * 0.28 },
        bottomLeft: { x: width * 0.25, y: height * 0.72 },
      }
      const pos = positions[position] || positions.center
      const baseCenterX = pos.x
      const baseCenterY = pos.y

      // Magnetic attraction - blob drifts lazily toward cursor
      const magnetStrength = 0.008 // Very gentle attraction
      const maxMagnetDist = 80 // Maximum magnetic drift in pixels

      // Target is cursor position relative to base center
      const targetMagnetX = (mouse.x - baseCenterX) * 0.15 // Only drift 15% of the way
      const targetMagnetY = (mouse.y - baseCenterY) * 0.15

      // Clamp the magnetic drift
      const clampedTargetX = Math.max(-maxMagnetDist, Math.min(maxMagnetDist, targetMagnetX))
      const clampedTargetY = Math.max(-maxMagnetDist, Math.min(maxMagnetDist, targetMagnetY))

      // Smoothly interpolate toward target (very slow, lazy drift)
      magnetic.x += (clampedTargetX - magnetic.x) * magnetStrength
      magnetic.y += (clampedTargetY - magnetic.y) * magnetStrength

      const blobCenterX = baseCenterX + wanderX + tiltOffset + magnetic.x
      const blobCenterY = baseCenterY + wanderY + parallaxY + magnetic.y

      // Scroll-based scale - starts larger, shrinks as you scroll (disabled when static)
      const scrollProgress = isStatic ? 0 : Math.min(scrollRef.current / (height * 0.8), 1)
      const scrollScale = isStatic ? 1 : (1.0 - scrollProgress * 0.35) // Scales to 65%

      const blobRadius = Math.min(width, height) * 0.26 * scrollScale * scale

      // Check mouse proximity
      const distToBlob = Math.sqrt(
        Math.pow(mouse.x - blobCenterX, 2) +
        Math.pow(mouse.y - blobCenterY, 2)
      )
      const effectiveRadius = blobRadius * 1.6
      mouse.isNear = distToBlob < effectiveRadius * 2
      mouse.isInside = distToBlob < effectiveRadius

      // === RIPPLE EFFECT ===
      const ripples = ripplesRef.current
      const wasInside = wasInsideRef.current

      // Spawn ripple when mouse enters blob
      if (mouse.isInside && !wasInside) {
        const entryAngle = Math.atan2(mouse.y - blobCenterY, mouse.x - blobCenterX)
        ripples.push({
          phase: 0,
          strength: 1,
          angle: entryAngle,
          speed: 0.025,
        })
      }
      wasInsideRef.current = mouse.isInside

      // Update existing ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].phase += ripples[i].speed
        ripples[i].strength *= 0.96 // Fade out

        // Remove faded ripples
        if (ripples[i].strength < 0.01) {
          ripples.splice(i, 1)
        }
      }

      // === STRETCH ACCUMULATION ===
      // Accumulate stretch when mouse is inside and moving away from center
      // Capped to prevent break-off effect
      if (mouse.isInside) {
        const dx = spring.x - blobCenterX
        const dy = spring.y - blobCenterY
        const pullDist = Math.sqrt(dx * dx + dy * dy)
        const pullAngle = Math.atan2(dy, dx)

        // Check if pulling outward (spring moving away from center)
        const springSpeed = Math.sqrt(spring.vx * spring.vx + spring.vy * spring.vy)
        const movingOutward = springSpeed > 0.5

        if (movingOutward && pullDist > blobRadius * 0.3) {
          // Slowly build up stretch, capped at 0.6 to prevent break-off
          const targetStretch = Math.min((pullDist - blobRadius * 0.3) / (blobRadius * 0.8), 0.6)
          stretch.amount += (targetStretch - stretch.amount) * 0.03

          // Smoothly update angle
          let angleDiff = pullAngle - stretch.angle
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
          stretch.angle += angleDiff * 0.1
        } else {
          // Slowly relax
          stretch.amount *= 0.97
        }
      } else {
        // Mouse outside - slowly relax stretch
        stretch.amount *= 0.95
      }

      ctx.clearRect(0, 0, width, height)

      // ============================================
      // LAYER 1: Outer glow - teal positioned at top
      // ============================================
      const outerPoints = generateLivingBlob(
        blobCenterX, blobCenterY - blobRadius * 0.3,
        blobRadius * 1.35, 48,
        time * 0.5, spring, stretch, 0, 0.35, 1.6
      )
      const outerGlow = ctx.createRadialGradient(
        blobCenterX, blobCenterY - blobRadius * 0.5, 0,
        blobCenterX, blobCenterY, blobRadius * 3
      )
      if (isDark) {
        outerGlow.addColorStop(0, 'rgba(15, 118, 110, 0.18)')
        outerGlow.addColorStop(0.25, 'rgba(15, 118, 110, 0.12)')
        outerGlow.addColorStop(0.5, 'rgba(15, 118, 110, 0.05)')
        outerGlow.addColorStop(1, 'rgba(15, 118, 110, 0)')
      } else {
        // Light mode: softer teal, lower opacity for cream background
        outerGlow.addColorStop(0, 'rgba(94, 234, 212, 0.25)')
        outerGlow.addColorStop(0.25, 'rgba(94, 234, 212, 0.15)')
        outerGlow.addColorStop(0.5, 'rgba(94, 234, 212, 0.06)')
        outerGlow.addColorStop(1, 'rgba(94, 234, 212, 0)')
      }

      ctx.save()
      ctx.filter = 'blur(85px)'
      drawSmoothShape(ctx, outerPoints)
      ctx.fillStyle = outerGlow
      ctx.fill()
      ctx.restore()

      // ============================================
      // LAYER 2: Teal mid - drifts with horizontal current
      // ============================================
      const tealFlow = time * 0.015 // Continuous horizontal drift
      const tealOffsetX = Math.sin(tealFlow) * 60 + Math.sin(time * 0.03) * 20 - blobRadius * 0.1
      const tealOffsetY = Math.cos(time * 0.025) * 18 - blobRadius * 0.25
      const tealPoints = generateLivingBlob(
        blobCenterX + tealOffsetX, blobCenterY + tealOffsetY,
        blobRadius * 0.95, 44,
        time * 0.6, spring, stretch, 5, 0.5, 1.5
      )
      const tealGradient = ctx.createRadialGradient(
        blobCenterX + tealOffsetX, blobCenterY + tealOffsetY, 0,
        blobCenterX + tealOffsetX, blobCenterY + tealOffsetY, blobRadius * 1.8
      )
      if (isDark) {
        tealGradient.addColorStop(0, 'rgba(15, 118, 110, 0.32)')
        tealGradient.addColorStop(0.3, 'rgba(15, 118, 110, 0.18)')
        tealGradient.addColorStop(0.6, 'rgba(15, 118, 110, 0.08)')
        tealGradient.addColorStop(1, 'rgba(15, 118, 110, 0)')
      } else {
        // Light mode: bright teal, moderate opacity
        tealGradient.addColorStop(0, 'rgba(94, 234, 212, 0.4)')
        tealGradient.addColorStop(0.3, 'rgba(94, 234, 212, 0.22)')
        tealGradient.addColorStop(0.6, 'rgba(94, 234, 212, 0.08)')
        tealGradient.addColorStop(1, 'rgba(94, 234, 212, 0)')
      }

      ctx.save()
      ctx.filter = 'blur(70px)'
      drawSmoothShape(ctx, tealPoints)
      ctx.fillStyle = tealGradient
      ctx.fill()
      ctx.restore()

      // ============================================
      // LAYER 3: Main lavender body
      // ============================================
      const mainPoints = generateLivingBlob(
        blobCenterX, blobCenterY,
        blobRadius, 60,
        time, spring, stretch, 10, 1, 1.55, ripples
      )
      const lavenderGradient = ctx.createRadialGradient(
        blobCenterX, blobCenterY, blobRadius * 0.1,
        blobCenterX, blobCenterY, blobRadius * 2.2
      )
      if (isDark) {
        lavenderGradient.addColorStop(0, 'rgba(167, 139, 250, 0.55)')
        lavenderGradient.addColorStop(0.25, 'rgba(167, 139, 250, 0.42)')
        lavenderGradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.22)')
        lavenderGradient.addColorStop(0.75, 'rgba(167, 139, 250, 0.08)')
        lavenderGradient.addColorStop(1, 'rgba(167, 139, 250, 0)')
      } else {
        // Light mode: bright lavender, softer opacity
        lavenderGradient.addColorStop(0, 'rgba(196, 181, 253, 0.6)')
        lavenderGradient.addColorStop(0.25, 'rgba(196, 181, 253, 0.4)')
        lavenderGradient.addColorStop(0.5, 'rgba(196, 181, 253, 0.2)')
        lavenderGradient.addColorStop(0.75, 'rgba(196, 181, 253, 0.08)')
        lavenderGradient.addColorStop(1, 'rgba(196, 181, 253, 0)')
      }

      ctx.save()
      ctx.filter = 'blur(60px)'
      drawSmoothShape(ctx, mainPoints)
      ctx.fillStyle = lavenderGradient
      ctx.fill()
      ctx.restore()

      // ============================================
      // LAYER 4: Inner core
      // ============================================
      const coreOffsetX = Math.sin(time * 0.07 + 3) * 22
      const coreOffsetY = Math.cos(time * 0.06 + 1) * 9
      // Damped ripples for core
      const coreRipples = ripples.map(r => ({ ...r, strength: r.strength * 0.5 }))
      const corePoints = generateLivingBlob(
        blobCenterX + coreOffsetX, blobCenterY + coreOffsetY,
        blobRadius * 0.38, 40,
        time * 0.9, spring, { amount: stretch.amount * 0.6, angle: stretch.angle }, 20, 0.85, 1.4, coreRipples
      )
      const coreGradient = ctx.createRadialGradient(
        blobCenterX + coreOffsetX, blobCenterY + coreOffsetY, 0,
        blobCenterX + coreOffsetX, blobCenterY + coreOffsetY, blobRadius * 0.9
      )
      if (isDark) {
        coreGradient.addColorStop(0, 'rgba(167, 139, 250, 0.5)')
        coreGradient.addColorStop(0.35, 'rgba(167, 139, 250, 0.32)')
        coreGradient.addColorStop(0.7, 'rgba(167, 139, 250, 0.12)')
        coreGradient.addColorStop(1, 'rgba(167, 139, 250, 0)')
      } else {
        // Light mode: bright lavender core
        coreGradient.addColorStop(0, 'rgba(196, 181, 253, 0.55)')
        coreGradient.addColorStop(0.35, 'rgba(196, 181, 253, 0.35)')
        coreGradient.addColorStop(0.7, 'rgba(196, 181, 253, 0.12)')
        coreGradient.addColorStop(1, 'rgba(196, 181, 253, 0)')
      }

      ctx.save()
      ctx.filter = 'blur(45px)'
      drawSmoothShape(ctx, corePoints)
      ctx.fillStyle = coreGradient
      ctx.fill()
      ctx.restore()

      // ============================================
      // LAYER 5: Orange accent - flows horizontally
      // ============================================
      const orangeFlow = time * 0.02 // Slightly faster than teal for depth
      const orangeX = blobCenterX + Math.sin(orangeFlow) * blobRadius * 0.5 + Math.sin(time * 0.035) * 25 + blobRadius * 0.2
      const orangeY = blobCenterY + Math.cos(time * 0.028) * blobRadius * 0.12 + blobRadius * 0.05

      const orangePoints = generateSatelliteBlob(
        orangeX, orangeY,
        blobRadius * 0.35, 28,
        time * 0.65, 30, null
      )
      const orangeGradient = ctx.createRadialGradient(
        orangeX, orangeY, 0,
        orangeX, orangeY, blobRadius * 1.0
      )
      if (isDark) {
        orangeGradient.addColorStop(0, 'rgba(234, 88, 12, 0.22)')
        orangeGradient.addColorStop(0.2, 'rgba(234, 88, 12, 0.15)')
        orangeGradient.addColorStop(0.45, 'rgba(234, 88, 12, 0.08)')
        orangeGradient.addColorStop(0.7, 'rgba(234, 88, 12, 0.03)')
        orangeGradient.addColorStop(1, 'rgba(234, 88, 12, 0)')
      } else {
        orangeGradient.addColorStop(0, 'rgba(234, 88, 12, 0.35)')
        orangeGradient.addColorStop(0.2, 'rgba(234, 88, 12, 0.25)')
        orangeGradient.addColorStop(0.45, 'rgba(234, 88, 12, 0.12)')
        orangeGradient.addColorStop(0.7, 'rgba(234, 88, 12, 0.05)')
        orangeGradient.addColorStop(1, 'rgba(234, 88, 12, 0)')
      }

      ctx.save()
      ctx.filter = 'blur(75px)'
      drawSmoothShape(ctx, orangePoints)
      ctx.fillStyle = orangeGradient
      ctx.fill()
      ctx.restore()

      // ============================================
      // LAYER 6: Highlight - follows the flow
      // ============================================
      const highlightFlow = time * 0.018
      const highlightX = blobCenterX + Math.sin(highlightFlow) * blobRadius * 0.3 + Math.sin(time * 0.04) * 15
      const highlightY = blobCenterY - blobRadius * 0.08 + Math.cos(time * 0.03) * blobRadius * 0.06

      const highlightPoints = generateSatelliteBlob(
        highlightX, highlightY,
        blobRadius * 0.18, 24,
        time, 40, null
      )
      const highlightGradient = ctx.createRadialGradient(
        highlightX, highlightY, 0,
        highlightX, highlightY, blobRadius * 0.6
      )
      if (isDark) {
        highlightGradient.addColorStop(0, 'rgba(186, 170, 255, 0.2)')
        highlightGradient.addColorStop(0.3, 'rgba(167, 139, 250, 0.12)')
        highlightGradient.addColorStop(0.6, 'rgba(167, 139, 250, 0.05)')
        highlightGradient.addColorStop(1, 'rgba(167, 139, 250, 0)')
      } else {
        highlightGradient.addColorStop(0, 'rgba(160, 140, 220, 0.32)')
        highlightGradient.addColorStop(0.3, 'rgba(147, 112, 219, 0.18)')
        highlightGradient.addColorStop(0.6, 'rgba(147, 112, 219, 0.08)')
        highlightGradient.addColorStop(1, 'rgba(147, 112, 219, 0)')
      }

      ctx.save()
      ctx.filter = 'blur(50px)'
      drawSmoothShape(ctx, highlightPoints)
      ctx.fillStyle = highlightGradient
      ctx.fill()
      ctx.restore()

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isStatic, isDark, position, scale, intensity, seed, isVisible])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 transition-[filter,opacity,transform] duration-300"
        style={{
          filter: `blur(${scrollEffects.blur}px)`,
          opacity: scrollEffects.opacity,
          transform: `translateY(${scrollEffects.translateY}px)`
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Grain texture handled by GlobalGrain component */}
    </div>
  )
}
