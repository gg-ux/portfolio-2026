import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Button, ButtonWithArrow } from '../../components/ui/Button'
import { Divider, SectionDivider } from '../../components/ui/Divider'
import { FrostedCard, Tag } from '../../components/ui'
import { Caption, H4, Body } from '../../components/Typography'
import { Sparkle, ArrowRight } from '@phosphor-icons/react'

const sections = [
  { id: 'cards', label: 'Cards' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'tags', label: 'Tags' },
  { id: 'dividers', label: 'Dividers' },
  { id: 'charts', label: 'Charts' },
]

export default function ComponentsPage() {
  const { isDark } = useTheme()

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'
  const textHeadingClass = isDark ? 'text-white' : 'text-gray-900'
  const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-500'
  const bgSubtle = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'

  return (
    <DSLayout title="Components" sections={sections}>
      {/* Cards */}
      <DSSection id="cards" title="Cards">
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Frosted Card</h4>
        <div className="mb-8">
          {/* Live card demo */}
          <FrostedCard className="h-[280px] max-w-[300px] cursor-pointer">
            {/* Icon - morphs to arrow */}
            <div className={`absolute top-6 right-6 ${
              isDark ? 'text-white/20 group-hover:text-white/40' : 'text-black/15 group-hover:text-black/30'
            }`} style={{ transition: 'color 500ms' }}>
              <div className="transition-all duration-[400ms] ease-out group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-45 group-hover:blur-[2px]">
                <Sparkle size={24} weight="light" />
              </div>
              <div className="absolute inset-0 transition-all duration-[400ms] ease-out opacity-0 scale-50 -rotate-45 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0">
                <ArrowRight size={24} weight="light" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-6">
              <div className="flex-1 pt-2">
                <H4 className="mb-3 pr-10">Example Card</H4>
                <Body size="sm" className={isDark ? 'text-white/50' : 'text-black/50'}>
                  Frosted glass effect with subtle grain texture.
                </Body>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Tag>Tag</Tag>
              </div>
            </div>
          </FrostedCard>
        </div>

        {/* Specs */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Specifications</h4>
        <div className={`${bgSubtle} p-6 rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="mb-2 block">Background</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Semi-transparent fill (1.5% white dark, 20% white light)
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Backdrop Blur</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                backdrop-blur-md (12px)
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Border</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                1px at 8% opacity (white/black)
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Grain Overlay</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                SVG feTurbulence, 8% opacity dark / 6% light
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Border Radius</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                2xl (1rem)
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Hover State</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                +2% overlay opacity
              </p>
            </div>
          </div>
        </div>

        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Icon Morph Effect</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="mb-2 block">Icon Out</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Scale 50%, rotate 45°, blur 2px, fade out
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Arrow In</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Scale 50% → 100%, rotate -45° → 0°, fade in
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Duration</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                400ms ease-out
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Color Change</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                20% → 40% opacity on hover
              </p>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Buttons */}
      <DSSection id="buttons" title="Buttons">
        {/* Variants */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Variants</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center">
              <Button variant="primary">Primary</Button>
              <Caption className="mt-3 block">Primary</Caption>
            </div>
            <div className="text-center">
              <Button variant="secondary">Secondary</Button>
              <Caption className="mt-3 block">Secondary</Caption>
            </div>
            <div className="text-center">
              <Button variant="ghost">Ghost</Button>
              <Caption className="mt-3 block">Ghost</Caption>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Sizes</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center">
              <Button size="sm">Small</Button>
              <Caption className="mt-3 block">sm</Caption>
            </div>
            <div className="text-center">
              <Button size="md">Medium</Button>
              <Caption className="mt-3 block">md</Caption>
            </div>
            <div className="text-center">
              <Button size="lg">Large</Button>
              <Caption className="mt-3 block">lg</Caption>
            </div>
          </div>
        </div>

        {/* Size Usage Guidelines */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">When to Use Each Size</h4>
        <div className={`${bgSubtle} p-6 rounded-xl mb-8`}>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button size="lg" className="pointer-events-none">Large</Button>
                <Caption className="block">Hero CTAs, standalone actions</Caption>
              </div>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/50' : 'text-gray-500'} ml-0`}>
                Use when the button is THE action on the page. Hero sections, pricing pages, empty states, onboarding flows. Limit to one per viewport.
              </p>
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button size="md" className="pointer-events-none">Medium</Button>
                <Caption className="block">Default choice</Caption>
              </div>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/50' : 'text-gray-500'} ml-0`}>
                Forms, cards, modals, section-level actions. When there are 1-2 actions side by side or the button shares space with content.
              </p>
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button size="sm" className="pointer-events-none">Small</Button>
                <Caption className="block">Supporting actions</Caption>
              </div>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/50' : 'text-gray-500'} ml-0`}>
                Inline with text, tables, lists, repeated actions. When space is tight or the button shouldn't compete with nearby primary actions.
              </p>
            </div>
          </div>
        </div>

        {/* With Icons */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">With Icons</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center">
              <ButtonWithArrow direction="right">Continue</ButtonWithArrow>
              <Caption className="mt-3 block">Arrow Right</Caption>
            </div>
            <div className="text-center">
              <ButtonWithArrow direction="up">Back to Top</ButtonWithArrow>
              <Caption className="mt-3 block">Arrow Up</Caption>
            </div>
            <div className="text-center">
              <ButtonWithArrow direction="external" external href="#">External</ButtonWithArrow>
              <Caption className="mt-3 block">External Link</Caption>
            </div>
          </div>
        </div>

        {/* Specs */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Specifications</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="mb-2 block">Font</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Satoshi Medium, uppercase, tracking-wider
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Border Radius</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Full (rounded-full)
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Transition</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                500ms all properties
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">3D Effect</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Primary buttons only - tilt on hover
              </p>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Tags */}
      <DSSection id="tags" title="Tags">
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Default</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-wrap gap-2">
            <Tag>Design</Tag>
            <Tag>Research</Tag>
            <Tag>Prototyping</Tag>
          </div>
        </div>

        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Colored</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-wrap gap-2">
            <Tag color="#A78BFA">Lavender</Tag>
            <Tag color="#0F766E">Teal</Tag>
            <Tag color="#EA580C">Orange</Tag>
            <Tag color="#6B7280">Neutral</Tag>
          </div>
        </div>

        {/* Specs */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Specifications</h4>
        <div className={`${bgSubtle} p-6 rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="mb-2 block">Font</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Azeret Mono, 11px, uppercase, tracking-wide
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Padding</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                px-2 py-1 (8px horizontal, 4px vertical)
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Border Radius</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                rounded-md (6px)
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Default Background</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                6% white (dark) / 4% black (light)
              </p>
            </div>
          </div>
        </div>

        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Use Cases</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              'Skills and categories on resume',
              'Project tags and metadata',
              'Filter chips and labels',
              'Status indicators (with color)',
            ].map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <span className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      {/* Dividers */}
      <DSSection id="dividers" title="Dividers">
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Horizontal</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-8">
            <div>
              <Caption className="mb-4 block">Full Width</Caption>
              <SectionDivider />
            </div>
            <div>
              <Caption className="mb-4 block">Standard</Caption>
              <Divider />
            </div>
          </div>
        </div>

        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Vertical</h4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex items-center justify-center gap-8 h-24">
            <span className={`font-satoshi ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Left</span>
            <Divider orientation="vertical" />
            <span className={`font-satoshi ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Right</span>
          </div>
        </div>

        {/* Specs */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Specifications</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="mb-2 block">Height/Width</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                1px
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Color</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                Theme-aware via divider-color class
              </p>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Charts */}
      <DSSection id="charts" title="Charts">
        <Body className={`mb-8 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
          Charts follow a minimal, premium aesthetic with slim elements and subtle grid treatments.
        </Body>

        {/* Bars */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Bar Style</h4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="block mb-3">Standard Bar (4px height)</Caption>
          <div className={`h-8 relative ${bgSubtle} rounded-lg`}>
            <div
              className="absolute top-1/2 -translate-y-1/2 left-4 h-1 rounded-full"
              style={{ width: '60%', backgroundColor: isDark ? '#A78BFA' : '#8B5CF6' }}
            />
          </div>
          <p className={`font-mono text-xs mt-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
            h-1 (4px) • rounded-full • scaleX animation
          </p>
        </div>

        {/* Grid Lines */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Grid Lines</h4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="block mb-3">Dashed Vertical Lines</Caption>
          <div className={`h-24 relative ${bgSubtle} rounded-lg flex`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-1 border-l border-dashed"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}
              />
            ))}
          </div>
          <p className={`font-mono text-xs mt-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
            border-dashed • 15% opacity dark / 15% light
          </p>
        </div>

        {/* Guidelines */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Guidelines</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              'Use 4px (h-1) height for all chart bars',
              'Always use rounded-full for pill-shaped ends',
              'Animate with transform: scaleX for entry',
              'Use staggered delays for multiple bars',
              'Keep grid lines subtle (15% opacity max)',
            ].map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <span className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
