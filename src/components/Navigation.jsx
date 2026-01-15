import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useBanner } from '../context/BannerContext'
import { useContactDrawer } from '../context/ContactDrawerContext'
import ThemeToggle from './ThemeToggle'
import ScrambleText from './ScrambleText'
import { Caption } from './Typography'

// Import project thumbnails (same as Explore More section)
import teslaChatbotImg from '../assets/projects/tesla/chatbot/chatbot-card-filled.png'
import teslaMegaMenuImg from '../assets/projects/tesla/mega menu/mega-menu-card-filled.png'
import indiEvImg from '../assets/projects/indi ev/card-indi-ev.png'
import notetracksImg from '../assets/projects/notetracks/notetracks-card-filled.png'
import cataliaImg from '../assets/projects/catalia health/catalia-card-filled.png'

// Projects for the mega menu
const workProjects = [
  { name: 'Tesla Assist', link: '/project/tesla-chatbot', image: teslaChatbotImg, bg: '#B1CCFF' },
  { name: 'Tesla Mega Menu', link: '/project/tesla-mega-menu', image: teslaMegaMenuImg, bg: '#30409B' },
  { name: 'INDI EV', link: '/project/indi-ev', image: indiEvImg, bg: '#000000' },
  { name: 'Catalia Health', link: '/project/catalia-health', image: cataliaImg, bg: '#31ECF6' },
  { name: 'Notetracks', link: '/project/notetracks', image: notetracksImg, bg: '#1a1a1a' },
]

