import { useState, useEffect, useRef } from 'react'

/**
 * SolsticeLoader - Demo version of the loader designed for the Solstice theme
 *
 * Shows the loading animation in a loop for demonstration purposes.
 * Uses the same lavender/teal gradient ring that complements the Solstice color palette.
 */
export default function SolsticeLoader({ size = 80 }) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [gradientRotation, setGradientRotation] = useState(0)
  const [strokeProgress, setStrokeProgress] = useState(0)

  const strokeWidth = 1.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Intersection Observer to pause when offscreen
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Rotate gradient continuously (only when visible)
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setGradientRotation(prev => (prev + 2) % 360)
    }, 16)

    return () => clearInterval(interval)
  }, [isVisible])

  // Animate stroke progress in a loop (only when visible)
  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    let animationFrame
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const cycleTime = elapsed % (duration * 2) // Full cycle includes fill and unfill

      if (cycleTime < duration) {
        // Filling
        const progress = cycleTime / duration
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setStrokeProgress(eased)
      } else {
        // Unfilling
        const progress = (cycleTime - duration) / duration
        // Ease in cubic
        const eased = Math.pow(progress, 3)
        setStrokeProgress(1 - eased)
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible])

  const strokeOffset = circumference * (1 - strokeProgress)

  return (
    <div ref={containerRef} className="relative flex items-center justify-center">
      {/* Bloom glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: size + 40,
          height: size + 40,
          background: `radial-gradient(circle, rgba(167, 139, 250, ${0.3 * strokeProgress}) 0%, rgba(167, 139, 250, ${0.15 * strokeProgress}) 50%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: strokeProgress,
          transform: `scale(${0.8 + strokeProgress * 0.4})`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        className="absolute"
        style={{
          transform: 'rotate(-90deg)',
          filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.5)) drop-shadow(0 0 16px rgba(15, 118, 110, 0.3))',
        }}
      >
        <defs>
          <linearGradient
            id="solsticeLoaderGradient"
            gradientTransform={`rotate(${gradientRotation}, 0.5, 0.5)`}
          >
            <stop offset="0%" stopColor="#BF92F0" />
            <stop offset="50%" stopColor="#0B96A3" />
            <stop offset="100%" stopColor="#BF92F0" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#solsticeLoaderGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
        />
      </svg>

      {/* Logo with breathing pulse */}
      <img
        src="/assets/branding/logo.svg"
        alt="Grace Guo"
        className="h-6 w-auto animate-breathe invert"
        style={{
          opacity: 0.9,
        }}
      />
    </div>
  )
}
