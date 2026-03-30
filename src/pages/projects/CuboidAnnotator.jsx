/**
 * Cuboid Annotator - Secret Project Page
 * 3D annotation tool for autonomous vehicle data labeling
 */

import { useState } from 'react'
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSubsection,
  ProjectText,
  ProjectList,
  ProjectCallout,
  ProjectVideo,
  ProjectImageFullWidth,
} from '../../components/project'
import { Body, ChartTitle } from '../../components/Typography'
import { Button } from '../../components/ui/Button'
import { useTheme } from '../../context/ThemeContext'
import {
  TrendUp,
  TrendDown,
  Lightning,
  Keyboard,
  ChartLineDown,
  ArrowsOut,
  SidebarSimple,
  FloppyDisk,
  Monitor,
  Palette,
  Command,
  CursorClick,
  Eye,
  Crosshair,
  Target,
  Stack,
  ArrowCounterClockwise,
  CaretDown,
  Bug,
  Copy,
  ToggleRight,
  Info,
  CloudArrowDown,
  MagnifyingGlass,
  Cube,
  ArrowsOutCardinal,
  FilmStrip,
  CheckCircle,
  Check,
  X,
  SquaresFour,
  Play,
  VideoCamera,
  Users,
  ChartBar,
  Eyeglasses,
  GridFour,
  SlidersHorizontal,
  Presentation,
} from '@phosphor-icons/react'
import { getColor } from '../../constants/colors'

// Password protection
const PROJECT_PASSWORD = 'deepdive888'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'discovery', label: 'Understanding the Problem' },
  { id: 'principles', label: 'Design Principles' },
  { id: 'solution', label: 'The Solution' },
  { id: 'features', label: 'Key Flows & Features' },
  { id: 'impact', label: 'Impact' },
]

