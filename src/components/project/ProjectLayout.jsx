import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { ArrowLeft, ArrowRight, ListBullets, X } from '@phosphor-icons/react'
import { Caption } from '../Typography'

/**
 * ProjectLayout - Main layout wrapper for project case study pages
 * Includes sticky side navigation on desktop for section jumping
 */
export default function ProjectLayout({
  children,
  sections = [],
  prevProject = null,
  nextProject = null
}) {
  const { isDark } = useTheme()
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')
  const [showNav, setShowNav] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const observerRef = useRef(null)

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
          className={`fixed left-6 bottom-6 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
            showNav && !isPanelOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          } ${
            isDark
              ? 'bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 text-white/70 hover:text-white'
              : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10 text-black/50 hover:text-black/70'
          }`}
          aria-label="Open table of contents"
        >
          <ListBullets size={20} weight="regular" />
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

      {/* Project Navigation Footer */}
      <footer className={`border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 min-h-[120px]">
            {/* Previous Project */}
            <div className={`flex items-center border-r ${isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'}`}>
              {prevProject ? (
                <Link
                  to={prevProject.href}
                  className={`group flex items-center gap-4 py-8 pr-8 transition-colors duration-300 ${
                    isDark ? 'hover:text-white' : 'hover:text-gray-900'
                  }`}
                >
                  <ArrowLeft
                    size={20}
                    className={`transition-transform duration-300 group-hover:-translate-x-1 ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}
                  />
                  <div>
                    <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>
                      Previous
                    </Caption>
                    <p className={`font-satoshi text-sm mt-1 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="py-8" />
              )}
            </div>

            {/* Next Project */}
            <div className="flex items-center justify-end">
              {nextProject ? (
                <Link
                  to={nextProject.href}
                  className={`group flex items-center gap-4 py-8 pl-8 text-right transition-colors duration-300 ${
                    isDark ? 'hover:text-white' : 'hover:text-gray-900'
                  }`}
                >
                  <div>
                    <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>
                      Next
                    </Caption>
                    <p className={`font-satoshi text-sm mt-1 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                      {nextProject.title}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className={`transition-transform duration-300 group-hover:translate-x-1 ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}
                  />
                </Link>
              ) : (
                <Link
                  to="/#work"
                  className={`group flex items-center gap-4 py-8 pl-8 text-right transition-colors duration-300 ${
                    isDark ? 'hover:text-white' : 'hover:text-gray-900'
                  }`}
                >
                  <div>
                    <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>
                      Back to
                    </Caption>
                    <p className={`font-satoshi text-sm mt-1 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                      All Projects
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className={`transition-transform duration-300 group-hover:translate-x-1 ${
                      isDark ? 'text-white/40' : 'text-black/40'
                    }`}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