export default function Navigation() {
  const [navOpacity, setNavOpacity] = useState(1)
  const [showNav, setShowNav] = useState(true)
  const [isScrolledMode, setIsScrolledMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [isWorkHovered, setIsWorkHovered] = useState(false)
  const workDropdownRef = useRef(null)
  const { isDark } = useTheme()
  const { isLightBanner, isDarkBanner, isInBannerZone } = useBanner()
  const { openDrawer } = useContactDrawer()

  // When in light banner zone, override to use dark nav colors
  const useDarkNav = isLightBanner && isInBannerZone && !isScrolledMode
  // When in dark banner zone (in light mode), override to use light nav colors
  const useLightNav = isDarkBanner && isInBannerZone && !isScrolledMode && !isDark

  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Prevent transition flicker on initial mount
  useEffect(() => {
    const timer = requestAnimationFrame(() => setHasMounted(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

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
    { name: 'Résumé', href: '/resume', isRoute: true },
    { name: 'Contact', href: '#contact', isRoute: false },
    { name: 'Design System', href: '/design-system', isRoute: true },
  ]

  // Work link handled separately for dropdown
  const workHref = isHomePage ? '#work' : '/#work'


  return (
    <>
    <nav
      ref={workDropdownRef}
      className={`fixed top-0 left-0 right-0 z-[200] ${
        (isScrolledMode || isWorkHovered)
          ? ((isDark && !useDarkNav) || useLightNav)
            ? 'bg-[#0a0a0a]/70 backdrop-blur-xl'
            : 'bg-[#FAF8F4]/70 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      style={{
        opacity: (isScrolledMode || isWorkHovered) ? (showNav ? 1 : 0) : navOpacity,
        transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
        transition: hasMounted
          ? showNav
            ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, background-color 0.5s'
            : 'transform 0.3s ease-in, opacity 0.2s ease-in, background-color 0.5s'
          : 'none',
        pointerEvents: ((isScrolledMode || isWorkHovered) ? !showNav : navOpacity < 0.1) ? 'none' : 'auto',
      }}
      onMouseLeave={() => setIsWorkHovered(false)}
    >
      {/* Grain overlay - appears in scrolled mode or when Work is hovered */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${hasMounted ? 'transition-opacity duration-500' : ''} ${(isScrolledMode || isWorkHovered) ? 'opacity-100' : 'opacity-0'}`}
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
              values={((isDark && !useDarkNav) || useLightNav)
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
          opacity={((isDark && !useDarkNav) || useLightNav) ? "0.12" : "0.45"}
          style={{ mixBlendMode: ((isDark && !useDarkNav) || useLightNav) ? 'normal' : 'overlay' }}
        />
      </svg>

      {/* Bottom divider - appears at bottom of nav (including mega menu when expanded) */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px ${((isDark && !useDarkNav) || useLightNav) ? 'bg-white/[0.06]' : 'bg-black/[0.08]'}`}
        style={{
          opacity: ((isScrolledMode || isWorkHovered) && showNav) ? 1 : 0,
          transition: hasMounted
            ? ((isScrolledMode || isWorkHovered) && showNav)
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
              src="/assets/branding/logo.svg"
              alt="Grace Guo logo"
              className={`h-6 w-auto transition-all duration-500 ease-out hover:scale-125 ${(isDark && !useDarkNav) || useLightNav ? 'invert' : ''}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Work with dropdown */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setIsWorkHovered(true)}
            >
              <a
                href={workHref}
                className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                  ((isDark && !useDarkNav) || useLightNav) ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <ScrambleText trigger="both" iterations={2} speed={20}>
                  Work
                </ScrambleText>
              </a>
            </div>

            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                    location.pathname === link.href
                      ? ((isDark && !useDarkNav) || useLightNav) ? 'text-white' : 'text-gray-900'
                      : ((isDark && !useDarkNav) || useLightNav) ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ScrambleText trigger="both" iterations={2} speed={20}>
                    {link.name}
                  </ScrambleText>
                </Link>
              ) : link.name === 'Contact' ? (
                <button
                  key={link.name}
                  onClick={openDrawer}
                  className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                    ((isDark && !useDarkNav) || useLightNav) ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ScrambleText trigger="both" iterations={2} speed={20}>
                    {link.name}
                  </ScrambleText>
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                    ((isDark && !useDarkNav) || useLightNav) ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ScrambleText trigger="both" iterations={2} speed={20}>
                    {link.name}
                  </ScrambleText>
                </a>
              )
            )}

            {/* Divider */}
            <div className={`w-px h-4 transition-colors duration-300 ${((isDark && !useDarkNav) || useLightNav) ? 'bg-white/10' : 'bg-black/10'}`} />

            {/* Theme Toggle */}
            <ThemeToggle size="small" />
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 relative w-10 h-10 flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
            <div className="w-[22px] h-[14px] relative">
              <span
                className={`absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 ease-out ${
                  ((isDark && !useDarkNav) || useLightNav) ? 'bg-white' : 'bg-gray-900'
                }`}
                style={{
                  top: isMobileMenuOpen ? '6px' : '0px',
                  transform: isMobileMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              />
              <span
                className={`absolute left-0 top-[6px] w-full h-[2px] rounded-full transition-all duration-300 ease-out ${
                  ((isDark && !useDarkNav) || useLightNav) ? 'bg-white' : 'bg-gray-900'
                }`}
                style={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  transform: isMobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                className={`absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 ease-out ${
                  ((isDark && !useDarkNav) || useLightNav) ? 'bg-white' : 'bg-gray-900'
                }`}
                style={{
                  top: isMobileMenuOpen ? '6px' : '12px',
                  transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
                }}
              />
            </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu - Work Projects Grid (inside nav for seamless container) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isWorkHovered ? '' : 'pointer-events-none'
        }`}
        style={{
          maxHeight: isWorkHovered ? '320px' : '0px',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-6">
          <div className="hidden md:grid grid-cols-5 gap-4">
            {workProjects.map((project, index) => (
              <Link
                key={project.link}
                to={project.link}
                className="group"
                style={{
                  opacity: isWorkHovered ? 1 : 0,
                  transform: isWorkHovered ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `opacity 0.3s ease-out ${index * 50}ms, transform 0.3s ease-out ${index * 50}ms`,
                }}
              >
                <div
                  className="aspect-square rounded-xl overflow-hidden mb-2 transition-all duration-300 group-hover:scale-[1.02]"
                  style={{
                    backgroundColor: project.bg,
                    boxShadow: ((isDark && !useDarkNav) || useLightNav)
                      ? '0 0 0 1px rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.3)'
                      : '0 0 0 1px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-200 ${
                  ((isDark && !useDarkNav) || useLightNav)
                    ? 'text-white/70 group-hover:text-white'
                    : 'text-gray-500 group-hover:text-gray-900'
                }`}>
                  {project.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Menu - Full screen overlay (outside nav to avoid transform issues) */}
    <div
      className={`md:hidden fixed inset-0 z-[250] transition-all duration-500 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'
      } ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      style={{
        backgroundImage: isDark
          ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
          : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    >
      {/* Header row - matches nav positioning */}
      <div className="px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="block"
        >
          <img
            src="/assets/branding/logo.svg"
            alt="Grace Guo logo"
            className={`h-6 w-auto ${isDark ? 'invert' : ''}`}
          />
        </Link>

        {/* Close button - same hamburger that morphs to X */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="p-2 relative w-10 h-10 flex items-center justify-center"
          aria-label="Close menu"
        >
          <div className="w-[22px] h-[14px] relative">
            <span
              className={`absolute left-0 w-full h-[2px] rounded-full ${
                isDark ? 'bg-white' : 'bg-gray-900'
              }`}
              style={{
                top: '6px',
                transform: 'rotate(45deg)',
              }}
            />
            <span
              className={`absolute left-0 w-full h-[2px] rounded-full ${
                isDark ? 'bg-white' : 'bg-gray-900'
              }`}
              style={{
                top: '6px',
                transform: 'rotate(-45deg)',
              }}
            />
          </div>
        </button>
      </div>

      {/* Content - centered but shifted slightly up */}
      <div className="h-[calc(100vh-72px)] flex flex-col justify-center items-center pb-24">
        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-6">
          {/* Work link */}
          <a
            href={workHref}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-satoshi text-3xl tracking-tight transition-colors duration-300 py-2 ${
              isDark ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Work
          </a>

          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-satoshi text-3xl tracking-tight transition-colors duration-300 py-2 ${
                  location.pathname === link.href
                    ? 'theme-heading'
                    : isDark ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ) : link.name === 'Contact' ? (
              <button
                key={link.name}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openDrawer()
                }}
                className={`font-satoshi text-3xl tracking-tight transition-colors duration-300 py-2 ${
                  isDark ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {link.name}
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-satoshi text-3xl tracking-tight transition-colors duration-300 py-2 ${
                  isDark ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {link.name}
              </a>
            )
          )}
        </div>
      </div>
    </div>
    </>
  )
}
