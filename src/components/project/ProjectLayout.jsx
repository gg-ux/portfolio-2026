import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { ListBullets, X } from '@phosphor-icons/react'
import { Caption, H2, H4 } from '../Typography'

// Import project images
import teslaMegaMenuImg from '../../assets/projects/tesla/mega menu/mega-menu-card-filled.png'
import teslaChatbotImg from '../../assets/projects/tesla/chatbot/chatbot-card-filled.png'
import indiEvImg from '../../assets/projects/indi ev/card-indi-ev.png'
import notetracksImg from '../../assets/projects/notetracks/notetracks-card-filled.png'
import cataliaImg from '../../assets/projects/catalia health/catalia-card-filled.png'

const projects = [
  {
    id: 1,
    name: 'Tesla Assist',
    category: 'AI Chatbot Design',
    image: teslaChatbotImg,
    link: '/project/tesla-chatbot',
    bgDark: '#B1CCFF',
    bgLight: '#B1CCFF',
  },
  {
    id: 2,
    name: 'Tesla Mega Menu',
    category: 'Navigation & IA Redesign',
    image: teslaMegaMenuImg,
    link: '/project/tesla-mega-menu',
    bgDark: '#30409B',
    bgLight: '#30409B',
  },
  {
    id: 3,
    name: 'INDI EV',
    category: 'In-Vehicle Infotainment',
    image: indiEvImg,
    link: '/project/indi-ev',
    bgDark: '#000000',
    bgLight: '#000000',
  },
  {
    id: 4,
    name: 'Catalia Health',
    category: 'Patient Community App',
    image: cataliaImg,
    link: '/project/catalia-health',
    bgDark: '#31ECF6',
    bgLight: '#31ECF6',
  },
  {
    id: 5,
    name: 'Notetracks',
    category: 'Audio Collaboration Platform',
    image: notetracksImg,
    link: '/project/notetracks',
    bgDark: '#1a1a1a',
    bgLight: '#2a2a2a',
  },
]

/**
 * ProjectLayout - Main layout wrapper for project case study pages
 * Includes sticky side navigation on desktop for section jumping
 */
