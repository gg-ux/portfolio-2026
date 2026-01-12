import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSubsection,
  ProjectText,
  ProjectList,
  ProjectCallout,
  ProjectImagePlaceholder,
} from '../../components/project'
import { useTheme } from '../../context/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'goals', label: 'Goals' },
  { id: 'process', label: 'Process' },
  { id: 'old-ia', label: 'Old IA' },
  { id: 'new-ia', label: 'New IA' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'metrics', label: 'Metrics' },
]

export default function TeslaMegaMenu() {
  const { isDark } = useTheme()

  return (
    <ProjectLayout
      sections={sections}
      prevProject={{ title: 'AI Chatbot', href: '/project/tesla-chatbot' }}
      nextProject={{ title: 'Electric Car IVI', href: '/project/indi-ev' }}
    >
      <ProjectHero
        company="Tesla"
        title="Mega Menu"
        description="From 2021 to 2024, I was a key member of Tesla's Discovery Team, focusing on enhancing the user experience for top-of-funnel experiences on tesla.com. I spearheaded a comprehensive overhaul of the site's information architecture and successfully launched the new mega menu."
        role="Lead UX/UI Designer"
        timeline="2021–2024"
        impact="Improved content discoverability & scalability"
        coverImage="/images/projects/tesla/mega-menu/mega-menu-card-filled.png"
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          This pivotal project not only enhanced content discoverability but also ensured robust scalability and flexibility to meet the dynamic needs of Tesla's expanding product line and diverse global markets.
        </ProjectText>
      </ProjectSection>

      {/* Goals */}
      <ProjectSection id="goals" title="Goals">
        <ProjectList
          items={[
            'Improve discoverability of key content with new IA',
            'Make navigation scalable as products and offerings increase',
            'Ensure adaptability to evolving needs of the business and different locales',
          ]}
        />
      </ProjectSection>

      {/* Process */}
      <ProjectSection id="process" title="Process">
        <ProjectSubsection title="Research & Planning">
          <ProjectList
            ordered
            items={[
              'Identify Pain Points: Document key inefficiencies in the existing information architecture to justify a redesign',
              'Document Current IA: Collaborate with content management and product teams to map pages for categorization',
              'Perform Card Sorting: Recruit participants for card sorting to gain insight into intuitive naming and groupings',
              'Propose IA Concepts: Create IA proposals based on research and business needs, refining them with feedback',
              'Get Leadership Buy-In: Present the final IA proposal to secure leadership approval',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Design & Development">
          <ProjectList
            ordered
            items={[
              'Conduct Competitor Audit: Research and compile menu designs from other companies for inspiration',
              'Create Design Concepts: Create several design concepts',
              'Iterate on Designs: Refine designs iteratively based on feedback from leadership, peers, and user testing',
              'Define MVP: Work with the product manager to define MVP requirements and break the project into phases',
              'Get Approvals: Present a final deck to leadership, outlining business benefits, development phases, and timeline',
              'Define Interaction Rules: Provide engineers with detailed guidelines on animations, interactivity and responsive behavior',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Implementation & Launch">
          <ProjectList
            ordered
            items={[
              'Support Engineering: Support the engineering team with assets and resources',
              'Conduct Design QA: Conduct design QA during staging, creating and supplementing Jira tickets',
              'Launch It!',
            ]}
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Old IA */}
      <ProjectSection id="old-ia" title="Old IA">
        <ProjectText>
          Tesla's site navigation had not been changed since its initial launch. With new products around the corner (ie Cybertruck), I knew that the existing framework would not last for long due to the following key issues:
        </ProjectText>
        <ProjectList
          items={[
            'Not scalable as new products and offerings are added',
            'Key pages not easily discoverable due to a lack of categorization',
          ]}
        />

        <ProjectSubsection title="Old IA: Desktop">
          <ProjectText>
            On desktop, the navigation featured main vehicle and energy product offerings centered at the top level, with additional links taking users to Shop, Account, and Menu on the right. Not only is this approach not scalable, but it is also visually cluttered, making it difficult for users to discover any content outside of the top level product pages.
          </ProjectText>
          <ProjectImagePlaceholder label="Old Navigation - Desktop" />
        </ProjectSubsection>

        <ProjectSubsection title="Old IA: Mobile">
          <ProjectText>
            On mobile, the situation was worse because all pages needed to be nested under the menu due to the limited horizontal space. For those trying to find their account or language settings, they would have to scroll all the way to the bottom.
          </ProjectText>
          <ProjectImagePlaceholder label="Old Navigation - Mobile" />
        </ProjectSubsection>
      </ProjectSection>

      {/* New IA */}
      <ProjectSection id="new-ia" title="New IA">
        <ProjectText>
          The new IA aimed to improve content discoverability, navigation scalability, and adaptability to evolving business needs and diverse locales. Featured navigation items were paired with images to not only get the users' attention but also help them distinguish between different products.
        </ProjectText>

        <ProjectSubsection title="New IA: Desktop">
          <ProjectText>
            The new desktop menu eliminates clutter and improves page discoverability with intuitive categories. "Support" and "Language," previously hidden, are now prominently placed to provide answers and ensure accessibility.
          </ProjectText>
          <ProjectImagePlaceholder label="New Mega Menu - Desktop" />
        </ProjectSubsection>

        <ProjectSubsection title="New IA: Mobile">
          <ProjectText>
            The mobile navigation is more scalable, and the user journey is more streamlined due to intuitive content categorization. While this adds an extra tap, mobile users are accustomed to tapping. This extra interaction enhances discoverability and provides a sense of control by ensuring predictable navigation outcomes.
          </ProjectText>
          <ProjectImagePlaceholder label="New Navigation - Mobile" />
        </ProjectSubsection>

        <ProjectSubsection title="Responsive Behavior">
          <ProjectText>
            I provided designs and guidelines for 12 breakpoints to ensure the menu would remain accessible and not break, regardless of the viewport.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* Process Highlights */}
      <ProjectSection id="highlights" title="Process Highlights">
        <ProjectSubsection title="Card Sort">
          <ProjectText>
            To effectively determine the most intuitive categorization and naming structure, we conducted an internal card sort. We engaged 32 participants from various departments, ensuring a diverse range of perspectives. Each participant received virtual cards representing all the pages and was tasked with grouping them into logical categories.
          </ProjectText>
        </ProjectSubsection>

        <ProjectSubsection title="Redundancies">
          <ProjectText>
            Faced with the challenge of maximizing content discoverability while maintaining a streamlined sitemap, I opted to include the same page in multiple categories. I created the "Discover" category as a hub that could house both secondary pages as well as high-priority pages that the business was pushing.
          </ProjectText>
        </ProjectSubsection>

        <ProjectSubsection title="Hover vs. Click">
          <ProjectText>
            In desktop navigation, I applied a hover-to-open interaction for items featuring mega menus, particularly the centered navigation items. This design choice streamlines user experience by reducing the need for clicks and presenting more content upfront.
          </ProjectText>
          <ProjectText>
            For navigation items positioned on the right and represented by icons (Support, Language, Account), I implemented a click-to-open interaction for direct access with just one click.
          </ProjectText>
        </ProjectSubsection>

        <ProjectSubsection title="Animations">
          <ProjectText>
            I designed animations in Figma and collaborated with engineers to implement them as intended. The menu slides down from the top, with a smooth staggering animation for featured items while the separator line extends and additional links fade in. After user feedback, I created the rule for the stagger effect only to occur on the first hover and not subsequently during the same session to minimize distractions.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* Success Metrics */}
      <ProjectSection id="metrics" title="Success Metrics">
        <ProjectText>
          Defining success metrics for site menus can be challenging due to the variety of ways users navigate. I collaborated with the product manager to establish clear metrics:
        </ProjectText>
        <ProjectList
          items={[
            'Time to Destination: Measured how quickly users reached specific pages to understand navigation efficiency',
            'User Testing Feedback: Collected qualitative feedback from users during testing to understand their navigation experience',
            'Drop-off Rates: Analyzed drop-off rates within the menu to identify where users might be encountering issues',
            'Conversion Rates: Assessed conversion rates for key actions to see how the new menu affected user engagement',
          ]}
        />
      </ProjectSection>
    </ProjectLayout>
  )
}
