import { H1, H2, H3, H4, Body, Caption, ChartContainer } from '../../components/Typography'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Divider, SectionDivider } from '../../components/ui/Divider'
import { FrostedCard } from '../../components/ui'
import {
  Sun, Moon, ArrowRight, ArrowUp, ArrowUpRight, ArrowDown,
  X, ListBullets, ChatCircle, EnvelopeSimple, CheckCircle,
  WarningCircle, CircleNotch, Sparkle, MagnifyingGlass,
  LinkedinLogo, DribbbleLogo, Globe, LinkSimple,
  Palette, Stack, Lightning, Layout, Info, Medal,
  Person, UsersThree, Heartbeat, TrendUp, Target, ArrowsOut
} from '@phosphor-icons/react'

const sections = [
  { id: 'typography', label: 'Typography' },
  { id: 'colors', label: 'Colors' },
  { id: 'iconography', label: 'Iconography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'containers', label: 'Containers' },
  { id: 'dividers', label: 'Dividers' },
]

export default function FoundationPage() {
  const { isDark } = useTheme()

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'
  const textHeadingClass = isDark ? 'text-white' : 'text-gray-900'
  const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-500'

  // Soulful palette - Brand colors with primary/secondary roles (theme-aware)
  const soulfulPalette = [
    { name: 'Amethyst', hex: '#5835B0', textColor: 'text-white', role: 'primary', icon: Sun },
    { name: 'Lilac', hex: '#BF92F0', textColor: 'text-black', role: 'primary', icon: Moon },
    { name: 'Rose', hex: '#D78F8D', textColor: 'text-black', role: 'secondary' },
    { name: 'Gold', hex: '#DBA166', textColor: 'text-black', role: 'secondary' },
    { name: 'Turquoise', hex: '#36CBC6', textColor: 'text-black', role: 'secondary' },
    { name: 'Lagoon', hex: '#0B96A3', textColor: 'text-white', role: 'secondary' },
    { name: 'Peridot', hex: '#87AA61', textColor: 'text-black', role: 'secondary' },
    { name: 'Forest', hex: '#2F7255', textColor: 'text-white', role: 'secondary' },
  ]

  // Blob shader colors - theme aware
  const blobColors = isDark ? [
    { name: 'Soft Lavender', hex: '#C4B5FD', textColor: 'text-black', role: 'Base' },
    { name: 'Violet', hex: '#8B3AED', textColor: 'text-white', role: 'Base' },
    { name: 'Amber/Gold', hex: '#FBBF24', textColor: 'text-black', role: 'Highlight' },
    { name: 'Soft Teal', hex: '#5EEAD4', textColor: 'text-black', role: 'Highlight' },
  ] : [
    { name: 'Light Lilac', hex: '#E4CCFF', textColor: 'text-black', role: 'Base' },
    { name: 'Light Rose', hex: '#F5B8B8', textColor: 'text-black', role: 'Base' },
    { name: 'Soft Sky Blue', hex: '#93C5FD', textColor: 'text-black', role: 'Highlight' },
    { name: 'Light Teal', hex: '#99F6E4', textColor: 'text-black', role: 'Highlight' },
  ]

  // System colors - theme aware
  const systemColors = [
    { name: 'Background', hex: isDark ? '#0A0A0A' : '#FAF8F4', displayHex: isDark ? '#0A0A0A' : '#FAF8F4', textColor: isDark ? 'text-white' : 'text-black' },
    { name: 'Heading', hex: isDark ? '#FFFFFF' : '#111827', displayHex: isDark ? '#FFFFFF' : '#111827', textColor: isDark ? 'text-black' : 'text-white' },
    { name: 'Body Text', hex: isDark ? '#D1D5DB' : '#3A3A3A', displayHex: isDark ? '#D1D5DB' : '#3A3A3A', textColor: isDark ? 'text-black' : 'text-white' },
    { name: 'Caption', hex: isDark ? '#6B7280' : '#9CA3AF', displayHex: isDark ? '#6B7280' : '#9CA3AF', textColor: 'text-white' },
    { name: 'Border', hex: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)', displayHex: isDark ? 'white/6%' : 'black/8%', textColor: isDark ? 'text-white' : 'text-black', isTransparent: true },
    { name: 'Card Surface', hex: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.2)', displayHex: isDark ? 'white/1.5%' : 'white/20%', textColor: isDark ? 'text-white' : 'text-black', isTransparent: true },
    { name: 'Error', hex: isDark ? '#EF4444' : '#DC2626', displayHex: isDark ? '#EF4444' : '#DC2626', textColor: 'text-white' },
    { name: 'Success', hex: isDark ? '#22C55E' : '#16A34A', displayHex: isDark ? '#22C55E' : '#16A34A', textColor: 'text-white' },
    { name: 'Warning', hex: isDark ? '#F59E0B' : '#D97706', displayHex: isDark ? '#F59E0B' : '#D97706', textColor: 'text-black' },
    { name: 'Dark Mode', hex: '#A78BFA', displayHex: '#A78BFA', textColor: 'text-black', icon: Moon },
    { name: 'Light Mode', hex: '#F59E0B', displayHex: '#F59E0B', textColor: 'text-black', icon: Sun },
  ]


  const typography = [
    {
      component: 'Header 1',
      size: '96px',
      font: 'Silk Serif',
      weight: '400',
      tracking: 'tight',
      useCase: 'Hero headlines, page titles',
      element: <H1>Header 1</H1>
    },
    {
      component: 'Header 2',
      size: '36–48px',
      font: 'Satoshi',
      weight: '500',
      tracking: 'tight',
      useCase: 'Section headers, feature titles',
      element: <H2>Header 2</H2>
    },
    {
      component: 'Header 2 (Serif)',
      size: '36–48px',
      font: 'Silk Serif',
      weight: '400',
      tracking: 'tight',
      useCase: 'Editorial sections, resume headers',
      element: <H2 serif>Header 2 Serif</H2>
    },
    {
      component: 'Header 3',
      size: '24–36px',
      font: 'Satoshi',
      weight: '500',
      tracking: 'tight',
      useCase: 'Subsections, card titles',
      element: <H3>Header 3</H3>
    },
    {
      component: 'Header 4',
      size: '20px',
      font: 'Satoshi',
      weightDark: '550',
      weightLight: '600',
      tracking: 'normal',
      useCase: 'Small headings, list item titles',
      element: <H4>Header 4</H4>
    },
    {
      component: 'Body',
      size: '16–17px',
      font: 'Satoshi',
      weightDark: '400',
      weightLight: '450',
      tracking: 'normal',
      useCase: 'Paragraphs, descriptions, long-form content',
      element: <Body>Body</Body>
    },
    {
      component: 'Emphasis',
      size: '16–17px',
      font: 'Satoshi',
      weight: '600',
      tracking: 'normal',
      useCase: 'Spec titles, emphasis within body text',
      element: <Body weight="bold">Emphasis</Body>
    },
    {
      component: 'Body Small',
      size: '15px',
      font: 'Satoshi',
      weightDark: '400',
      weightLight: '450',
      tracking: 'normal',
      useCase: 'Cards, secondary content, bullet points',
      element: <Body size="sm">Body Small</Body>
    },
    {
      component: 'Label',
      size: '13px',
      font: 'Satoshi',
      weight: '500',
      tracking: 'normal',
      useCase: 'Form labels, icon names, readable small text',
      element: <span className="font-satoshi text-[13px] font-medium">Label</span>
    },
    {
      component: 'Label Caption',
      size: '11px',
      font: 'Satoshi',
      weight: '400',
      tracking: 'normal',
      useCase: 'Secondary labels, icon metadata, subtle descriptors',
      element: <span className="font-satoshi text-[11px] font-normal opacity-60">Label Caption</span>
    },
    {
      component: 'Caption',
      size: '12px',
      font: 'Azeret Mono',
      weight: '500',
      tracking: 'wide',
      useCase: 'Metadata, labels, dates, navigation',
      element: <Caption>Caption</Caption>
    },
    {
      component: 'Caption Small',
      size: '11px',
      font: 'Azeret Mono',
      weight: '500',
      tracking: 'wide',
      useCase: 'Tags, chips, compact labels',
      element: <Caption size="sm">Caption Small</Caption>
    },
    {
      component: 'Caption XS',
      size: '10px',
      font: 'Azeret Mono',
      weight: '500',
      tracking: 'wider',
      useCase: 'Role labels, swatch metadata, subtle descriptors',
      element: <Caption size="xs">Caption XS</Caption>
    },
  ]

  const spacing = [
    { name: 'xs', value: '4px', tailwind: 'p-1' },
    { name: 'sm', value: '8px', tailwind: 'p-2' },
    { name: 'md', value: '16px', tailwind: 'p-4' },
    { name: 'lg', value: '24px', tailwind: 'p-6' },
    { name: 'xl', value: '32px', tailwind: 'p-8' },
    { name: '2xl', value: '48px', tailwind: 'p-12' },
    { name: '3xl', value: '64px', tailwind: 'p-16' },
  ]

  return (
    <DSLayout title="Foundation" sections={sections}>
      {/* Typography */}
      <DSSection id="typography" title="Typography">
        <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
          {typography.map((type) => (
            <div key={type.component} className={`p-6 border ${borderClass} rounded-xl mb-4 last:mb-0`}>
              {/* Preview */}
              <div className="mb-4">
                {type.element}
              </div>

              {/* Properties - horizontal grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <Caption className="block mb-1" size="xs">Size</Caption>
                  <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{type.size}</p>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Font</Caption>
                  <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{type.font}</p>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Weight</Caption>
                  <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                    {type.weight ? (
                      type.weight
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-0.5" style={{ color: '#a78bfa' }}>
                          <Moon size={10} weight="fill" />
                          {type.weightDark}
                        </span>
                        <span className="inline-flex items-center gap-0.5" style={{ color: '#f59e0b' }}>
                          <Sun size={10} weight="fill" />
                          {type.weightLight}
                        </span>
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Tracking</Caption>
                  <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{type.tracking}</p>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Use</Caption>
                  <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{type.useCase}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Font Families */}
        <H4 className="mb-6">Font Families</H4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-8 border ${borderClass} rounded-xl`}>
            <p className={`font-silk text-2xl mb-3 ${textHeadingClass}`}>Silk Serif</p>
            <Caption>Header 1, Header 2 (Serif)</Caption>
            <div className={`font-silk text-sm mt-4 ${textMutedClass} leading-relaxed space-y-1`}>
              <p className="break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="break-all">abcdefghijklmnopqrstuvwxyz</p>
              <p>0123456789</p>
            </div>
          </div>
          <div className={`p-8 border ${borderClass} rounded-xl`}>
            <p className={`font-satoshi text-2xl mb-3 ${textHeadingClass}`}>Satoshi</p>
            <Caption>Headings, Body & Buttons</Caption>
            <div className={`font-satoshi text-sm mt-4 ${textMutedClass} leading-relaxed space-y-1`}>
              <p className="break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="break-all">abcdefghijklmnopqrstuvwxyz</p>
              <p>0123456789</p>
            </div>
          </div>
          <div className={`p-8 border ${borderClass} rounded-xl`}>
            <p className={`font-mono text-2xl mb-3 ${textHeadingClass} normal-case`}>Azeret Mono</p>
            <Caption>Metadata & Labels</Caption>
            <div className={`font-mono text-sm mt-4 ${textMutedClass} leading-relaxed space-y-1`}>
              <p className="break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="break-all">abcdefghijklmnopqrstuvwxyz</p>
              <p>0123456789</p>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Colors */}
      <DSSection id="colors" title="Colors">
        {/* Brand Palette */}
        <div className="mb-12">
          <H4 className="mb-2">Brand Palette</H4>
          <Body className={`mb-4 ${textMutedClass}`}>Soulful — emotional, warm, unconventional</Body>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {soulfulPalette.map((color) => {
              const Icon = color.icon
              return (
                <div key={color.name} className="group">
                  <div
                    className={`aspect-[3/2] rounded-xl mb-1.5 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]`}
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className={`font-mono text-xs ${color.textColor} opacity-60`}>{color.hex}</span>
                    <span className={`font-mono text-[10px] ${color.textColor} opacity-40 mt-1 uppercase tracking-wider inline-flex items-center gap-1`}>
                      {Icon && <Icon size={9} weight="fill" />}
                      {color.role}
                    </span>
                  </div>
                  <Caption uppercase={false}>{color.name}</Caption>
                </div>
              )
            })}
          </div>
        </div>

        {/* Blob Shader - Theme aware */}
        <div className="mb-12">
          <H4 className="mb-2">Blob Shader</H4>
          <Body className={`mb-4 ${textMutedClass}`}>FluidBlob gradient colors — switch theme to see variants</Body>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blobColors.map((color) => (
              <div key={color.name} className="group">
                <div
                  className={`aspect-[3/2] rounded-xl mb-1.5 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={`font-mono text-xs ${color.textColor} opacity-60`}>{color.hex}</span>
                  <span className={`font-mono text-[10px] ${color.textColor} opacity-40 mt-1 uppercase tracking-wider`}>{color.role}</span>
                </div>
                <Caption uppercase={false}>{color.name}</Caption>
              </div>
            ))}
          </div>
        </div>

        {/* System Colors - Theme aware */}
        <div className="mb-12">
          <H4 className="mb-2">System Colors</H4>
          <Body className={`mb-4 ${textMutedClass}`}>Functional UI colors — switch theme to see variants</Body>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {systemColors.map((color) => {
              const Icon = color.icon
              return (
                <div key={color.name} className="group">
                  <div
                    className={`aspect-[3/2] rounded-xl mb-1.5 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-[1.02] border ${borderClass}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className={`font-mono text-xs ${color.textColor} opacity-60`}>{color.displayHex}</span>
                    {Icon && (
                      <span className={`${color.textColor} opacity-40 mt-1`}>
                        <Icon size={12} weight="fill" />
                      </span>
                    )}
                  </div>
                  <Caption uppercase={false}>{color.name}</Caption>
                </div>
              )
            })}
          </div>
        </div>

      </DSSection>

      {/* Iconography */}
      <DSSection id="iconography" title="Iconography">
        <Body className={`mb-4 ${textMutedClass}`}>
          Icons from Phosphor Icons — a flexible icon family with multiple weights for visual hierarchy.
        </Body>

        {/* Icon Library */}
        <H4 className="mb-4">Icon Library</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex items-center gap-4 mb-6">
            <a
              href="https://phosphoricons.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg transition-colors ${
                isDark
                  ? 'bg-white/[0.06] hover:bg-white/[0.1] text-white/70'
                  : 'bg-black/[0.04] hover:bg-black/[0.08] text-gray-600'
              }`}
            >
              <Globe size={14} weight="regular" />
              phosphoricons.com
              <ArrowUpRight size={12} weight="bold" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Caption className="block mb-1" size="xs">Package</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>@phosphor-icons/react</p>
            </div>
            <div>
              <Caption className="block mb-1" size="xs">Icons</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>1,200+ available</p>
            </div>
            <div>
              <Caption className="block mb-1" size="xs">Weights Used</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>5 of 6</p>
            </div>
            <div>
              <Caption className="block mb-1" size="xs">License</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>MIT</p>
            </div>
          </div>
        </div>

        {/* Weights with Usage */}
        <H4 className="mb-6">Weights & When to Use</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              { weight: 'thin', label: 'Thin', use: 'Large decorative icons (40px+)', example: 'Data viz accents' },
              { weight: 'light', label: 'Light', use: 'Decorative, subtle UI elements', example: 'Card icons, close buttons' },
              { weight: 'regular', label: 'Regular', use: 'Default for all UI', example: 'Nav, buttons, actions' },
              { weight: 'bold', label: 'Bold', use: 'Small sizes, emphasis', example: 'Arrows at 10-12px' },
              { weight: 'fill', label: 'Fill', use: 'Active states, status indicators', example: 'Theme toggle, badges' },
            ].map(({ weight, label, use, example }) => (
              <div key={weight} className="py-3 first:pt-0 last:pb-0 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <Sun size={20} weight={weight} className={textHeadingClass} />
                </div>
                <span className={`col-span-2 font-satoshi text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{label}</span>
                <span className={`col-span-5 font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{use}</span>
                <span className={`col-span-4 font-satoshi text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{example}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Site Icons */}
        <H4 className="mb-6">Site Icons</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <Caption className="block mb-4">Navigation & Actions</Caption>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
            {[
              { icon: ArrowRight, name: 'ArrowRight', weight: 'regular' },
              { icon: ArrowUp, name: 'ArrowUp', weight: 'bold' },
              { icon: ArrowDown, name: 'ArrowDown', weight: 'bold' },
              { icon: ArrowUpRight, name: 'ArrowUpRight', weight: 'bold' },
              { icon: X, name: 'X', weight: 'light' },
              { icon: ListBullets, name: 'ListBullets', weight: 'bold' },
              { icon: MagnifyingGlass, name: 'Search', weight: 'regular' },
              { icon: ArrowsOut, name: 'ArrowsOut', weight: 'regular' },
            ].map(({ icon: Icon, name, weight }) => (
              <div key={name} className="text-center group">
                <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3 transition-colors ${isDark ? 'bg-white/[0.04] group-hover:bg-white/[0.08]' : 'bg-black/[0.02] group-hover:bg-black/[0.04]'}`}>
                  <Icon size={22} weight={weight} className={textHeadingClass} />
                </div>
                <span className="font-satoshi text-[13px] font-medium block">{name}</span>
                <span className={`font-satoshi text-[11px] block capitalize ${isDark ? 'text-white/40' : 'text-black/40'}`}>{weight}</span>
              </div>
            ))}
          </div>

          <Caption className="block mb-4">Status & Feedback</Caption>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
            {[
              { icon: CheckCircle, name: 'Success', weight: 'regular' },
              { icon: WarningCircle, name: 'Warning', weight: 'regular' },
              { icon: Info, name: 'Info', weight: 'regular' },
              { icon: CircleNotch, name: 'Loading', weight: 'light' },
              { icon: Sparkle, name: 'Sparkle', weight: 'light' },
              { icon: Medal, name: 'Medal', weight: 'fill' },
              { icon: TrendUp, name: 'TrendUp', weight: 'light' },
              { icon: Target, name: 'Target', weight: 'light' },
            ].map(({ icon: Icon, name, weight }) => (
              <div key={name} className="text-center group">
                <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3 transition-colors ${isDark ? 'bg-white/[0.04] group-hover:bg-white/[0.08]' : 'bg-black/[0.02] group-hover:bg-black/[0.04]'}`}>
                  <Icon size={22} weight={weight} className={textHeadingClass} />
                </div>
                <span className="font-satoshi text-[13px] font-medium block">{name}</span>
                <span className={`font-satoshi text-[11px] block capitalize ${isDark ? 'text-white/40' : 'text-black/40'}`}>{weight}</span>
              </div>
            ))}
          </div>

          <Caption className="block mb-4">Theme & Communication</Caption>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { icon: Sun, name: 'Sun', weight: 'fill' },
              { icon: Moon, name: 'Moon', weight: 'fill' },
              { icon: ChatCircle, name: 'Chat', weight: 'regular' },
              { icon: EnvelopeSimple, name: 'Email', weight: 'regular' },
              { icon: LinkedinLogo, name: 'LinkedIn', weight: 'regular' },
              { icon: Globe, name: 'Globe', weight: 'regular' },
              { icon: LinkSimple, name: 'Link', weight: 'bold' },
            ].map(({ icon: Icon, name, weight }) => (
              <div key={name} className="text-center group">
                <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3 transition-colors ${isDark ? 'bg-white/[0.04] group-hover:bg-white/[0.08]' : 'bg-black/[0.02] group-hover:bg-black/[0.04]'}`}>
                  <Icon size={22} weight={weight} className={textHeadingClass} />
                </div>
                <span className="font-satoshi text-[13px] font-medium block">{name}</span>
                <span className={`font-satoshi text-[11px] block capitalize ${isDark ? 'text-white/40' : 'text-black/40'}`}>{weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizing */}
        <H4 className="mb-6">Sizing</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { size: 10, use: 'Tight inline arrows', weight: 'bold' },
              { size: 14, use: 'Compact UI, tags', weight: 'regular' },
              { size: 20, use: 'Default size', weight: 'regular' },
              { size: 24, use: 'Buttons, feature cards', weight: 'light' },
              { size: 40, use: 'Data viz decorative', weight: 'thin' },
            ].map(({ size, use, weight }) => (
              <div key={size} className="text-center">
                <div className={`h-14 flex items-center justify-center mb-3`}>
                  <ArrowRight size={size} weight={weight} className={textHeadingClass} />
                </div>
                <span className="font-satoshi text-[13px] font-medium block">{size}px</span>
                <span className="font-satoshi text-[13px] font-medium block">{use}</span>
                <span className={`font-satoshi text-[11px] block capitalize ${isDark ? 'text-white/40' : 'text-black/40'}`}>{weight}</span>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      {/* Spacing */}
      <DSSection id="spacing" title="Spacing">
        <div className={`p-8 border ${borderClass} rounded-xl`}>
          <div className="space-y-6">
            {spacing.map((space) => (
              <div
                key={space.name}
                className="flex items-center gap-6"
              >
                <Caption className="w-12 text-right">{space.name}</Caption>
                <div
                  className="h-6 rounded transition-all duration-300 hover:opacity-80 theme-accent-bg"
                  style={{ width: space.value }}
                />
                <Caption className="text-gray-500 w-16">{space.value}</Caption>
                <Caption className="text-gray-600">{space.tailwind}</Caption>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      {/* Containers */}
      <DSSection id="containers" title="Containers">
        <Body className={`mb-8 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
          Three container styles serve different purposes. Choose based on the content's intent and how much visual prominence it needs.
        </Body>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* ChartContainer */}
          <div>
            <H4 className="mb-4">ChartContainer</H4>
            <ChartContainer className="h-[180px] flex items-center justify-center mb-4">
              <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                Subtle 2% fill
              </span>
            </ChartContainer>
            <div className="space-y-2">
              <Caption className="block">Use for</Caption>
              <Body size="sm">
                Data visualizations, charts, research findings, tables, article body content
              </Body>
            </div>
          </div>

          {/* FrostedCard */}
          <div>
            <H4 className="mb-4">FrostedCard</H4>
            <FrostedCard className="h-[180px] flex items-center justify-center mb-4">
              <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                Frosted glass + grain
              </span>
            </FrostedCard>
            <div className="space-y-2">
              <Caption className="block">Use for</Caption>
              <Body size="sm">
                Category cards, navigation, key stats, callouts, feature showcases
              </Body>
            </div>
          </div>

          {/* Transparent */}
          <div>
            <H4 className="mb-4">Transparent</H4>
            <div className={`h-[180px] flex items-center justify-center mb-4 rounded-2xl`}>
              <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                No background
              </span>
            </div>
            <div className="space-y-2">
              <Caption className="block">Use for</Caption>
              <Body size="sm">
                Kanban boards, flows, floating elements, content on hero backgrounds
              </Body>
            </div>
          </div>
        </div>

        {/* Specs Comparison */}
        <H4 className="mb-6">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Caption className="mb-4 block">ChartContainer</Caption>
              <div className="space-y-3">
                <div>
                  <Caption className="block mb-1" size="xs">Background</Caption>
                  <Body size="sm">2% white/black</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Border</Caption>
                  <Body size="sm">None</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Blur</Caption>
                  <Body size="sm">None</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Grain</Caption>
                  <Body size="sm">None</Body>
                </div>
              </div>
            </div>
            <div>
              <Caption className="mb-4 block">FrostedCard</Caption>
              <div className="space-y-3">
                <div>
                  <Caption className="block mb-1" size="xs">Background</Caption>
                  <Body size="sm">1.5% / 20% white</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Border</Caption>
                  <Body size="sm">1px at 8%</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Blur</Caption>
                  <Body size="sm">12px</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Grain</Caption>
                  <Body size="sm">8%/6% opacity</Body>
                </div>
              </div>
            </div>
            <div>
              <Caption className="mb-4 block">Transparent</Caption>
              <div className="space-y-3">
                <div>
                  <Caption className="block mb-1" size="xs">Background</Caption>
                  <Body size="sm">None</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Border</Caption>
                  <Body size="sm">None</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Blur</Caption>
                  <Body size="sm">None</Body>
                </div>
                <div>
                  <Caption className="block mb-1" size="xs">Grain</Caption>
                  <Body size="sm">None</Body>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Dividers */}
      <DSSection id="dividers" title="Dividers">
        <H4 className="mb-6">Horizontal</H4>
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

        <H4 className="mb-6">Vertical</H4>
        <div className={`p-8 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex items-center justify-center gap-8 h-24">
            <Body className={isDark ? 'text-white/60' : 'text-gray-600'}>Left</Body>
            <Divider orientation="vertical" />
            <Body className={isDark ? 'text-white/60' : 'text-gray-600'}>Right</Body>
          </div>
        </div>

        {/* Specs */}
        <H4 className="mb-6">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1" size="xs">Height/Width</Caption>
              <Body size="sm">1px</Body>
            </div>
            <div>
              <Caption className="block mb-1" size="xs">Color</Caption>
              <Body size="sm">Theme-aware via divider-color class</Body>
            </div>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
