import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { getColor } from '../../constants/colors'
import { Caption } from '../Typography'
import { CheckCircle, XCircle, Minus, Star, Users, ArrowsHorizontal, Folder } from '@phosphor-icons/react'

/**
 * CompetitiveAnalysis - Grid comparing navigation patterns across auto brands
 */
export function CompetitiveAnalysis() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const competitors = [
    {
      name: 'BMW',
      logo: '/assets/projects/tesla/mega-menu/content/logo-bmw.svg',
      structure: 'Mega menu',
      topLevel: ['Models', 'Build', 'Shopping', 'Electric', 'Owners'],
      strengths: ['Clear vehicle categorization (SUV, Sedan, Coupe)', 'Dedicated electric section'],
      weaknesses: ['Dense subcategories', 'Separate shopping flow'],
    },
    {
      name: 'Porsche',
      logo: '/assets/projects/tesla/mega-menu/content/logo-porsche.svg',
      structure: 'Mega menu',
      topLevel: ['Models', 'Experience', 'Ownership', 'Porsche Finder'],
      strengths: ['Model-centric navigation', 'Lifestyle content integrated'],
      weaknesses: ['Limited top-level categories', 'Complex model variants'],
    },
    {
      name: 'Rivian',
      logo: '/assets/projects/tesla/mega-menu/content/logo-rivian.svg',
      structure: 'Dropdown',
      topLevel: ['Vehicles', 'Gear Shop', 'Charging', 'Discover', 'Ownership'],
      strengths: ['Clean, minimal structure', 'Action-oriented CTAs per vehicle'],
      weaknesses: ['Gear shop prominent (e-commerce focus)', 'Less scalable for larger lineup'],
    },
    {
      name: 'Apple',
      logo: '/assets/projects/tesla/mega-menu/content/logo-apple.svg',
      structure: 'Mega menu',
      topLevel: ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Services', 'Support'],
      strengths: ['Product-centric top level', 'Minimal, focused mega panels', 'Blur effect focuses attention'],
      weaknesses: ['N/A — industry benchmark'],
    },
  ]

  const amethyst = getColor('amethyst', isDark)
  const lilac = getColor('lilac', isDark)

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="space-y-4">
        {competitors.map((comp, index) => (
          <div
            key={comp.name}
            className={`rounded-xl p-5 md:p-6 ${
              isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: `all 0.5s ease-out ${index * 100}ms`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              {/* Brand name and structure */}
              <div className="flex-shrink-0 md:w-32">
                <h4 className="font-satoshi font-semibold text-base theme-heading mb-1">
                  {comp.name}
                </h4>
                <span className={`font-mono text-[10px] uppercase tracking-wider ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>
                  {comp.structure}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Top-level items */}
                <div>
                  <span className={`font-mono text-[10px] uppercase tracking-wider block mb-2 ${
                    isDark ? 'text-white/40' : 'text-black/40'
                  }`}>
                    Top-level navigation
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.topLevel.map((item) => (
                      <span
                        key={item}
                        className={`px-2 py-1 rounded text-xs font-mono ${
                          isDark ? 'bg-white/[0.06] text-white/70' : 'bg-black/[0.04] text-black/60'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <CheckCircle size={12} weight="fill" color={getColor('peridot', isDark)} />
                      <span className={`font-mono text-[10px] uppercase tracking-wider ${
                        isDark ? 'text-white/40' : 'text-black/40'
                      }`}>
                        Strengths
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {comp.strengths.map((s) => (
                        <li key={s} className={`text-xs font-satoshi ${
                          isDark ? 'text-white/60' : 'text-black/50'
                        }`}>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <XCircle size={12} weight="fill" color={getColor('rose', isDark)} />
                      <span className={`font-mono text-[10px] uppercase tracking-wider ${
                        isDark ? 'text-white/40' : 'text-black/40'
                      }`}>
                        Weaknesses
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {comp.weaknesses.map((w) => (
                        <li key={w} className={`text-xs font-satoshi ${
                          isDark ? 'text-white/60' : 'text-black/50'
                        }`}>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Takeaways */}
      <div className={`mt-6 p-5 rounded-xl border ${
        isDark ? 'border-white/[0.08] bg-white/[0.01]' : 'border-black/[0.06] bg-black/[0.01]'
      }`}>
        <h4 className={`font-mono text-[11px] uppercase tracking-wider mb-3 ${
          isDark ? 'text-white/50' : 'text-black/50'
        }`}>
          Key Takeaways for Tesla
        </h4>
        <ul className="space-y-2">
          {[
            'Product-centric top level navigation (like Apple) scales better than action-centric',
            'Dedicated sections for energy products (like BMW\'s Electric) aids discoverability',
            'Minimal mega panels with clear hierarchy reduce cognitive load',
            'Consistent CTAs (Shop, Configure, Learn) across product categories',
          ].map((takeaway, i) => (
            <li key={i} className="flex items-center gap-2">
              <span style={{ color: amethyst }}>•</span>
              <span className={`text-sm font-satoshi ${
                isDark ? 'text-white/70' : 'text-black/60'
              }`}>
                {takeaway}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * MegaMenuCardSort - Shows card sort results for Tesla navigation naming
 */
export function MegaMenuCardSort() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  // Card sort results - what participants grouped together and preferred names
  // These are the 5 mega menu categories (excluding direct links like Support, Account, Language)
  const sortResults = [
    {
      category: 'Vehicles',
      participantName: 'Vehicles',
      alternateNames: ['Cars', 'Models', 'Products'],
      agreement: 94,
      items: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster', 'Semi'],
    },
    {
      category: 'Energy',
      participantName: 'Energy',
      alternateNames: ['Solar', 'Power', 'Home'],
      agreement: 78,
      items: ['Solar Panels', 'Solar Roof', 'Powerwall', 'Megapack'],
    },
    {
      category: 'Charging',
      participantName: 'Charging',
      alternateNames: ['Supercharger', 'Power Up', 'Fuel'],
      agreement: 88,
      items: ['Supercharger Network', 'Home Charging', 'Charging Calculator'],
    },
    {
      category: 'Discover',
      participantName: 'Discover',
      alternateNames: ['Explore', 'Learn', 'About'],
      agreement: 72,
      items: ['About Tesla', 'Careers', 'News', 'Events', 'Find Us'],
    },
    {
      category: 'Shop',
      participantName: 'Shop',
      alternateNames: ['Store', 'Buy', 'Accessories'],
      agreement: 91,
      items: ['Vehicle Accessories', 'Apparel', 'Lifestyle'],
    },
  ]

  const amethyst = getColor('amethyst', isDark)
  const lilac = getColor('lilac', isDark)

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 ${
        isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
      }`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${amethyst}15` }}
          >
            <Users size={20} weight="regular" color={amethyst} />
          </div>
          <div>
            <h4 className="font-satoshi font-semibold text-base theme-heading">
              32 Participants
            </h4>
            <span className={`font-mono text-[11px] tracking-wider ${
              isDark ? 'text-white/40' : 'text-black/40'
            }`}>
              Internal card sort study
            </span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-4">
          {sortResults.map((result, index) => (
            <div
              key={result.category}
              className={`p-4 rounded-xl ${
                isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: `all 0.4s ease-out ${index * 80}ms`,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Category with agreement bar */}
                <div className="sm:w-40 flex-shrink-0">
                  <div className="flex items-center justify-between sm:justify-start gap-2 mb-1.5">
                    <span className="font-satoshi font-medium text-sm theme-heading">
                      "{result.participantName}"
                    </span>
                    <span
                      className="font-mono text-[11px] font-medium"
                      style={{ color: lilac }}
                    >
                      {result.agreement}%
                    </span>
                  </div>
                  {/* Agreement bar */}
                  <div className={`h-1 rounded-full overflow-hidden ${
                    isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'
                  }`}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: isVisible ? `${result.agreement}%` : '0%',
                        backgroundColor: lilac,
                        transitionDelay: `${index * 80 + 200}ms`,
                      }}
                    />
                  </div>
                </div>

                {/* Alternate names considered */}
                <div className="flex-1">
                  <span className={`font-mono text-[9px] uppercase tracking-wider block mb-1.5 ${
                    isDark ? 'text-white/30' : 'text-black/30'
                  }`}>
                    Also considered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.alternateNames.map((name) => (
                      <span
                        key={name}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                          isDark ? 'bg-white/[0.04] text-white/40' : 'bg-black/[0.03] text-black/40'
                        }`}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Items grouped */}
                <div className="sm:w-56 flex-shrink-0">
                  <span className={`font-mono text-[9px] uppercase tracking-wider block mb-1.5 ${
                    isDark ? 'text-white/30' : 'text-black/30'
                  }`}>
                    Items grouped
                  </span>
                  <span className={`text-xs font-satoshi ${
                    isDark ? 'text-white/50' : 'text-black/50'
                  }`}>
                    {result.items.slice(0, 3).join(', ')}
                    {result.items.length > 3 && ` +${result.items.length - 3} more`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insight callout */}
        <div className={`mt-6 p-4 rounded-lg border-l-2 ${
          isDark ? 'bg-white/[0.01]' : 'bg-black/[0.01]'
        }`} style={{ borderColor: amethyst }}>
          <p className={`text-sm font-satoshi ${
            isDark ? 'text-white/70' : 'text-black/60'
          }`}>
            <strong className="theme-heading">Key insight:</strong> "Vehicles" had 94% agreement vs. "Cars" at only 23% — participants felt "Vehicles" better represented the full lineup including Semi and Cybertruck. "Discover" had the lowest agreement, with participants split between "Explore," "Learn," and "About."
          </p>
        </div>
      </div>
    </div>
  )
}
