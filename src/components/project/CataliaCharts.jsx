import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ArrowsOut, X } from '@phosphor-icons/react'
import {
  VideoCamera,
  ClipboardText,
  Cards,
  User,
  Users,
  Heart,
  BookOpen,
  MapPin,
  DeviceMobile,
  Handshake,
  Eye,
  Star,
  ChatCircle,
  ChatTeardropText,
  Globe,
  ShieldCheck,
  Clock,
  Leaf,
  HandHeart,
  UserCircle,
  ArrowRight,
  ChatsCircle,
  Article,
  Toolbox,
  Plant,
  Flower,
  Quotes,
  Laptop,
  Stethoscope,
  ForkKnife,
  MagnifyingGlass,
  ArrowsClockwise
} from '@phosphor-icons/react'
import { H4, ChartTitle, Caption, Body } from '../Typography'
import { ChartCaption } from './ProjectImage'

// =============================================================================
// 1. RESEARCH METHODOLOGIES
// =============================================================================
export function ResearchMethodologies() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  const methods = [
    {
      icon: VideoCamera,
      title: 'Remote Video Interviews',
      count: 13,
    },
    {
      icon: ClipboardText,
      title: 'Online User Surveys',
      count: 29,
    },
    {
      icon: Cards,
      title: 'Card Sort Activity',
      count: 29,
    },
  ]

  // Colors from brand palette in order: Amethyst, Lilac, Rose
  const colors = [
    '#5835B0', // Amethyst
    '#BF92F0', // Lilac
    '#D78F8D', // Rose
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {methods.map((method, index) => {
          const Icon = method.icon
          const color = colors[index]
          return (
            <div
              key={method.title}
              className={`rounded-2xl p-5 md:p-6 text-center ${
                isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${0.1 + index * 0.1}s`,
              }}
            >
              {/* Icon in circular fill with glass border */}
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative">
                  {/* Icon circle */}
                  <div
                    className="relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${color}12` }}
                  >
                    <Icon size={20} className="md:hidden" weight="regular" style={{ color }} />
                    <Icon size={22} className="hidden md:block" weight="regular" style={{ color }} />
                  </div>
                  {/* Glass border frame */}
                  <div
                    className={`absolute -inset-1 rounded-full backdrop-blur-sm border ${
                      isDark
                        ? 'border-white/[0.08] bg-white/[0.02]'
                        : 'border-black/[0.06] bg-black/[0.01]'
                    }`}
                  />
                </div>
              </div>

              {/* Title - Satoshi, body copy size */}
              <h4
                className="font-satoshi text-base md:text-lg mb-2 theme-heading"
                style={{ fontWeight: 600 }}
              >
                {method.title}
              </h4>

              {/* Participant count with icon */}
              <span className={`inline-flex items-center gap-1.5 font-mono text-[12px] ${
                isDark ? 'text-white/50' : 'text-black/50'
              }`}>
                <Users size={14} weight="regular" />
                {method.count}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// 2. TOPIC CARDS TABLE (17 community topics)
// =============================================================================
export function TopicCardsTable() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  // Exact 17 topics from the card sort activity - displayed as flowing chips
  const topics = [
    'Find in-person meetup groups',
    'Get help with transportation',
    'Educational resources about your condition',
    'Ability to discuss your specific diagnosis',
    'Share your personal health experience',
    'Unmoderated community',
    'Safe space to share ideas and experiences',
    'Medical advice',
    'Friendships',
    'Companionship',
    'Religious support',
    'Find physical intimacy',
    'Find emotional intimacy',
    'Amusement/Entertainment',
    'Comic relief',
    'An accessible online community',
    'Low-sodium recipes',
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 ${
        isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className={`font-mono text-[11px] uppercase tracking-wider ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}>
            17 Community Topics
          </span>
          <span className={`font-mono text-[11px] uppercase tracking-wider ${
            isDark ? 'text-white/30' : 'text-black/30'
          }`}>
            Card Sort Activity
          </span>
        </div>

        {/* Flowing cards */}
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <span
              key={topic}
              className={`inline-flex items-center px-3 py-2 rounded-lg font-satoshi text-[14px] md:text-[15px] ${
                isDark
                  ? 'bg-white/[0.04] border border-white/[0.06]'
                  : 'bg-black/[0.03] border border-black/[0.06]'
              }`}
              style={{
                color: isDark ? '#D1D5DB' : '#3A3A3A',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                transition: `all 0.3s ease-out ${0.02 * index}s`,
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// 3. SURVEY FINDINGS CHART (Bar version)
// =============================================================================
export function SurveyFindingsChart() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  const findings = [
    {
      label: 'Engage in online communities',
      percentage: 86,
      icon: Globe,
    },
    {
      label: 'Access via mobile device',
      percentage: 79,
      icon: DeviceMobile,
    },
    {
      label: 'Would meet nearby members',
      percentage: 55,
      icon: Handshake,
    },
  ]

  // Colors from brand palette in order: Amethyst, Lilac, Rose
  const colors = [
    '#5835B0', // Amethyst
    '#BF92F0', // Lilac
    '#D78F8D', // Rose
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 ${
        isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
      }`}>
        <div className="space-y-6">
          {findings.map((item, index) => (
            <div
              key={item.label}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: `all 0.5s ease-out ${index * 100}ms`,
              }}
            >
              {/* Label and percentage row */}
              <div className="flex justify-between items-baseline mb-2">
                <span
                  className="font-mono text-[11px] tracking-wide uppercase font-medium"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                >
                  {item.label}
                </span>
                <span
                  className="font-mono text-sm font-medium"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                >
                  {item.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="h-1 rounded-full w-full"
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: colors[index],
                    transitionDelay: `${index * 100 + 200}ms`,
                    transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className={`mt-6 font-mono text-[11px] uppercase tracking-wider ${
          isDark ? 'text-white/30' : 'text-black/30'
        }`}>
          Based on survey of 29 participants
        </p>
      </div>
    </div>
  )
}

// =============================================================================
// 3b. SURVEY FINDINGS DOTS (Card version with dot visualization)
// =============================================================================
export function SurveyFindingsDots() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  const findings = [
    {
      label: 'Engage in online communities',
      percentage: 90,
      count: 26,
    },
    {
      label: 'Access via mobile device',
      percentage: 86,
      count: 25,
    },
    {
      label: 'Would meet nearby members',
      percentage: 59,
      count: 17,
    },
  ]

  // Theme-aware primary accent: Lilac (dark) / Amethyst (light)
  const dotColor = isDark ? '#BF92F0' : '#5835B0'
  const dotInactive = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'
  const totalDots = 29

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {findings.map((item, index) => (
          <div
            key={item.label}
            className={`rounded-2xl p-4 md:p-6 ${
              isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease-out ${0.1 + index * 0.1}s`,
            }}
          >
            {/* Dot grid at top - 9 columns, smaller dots */}
            <div className="grid grid-cols-9 gap-1 md:gap-2 mb-4 md:mb-8">
              {Array.from({ length: totalDots }).map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: dotIndex < item.count ? dotColor : dotInactive,
                    transitionDelay: isVisible ? `${0.2 + dotIndex * 0.015}s` : '0s',
                    opacity: isVisible ? 1 : 0,
                  }}
                />
              ))}
            </div>

            {/* Fraction display */}
            <div className="mb-1 md:mb-2">
              <span className="font-satoshi text-lg md:text-2xl font-bold theme-heading">
                {item.count}
              </span>
              <span className={`font-satoshi text-lg md:text-2xl font-bold ${
                isDark ? 'text-white/30' : 'text-gray-400'
              }`}>
                {' / 29'}
              </span>
            </div>

            {/* Label */}
            <p className={`font-satoshi text-[13px] md:text-[15px] leading-snug ${
              isDark ? 'text-white/60' : 'text-gray-600'
            }`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// 4. TOP COMMUNITY ATTRIBUTES
// =============================================================================
export function TopCommunityAttributes() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  const attributes = [
    {
      title: 'Respect & Kindness',
      description: 'A supportive, empathetic community environment',
      icon: Heart,
    },
    {
      title: 'Chronic Illness Research',
      description: 'Access to latest medical research and studies',
      icon: BookOpen,
    },
    {
      title: 'Local Resources',
      description: 'Info on local support groups and physicians',
      icon: MapPin,
    },
  ]

  // Colors from brand palette in order: Amethyst, Lilac, Rose
  const colors = [
    '#5835B0', // Amethyst
    '#BF92F0', // Lilac
    '#D78F8D', // Rose
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {attributes.map((attr, index) => {
          const Icon = attr.icon
          const color = colors[index]
          return (
            <div
              key={attr.title}
              className={`rounded-2xl p-5 md:p-6 flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 text-left md:text-center ${
                isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${0.1 + index * 0.1}s`,
              }}
            >
              {/* Icon in circular fill with glass border */}
              <div className="flex-shrink-0 md:mb-4">
                <div className="relative">
                  {/* Icon circle */}
                  <div
                    className="relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${color}12` }}
                  >
                    <Icon size={20} className="md:hidden" weight="regular" style={{ color }} />
                    <Icon size={22} className="hidden md:block" weight="regular" style={{ color }} />
                  </div>
                  {/* Glass border frame */}
                  <div
                    className={`absolute -inset-1 rounded-full backdrop-blur-sm border ${
                      isDark
                        ? 'border-white/[0.08] bg-white/[0.02]'
                        : 'border-black/[0.06] bg-black/[0.01]'
                    }`}
                  />
                </div>
              </div>

              {/* Text content */}
              <div>
                {/* Title - Satoshi, body copy size */}
                <h4
                  className="font-satoshi text-base md:text-lg mb-1 md:mb-2 theme-heading"
                  style={{ fontWeight: 600 }}
                >
                  {attr.title}
                </h4>

                {/* Description - Caption style */}
                <p className={`font-satoshi text-[13px] md:text-[15px] leading-snug ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  {attr.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// 4B. RESEARCH REQUIREMENTS
// =============================================================================
export function ResearchRequirements() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  const requirements = [
    {
      title: 'Secondary Research',
      description: 'Literature review and competitive analysis',
      icon: Article,
    },
    {
      title: 'Generative Research',
      description: 'Primary research with chronically ill patients',
      icon: ChatsCircle,
    },
    {
      title: 'Iterative Research',
      description: 'Testing and refining prototypes',
      icon: ArrowsClockwise,
    },
  ]

  // Colors from brand palette in order: Amethyst, Lilac, Rose
  const colors = [
    '#5835B0', // Amethyst
    '#BF92F0', // Lilac
    '#D78F8D', // Rose
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {requirements.map((req, index) => {
          const Icon = req.icon
          const color = colors[index]
          return (
            <div
              key={req.title}
              className={`rounded-2xl p-5 md:p-6 flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 text-left md:text-center ${
                isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${0.1 + index * 0.1}s`,
              }}
            >
              {/* Icon in circular fill with glass border */}
              <div className="flex-shrink-0 md:mb-4">
                <div className="relative">
                  {/* Icon circle */}
                  <div
                    className="relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${color}12` }}
                  >
                    <Icon size={20} className="md:hidden" weight="regular" style={{ color }} />
                    <Icon size={22} className="hidden md:block" weight="regular" style={{ color }} />
                  </div>
                  {/* Glass border frame */}
                  <div
                    className={`absolute -inset-1 rounded-full backdrop-blur-sm border ${
                      isDark
                        ? 'border-white/[0.08] bg-white/[0.02]'
                        : 'border-black/[0.06] bg-black/[0.01]'
                    }`}
                  />
                </div>
              </div>

              {/* Text content */}
              <div>
                {/* Title - Satoshi, body copy size */}
                <h4
                  className="font-satoshi text-base md:text-lg mb-1 md:mb-2 theme-heading"
                  style={{ fontWeight: 600 }}
                >
                  {req.title}
                </h4>

                {/* Description - Caption style */}
                <p className={`font-satoshi text-[13px] md:text-[15px] leading-snug ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  {req.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// 5. CARD SORT RESULTS
// =============================================================================
export function CardSortResults() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const results = {
    mostImportant: [
      'Discuss specific diagnosis',
      'Educational resources',
      'Safe space to share ideas',
      'Check any time',
      'Low sodium diet info',
    ],
    leastImportant: [
      'Intimacy discussions',
      'Religious support',
      'Unmoderated community',
    ],
  }

  // Theme-aware primary: Lilac (dark) / Amethyst (light)
  const highColor = isDark ? '#BF92F0' : '#5835B0'
  const lowColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 ${
        isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Most Important */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} weight="fill" color={highColor} />
              <span className={`font-mono text-xs uppercase tracking-wider ${
                isDark ? 'text-white/50' : 'text-black/50'
              }`}>
                Most Important
              </span>
            </div>
            <div className="space-y-2">
              {results.mostImportant.map((item, index) => (
                <div
                  key={item}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]'
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `all 0.4s ease-out ${0.1 * index}s`,
                    borderLeft: `3px solid ${highColor}`,
                  }}
                >
                  <span className={`font-satoshi text-sm ${
                    isDark ? 'text-white/80' : 'text-gray-700'
                  }`}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Least Important */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} weight="regular" style={{ color: lowColor }} />
              <span className={`font-mono text-xs uppercase tracking-wider ${
                isDark ? 'text-white/50' : 'text-black/50'
              }`}>
                Least Important
              </span>
            </div>
            <div className="space-y-2">
              {results.leastImportant.map((item, index) => (
                <div
                  key={item}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `all 0.4s ease-out ${0.1 * index}s`,
                    borderLeft: `3px solid ${lowColor}`,
                  }}
                >
                  <span className={`font-satoshi text-sm ${
                    isDark ? 'text-white/50' : 'text-gray-500'
                  }`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// 5b. CARD SORT MATRIX (Detailed percentage breakdown)
// =============================================================================
export function CardSortMatrix() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const columns = ['Very Important', 'Important', 'Somewhat Important', 'Least Important', 'Unsorted']

  const data = [
    { topic: 'Ability to discuss your diagnosis', values: [60, 27, 7, 7, 7] },
    { topic: 'Educational resources', values: [57, 40, 3, null, null] },
    { topic: 'Health advice', values: [53, 23, 10, 10, 10] },
    { topic: 'Safe space to share ideas & experiences', values: [53, 27, 10, 10, 10] },
    { topic: 'An accessible online community', values: [50, 23, 10, 10, 10] },
    { topic: 'Sharing personal health experiences', values: [43, 33, 20, 3, null] },
    { topic: 'Low-sodium recipes', values: [20, 40, 30, 10, null] },
    { topic: 'Friendships', values: [20, 37, 27, 13, 3] },
  ]

  // Highlight for VERY IMPORTANT column (index 0): Amethyst
  const highlightBg = isDark ? 'rgba(88, 53, 176, 0.35)' : 'rgba(88, 53, 176, 0.12)'
  const highlightText = isDark ? '#D1D5DB' : '#5835B0'

  // Highlight for IMPORTANT column (index 1): Lilac
  const importantBg = isDark ? 'rgba(191, 146, 240, 0.3)' : 'rgba(191, 146, 240, 0.15)'
  const importantText = isDark ? '#D1D5DB' : '#9B6DD0'

  // Find the max value in each row for highlighting
  const getMaxIndex = (values) => {
    let maxVal = -1
    let maxIdx = -1
    values.forEach((val, idx) => {
      if (val !== null && val > maxVal) {
        maxVal = val
        maxIdx = idx
      }
    })
    return maxIdx
  }

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 ${
        isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
      }`}>
        {/* Chart Title */}
        <ChartTitle>Top 8 Community Attributes</ChartTitle>

        {/* Desktop: Full table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left pb-4 pr-6" style={{ width: '35%' }}></th>
                {columns.map((col) => (
                  <th
                    key={col}
                    className={`text-center pb-4 px-2 font-mono text-[10px] uppercase tracking-wide font-medium ${
                      isDark ? 'text-white/50' : 'text-black/50'
                    }`}
                    style={{ width: '13%' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => {
                const maxIdx = getMaxIndex(row.values)
                return (
                  <tr
                    key={row.topic}
                    className={`border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transition: `opacity 0.3s ease-out ${0.05 * rowIndex}s`,
                    }}
                  >
                    <td
                      className="py-2 pr-6 font-satoshi text-[15px] text-left"
                      style={{ color: isDark ? '#D1D5DB' : '#3A3A3A' }}
                    >
                      {row.topic}
                    </td>
                    {row.values.map((val, colIndex) => {
                      // Determine highlight style based on which column the max falls in
                      const isHighlighted = colIndex === maxIdx
                      const isImportantColumn = maxIdx === 1 // "Important" column
                      const bgColor = isHighlighted
                        ? (isImportantColumn ? importantBg : highlightBg)
                        : 'transparent'
                      const textColorHighlight = isHighlighted
                        ? (isImportantColumn ? importantText : highlightText)
                        : undefined
                      return (
                        <td key={colIndex} className="py-2 px-2 text-center">
                          {val !== null ? (
                            <span
                              className={`inline-flex items-center justify-center min-w-[44px] py-1 px-2 rounded-md font-mono text-sm font-medium ${
                                isHighlighted
                                  ? ''
                                  : isDark ? 'text-white/40' : 'text-black/40'
                              }`}
                              style={{
                                backgroundColor: bgColor,
                                color: textColorHighlight,
                              }}
                            >
                              {val}%
                            </span>
                          ) : (
                            <span className={isDark ? 'text-white/15' : 'text-gray-300'}></span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile: Bar chart style */}
        <div className="md:hidden space-y-6">
          {data.map((row, rowIndex) => {
            const maxIdx = getMaxIndex(row.values)
            const maxVal = row.values[maxIdx]
            // Amethyst for Very Important, Lilac for Important
            const isImportantColumn = maxIdx === 1
            const barColor = isImportantColumn
              ? '#BF92F0' // Lilac
              : '#5835B0' // Amethyst
            return (
              <div
                key={row.topic}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.3s ease-out ${0.05 * rowIndex}s`,
                }}
              >
                {/* Label row */}
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className={`font-mono text-[11px] uppercase font-medium ${
                    isDark ? 'text-white/70' : 'text-black/70'
                  }`}>
                    {row.topic}
                  </span>
                  <span className={`font-mono text-sm font-medium flex-shrink-0 ${
                    isDark ? 'text-white/70' : 'text-black/70'
                  }`}>
                    {maxVal}%
                  </span>
                </div>
                {/* Bar */}
                <div className={`h-1 rounded-full ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`}>
                  <div
                    className="h-1 rounded-full transition-all duration-700"
                    style={{
                      width: isVisible ? `${maxVal}%` : '0%',
                      backgroundColor: barColor,
                      transitionDelay: `${0.1 + rowIndex * 0.05}s`,
                    }}
                  />
                </div>
              </div>
            )
          })}

          {/* Legend */}
          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded" style={{ backgroundColor: '#5835B0' }} />
              <span className={`font-mono text-[10px] tracking-wide uppercase ${
                isDark ? 'text-white/60' : 'text-black/60'
              }`}>
                Very Important
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded" style={{ backgroundColor: '#BF92F0' }} />
              <span className={`font-mono text-[10px] tracking-wide uppercase ${
                isDark ? 'text-white/60' : 'text-black/60'
              }`}>
                Important
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// 6. INTERACTION COMPARISON (Online vs In-Person)
// =============================================================================
export function InteractionComparison() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  // Colors from brand palette: Amethyst, Lilac
  const colors = [
    '#5835B0', // Amethyst
    '#BF92F0', // Lilac
  ]

  const comparisons = [
    {
      type: 'Online Interactions',
      subtitle: 'Flexible interactions and engagement',
      icon: DeviceMobile,
      traits: ['Anonymity or identity', 'Face-to-face to real-time discussion-based', 'Different content mediums'],
    },
    {
      type: 'In-Person Interactions',
      subtitle: 'Help strengthen idea of community',
      icon: Users,
      traits: ['Facilitation of in-person meetups', 'Connect patients with resources'],
    },
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((item, index) => {
          const Icon = item.icon
          const color = colors[index]
          return (
            <div
              key={item.type}
              className={`rounded-2xl p-5 md:p-6 ${
                isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${0.1 + index * 0.15}s`,
              }}
            >
              {/* Centered icon at top */}
              <div className="flex justify-center mb-3">
                <Icon size={40} weight="thin" style={{ color }} />
              </div>

              {/* Title and subtitle - centered, matching Archetypes */}
              <h4
                className="font-satoshi text-base md:text-lg text-center mb-1 theme-heading"
                style={{ fontWeight: 600 }}
              >
                {item.type}
              </h4>
              <p className={`font-satoshi text-[13px] md:text-[15px] text-center leading-snug mb-4 ${
                isDark ? 'text-white/60' : 'text-gray-600'
              }`}>
                {item.subtitle}
              </p>

              {/* Traits as rows */}
              <div className="space-y-2">
                {item.traits.map((trait, i) => (
                  <div
                    key={trait}
                    className={`py-2.5 px-3 rounded-lg text-center ${
                      isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]'
                    }`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transition: `opacity 0.3s ease-out ${0.3 + i * 0.1}s`,
                      borderLeft: `3px solid ${color}`,
                    }}
                  >
                    <span className={`font-satoshi text-sm ${
                      isDark ? 'text-white/80' : 'text-gray-700'
                    }`}>{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// 7. USER ARCHETYPES
// =============================================================================
export function UserArchetypes() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  // Colors from brand palette: Amethyst, Lilac, Rose
  const colors = [
    '#5835B0', // Amethyst
    '#BF92F0', // Lilac
    '#D78F8D', // Rose
  ]

  const archetypes = [
    {
      name: 'Lurkers',
      description: 'Mainly male, prefer anonymity. Observe and consume content without posting.',
      icon: Eye,
    },
    {
      name: 'Contributors',
      description: 'Mainly female, prefer to be identified. Actively share experiences and support others.',
      icon: ChatTeardropText,
    },
    {
      name: 'Mentors',
      description: 'Further along in journey. Wish to give back and guide newly diagnosed patients.',
      icon: HandHeart,
    },
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {archetypes.map((archetype, index) => {
          const Icon = archetype.icon
          const color = colors[index]
          return (
            <div
              key={archetype.name}
              className={`rounded-2xl p-5 md:p-6 flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 text-left md:text-center ${
                isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${0.1 + index * 0.1}s`,
              }}
            >
              {/* Icon in circular fill with glass border */}
              <div className="flex-shrink-0 md:mb-4">
                <div className="relative">
                  {/* Icon circle */}
                  <div
                    className="relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${color}12` }}
                  >
                    <Icon size={20} className="md:hidden" weight="regular" style={{ color }} />
                    <Icon size={22} className="hidden md:block" weight="regular" style={{ color }} />
                  </div>
                  {/* Glass border frame */}
                  <div
                    className={`absolute -inset-1 rounded-full backdrop-blur-sm border ${
                      isDark
                        ? 'border-white/[0.08] bg-white/[0.02]'
                        : 'border-black/[0.06] bg-black/[0.01]'
                    }`}
                  />
                </div>
              </div>

              {/* Text content */}
              <div>
                {/* Title - Satoshi, body copy size */}
                <h4
                  className="font-satoshi text-base md:text-lg mb-1 md:mb-2 theme-heading"
                  style={{ fontWeight: 600 }}
                >
                  {archetype.name}
                </h4>

                {/* Description */}
                <p className={`font-satoshi text-[13px] md:text-[15px] leading-snug ${
                  isDark ? 'text-white/60' : 'text-gray-600'
                }`}>
                  {archetype.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// 8. PERSONAS
// =============================================================================
export function PersonasChart() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  // Colors from brand palette: Turquoise, Lagoon (teal family)
  const colors = [
    '#36CBC6', // Turquoise - Beginner
    '#0B96A3', // Lagoon - Intermediate
  ]

  const personas = [
    {
      name: 'Shrini',
      type: 'The Beginner',
      age: '42',
      timeValue: '2 mo',
      timeLabel: 'Diagnosed',
      quote: '"I want to learn from others who have been through this."',
      needs: ['Education', 'Emotional support', 'Connection'],
      icon: Plant,
    },
    {
      name: 'Leslie',
      type: 'The Intermediate',
      age: '58',
      timeValue: '3 yrs',
      timeLabel: 'Diagnosed',
      quote: '"I want to give back and help those just starting their journey."',
      needs: ['Sharing', 'Meetups', 'Research'],
      icon: Flower,
    },
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((persona, index) => {
          const color = colors[index]
          return (
            <div
              key={persona.name}
              className={`relative rounded-2xl p-6 ${
                isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease-out ${0.1 + index * 0.15}s`,
              }}
            >
              {/* Header row with icon, name, and meta */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  {/* Icon square */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}12` }}
                  >
                    <persona.icon size={24} weight="regular" style={{ color }} />
                  </div>
                  {/* Glass border frame */}
                  <div
                    className={`absolute -inset-1 rounded-2xl backdrop-blur-sm border ${
                      isDark
                        ? 'border-white/[0.08] bg-white/[0.02]'
                        : 'border-black/[0.06] bg-black/[0.01]'
                    }`}
                  />
                </div>
                {/* Name column */}
                <div className="flex-1">
                  <H4 className="mb-0">
                    {persona.name}
                  </H4>
                  <p className={`font-mono text-[11px] uppercase tracking-wider ${
                    isDark ? 'text-white/50' : 'text-black/50'
                  }`}>
                    {persona.type}
                  </p>
                </div>
                {/* Divider between name and stats */}
                <div className="w-px h-10 self-center divider-color" />
                {/* Age column */}
                <div className="text-right">
                  <p className="font-satoshi text-lg font-semibold theme-heading">
                    {persona.age}
                  </p>
                  <p className={`font-mono text-[11px] uppercase tracking-wider ${
                    isDark ? 'text-white/50' : 'text-black/50'
                  }`}>
                    Age
                  </p>
                </div>
                {/* Divider between age and diagnosed */}
                <div className="w-px h-10 self-center divider-color" />
                {/* Time diagnosed column */}
                <div className="text-right">
                  <p className="font-satoshi text-lg font-semibold theme-heading">
                    {persona.timeValue}
                  </p>
                  <p className={`font-mono text-[11px] uppercase tracking-wider ${
                    isDark ? 'text-white/50' : 'text-black/50'
                  }`}>
                    {persona.timeLabel}
                  </p>
                </div>
              </div>

              {/* Divider below header */}
              <div className="my-5 h-px divider-color" />

              {/* Quote */}
              <Body className="mb-4">
                {persona.quote}
              </Body>

              {/* Needs - Tag style matching design system */}
              <div className="flex flex-wrap gap-2">
                {persona.needs.map((need) => (
                  <span
                    key={need}
                    className={`font-mono font-light text-[11px] tracking-wide uppercase px-2 py-1 rounded-md ${
                      isDark ? 'bg-white/[0.06] text-white/60' : 'bg-black/[0.04] text-black/60'
                    }`}
                  >
                    {need}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =============================================================================
// 9. CORE USER STORY - Visual diagram showing patient connections
// =============================================================================
export function CoreUserStory() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  // Theme-aware accent color: Lilac (dark) / Amethyst (light)
  const accentColor = isDark ? '#BF92F0' : '#5835B0'

  // Colors for the three pillars from brand palette
  const pillarColors = [
    '#5835B0', // Amethyst - Community
    '#BF92F0', // Lilac - Education
    '#D78F8D', // Rose - Resources
  ]

  const pillars = [
    {
      title: 'Community',
      icon: Users,
      items: ['Student-to-teacher', 'Sharing & reading stories', 'Creating meetup groups'],
    },
    {
      title: 'Education',
      icon: ForkKnife,
      items: ['Diet & recipes', 'Symptom management'],
    },
    {
      title: 'Local Resources',
      icon: Stethoscope,
      items: ['Food', 'Transportation', 'Finding local physicians', 'Finding local meetups'],
    },
  ]

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`rounded-2xl p-8 md:p-10 ${
        isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
      }`}>
        {/* User Story section */}
        <div className="text-center mb-6">
          {/* Label */}
          <p className={`font-mono text-[11px] uppercase tracking-widest mb-3 ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}>
            User Story
          </p>

          {/* Quote */}
          <Body className="max-w-xl mx-auto">
            I want to connect with other CHF patients and learn how to better manage my condition.
          </Body>
        </div>

        {/* Method section */}
        <div className="text-center mb-8">
          {/* Label */}
          <p className={`font-mono text-[11px] uppercase tracking-widest mb-3 ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}>
            Method
          </p>

          <Body className="max-w-xl mx-auto">
            Mobile app — accessible to all participants
          </Body>
        </div>

        {/* Pillars label */}
        <p className={`text-center font-mono text-[11px] uppercase tracking-widest mb-6 ${
          isDark ? 'text-white/40' : 'text-black/40'
        }`}>
          Connecting patients to
        </p>

        {/* Three Pillars */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            const color = pillarColors[index]
            return (
              <div
                key={pillar.title}
                className="text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`,
                }}
              >
                {/* Icon with glass border */}
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <div
                      className="relative z-10 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${color}12` }}
                    >
                      <Icon size={18} className="md:hidden" weight="regular" style={{ color }} />
                      <Icon size={20} className="hidden md:block" weight="regular" style={{ color }} />
                    </div>
                    <div
                      className={`absolute -inset-1 rounded-full backdrop-blur-sm border ${
                        isDark
                          ? 'border-white/[0.08] bg-white/[0.02]'
                          : 'border-black/[0.06] bg-black/[0.01]'
                      }`}
                    />
                  </div>
                </div>

                {/* Title */}
                <h5
                  className="font-satoshi text-base md:text-lg mb-2 theme-heading"
                  style={{ fontWeight: 600 }}
                >
                  {pillar.title}
                </h5>

                {/* Items as compact tags */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {pillar.items.map((item) => (
                    <span
                      key={item}
                      className={`font-mono font-light text-[10px] md:text-[11px] tracking-wide px-2 py-1 rounded-md ${
                        isDark
                          ? 'bg-white/[0.04] text-white/50'
                          : 'bg-black/[0.03] text-black/50'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// 10. COMMUNITY USER FLOW (Actual Flowchart - Tesla style with expandable modal)
// =============================================================================
export function CommunityUserFlow() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })
  const [isExpanded, setIsExpanded] = useState(false)

  // Lock body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isExpanded])

  // Tesla flowchart color scheme
  const lineColor = isDark ? '#4a4a4a' : '#d0d0d0'
  const textColor = isDark ? '#ffffff' : '#1f2937'
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'

  // Node type colors
  const startBg = isDark ? 'rgba(167, 139, 250, 0.18)' : 'rgba(167, 139, 250, 0.15)'
  const startBorder = isDark ? 'rgba(167, 139, 250, 0.35)' : 'rgba(167, 139, 250, 0.3)'
  const actionBg = isDark ? 'rgba(54, 203, 198, 0.18)' : 'rgba(54, 203, 198, 0.12)'
  const actionBorder = isDark ? 'rgba(54, 203, 198, 0.35)' : 'rgba(54, 203, 198, 0.3)'
  const decisionBg = isDark ? 'rgba(215, 143, 141, 0.18)' : 'rgba(215, 143, 141, 0.12)'
  const decisionBorder = isDark ? 'rgba(215, 143, 141, 0.35)' : 'rgba(215, 143, 141, 0.3)'
  const endBg = isDark ? 'rgba(135, 170, 97, 0.18)' : 'rgba(135, 170, 97, 0.12)'
  const endBorder = isDark ? 'rgba(135, 170, 97, 0.35)' : 'rgba(135, 170, 97, 0.3)'

  const markerId = `community-arrow-${isDark ? 'dark' : 'light'}`
  const r = 8

  // Reusable SVG content
  const FlowchartSVG = ({ className = "w-full h-auto" }) => (
    <svg viewBox="0 0 900 400" className={className}>
      <defs>
        <marker id={markerId} markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 8 3, 0 6" fill={lineColor} />
        </marker>
      </defs>

      <rect x="20" y="55" width="130" height="70" rx="35" fill={startBg} stroke={startBorder} strokeWidth="1" />
      <text x="85" y="82" textAnchor="middle" fill={textColor} style={{ fontSize: '12px', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
        <tspan x="85" dy="0">User wants to</tspan>
        <tspan x="85" dy="14">connect with others</tspan>
        <tspan x="85" dy="14">on a specific topic</tspan>
      </text>

      <path d={`M 150 90 L 168 90`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      <rect x="180" y="55" width="140" height="70" rx="6" fill={actionBg} stroke={actionBorder} strokeWidth="1" />
      <text x="250" y="82" textAnchor="middle" fill={textColor} style={{ fontSize: '12px', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
        <tspan x="250" dy="0">Clicks on</tspan>
        <tspan x="250" dy="14">"community" and</tspan>
        <tspan x="250" dy="14">chooses a category</tspan>
      </text>

      <path d={`M 320 90 L 350 90`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      <path d="M 420 35 L 480 90 L 420 145 L 360 90 Z" fill={decisionBg} stroke={decisionBorder} strokeWidth="1" strokeLinejoin="round" />
      <text x="420" y="85" textAnchor="middle" fill={textColor} style={{ fontSize: '12px', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
        <tspan x="420" dy="0">Do I want to</tspan>
        <tspan x="420" dy="14">contribute?</tspan>
      </text>

      <path d={`M 480 90 L 518 90`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />
      <text x="500" y="78" textAnchor="middle" fill={textMuted} style={{ fontSize: '11px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>NO</text>

      <rect x="530" y="55" width="130" height="70" rx="6" fill={actionBg} stroke={actionBorder} strokeWidth="1" />
      <text x="595" y="85" textAnchor="middle" fill={textColor} style={{ fontSize: '12px', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
        <tspan x="595" dy="0">Browses and</tspan>
        <tspan x="595" dy="14">clicks on post</tspan>
      </text>

      <path d={`M 660 90 L 690 90`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      <path d="M 760 35 L 820 90 L 760 145 L 700 90 Z" fill={decisionBg} stroke={decisionBorder} strokeWidth="1" strokeLinejoin="round" />
      <text x="760" y="85" textAnchor="middle" fill={textColor} style={{ fontSize: '12px', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
        <tspan x="760" dy="0">Do I want to</tspan>
        <tspan x="760" dy="14">contribute?</tspan>
      </text>

      <path d={`M 760 35 L 760 ${20 + r} Q 760 20, ${760 - r} 20 L ${595 + r} 20 Q 595 20, 595 ${20 + r} L 595 45`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />
      <text x="770" y="18" textAnchor="start" fill={textMuted} style={{ fontSize: '11px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>NO</text>

      <path d={`M 420 145 L 420 ${195 - r} Q 420 195, ${420 + r} 195 L 438 195`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />
      <text x="430" y="160" textAnchor="start" fill={textMuted} style={{ fontSize: '11px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>YES</text>

      <rect x="450" y="170" width="140" height="50" rx="6" fill={actionBg} stroke={actionBorder} strokeWidth="1" />
      <text x="520" y="192" textAnchor="middle" fill={textColor} style={{ fontSize: '12px', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
        <tspan x="520" dy="0">Makes a post with</tspan>
        <tspan x="520" dy="14">video or text/photo</tspan>
      </text>

      <path d={`M 760 145 L 760 ${195 - r} Q 760 195, ${760 - r} 195 L 660 195 L 660 240`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />
      <text x="770" y="160" textAnchor="start" fill={textMuted} style={{ fontSize: '11px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>YES</text>

      <rect x="590" y="250" width="140" height="50" rx="6" fill={actionBg} stroke={actionBorder} strokeWidth="1" />
      <text x="660" y="280" textAnchor="middle" fill={textColor} style={{ fontSize: '12px', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>Posts comment</text>

      <path d={`M 520 220 L 520 ${250 - r} Q 520 250, ${520 + r} 250 L 578 250`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      <path d={`M 660 300 L 660 330`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      <rect x="560" y="340" width="200" height="50" rx="10" fill={endBg} stroke={endBorder} strokeWidth="1" />
      <text x="660" y="362" textAnchor="middle" fill={textColor} style={{ fontSize: '12px', fontFamily: 'Satoshi, sans-serif', fontWeight: 500 }}>
        <tspan x="660" dy="0">Feels more connected to the</tspan>
        <tspan x="660" dy="14">community by sharing experiences</tspan>
      </text>
    </svg>
  )

  return (
    <>
      <div
        ref={ref}
        className={`my-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className={`relative rounded-2xl p-6 md:p-8 ${
          isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
        }`}>
          <ChartTitle>Community</ChartTitle>
          <FlowchartSVG />
          {/* Expand button - mobile only */}
          <button
            className={`absolute bottom-4 right-4 p-2 rounded-lg transition-colors md:hidden ${
              isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
            }`}
            onClick={() => setIsExpanded(true)}
          >
            <ArrowsOut size={20} />
          </button>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isExpanded && createPortal(
        <div className={`fixed inset-0 z-[9998] ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
          <TransformWrapper initialScale={1} minScale={0.4} maxScale={3} centerOnInit={false} initialPositionX={16} initialPositionY={80}>
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: 'fit-content', height: 'fit-content' }}>
              <FlowchartSVG className="w-[900px] h-[400px]" />
            </TransformComponent>
          </TransformWrapper>
          <div className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
            <h2 className={`font-satoshi text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Community User Flow</h2>
            <button
              className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
              onClick={() => setIsExpanded(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

// =============================================================================
// 11. USABILITY SCENARIO (Scenario + Tasks card)
// =============================================================================
export function UsabilityScenario() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  const textColor = isDark ? '#ffffff' : '#1f2937'
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'

  // Turquoise and Lagoon colors
  const turquoise = '#36CBC6'
  const lagoon = '#0B96A3'
  const turquoiseBg = isDark ? 'rgba(54, 203, 198, 0.15)' : 'rgba(54, 203, 198, 0.1)'
  const lagoonBg = isDark ? 'rgba(11, 150, 163, 0.15)' : 'rgba(11, 150, 163, 0.1)'

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="space-y-6">
        {/* Scenario 1 */}
        <div className={`rounded-2xl p-6 md:p-8 ${
          isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Scenario */}
            <div className="flex gap-5">
              {/* Phone icon with download arrow */}
              <div className="flex-shrink-0">
                <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="44" height="60" rx="6" stroke={turquoise} strokeWidth="1.5" fill="none" />
                  <rect x="16" y="6" width="16" height="3" rx="1.5" fill={turquoise} opacity="0.5" />
                  <rect x="8" y="14" width="32" height="36" rx="2" fill={turquoiseBg} />
                  <path d="M24 22 L24 40 M24 40 L18 34 M24 40 L30 34" stroke={turquoise} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider mb-3" style={{ color: textMuted }}>
                  Scenario 1
                </h4>
                <p className="font-satoshi text-[15px] leading-relaxed" style={{ color: textColor }}>
                  You have recently downloaded an app geared towards people with a chronic heart condition similar to yourself, per a friend's recommendation.
                </p>
              </div>
            </div>

            {/* Tasks */}
            <div className="flex gap-5">
              {/* Phone icon with tap indicator */}
              <div className="flex-shrink-0">
                <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="44" height="60" rx="6" stroke={turquoise} strokeWidth="1.5" fill="none" />
                  <rect x="16" y="6" width="16" height="3" rx="1.5" fill={turquoise} opacity="0.5" />
                  <rect x="8" y="14" width="32" height="36" rx="2" fill={turquoiseBg} />
                  <circle cx="24" cy="32" r="8" stroke={turquoise} strokeWidth="1.5" fill="none" />
                  <circle cx="24" cy="32" r="3" fill={turquoise} />
                </svg>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider mb-3" style={{ color: textMuted }}>
                  Tasks
                </h4>
                <ol className="font-satoshi text-[15px] leading-relaxed space-y-2" style={{ color: textColor }}>
                  <li className="flex gap-2">
                    <span style={{ color: textMuted }}>1.</span>
                    <span>What would you click on first?</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: textMuted }}>2.</span>
                    <span>Think aloud—what's clear and what isn't?</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario 2 */}
        <div className={`rounded-2xl p-6 md:p-8 ${
          isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Scenario */}
            <div className="flex gap-5">
              {/* Phone icon with content lines */}
              <div className="flex-shrink-0">
                <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="44" height="60" rx="6" stroke={lagoon} strokeWidth="1.5" fill="none" />
                  <rect x="16" y="6" width="16" height="3" rx="1.5" fill={lagoon} opacity="0.5" />
                  <rect x="8" y="14" width="32" height="36" rx="2" fill={lagoonBg} />
                  {/* Content lines */}
                  <rect x="12" y="20" width="24" height="2" rx="1" fill={lagoon} opacity="0.6" />
                  <rect x="12" y="26" width="18" height="2" rx="1" fill={lagoon} opacity="0.4" />
                  <rect x="12" y="32" width="24" height="2" rx="1" fill={lagoon} opacity="0.6" />
                  <rect x="12" y="38" width="14" height="2" rx="1" fill={lagoon} opacity="0.4" />
                </svg>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider mb-3" style={{ color: textMuted }}>
                  Scenario 2
                </h4>
                <p className="font-satoshi text-[15px] leading-relaxed" style={{ color: textColor }}>
                  You would like to find new articles on how to manage your health. You would also like to see posts from other members of the community.
                </p>
              </div>
            </div>

            {/* Tasks */}
            <div className="flex gap-5">
              {/* Phone icon with tap indicator */}
              <div className="flex-shrink-0">
                <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="44" height="60" rx="6" stroke={lagoon} strokeWidth="1.5" fill="none" />
                  <rect x="16" y="6" width="16" height="3" rx="1.5" fill={lagoon} opacity="0.5" />
                  <rect x="8" y="14" width="32" height="36" rx="2" fill={lagoonBg} />
                  <circle cx="24" cy="32" r="8" stroke={lagoon} strokeWidth="1.5" fill="none" />
                  <circle cx="24" cy="32" r="3" fill={lagoon} />
                </svg>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider mb-3" style={{ color: textMuted }}>
                  Tasks
                </h4>
                <ol className="font-satoshi text-[15px] leading-relaxed space-y-2" style={{ color: textColor }}>
                  <li className="flex gap-2">
                    <span style={{ color: textMuted }}>1.</span>
                    <span>Where would you find this information?</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: textMuted }}>2.</span>
                    <span>What actions can be done on this page?</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: textMuted }}>3.</span>
                    <span>What would be most useful for you?</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: textMuted }}>4.</span>
                    <span>Any recommendations?</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// 12. EXPLORE USER FLOW (Flowchart - Tesla style)
// =============================================================================
export function ExploreUserFlow() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })
  const [isExpanded, setIsExpanded] = useState(false)

  // Lock body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isExpanded])

  // Tesla flowchart color scheme
  const lineColor = isDark ? '#4a4a4a' : '#d0d0d0'
  const textColor = isDark ? '#ffffff' : '#1f2937'
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'

  // Node type colors - using brand palette
  const startBg = isDark ? 'rgba(88, 53, 176, 0.3)' : 'rgba(88, 53, 176, 0.15)' // Amethyst
  const startBorder = isDark ? 'rgba(88, 53, 176, 0.5)' : 'rgba(88, 53, 176, 0.35)'
  const actionBg = isDark ? 'rgba(54, 203, 198, 0.25)' : 'rgba(54, 203, 198, 0.15)' // Turquoise
  const actionBorder = isDark ? 'rgba(54, 203, 198, 0.5)' : 'rgba(54, 203, 198, 0.35)'
  const decisionBg = isDark ? 'rgba(215, 143, 141, 0.3)' : 'rgba(215, 143, 141, 0.15)' // Rose
  const decisionBorder = isDark ? 'rgba(215, 143, 141, 0.5)' : 'rgba(215, 143, 141, 0.35)'
  const endBg = isDark ? 'rgba(135, 170, 97, 0.3)' : 'rgba(135, 170, 97, 0.15)' // Peridot
  const endBorder = isDark ? 'rgba(135, 170, 97, 0.5)' : 'rgba(135, 170, 97, 0.35)'

  const markerId = `explore-arrow-${isDark ? 'dark' : 'light'}`
  const r = 8 // Corner radius

  // Reusable SVG content
  const FlowchartSVG = ({ className = "w-full h-auto" }) => (
    <svg viewBox="0 0 1000 480" className={className}>
      <defs>
        <marker id={markerId} markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 8 3, 0 6" fill={lineColor} />
        </marker>
      </defs>

      {/* Start node 1 - top */}
      <rect x="20" y="30" width="160" height="70" rx="35" fill={startBg} stroke={startBorder} strokeWidth="1" />
      <text x="100" y="50" textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="100" dy="0">User wants to see</tspan>
        <tspan x="100" dy="12">what's new with the</tspan>
        <tspan x="100" dy="12">community, but doesn't</tspan>
        <tspan x="100" dy="12">have a topic</tspan>
      </text>

      {/* Start node 2 - bottom */}
      <rect x="20" y="130" width="160" height="70" rx="35" fill={startBg} stroke={startBorder} strokeWidth="1" />
      <text x="100" y="155" textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="100" dy="0">User wants to explore</tspan>
        <tspan x="100" dy="12">and learn more about</tspan>
        <tspan x="100" dy="12">their condition</tspan>
      </text>

      {/* Lines from both starts to Action 1 */}
      <path d={`M 180 65 L ${200 - r} 65 Q 200 65, 200 ${65 + r} L 200 ${115 - r} Q 200 115, ${200 + r} 115 L 238 115`} stroke={lineColor} strokeWidth="1.5" fill="none" />
      <path d={`M 180 165 L ${200 - r} 165 Q 200 165, 200 ${165 - r} L 200 ${115 + r} Q 200 115, ${200 + r} 115 L 238 115`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      {/* Action 1 - Click explore */}
      <rect x="250" y="80" width="160" height="70" rx="6" fill={actionBg} stroke={actionBorder} strokeWidth="1" />
      <text x="330" y="107" textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="330" dy="0">Click on "explore" to</tspan>
        <tspan x="330" dy="14">see recommended</tspan>
        <tspan x="330" dy="14">articles & posts</tspan>
      </text>

      {/* Line: Action 1 → Decision 1 */}
      <path d={`M 410 115 L 450 115`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      {/* Decision 1 - Read now? */}
      <path d="M 530 50 L 600 115 L 530 180 L 460 115 Z" fill={decisionBg} stroke={decisionBorder} strokeWidth="1" strokeLinejoin="round" />
      <text x="530" y="100" textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="530" dy="0">Do I want to</tspan>
        <tspan x="530" dy="12">read this article</tspan>
        <tspan x="530" dy="12">or post right</tspan>
        <tspan x="530" dy="12">now?</tspan>
      </text>

      {/* Line: Decision 1 → Action 2 (Yes - right) */}
      <path d={`M 600 115 L ${620 - r} 115 Q 620 115, 620 ${115 - r} L 620 ${80 + r} Q 620 80, ${620 + r} 80 L 698 80`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />
      <text x="640" y="95" textAnchor="start" fill={textMuted} style={{ fontSize: '10px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Yes</text>

      {/* Action 2 - Click into article */}
      <rect x="710" y="55" width="140" height="50" rx="6" fill={actionBg} stroke={actionBorder} strokeWidth="1" />
      <text x="780" y="77" textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="780" dy="0">Click into the</tspan>
        <tspan x="780" dy="14">article or post</tspan>
      </text>

      {/* Line: Action 2 → End node */}
      <path d={`M 850 80 L ${870 - r} 80 Q 870 80, 870 ${80 + r} L 870 ${185 - r} Q 870 185, ${870 + r} 185 L 880 185`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      {/* Line: Decision 1 → Decision 2 (No - down) */}
      <path d={`M 530 180 L 530 238`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />
      <text x="540" y="210" textAnchor="start" fill={textMuted} style={{ fontSize: '10px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>No</text>

      {/* Decision 2 - Read later? */}
      <path d="M 530 250 L 600 315 L 530 380 L 460 315 Z" fill={decisionBg} stroke={decisionBorder} strokeWidth="1" strokeLinejoin="round" />
      <text x="530" y="305" textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="530" dy="0">Do I want to</tspan>
        <tspan x="530" dy="12">read this article</tspan>
        <tspan x="530" dy="12">or post later?</tspan>
      </text>

      {/* Line: Decision 2 → Action 3 (No - right) */}
      <path d={`M 600 315 L 698 315`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />
      <text x="640" y="305" textAnchor="start" fill={textMuted} style={{ fontSize: '10px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>No</text>

      {/* Action 3 - Swipe to see more */}
      <rect x="710" y="280" width="150" height="70" rx="6" fill={actionBg} stroke={actionBorder} strokeWidth="1" />
      <text x="785" y="307" textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="785" dy="0">Swipe to right to</tspan>
        <tspan x="785" dy="14">see other</tspan>
        <tspan x="785" dy="14">recommended articles</tspan>
      </text>

      {/* Line: Action 3 → End node (curved) */}
      <path d={`M 860 315 L ${895 - r} 315 Q 895 315, 895 ${315 - r} L 895 225`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />

      {/* Line: Decision 2 → Action 4 (Yes - down) */}
      <path d={`M 530 380 L 530 408`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd={`url(#${markerId})`} />
      <text x="540" y="400" textAnchor="start" fill={textMuted} style={{ fontSize: '10px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Yes</text>

      {/* Action 4 - Bookmark */}
      <rect x="455" y="420" width="150" height="50" rx="6" fill={actionBg} stroke={actionBorder} strokeWidth="1" />
      <text x="530" y="442" textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="530" dy="0">Bookmark to come</tspan>
        <tspan x="530" dy="14">back to it later</tspan>
      </text>

      {/* End node */}
      <rect x="890" y="155" width="100" height="60" rx="10" fill={endBg} stroke={endBorder} strokeWidth="1" />
      <text x="940" y="180" textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
        <tspan x="940" dy="0">Full view of</tspan>
        <tspan x="940" dy="12">relevant</tspan>
        <tspan x="940" dy="12">article/post</tspan>
      </text>
    </svg>
  )

  return (
    <>
      <div
        ref={ref}
        className={`my-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className={`relative rounded-2xl p-6 md:p-8 ${
          isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
        }`}>
          <ChartTitle>Explore</ChartTitle>
          <FlowchartSVG />
          {/* Expand button - mobile only */}
          <button
            className={`absolute bottom-4 right-4 p-2 rounded-lg transition-colors md:hidden ${
              isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
            }`}
            onClick={() => setIsExpanded(true)}
          >
            <ArrowsOut size={20} />
          </button>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isExpanded && createPortal(
        <div className={`fixed inset-0 z-[9998] ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
          <TransformWrapper initialScale={1} minScale={0.4} maxScale={3} centerOnInit={false} initialPositionX={16} initialPositionY={80}>
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: 'fit-content', height: 'fit-content' }}>
              <FlowchartSVG className="w-[1000px] h-[480px]" />
            </TransformComponent>
          </TransformWrapper>
          <div className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
            <h2 className={`font-satoshi text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Explore User Flow</h2>
            <button
              className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
              onClick={() => setIsExpanded(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

// =============================================================================
// MIRO BOARD - Yassified Site Map
// =============================================================================

// Post-it component (defined outside to prevent recreation on each render)
function MiroPostIt({ children, color, rotation = 0, delay = 0, isVisible }) {
  return (
    <div
      className="relative w-[75px] h-[75px] md:w-[90px] md:h-[90px] flex items-center justify-center p-2"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        boxShadow: '2px 3px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.4s ease-out ${delay}s`,
      }}
    >
      <span
        className="font-mono text-[11px] tracking-wide"
        style={{ color: 'rgba(0,0,0,0.65)', textAlign: 'center', lineHeight: 1.3 }}
      >
        {children}
      </span>
      {/* Fold effect */}
      <div
        className="absolute bottom-0 right-0 w-3 h-3"
        style={{ background: 'linear-gradient(315deg, rgba(0,0,0,0.05) 50%, transparent 50%)' }}
      />
    </div>
  )
}

export function MiroBoard({ variant = 1 }) {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })
  const [isExpanded, setIsExpanded] = useState(false)

  // Lock body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isExpanded])

  // Colors from brand palette
  const colors = {
    amethyst: '#5835B0',     // Amethyst
    lilac: '#BF92F0',        // Lilac
    rose: '#D78F8D',         // Rose
    gold: '#DBA166',         // Gold
    turquoise: '#36CBC6',    // Turquoise
    lagoon: '#0B96A3',       // Lagoon
    peridot: '#87AA61',      // Peridot
    forest: '#2F7255',       // Forest
  }

  // Grid styling
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'

  // Reusable board content
  const BoardContent = ({ scale = false }) => (
    <div
      className={`p-6 md:p-10 ${scale ? 'origin-top-left' : ''}`}
      style={scale ? {
        transform: 'scale(0.55)',
        transformOrigin: 'top left',
        width: '182%',
      } : {}}
    >
      {variant === 1 ? (
        <>
          {/* Header: Universal Features + Onboarding */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col items-center">
              <span className="font-mono text-[11px] tracking-wide uppercase theme-caption mb-3">Universal features</span>
              <div className="flex gap-2">
                <MiroPostIt isVisible={isVisible} color={colors.gold} rotation={-1.5} delay={0.1}>Search</MiroPostIt>
                <MiroPostIt isVisible={isVisible} color={colors.gold} rotation={2} delay={0.15}>Chat</MiroPostIt>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-[11px] tracking-wide uppercase theme-caption mb-3">Onboarding</span>
              <div className="flex gap-2">
                <MiroPostIt isVisible={isVisible} color={colors.rose} rotation={-1} delay={0.1}>Welcome screen with topics</MiroPostIt>
                <MiroPostIt isVisible={isVisible} color={colors.rose} rotation={1.5} delay={0.15}>Suggestions to similar users</MiroPostIt>
              </div>
            </div>
          </div>

          {/* Pages Grid - Column based layout */}
          <div className="flex flex-col items-center">
            {/* Pages Section Label */}
            <span className="font-mono text-[11px] tracking-wide uppercase theme-caption mb-4">Pages</span>

            <div className="flex justify-center gap-2 md:gap-3">
            {/* Messages column */}
            <div className="flex flex-col items-center gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={0.5} delay={0.2}>Messages (inbox)</MiroPostIt>
            </div>

            {/* Community column */}
            <div className="flex flex-col items-center gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={-1} delay={0.22}>Community</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={0.5} delay={0.3}>Meet-up / Interest groups</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-0.5} delay={0.38}>Forum</MiroPostIt>
            </div>

            {/* Resources column */}
            <div className="flex flex-col items-center gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={1} delay={0.24}>Resources</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-1} delay={0.32}>Articles</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={1.5} delay={0.4}>Recipes</MiroPostIt>
            </div>

            {/* Home column */}
            <div className="flex flex-col items-center gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={-0.5} delay={0.26}>Home</MiroPostIt>
            </div>

            {/* Account column - Settings aligned under Account, User info to right */}
            <div className="flex flex-col items-start gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={1.5} delay={0.28}>Account</MiroPostIt>
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-0.5} delay={0.34}>Settings</MiroPostIt>
                  <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={0.5} delay={0.42}>Profile</MiroPostIt>
                </div>
                <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={1} delay={0.36}>User info</MiroPostIt>
              </div>
            </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Board 2: Patient-to-education focus with Mabu integration */}
          <span className="block font-mono text-[11px] tracking-wide uppercase theme-caption text-center mb-4">Main Pages</span>

          <div className="flex justify-center gap-2 md:gap-3">
            {/* News feed column - 2x3 grid for sub-items */}
            <div className="flex flex-col items-center gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={-1} delay={0.1}>News feed</MiroPostIt>
              <div className="grid grid-cols-2 gap-2">
                <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={0.5} delay={0.18}>Convos from Mabu</MiroPostIt>
                <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-0.5} delay={0.22}>Posts from other patients</MiroPostIt>
                <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={1} delay={0.26}>System generated content</MiroPostIt>
                <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-1} delay={0.3}>Recipes</MiroPostIt>
                <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={0.5} delay={0.34}>Discussion prompts</MiroPostIt>
                <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-0.5} delay={0.38}>Treatment education</MiroPostIt>
              </div>
            </div>

            {/* Inbox column */}
            <div className="flex flex-col items-center gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={1.5} delay={0.12}>Inbox</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-1} delay={0.2}>Messages from other patients</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={0.5} delay={0.28}>Initiate face to face video chat</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-0.5} delay={0.36}>Schedule a video chat</MiroPostIt>
            </div>

            {/* Profile column */}
            <div className="flex flex-col items-center gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={-0.5} delay={0.14}>Profile</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={1} delay={0.22}>Brief info about patient</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-1} delay={0.3}>Posts by/from patients</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={0.5} delay={0.38}>Initiate DM or video chat</MiroPostIt>
            </div>

            {/* Mabu Hub column */}
            <div className="flex flex-col items-center gap-2">
              <MiroPostIt isVisible={isVisible} color={colors.turquoise} rotation={1} delay={0.16}>Mabu Hub</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={-0.5} delay={0.24}>Initiate convos with Mabu</MiroPostIt>
              <MiroPostIt isVisible={isVisible} color={colors.lagoon} rotation={1} delay={0.32}>Education from Mabu</MiroPostIt>
            </div>
          </div>
        </>
      )}
    </div>
  )

  return (
    <>
      <div
        ref={ref}
        className={`my-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div
          className={`relative rounded-2xl overflow-hidden ${
            isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
          }`}
          style={{
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        >
          {/* Mobile: scaled version - height set to match scaled content */}
          <div className="md:hidden overflow-hidden" style={{ height: variant === 1 ? '280px' : '250px' }}>
            <BoardContent scale={true} />
          </div>
          {/* Desktop: full size */}
          <div className="hidden md:block">
            <BoardContent scale={false} />
          </div>
          {/* Expand button - mobile only */}
          <button
            className={`absolute bottom-4 right-4 p-2 rounded-lg transition-colors md:hidden ${
              isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
            }`}
            onClick={() => setIsExpanded(true)}
          >
            <ArrowsOut size={20} />
          </button>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isExpanded && createPortal(
        <div className={`fixed inset-0 z-[9998] ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
          <TransformWrapper initialScale={1} minScale={0.4} maxScale={3} centerOnInit={false} initialPositionX={16} initialPositionY={80}>
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: 'fit-content', height: 'fit-content' }}>
              <div
                className="p-6"
                style={{
                  backgroundImage: `
                    linear-gradient(${gridColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              >
                <BoardContent scale={false} />
              </div>
            </TransformComponent>
          </TransformWrapper>
          <div className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
            <h2 className={`font-satoshi text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Site Map</h2>
            <button
              className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
              onClick={() => setIsExpanded(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

// =============================================================================
// FLOURISH BRANDING - Color, Font, Logo showcase
// =============================================================================
export function FlourishBranding() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  const flourishTeal = '#47bcca'
  const textColor = isDark ? '#ffffff' : '#1f2937'
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
  const cardBg = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Color */}
        <div
          className={`rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center ${cardBg}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
          }}
        >
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl mb-3"
            style={{ backgroundColor: flourishTeal }}
          />
          <p className="font-mono text-[13px] md:text-[14px]" style={{ color: textMuted }}>
            #47bcca
          </p>
        </div>

        {/* Font */}
        <div
          className={`rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center ${cardBg}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
          }}
        >
          <span className="text-6xl md:text-7xl font-bold mb-1" style={{ color: textColor, fontFamily: 'Avenir, system-ui, sans-serif' }}>
            Aa
          </span>
          <p className="font-satoshi text-[16px] md:text-[18px]" style={{ color: textMuted }}>
            Avenir
          </p>
        </div>

        {/* Logo */}
        <div
          className={`rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center ${cardBg}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s',
          }}
        >
          <div className="flex items-center justify-center mb-2">
            {/* Overlapping circles - flower/Venn diagram */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[72px] h-[72px] md:w-20 md:h-20">
              {/* Top circle */}
              <circle cx="40" cy="22" r="16" stroke={flourishTeal} strokeWidth="2" fill="none" />
              {/* Bottom circle */}
              <circle cx="40" cy="58" r="16" stroke={flourishTeal} strokeWidth="2" fill="none" />
              {/* Left circle */}
              <circle cx="22" cy="40" r="16" stroke={flourishTeal} strokeWidth="2" fill="none" />
              {/* Right circle */}
              <circle cx="58" cy="40" r="16" stroke={flourishTeal} strokeWidth="2" fill="none" />
              {/* Center circle */}
              <circle cx="40" cy="40" r="16" stroke={flourishTeal} strokeWidth="2" fill="none" />
            </svg>
          </div>
          <p className="font-satoshi text-[12px] md:text-[13px] italic leading-snug" style={{ color: textMuted }}>
            a flower in full bloom
            <br />
            a meeting of like minds
          </p>
        </div>
      </div>
    </div>
  )
}
