import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Caption, Body, H4, Paragraph } from '../../components/Typography'

const sections = [
  { id: 'navigation', label: 'Navigation' },
  { id: 'page-layout', label: 'Page Layout' },
  { id: 'project-pages', label: 'Project Pages' },
  { id: 'footer', label: 'Footer' },
]

export default function PatternsPage() {
  const { isDark } = useTheme()

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'
  const textHeadingClass = isDark ? 'text-white' : 'text-gray-900'
  const textMutedClass = isDark ? 'text-gray-400' : 'text-gray-500'
  const bgSubtle = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'

  const pageTypes = [
    {
      name: 'Home Page',
      maxWidth: '1440px',
      padding: 'px-6 md:px-12 lg:px-20',
      description: 'Full-featured landing with hero, projects, and about sections'
    },
    {
      name: 'Design System',
      maxWidth: '1440px',
      padding: 'px-6 md:px-12 lg:px-20',
      description: 'Category pages with right-side navigation'
    },
    {
      name: 'Project Pages',
      maxWidth: '1440px for images, 896px (max-w-4xl) for content',
      padding: 'px-6 centered',
      description: 'Article-style layout optimized for reading'
    },
    {
      name: 'Résumé',
      maxWidth: '896px (max-w-4xl)',
      padding: 'px-6 md:px-12',
      description: 'Document-style layout for resume content'
    }
  ]

  return (
    <DSLayout title="Patterns" sections={sections}>
      {/* Navigation */}
      <DSSection id="navigation" title="Navigation">
        <Paragraph size="sm" className="mb-8">
          A responsive navigation system with scroll-aware behavior, mega menu on desktop, and full-screen mobile menu.
        </Paragraph>

        {/* Scroll Behavior */}
        <H4 className="mb-6">Scroll Behavior</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              ['At top', 'Transparent background, always visible'],
              ['Scroll down', 'Hidden after 100px scroll threshold'],
              ['Scroll up', 'Revealed with frosted backdrop blur'],
              ['Scrolled mode', '70% opacity background + grain texture'],
            ].map(([trigger, behavior], i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0 grid grid-cols-3 gap-4">
                <span className={`font-satoshi text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{trigger}</span>
                <span className={`font-satoshi text-sm col-span-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{behavior}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mega Menu */}
        <H4 className="mb-6">Mega Menu (Desktop)</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Trigger</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                Hover on "Projects" link or click to toggle
              </Body>
            </div>
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Content</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                5-column grid of project thumbnails with staggered entry animation (50ms delay per card)
              </Body>
            </div>
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Backdrop</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                Full-screen frosted overlay (64% dark / 60% light) with grain texture
              </Body>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <H4 className="mb-6">Mobile Menu</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Main Layer</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                Full-screen overlay with centered navigation links (text-4xl). Subtle grid pattern background.
              </Body>
            </div>
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Projects Layer</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                Slides in from right with 2-3 column project grid. Staggered card entry (60ms delay).
              </Body>
            </div>
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Transitions</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                Layers slide horizontally, back chevron and logo animate with scale/rotate, body scroll locked.
              </Body>
            </div>
          </div>
        </div>

        {/* Specs */}
        <H4 className="mb-6">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Height</Caption>
              <Body size="sm">h-18 (72px)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Z-Index</Caption>
              <Body size="sm">z-[200] nav, z-[199] backdrop</Body>
            </div>
            <div>
              <Caption className="block mb-1">Link Style</Caption>
              <Body size="sm">Azeret Mono, 11px, uppercase, tracking-wide</Body>
            </div>
            <div>
              <Caption className="block mb-1">Scroll Threshold</Caption>
              <Body size="sm">80px scroll-up to reveal</Body>
            </div>
            <div>
              <Caption className="block mb-1">Backdrop Blur</Caption>
              <Body size="sm">backdrop-blur-xl (24px) + saturate(1.2)</Body>
            </div>
            <div>
              <Caption className="block mb-1">Text Effect</Caption>
              <Body size="sm">ScrambleText on hover</Body>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Page Layout */}
      <DSSection id="page-layout" title="Page Layout">
        <H4 className="mb-6">Page Types</H4>
        <div className="space-y-4 mb-8">
          {pageTypes.map((page) => (
            <div key={page.name} className={`p-6 border ${borderClass} rounded-xl`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <Caption className="mb-2 block" uppercase={false}>
                    {page.name}
                  </Caption>
                  <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                    {page.description}
                  </Body>
                </div>
                <div className="md:text-right">
                  <Caption className="block mb-1">Max Width</Caption>
                  <p className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                    {page.maxWidth}
                  </p>
                  <Caption className="block mt-3 mb-1">Padding</Caption>
                  <p className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                    {page.padding}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </DSSection>

      {/* Project Pages */}
      <DSSection id="project-pages" title="Project Pages">
        <H4 className="mb-6">Structure</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="space-y-6">
            {/* Hero Section */}
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Hero Section</Caption>
              <div className={`divide-y ${isDark ? 'divide-white/[0.04]' : 'divide-black/[0.04]'}`}>
                {[
                  'Cover image at top (1440px)',
                  'Company label with decode effect',
                  'Title (H1 style, Satoshi font)',
                  'Description paragraph',
                  'Metadata grid: Role, Timeline, Team, Impact',
                ].map((item, i) => (
                  <div key={i} className="py-2 first:pt-0 last:pb-0">
                    <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                      {item}
                    </Body>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Sections */}
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Content Sections</Caption>
              <div className={`divide-y ${isDark ? 'divide-white/[0.04]' : 'divide-black/[0.04]'}`}>
                {[
                  'Scroll-reveal animation on enter',
                  'Section title (Satoshi, text-xl/2xl)',
                  'Body text (Satoshi, text-base/lg)',
                  'Optional subsections with smaller titles',
                ].map((item, i) => (
                  <div key={i} className="py-2 first:pt-0 last:pb-0">
                    <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                      {item}
                    </Body>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Navigation */}
            <div className={`p-4 rounded-lg ${bgSubtle}`}>
              <Caption className="block mb-3">Side Navigation</Caption>
              <div className={`divide-y ${isDark ? 'divide-white/[0.04]' : 'divide-black/[0.04]'}`}>
                {[
                  'Sticky positioned (top: 128px)',
                  'IntersectionObserver tracks active section',
                  'Smooth scroll on click (100px offset)',
                  'Desktop only (hidden lg:block)',
                ].map((item, i) => (
                  <div key={i} className="py-2 first:pt-0 last:pb-0">
                    <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                      {item}
                    </Body>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Width */}
        <H4 className="mb-6">Content Width</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Text Content</Caption>
              <Body size="sm">max-w-4xl (896px) centered</Body>
              <Caption className="block mt-1" size="sm" scramble={false}>
                OPTIMIZED FOR READABILITY
              </Caption>
            </div>
            <div>
              <Caption className="block mb-1">Full-Width Images</Caption>
              <Body size="sm">1440px</Body>
              <Caption className="block mt-1" size="sm" scramble={false}>
                USE FULLWIDTH PROP ON SECTIONS
              </Caption>
            </div>
          </div>
        </div>

        {/* Components */}
        <H4 className="mb-4">Content Components</H4>
        <Paragraph size="sm" className="mb-4">
          Reusable content blocks for consistent project page structure.
        </Paragraph>

        {/* ProjectSection */}
        <div className={`p-6 border ${borderClass} rounded-xl mb-6`}>
          <div className="flex items-start gap-4 mb-4">
            <code className={`font-mono text-xs px-2 py-1 rounded ${bgSubtle}`}>ProjectSection</code>
            <Caption className="block" uppercase={false} scramble={false}>Main section wrapper with scroll-reveal</Caption>
          </div>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Caption className="block mb-1">Props</Caption>
                <Body size="sm">id, title, fullWidth, className</Body>
              </div>
              <div>
                <Caption className="block mb-1">Max Width</Caption>
                <Body size="sm">896px (text) or full (images)</Body>
              </div>
            </div>
          </div>
        </div>

        {/* ProjectSubsection */}
        <div className={`p-6 border ${borderClass} rounded-xl mb-6`}>
          <div className="flex items-start gap-4 mb-4">
            <code className={`font-mono text-xs px-2 py-1 rounded ${bgSubtle}`}>ProjectSubsection</code>
            <Caption className="block" uppercase={false} scramble={false}>Smaller heading within a section</Caption>
          </div>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Caption className="block mb-1">Title Style</Caption>
                <Body size="sm">H4, text-lg md:text-xl</Body>
              </div>
              <div>
                <Caption className="block mb-1">Bottom Margin</Caption>
                <Body size="sm">mb-12</Body>
              </div>
            </div>
          </div>
        </div>

        {/* ProjectText */}
        <div className={`p-6 border ${borderClass} rounded-xl mb-6`}>
          <div className="flex items-start gap-4 mb-4">
            <code className={`font-mono text-xs px-2 py-1 rounded ${bgSubtle}`}>ProjectText</code>
            <Caption className="block" uppercase={false} scramble={false}>Body text with proper styling</Caption>
          </div>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Caption className="block mb-1">Sizes</Caption>
                <Body size="sm">lg (16-17px), sm (15px)</Body>
              </div>
              <div>
                <Caption className="block mb-1">Bottom Margin</Caption>
                <Body size="sm">mb-6</Body>
              </div>
            </div>
          </div>
        </div>

        {/* ProjectList */}
        <div className={`p-6 border ${borderClass} rounded-xl mb-6`}>
          <div className="flex items-start gap-4 mb-4">
            <code className={`font-mono text-xs px-2 py-1 rounded ${bgSubtle}`}>ProjectList</code>
            <Caption className="block" uppercase={false} scramble={false}>Bulleted or numbered list</Caption>
          </div>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Caption className="block mb-1">Props</Caption>
                <Body size="sm">items[], ordered, size</Body>
              </div>
              <div>
                <Caption className="block mb-1">Bullet Style</Caption>
                <Body size="sm">5px circle, theme-aware</Body>
              </div>
              <div>
                <Caption className="block mb-1">Item Spacing</Caption>
                <Body size="sm">space-y-3 (bullet), space-y-4 (numbered)</Body>
              </div>
            </div>
          </div>
        </div>

        {/* ProjectCallout */}
        <div className={`p-6 border ${borderClass} rounded-xl mb-6`}>
          <div className="flex items-start gap-4 mb-4">
            <code className={`font-mono text-xs px-2 py-1 rounded ${bgSubtle}`}>ProjectCallout</code>
            <Caption className="block" uppercase={false} scramble={false}>Accent-bordered emphasis block</Caption>
          </div>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Caption className="block mb-1">Border</Caption>
                <Body size="sm">3px left, accent color</Body>
              </div>
              <div>
                <Caption className="block mb-1">Text Style</Caption>
                <Body size="sm">Satoshi semibold, 16-18px</Body>
              </div>
              <div>
                <Caption className="block mb-1">Animation</Caption>
                <Body size="sm">Line grows, then text fades in</Body>
              </div>
            </div>
          </div>
        </div>

        {/* ProjectQuote */}
        <div className={`p-6 border ${borderClass} rounded-xl mb-6`}>
          <div className="flex items-start gap-4 mb-4">
            <code className={`font-mono text-xs px-2 py-1 rounded ${bgSubtle}`}>ProjectQuote</code>
            <Caption className="block" uppercase={false} scramble={false}>Pull quote with attribution</Caption>
          </div>
          <div className={`${bgSubtle} p-4 rounded-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Caption className="block mb-1">Border</Caption>
                <Body size="sm">2px left, 20% opacity</Body>
              </div>
              <div>
                <Caption className="block mb-1">Text Style</Caption>
                <Body size="sm">Body italic, with quotes</Body>
              </div>
              <div>
                <Caption className="block mb-1">Author</Caption>
                <Body size="sm">Caption style, optional</Body>
              </div>
            </div>
          </div>
        </div>

        {/* Media Components */}
        <H4 className="mb-4 mt-12">Media Components</H4>
        <Paragraph size="sm" className="mb-4">
          Image and video components with consistent styling.
        </Paragraph>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['ProjectImage', 'ProjectImageGrid', 'ProjectImageFullWidth', 'ProjectVideo', 'ProjectVimeo', 'ProjectYouTube', 'PDFCarousel', 'ChartCaption'].map((component) => (
              <div
                key={component}
                className={`px-3 py-2 rounded-lg text-center border ${borderClass}`}
              >
                <code className={`font-mono text-[11px] ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                  {component}
                </code>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      {/* Footer */}
      <DSSection id="footer" title="Footer">
        <Paragraph size="sm" className="mb-8">
          A minimal footer with copyright, social links, and back-to-top functionality.
        </Paragraph>

        {/* Structure */}
        <H4 className="mb-6">Structure</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left */}
            <div className={`text-center md:text-left`}>
              <Caption className="block mb-2">Left</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                Copyright notice with dynamic year
              </Body>
            </div>
            {/* Center */}
            <div className={`text-center`}>
              <Caption className="block mb-2">Center</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                Social links (LinkedIn) · Internal links (Playground)
              </Body>
            </div>
            {/* Right */}
            <div className={`text-center md:text-right`}>
              <Caption className="block mb-2">Right</Caption>
              <Body size="sm" className={isDark ? 'text-white/60' : 'text-gray-500'}>
                Back to top button with arrow icon
              </Body>
            </div>
          </div>
        </div>

        {/* Interactions */}
        <H4 className="mb-6">Interactions</H4>
        <div className={`p-6 border ${borderClass} rounded-xl mb-8`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              ['Scroll reveal', 'Footer fades in when scrolled into view (useScrollReveal hook)'],
              ['Link hover', 'Color transition from muted to primary'],
              ['Back to top', 'Smooth scroll + arrow lifts on hover'],
            ].map(([interaction, behavior], i) => (
              <div key={i} className="py-3 first:pt-0 last:pb-0 grid grid-cols-3 gap-4">
                <Body size="sm" className={`font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{interaction}</Body>
                <Body size="sm" className={`col-span-2 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{behavior}</Body>
              </div>
            ))}
          </div>
        </div>

        {/* Specs */}
        <H4 className="mb-6">Specifications</H4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="block mb-1">Border</Caption>
              <Body size="sm">Top border at 6%/8% opacity</Body>
            </div>
            <div>
              <Caption className="block mb-1">Padding</Caption>
              <Body size="sm">py-12, responsive px</Body>
            </div>
            <div>
              <Caption className="block mb-1">Text Style</Caption>
              <Body size="sm">Caption component with ScrambleText</Body>
            </div>
            <div>
              <Caption className="block mb-1">Layout</Caption>
              <Body size="sm">Flex column on mobile, row on md+</Body>
            </div>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