export default function ProjectLayout({
  children,
  sections = [],
}) {
  const { isDark } = useTheme()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')
  const [showNav, setShowNav] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0)
  const carouselRef = useRef(null)
  const observerRef = useRef(null)

  // Filter out current project from carousel
  const otherProjects = projects.filter(p => p.link !== location.pathname)

  // Set up intersection observer for section tracking
  useEffect(() => {
    if (sections.length === 0) return

    const options = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, options)

    // Observe all section elements
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [sections])

  // Show nav after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      setIsPanelOpen(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Floating TOC Button - Bottom Left */}
      {sections.length > 0 && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className={`fixed left-10 bottom-10 z-40 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
            showNav && !isPanelOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          } ${
            isDark
              ? 'bg-[#1a1a1a]/90 backdrop-blur-md border border-white/[0.08] text-white/70 hover:bg-[#1a1a1a] hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-[#FAF8F4]/90 backdrop-blur-md border border-black/[0.08] text-gray-600 hover:bg-[#FAF8F4] hover:text-gray-900 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
          }`}
          aria-label="Open table of contents"
        >
          <ListBullets size={22} weight="bold" />
        </button>
      )}

      {/* Slide-out Panel Backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isPanelOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)',
        }}
        onClick={() => setIsPanelOpen(false)}
      />

      {/* Slide-out Panel */}
      <nav
        className={`fixed left-0 top-0 h-full z-50 w-72 transition-transform duration-500 ease-out ${
          isPanelOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isDark
            ? 'bg-[#0a0a0a] border-r border-white/10'
            : 'bg-white border-r border-black/10'
        }`}
      >
        {/* Panel Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <span className={`font-mono text-[11px] tracking-wide uppercase ${
            isDark ? 'text-white/50' : 'text-black/50'
          }`}>
            On this page
          </span>
          <button
            onClick={() => setIsPanelOpen(false)}
            className={`p-1.5 rounded-md transition-colors duration-200 ${
              isDark
                ? 'hover:bg-white/10 text-white/50 hover:text-white'
                : 'hover:bg-black/5 text-black/40 hover:text-black/70'
            }`}
            aria-label="Close navigation"
          >
            <X size={18} weight="regular" />
          </button>
        </div>

        {/* Section Links */}
        <div className="px-4 py-4">
          <div className="flex flex-col gap-1">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`group flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === id
                    ? isDark
                      ? 'bg-white/10 text-white'
                      : 'bg-black/5 text-gray-900'
                    : isDark
                      ? 'text-white/50 hover:bg-white/5 hover:text-white/80'
                      : 'text-black/50 hover:bg-black/5 hover:text-black/80'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    activeSection === id
                      ? isDark ? 'bg-white' : 'bg-gray-900'
                      : isDark ? 'bg-white/30' : 'bg-black/20'
                  }`}
                />
                <span className="font-mono text-[12px] tracking-wide">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div>
        {children}
      </div>

      {/* Explore More */}
      <footer className={`border-t pt-12 pb-16 ${isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'}`}>
        {/* Header */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-8">
          <div className="flex items-center justify-between">
            <H2>Explore More</H2>

            {/* Carousel indicators - mobile/tablet only */}
            <div className="flex items-center gap-1 lg:hidden">
              {otherProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCarouselIndex(index)
                    if (carouselRef.current) {
                      const scrollCardWidth = 280 + 16
                      carouselRef.current.scrollTo({
                        left: index * scrollCardWidth,
                        behavior: 'smooth'
                      })
                    }
                  }}
                  className="transition-all duration-700"
                  style={{
                    width: index === activeCarouselIndex ? '24px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: isDark
                      ? index === activeCarouselIndex ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)'
                      : index === activeCarouselIndex ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.08)',
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden lg:block max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-4 gap-6">
            {otherProjects.map((project) => {
              const cardShadow = isDark
                ? '0 0 0 1px rgba(255,255,255,0.06), 0 8px 16px rgba(0,0,0,0.4), 0 24px 48px rgba(0,0,0,0.4)'
                : '0 0 0 1px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.1)'

              return (
                <Link key={project.id} to={project.link} className="group block">
                  <div
                    className="relative aspect-square overflow-hidden rounded-2xl"
                    style={{
                      background: isDark ? project.bgDark : project.bgLight,
                      boxShadow: cardShadow,
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <H4 className={`mb-1 transition-colors duration-300 ${isDark ? 'group-hover:text-gray-300' : 'group-hover:text-gray-600'}`}>
                      {project.name}
                    </H4>
                    <Caption className={isDark ? 'text-gray-500' : 'text-gray-500'}>
                      {project.category}
                    </Caption>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile/Tablet: Horizontal scrolling carousel */}
        <div
          ref={carouselRef}
          className="lg:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'max(24px, calc((100vw - 1440px) / 2 + 24px))',
            scrollPaddingLeft: 'max(24px, calc((100vw - 1440px) / 2 + 24px))',
          }}
          onScroll={(e) => {
            const { scrollLeft, scrollWidth, clientWidth } = e.target
            const scrollCardWidth = 280 + 16

            const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10
            const newIndex = isAtEnd
              ? otherProjects.length - 1
              : Math.round(scrollLeft / scrollCardWidth)

            if (newIndex !== activeCarouselIndex && newIndex >= 0 && newIndex < otherProjects.length) {
              setActiveCarouselIndex(newIndex)
            }
          }}
        >
          {otherProjects.map((project) => {
            const cardShadow = isDark
              ? '0 0 0 1px rgba(255,255,255,0.06), 0 8px 16px rgba(0,0,0,0.4), 0 24px 48px rgba(0,0,0,0.4)'
              : '0 0 0 1px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.1)'

            return (
              <div
                key={project.id}
                className="flex-shrink-0 snap-start"
                style={{ width: '280px' }}
              >
                <Link to={project.link} className="group block">
                  <div
                    className="relative aspect-square overflow-hidden rounded-2xl"
                    style={{
                      background: isDark ? project.bgDark : project.bgLight,
                      boxShadow: cardShadow,
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <H4 className={`mb-1 transition-colors duration-300 ${isDark ? 'group-hover:text-gray-300' : 'group-hover:text-gray-600'}`}>
                      {project.name}
                    </H4>
                    <Caption className={isDark ? 'text-gray-500' : 'text-gray-500'}>
                      {project.category}
                    </Caption>
                  </div>
                </Link>
              </div>
            )
          })}
          <div className="flex-shrink-0" style={{ width: '24px' }} />
        </div>
      </footer>
    </div>
  )
}
