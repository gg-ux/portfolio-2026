import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
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
    }
  }

  return (
    <div className="min-h-screen">
      {/* Side Navigation - Desktop only */}
      <nav
        className={`fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block transition-all duration-500 ${
          showNav ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
      >
        <div className="flex flex-col gap-3">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`group flex items-center gap-3 text-left transition-all duration-300`}
            >
              <span
                className={`w-6 h-px transition-all duration-300 ${
                  activeSection === id
                    ? isDark ? 'bg-white w-8' : 'bg-gray-900 w-8'
                    : isDark ? 'bg-white/20 group-hover:bg-white/40' : 'bg-black/20 group-hover:bg-black/40'
                }`}
              />
              <span
                className={`font-mono text-[11px] tracking-wide uppercase transition-all duration-300 ${
                  activeSection === id
                    ? isDark ? 'text-white' : 'text-gray-900'
                    : isDark ? 'text-white/40 group-hover:text-white/60' : 'text-black/40 group-hover:text-black/60'
                }`}
              >
                {label}
              </span>
            </button>
          ))}
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
