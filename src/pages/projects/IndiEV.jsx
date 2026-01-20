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
  UsabilityResultsTaskCentric,
  UsabilityResultsValidation,
  IndiEVDeliverables,
  InteractiveClimateDemo,
  StyleComparisonToggle,
} from '../../components/project'
import { useTheme } from '../../context/ThemeContext'
import { getColor } from '../../constants/colors'
import {
  ClipboardText,
  Palette,
  Layout,
  ArrowsClockwise,
  Sun,
  NavigationArrow,
  SquaresFour,
  MusicNote,
  Thermometer,
  Bluetooth,
  Camera,
  Storefront,
  Compass,
  HandsPraying,
  Gauge,
  User
} from '@phosphor-icons/react'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'process', label: 'Process' },
  { id: 'look-feel', label: 'Look & Feel' },
  { id: 'iterations', label: 'Case Study' },
  { id: 'mockups', label: 'Mockups' },
  { id: 'design-system', label: 'Design System' },
  { id: 'demo-reel', label: 'Demo Reel' },
]

export default function IndiEV() {
  const { isDark } = useTheme()

  return (
    <ProjectLayout sections={sections}>
      <ProjectHero
        company="INDI EV"
        title="Electric Car IVI"
        description="INDI EV was a Los Angeles-based electric car startup whose key differentiator was the VIC (Vehicle Integrated Computer) — an onboard supercomputer enabling gaming, content creation, and streaming. I designed the infotainment system across three displays: cluster, driver, and passenger."
        role="UX/UI Designer"
        timeline="Aug 2020 – Sep 2021"
        impact="Debuted at Automobility LA 2021"
        coverImage="/assets/projects/indi-ev/content/banner.webp"
        darkBanner
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          As the UX/UI Designer on this project, I was responsible for designing the entire in-vehicle infotainment (IVI) system interface. This included creating 40+ high-fidelity mockups across 15+ features, establishing a comprehensive design system for both light and dark modes, and collaborating with an animator to produce a demo reel showcased at Automobility LA 2021.
        </ProjectText>
        <ProjectYouTube
          url="https://youtu.be/2y1L2txpWsM"
          caption="INDI EV Demo Reel - Auto Show Presentation"
        />

        <ProjectSubsection title="Deliverables">
          <IndiEVDeliverables />
        </ProjectSubsection>
      </ProjectSection>

      {/* Process */}
      <ProjectSection id="process" title="Design Process">
        <div className="relative mt-6 mb-12">
          <div className="space-y-5">
            {[
              { title: 'Gather requirements', description: 'Refer to wireframes and flows, asking questions where needed', icon: ClipboardText, colorKey: 'amethyst' },
              { title: 'Define look & feel', description: 'Create options for final look & feel and present to design team and stakeholders', icon: Palette, colorKey: 'lilac' },
              { title: 'Create high-fidelity mockups', description: 'Create mockups for 15+ pages/flows for the demo reel on Figma', icon: Layout, colorKey: 'rose' },
              { title: 'Review & iterate', description: 'Present mockups & proposed user flows to team and stakeholders, working quickly and iteratively', icon: ArrowsClockwise, colorKey: 'gold' },
            ].map((item, index, arr) => {
              const Icon = item.icon
              const color = getColor(item.colorKey, isDark)
              const isLast = index === arr.length - 1
              return (
                <div key={index} className="relative flex gap-4">
                  {/* Icon in circular background */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon size={20} weight="regular" style={{ color }} />
                    </div>
                    {/* Connecting line to next item */}
                    {!isLast && (
                      <div
                        className={`absolute left-1/2 w-px -translate-x-1/2 ${
                          isDark ? 'bg-white/10' : 'bg-black/10'
                        }`}
                        style={{ top: '48px', bottom: '-12px' }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h4 className="font-satoshi text-base md:text-[17px] font-medium mb-1 theme-heading">
                      {item.title}
                    </h4>
                    <p className="font-satoshi text-[15px] leading-relaxed theme-caption">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <ProjectSubsection title="Referencing Existing Wireframes">
          <ProjectText>
            The digital design lead handed off his wireframes of several features and pages. I was given the creative freedom to reimagine them for the final design, though the basic framework had to remain consistent (i.e., navigation bar, AI widget panel).
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/wireframe-nav.webp"
            alt="Navigation wireframe created by design lead"
            caption="Navigation wireframe created by design lead"
          />
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/my-day-main.webp"
            alt="My Day wireframe created by design lead"
            caption="My Day wireframe created by design lead"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Look & Feel */}
      <ProjectSection id="look-feel" title="Establishing Look & Feel">
        <ProjectText>
          Upon receiving a download of the product and the wireframes, I held some meetings with the design team about the intended look and feel of the product. As a brand, INDI EV strives to deliver a sleek, modern, and personalized experience. I wanted to create a design language that echoed that.
        </ProjectText>
        <ProjectImageFullWidth
          src="/assets/projects/indi-ev/content/mood-board.webp"
          alt="Mood board exploring sleek and modern design directions"
        />

        <ProjectSubsection title="Hybrid Approach">
          <ProjectText>
            The design team expressed an interest in making the design neumorphic, as most people are used to the physical controls in their car. While designing a neumorphic approach, I felt that the excess shading was feeling a bit heavy (especially on dark mode) and distracting.
          </ProjectText>
          <ProjectText>
            Due to this, I developed a "hybrid" design approach which combines elements of neumorphic and flat design. The goal was to retain enough elements of neumorphic design to give it a 3D effect without being overstated. This resulted in a more lightweight and sleek finish.
          </ProjectText>
          <StyleComparisonToggle />
        </ProjectSubsection>
      </ProjectSection>

      {/* Climate Control Case Study */}
      <ProjectSection id="iterations" title="Climate Control: A Case Study">
        <ProjectText>
          One of the more complex features I designed was the Climate control interface. The initial wireframe from the design lead outlined all the requirements:
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
        <ProjectImageFullWidth
          src="/assets/projects/indi-ev/content/wireframe-climate.webp"
          alt="Initial climate control wireframe by design lead"
          caption="Climate wireframe by previous designer"
        />

        <ProjectSubsection title="Initial Exploration">
          <ProjectText>
            For my first pass, I adapted the wireframe into the visual design language while making some initial changes. This exploration revealed several issues:
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
            src="/assets/projects/indi-ev/content/climate-iteration1.webp"
            alt="First climate control iteration with all components visible"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Design Iteration">
          <ProjectText>
            For the second iteration, I made several improvements: created three distinct groups, changed the circular slider to semi-circles, updated iconography, and repositioned seat warmers for accessibility.
          </ProjectText>
          <ProjectImageFullWidth
            src="/assets/projects/indi-ev/content/climate-iteration2.webp"
            alt="Second climate iteration with improved visual grouping"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Usability Testing">
          <ProjectText>
            To validate these improvements with real users, I conducted a quick usability test. I recruited 3 people and gave them 4 tasks, timing how long it took to complete each one. The tasks were:
          </ProjectText>
          <ProjectList
            ordered
            items={[
              'Turn on the AC',
              'Change the fan speed',
              'Sync the temperatures for driver & passenger',
              'Change the direction of the airflow to the top position for the driver\'s seat',
            ]}
          />
          <ProjectText>
            For each task, I measured three things: whether they completed it successfully, how long it took, and how easy they felt it was on a 7-point scale. The ease rating uses the Single Ease Question (SEQ)—a standard UX metric where 7 means "very easy" and 1 means "very difficult." A score of 5.5 or above generally indicates good usability.
          </ProjectText>
          <UsabilityResultsTaskCentric />
        </ProjectSubsection>

        <ProjectSubsection title="Findings">
          <ProjectText>
            The results revealed a clear pain point: changing the fan speed was significantly harder than other tasks. Through follow-up questions, I identified three key issues:
          </ProjectText>
          <ProjectList
            items={[
              'Fan Speed & AUTO coupling: Users were confused that adjusting fan speed automatically turned off AUTO mode, with no clear feedback',
              'Inconsistent toggles: The mix of toggle styles (buttons vs. sliders) created cognitive friction',
              'Ambiguous sync icon: Users hesitated on the temperature sync task because the icon wasn\'t immediately recognizable',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Final Design">
          <ProjectText>
            Armed with these insights, I redesigned the interface to directly address each pain point. I reduced clutter by regrouping secondary controls onto a bottom toolbar, replacing confusing toggles with a consistent tap-to-expand pattern. The fan speed control now opens as a dedicated layer with clear visual feedback, making the interaction explicit rather than hidden.
          </ProjectText>
          <InteractiveClimateDemo />
        </ProjectSubsection>

        <ProjectSubsection title="Validation">
          <ProjectText>
            To confirm the redesign addressed the usability issues, I ran a follow-up test with 3 new participants using the same 4 tasks. The results validated the design decisions:
          </ProjectText>
          <UsabilityResultsValidation />
          <ProjectText>
            The most significant improvement was in Task 2 (Change fan speed), which went from 67% success rate and 23 seconds to 100% success in under 5 seconds. The dedicated fan layer with explicit controls eliminated the confusion around AUTO mode coupling. Overall, all tasks now completed with similar ease, indicating a more consistent and learnable interface.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* Mockups */}
      <ProjectSection id="mockups" title="High-Fidelity Mockups">
        <ProjectText>
          I created high-fidelity mockups for 15+ pages in dark and light mode. Some examples include:
        </ProjectText>
        <div className="flex flex-wrap gap-2 my-6">
          {[
            { name: 'Welcome Screen', icon: Sun },
            { name: 'Navigation', icon: NavigationArrow },
            { name: 'Tile View', icon: SquaresFour },
            { name: 'Radio/Music', icon: MusicNote },
            { name: 'Climate', icon: Thermometer },
            { name: 'Bluetooth', icon: Bluetooth },
            { name: 'Camera', icon: Camera },
            { name: 'App Store', icon: Storefront },
            { name: 'INDI Explorer', icon: Compass },
            { name: 'Meditations', icon: HandsPraying },
            { name: 'Cluster Display', icon: Gauge },
            { name: 'Passenger UX', icon: User },
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
        <ProjectImageGrid
          images={[
            { src: '/assets/projects/indi-ev/content/dark-cluster.webp', alt: 'Cluster display in dark mode', caption: 'Cluster (Dark Mode)' },
            { src: '/assets/projects/indi-ev/content/tile-mode.webp', alt: 'INDI EV IVI tile mode showing multiple feature access', caption: 'Tiles (Dark Mode)' },
            { src: '/assets/projects/indi-ev/content/my-day-dark.webp', alt: 'Welcome screen in dark mode', caption: 'Welcome Screen (Dark Mode)' },
            { src: '/assets/projects/indi-ev/content/radio-app.webp', alt: 'Radio app interface', caption: 'Radio (Light Mode)' },
            { src: '/assets/projects/indi-ev/content/dark-app-store.webp', alt: 'App store in dark mode', caption: 'App Store (Dark Mode)' },
            { src: '/assets/projects/indi-ev/content/indi-explorer.webp', alt: 'INDI Explorer native app', caption: 'Navigation (Light Mode)' },
          ]}
          columns={1}
        />
      </ProjectSection>

      {/* Design System */}
      <ProjectSection id="design-system" title="Design System">
        <ProjectText>
          While creating high-fidelity mockups, I was simultaneously building the design system. I followed an atomic design structure and divided it into the following sections: Typography, Colors, Iconography, Components, Templates, Pages.
        </ProjectText>
        <ProjectImageFullWidth
          src="/assets/projects/indi-ev/content/design-system.webp"
          alt="INDI EV design system with typography, colors, and components"
          caption="Atomic design structure: Typography, Colors, Iconography, Components, Templates, Pages"
        />
      </ProjectSection>

      {/* Demo Reel */}
      <ProjectSection id="demo-reel" title="Demo Reel">
        <ProjectText>
          Lastly, I worked with an animator to bring the designs to life in a demo reel that was displayed inside a model car during an auto show. For the film, we had to make sure that all 3 screens (cluster, driver, and passenger displays) were in sync. I provided the animator with all the screens for each flow and we determined the interaction animations as a team.
        </ProjectText>
        <ProjectImageFullWidth
          src="/assets/projects/indi-ev/content/reel-outline.webp"
          alt="Demo reel frame showing IVI interface"
          caption="IVI Display"
        />
        <ProjectImageGrid
          images={[
            { src: '/assets/projects/indi-ev/content/demo-reel-1.webp', alt: 'Demo reel storyboard outline showing key flows', caption: 'Demo reel outline showing 7 key flows' },
            { src: '/assets/projects/indi-ev/content/demo-reel-2.webp', alt: 'Demo reel frame showing navigation', caption: 'Navigation Flow' },
            { src: '/assets/projects/indi-ev/content/reel-cluster.webp', alt: 'Demo reel frame showing cluster display', caption: 'Cluster Display' },
          ]}
          columns={1}
        />

        <ProjectSubsection title="Auto Show Debut">
          <ProjectText>
            The demo reel was displayed inside a model car at Automobility LA 2021, where INDI EV publicly unveiled the INDI ONE. The vehicle and its infotainment system were featured in publications including <a href="https://www.newsweek.com/social-media-focused-indi-one-electric-car-automobility-la-1649446" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">Newsweek</a> and <a href="https://electrek.co/2022/08/19/test-drive-indievs-indi-one-through-la/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">Electrek</a>.
          </ProjectText>
          <div
            className={`overflow-hidden rounded-xl md:rounded-2xl my-6 ${
              isDark ? 'bg-[#111111]' : 'bg-gray-100'
            }`}
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src="/assets/projects/indi-ev/content/autoshow.webp"
              alt="INDI ONE on display at Automobility LA 2021"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </ProjectSubsection>

        <ProjectSubsection title="Promo Video">
          <ProjectText>
            The infotainment interface also makes a brief appearance in the official promo video.
          </ProjectText>
          <ProjectYouTube
            url="https://youtu.be/h7AWyPa55Xc"
          />
        </ProjectSubsection>
      </ProjectSection>
    </ProjectLayout>
  )
}
