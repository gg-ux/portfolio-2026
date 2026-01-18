import { useState, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Button, ButtonWithArrow } from '../../components/ui/Button'
import { Tag } from '../../components/ui'
import { Input, Textarea, Select } from '../../components/ui/Input'
import { Caption, H4, Paragraph } from '../../components/Typography'
import { MagnifyingGlass, PencilSimple, Code, Person, Moon, Sun, ArrowsOut, X, ArrowUpRight } from '@phosphor-icons/react'

const sections = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'inputs', label: 'Form Inputs' },
  { id: 'tags', label: 'Tags' },
  { id: 'loaders', label: 'Loaders' },
  { id: 'data-viz', label: 'Data Visualization' },
]

export default function ComponentsPage() {
  const { isDark } = useTheme()
  const [selectValue, setSelectValue] = useState('')
  const [flowChartExpanded, setFlowChartExpanded] = useState(false)
  const [loaderKey, setLoaderKey] = useState(0)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (flowChartExpanded) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [flowChartExpanded])

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'
  const bgSubtle = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'

  return (
    <DSLayout title="Components" sections={sections}>
      {/* Buttons */}
      <DSSection id="buttons" title="Buttons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Variants */}
          <div>
            <H4 className="mb-4">Variants</H4>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <H4 className="mb-4">Sizes</H4>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Interactions */}
        <H4 className="mb-2">Hover Interactions</H4>
        <Paragraph size="sm" className="mb-4">Arrow nudges in its direction on hover.</Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonWithArrow direction="right">Continue</ButtonWithArrow>
            <ButtonWithArrow direction="up">Back to Top</ButtonWithArrow>
            <ButtonWithArrow direction="external" external href="#">External</ButtonWithArrow>
          </div>
        </div>

      </DSSection>

      {/* Form Inputs */}
      <DSSection id="inputs" title="Form Inputs">
        {/* Text Input */}
        <H4 className="mb-2">Text Input</H4>
        <Paragraph size="sm" className="mb-4">Default, filled, and error states.</Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Input label="Name" />
            </div>
            <div>
              <Input label="Name" value="Grace" readOnly />
            </div>
            <div>
              <Input label="Email" value="grace@" error="Invalid email" readOnly />
            </div>
          </div>
        </div>

        {/* Multi-line */}
        <H4 className="mb-2">Multi-line</H4>
        <Paragraph size="sm" className="mb-4">Automatically expands as you type.</Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Textarea label="Message" rows={1} />
            </div>
            <div>
              <Textarea label="Message" defaultValue="I'd love to collaborate on..." rows={1} />
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <H4 className="mb-4">Dropdown</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Select
                label="Project Type"
                value=""
                onChange={() => {}}
                options={[{ value: '', label: 'Select an option...' }]}
              />
            </div>
            <div>
              <Select
                label="Project Type"
                value="design"
                onChange={() => {}}
                options={[{ value: 'design', label: 'Design System' }]}
              />
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

      </DSSection>

      {/* Loaders */}
      <DSSection id="loaders" title="Loaders">
        <H4 className="mb-2">Welcome Loader</H4>
        <Paragraph size="sm" className="mb-4">
          Page loader with progress ring, breathing logo, and bloom effect.
        </Paragraph>

        {/* Loader animation keyframes */}
        <style>{`
          @keyframes loader-ring-fill {
            0% { stroke-dashoffset: 245; }
            40%, 100% { stroke-dashoffset: 0; }
          }
          @keyframes loader-bloom {
            0%, 40% { opacity: 0; transform: scale(0.8); }
            60%, 80% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0; transform: scale(1.4); }
          }
          @keyframes loader-breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes loader-fade {
            0%, 10% { opacity: 0; filter: blur(8px); }
            25%, 75% { opacity: 1; filter: blur(0); }
            90%, 100% { opacity: 0; filter: blur(8px); }
          }
        `}</style>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`relative border ${borderClass} rounded-xl aspect-video`}>
            <div key={loaderKey} className="absolute inset-0 flex items-center justify-center">
              {/* Bloom glow */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 120,
                  height: 120,
                  background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(167, 139, 250, 0.2) 50%, transparent 70%)',
                  filter: 'blur(20px)',
                  animation: 'loader-bloom 4s ease-in-out',
                }}
              />
              {/* Progress ring */}
              <svg
                width={80}
                height={80}
                className="absolute"
                style={{
                  transform: 'rotate(-90deg)',
                  filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.5)) drop-shadow(0 0 16px rgba(15, 118, 110, 0.3))',
                  animation: 'loader-fade 4s ease-in-out',
                }}
              >
                <defs>
                  <linearGradient id="loaderGradientAnim">
                    <stop offset="0%" stopColor="#BF92F0" />
                    <stop offset="50%" stopColor="#0B96A3" />
                    <stop offset="100%" stopColor="#BF92F0" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="rotate"
                      from="0 0.5 0.5"
                      to="360 0.5 0.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
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
                  stroke="url(#loaderGradientAnim)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray={245}
                  style={{ animation: 'loader-ring-fill 4s ease-in-out' }}
                />
              </svg>
              {/* Logo */}
              <img
                src="/assets/branding/logo.svg"
                alt="Logo"
                className={`h-6 w-auto relative ${isDark ? 'invert' : ''}`}
                style={{ animation: 'loader-breathe 2s ease-in-out infinite, loader-fade 4s ease-in-out' }}
              />
            </div>
            <button
              onClick={() => setLoaderKey(k => k + 1)}
              className={`absolute bottom-4 right-4 font-mono text-xs px-3 py-1 rounded border transition-colors ${
                isDark ? 'border-white/20 text-white/60 hover:border-white/40' : 'border-black/20 text-gray-500 hover:border-black/40'
              }`}
            >
              Replay
            </button>
          </div>
        </div>
      </DSSection>

      {/* Data Visualization */}
      <DSSection id="data-viz" title="Data Visualization">
        <Paragraph className="mb-12 max-w-3xl">
          Clarity over complexity. Use color with intention—every element should help the viewer understand the data, not distract from it.
        </Paragraph>

        {/* Categorical Palette */}
        <H4 className="mb-2">Categorical Palette</H4>
        <Paragraph size="sm" className="mb-4">
          For multi-color charts. Uses the <a href="/design-system/foundation#brand-palette" className={`inline-flex items-center gap-1 underline underline-offset-2 ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}>Brand Palette <ArrowUpRight size={12} weight="bold" /></a> in order.
        </Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-wrap gap-3">
            {[
              { color: '#5835B0', name: 'Amethyst' },
              { color: '#BF92F0', name: 'Lilac' },
              { color: '#D78F8D', name: 'Rose' },
              { color: '#DBA166', name: 'Gold' },
              { color: '#36CBC6', name: 'Turquoise' },
              { color: '#0B96A3', name: 'Lagoon' },
              { color: '#87AA61', name: 'Peridot' },
              { color: '#2F7255', name: 'Forest' },
            ].map(({ color, name }) => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                <span className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Semantic Palette */}
          <div>
            <H4 className="mb-2">Semantic Palette</H4>
            <Paragraph size="sm" className="mb-4">For status indication.</Paragraph>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: isDark ? '#5c9a6a' : '#6aaa78' }} />
                  <span className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: isDark ? '#c45c5c' : '#d46a6a' }} />
                  <span className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Problem</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: isDark ? '#4a4a4a' : '#d0d0d0' }} />
                  <span className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Neutral</span>
                </div>
              </div>
            </div>
          </div>

          {/* Single Accent */}
          <div>
            <H4 className="mb-2">Single Accent</H4>
            <Paragraph size="sm" className="mb-4">Theme-aware.</Paragraph>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Moon size={14} weight="fill" className={isDark ? 'text-white/50' : 'text-black/50'} />
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#BF92F0' }} />
                  <span className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Lilac</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={14} weight="fill" className={isDark ? 'text-white/50' : 'text-black/50'} />
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#5835B0' }} />
                  <span className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Amethyst</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart Example */}
        <H4 className="mb-2">Horizontal Bars</H4>
        <Paragraph size="sm" className="mb-4">4px height, rounded ends, full-width track.</Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-6">
            {[
              { label: 'Research', value: 55, color: '#5835B0', icon: MagnifyingGlass },
              { label: 'Design', value: 31, color: '#BF92F0', icon: PencilSimple },
              { label: 'Development', value: 10, color: '#D78F8D', icon: Code },
            ].map(({ label, value, color, icon: Icon }) => (
              <div key={label} className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon size={20} weight="fill" style={{ color }} />
                </div>

                {/* Label, percentage, and bar */}
                <div className="flex-1 pt-0.5">
                  <div className="flex justify-between items-baseline mb-2">
                    <span
                      className="font-mono text-[11px] tracking-wide uppercase font-medium"
                      style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                    >
                      {value}%
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full w-full"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${value}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gantt Chart Example */}
        <H4 className="mb-2">Gantt Chart</H4>
        <Paragraph size="sm" className="mb-4">Timeline visualization with staggered phases.</Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex">
            {/* Phase labels */}
            <div className="w-20 flex flex-col justify-around pr-3 h-32">
              {['Planning', 'Design', 'Develop', 'Deliver'].map((phase) => (
                <span
                  key={phase}
                  className="font-mono text-[11px] tracking-wide uppercase text-right"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                >
                  {phase}
                </span>
              ))}
            </div>
            {/* Chart area */}
            <div className="flex-1 relative h-32">
              {/* Grid lines */}
              <div className="absolute inset-0 flex">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 border-l border-dashed"
                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}
                  />
                ))}
              </div>
              {/* Bars */}
              {[
                { start: 0, width: 25, color: '#5835B0', row: 0 },
                { start: 10, width: 35, color: '#BF92F0', row: 1 },
                { start: 40, width: 35, color: '#D78F8D', row: 2 },
                { start: 70, width: 25, color: '#DBA166', row: 3 },
              ].map(({ start, width, color, row }) => (
                <div
                  key={row}
                  className="absolute h-1 rounded-full"
                  style={{
                    top: `${row * 25 + 12.5}%`,
                    left: `${start}%`,
                    width: `${width}%`,
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Month labels */}
          <div className="flex mt-3 ml-20">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week) => (
              <span
                key={week}
                className="flex-1 font-mono text-[11px] tracking-wide"
                style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
              >
                {week}
              </span>
            ))}
          </div>
        </div>

        {/* Single Accent Chart Example */}
        <H4 className="mb-2">Single Accent Chart</H4>
        <Paragraph size="sm" className="mb-4 flex items-center gap-1 flex-wrap">
          <span>Highlight key data with theme-aware primary (Lilac</span>
          <Moon size={14} weight="fill" className="opacity-70" />
          <span>/ Amethyst</span>
          <Sun size={14} weight="fill" className="opacity-70" />
          <span>).</span>
        </Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          {(() => {
            const data = [
              { percent: 5.1, label: 'Age 19-34' },
              { percent: 7.6, label: 'Age 35-39' },
              { percent: 48.7, label: 'Age 40-54' },
              { percent: 38.4, label: 'Age 55-75' },
            ]
            const maxPercent = Math.max(...data.map(d => d.percent))
            const accentColor = isDark ? '#BF92F0' : '#5835B0'
            const grayColor = isDark ? '#ffffff' : '#6B7280'
            const getOpacity = (percent) => 0.2 + ((percent / maxPercent) * 0.4)

            return (
              <div className="flex justify-around items-end gap-4">
                {data.map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <Person
                      size={48}
                      weight="fill"
                      style={{
                        color: item.percent === maxPercent ? accentColor : grayColor,
                        opacity: item.percent === maxPercent ? 1 : getOpacity(item.percent),
                      }}
                    />
                    <span
                      className="text-xl tracking-normal mt-4 font-semibold"
                      style={{ fontFamily: 'Satoshi, sans-serif', color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)' }}
                    >
                      {item.percent}%
                    </span>
                    <span className={`font-mono text-[12px] mt-1 ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>

        {/* Flow Chart Example */}
        <H4 className="mb-2">Flow Chart</H4>
        <Paragraph size="sm" className="mb-4">Nodes, decisions, and semantic path colors. Tap to expand on mobile.</Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl relative`}>
          <svg width="100%" height="140" viewBox="0 0 400 140" fill="none">
            <defs>
              <marker id="arrow-neutral" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={isDark ? '#4a4a4a' : '#d0d0d0'} />
              </marker>
              <marker id="arrow-success" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={isDark ? '#5c9a6a' : '#6aaa78'} />
              </marker>
              <marker id="arrow-problem" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={isDark ? '#c45c5c' : '#d46a6a'} />
              </marker>
            </defs>

            {/* Start node */}
            <rect x="10" y="50" width="60" height="30" rx="6" fill={isDark ? '#252525' : '#ffffff'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
            <text x="40" y="70" textAnchor="middle" fill={isDark ? '#ffffff' : '#1f2937'} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Start</text>

            {/* Line to decision */}
            <path d="M 70 65 L 120 65" stroke={isDark ? '#4a4a4a' : '#d0d0d0'} strokeWidth="1.5" />

            {/* Decision diamond */}
            <path d="M 160 30 L 200 65 L 160 100 L 120 65 Z" fill={isDark ? '#252525' : '#ffffff'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
            <text x="160" y="69" textAnchor="middle" fill={isDark ? '#ffffff' : '#1f2937'} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Valid?</text>

            {/* Success path (Yes) */}
            <path d="M 200 65 L 230 65 Q 240 65, 240 50 L 240 35 Q 240 25, 250 25 L 280 25" stroke={isDark ? '#5c9a6a' : '#6aaa78'} strokeWidth="1.5" fill="none" markerEnd="url(#arrow-success)" />
            <text x="220" y="18" fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'} style={{ fontSize: '9px', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Yes</text>
            <rect x="290" y="10" width="70" height="30" rx="6" fill={isDark ? '#252525' : '#ffffff'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
            <text x="325" y="30" textAnchor="middle" fill={isDark ? '#ffffff' : '#1f2937'} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Success</text>

            {/* Problem path (No) */}
            <path d="M 200 65 L 230 65 Q 240 65, 240 80 L 240 95 Q 240 105, 250 105 L 280 105" stroke={isDark ? '#c45c5c' : '#d46a6a'} strokeWidth="1.5" fill="none" markerEnd="url(#arrow-problem)" />
            <text x="220" y="122" fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'} style={{ fontSize: '9px', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>No</text>
            <rect x="290" y="90" width="70" height="30" rx="6" fill={isDark ? '#252525' : '#ffffff'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
            <text x="325" y="110" textAnchor="middle" fill={isDark ? '#ffffff' : '#1f2937'} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Retry</text>
          </svg>

          {/* Legend */}
          <div className={`flex gap-6 mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#4a4a4a' : '#d0d0d0' }} />
              <span
                className="font-mono text-[11px] tracking-wide uppercase"
                style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}
              >
                Neutral
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#5c9a6a' : '#6aaa78' }} />
              <span
                className="font-mono text-[11px] tracking-wide uppercase"
                style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}
              >
                Success
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#c45c5c' : '#d46a6a' }} />
              <span
                className="font-mono text-[11px] tracking-wide uppercase"
                style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}
              >
                Problem
              </span>
            </div>
          </div>

          {/* Mobile expand button */}
          <button
            onClick={() => setFlowChartExpanded(true)}
            className={`absolute bottom-4 right-4 p-2 rounded-lg md:hidden ${
              isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
            }`}
          >
            <ArrowsOut size={20} />
          </button>
        </div>

        {/* Flow Chart Modal */}
        {flowChartExpanded && (
          <div className={`fixed inset-0 z-[9999] ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
            {/* Chart with pinch/zoom */}
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={3}
              centerOnInit={true}
              wheel={{ step: 0.1 }}
              panning={{ velocityDisabled: true }}
            >
              <TransformComponent
                wrapperStyle={{ width: '100%', height: '100%' }}
                contentStyle={{ width: 'fit-content', height: 'fit-content' }}
              >
                <svg width="400" height="140" viewBox="0 0 400 140" fill="none">
                  <defs>
                    <marker id="modal-arrow-neutral" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={isDark ? '#4a4a4a' : '#d0d0d0'} />
                    </marker>
                    <marker id="modal-arrow-success" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={isDark ? '#5c9a6a' : '#6aaa78'} />
                    </marker>
                    <marker id="modal-arrow-problem" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill={isDark ? '#c45c5c' : '#d46a6a'} />
                    </marker>
                  </defs>
                  <rect x="10" y="50" width="60" height="30" rx="6" fill={isDark ? '#252525' : '#ffffff'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
                  <text x="40" y="70" textAnchor="middle" fill={isDark ? '#ffffff' : '#1f2937'} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Start</text>
                  <path d="M 70 65 L 120 65" stroke={isDark ? '#4a4a4a' : '#d0d0d0'} strokeWidth="1.5" />
                  <path d="M 160 30 L 200 65 L 160 100 L 120 65 Z" fill={isDark ? '#252525' : '#ffffff'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
                  <text x="160" y="69" textAnchor="middle" fill={isDark ? '#ffffff' : '#1f2937'} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Valid?</text>
                  <path d="M 200 65 L 230 65 Q 240 65, 240 50 L 240 35 Q 240 25, 250 25 L 280 25" stroke={isDark ? '#5c9a6a' : '#6aaa78'} strokeWidth="1.5" fill="none" markerEnd="url(#modal-arrow-success)" />
                  <text x="220" y="18" fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'} style={{ fontSize: '9px', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Yes</text>
                  <rect x="290" y="10" width="70" height="30" rx="6" fill={isDark ? '#252525' : '#ffffff'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
                  <text x="325" y="30" textAnchor="middle" fill={isDark ? '#ffffff' : '#1f2937'} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Success</text>
                  <path d="M 200 65 L 230 65 Q 240 65, 240 80 L 240 95 Q 240 105, 250 105 L 280 105" stroke={isDark ? '#c45c5c' : '#d46a6a'} strokeWidth="1.5" fill="none" markerEnd="url(#modal-arrow-problem)" />
                  <text x="220" y="122" fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'} style={{ fontSize: '9px', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>No</text>
                  <rect x="290" y="90" width="70" height="30" rx="6" fill={isDark ? '#252525' : '#ffffff'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} strokeWidth="1.5" />
                  <text x="325" y="110" textAnchor="middle" fill={isDark ? '#ffffff' : '#1f2937'} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Retry</text>
                </svg>
              </TransformComponent>
            </TransformWrapper>

            {/* Fixed Header */}
            <div className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
              <h2 className={`font-satoshi text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Flow Chart
              </h2>
              <button
                onClick={() => setFlowChartExpanded(false)}
                className={`p-2 rounded-lg ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Fixed Legend */}
            <div className={`fixed bottom-0 left-0 right-0 z-10 px-4 py-4 border-t ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#FAF8F4] border-black/10'}`}>
              <div className="flex gap-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#4a4a4a' : '#d0d0d0' }} />
                  <span className="font-mono text-[11px] tracking-wide uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}>Neutral</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#5c9a6a' : '#6aaa78' }} />
                  <span className="font-mono text-[11px] tracking-wide uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}>Success</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#c45c5c' : '#d46a6a' }} />
                  <span className="font-mono text-[11px] tracking-wide uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}>Problem</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DSSection>
    </DSLayout>
  )
}
