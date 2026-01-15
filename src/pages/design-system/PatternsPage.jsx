import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Caption, Body } from '../../components/Typography'

const sections = [
  { id: 'page-layout', label: 'Page Layout' },
  { id: 'project-pages', label: 'Project Pages' },
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
      {/* Page Layout */}
      <DSSection id="page-layout" title="Page Layout">
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Page Types</h4>
        <div className="space-y-4 mb-8">
          {pageTypes.map((page) => (
            <div key={page.name} className={`p-6 border ${borderClass} rounded-xl`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h5 className={`font-satoshi font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {page.name}
                  </h5>
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

        {/* Navigation Behavior */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Navigation Behavior</h4>
        <div className={`${bgSubtle} p-6 rounded-xl`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {[
              'Transparent at top of page',
              'Hidden on scroll down (after 100px threshold)',
              'Revealed with blur backdrop on scroll up',
              'Consistent behavior across all pages',
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

      {/* Project Pages */}
      <DSSection id="project-pages" title="Project Pages">
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Structure</h4>
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
                    <span className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                      {item}
                    </span>
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
                    <span className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                      {item}
                    </span>
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
                    <span className={`font-satoshi text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Width */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Content Width</h4>
        <div className={`${bgSubtle} p-6 rounded-xl mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Caption className="mb-2 block">Text Content</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                max-w-4xl (896px) centered
              </p>
              <p className={`font-mono text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                Optimized for readability
              </p>
            </div>
            <div>
              <Caption className="mb-2 block">Full-Width Images</Caption>
              <p className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                1440px
              </p>
              <p className={`font-mono text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                Use fullWidth prop on sections
              </p>
            </div>
          </div>
        </div>

        {/* Components */}
        <h4 className="font-satoshi text-lg mb-6 theme-heading-h4">Available Components</h4>
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['ProjectHero', 'ProjectSection', 'ProjectSubsection', 'ProjectText', 'ProjectList', 'ProjectCallout', 'ProjectQuote', 'ProjectImage'].map((component) => (
              <div
                key={component}
                className={`px-3 py-2 rounded-lg text-center ${bgSubtle}`}
              >
                <code className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                  {component}
                </code>
              </div>
            ))}
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
