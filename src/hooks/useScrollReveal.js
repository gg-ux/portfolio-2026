import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const threshold = options.threshold || 0.1
    let observer = null
    let rafId = null
    let scrollHandler = null

    // Use requestAnimationFrame to wait for layout to complete after navigation
    rafId = requestAnimationFrame(() => {
      if (!element) return

      // Check if already in viewport on mount
      const rect = element.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight * (1 - threshold) && rect.bottom > 0

      if (isInViewport) {
        setIsVisible(true)
        return
      }

      // Set up observer for elements below the fold
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(element)
            // Clean up scroll fallback if observer worked
            if (scrollHandler) {
              window.removeEventListener('scroll', scrollHandler)
            }
          }
        },
        {
          threshold: 0, // Use 0 for better mobile compatibility
          rootMargin: options.rootMargin || '0px 0px 0px 0px', // Remove negative margin for mobile
        }
      )

      observer.observe(element)

      // Fallback: scroll listener for mobile browsers where IntersectionObserver may not fire
      scrollHandler = () => {
        if (!element) return
        const rect = element.getBoundingClientRect()
        // Element is visible if any part of it is in the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true)
          window.removeEventListener('scroll', scrollHandler)
          if (observer) observer.disconnect()
        }
      }
      window.addEventListener('scroll', scrollHandler, { passive: true })

      // Check once immediately in case already scrolled into view
      scrollHandler()
    })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (observer) observer.disconnect()
      if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
    }
  }, [options.threshold, options.rootMargin])

  return [ref, isVisible]
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)
  const rafRef = useRef(null)
  const lastOffsetRef = useRef(0)

  useEffect(() => {
    const updateOffset = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const elementTop = rect.top + scrolled
      const relativeScroll = scrolled - elementTop + window.innerHeight
      const newOffset = relativeScroll * speed

      // Only update state if change is significant (> 0.5px)
      if (Math.abs(newOffset - lastOffsetRef.current) > 0.5) {
        setOffset(newOffset)
        lastOffsetRef.current = newOffset
      }
      rafRef.current = null
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(updateOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateOffset()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [speed])

  return [ref, offset]
}
