import { H1, H2, H3, H4, Body, Caption } from '../../components/Typography'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'

const sections = [
  { id: 'typography', label: 'Typography' },
  { id: 'colors', label: 'Colors' },
  { id: 'spacing', label: 'Spacing' },
]

export default function FoundationPage() {
  const { isDark } = useTheme()

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'
  const textHeadingClass = isDark ? 'text-white' : 'text-gray-900'
  const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-500'

  // Soulful palette - Brand colors
  const soulfulPalette = [
    { name: 'Violet Twilight', hex: '#5B21B6', textColor: 'text-white' },
    { name: 'Bright Lavender', hex: '#C084FC', textColor: 'text-black' },
    { name: 'Dusty Rose', hex: '#D4A5A5', textColor: 'text-black' },
  ]

  // Blob shader colors - theme aware
  const blobColors = isDark ? [
    { name: 'Soft Lavender', hex: '#C4B5FD', textColor: 'text-black' },
    { name: 'Violet', hex: '#8B3AED', textColor: 'text-white' },
    { name: 'Amber/Gold (Accent)', hex: '#FBBF24', textColor: 'text-black' },
    { name: 'Soft Teal (Accent)', hex: '#5EEAD4', textColor: 'text-black' },
  ] : [
    { name: 'Light Lilac', hex: '#E4CCFF', textColor: 'text-black' },
    { name: 'Light Rose', hex: '#F5B8B8', textColor: 'text-black' },
    { name: 'Soft Sky Blue (Accent)', hex: '#93C5FD', textColor: 'text-black' },
    { name: 'Light Teal (Accent)', hex: '#99F6E4', textColor: 'text-black' },
  ]

  // System colors - theme aware
  const systemColors = [
    { name: 'Background', hex: isDark ? '#0A0A0A' : '#FAF8F4', displayHex: isDark ? '#0A0A0A' : '#FAF8F4', textColor: isDark ? 'text-white' : 'text-black' },
    { name: 'Primary Text', hex: isDark ? '#FFFFFF' : '#111827', displayHex: isDark ? '#FFFFFF' : '#111827', textColor: isDark ? 'text-black' : 'text-white' },
    { name: 'Body Text', hex: isDark ? '#9CA3AF' : '#4B5563', displayHex: isDark ? '#9CA3AF' : '#4B5563', textColor: 'text-white' },
    { name: 'Caption', hex: isDark ? '#6B7280' : '#9CA3AF', displayHex: isDark ? '#6B7280' : '#9CA3AF', textColor: 'text-white' },
    { name: 'Border', hex: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)', displayHex: isDark ? 'white/6%' : 'black/8%', textColor: isDark ? 'text-white' : 'text-black', isTransparent: true },
    { name: 'Card Surface', hex: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.2)', displayHex: isDark ? 'white/1.5%' : 'white/20%', textColor: isDark ? 'text-white' : 'text-black', isTransparent: true },
    { name: 'Error', hex: isDark ? '#EF4444' : '#DC2626', displayHex: isDark ? '#EF4444' : '#DC2626', textColor: 'text-white' },
    { name: 'Success', hex: isDark ? '#22C55E' : '#16A34A', displayHex: isDark ? '#22C55E' : '#16A34A', textColor: 'text-white' },
    { name: 'Warning', hex: isDark ? '#F59E0B' : '#D97706', displayHex: isDark ? '#F59E0B' : '#D97706', textColor: 'text-black' },
  ]


  const typography = [
    { component: 'Header 1', spec: '96px / Silk Serif', element: <H1>Header 1</H1> },
    { component: 'Header 2', spec: '36–48px / Satoshi', element: <H2>Header 2</H2> },
    { component: 'Header 3', spec: '24–36px / Satoshi', element: <H3>Header 3</H3> },
    { component: 'Header 4', spec: '20–24px / Satoshi', element: <H4>Header 4</H4> },
    { component: 'Body (Lg)', spec: '16–18px / Satoshi', element: <Body>Body text for paragraphs and descriptions.</Body> },
    { component: 'Body (Sm)', spec: '15px / Satoshi', element: <Body size="sm">Smaller body text for cards and secondary content.</Body> },
    { component: 'Caption', spec: '12px / Azeret Mono', element: <Caption>Metadata and small text</Caption> },
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
        <div className="space-y-8 mb-12">
          {typography.map((type) => (
            <div
              key={type.component}
              className={`grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 items-baseline border-b ${borderClass} pb-8`}
            >
              <div>
                <Caption className="block">{type.component}</Caption>
                <span className={`font-mono text-[11px] ${textMutedClass}`}>{type.spec}</span>
              </div>
              {type.element}
            </div>
          ))}
        </div>

        {/* Font Families */}
        <H4 className="mb-6">Font Families</H4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-8 border ${borderClass} rounded-xl`}>
            <p className={`font-silk text-2xl mb-3 ${textHeadingClass}`}>Silk Serif</p>
            <Caption>Header 1 only</Caption>
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
          <Body className={`mb-6 ${textMutedClass}`}>Soulful — emotional, warm, unconventional</Body>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {soulfulPalette.map((color) => (
              <div key={color.name} className="group">
                <div
                  className={`aspect-[3/2] rounded-xl mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={`font-mono text-xs ${color.textColor} opacity-60`}>{color.hex}</span>
                </div>
                <Caption uppercase={false}>{color.name}</Caption>
              </div>
            ))}
          </div>
        </div>

        {/* Blob Shader - Theme aware */}
        <div className="mb-12">
          <H4 className="mb-2">Blob Shader</H4>
          <Body className={`mb-6 ${textMutedClass}`}>FluidBlob gradient colors — switch theme to see variants</Body>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blobColors.map((color) => (
              <div key={color.name} className="group">
                <div
                  className={`aspect-[3/2] rounded-xl mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={`font-mono text-xs ${color.textColor} opacity-60`}>{color.hex}</span>
                </div>
                <Caption uppercase={false}>{color.name}</Caption>
              </div>
            ))}
          </div>
        </div>

        {/* System Colors - Theme aware */}
        <div className="mb-12">
          <H4 className="mb-2">System Colors</H4>
          <Body className={`mb-6 ${textMutedClass}`}>Functional UI colors — switch theme to see variants</Body>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {systemColors.map((color) => (
              <div key={color.name} className="group">
                <div
                  className={`aspect-[3/2] rounded-xl mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02] border ${borderClass}`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={`font-mono text-xs ${color.textColor} opacity-60`}>{color.displayHex}</span>
                </div>
                <Caption uppercase={false}>{color.name}</Caption>
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
                  className="h-6 rounded transition-all duration-300 hover:opacity-80"
                  style={{ width: space.value, backgroundColor: '#C084FC' }}
                />
                <Caption className="text-gray-500 w-16">{space.value}</Caption>
                <Caption className="text-gray-600">{space.tailwind}</Caption>
              </div>
            ))}
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