export default function CuboidAnnotator() {
  const { isDark } = useTheme()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('portfolioAuth') === 'true'
  })
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordInput === PROJECT_PASSWORD) {
      sessionStorage.setItem('portfolioAuth', 'true')
      setIsAuthenticated(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  // Password screen
  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'
        }`}
      >
        <form
          onSubmit={handlePasswordSubmit}
          className={`p-10 rounded-2xl text-center max-w-[400px] w-full mx-4 ${
            isDark
              ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/[0.08]'
              : 'bg-white/90 backdrop-blur-xl shadow-2xl'
          }`}
        >
          <h2 className="font-satoshi text-xl font-semibold theme-heading mb-2">
            Enter password to continue
          </h2>
          <p className="font-satoshi text-base theme-muted mb-6">
            Full case study is confidential
          </p>
          <input
            type="password"
            className={`w-full h-12 px-4 rounded-lg font-satoshi text-base mb-3 outline-none transition-colors ${
              isDark
                ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/40 focus:border-white/20'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400'
            } ${passwordError ? '!border-red-500' : ''}`}
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoFocus
          />
          <Button type="submit" variant="primary" className="w-full h-12">
            Continue
          </Button>
          {passwordError && (
            <p className="text-red-500 text-sm mt-3">Incorrect password</p>
          )}
        </form>
      </div>
    )
  }

  return (
    <ProjectLayout sections={sections}>
      <ProjectHero
        company="AI Data Startup"
        title="3D Cuboid Annotation Tool"
        description="I redesigned precision workflows for autonomous vehicle data labeling. As the sole product designer, I transformed an engineer-built tool into an interface optimized for annotators, improving productivity by 33% and dramatically improving usability and accessibility."
        role="Lead Product Designer"
        timeline="2025"
        impact="33% increase in productivity"
        tools="Figma Make, Claude Code"
        coverImage="/assets/projects/cuboid-annotator/cover.webp"
        darkBanner
        darkBg
      >
        <a
          href="/project/ai-tool/presentation"
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-wide transition-all duration-300 ${
            isDark
              ? 'bg-white/[0.04] border border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:text-white/80 hover:border-white/[0.12]'
              : 'bg-black/[0.03] border border-black/[0.06] text-black/50 hover:bg-black/[0.05] hover:text-black/70 hover:border-black/[0.10]'
          }`}
        >
          <Presentation size={16} weight="regular" />
          <span>View as Presentation</span>
        </a>
      </ProjectHero>

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          This AI data startup provides labeled training data for autonomous vehicles. Their cuboid annotation tool lets workers draw 3D bounding boxes around objects in LiDAR point cloud data, training the perception models that help self-driving cars understand their environment.
        </ProjectText>

        <ProjectText>
          The workflow is demanding: hundreds of objects per hour across thousands of frames. Every UI inefficiency costs the business more. Every labeling error degrades model training and impacts vehicle safety.
        </ProjectText>

        <ProjectCallout>
          I joined as the sole product designer. The tool had been built by engineers focused on functionality, not usability. My goal was to make annotators faster and reduce errors.
        </ProjectCallout>

        <ProjectSubsection title="The Core Workflow">
          {/* Desktop: Horizontal layout (6 columns) */}
          <div className="hidden xl:grid grid-cols-6 gap-6 mb-8">
            {[
              { icon: CloudArrowDown, label: 'Load a scene', desc: 'A 360° point cloud captured by roof-mounted LiDAR sensors', colorKey: 'amethyst' },
              { icon: MagnifyingGlass, label: 'Identify objects', desc: 'Vehicles, pedestrians, cyclists, signs, and other objects', colorKey: 'lilac' },
              { icon: Cube, label: 'Draw cuboids', desc: '3D bounding boxes that tightly fit each object', colorKey: 'rose' },
              { icon: ArrowsOutCardinal, label: 'Adjust precisely', desc: 'Position, rotate, and scale to sub-meter accuracy', colorKey: 'gold' },
              { icon: FilmStrip, label: 'Track across frames', desc: 'Link the same object as it moves through sequential frames', colorKey: 'peridot' },
              { icon: CheckCircle, label: 'Submit for QA', desc: 'Work is reviewed for accuracy before training', colorKey: 'turquoise' },
            ].map((item) => {
              const Icon = item.icon
              const color = getColor(item.colorKey, isDark)
              return (
                <div key={item.label} className="text-center">
                  {/* Icon with colored background */}
                  <div className="relative w-12 h-12 mx-auto mb-4">
                    <div
                      className="relative z-10 w-full h-full rounded-full flex items-center justify-center"
                      style={{ color, backgroundColor: `${color}18` }}
                    >
                      <Icon size={24} weight="regular" />
                    </div>
                    {/* Glass border frame */}
                    <div
                      className={`absolute -inset-1 rounded-full border ${
                        isDark
                          ? 'border-white/[0.08] bg-white/[0.02]'
                          : 'border-black/[0.05] bg-black/[0.01]'
                      }`}
                    />
                  </div>
                  {/* Title */}
                  <h4
                    className="font-satoshi font-semibold text-base mb-2"
                    style={{ color: isDark ? '#F3F4F6' : '#111827' }}
                  >
                    {item.label}
                  </h4>
                  {/* Description */}
                  <p
                    className="font-satoshi text-sm leading-relaxed"
                    style={{ color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Mobile/Tablet: Vertical list */}
          <div className="xl:hidden space-y-3 mb-8">
            {[
              { icon: CloudArrowDown, label: 'Load a scene', desc: 'A 360° point cloud captured by roof-mounted LiDAR sensors' },
              { icon: MagnifyingGlass, label: 'Identify objects', desc: 'Vehicles, pedestrians, cyclists, signs, and other objects' },
              { icon: Cube, label: 'Draw cuboids', desc: '3D bounding boxes that tightly fit each object' },
              { icon: ArrowsOutCardinal, label: 'Adjust precisely', desc: 'Position, rotate, and scale to sub-meter accuracy' },
              { icon: FilmStrip, label: 'Track across frames', desc: 'Link the same object as it moves through sequential frames' },
              { icon: CheckCircle, label: 'Submit for QA', desc: 'Work is reviewed for accuracy before training' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-start gap-3">
                  <Icon
                    size={20}
                    weight="regular"
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}
                  />
                  <p className="font-satoshi text-[15px] md:text-base" style={{ color: isDark ? '#D1D5DB' : '#3A3A3A' }}>
                    <strong>{item.label}:</strong> {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </ProjectSubsection>
      </ProjectSection>

      {/* Discovery */}
      <ProjectSection id="discovery" title="Understanding the Problem">
        <ProjectImageFullWidth
          src="/assets/projects/cuboid-annotator/old-design.png"
          alt="The original cuboid annotation interface"
          caption="The original interface (Oct 2024)"
          glassBorder
          darkBg
        />

        <ProjectText>
          When I joined, the existing tool had grown organically over years of engineering-driven development. It worked, but it wasn't designed for the humans using it 40+ hours per week. I conducted a three-part audit to understand the problem space.
        </ProjectText>

        {/* Research Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 my-10">
          {[
            {
              method: 'Heuristic Analysis',
              duration: '2 days',
              description: 'Evaluated the interface against Nielsen\'s 10 usability heuristics to identify systemic UX issues',
              icon: MagnifyingGlass,
              colorKey: 'amethyst'
            },
            {
              method: 'Shadowing Sessions',
              duration: '5 sessions',
              description: 'Observed annotators in their natural workflow to understand pain points and workarounds',
              icon: Users,
              colorKey: 'lilac'
            },
            {
              method: 'Annotator Surveys',
              duration: '95 responses',
              description: 'Distributed System Usability Scale (SUS) questionnaire to measure baseline satisfaction',
              icon: ChartBar,
              colorKey: 'rose'
            },
          ].map((item) => {
            const Icon = item.icon
            const color = getColor(item.colorKey, isDark)
            return (
              <div
                key={item.method}
                className={`text-center p-6 rounded-2xl ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}
              >
                {/* Icon with glass border treatment */}
                <div className="relative w-12 h-12 mx-auto mb-4">
                  <div
                    className="relative z-10 w-full h-full rounded-full flex items-center justify-center"
                    style={{ color, backgroundColor: `${color}18` }}
                  >
                    <Icon size={22} weight="regular" />
                  </div>
                  {/* Glass border frame */}
                  <div
                    className={`absolute -inset-1 rounded-full border ${
                      isDark
                        ? 'border-white/[0.08] bg-white/[0.02]'
                        : 'border-black/[0.05] bg-black/[0.01]'
                    }`}
                  />
                </div>
                <h4 className="font-satoshi text-base md:text-lg mb-1 md:mb-2 theme-heading" style={{ fontWeight: 600 }}>
                  {item.method}
                </h4>
                <p className={`font-mono text-xs uppercase tracking-wide mb-3 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                  {item.duration}
                </p>
                <p className={`font-satoshi text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-black/60'}`}>
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        <ProjectSubsection title="Usability Findings">
          <ProjectText>
            The baseline SUS score was 52 (below average), indicating significant room for improvement. I mapped specific issues to Nielsen's usability heuristics:
          </ProjectText>

          {(() => {
            const usabilityData = [
              {
                heuristic: 'Aesthetic & minimalist design',
                score: 2,
                violations: ['No visual hierarchy', 'Rigid layout made it hard to prioritize sections'],
              },
              {
                heuristic: 'Recognition over recall',
                score: 2,
                violations: ['Hidden shortcuts', 'Steep learning curve for new hires'],
              },
              {
                heuristic: 'Flexibility & efficiency',
                score: 1,
                violations: ['No batch operations', '8+ clicks per object for ground alignment'],
              },
              {
                heuristic: 'User control & freedom',
                score: 1,
                violations: ['No undo support (85% cited as most critical)', 'Errors meant starting over'],
              },
            ]

            return (
              <div className={`mt-6 rounded-2xl p-5 md:p-8 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
                {/* Mobile: Stacked layout */}
                <div className="md:hidden space-y-0">
                  {usabilityData.map((row, idx) => {
                    const scoreColor = row.score <= 1
                      ? (isDark ? '#EF4444' : '#DC2626')
                      : (isDark ? '#F59E0B' : '#D97706')
                    return (
                      <div
                        key={row.heuristic}
                        className={`py-4 ${idx > 0 ? `border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}` : ''}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-satoshi text-[15px] ${isDark ? 'text-white/90' : 'text-black/80'}`}>
                            {row.heuristic}
                          </span>
                          <span
                            className="font-mono text-sm font-medium flex-shrink-0 ml-3"
                            style={{ color: scoreColor }}
                          >
                            {row.score}/5
                          </span>
                        </div>
                        <ul className={`space-y-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {row.violations.map((v, i) => (
                            <li key={i} className="flex gap-2 text-[14px]">
                              <span className={`flex-shrink-0 w-1 h-1 rounded-full mt-2 ${isDark ? 'bg-white/30' : 'bg-black/20'}`} />
                              {v}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>

                {/* Desktop: Full table */}
                <table className="hidden md:table w-full border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={`text-left pb-3 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                        style={{ width: '40%' }}
                      >
                        Heuristic
                      </th>
                      <th
                        className={`text-center pb-3 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                        style={{ width: '15%' }}
                      >
                        Score
                      </th>
                      <th
                        className={`text-left pb-3 pl-6 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                        style={{ width: '45%' }}
                      >
                        Violations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usabilityData.map((row) => {
                      const scoreColor = row.score <= 1
                        ? (isDark ? '#EF4444' : '#DC2626')
                        : (isDark ? '#F59E0B' : '#D97706')
                      return (
                        <tr
                          key={row.heuristic}
                          className={`border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}
                        >
                          <td className={`py-4 pr-4 font-satoshi text-[15px] align-top ${isDark ? 'text-white/90' : 'text-black/80'}`}>
                            {row.heuristic}
                          </td>
                          <td className="py-4 text-center align-top">
                            <span
                              className="font-mono text-sm font-medium"
                              style={{ color: scoreColor }}
                            >
                              {row.score}/5
                            </span>
                          </td>
                          <td className={`py-4 pl-6 font-satoshi text-[15px] align-top ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            <ul className="space-y-1">
                              {row.violations.map((v, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className={`flex-shrink-0 w-1 h-1 rounded-full mt-2 ${isDark ? 'bg-white/30' : 'bg-black/20'}`} />
                                  {v}
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          })()}
        </ProjectSubsection>

        <ProjectSubsection title="Accessibility Findings">
          <ProjectText>
            Beyond usability, the interface failed to meet WCAG accessibility standards:
          </ProjectText>

          {(() => {
            const accessibilityData = [
              {
                issue: 'Low color contrast',
                measured: '2.1:1',
                required: '4.5:1',
                impact: 'Eye strain and reduced readability in varying lighting',
              },
              {
                issue: 'Typography too small',
                measured: '11px',
                required: '14px+',
                impact: 'Compounded fatigue during 8-hour shifts',
              },
            ]

            return (
              <div className={`mt-6 rounded-2xl p-5 md:p-8 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
                {/* Mobile: Stacked layout */}
                <div className="md:hidden space-y-0">
                  {accessibilityData.map((row, idx) => (
                    <div
                      key={row.issue}
                      className={`py-4 ${idx > 0 ? `border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}` : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-satoshi text-[15px] ${isDark ? 'text-white/90' : 'text-black/80'}`}>
                          {row.issue}
                        </span>
                        <span
                          className="font-mono text-sm font-medium flex-shrink-0 ml-3"
                          style={{ color: isDark ? '#EF4444' : '#DC2626' }}
                        >
                          {row.measured}
                        </span>
                      </div>
                      <p className={`text-[14px] ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                        <span className={`font-mono text-[12px] ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                          Required: {row.required}
                        </span>
                        <span className="mx-2">·</span>
                        {row.impact}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Desktop: Full table */}
                <table className="hidden md:table w-full border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={`text-left pb-3 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                        style={{ width: '35%' }}
                      >
                        Issue
                      </th>
                      <th
                        className={`text-center pb-3 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                        style={{ width: '15%' }}
                      >
                        Measured
                      </th>
                      <th
                        className={`text-center pb-3 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                        style={{ width: '15%' }}
                      >
                        Required
                      </th>
                      <th
                        className={`text-left pb-3 pl-6 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                        style={{ width: '35%' }}
                      >
                        Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessibilityData.map((row) => (
                      <tr
                        key={row.issue}
                        className={`border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}
                      >
                        <td className={`py-4 pr-4 font-satoshi text-[15px] ${isDark ? 'text-white/90' : 'text-black/80'}`}>
                          {row.issue}
                        </td>
                        <td className="py-4 text-center">
                          <span
                            className="font-mono text-sm font-medium"
                            style={{ color: isDark ? '#EF4444' : '#DC2626' }}
                          >
                            {row.measured}
                          </span>
                        </td>
                        <td className={`py-4 text-center font-mono text-sm ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                          {row.required}
                        </td>
                        <td className={`py-4 pl-6 font-satoshi text-[15px] ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {row.impact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })()}
        </ProjectSubsection>
      </ProjectSection>

      {/* Design Principles */}
      <ProjectSection id="principles" title="Design Principles">
        <ProjectText>
          Based on my research findings, I developed these principles to guide the redesign:
        </ProjectText>

        {/* Bento Grid Layout - stays bento until mobile */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {[
            { title: 'Reduce Cognitive Load', description: 'Use clear hierarchy with intentional spacing, color, and discoverable keyboard shortcuts', icon: SquaresFour, span: 'md:col-span-2' },
            { title: 'Customizable Layout', description: 'Offer a modular panel system that different user types can customize for their workflow', icon: SlidersHorizontal, span: 'md:col-span-2' },
            { title: 'Enable Batch Operations', description: 'Allow annotators to apply changes to multiple objects at once to reduce clicks', icon: Stack, span: 'md:col-span-2' },
            { title: 'Support User Agency', description: 'Provide undo/redo so annotators can try approaches without fear of mistakes', icon: ArrowCounterClockwise, span: 'md:col-span-3' },
            { title: 'WCAG Accessibility', description: 'Meet color contrast ratios and typography standards for extended use sessions', icon: Eyeglasses, span: 'md:col-span-3' },
          ].map((principle, index) => {
            const Icon = principle.icon
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-6 ${principle.span} ${
                  isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
                }`}
              >
                <div className={`absolute top-6 right-6 ${isDark ? 'text-white/20' : 'text-black/25'}`}>
                  <Icon size={24} weight="light" />
                </div>
                <h4 className={`text-xl mb-3 theme-heading pr-10`} style={{ fontWeight: 600 }}>
                  {principle.title}
                </h4>
                <Body size="sm" className={`mb-0 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  {principle.description}
                </Body>
              </div>
            )
          })}
        </div>
      </ProjectSection>

      {/* The Solution */}
      <ProjectSection id="solution" title="The Solution">
        <ProjectImageFullWidth
          src="/assets/projects/cuboid-annotator/new-design.png"
          alt="The redesigned cuboid annotation interface"
          caption="The redesigned interface"
          glassBorder
          darkBg
        />

        <ProjectText>
          Guided by the design principles I established, I used Figma to redesign the interface to reduce cognitive load and help annotators work faster with less fatigue. Once approved by the founder, I used Claude Code to ship the UI updates, while engineers handled the backend complexity.
        </ProjectText>

        {/* Comparison table */}
        <div className={`mt-16 rounded-2xl p-6 md:p-8 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
          <ChartTitle>Shipped Improvements</ChartTitle>

          {/* Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className={`text-left pb-3 ${isDark ? 'text-white/50' : 'text-black/50'}`}
                >
                </th>
                <th
                  className={`text-center pb-3 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                  style={{ width: '100px' }}
                >
                  Original
                </th>
                <th
                  className={`text-center pb-3 font-mono text-[11px] uppercase tracking-wide ${isDark ? 'text-white/50' : 'text-black/50'}`}
                  style={{ width: '100px' }}
                >
                  Redesign
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Clear visual hierarchy', icon: SquaresFour },
                { feature: 'Discoverable keyboard shortcuts', icon: Keyboard },
                { feature: 'Modular panel system', icon: GridFour },
                { feature: 'Batch ground alignment', icon: Crosshair },
                { feature: 'Undo/redo support', icon: ArrowCounterClockwise },
                { feature: 'Resizable camera views', icon: VideoCamera },
                { feature: 'Playback for frame navigation', icon: Play },
                { feature: 'WCAG-compliant contrast & typography', icon: Eyeglasses },
              ].map((row) => {
                const Icon = row.icon
                return (
                  <tr
                    key={row.feature}
                    className={`border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}
                  >
                    <td className={`py-3 font-satoshi text-[15px] ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                      <div className="flex items-center gap-3">
                        <Icon size={18} weight="regular" className={isDark ? 'text-white/30' : 'text-black/30'} />
                        {row.feature}
                      </div>
                    </td>
                    <td className="py-3" style={{ width: '100px' }}>
                      <div className="flex justify-center">
                        <X size={18} weight="bold" style={{ color: isDark ? '#EF4444' : '#DC2626' }} />
                      </div>
                    </td>
                    <td className="py-3" style={{ width: '100px' }}>
                      <div className="flex justify-center">
                        <Check size={18} weight="bold" style={{ color: isDark ? '#22C55E' : '#16A34A' }} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </ProjectSection>

      {/* Key Flows & Features */}
      <ProjectSection id="features" title="Key Flows & Features">
        <ProjectSubsection title="Adaptive Workspace">
          <ProjectText>
            The same interface serves annotators, QA reviewers, and external engineers—each with role-based permissions but a shared foundation. A modular panel system lets users resize, collapse, expand, and rearrange views to focus on their specific workflow.
          </ProjectText>

          <div className="flex flex-wrap gap-2 my-6">
            {[
              { name: 'Resizable panels', icon: ArrowsOut },
              { name: 'Collapsible sidebar', icon: SidebarSimple },
              { name: 'Persistent layout', icon: FloppyDisk },
              { name: 'Multi-monitor support', icon: Monitor },
            ].map((item) => {
              const Icon = item.icon
              return (
                <span
                  key={item.name}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-satoshi text-[14px] md:text-[15px] ${
                    isDark
                      ? 'bg-white/[0.04] border border-white/[0.06]'
                      : 'bg-black/[0.03] border border-black/[0.06]'
                  }`}
                  style={{ color: isDark ? '#D1D5DB' : '#3A3A3A' }}
                >
                  <Icon size={16} weight="regular" style={{ opacity: 0.6 }} />
                  {item.name}
                </span>
              )
            })}
          </div>

          <ProjectVideo
            src="/assets/projects/cuboid-annotator/adaptive-workspace.webm"
            caption="Resizable panels and collapsible sidebar"
            autoPlay
          />

          <ProjectImageFullWidth
            src="/assets/projects/cuboid-annotator/move-patterns.webp"
            alt="Panel resize behavior documentation showing different layout states"
            caption="Panel resize behavior documentation for engineering handoff"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Selection & Transform Tools">
          <ProjectText>
            Annotators adjust position, rotation, and scale with sub-meter precision. I audited existing 3D software like Blender and SketchUp to identify familiar patterns, then designed transform controls with RGB axis arrows and keyboard shortcuts.
          </ProjectText>

          <div className="flex flex-wrap gap-2 my-6">
            {[
              { name: 'Keyboard shortcuts', icon: Command },
              { name: 'Collapsible info panel', icon: Info },
              { name: 'Multi-select', icon: CursorClick },
              { name: 'Undo/redo', icon: ArrowCounterClockwise },
            ].map((item) => {
              const Icon = item.icon
              return (
                <span
                  key={item.name}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-satoshi text-[14px] md:text-[15px] ${
                    isDark
                      ? 'bg-white/[0.04] border border-white/[0.06]'
                      : 'bg-black/[0.03] border border-black/[0.06]'
                  }`}
                  style={{ color: isDark ? '#D1D5DB' : '#3A3A3A' }}
                >
                  <Icon size={16} weight="regular" style={{ opacity: 0.6 }} />
                  {item.name}
                </span>
              )
            })}
          </div>

          <ProjectVideo
            src="/assets/projects/cuboid-annotator/selection-transform.webm"
            caption="Selection and transform tools with keyboard shortcuts"
            autoPlay
          />
        </ProjectSubsection>

        <ProjectSubsection title="Ground Alignment">
          <ProjectText>
            LiDAR ground planes aren't perfectly flat, forcing annotators to manually adjust every cuboid's vertical position. I designed Ground Alignment: set one cuboid as the "road plane," then snap others to match. What took minutes now takes seconds.
          </ProjectText>

          <div className="flex flex-wrap gap-2 my-6">
            {[
              { name: 'Set road plane', icon: Crosshair },
              { name: 'Batch snap', icon: Stack },
              { name: 'Plane indicator', icon: Eye },
            ].map((item) => {
              const Icon = item.icon
              return (
                <span
                  key={item.name}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-satoshi text-[14px] md:text-[15px] ${
                    isDark
                      ? 'bg-white/[0.04] border border-white/[0.06]'
                      : 'bg-black/[0.03] border border-black/[0.06]'
                  }`}
                  style={{ color: isDark ? '#D1D5DB' : '#3A3A3A' }}
                >
                  <Icon size={16} weight="regular" style={{ opacity: 0.6 }} />
                  {item.name}
                </span>
              )
            })}
          </div>

          <ProjectVideo
            src="/assets/projects/cuboid-annotator/ground-alignment.webm"
            caption="Ground alignment: set road plane, then batch snap"
            autoPlay
          />

          <ProjectCallout>
            This is human-in-the-loop AI design. We can't fully automate ground detection, but we can give humans the right tools to do it efficiently.
          </ProjectCallout>
        </ProjectSubsection>

        <ProjectSubsection title="Cross-Functional Design">
          <ProjectText>
            Annotators, QA, and engineers all use this tool differently. I designed the interface so each group can quickly access what they need without cluttering the view for others.
          </ProjectText>

          <div className="flex flex-wrap gap-2 my-6">
            {[
              { name: 'Progressive disclosure', icon: CaretDown },
              { name: 'Inline bug reporting', icon: Bug },
              { name: 'Copy to clipboard', icon: Copy },
              { name: 'Persistent expand state', icon: FloppyDisk },
            ].map((item) => {
              const Icon = item.icon
              return (
                <span
                  key={item.name}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-satoshi text-[14px] md:text-[15px] ${
                    isDark
                      ? 'bg-white/[0.04] border border-white/[0.06]'
                      : 'bg-black/[0.03] border border-black/[0.06]'
                  }`}
                  style={{ color: isDark ? '#D1D5DB' : '#3A3A3A' }}
                >
                  <Icon size={16} weight="regular" style={{ opacity: 0.6 }} />
                  {item.name}
                </span>
              )
            })}
          </div>

          <ProjectVideo
            src="/assets/projects/cuboid-annotator/cross-functional.webm"
            caption="Progressive disclosure for different user roles"
            autoPlay
          />
        </ProjectSubsection>

        <ProjectSubsection title="Focus Tools">
          <ProjectText>
            Complex scenes have 50+ overlapping cuboids. View settings let annotators isolate objects, show movement paths, or display center points for alignment.
          </ProjectText>

          <div className="flex flex-wrap gap-2 my-6">
            {[
              { name: 'Toggle controls', icon: ToggleRight },
              { name: 'Persistent settings', icon: FloppyDisk },
              { name: 'Keyboard shortcuts', icon: Keyboard },
              { name: 'Isolated vs. context', icon: Eye },
            ].map((item) => {
              const Icon = item.icon
              return (
                <span
                  key={item.name}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-satoshi text-[14px] md:text-[15px] ${
                    isDark
                      ? 'bg-white/[0.04] border border-white/[0.06]'
                      : 'bg-black/[0.03] border border-black/[0.06]'
                  }`}
                  style={{ color: isDark ? '#D1D5DB' : '#3A3A3A' }}
                >
                  <Icon size={16} weight="regular" style={{ opacity: 0.6 }} />
                  {item.name}
                </span>
              )
            })}
          </div>

          <ProjectVideo
            src="/assets/projects/cuboid-annotator/focus-tools.webm"
            caption="Focus tools: isolate, show paths, show centers"
            autoPlay
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Impact */}
      <ProjectSection id="impact" title="Impact">
        <ProjectText>
          These features shipped to production and are used daily. Faster workflows mean lower labeling costs. Better usability means less fatigue over long sessions. Higher accuracy means better training data for autonomous vehicles.
        </ProjectText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {[
            { metric: '33%', title: 'Productivity increase', description: 'Annotators went from ~150 to ~200 cuboids per hour on average', colorKey: 'amethyst' },
            { metric: '6x', title: 'Faster ground alignment', description: 'Reduced alignment time from ~3 minutes to ~30 seconds per scene', colorKey: 'lilac' },
            { metric: '52→78', title: 'SUS score improvement', description: 'Based on surveys, system usability jumped from below average to above average', colorKey: 'rose' },
            { metric: 'target', title: 'Higher accuracy', description: 'Clearer UI reduced labeling mistakes, requiring less reviewer intervention', colorKey: 'gold' },
          ].map((item, i) => {
            const accentColor = getColor(item.colorKey, isDark)
            const isIcon = item.metric === 'target'
            return (
              <div
                key={i}
                className={`relative rounded-2xl p-6 ${
                  isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
                }`}
              >
                <div className="font-silk text-3xl mb-2" style={{ color: accentColor }}>
                  {isIcon ? <Target size={36} weight="regular" /> : item.metric}
                </div>
                <h4 className="text-lg mb-2 theme-heading" style={{ fontWeight: 600 }}>
                  {item.title}
                </h4>
                <Body size="sm" className={`mb-0 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  {item.description}
                </Body>
              </div>
            )
          })}
        </div>
      </ProjectSection>
    </ProjectLayout>
  )
}

