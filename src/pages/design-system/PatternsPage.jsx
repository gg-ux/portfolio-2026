import { useTheme } from '../../context/ThemeContext'
import DSLayout, { DSSection } from './DSLayout'
import { Caption, H4, Paragraph } from '../../components/Typography'

const sections = [
  { id: 'navigation', label: 'Navigation' },
  { id: 'page-layout', label: 'Page Layout' },
  { id: 'project-pages', label: 'Project Pages' },
  { id: 'footer', label: 'Footer' },
]

export default function PatternsPage() {
  const { isDark } = useTheme()

  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'

  const pageTypes = [
    { name: 'Home', maxWidth: '1440px', description: 'Hero, projects, about sections' },
    { name: 'Design System', maxWidth: '1440px', description: 'Category pages with side nav' },
    { name: 'Project Pages', maxWidth: '896px / 1440px', description: 'Article-style, optimized for reading' },
    { name: 'Résumé', maxWidth: '896px', description: 'Document-style layout' },
  ]

  return (
    <DSLayout title="Patterns" sections={sections}>
      {/* Navigation */}
      <DSSection id="navigation" title="Navigation">
        <Paragraph size="sm" className="mb-8">
          Scroll-aware navigation with mega menu on desktop and full-screen mobile menu.
        </Paragraph>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Scroll Behavior */}
          <div>
            <H4 className="mb-4">Scroll Behavior</H4>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
                {[
                  ['At top', 'Transparent, visible'],
                  ['Scroll down', 'Hidden after 100px'],
                  ['Scroll up', 'Frosted backdrop'],
                ].map(([trigger, behavior], i) => (
                  <div key={i} className="py-2 first:pt-0 last:pb-0 flex justify-between gap-4">
                    <span className={`font-satoshi text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{trigger}</span>
                    <span className={`font-satoshi text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{behavior}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Types */}
          <div>
            <H4 className="mb-4">Menu Types</H4>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
                {[
                  ['Desktop', '5-col project grid mega menu'],
                  ['Mobile', 'Full-screen overlay with layers'],
                ].map(([type, desc], i) => (
                  <div key={i} className="py-2 first:pt-0 last:pb-0 flex justify-between gap-4">
                    <span className={`font-satoshi text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{type}</span>
                    <span className={`font-satoshi text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Page Layout */}
      <DSSection id="page-layout" title="Page Layout">
        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
            {pageTypes.map((page) => (
              <div key={page.name} className="py-3 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <span className={`font-satoshi text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{page.name}</span>
                  <span className={`font-satoshi text-sm ml-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>— {page.description}</span>
                </div>
                <p className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{page.maxWidth}</p>
              </div>
            ))}
          </div>
        </div>
      </DSSection>

      {/* Project Pages */}
      <DSSection id="project-pages" title="Project Pages">
        <Paragraph size="sm" className="mb-8">
          Article-style layout with hero, scroll-reveal sections, and sticky side navigation.
        </Paragraph>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <H4 className="mb-4">Content Width</H4>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'}`}>
                <div className="py-2 first:pt-0 last:pb-0 flex justify-between">
                  <span className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Text content</span>
                  <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>896px</span>
                </div>
                <div className="py-2 first:pt-0 last:pb-0 flex justify-between">
                  <span className={`font-satoshi text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>Full-width images</span>
                  <span className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>1440px</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <H4 className="mb-4">Components</H4>
            <div className={`p-6 border ${borderClass} rounded-xl`}>
              <div className="flex flex-wrap gap-2">
                {['Section', 'Subsection', 'Text', 'List', 'Callout', 'Quote', 'Image', 'Video'].map((component) => (
                  <code
                    key={component}
                    className={`font-mono text-[11px] px-2 py-1 rounded ${isDark ? 'bg-white/[0.04] text-white/60' : 'bg-black/[0.04] text-gray-500'}`}
                  >
                    {component}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DSSection>

      {/* Footer */}
      <DSSection id="footer" title="Footer">
        <Paragraph size="sm" className="mb-8">
          Minimal footer with copyright, social links, and back-to-top functionality.
        </Paragraph>

        <div className={`p-6 border ${borderClass} rounded-xl`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <span className={`font-satoshi text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>© Copyright</span>
              <span className={`font-satoshi text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Social links</span>
            </div>
            <span className={`font-satoshi text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Back to top ↑</span>
          </div>
        </div>
      </DSSection>
    </DSLayout>
  )
}
