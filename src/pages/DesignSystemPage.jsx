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
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[1077px]:grid-cols-4 gap-5">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <FrostedContainer
                key={category.title}
                as={Link}
                to={category.href}
                className="h-auto sm:h-[280px]"
              >
                {/* Icon - top right, morphs to arrow on hover (desktop) or always shows arrow (touch) */}
                <div className={`absolute top-6 right-6 ${
                  isDark ? 'text-white/20 group-hover:text-white/40' : 'text-black/15 group-hover:text-black/30'
                }`} style={{ transition: 'color 500ms' }}>
                  {/* Category icon - hidden on mobile, morphs out on desktop hover */}
                  <div
                    className="hidden min-[1077px]:block transition-all duration-[400ms] ease-out group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-45 group-hover:blur-[2px]"
                  >
                    <Icon size={24} weight="light" />
                  </div>
                  {/* Arrow - always visible on mobile/tablet, morphs in on desktop hover */}
                  <div
                    className={`min-[1077px]:absolute min-[1077px]:inset-0 transition-all duration-[400ms] ease-out min-[1077px]:opacity-0 min-[1077px]:scale-50 min-[1077px]:-rotate-45 min-[1077px]:group-hover:opacity-100 min-[1077px]:group-hover:scale-100 min-[1077px]:group-hover:rotate-0 ${
                      isDark ? 'text-white/40 min-[1077px]:text-inherit' : 'text-black/30 min-[1077px]:text-inherit'
                    }`}
                  >
                    <ArrowRight size={24} weight="light" />
                  </div>
                </div>

                {/* Content wrapper */}
                <div className="relative z-10 flex flex-col h-full p-6">
                  {/* Title & Description */}
                  <div className="flex-1 pt-2">
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
