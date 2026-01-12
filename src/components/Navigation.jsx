import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'
import ScrambleText from './ScrambleText'
import { Caption } from './Typography'

export default function Navigation() {
  const [navOpacity, setNavOpacity] = useState(1)
  const [showNav, setShowNav] = useState(true)
  const [isScrolledMode, setIsScrolledMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const { isDark } = useTheme()

  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Prevent transition flicker on initial mount
  useEffect(() => {
    const timer = requestAnimationFrame(() => setHasMounted(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  // Track scroll for direction detection
  const lastScrollY = useRef(0)
  const scrollUpDistance = useRef(0)
  const scrollUpThreshold = 80
  const rafRef = useRef(null)
  const lastStateRef = useRef({ navOpacity: 1, showNav: true, isScrolledMode: false })

  useEffect(() => {
    const updateNavState = () => {
      const vh = window.innerHeight
      const currentScrollY = window.scrollY
      const scrollDelta = lastScrollY.current - currentScrollY
      const scrollingUp = scrollDelta > 0
      const last = lastStateRef.current

      let newOpacity = 1
      let newShowNav = true
      let newIsScrolledMode = false

      if (isHomePage) {
        // At the very top: always show nav
        if (currentScrollY < 10) {
          newOpacity = 1
          newShowNav = true
          newIsScrolledMode = false
          scrollUpDistance.current = 0
        } else {
          // Once scrolling: hide on scroll down, show on scroll up
          newOpacity = 1
          newIsScrolledMode = currentScrollY > 100
          if (scrollingUp) {
            scrollUpDistance.current += scrollDelta
            newShowNav = scrollUpDistance.current > scrollUpThreshold ? true : last.showNav
          } else {
            scrollUpDistance.current = 0
            newShowNav = false
          }
        }
      } else {
        const scrollThreshold = 100
        if (currentScrollY < scrollThreshold) {
          newOpacity = 1
          newIsScrolledMode = false
          newShowNav = true
          scrollUpDistance.current = 0
        } else {
          newOpacity = 1
          newIsScrolledMode = true
          if (scrollingUp) {
            scrollUpDistance.current += scrollDelta
            newShowNav = scrollUpDistance.current > scrollUpThreshold ? true : last.showNav
          } else {
            scrollUpDistance.current = 0
            newShowNav = false
          }
        }
      }

      lastScrollY.current = currentScrollY

      // Only update state if values changed
      if (Math.abs(newOpacity - last.navOpacity) > 0.01) {
        setNavOpacity(newOpacity)
        last.navOpacity = newOpacity
      }
      if (newShowNav !== last.showNav) {
        setShowNav(newShowNav)
        last.showNav = newShowNav
      }
      if (newIsScrolledMode !== last.isScrolledMode) {
        setIsScrolledMode(newIsScrolledMode)
        last.isScrolledMode = newIsScrolledMode
      }

      rafRef.current = null
    }

    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(updateNavState)
    }

    updateNavState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isHomePage])

  const navLinks = [
    { name: 'Work', href: isHomePage ? '#work' : '/#work', isRoute: false },
    { name: 'Resume', href: '/resume', isRoute: true },
    { name: 'Contact', href: '#contact', isRoute: false },
    { name: 'Design System', href: '/design-system', isRoute: true },
  ]


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] ${
        isScrolledMode
          ? isDark
            ? 'bg-[#0a0a0a]/50 backdrop-blur-lg'
            : 'bg-[#FAF8F4]/50 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
      style={{
        opacity: isScrolledMode ? (showNav ? 1 : 0) : navOpacity,
        transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
        transition: hasMounted
          ? showNav
            ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, background-color 0.5s'
            : 'transform 0.3s ease-in, opacity 0.2s ease-in, background-color 0.5s'
          : 'none',
        pointerEvents: (isScrolledMode ? !showNav : navOpacity < 0.1) ? 'none' : 'auto',
      }}
    >
      {/* Grain overlay - appears in scrolled mode */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${hasMounted ? 'transition-opacity duration-500' : ''} ${isScrolledMode ? 'opacity-100' : 'opacity-0'}`}
      >
        <defs>
          <filter id="nav-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="4"
              seed="42"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values={isDark
                ? "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"  // Black, alpha from noise
                : "0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.35 0"
              }
              in="noise"
              result="coloredNoise"
            />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#nav-grain)"
          opacity={isDark ? "0.12" : "0.45"}
          style={{ mixBlendMode: isDark ? 'normal' : 'overlay' }}
        />
      </svg>

      {/* Bottom divider - only appears when nav slides in from scroll-up */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.08]'}`}
        style={{
          opacity: isScrolledMode && showNav ? 1 : 0,
          transition: hasMounted
            ? isScrolledMode && showNav
              ? 'opacity 0.3s ease-out'
              : 'opacity 0.15s ease-in'
            : 'none',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-18">
          {/* Logo + Name */}
          <Link
            to="/"
            className="block"
          >
            <img
              src="/images/branding/logo.svg"
              alt="Grace Guo logo"
              className={`h-6 w-auto transition-transform duration-500 ease-out hover:scale-125 ${isDark ? 'invert' : ''}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                    location.pathname === link.href
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ScrambleText trigger="both" iterations={2} speed={20}>
                    {link.name}
                  </ScrambleText>
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                    isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ScrambleText trigger="both" iterations={2} speed={20}>
                    {link.name}
                  </ScrambleText>
                </a>
              )
            )}

            {/* Divider */}
            <div className={`w-px h-4 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

            {/* Theme Toggle */}
            <ThemeToggle size="small" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-900'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-18 left-0 right-0 backdrop-blur-lg transition-all duration-500 ${
          isDark ? 'bg-[#0a0a0a]/95 border-b border-white/[0.06]' : 'bg-white/95 border-b border-black/[0.08]'
        } ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                  location.pathname === link.href
                    ? isDark ? 'text-white' : 'text-gray-900'
                    : isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.name}
              </a>
            )
          )}

          {/* Divider */}
          <div className={`w-full h-px ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.08]'}`} />

          {/* Theme Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Caption className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Caption>
          </div>
        </div>
      </div>
    </nav>
  )
}
