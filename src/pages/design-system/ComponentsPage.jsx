import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Button, ButtonWithArrow } from '../../components/ui/Button'
import { FrostedCard, Tag } from '../../components/ui'
import { Input, Textarea, Select } from '../../components/ui/Input'
import { Caption, H4, Body, Paragraph } from '../../components/Typography'
import { Divider } from '../../components/ui/Divider'
import { Sparkle, ArrowRight } from '@phosphor-icons/react'

const sections = [
  { id: 'cards', label: 'Cards' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'inputs', label: 'Form Inputs' },
  { id: 'tags', label: 'Tags' },
  { id: 'loaders', label: 'Loaders' },
  { id: 'charts', label: 'Charts' },
]

export default function ComponentsPage() {
  const { isDark } = useTheme()
  const [selectValue, setSelectValue] = useState('')

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'
  const textHeadingClass = isDark ? 'text-white' : 'text-gray-900'
  const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-500'
  const bgSubtle = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'

  return (
    <DSLayout title="Components" sections={sections}>
      {/* Cards */}
      <DSSection id="cards" title="Cards">
        <H4 className="mb-6">Frosted Card</H4>
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
        <H4 className="mb-4">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Background</Caption>
              <Body size="sm">Semi-transparent fill (1.5% white dark, 20% white light)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Backdrop Blur</Caption>
              <Body size="sm">backdrop-blur-md (12px)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Border</Caption>
              <Body size="sm">1px at 8% opacity (white/black)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Grain Overlay</Caption>
              <Body size="sm">SVG feTurbulence, 8% opacity dark / 6% light</Body>
            </div>
            <div>
              <Caption className="block mb-1">Border Radius</Caption>
              <Body size="sm">2xl (1rem)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Hover State</Caption>
              <Body size="sm">+2% overlay opacity</Body>
            </div>
          </div>
        </div>

        <H4 className="mb-4">Icon Morph Effect</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Icon Out</Caption>
              <Body size="sm">Scale 50%, rotate 45°, blur 2px, fade out</Body>
            </div>
            <div>
              <Caption className="block mb-1">Arrow In</Caption>
              <Body size="sm">Scale 50% → 100%, rotate -45° → 0°, fade in</Body>
            </div>
            <div>
              <Caption className="block mb-1">Duration</Caption>
              <Body size="sm">400ms ease-out</Body>
            </div>
            <div>
              <Caption className="block mb-1">Color Change</Caption>
              <Body size="sm">20% → 40% opacity on hover</Body>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Buttons */}
      <DSSection id="buttons" title="Buttons">
        {/* Variants */}
        <H4 className="mb-6">Variants</H4>
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
        <H4 className="mb-6">Sizes</H4>
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
        <H4 className="mb-6">When to Use Each Size</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button size="lg" className="pointer-events-none">Large</Button>
                <Caption className="block">Hero CTAs, standalone actions</Caption>
              </div>
              <Body size="sm" className={isDark ? 'text-white/50' : 'text-gray-500'}>
                Use when the button is THE action on the page. Hero sections, pricing pages, empty states, onboarding flows. Limit to one per viewport.
              </Body>
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button size="md" className="pointer-events-none">Medium</Button>
                <Caption className="block">Default choice</Caption>
              </div>
              <Body size="sm" className={isDark ? 'text-white/50' : 'text-gray-500'}>
                Forms, cards, modals, section-level actions. When there are 1-2 actions side by side or the button shares space with content.
              </Body>
            </div>
            <Divider />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button size="sm" className="pointer-events-none">Small</Button>
                <Caption className="block">Supporting actions</Caption>
              </div>
              <Body size="sm" className={isDark ? 'text-white/50' : 'text-gray-500'}>
                Inline with text, tables, lists, repeated actions. When space is tight or the button shouldn't compete with nearby primary actions.
              </Body>
            </div>
          </div>
        </div>

        {/* With Icons */}
        <H4 className="mb-6">With Icons</H4>
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
        <H4 className="mb-6">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Font</Caption>
              <Body size="sm">Satoshi Medium, uppercase, tracking-wider</Body>
            </div>
            <div>
              <Caption className="block mb-1">Border Radius</Caption>
              <Body size="sm">Full (rounded-full)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Transition</Caption>
              <Body size="sm">500ms all properties</Body>
            </div>
            <div>
              <Caption className="block mb-1">3D Effect</Caption>
              <Body size="sm">Primary buttons only - tilt on hover</Body>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Form Inputs */}
      <DSSection id="inputs" title="Form Inputs">
        <Paragraph size="sm" className="mb-8">
          Minimal underline-style inputs that focus attention on the content rather than the container.
        </Paragraph>

        {/* Text Input */}
        <H4 className="mb-6">Text Input</H4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="max-w-md space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              required
            />
            <Input
              label="Website"
              placeholder="https://example.com"
              optional
            />
            <Input
              label="Email"
              placeholder="you@example.com"
              error="Please enter a valid email"
            />
          </div>
        </div>

        {/* Textarea */}
        <H4 className="mb-6">Textarea</H4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="max-w-md space-y-6">
            <Textarea
              label="Message"
              placeholder="Tell us about your project..."
              rows={3}
            />
            <Textarea
              label="Bio"
              placeholder="A brief description..."
              rows={2}
              resizable={false}
              optional
            />
          </div>
        </div>

        {/* Select */}
        <H4 className="mb-6">Select</H4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="max-w-md">
            <Select
              label="Project Type"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: '', label: 'Select an option...' },
                { value: 'design', label: 'Design System' },
                { value: 'product', label: 'Product Design' },
                { value: 'research', label: 'UX Research' },
                { value: 'branding', label: 'Brand Identity' },
              ]}
            />
          </div>
        </div>

        {/* Specs */}
        <H4 className="mb-6">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Label</Caption>
              <Body size="sm">Azeret Mono, 11px, uppercase, tracking-wide</Body>
            </div>
            <div>
              <Caption className="block mb-1">Input Text</Caption>
              <Body size="sm">Satoshi, 16px (base)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Border</Caption>
              <Body size="sm">Bottom only, 20% opacity → 60% on focus</Body>
            </div>
            <div>
              <Caption className="block mb-1">Error State</Caption>
              <Body size="sm">Red border (60%), error text below</Body>
            </div>
            <div>
              <Caption className="block mb-1">Transition</Caption>
              <Body size="sm">300ms all properties</Body>
            </div>
            <div>
              <Caption className="block mb-1">Padding</Caption>
              <Body size="sm">py-2, px-0 (underline style)</Body>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Tags */}
      <DSSection id="tags" title="Tags">
        <H4 className="mb-6">Default</H4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-wrap gap-2">
            <Tag>Design</Tag>
            <Tag>Research</Tag>
            <Tag>Prototyping</Tag>
          </div>
        </div>

        <H4 className="mb-6">Colored</H4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-wrap gap-2">
            <Tag color="#5835B0">Amethyst</Tag>
            <Tag color="#BF92F0">Lilac</Tag>
            <Tag color="#D78F8D">Rose</Tag>
            <Tag color="#DBA166">Gold</Tag>
            <Tag color="#36CBC6">Turquoise</Tag>
            <Tag color="#0B96A3">Lagoon</Tag>
            <Tag color="#87AA61">Peridot</Tag>
            <Tag color="#2F7255">Forest</Tag>
            <Tag color="#6B7280">Neutral</Tag>
          </div>
        </div>

        {/* Specs */}
        <H4 className="mb-6">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Font</Caption>
              <Body size="sm">Azeret Mono, 11px, uppercase, tracking-wide</Body>
            </div>
            <div>
              <Caption className="block mb-1">Padding</Caption>
              <Body size="sm">px-2 py-1 (8px horizontal, 4px vertical)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Border Radius</Caption>
              <Body size="sm">rounded-md (6px)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Default Background</Caption>
              <Body size="sm">6% white (dark) / 4% black (light)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Colored Tags (Dark Mode)</Caption>
              <Body size="sm">5% black overlay on background color</Body>
            </div>
          </div>
        </div>

        <H4 className="mb-6">Use Cases</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              'Skills and categories on resume',
              'Project tags and metadata',
              'Filter chips and labels',
              'Status indicators (with color)',
            ].map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <Body size="sm">
                  {item}
                </Body>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      {/* Loaders */}
      <DSSection id="loaders" title="Loaders">
        <Paragraph size="sm" className="mb-8">
          A branded page loader with progress ring and bloom effect for initial page load.
        </Paragraph>

        {/* Visual Preview */}
        <H4 className="mb-6">Page Loader</H4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex items-center justify-center h-48">
            {/* Static preview of loader */}
            <div className="relative flex items-center justify-center">
              {/* Glow effect */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 120,
                  height: 120,
                  background: `radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, rgba(167, 139, 250, 0.15) 50%, transparent 70%)`,
                  filter: 'blur(20px)',
                }}
              />
              {/* Progress ring */}
              <svg width={80} height={80} className="absolute" style={{ transform: 'rotate(-90deg)' }}>
                <defs>
                  <linearGradient id="loaderGradient">
                    <stop offset="0%" stopColor="#BF92F0" />
                    <stop offset="50%" stopColor="#0B96A3" />
                    <stop offset="100%" stopColor="#BF92F0" />
                  </linearGradient>
                </defs>
                <circle
                  cx={40}
                  cy={40}
                  r={39}
                  fill="none"
                  stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                  strokeWidth={1.5}
                />
                <circle
                  cx={40}
                  cy={40}
                  r={39}
                  fill="none"
                  stroke="url(#loaderGradient)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray={245}
                  strokeDashoffset={60}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.5))' }}
                />
              </svg>
              {/* Logo */}
              <img
                src="/assets/branding/logo.svg"
                alt="Logo"
                className={`h-6 w-auto ${isDark ? 'invert' : ''}`}
              />
            </div>
          </div>
          <Caption className="text-center block mt-4">
            Shows during initial page load with gradient ring animation
          </Caption>
        </div>

        {/* Animation Phases */}
        <H4 className="mb-6">Animation Phases</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              ['Enter', '0-400ms', 'Logo fades in, slight scale up'],
              ['Loading', '400-1800ms', 'Ring fills with gradient animation, logo breathes'],
              ['Complete', '1800-2400ms', 'Bloom glow effect appears'],
              ['Exit', '2400-3200ms', 'Everything fades and blurs out'],
            ].map(([phase, timing, description], i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0 grid grid-cols-3 gap-4">
                <Body size="sm" className={`font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{phase}</Body>
                <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{timing}</span>
                <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-600'}>{description}</Body>
              </div>
            ))}
          </div>
        </div>

        {/* Specs */}
        <H4 className="mb-6">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Ring Size</Caption>
              <Body size="sm">80px diameter, 1.5px stroke</Body>
            </div>
            <div>
              <Caption className="block mb-1">Gradient</Caption>
              <Body size="sm">Lilac → Lagoon → Lilac (rotating)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Bloom Glow</Caption>
              <Body size="sm">Radial gradient, 20px blur</Body>
            </div>
            <div>
              <Caption className="block mb-1">Easing</Caption>
              <Body size="sm">cubic-bezier(0.22, 1, 0.36, 1)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Total Duration</Caption>
              <Body size="sm">~3.2 seconds</Body>
            </div>
            <div>
              <Caption className="block mb-1">Logo Animation</Caption>
              <Body size="sm">Breathing pulse during loading phase</Body>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Charts */}
      <DSSection id="charts" title="Charts">
        <Paragraph size="sm" className="mb-8">
          Charts follow a minimal, premium aesthetic with slim elements and subtle grid treatments.
        </Paragraph>

        {/* Bars */}
        <H4 className="mb-6">Bar Style</H4>
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
        <H4 className="mb-6">Grid Lines</H4>
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

        {/* Colors */}
        <H4 className="mb-6">Colors</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg"
              style={{ backgroundColor: isDark ? '#A78BFA' : '#8B5CF6' }}
            />
            <div>
              <Body className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Lavender (Primary Accent)</Body>
              <p className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                Dark: #A78BFA • Light: #8B5CF6
              </p>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <H4 className="mb-6">Bar Chart Guidelines</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-12`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              'Use 4px (h-1) height for all chart bars',
              'Always use rounded-full for pill-shaped ends',
              'Animate with transform: scaleX for entry',
              'Use staggered delays for multiple bars',
              'Keep grid lines subtle (15% opacity max)',
            ].map((item, i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0">
                <Body size="sm">
                  {item}
                </Body>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Charts */}
        <H4 className="mb-6">Flow Charts</H4>
        <Paragraph size="sm" className="mb-6">
          SVG-based flow diagrams with consistent node styles, path routing, and semantic color coding.
        </Paragraph>

        {/* Flow Chart Colors */}
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="block mb-4">Color System</Caption>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: isDark ? '#4a4a4a' : '#d0d0d0' }} />
              <div>
                <p className={`font-mono text-xs ${textMutedClass}`}>Neutral Path</p>
                <p className={`font-mono text-[10px] ${isDark ? 'text-white/30' : 'text-black/30'}`}>{isDark ? '#4a4a4a' : '#d0d0d0'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: isDark ? '#5c9a6a' : '#6aaa78' }} />
              <div>
                <p className={`font-mono text-xs ${textMutedClass}`}>Success Path</p>
                <p className={`font-mono text-[10px] ${isDark ? 'text-white/30' : 'text-black/30'}`}>{isDark ? '#5c9a6a' : '#6aaa78'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: isDark ? '#c45c5c' : '#d46a6a' }} />
              <div>
                <p className={`font-mono text-xs ${textMutedClass}`}>Problem Path</p>
                <p className={`font-mono text-[10px] ${isDark ? 'text-white/30' : 'text-black/30'}`}>{isDark ? '#c45c5c' : '#d46a6a'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-2 rounded" style={{ backgroundColor: isDark ? '#252525' : '#ffffff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}` }} />
              <div>
                <p className={`font-mono text-xs ${textMutedClass}`}>Node Fill</p>
                <p className={`font-mono text-[10px] ${isDark ? 'text-white/30' : 'text-black/30'}`}>{isDark ? '#252525' : '#ffffff'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Chart Category Colors */}
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="block mb-4">Category Colors (Brand Palette)</Caption>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Order Education', color: '#5835B0', label: 'Amethyst' },
              { name: 'Vehicle Appointments', color: '#DBA166', label: 'Gold' },
              { name: 'Vehicle Education', color: '#36CBC6', label: 'Turquoise' },
              { name: 'Energy Appointments', color: '#D78F8D', label: 'Rose' },
              { name: 'Energy Education', color: '#0B96A3', label: 'Lagoon' },
              { name: 'General', color: '#6B7280', label: 'Neutral' },
            ].map(({ name, color, label }) => (
              <div key={name} className="flex items-center gap-3">
                <div
                  className="w-8 h-6 rounded"
                  style={{
                    backgroundColor: isDark ? `${color}40` : `${color}25`,
                    border: `1px solid ${isDark ? `${color}70` : `${color}50`}`
                  }}
                />
                <div>
                  <p className={`font-mono text-xs ${textMutedClass}`}>{name}</p>
                  <p className={`font-mono text-[10px] ${isDark ? 'text-white/30' : 'text-black/30'}`}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Chart Specs */}
        <H4 className="mb-6">Flow Chart Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Node Typography</Caption>
              <Body size="sm">13px Satoshi, weight 600</Body>
            </div>
            <div>
              <Caption className="block mb-1">Label Typography</Caption>
              <Body size="sm">11px monospace, uppercase, 0.05em tracking</Body>
            </div>
            <div>
              <Caption className="block mb-1">Line Width</Caption>
              <Body size="sm">1.5px stroke</Body>
            </div>
            <div>
              <Caption className="block mb-1">Corner Radius</Caption>
              <Body size="sm">8px for path turns, 6-8px for nodes</Body>
            </div>
            <div>
              <Caption className="block mb-1">Decision Nodes</Caption>
              <Body size="sm">Diamond shape for yes/no decisions</Body>
            </div>
            <div>
              <Caption className="block mb-1">Arrows</Caption>
              <Body size="sm">SVG markers, 8x6px, color matches path</Body>
            </div>
          </div>
        </div>

        {/* Expandable Charts */}
        <H4 className="mb-6">Expandable Chart Wrapper</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Mobile Interaction</Caption>
              <Body size="sm">Tap expand button to view fullscreen with pan/zoom</Body>
            </div>
            <div>
              <Caption className="block mb-1">Zoom Library</Caption>
              <Body size="sm">react-zoom-pan-pinch, 0.4x-3x scale range</Body>
            </div>
            <div>
              <Caption className="block mb-1">Legend Position</Caption>
              <Body size="sm">Horizontal scroll above chart, border-bottom separator</Body>
            </div>
            <div>
              <Caption className="block mb-1">Auto-Scale</Caption>
              <Body size="sm">Calculates optimal scale to fit viewport height</Body>
            </div>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
