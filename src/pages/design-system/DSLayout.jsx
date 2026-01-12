import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { Caption, H1, H3 } from '../../components/Typography'
import { ArrowLeft } from '@phosphor-icons/react'

/**
 * DSLayout - Shared layout for design system category pages
 * Content on left, navigation sidebar on right
 */
export default function DSLayout({ title, sections, children }) {
  const { isDark } = useTheme()
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')
  const location = useLocation()

  // Track active section with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Back link */}
        <Link
          to="/design-system"
          className={`inline-flex items-center gap-2 mb-8 transition-colors duration-300 ${
            isDark ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70'
          }`}
        >
          <ArrowLeft size={16} />
          <Caption>Design System</Caption>
        </Link>

        {/* Page title */}
        <H1 className="mb-12">{title}</H1>

        {/* Main layout: content + sidebar */}
        <div className="flex gap-16">
          {/* Content area */}
          <div className="flex-1 min-w-0">
            {children}
          </div>

          {/* Right sidebar navigation - desktop only */}
          <nav className="hidden lg:block w-48 flex-shrink-0">
            <div className="sticky top-32 flex">
              {/* Vertical divider */}
              <div className={`w-px mr-6 self-stretch ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

              {/* Navigation content */}
              <div>
                <Caption className={`mb-4 block ${isDark ? 'text-white/30' : 'text-black/30'}`}>
                  On this page
                </Caption>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block text-left font-satoshi text-sm transition-all duration-300 ${
                        activeSection === section.id
                          ? isDark ? 'text-white' : 'text-gray-900'
                          : isDark ? 'text-white/40 hover:text-white/60' : 'text-black/40 hover:text-black/60'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

/**
 * DSSection - Section wrapper for design system content
 */
export function DSSection({ id, title, children }) {
  return (
    <section id={id} className="mb-20 scroll-mt-24">
      <H3 className="mb-8">{title}</H3>
      {children}
    </section>
  )
}
