import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSubsection,
  ProjectText,
  ProjectList,
  ProjectCallout,
  ProjectImageFullWidth,
  ProjectImageGrid,
  ProjectYouTube,
} from '../../components/project'
import { useTheme } from '../../context/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'process', label: 'Process' },
  { id: 'look-feel', label: 'Look & Feel' },
  { id: 'iterations', label: 'Iterations' },
  { id: 'mockups', label: 'Mockups' },
  { id: 'design-system', label: 'Design System' },
]

export default function IndiEV() {
  const { isDark } = useTheme()

  return (
    <ProjectLayout sections={sections}>
      <ProjectHero
        company="INDI EV"
        title="Electric Car IVI"
        description="INDI EV is an electric car startup based in Los Angeles, whose mission is to reimagine the in-car experience to be one that is personal, fresh, and intuitive. The IVI also features an AI that assists with tasks and emergencies."
        role="UX/UI Designer"
        timeline="2022"
        team="Design Lead + Me"
        coverImage="/assets/projects/indi-ev/content/banner.png"
        darkBanner
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Responsibilities">
        <ProjectList
          ordered
          items={[
            'Establish the interface of 15+ digital product pages and their varied states for development',
            'Create design system for dark and light modes',
            'Work with animator to create demo reel to be shown in vehicle during vehicle showcase',
          ]}
        />
      </ProjectSection>

      {/* Deliverables */}
      <ProjectSection id="deliverables" title="Deliverables">
        <ProjectSubsection title="IVI Mockups">
          <ProjectText>
            40+ high-fidelity mockups of 15+ features in light/dark mode
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/tile-mode.png"
            alt="INDI EV IVI tile mode showing multiple feature access"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Design System">
          <ProjectText>
            Complete design system library for IVI with linked components
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/design-system.png"
            alt="INDI EV IVI design system with atomic components"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Demo Reel">
          <ProjectText>
            Demo reel showing 7 key flows to be shown in-vehicle at auto show
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/reel-outline.png"
            alt="Demo reel storyboard outline for auto show presentation"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Process */}
      <ProjectSection id="process" title="Design Process">
        <ProjectList
          ordered
          items={[
            'Gather requirements: Refer to wireframes and flows, asking questions where needed',
            'Define look & feel: Create options for final look & feel and present to design team and stakeholders',
            'Create high-fidelity mockups: Create mockups for 15+ pages/flows for the demo reel on Figma',
            'Review & iterate: Present mockups & proposed user flows to team and stakeholders, working quickly and iteratively',
          ]}
        />

        <ProjectSubsection title="Referencing Existing Wireframes">
          <ProjectText>
            The digital design lead handed off his wireframes of several features and pages. I was given the creative freedom to reimagine them for the final design, though the basic framework had to remain consistent (i.e., navigation bar, AI widget panel).
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/wireframe-nav.png"
            alt="Original wireframes showing navigation and My Day features"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Look & Feel */}
      <ProjectSection id="look-feel" title="Establishing Look & Feel">
        <ProjectText>
          Upon receiving a download of the product and the wireframes, I held some meetings with the design team about the intended look and feel of the product. As a brand, INDI EV strives to deliver a sleek, modern, and personalized experience. I wanted to create a design language that echoed that.
        </ProjectText>
        <ProjectImageFullWidth
          src="/assets/projects/indi-ev/content/mood-board.png"
          alt="Mood board exploring sleek and modern design directions"
        />

        <ProjectSubsection title="Hybrid Approach">
          <ProjectText>
            The design team expressed an interest in making the design neumorphic, as most people are used to the physical controls in their car. While designing a neumorphic approach, I felt that the excess shading was feeling a bit heavy (especially on dark mode) and distracting.
          </ProjectText>
          <ProjectText>
            Due to this, I developed a "hybrid" design approach which combines elements of neumorphic and flat design. The goal was to retain enough elements of neumorphic design to give it a 3D effect without being overstated. This resulted in a more lightweight and sleek finish.
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/style-comparison.png"
            alt="Comparison between full neumorphic and hybrid design approaches"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Iterations */}
      <ProjectSection id="iterations" title="Iterations & Usability Testing">
        <ProjectSubsection title="Climate Case Study">
          <ProjectText>
            Throughout the design process, I conducted quick usability tests periodically to help inform my decision making. One of the more complicated designs was for Climate. The initial wireframe showcased all the requirements:
          </ProjectText>
          <ProjectList
            items={[
              'Temperature display',
              'Temperature adjuster for both seats and ability to link/unlink',
              'AC settings (on/off, auto, airflow direction)',
              'Fan on/off and intensity adjuster',
              'Seat warmer on/off and intensity adjuster',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Iteration 1 (Brainstorming)">
          <ProjectText>
            My first iteration was rough. I started by placing all required components on the screen. Issues included:
          </ProjectText>
          <ProjectList
            items={[
              'A lack of visual chunking makes this difficult to scan',
              'Some iconography is ambiguous',
              'The round temperature slider is not intuitive',
              'Overall too visually cluttered',
            ]}
          />
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/climate-iteration1.png"
            alt="First climate control iteration with all components visible"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Iteration 2 (Usability Testing)">
          <ProjectText>
            For the second iteration, I made several improvements: created three distinct groups, changed the circular slider to semi-circles, updated iconography, and repositioned seat warmers for accessibility.
          </ProjectText>
          <ProjectText>
            I recruited 3 people and gave them 4 tasks, timing how long each took. The usability test revealed pain points around Fan Speed & AUTO coupling, inconsistent toggles, and an ambiguous sync icon.
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/climate-iteration2.png"
            alt="Second climate iteration with improved visual grouping"
          />
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/usability-testing.png"
            alt="Usability testing results showing pain points discovered"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Iteration 3 (Final)">
          <ProjectText>
            For my final iteration, I reduced clutter significantly by regrouping elements onto a bottom toolbar, getting rid of toggles altogether. I defined rules for toolbar features based on number of tap engagements needed, which freed space for a larger, more usable climate control section.
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/climate-iteration3.png"
            alt="Final climate control design with bottom toolbar and cleaner layout"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Mockups */}
      <ProjectSection id="mockups" title="High-Fidelity Mockups">
        <ProjectText>
          I created high-fidelity mockups for 15+ pages, including:
        </ProjectText>
        <ProjectList
          items={[
            'My Day (welcome screen while car is parked)',
            'Navigation (parked and driving states)',
            'Tile view',
            'Radio/Music',
            'Climate',
            'Bluetooth devices',
            'Camera + Camera reel',
            'App store',
            'INDI Explorer (native tour app)',
            'Meditations (native app)',
            'Cluster display (parked, driving, warning, ADAS states)',
            'Passenger-side UX',
          ]}
        />
        <ProjectText>
          For each screen, I created a dark and light mode version.
        </ProjectText>
        <ProjectImageGrid
          images={[
            { src: '/assets/projects/indi-ev/content/my-day-dark.png', alt: 'My Day welcome screen in dark mode' },
            { src: '/assets/projects/indi-ev/content/dark-cluster.png', alt: 'Cluster display in dark mode' },
            { src: '/assets/projects/indi-ev/content/radio-app.png', alt: 'Radio app interface' },
            { src: '/assets/projects/indi-ev/content/dark-app-store.png', alt: 'App store in dark mode' },
            { src: '/assets/projects/indi-ev/content/indi-explorer.png', alt: 'INDI Explorer native app' },
          ]}
          columns={2}
        />
      </ProjectSection>

      {/* Design System */}
      <ProjectSection id="design-system" title="Design System">
        <ProjectText>
          While creating high-fidelity mockups, I was simultaneously building the design system. I followed an atomic design structure and divided it into the following sections: Typography, Colors, Iconography, Components, Templates, Pages.
        </ProjectText>
        <ProjectImageFullWidth
          src="/assets/projects/indi-ev/content/design-system.png"
          alt="INDI EV design system with typography, colors, and components"
        />

        <ProjectSubsection title="Demo Reel">
          <ProjectText>
            Lastly, I worked with an animator to bring the designs to life in a demo reel that was displayed inside a model car during an auto show. For the film, we had to make sure that all 3 screens (cluster, driver, and passenger displays) were in sync. I provided the animator with all the screens for each flow and we determined the interaction animations as a team.
          </ProjectText>
          <ProjectYouTube
            url="https://youtu.be/2y1L2txpWsM"
            caption="INDI EV Demo Reel - Auto Show Presentation"
          />
        </ProjectSubsection>
      </ProjectSection>
    </ProjectLayout>
  )
}
