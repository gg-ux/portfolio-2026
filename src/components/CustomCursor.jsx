import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
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
  const [isProjectCard, setIsProjectCard] = useState(false)
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const isHoveringRef = useRef(false) // Use ref to avoid re-running effect
  const isProjectCardRef = useRef(false)
  const { isDark } = useTheme()

  // Keep refs in sync with state
  useEffect(() => {
    isHoveringRef.current = isHovering
  }, [isHovering])

  useEffect(() => {
    isProjectCardRef.current = isProjectCard
  }, [isProjectCard])

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
    const projectCardSize = 80

    // Direct mouse tracking - use ref for current hover state
    const handleMouseMove = (e) => {
      const size = isProjectCardRef.current ? projectCardSize : (isHoveringRef.current ? hoverSize : baseSize)
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

    // Check if element is a project card
    const isProjectCardElement = (el) => {
      if (!el) return false
      return el.hasAttribute('data-project-card') || el.closest('[data-project-card]')
    }

    // Handle hover state for interactive elements
    const handleMouseOver = (e) => {
      const onProjectCard = isProjectCardElement(e.target)
      if (onProjectCard) {
        setIsProjectCard(true)
        setIsHovering(true)
      } else if (isInteractive(e.target)) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      // Check if we're moving to another element still inside the project card
      const stillInProjectCard = e.relatedTarget && isProjectCardElement(e.relatedTarget)

      if (isProjectCardElement(e.target) && !stillInProjectCard) {
        setIsProjectCard(false)
        setIsHovering(false)
      } else if (isInteractive(e.target) && !isProjectCardElement(e.relatedTarget)) {
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

  const cursorSize = isProjectCard ? 80 : (isHovering ? 28 : 20)

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        backgroundColor: 'white',
        border: isProjectCard ? 'none' : '2px solid white',
        borderRadius: '50%',
        opacity: 0, // Start hidden until mouse moves
        transition: 'width 0.4s cubic-bezier(0.23, 1, 0.32, 1), height 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s ease',
      }}
      aria-hidden="true"
    >
      {isProjectCard && (
        <span
          className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-normal text-black"
          style={{
            opacity: isProjectCard ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          View <ArrowRight size={13} weight="regular" />
        </span>
      )}
    </div>
  )
}
