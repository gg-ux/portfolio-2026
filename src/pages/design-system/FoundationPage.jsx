import { H4, Body, Caption, SubtleContainer, Text, Display, Heading, Paragraph, Label, Mono } from '../../components/Typography'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Divider, SectionDivider } from '../../components/ui/Divider'
import { FrostedContainer } from '../../components/ui'
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

  // Soulful palette - Brand colors with primary/secondary roles (theme-aware)
  // Amethyst is optimized for both modes: #5835B0 (light) → #8B6AFF (dark)
  const soulfulPalette = [
    { name: 'Amethyst', hex: isDark ? '#8B6AFF' : '#5835B0', textColor: isDark ? 'text-black' : 'text-white', role: 'primary' },
    { name: 'Lilac', hex: '#BF92F0', textColor: 'text-black', role: 'secondary' },
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
    { name: 'Border', hex: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)', displayHex: isDark ? 'white/6%' : 'black/8%', textColor: isDark ? 'text-white' : 'text-black', isTransparent: true },
    { name: 'Card Surface', hex: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.2)', displayHex: isDark ? 'white/1.5%' : 'white/20%', textColor: isDark ? 'text-white' : 'text-black', isTransparent: true },
    { name: 'Error', hex: isDark ? '#c45c5c' : '#d46a6a', displayHex: isDark ? '#c45c5c' : '#d46a6a', textColor: 'text-white' },
    { name: 'Success', hex: isDark ? '#5c9a6a' : '#6aaa78', displayHex: isDark ? '#5c9a6a' : '#6aaa78', textColor: 'text-white' },
    { name: 'Warning', hex: isDark ? '#F59E0B' : '#D97706', displayHex: isDark ? '#F59E0B' : '#D97706', textColor: 'text-black' },
    { name: 'Dark Mode', hex: '#A78BFA', displayHex: '#A78BFA', textColor: 'text-black', icon: Moon },
    { name: 'Light Mode', hex: '#F59E0B', displayHex: '#F59E0B', textColor: 'text-black', icon: Sun },
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
        <Paragraph className="mb-12 max-w-3xl">
          Warm but not loud. Confident enough to lead, quiet enough to let the work speak. Fluid scaling across themes keeps things consistent without being rigid.
        </Paragraph>

        {/* Font Families */}
        <H4 className="mb-6">Font Families</H4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className={`p-8 border ${borderClass} rounded-xl`}>
            <div className="h-12 flex items-end mb-4">
              <Text family="serif" size="2xl" color="heading" className="leading-none whitespace-nowrap">Silk Serif</Text>
            </div>
            <div className="font-silk text-sm theme-caption leading-relaxed space-y-1">
              <p className="break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="break-all">abcdefghijklmnopqrstuvwxyz</p>
              <p>0123456789</p>
            </div>
          </div>
          <div className={`p-8 border ${borderClass} rounded-xl`}>
            <div className="h-12 flex items-end mb-4">
              <Text family="sans" size="2xl" color="heading" className="leading-none whitespace-nowrap">Satoshi</Text>
            </div>
            <div className="font-satoshi text-sm theme-caption leading-relaxed space-y-1">
              <p className="break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="break-all">abcdefghijklmnopqrstuvwxyz</p>
              <p>0123456789</p>
            </div>
          </div>
          <div className={`p-8 border ${borderClass} rounded-xl`}>
            <div className="h-12 flex items-end mb-4">
              <Text family="mono" size="xl" color="heading" className="leading-none whitespace-nowrap">Azeret Mono</Text>
            </div>
            <div className="font-mono text-xs theme-caption leading-relaxed space-y-1 tracking-wide normal-case">
              <p className="break-all uppercase">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              <p className="break-all">abcdefghijklmnopqrstuvwxyz</p>
              <p>0123456789</p>
            </div>
          </div>
        </div>

        {/* Type Styles */}
        <H4 className="mb-6">Type Styles</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-12`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {/* Display */}
            <div className="py-6 first:pt-0">
              <Display size="lg" className="!text-5xl mb-3">Display</Display>
              <div className="flex items-baseline gap-4 flex-wrap">
                <Text family="mono" size="caption" color="caption" tracking="wide">Silk Serif</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">4XL</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Normal 400</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Heading</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Tight</Text>
              </div>
            </div>

            {/* Heading */}
            <div className="py-6">
              <Heading level={2} className="mb-3">Heading</Heading>
              <div className="flex items-baseline gap-4 flex-wrap">
                <Text family="mono" size="caption" color="caption" tracking="wide">Satoshi</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">3XL–L</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Normal 400</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Heading</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Tight</Text>
              </div>
            </div>

            {/* Paragraph */}
            <div className="py-6">
              <Paragraph className="mb-3">Paragraph</Paragraph>
              <div className="flex items-center gap-4 flex-wrap">
                <Text family="mono" size="caption" color="caption" tracking="wide">Satoshi</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">M</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <span className="flex items-center gap-1.5">
                  <Moon size={10} weight="fill" className="text-[#A78BFA]" />
                  <Text family="mono" size="caption" color="caption" tracking="wide">400</Text>
                  <Sun size={10} weight="fill" className="text-[#F59E0B]" />
                  <Text family="mono" size="caption" color="caption" tracking="wide">450</Text>
                </span>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Body</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Normal</Text>
              </div>
            </div>

            {/* Paragraph 2 */}
            <div className="py-6">
              <Text color="body" className="mb-3 block text-[15px]">Paragraph 2</Text>
              <div className="flex items-center gap-4 flex-wrap">
                <Text family="mono" size="caption" color="caption" tracking="wide">Satoshi</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">S</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <span className="flex items-center gap-1.5">
                  <Moon size={10} weight="fill" className="text-[#A78BFA]" />
                  <Text family="mono" size="caption" color="caption" tracking="wide">400</Text>
                  <Sun size={10} weight="fill" className="text-[#F59E0B]" />
                  <Text family="mono" size="caption" color="caption" tracking="wide">450</Text>
                </span>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Body</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Normal</Text>
              </div>
            </div>

            {/* Label */}
            <div className="py-6">
              <Label className="mb-3 block">Label</Label>
              <div className="flex items-baseline gap-4 flex-wrap">
                <Text family="mono" size="caption" color="caption" tracking="wide">Satoshi</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">XS</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Medium 500</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Body</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Normal</Text>
              </div>
            </div>

            {/* Mono Caption */}
            <div className="py-6">
              <Mono uppercase className="mb-3 block">Mono Caption</Mono>
              <div className="flex items-baseline gap-4 flex-wrap">
                <Text family="mono" size="caption" color="caption" tracking="wide">Azeret Mono</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">2XS</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Normal 400</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Caption</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Wide</Text>
              </div>
            </div>

            {/* Mono Muted */}
            <div className="py-6 last:pb-0">
              <Text family="mono" size="caption" color="muted" className="mb-3 block">Mono Muted</Text>
              <div className="flex items-center gap-4 flex-wrap">
                <Text family="mono" size="caption" color="caption" tracking="wide">Azeret Mono</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">2XS</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <span className="flex items-center gap-1.5">
                  <Moon size={10} weight="fill" className="text-[#A78BFA]" />
                  <Text family="mono" size="caption" color="caption" tracking="wide">400</Text>
                  <Sun size={10} weight="fill" className="text-[#F59E0B]" />
                  <Text family="mono" size="caption" color="caption" tracking="wide">450</Text>
                </span>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Muted</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">·</Text>
                <Text family="mono" size="caption" color="caption" tracking="wide">Normal</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Size Scale */}
        <H4 className="mb-6">Size</H4>
        <div className={`pt-3 pb-6 px-6 border ${borderClass} rounded-xl mb-12`}>
          {/* Size Scale - 3x3 on mobile/tablet, baseline-aligned 9-col on desktop */}
          {(() => {
            const sizes = [
              { name: 'display', label: '4XL', size: '60–128px' },
              { name: 'h1', label: '3XL', size: '40–72px' },
              { name: 'h2', label: '2XL', size: '32–48px' },
              { name: 'h3', label: 'XL', size: '24–30px' },
              { name: 'h4', label: 'L', size: '20px' },
              { name: 'body', label: 'M', size: '16–17px' },
              { label: 'S', size: '15px', customClass: 'text-[15px]' },
              { name: 'label', label: 'XS', size: '13px' },
              { name: 'caption', label: '2XS', size: '11px' },
            ]
            return (
              <>
                {/* Mobile/Tablet: 3x3 grid with baseline alignment per row */}
                <div className="lg:hidden space-y-6">
                  {[0, 3, 6].map((startIdx) => {
                    const rowSizes = sizes.slice(startIdx, startIdx + 3)
                    return (
                      <div key={startIdx}>
                        <div className="grid grid-cols-3 items-baseline">
                          {rowSizes.map(({ name, label, customClass }) => (
                            <div key={label} className="text-center">
                              <Text size={name} color="heading" className={customClass || ''}>Aa</Text>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 -mt-1">
                          {rowSizes.map(({ label, size }) => (
                            <div key={label} className="text-center">
                              <Label className="block">{label}</Label>
                              <Text family="mono" size="caption" color="muted">{size}</Text>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Desktop: baseline-aligned 9-col */}
                <div className="hidden lg:block">
                  <div className="grid items-baseline" style={{ gridTemplateColumns: '2.5fr 1.8fr 1.4fr 1.2fr 1fr 1fr 1fr 1fr 1fr' }}>
                    {sizes.map(({ name, label, customClass }) => (
                      <div key={label} className="text-center">
                        <Text size={name} color="heading" className={customClass || ''}>Aa</Text>
                      </div>
                    ))}
                  </div>
                  <div className="grid -mt-5" style={{ gridTemplateColumns: '2.5fr 1.8fr 1.4fr 1.2fr 1fr 1fr 1fr 1fr 1fr' }}>
                    {sizes.map(({ label, size }) => (
                      <div key={label} className="text-center">
                        <Label className="block">{label}</Label>
                        <Text family="mono" size="caption" color="muted">{size}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )
          })()}
        </div>

        {/* Weight */}
        <H4 className="mb-6">Weight</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-12`}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { label: 'Light', value: 300 },
              { label: 'Normal', value: 400 },
              { label: 'Medium', value: 500 },
              { label: 'Semibold', value: 600 },
              { label: 'Bold', value: 700 },
            ].map(({ label, value }) => (
              <div key={value} className="text-center">
                <Text size="h3" color="heading" className="block mb-3" style={{ fontWeight: value }}>Aa</Text>
                <Label className="block leading-none">{label}</Label>
                <Text family="mono" size="caption" color="muted" className="leading-none">{value}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking */}
        <H4 className="mb-6">Tracking</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-12`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              { tracking: 'tighter', use: 'Display headlines' },
              { tracking: 'tight', use: 'Headings' },
              { tracking: 'normal', use: 'Body text' },
              { tracking: 'wide', use: 'Captions, labels' },
              { tracking: 'wider', use: 'Small uppercase' },
            ].map(({ tracking, use }) => (
              <div key={tracking} className="py-3 first:pt-0 last:pb-0 grid grid-cols-12 gap-4 items-center">
                <Text size="base" tracking={tracking} color="heading" className="col-span-3">GOOEY</Text>
                <Text family="mono" size="xs" color="body" tracking="wide" className="col-span-3">{tracking}</Text>
                <Text size="label" color="body" className="col-span-6">{use}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* Text Color */}
        <H4 className="mb-6">Text Color</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-12`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              { color: 'heading', hex: isDark ? '#FFFFFF' : '#1A1A1A', use: 'Titles, headings, emphasis' },
              { color: 'body', hex: isDark ? '#D4D4D4' : '#3A3A3A', use: 'Paragraphs, descriptions' },
              { color: 'caption', hex: isDark ? '#A3A3A3' : '#5A5A5A', use: 'Metadata, labels, timestamps' },
              { color: 'muted', hex: isDark ? '#737373' : '#8A8A8A', use: 'Subtle, de-emphasized text' },
            ].map(({ color, hex, use }) => (
              <div key={color} className="py-3 first:pt-0 last:pb-0 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <span className={`w-3 h-3 rounded theme-${color}`} style={{ backgroundColor: 'currentColor' }} />
                  <Text family="mono" size="caption" color={color}>{hex}</Text>
                </div>
                <Text family="mono" size="caption" color="body" tracking="wide" className="col-span-3">{color}</Text>
                <Text size="label" color="body" className="col-span-6">{use}</Text>
              </div>
            ))}
          </div>
        </div>

      </DSSection>

      {/* Colors */}
      <DSSection id="colors" title="Colors">
        <Paragraph className="mb-12 max-w-3xl">
          Organic, dreamy, yet grounded. Pulled from golden hour hikes, California sunsets, wildflowers, and ocean views.
        </Paragraph>

        {/* Brand Palette */}
        <div id="brand-palette" className="mb-12">
          <H4 className="mb-2">Brand Palette</H4>
          <Paragraph size="sm" className="mb-4">Soulful — emotional, warm, unconventional</Paragraph>
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
                  <Mono uppercase>{color.name}</Mono>
                </div>
              )
            })}
          </div>
        </div>

        {/* Blob Shader - Theme aware */}
        <div className="mb-12">
          <H4 className="mb-2">Blob Shader</H4>
          <Paragraph size="sm" className="mb-4">FluidBlob gradient colors — switch theme to see variants</Paragraph>
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
                <Mono uppercase>{color.name}</Mono>
              </div>
            ))}
          </div>
        </div>

        {/* System Colors - Theme aware */}
        <div className="mb-12">
          <H4 className="mb-2">System Colors</H4>
          <Paragraph size="sm" className="mb-4">Functional UI colors — switch theme to see variants</Paragraph>
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
                  <Mono uppercase>{color.name}</Mono>
                </div>
              )
            })}
          </div>
        </div>

      </DSSection>

      {/* Iconography */}
      <DSSection id="iconography" title="Iconography">
        <Paragraph className="mb-12 max-w-3xl">
          Icons from Phosphor Icons — a flexible icon family with multiple weights for visual hierarchy.
        </Paragraph>

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
              <Text size="label" color="body">@phosphor-icons/react</Text>
            </div>
            <div>
              <Caption className="block mb-1" size="xs">Icons</Caption>
              <Text size="label" color="body">1,200+ available</Text>
            </div>
            <div>
              <Caption className="block mb-1" size="xs">Weights Used</Caption>
              <Text size="label" color="body">5 of 6</Text>
            </div>
            <div>
              <Caption className="block mb-1" size="xs">License</Caption>
              <Text size="label" color="body">MIT</Text>
            </div>
          </div>
        </div>

        {/* Weights with Usage */}
        <H4 className="mb-6">Icon Weights</H4>
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
                  <Sun size={20} weight={weight} className="theme-heading" />
                </div>
                <Text family="mono" size="caption" color="body" tracking="wide" className="col-span-2 uppercase">{label}</Text>
                <Label className="col-span-5">{use}</Label>
                <Label muted className="col-span-4">{example}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Site Icons */}
        <H4 className="mb-6">Site Icons</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-6">
            {[
              { icon: ArrowRight, name: 'ArrowRight' },
              { icon: ArrowUp, name: 'ArrowUp' },
              { icon: ArrowDown, name: 'ArrowDown' },
              { icon: ArrowUpRight, name: 'ArrowUpRight' },
              { icon: X, name: 'X' },
              { icon: ListBullets, name: 'ListBullets' },
              { icon: MagnifyingGlass, name: 'Search' },
              { icon: ArrowsOut, name: 'ArrowsOut' },
              { icon: CheckCircle, name: 'CheckCircle' },
              { icon: WarningCircle, name: 'WarningCircle' },
              { icon: Info, name: 'Info' },
              { icon: CircleNotch, name: 'CircleNotch' },
              { icon: Sparkle, name: 'Sparkle' },
              { icon: Sun, name: 'Sun' },
              { icon: Moon, name: 'Moon' },
              { icon: ChatCircle, name: 'ChatCircle' },
              { icon: EnvelopeSimple, name: 'EnvelopeSimple' },
              { icon: LinkedinLogo, name: 'LinkedinLogo' },
              { icon: Globe, name: 'Globe' },
              { icon: LinkSimple, name: 'LinkSimple' },
            ].map(({ icon: Icon, name }) => (
              <div key={name} className="text-center">
                <Icon size={24} weight="regular" className="theme-heading mx-auto mb-3" />
                <Label className="block leading-none">{name}</Label>
              </div>
            ))}
          </div>
        </div>

      </DSSection>

      {/* Spacing */}
      <DSSection id="spacing" title="Spacing">
        <Paragraph className="mb-12 max-w-3xl">
          Built on a 4px base unit with a geometric scale. Smaller values for tight component internals, larger values for section separation and breathing room.
        </Paragraph>
        <div className={`p-8 border ${borderClass} rounded-xl`}>
          <div className="space-y-6">
            {spacing.map((space) => (
              <div
                key={space.name}
                className="flex items-center gap-6"
              >
                <Mono size="xs" color="caption" className="w-12 text-right">{space.name}</Mono>
                <div
                  className="h-6 rounded transition-all duration-300 hover:opacity-80 theme-accent-bg"
                  style={{ width: space.value }}
                />
                <Mono size="xs" color="muted" className="w-16">{space.value}</Mono>
                <Mono size="xs" color="muted">{space.tailwind}</Mono>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      {/* Containers */}
      <DSSection id="containers" title="Containers">
        <Paragraph className="mb-12 max-w-3xl">
          Three container styles serve different purposes. Choose based on the content's intent and how much visual prominence it needs.
        </Paragraph>

        {/* Container Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SubtleContainer */}
          <div>
            <H4 className="mb-2">Subtle</H4>
            <Paragraph size="sm" className="mb-6">Charts, data visualizations, research findings, article content</Paragraph>
            <SubtleContainer className="h-[160px] flex items-center justify-center">
              <Mono size="xs" color="muted">2% fill</Mono>
            </SubtleContainer>
          </div>

          {/* FrostedContainer */}
          <div>
            <H4 className="mb-2">Frosted</H4>
            <Paragraph size="sm" className="mb-6">Category cards, navigation, key stats, feature showcases</Paragraph>
            <FrostedContainer className="h-[160px] flex items-center justify-center">
              <Mono size="xs" color="muted">Glass + blur</Mono>
            </FrostedContainer>
          </div>

          {/* Transparent */}
          <div>
            <H4 className="mb-2">Transparent</H4>
            <Paragraph size="sm" className="mb-6">Flows, floating elements, content on hero backgrounds</Paragraph>
            <div className={`h-[160px] flex items-center justify-center rounded-2xl border border-dashed ${borderClass}`}>
              <Mono size="xs" color="muted">Transparent</Mono>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Dividers */}
      <DSSection id="dividers" title="Dividers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Horizontal */}
          <div>
            <H4 className="mb-4">Horizontal</H4>
            <div className={`p-6 border ${borderClass} rounded-xl flex flex-col items-center gap-4`}>
              <Text color="body">Top</Text>
              <Divider className="w-full" />
              <Text color="body">Bottom</Text>
            </div>
          </div>

          {/* Vertical */}
          <div>
            <H4 className="mb-4">Vertical</H4>
            <div className={`p-6 border ${borderClass} rounded-xl flex items-center justify-center gap-8`}>
              <Text color="body">Left</Text>
              <Divider orientation="vertical" className="h-12" />
              <Text color="body">Right</Text>
            </div>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
