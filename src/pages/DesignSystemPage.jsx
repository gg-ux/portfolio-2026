import { Link } from 'react-router-dom'
import { H1, H4, Body, Caption } from '../components/Typography'
import ScrambleText from '../components/ScrambleText'
import FluidBlob from '../components/FluidBlob'
import AuraBeams from '../components/AuraBeams'
import { FrostedContainer, Tag } from '../components/ui'
import { useTheme } from '../context/ThemeContext'
import { Palette, Stack, Lightning, Layout, ArrowRight } from '@phosphor-icons/react'

// Category cards for design system landing
const categories = [
  {
    title: 'Foundation',
    description: 'The building blocks of Gooey. Typography, colors, and spacing scales.',
    icon: Palette,
    href: '/design-system/foundation',
    items: ['Typography', 'Colors', 'Icons', 'Spacing'],
  },
  {
    title: 'Components',
    description: 'Reusable UI elements with specs, variants, and usage guidelines.',
    icon: Stack,
    href: '/design-system/components',
    items: ['Buttons', 'Inputs', 'Tags', 'Data Viz'],
  },
  {
    title: 'Motion',
    description: 'Animations and background effects that bring the experience to life.',
    icon: Lightning,
    href: '/design-system/motion',
    items: ['Scroll', 'Animations', 'Cursor Effects'],
  },
  {
    title: 'Patterns',
    description: 'Layout structures and page templates for consistent experiences.',
    icon: Layout,
    href: '/design-system/patterns',
    items: ['Navigation', 'Layouts', 'Projects', 'Footer'],
  },
]

export default function DesignSystemPage() {
  const { isDark } = useTheme()

  return (
    <div className="relative min-h-screen pb-24 md:pb-32">
      {/* AuraBeams background */}
      <div className="fixed inset-0 z-0">
        <AuraBeams contained />
      </div>

      {/* Banner Section */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Blob - positioned right */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] md:right-[5%] lg:right-[10%] pointer-events-none opacity-80 z-0">
          <FluidBlob size={500} seed={7} isDark={isDark} />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header Content - left aligned */}
          <div className="max-w-2xl">
            <H1 className="mb-4">Gooey</H1>
            <Caption trigger="mount" className="mb-6 block">Developed & Designed by Grace Guo</Caption>
            <Body className="text-xl leading-relaxed">
              A design system built around feeling—where motion, color, and interaction work together to create an experience that feels alive, fluid, and human.
            </Body>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <FrostedContainer
                key={category.title}
                as={Link}
                to={category.href}
                className="h-auto sm:h-[280px]"
              >
                {/* Arrow - top right, always visible */}
                <div className={`absolute top-6 right-6 transition-colors duration-300 ${
                  isDark ? 'text-white/30 group-hover:text-white/50' : 'text-black/20 group-hover:text-black/40'
                }`}>
                  <ArrowRight size={24} weight="light" />
                </div>

                {/* Content wrapper */}
                <div className="relative z-10 flex flex-col h-full p-6">
                  {/* Category icon + Title */}
                  <div className="flex-1 pt-2">
                    <div className={`mb-4 ${isDark ? 'text-white/25' : 'text-black/20'}`}>
                      <Icon size={28} weight="light" />
                    </div>
                    <H4 className="mb-3 pr-10">{category.title}</H4>
                    <Body size="sm" className={isDark ? 'text-white/50' : 'text-black/50'}>
                      {category.description}
                    </Body>
                  </div>

                  {/* Items list */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {category.items.map((item) => (
                      <Tag key={item} muted>
                        <ScrambleText trigger="hover">{item}</ScrambleText>
                      </Tag>
                    ))}
                  </div>
                </div>
              </FrostedContainer>
            )
          })}
        </div>
      </div>
    </div>
  )
}
