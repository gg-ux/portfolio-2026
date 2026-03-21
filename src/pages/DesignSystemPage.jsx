import { Link } from 'react-router-dom'
import { H1, H4, Body, Caption } from '../components/Typography'
import FluidBlob from '../components/FluidBlob'
import AuraBeams from '../components/AuraBeams'
import { FrostedContainer } from '../components/ui'
import { useTheme } from '../context/ThemeContext'
import { getColor } from '../constants/colors'
import { Palette, Stack, Lightning, Layout, ArrowRight } from '@phosphor-icons/react'

// Category cards for design system landing
const categories = [
  {
    title: 'Foundation',
    description: 'Single source of truth. Design tokens that power every decision.',
    icon: Palette,
    href: '/design-system/foundation',
    colorKey: 'amethyst',
  },
  {
    title: 'Components',
    description: 'Composable building blocks with usage guidelines and props API.',
    icon: Stack,
    href: '/design-system/components',
    colorKey: 'lilac',
  },
  {
    title: 'Motion',
    description: 'Purposeful animation. Easing curves, timing, and interaction cues.',
    icon: Lightning,
    href: '/design-system/motion',
    colorKey: 'rose',
  },
  {
    title: 'Patterns',
    description: 'Proven solutions for navigation, layout, and content structure.',
    icon: Layout,
    href: '/design-system/patterns',
    colorKey: 'gold',
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
        {/* Blob - positioned right, above AuraBeams */}
        <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] md:right-[5%] lg:right-[10%] pointer-events-none opacity-80 z-[5]">
          <FluidBlob size={500} seed={7} isDark={isDark} />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header Content - left aligned */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <H1>Gooey</H1>
              <span className={`font-mono text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/[0.06] text-white/50' : 'bg-black/[0.04] text-black/40'}`}>
                v1.0
              </span>
            </div>
            <Caption trigger="mount" className="mb-6 block">Developed & Designed by Grace Guo</Caption>
            <Body className="text-xl leading-relaxed">
              A design system built around feeling—where motion, color, and interaction work together to create an experience that feels alive and human. Inspired by GUI, fluidity, and how kids used to mispronounce my last name.
            </Body>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 min-[1000px]:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((category) => {
            const Icon = category.icon
            const color = getColor(category.colorKey, isDark)
            return (
              <FrostedContainer
                key={category.title}
                as={Link}
                to={category.href}
                className=""
              >
                {/* Content wrapper */}
                <div className="relative z-10 flex flex-col h-full p-5 sm:p-6">
                  {/* Category icon + Title + Description */}
                  <div>
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 mb-4">
                      {/* Icon with subtle color tint background */}
                      <div
                        className="relative z-10 w-full h-full rounded-full flex items-center justify-center"
                        style={{
                          color: color,
                          backgroundColor: `${color}12`
                        }}
                      >
                        <Icon size={20} className="sm:hidden" weight="regular" />
                        <Icon size={22} className="hidden sm:block" weight="regular" />
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
                    <H4 className="mb-1 sm:mb-2 text-base sm:text-lg">{category.title}</H4>
                    <Body size="sm" className={isDark ? 'text-white/50' : 'text-black/50'}>
                      {category.description}
                    </Body>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-end mt-auto pt-3 sm:pt-4">
                    <div className={`transition-colors duration-300 ${
                      isDark ? 'text-white/30 group-hover:text-white/50' : 'text-black/20 group-hover:text-black/40'
                    }`}>
                      <ArrowRight size={20} weight="light" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
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
