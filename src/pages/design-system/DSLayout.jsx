import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { Caption, H3 } from '../../components/Typography'
import { Palette, Stack, Lightning, Layout, ListBullets, X, Sun, Moon } from '@phosphor-icons/react'

// Category navigation items
const categories = [
  { id: 'foundation', label: 'Foundation', href: '/design-system/foundation', icon: Palette },
  { id: 'components', label: 'Components', href: '/design-system/components', icon: Stack },
  { id: 'motion', label: 'Motion', href: '/design-system/motion', icon: Lightning },
  { id: 'patterns', label: 'Patterns', href: '/design-system/patterns', icon: Layout },
]

/**
 * DSLayout - Shared layout for design system category pages
 * Sticky sidebar within max-width container, aligned with main nav
 */
export default function DSLayout({ title, sections, children }) {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Get current category from pathname
  const currentCategory = location.pathname.split('/').pop()

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

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMobileNavOpen(false)
  }

  // Sidebar content (shared between desktop and mobile)
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo/Title */}
      <div className="mb-8">
        <Link to="/design-system" className="block group">
          <span className={`font-silk text-4xl ${isDark ? 'text-white' : 'text-gray-900'} transition-opacity duration-300 group-hover:opacity-70`}>
            Gooey
          </span>
        </Link>
        <div className={`flex items-center gap-2 mt-2 font-mono text-[11px] tracking-wide uppercase ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          <span>Design System</span>
          <button
            onClick={toggleTheme}
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md font-mono font-light text-[11px] tracking-wide uppercase transition-all duration-300 ${
              isDark
                ? 'bg-white/[0.06] hover:bg-white/[0.1] text-white/60'
                : 'bg-black/[0.04] hover:bg-black/[0.08] text-black/60'
            }`}
          >
            {isDark ? <Moon size={11} weight="fill" /> : <Sun size={11} weight="fill" className="text-amber-500" />}
            {isDark ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>

      {/* Category Navigation with nested sections */}
      <nav className="flex-1 overflow-y-auto -mx-2 scrollbar-hide">
        <div className="space-y-1 px-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = currentCategory === cat.id
            return (
              <div key={cat.id}>
                {/* Category link */}
                <Link
                  to={cat.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? 'bg-white/[0.06] text-white'
                        : 'bg-black/[0.04] text-gray-900'
                      : isDark
                        ? 'text-white/50 hover:text-white/70 hover:bg-white/[0.03]'
                        : 'text-black/50 hover:text-black/70 hover:bg-black/[0.02]'
                  }`}
                >
                  <Icon size={18} weight={isActive ? 'regular' : 'light'} />
                  <span className="font-satoshi text-sm">{cat.label}</span>
                </Link>

                {/* Nested sections for active category */}
                {isActive && sections.length > 0 && (
                  <div className={`relative ml-[27px] mt-1 mb-2 border-l ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                    {/* Sliding indicator bar */}
                    <span
                      className={`absolute left-0 -translate-x-[0.5px] w-[2px] h-4 rounded-full transition-all duration-500 ease-out ${
                        isDark ? 'bg-white' : 'bg-gray-900'
                      }`}
                      style={{
                        top: `${sections.findIndex(s => s.id === activeSection) * 32 + 8}px`,
                      }}
                    />
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`block w-full text-left pl-4 py-1.5 font-satoshi text-[13px] transition-colors duration-300 ${
                          activeSection === section.id
                            ? isDark ? 'text-white' : 'text-gray-900'
                            : isDark ? 'text-white/40 hover:text-white/60' : 'text-black/40 hover:text-black/60'
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Max-width container for aligned layout */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex pt-24">
          {/* Sticky Sidebar - Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0 mr-12">
            <div className="sticky top-24 h-[calc(100vh-8rem)] pb-8">
              <SidebarContent />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 pb-24">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className={`lg:hidden fixed left-6 bottom-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
          mobileNavOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${
          isDark
            ? 'bg-[#1a1a1a]/90 backdrop-blur-md border border-white/[0.08] text-white/70 hover:bg-[#1a1a1a] hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-[#FAF8F4]/90 backdrop-blur-md border border-black/[0.08] text-gray-600 hover:bg-[#FAF8F4] hover:text-gray-900 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
        }`}
        aria-label="Open navigation"
      >
        <ListBullets size={22} weight="bold" />
      </button>

      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          onClick={() => setMobileNavOpen(false)}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm`} />
          <aside
            className={`absolute left-0 top-0 bottom-0 w-72 pt-24 pb-6 px-6 border-r flex flex-col ${
              isDark ? 'bg-[#0a0a0a] border-white/[0.06]' : 'bg-[#FAF8F4] border-black/[0.06]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}
    </div>
  )
}

/**
 * DSSection - Section wrapper for design system content
 */
export function DSSection({ id, title, children }) {
  return (
    <section id={id} className="mb-20 scroll-mt-28">
      <H3 className="mb-8">{title}</H3>
      {children}
    </section>
  )
}
