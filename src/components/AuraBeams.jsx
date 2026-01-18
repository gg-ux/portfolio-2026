import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

// Color palettes for AuraBeams
const PALETTES = {
  original: [
    { r: 167, g: 139, b: 250 }, // Lavender #A78BFA
    { r: 15, g: 118, b: 110 },  // Teal #0F766E
    { r: 234, g: 88, b: 12 },   // Orange #EA580C
  ],
  soulful: [
    { r: 88, g: 53, b: 176 },   // Amethyst #5835B0
    { r: 191, g: 146, b: 240 }, // Lilac #BF92F0
    { r: 215, g: 143, b: 141 }, // Rose #D78F8D
  ],
}

export default function AuraBeams({ contained = false, palette = 'original' }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const location = useLocation()
  const [scrollEffects, setScrollEffects] = useState({ opacity: 1, translateY: 0 })
  const [isVisible, setIsVisible] = useState(!contained) // Start visible for non-contained
  const [containerEl, setContainerEl] = useState(null)

  // Callback ref to capture container element
  const containerRef = useCallback((node) => {
    if (node !== null) {
      setContainerEl(node)
    }
  }, [])

  const isHomePage = location.pathname === '/'
  const isDesignSystem = location.pathname.startsWith('/design-system')
  const shouldRender = contained || isHomePage || isDesignSystem

  // Fade out on scroll - RAF throttled
  const scrollRafRef = useRef(null)
  const lastEffectsRef = useRef({ opacity: 1, translateY: 0 })

  useEffect(() => {
    if (!shouldRender || contained) return

    const updateScrollEffects = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      let newOpacity = 1
      let newTranslateY = 0

      if (isDesignSystem) {
        // Design system pages: simple fade out
        const fadeOutStart = vh * 0.3
        const fadeOutEnd = vh * 0.6
        if (scrollY < fadeOutStart) {
          newOpacity = 1
        } else if (scrollY < fadeOutEnd) {
          newOpacity = 1 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart)
        } else {
          newOpacity = 0
        }
      } else {
        // Home page: AuraBeams stays completely fixed, only fades out at projects
        newTranslateY = 0

        // Easing function for smooth transitions
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

        // Opacity: fades out with grid, before projects appear (eased)
        const fadeOutStart = vh * 1.0
        const fadeOutEnd = vh * 1.5
        if (scrollY < fadeOutStart) {
          newOpacity = 1
        } else if (scrollY < fadeOutEnd) {
          const progress = (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart)
          newOpacity = 1 - easeOutCubic(progress)
        } else {
          newOpacity = 0
        }
      }

      // Only update if change is significant
      const last = lastEffectsRef.current
      if (Math.abs(newOpacity - last.opacity) > 0.01 || Math.abs(newTranslateY - last.translateY) > 1) {
        setScrollEffects({ opacity: newOpacity, translateY: newTranslateY })
        lastEffectsRef.current = { opacity: newOpacity, translateY: newTranslateY }
      }
      scrollRafRef.current = null
    }

    const handleScroll = () => {
      if (scrollRafRef.current) return
      scrollRafRef.current = requestAnimationFrame(updateScrollEffects)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollEffects()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current)
    }
  }, [shouldRender, isDesignSystem, contained])

  // Intersection Observer for contained mode
  useEffect(() => {
    if (!contained || !shouldRender || !containerEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(containerEl)
    return () => observer.disconnect()
  }, [contained, shouldRender, containerEl])

  useEffect(() => {
    if (!shouldRender) return

    const canvas = canvasRef.current
    if (!canvas) return

    // For contained mode, wait for container element
    if (contained && !containerEl) return
    const container = contained ? containerEl : null

    const ctx = canvas.getContext('2d')

    const resize = () => {
      if (contained && container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      } else {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    resize()

    let mouseX = -1000
    let mouseY = -1000
    let smoothX = -1000
    let smoothY = -1000

    const handleMouseMove = (e) => {
      if (contained && container) {
        const rect = container.getBoundingClientRect()
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
      } else {
        mouseX = e.clientX
        mouseY = e.clientY
      }
    }

    const target = contained && container ? container : window
    target.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resize)

    const gridSize = 60
    const colors = PALETTES[palette] || PALETTES.original

    const animate = (timestamp) => {
      // Stop animation loop when not visible (for contained mode performance)
      if (contained && !isVisible) {
        return // Don't schedule next frame - will restart when visible
      }

      const width = canvas.width
      const height = canvas.height
      const time = timestamp / 1000

      // Smooth mouse following - more lag for elegance
      smoothX += (mouseX - smoothX) * 0.06
      smoothY += (mouseY - smoothY) * 0.06

      ctx.clearRect(0, 0, width, height)

      if (mouseX < 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const maxDistance = 200

      // Draw glowing horizontal grid lines
      const startY = Math.floor((smoothY - maxDistance) / gridSize) * gridSize
      const endY = Math.ceil((smoothY + maxDistance) / gridSize) * gridSize

      for (let y = startY; y <= endY; y += gridSize) {
        const distY = Math.abs(y - smoothY)
        if (distY > maxDistance) continue

        const intensity = Math.pow(1 - distY / maxDistance, 2)
        const colorIndex = Math.abs(Math.floor(y / gridSize)) % colors.length
        const color = colors[colorIndex]

        // Animated pulse that travels outward
        const pulseSpeed = 80
        const pulseWidth = 80
        const pulse = (time * pulseSpeed) % (maxDistance + pulseWidth)

        // Draw line extending left from cursor
        const leftExtent = maxDistance * intensity
        const gradientLeft = ctx.createLinearGradient(
          smoothX - leftExtent, y,
          smoothX, y
        )

        // Add animated pulse to gradient
        const leftPulsePos = Math.max(0, Math.min(1, (leftExtent - pulse) / leftExtent))
        const leftPulseEnd = Math.max(0, Math.min(1, (leftExtent - pulse + pulseWidth) / leftExtent))

        gradientLeft.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        if (leftPulsePos > 0 && leftPulsePos < 1) {
          gradientLeft.addColorStop(leftPulsePos, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.25 * intensity})`)
        }
        if (leftPulseEnd > 0 && leftPulseEnd < 1 && leftPulseEnd > leftPulsePos) {
          gradientLeft.addColorStop(leftPulseEnd, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 * intensity})`)
        }
        gradientLeft.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.15 * intensity})`)

        ctx.beginPath()
        ctx.moveTo(smoothX - leftExtent, y)
        ctx.lineTo(smoothX, y)
        ctx.strokeStyle = gradientLeft
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Draw line extending right from cursor
        const rightExtent = maxDistance * intensity
        const gradientRight = ctx.createLinearGradient(
          smoothX, y,
          smoothX + rightExtent, y
        )

        const rightPulsePos = Math.max(0, Math.min(1, pulse / rightExtent))
        const rightPulseEnd = Math.max(0, Math.min(1, (pulse + pulseWidth) / rightExtent))

        gradientRight.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.15 * intensity})`)
        if (rightPulsePos > 0 && rightPulsePos < 1) {
          gradientRight.addColorStop(rightPulsePos, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 * intensity})`)
        }
        if (rightPulseEnd > 0 && rightPulseEnd < 1 && rightPulseEnd > rightPulsePos) {
          gradientRight.addColorStop(rightPulseEnd, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.25 * intensity})`)
        }
        gradientRight.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.beginPath()
        ctx.moveTo(smoothX, y)
        ctx.lineTo(smoothX + rightExtent, y)
        ctx.strokeStyle = gradientRight
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Draw glowing vertical grid lines
      const startX = Math.floor((smoothX - maxDistance) / gridSize) * gridSize
      const endX = Math.ceil((smoothX + maxDistance) / gridSize) * gridSize

      for (let x = startX; x <= endX; x += gridSize) {
        const distX = Math.abs(x - smoothX)
        if (distX > maxDistance) continue

        const intensity = Math.pow(1 - distX / maxDistance, 2)
        const colorIndex = Math.abs(Math.floor(x / gridSize) + 1) % colors.length
        const color = colors[colorIndex]

        // Animated pulse that travels outward
        const pulseSpeed = 80
        const pulseWidth = 80
        const pulse = (time * pulseSpeed) % (maxDistance + pulseWidth)

        // Draw line extending up from cursor
        const topExtent = maxDistance * intensity
        const gradientTop = ctx.createLinearGradient(
          x, smoothY - topExtent,
          x, smoothY
        )

        const topPulsePos = Math.max(0, Math.min(1, (topExtent - pulse) / topExtent))
        const topPulseEnd = Math.max(0, Math.min(1, (topExtent - pulse + pulseWidth) / topExtent))

        gradientTop.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        if (topPulsePos > 0 && topPulsePos < 1) {
          gradientTop.addColorStop(topPulsePos, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.25 * intensity})`)
        }
        if (topPulseEnd > 0 && topPulseEnd < 1 && topPulseEnd > topPulsePos) {
          gradientTop.addColorStop(topPulseEnd, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 * intensity})`)
        }
        gradientTop.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.15 * intensity})`)

        ctx.beginPath()
        ctx.moveTo(x, smoothY - topExtent)
        ctx.lineTo(x, smoothY)
        ctx.strokeStyle = gradientTop
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Draw line extending down from cursor
        const bottomExtent = maxDistance * intensity
        const gradientBottom = ctx.createLinearGradient(
          x, smoothY,
          x, smoothY + bottomExtent
        )

        const bottomPulsePos = Math.max(0, Math.min(1, pulse / bottomExtent))
        const bottomPulseEnd = Math.max(0, Math.min(1, (pulse + pulseWidth) / bottomExtent))

        gradientBottom.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.15 * intensity})`)
        if (bottomPulsePos > 0 && bottomPulsePos < 1) {
          gradientBottom.addColorStop(bottomPulsePos, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.1 * intensity})`)
        }
        if (bottomPulseEnd > 0 && bottomPulseEnd < 1 && bottomPulseEnd > bottomPulsePos) {
          gradientBottom.addColorStop(bottomPulseEnd, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.25 * intensity})`)
        }
        gradientBottom.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.beginPath()
        ctx.moveTo(x, smoothY)
        ctx.lineTo(x, smoothY + bottomExtent)
        ctx.strokeStyle = gradientBottom
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      target.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [shouldRender, contained, isVisible, containerEl, palette])

  if (!shouldRender) {
    return null
  }

  if (contained) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'auto',
          zIndex: 5,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: scrollEffects.opacity,
      }}
    />
  )
}
