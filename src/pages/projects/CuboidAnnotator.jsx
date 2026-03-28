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
import { Body } from '../../components/Typography'
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
} from '@phosphor-icons/react'
import { getColor } from '../../constants/colors'

// Password protection
const PROJECT_PASSWORD = 'behappy333'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The Problem' },
  { id: 'solution', label: 'The Solution' },
  { id: 'features', label: 'Key Flows & Features' },
  { id: 'impact', label: 'Impact' },
]

export default function CuboidAnnotator() {
  const { isDark } = useTheme()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('cuboidAnnotatorAuth') === 'true'
  })
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordInput === PROJECT_PASSWORD) {
      sessionStorage.setItem('cuboidAnnotatorAuth', 'true')
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
          className={`p-10 rounded-2xl text-center max-w-[360px] w-full mx-4 ${
            isDark
              ? 'bg-white/[0.02] border border-white/[0.06]'
              : 'bg-white shadow-lg'
          }`}
        >
          <h2 className="font-silk text-2xl theme-heading mb-2">
            Protected Project
          </h2>
          <p className="font-satoshi text-sm theme-muted mb-6">
            This case study contains confidential work
          </p>
          <input
            type="password"
            className={`w-full px-4 py-3 rounded-lg font-satoshi text-base mb-3 outline-none transition-colors ${
              isDark
                ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/40 focus:border-white/20'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400'
            } ${passwordError ? '!border-red-500' : ''}`}
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoFocus
          />
          <Button type="submit" variant="primary" className="w-full">
            View Project
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
        description="I redesigned precision workflows for autonomous vehicle data labeling. As the sole product designer, I transformed an engineer-built tool into an interface optimized for annotators, reducing task time by 6x and dramatically improving usability."
        role="Lead Product Designer"
        timeline="2024 – Present"
        impact="6x faster ground alignment"
        coverImage="/assets/projects/cuboid-annotator/cover.webp"
        darkBanner
        darkBg
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          This AI data startup provides labeled training data for autonomous vehicles. Their cuboid annotation tool lets workers draw 3D bounding boxes around objects in LiDAR point cloud data, training the perception models that help self-driving cars understand their environment.
        </ProjectText>

        <ProjectText>
          The workflow is demanding: 200+ objects per hour across thousands of frames. Every UI inefficiency costs the business more. Every labeling error degrades model training and impacts vehicle safety.
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

      {/* The Problem */}
      <ProjectSection id="problem" title="The Problem">
        <ProjectImageFullWidth
          src="/assets/projects/cuboid-annotator/old-design.png"
          alt="The original cuboid annotation interface"
          caption="The original interface (Oct 2024)"
          glassBorder
          darkBg
        />

        <ProjectText>
          When I joined, the existing tool had grown organically over years of engineering-driven development. It worked, but it wasn't designed for the humans using it 40+ hours per week. I sent surveys to annotators and conducted shadowing sessions to identify the biggest pain points.
        </ProjectText>
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
          I aimed to reduce cognitive load and help annotators work faster with less fatigue. The redesign focused on cleaner hierarchy, visible shortcuts, easier transforms, and progressive disclosure.
        </ProjectText>

        {/* Comparison table */}
        <div className="overflow-hidden mt-16">
          {/* Header with thumbnails */}
          <div className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] gap-4">
            <div />
            <div className="text-center">
              <img
                src="/assets/projects/cuboid-annotator/old-design.png"
                alt="Original interface"
                className="w-full rounded-lg mb-3 opacity-70"
              />
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                Original
              </span>
            </div>
            <div className="text-center">
              <img
                src="/assets/projects/cuboid-annotator/new-design.png"
                alt="Redesigned interface"
                className="w-full rounded-lg mb-3"
              />
              <span className={`font-mono text-xs uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                Redesign
              </span>
            </div>
          </div>

          {/* Comparison rows */}
          <div className={`mt-6 divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              { feature: 'Clear visual hierarchy', icon: SquaresFour },
              { feature: 'Visible keyboard shortcuts', icon: Keyboard },
              { feature: 'Batch ground alignment', icon: Crosshair },
              { feature: 'Undo/redo support', icon: ArrowCounterClockwise },
              { feature: 'Resizable camera views', icon: VideoCamera },
              { feature: 'Playback for frame navigation', icon: Play },
            ].map((row) => {
              const Icon = row.icon
              return (
                <div key={row.feature} className="grid grid-cols-[1fr_100px_100px] md:grid-cols-[1fr_120px_120px] gap-4 items-center py-4">
                  <div className={`font-satoshi text-base md:text-lg flex items-center gap-3 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                    <Icon size={20} weight="regular" className={isDark ? 'text-white/40' : 'text-black/40'} />
                    {row.feature}
                  </div>
                  <div className="flex justify-center">
                    <X size={20} weight="bold" style={{ color: isDark ? '#EF4444' : '#DC2626' }} />
                  </div>
                  <div className="flex justify-center">
                    <Check size={20} weight="bold" style={{ color: isDark ? '#22C55E' : '#16A34A' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </ProjectSection>

      {/* Key Flows & Features */}
      <ProjectSection id="features" title="Key Flows & Features">
        <ProjectSubsection title="Adaptive Workspace">
          <ProjectText>
            Many annotators work on 13" MacBook Airs with limited screen space. I designed a flexible panel system where users can resize, collapse, or expand views based on their task.
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

