import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useBanner } from '../context/BannerContext'
import { useContactDrawer } from '../context/ContactDrawerContext'
import ThemeToggle from './ThemeToggle'
import ScrambleText from './ScrambleText'
import { Caption } from './Typography'
import { List, X } from '@phosphor-icons/react'

// Import project thumbnails (same as Explore More section)
import teslaChatbotImg from '../assets/projects/tesla/chatbot/chatbot-card-filled.webp'
import teslaMegaMenuImg from '../assets/projects/tesla/mega menu/mega-menu-card-filled.webp'
import indiEvImg from '../assets/projects/indi ev/card-indi-ev.webp'
import notetracksImg from '../assets/projects/notetracks/notetracks-card-filled.webp'
import cataliaImg from '../assets/projects/catalia health/catalia-card-filled.webp'

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
  const [mobileMenuLayer, setMobileMenuLayer] = useState('main') // 'main' or 'work'
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
  const isDesignSystemSubpage = location.pathname.startsWith('/design-system/')

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
      // Reset to main layer when menu closes
      setMobileMenuLayer('main')
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
  }, [isHomePage, isDesignSystemSubpage])

  const navLinks = [
    { name: 'Résumé', href: '/resume', isRoute: true },
    { name: 'Contact', href: '#contact', isRoute: false },
    { name: 'Design System', href: '/design-system', isRoute: true },
  ]

  return (
    <>
    {/* Mega menu backdrop overlay - desktop only */}
    <div
      className={`hidden md:block fixed inset-0 z-[199] transition-all duration-500 ${
        isWorkHovered
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: ((isDark && !useDarkNav) || useLightNav)
          ? 'rgba(0,0,0,0.64)'
          : 'rgba(250,248,244,0.6)',
        backdropFilter: 'blur(12px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
      }}
      onClick={() => setIsWorkHovered(false)}
      aria-hidden="true"
    >
      {/* Grain texture */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="backdrop-grain" x="0%" y="0%" width="100%" height="100%">
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
                ? "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0"
                : "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"
              }
              in="noise"
              result="coloredNoise"
            />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter="url(#backdrop-grain)"
        />
      </svg>
    </div>
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
              <button
                onClick={() => setIsWorkHovered(!isWorkHovered)}
                className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
                  ((isDark && !useDarkNav) || useLightNav) ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <ScrambleText trigger="both" iterations={2} speed={20}>
                  Projects
                </ScrambleText>
              </button>
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

            {/* Theme Toggle */}
            <ThemeToggle size="small" />
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 relative w-10 h-10 flex items-center justify-center ${
                ((isDark && !useDarkNav) || useLightNav) ? 'text-white' : 'text-gray-900'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {/* List icon - morphs out when open */}
              <div
                className={`absolute transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? 'opacity-0 scale-50 rotate-45'
                    : 'opacity-100 scale-100 rotate-0'
                }`}
              >
                <List size={24} weight="light" />
              </div>
              {/* X icon - morphs in when open */}
              <div
                className={`absolute transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? 'opacity-100 scale-100 rotate-0'
                    : 'opacity-0 scale-50 -rotate-45'
                }`}
              >
                <X size={24} weight="light" />
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
      className={`md:hidden fixed inset-0 z-[250] flex flex-col transition-all duration-500 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'
      } ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'} overflow-hidden`}
      style={{
        backgroundImage: isDark
          ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
          : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    >
      {/* Header row - absolute on work layer to allow content scrolling underneath */}
      <div className={`px-6 h-18 flex items-center justify-between ${
        mobileMenuLayer === 'work'
          ? `absolute top-0 left-0 right-0 z-20 ${isDark ? 'bg-[#0a0a0a]/60 backdrop-blur-xl' : 'bg-[#FAF8F4]/60 backdrop-blur-xl'}`
          : 'relative z-20 bg-transparent'
      }`}>
        {/* Grain overlay - only on work layer */}
        {mobileMenuLayer === 'work' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <filter id="mobile-nav-grain" x="0%" y="0%" width="100%" height="100%">
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
                    ? "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
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
              filter="url(#mobile-nav-grain)"
              opacity={isDark ? "0.12" : "0.45"}
              style={{ mixBlendMode: isDark ? 'normal' : 'overlay' }}
            />
          </svg>
        )}
        {/* Logo and Back button - both rendered, animated */}
        {/* Width matches right side (theme toggle + close button) for centered title */}
        <div className="relative h-10 flex items-center flex-shrink-0 w-[92px]">
          {/* Logo - left aligned to match main nav */}
          <Link
            to="/"
            onClick={(e) => {
              if (mobileMenuLayer !== 'main') {
                e.preventDefault()
                return
              }
              setIsMobileMenuOpen(false)
            }}
            className="transition-all duration-300 ease-out"
            style={{
              opacity: mobileMenuLayer === 'main' ? 1 : 0,
              transform: mobileMenuLayer === 'main' ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-90deg)',
              pointerEvents: mobileMenuLayer === 'main' ? 'auto' : 'none',
            }}
          >
            <img
              src="/assets/branding/logo.svg"
              alt="Grace Guo logo"
              className={`h-6 w-auto ${isDark ? 'invert' : ''}`}
            />
          </Link>

          {/* Back chevron - absolutely positioned to same spot */}
          <button
            onClick={() => mobileMenuLayer !== 'main' && setMobileMenuLayer('main')}
            className={`absolute left-0 transition-all duration-300 ease-out ${
              isDark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-gray-900'
            }`}
            style={{
              opacity: mobileMenuLayer === 'work' ? 1 : 0,
              transform: mobileMenuLayer === 'work' ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(90deg)',
              pointerEvents: mobileMenuLayer === 'work' ? 'auto' : 'none',
            }}
            aria-label="Back to main menu"
          >
            <svg
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
              className="stroke-current"
            >
              <path
                d="M10 1L1 9L10 17"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Center title - fades in on work layer */}
        <span
          className={`flex-1 text-center font-satoshi text-2xl tracking-tight transition-all duration-300 ease-out ${
            isDark ? 'text-white/90' : 'text-gray-900'
          }`}
          style={{
            opacity: mobileMenuLayer === 'work' ? 1 : 0,
            transform: mobileMenuLayer === 'work' ? 'translateY(0)' : 'translateY(-8px)',
          }}
        >
          Projects
        </span>

        {/* Theme Toggle + Close button - matches main nav layout */}
        {/* Width matches left side for centered title */}
        <div className="flex items-center justify-end gap-3 flex-shrink-0 w-[92px]">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`p-2 relative w-10 h-10 flex items-center justify-center ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            aria-label="Close menu"
          >
            <X size={24} weight="light" />
          </button>
        </div>
      </div>

      {/* Content container with sliding layers - full height on work layer since header is absolute */}
      <div className={`relative overflow-hidden ${mobileMenuLayer === 'work' ? 'h-full' : 'flex-1'}`}>
        {/* Main Navigation Layer */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center px-8 pb-24 transition-transform duration-400 ease-out"
          style={{
            transform: mobileMenuLayer === 'main' ? 'translateX(0)' : 'translateX(-100%)',
          }}
        >
          {/* Navigation Links - Centered */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => setMobileMenuLayer('work')}
              className={`font-satoshi text-4xl tracking-tight transition-colors duration-300 py-3 ${
                isDark ? 'text-white/90 hover:text-white' : 'text-gray-900 hover:text-gray-900'
              }`}
            >
              Projects
            </button>

            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-satoshi text-4xl tracking-tight transition-colors duration-300 py-3 ${
                    isDark ? 'text-white/90 hover:text-white' : 'text-gray-900 hover:text-gray-900'
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
                  className={`text-left font-satoshi text-4xl tracking-tight transition-colors duration-300 py-3 ${
                    isDark ? 'text-white/90 hover:text-white' : 'text-gray-900 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-satoshi text-4xl tracking-tight transition-colors duration-300 py-3 ${
                    isDark ? 'text-white/90 hover:text-white' : 'text-gray-900 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
          </div>
        </div>

        {/* Work Projects Layer - scrollable with content passing under header */}
        <div
          className="absolute inset-0 overflow-y-auto transition-transform duration-400 ease-out"
          style={{
            transform: mobileMenuLayer === 'work' ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          {/* Projects Grid - 2 cols on mobile, 3 cols on tablet */}
          {/* pt-[76px] accounts for h-18 (72px) header + 4px spacing */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-6 pt-[76px] pb-8">
            {workProjects.map((project, index) => (
              <Link
                key={project.link}
                to={project.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group"
                style={{
                  opacity: mobileMenuLayer === 'work' ? 1 : 0,
                  transform: mobileMenuLayer === 'work' ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                  transition: `opacity 0.4s ease-out ${index * 60}ms, transform 0.4s ease-out ${index * 60}ms`,
                }}
              >
                <div
                  className="relative aspect-square rounded-xl overflow-hidden transition-transform duration-300 group-active:scale-95"
                  style={{
                    backgroundColor: project.bg,
                    boxShadow: isDark
                      ? '0 0 0 1px rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.3)'
                      : '0 0 0 1px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay with name */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                    <span className="font-mono text-[11px] text-white tracking-wide uppercase">
                      {project.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
