import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

/**
 * Custom Cursor Component
 *
 * A subtle, refined custom cursor that:
 * - Small circle (~20px)
 * - mix-blend-mode: difference for inversion effect
 * - Smooth following with slight lag/ease
 * - Elegant scale-up on interactive elements
 * - Doesn't interfere with clicking
 * - Adapts color based on theme
 */

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const isHoveringRef = useRef(false) // Use ref to avoid re-running effect
  const { isDark } = useTheme()

  // Keep ref in sync with state
  useEffect(() => {
    isHoveringRef.current = isHovering
  }, [isHovering])

  // Only show cursor on devices with fine pointer (mouse)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setHasFinePointer(mediaQuery.matches)

    const handleChange = (e) => setHasFinePointer(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!hasFinePointer) return
    const cursor = cursorRef.current
    if (!cursor) return

    // Base size and hover size
    const baseSize = 20
    const hoverSize = 28

    // Direct mouse tracking - use ref for current hover state
    const handleMouseMove = (e) => {
      const size = isHoveringRef.current ? hoverSize : baseSize
      const offset = size / 2
      cursor.style.transform = `translate(${e.clientX - offset}px, ${e.clientY - offset}px)`
      cursor.style.opacity = '1'
    }

    // Hide cursor when mouse leaves window
    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    // Show cursor when mouse enters window
    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
    }

    // Check if element is interactive
    const isInteractive = (el) => {
      if (!el) return false
      const tag = el.tagName.toLowerCase()
      const role = el.getAttribute('role')
      return (
        tag === 'a' ||
        tag === 'button' ||
        role === 'button' ||
        role === 'link' ||
        el.classList.contains('cursor-pointer') ||
        el.closest('a') ||
        el.closest('button')
      )
    }

    // Handle hover state for interactive elements
    const handleMouseOver = (e) => {
      if (isInteractive(e.target)) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      if (isInteractive(e.target)) {
        setIsHovering(false)
      }
    }

    // Add event listeners once
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [hasFinePointer]) // Removed isHovering from dependencies

  // Don't render on touch devices
  if (!hasFinePointer) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        width: isHovering ? '28px' : '20px',
        height: isHovering ? '28px' : '20px',
        backgroundColor: 'white',
        border: '2px solid white',
        borderRadius: '50%',
        opacity: 0, // Start hidden until mouse moves
        transition: 'width 0.4s cubic-bezier(0.23, 1, 0.32, 1), height 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s ease',
      }}
      aria-hidden="true"
    />
  )
}
