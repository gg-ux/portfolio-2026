import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'

/**
 * ScrambleText - Text that scrambles through random characters before revealing
 */
export default function ScrambleText({
  children,
  trigger = 'mount',
  speed = 40,
  iterations = 4,
  delay = 0,
  className = '',
}) {
  const text = typeof children === 'string' ? children : String(children)
  const [displayText, setDisplayText] = useState(text)
  const elementRef = useRef(null)
  const isAnimating = useRef(false)

  const runAnimation = () => {
    if (isAnimating.current) return
    isAnimating.current = true

    const chars = text.split('')
    const totalFrames = chars.length * iterations
    let frame = 0

    const animate = () => {
      frame++

      const scrambled = chars.map((char, index) => {
        if (char === ' ') return ' '

        const lockFrame = (index + 1) * iterations

        if (frame >= lockFrame) {
          return char
        } else {
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }).join('')

      setDisplayText(scrambled)

      if (frame < totalFrames) {
        setTimeout(animate, speed)
      } else {
        setDisplayText(text)
        isAnimating.current = false
      }
    }

    setTimeout(animate, delay)
  }

  // Mount trigger (also for 'both')
  useEffect(() => {
    if (trigger === 'mount' || trigger === 'both') {
      setDisplayText('')
      setTimeout(runAnimation, 100)
    }
  }, [])

  // InView trigger
  useEffect(() => {
    if (trigger !== 'inView') return

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // For hover, listen on parent link/button as well as self (also for 'both')
  useEffect(() => {
    if (trigger !== 'hover' && trigger !== 'both') return

    const element = elementRef.current
    if (!element) return

    const parent = element.closest('a, button')

    const handleMouseEnter = () => {
      runAnimation()
    }

    // Listen on both the element and parent
    element.addEventListener('mouseenter', handleMouseEnter)
    if (parent) {
      parent.addEventListener('mouseenter', handleMouseEnter)
    }

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      if (parent) {
        parent.removeEventListener('mouseenter', handleMouseEnter)
      }
    }
  }, [trigger])

  return (
    <span
      ref={elementRef}
      className={className}
    >
      {displayText}
    </span>
  )
}
