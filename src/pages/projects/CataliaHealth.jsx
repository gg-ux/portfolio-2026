import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSubsection,
  ProjectText,
  ProjectList,
  ProjectCallout,
  ProjectImage,
  ProjectImageGrid,
  ChartCaption,
  ProjectVimeo,
  DoubleDiamond,
  PDFCarousel,
  ResearchTimeline,
  SurveyStats,
  AgeDemographics,
  ResearchMethodologies,
  ResearchRequirements,
  TopicCardsTable,
  SurveyFindingsChart,
  SurveyFindingsDots,
  TopCommunityAttributes,
  CardSortResults,
  CardSortMatrix,
  InteractionComparison,
  UserArchetypes,
  PersonasChart,
  CoreUserStory,
  CommunityUserFlow,
  UsabilityScenario,
  ExploreUserFlow,
  MiroBoard,
  FlourishBranding,
} from '../../components/project'
import { Body, H4 } from '../../components/Typography'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'team', label: 'Team' },
  { id: 'research', label: 'Research' },
  { id: 'findings', label: 'Findings' },
  { id: 'design', label: 'Design' },
  { id: 'testing', label: 'Testing' },
  { id: 'outcome', label: 'Outcome' },
]

export default function CataliaHealth() {
  const { isDark } = useTheme()
  const [teamRef, teamVisible] = useScrollReveal({ threshold: 0.2 })

  return (
    <ProjectLayout sections={sections}>
      <ProjectHero
        company="Catalia Health"
        title="Patient Community App"
        description="Catalia Health is a digital healthcare management company. Their core product is an interactive personal assistant robot, Mabu. The mission was to create a HIPAA-compliant patient community to improve patients' well-being through access to a greater patient community and personalized resources."
        role="Lead UX Designer + Researcher"
        timeline="April–June 2019"
        team="Team of 4"
        output="Patient-tested prototype + case study PDF"
        coverImage="/assets/projects/catalia-health/content/banner.png"
        lightBanner
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          Flourish is a patient community app designed to help chronically ill patients feel more informed, motivated to follow their treatment plans, and connected to others with similar experiences. In 5 months, our team conducted extensive research and delivered a high-fidelity prototype.
        </ProjectText>
        <ProjectVimeo url="https://vimeo.com/358226687" className="mb-16" />

        <ProjectSubsection title="Research Requirements">
          <ResearchRequirements />
        </ProjectSubsection>

        <ProjectSubsection title="Case Study">
          <ProjectText>
            As part of our deliverables, I designed a comprehensive 36-page print-ready case study, documenting our research methodology, key findings, and design process from start to finish.
          </ProjectText>
          <PDFCarousel
            pages={[
              { src: '/assets/projects/catalia-health/content/pdf-pages/page-1-cover.png', alt: 'Cover' },
              { src: '/assets/projects/catalia-health/content/pdf-pages/page-2-toc.png', alt: 'Table of Contents' },
              { src: '/assets/projects/catalia-health/content/pdf-pages/page-3-left.png', alt: 'Executive Summary' },
              { src: '/assets/projects/catalia-health/content/pdf-pages/page-3-right.png', alt: 'Meet Our Team' },
            ]}
            pdfUrl="https://gg-portfolio.s3-us-west-1.amazonaws.com/FlourishApp-PrintReadySpread.pdf"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Team */}
      <ProjectSection id="team" title="Meet the Team">
        <ProjectText>
          Our team is made up of four UX experts — based in San Francisco and Los Angeles, California — with one unified goal in mind: To deliver the most well-researched, usable, and clean design solution possible.
        </ProjectText>

        {/* Team Grid */}
        <div ref={teamRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {[
            { name: 'Grace Guo', role: 'Lead UX/UI Designer\nUser Researcher', image: 'Catalia-Grace.png' },
            { name: 'Renee Reid', role: 'Lead User Researcher', image: 'Catalia-Renee.png' },
            { name: 'Alex Rosales', role: 'Product Manager', image: 'Catalia-Alex.png' },
            { name: 'Alexa Steinhauser', role: 'UX/UI Designer\nUser Researcher', image: 'Catalia-Alexa.png' },
          ].map((member, index) => (
            <div
              key={member.name}
              className="text-center"
              style={{
                opacity: teamVisible ? 1 : 0,
                transform: teamVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.5s ease-out ${index * 0.15}s, transform 0.5s ease-out ${index * 0.15}s`,
              }}
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                {/* Photo */}
                <div className="absolute inset-0 z-10 rounded-full overflow-hidden">
                  <img
                    src={`/assets/projects/catalia-health/content/${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Frosted glass frame */}
                <div
                  className={`absolute -inset-2 rounded-full pointer-events-none backdrop-blur-md border ${
                    isDark
                      ? 'border-white/[0.08] bg-white/[0.015]'
                      : 'border-black/[0.08] bg-white/20'
                  }`}
                >
                  <svg className="absolute inset-0 w-full h-full rounded-full opacity-40">
                    <defs>
                      <filter id={`team-frame-grain-${index}`} x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.8"
                          numOctaves="4"
                          seed={42 + index}
                          stitchTiles="stitch"
                        />
                        <feColorMatrix
                          type="matrix"
                          values={isDark
                            ? "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0"
                            : "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"
                          }
                        />
                      </filter>
                    </defs>
                    <rect width="100%" height="100%" filter={`url(#team-frame-grain-${index})`} />
                  </svg>
                </div>
              </div>
              <p className={`font-satoshi font-semibold text-base md:text-lg mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                {member.name}
              </p>
              <Body size="sm" className={`mb-0 whitespace-pre-line ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                {member.role}
              </Body>
            </div>
          ))}
        </div>

        <ProjectSubsection title="Considerations">
          <ProjectText>
            We knew this project would be research heavy. Facilitating patient-to-patient interaction was new territory for Catalia Health, whose existing research focused on patients' engagement with Mabu and healthcare providers. Recruiting participants required extra care due to the specificity of their conditions—we narrowed our scope to patients with Congestive Heart Failure, a key patient group Catalia was already researching for Mabu.
          </ProjectText>
          <ProjectText>
            Interacting with patients required sensitivity toward their physical and emotional states, as well as strict attention to HIPAA compliance and PII protection.
          </ProjectText>
          <ProjectCallout>
            In order to become HIPAA-certified, our team completed a HIPAA-compliance training course.
          </ProjectCallout>
          <ProjectText>
            Our research phase consisted of generative research with chronically ill patients to understand what community content offered the most value. We conducted semi-structured interviews, a card sort activity, and a large-scale survey as part of our preliminary research.
          </ProjectText>
          <ProjectText>
            For design, we understood the heavy research lift might affect our ability to reach a high-fidelity prototype. Since the client expected a concept with next steps rather than a polished prototype, we time-boxed our design, testing, and iteration cycles to meet this goal.
          </ProjectText>
        </ProjectSubsection>

        <ProjectSubsection title="Project Timeline">
          <ProjectText>
            Following an aggressive 5-month timeline, we structured our work across five key phases: Planning, Discover, Define, Develop, and Deliver.
          </ProjectText>
          <ResearchTimeline />
        </ProjectSubsection>
      </ProjectSection>

      {/* Research */}
      <ProjectSection id="research" title="Research Phase">
        <DoubleDiamond />

        <ProjectSubsection title="Secondary Research">
          <ProjectText>
            To get better domain knowledge of the problem space, Catalia provided the team with data around patients with chronic illness. This helped us understand some of the physical and emotional challenges this group faces:
          </ProjectText>
          <ProjectList
            items={[
              '48% of chronically ill patients were scored as depressed by the Beck Depression Inventory',
              'Depression is more common in younger individuals than those over 65',
              'Patients maintain a "naturalistic" decision making process—focusing on process rather than outcomes',
              'HF self-care requires following advice of providers: medications, low-sodium diet, exercise, and self-monitoring',
            ]}
          />
          <ProjectText>
            We also researched how a patient community could help patients deal with chronic illness:
          </ProjectText>
          <ProjectList
            items={[
              'Patients have individualized differences when it comes to their experiences—sharing personal strategies may not be effective without acknowledging these differences',
              'Patients derive personal meanings through "alignment"—comparing and contrasting one another\'s experiences',
              'Websites like PatientsLikeMe were effective for psychological experience and perceived control, yet have limitations due to individual differences',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Primary Research">
          <ProjectText>
            We sought to complete exploratory research with actual patients. We limited our scope to patients with congestive heart failure (CHF) since they are a target demographic for Catalia Health.
          </ProjectText>
          <ProjectText>
            In recruiting this specific group, we leveraged existing connections from Catalia Health, including a patient who administered a Facebook group for CHF patients. We also reached out to chronic illness communities on Reddit for more anonymity, and our personal networks.
          </ProjectText>
          <SurveyStats />
          <ProjectText>
            We recruited 42 participants for interviews and a survey/card sort exercise. Participants were between the ages of 30-65 and lived across the United States.
          </ProjectText>
          <AgeDemographics />
        </ProjectSubsection>

        <ProjectSubsection title="Methodologies">
          <ProjectText>
            We completed remote interviews with 13 chronic heart failure patients and administered a card sort and survey to the remaining 29 participants. From our one-on-one interviews, we hoped to:
          </ProjectText>
          <ProjectList
            items={[
              'Gain insight on daily life of a chronically ill patient',
              'Understand how patients currently engage in online communities',
              'Get feedback on features important for an online patient community',
            ]}
          />
          <ResearchMethodologies />
          <ProjectText>
            Most interviews were conducted using Zoom. Phonecall participants tended to be older—in their 60s—and less likely to engage with online communities, while video chat participants tended to be younger and more engaged.
          </ProjectText>
          <ProjectText>
            We also sent out a card sort activity and survey to discover desired attributes of an online patient community. For the first part, participants completed a survey gauging demographics, behaviors, and devices used. They then sorted 17 cards containing aspects of a patient community into categories by importance.
          </ProjectText>
          <TopicCardsTable />
        </ProjectSubsection>

        <ProjectSubsection title="HIPAA Compliance">
          <ProjectText>
            Due to sensitivity regarding personally identifiable information, we needed to become HIPAA certified before interacting with patients. We took great lengths to keep patient data private and secure by:
          </ProjectText>
          <ProjectList
            items={[
              'Using secure platforms to host patient information and communications',
              'Using codes to de-identify patient information (e.g. patient numbers vs. names)',
              'Deleting patient data and information at the end of the study',
            ]}
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Findings */}
      <ProjectSection id="findings" title="Research Findings">
        <ProjectSubsection title="Survey Findings">
          <ProjectText>
            From our survey of 29 participants, we found that a large majority engage in online communities and access them using their mobile device. A little more than half would meet up with group members located near them.
          </ProjectText>
          <SurveyFindingsDots />
        </ProjectSubsection>

        <ProjectSubsection title="Top Community Attributes">
          <ProjectText>
            When asked to indicate their top 3 most important attributes from a list of community attributes, "Respect and kindness", "Access to chronic illness research", and "Info on local support groups and physicians" ranked at the top.
          </ProjectText>
          <TopCommunityAttributes />
        </ProjectSubsection>

        <ProjectSubsection title="Card Sort Findings">
          <ProjectText>
            When 20 participants sorted 17 community attributes by importance, a clear pattern emerged: patients prioritized features that helped them understand and manage their condition over social features. Educational content and peer discussions about diagnoses consistently ranked highest, while intimacy, religious support, and unmoderated spaces ranked lowest—suggesting patients want structure and relevance over open-ended social connection.
          </ProjectText>
          <CardSortMatrix />
          <H4 className="mt-12 mb-4">Key Priorities</H4>
          <ProjectText>
            Synthesizing these results, clear priorities emerged around what patients valued most—and least—in an online community.
          </ProjectText>
          <CardSortResults />
        </ProjectSubsection>

        <ProjectSubsection title="Key Interview Findings">
          <ProjectText>
            We uncovered 5 major themes that informed us of patient attitudes and behaviors:
          </ProjectText>
          <ProjectList
            ordered
            items={[
              'Patients use community for a sense of belonging and giving back',
              'Identified (vs. anonymous) users made patients feel more supported',
              'Older participants preferred face-to-face interactions',
              'All patients use their mobile phones; not all had a computer',
              'Common pain points: transportation and maintaining a good diet',
            ]}
          />
          <InteractionComparison />
        </ProjectSubsection>

        <ProjectSubsection title="Archetypes">
          <ProjectText>
            We found three types of community user archetypes—two (Contributors and Lurkers) whose characteristics were independent of their patient journey progress, and one (Mentors) whose behavior was tied to how long they had been a patient.
          </ProjectText>
          <ProjectText>
            Contributors and Lurkers displayed opposite characteristics. Contributors were mainly female, preferred to be identified, and focused on building relationships. Lurkers were mainly male, preferred anonymity, and prioritized finding answers through education over relationship-building. Both groups noted these tendencies weren't specific to patient communities.
          </ProjectText>
          <ProjectText>
            Mentors were further along in their journey and wished to give back—many started their own communities or became moderators. They felt more responsibility for others in the community than for themselves and typically didn't join for educational content.
          </ProjectText>
          <UserArchetypes />
        </ProjectSubsection>

      </ProjectSection>

      {/* Design */}
      <ProjectSection id="design" title="Design Phase">
        <ProjectSubsection title="Goals for Design">
          <ProjectText>
            After presenting research findings with Catalia Health, it was decided that patient-to-patient and patient-to-education interactions should be prioritized. We began the design by asking:
          </ProjectText>
          <ProjectList
            items={[
              'What kind of content would generate the most usage and value?',
              'What kind of engagements would facilitate a positive increase in a patient\'s overall well-being?',
            ]}
          />
          <ProjectText>
            Our North Star was to increase the duration of patient engagement and improve health outcomes through engaging, dynamic content. Since what's "engaging" varies by where a patient is in their journey, we knew personalization would be key—content needed to adapt based on how long someone had been living with their condition.
          </ProjectText>
          <ProjectText>
            The prototype needed to give users the ability to: see an overview of their health journey and use it to seek or give guidance, maintain privacy while sharing personal information, educate themselves through credible articles, and share experiences around topics like diet, medications, and symptom management.
          </ProjectText>
          <CoreUserStory />
        </ProjectSubsection>

        <ProjectSubsection title="Brainstorming">
          <ProjectText>
            Using our north star and research priorities, we used Miro to brainstorm the community's information architecture. This exercise helped us answer key questions: What's the main framework? Which findings should appear in navigation? Should we integrate Mabu, and how?
          </ProjectText>
          <ProjectText>
            We split into two groups to explore different site map approaches, which helped us understand potential IA structures and prioritize features. For scope, we focused on online community and resource features, saving Mabu integration and in-person interactions for future development.
          </ProjectText>
          <MiroBoard variant={1} />
          <ChartCaption>This board focuses on person-to-person interactions and connecting others with in-person resources</ChartCaption>
          <MiroBoard variant={2} />
          <ChartCaption>This board focuses on patient-to-education interactions and integration with the existing Mabu product</ChartCaption>
        </ProjectSubsection>

        <ProjectSubsection title="Concept Sketching">
          <ProjectText>
            In an all-day session, we performed a design sprint using "Crazy Eights" established by Google. Key ideas that emerged:
          </ProjectText>
          <ProjectList
            items={[
              'Breaking out features into "Community," "Education", and "Resources"',
              'Utilizing personalization to cater dynamic content relevant to the user',
              'Branching out the "Community" feature into different topics or categories',
              'Incorporating Mabu as a mascot or other Catalia Health-generated prompts',
            ]}
          />
          <ProjectImage
            src="/assets/projects/catalia-health/content/screen-04.png"
            alt="Hand-drawn wireframe sketches from Crazy Eights design sprint"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Developing the Wireframes">
          <ProjectText>
            We collaborated on transforming the most compelling sketches into organized, streamlined screens. Using a whiteboard for rapid iteration, we first established the navigation hierarchy—which revealed "Explore" and "Community" as the app's core pages.
          </ProjectText>
          <ProjectText>
            "Explore" would serve as the homepage, with content personalized based on onboarding data that maps users to their patient journey stage. Both official publications and community content would be featured under "Recommended Articles" and "Recommended Posts"—articles curated by Catalia Health or moderators, posts surfaced based on user preferences. Users could bookmark or comment on any featured content.
          </ProjectText>
          <ProjectText>
            With these two key features defined, we mapped out two separate user journeys and used them as a framework to build the wireframes, walking through each to match users' mental models.
          </ProjectText>
        </ProjectSubsection>

        <ProjectSubsection title="User Flows">
          <ProjectText>
            We mapped out the community and explore user flows to understand how patients would navigate and engage with the app's core features.
          </ProjectText>
          <CommunityUserFlow />
          <ExploreUserFlow />
        </ProjectSubsection>

        <ProjectSubsection title="Whiteboard Sessions">
          <ProjectText>
            Using whiteboard collaboration, we transformed our user flows into organized screen layouts. We established a navigation hierarchy with "Explore" and "Community" as the app's two core pages, then sketched detailed wireframes for each feature.
          </ProjectText>
          <ProjectText>
            For "Explore," we designed a personalized homepage where content adapts based on the patient's journey stage. Users see "Recommended Articles" (curated by Catalia Health) and "Recommended Posts" (from other patients) with options to bookmark or comment. For "Community," we organized discussions by topic categories—allowing patients to browse, post stories, and connect with others facing similar challenges.
          </ProjectText>
          <ProjectImage
            src="/assets/projects/catalia-health/content/screen-06.png"
            alt="Whiteboard wireframes for Community feature"
          />
          <ProjectImage
            src="/assets/projects/catalia-health/content/screen-08.png"
            alt="Whiteboard wireframes for Explore feature"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Collaborating with Catalia">
          <ProjectText>
            To maximize our working day with Catalia Health, we began by sharing our developed wireframes, referencing the two main user journeys we mapped out for our prototype. The purpose of this meeting was to show the client our current progress and receive feedback on the development of our work.
          </ProjectText>
          <ProjectText>
            Working closely with Catalia Health's lead UX designer, Stacey Seronick, we iterated on the wireframes together. She suggested implementing their existing personas to help personalize the user journeys. The personas most applicable to our design were those representing "Beginner" and "Intermediate" patient types—these patients would benefit most from engaging with the community and its content.
          </ProjectText>
          <PersonasChart />
          <ProjectText>
            Together, we fleshed out how the community's content could change dynamically based on how long a patient has been diagnosed. At the micro level, we still needed to make design decisions around what information would be most important for personalization—but at the macro level, this collaboration helped us pivot toward a product that could actually be used by congestive heart failure patients.
          </ProjectText>
        </ProjectSubsection>

        <ProjectSubsection title="Final Look">
          <ProjectText>
            For the main color, we chose a shade of teal (#47bcca) that complements Catalia Health's blue and orange while standing on its own. The warmer teal represents a merging of blue and green—genuinity and organic growth. For typography, we selected Avenir, a modern sans-serif that's clean and easy to read.
          </ProjectText>
          <ProjectText>
            The interface is designed to feel lightweight through a minimal color palette, careful white space, and subtle shadows—making the app intuitive and delightful to use.
          </ProjectText>
          <ProjectText>
            We named the app "Flourish" because it means to grow in a healthy way from being in a favorable environment. The logo symbolizes both a flower in full bloom and the intersection of like minds—users meeting, growing together, and flourishing within the community.
          </ProjectText>
          <FlourishBranding />
        </ProjectSubsection>

        <ProjectSubsection title="Prototyping">
          <ProjectText>
            After increasing the fidelity of our wireframes in Sketch, we used Figma to create high-fidelity mockups. We then developed a working prototype using Figma's prototyping tools, building out the navigation and each screen according to the user flows we had defined.
          </ProjectText>
          <ProjectImage
            src="/assets/projects/catalia-health/content/screen-11.png"
            alt="High-fidelity prototype screens in Figma"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Testing */}
      <ProjectSection id="testing" title="User Testing">
        <ProjectText>
          With the first working prototype complete, we conducted remote usability tests to validate our design decisions around usability, information architecture, and the personalization mental model. We reached out to participants from our earlier interviews—5 volunteered to share their screens and provide commentary as they performed tasks. Our goals were to:
        </ProjectText>
        <ProjectList
          items={[
            'Understand how patients engage with the "Explore" and "Community" features',
            'Gauge expectations for content types at different stages of the patient journey',
          ]}
        />
        <UsabilityScenario />

        <ProjectSubsection title="Key Findings">
          <ProjectList
            items={[
              'Every participant is willing to use the Stories section to share their personal story',
              'Stories and posts should have titles to give readers a general idea',
              'Stories should also have an option to add pictures',
            ]}
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Outcome */}
      <ProjectSection id="outcome" title="Final Deliverable & Next Steps">
        <ProjectText>
          Our team was able to provide an interactive high-fidelity prototype, tested with chronically ill patients, which outlines the solution and demonstrates 2-3 user flows of key community features.
        </ProjectText>
        <ProjectImage
          src="/assets/projects/catalia-health/content/screen-14.png"
          alt="Flourish profile screen"
        />
        <ProjectImage
          src="/assets/projects/catalia-health/content/community-screens.png"
          alt="Flourish app screens overview"
        />

        <ProjectSubsection title="Next Steps">
          <ProjectText>
            Areas we recommend building out further:
          </ProjectText>
          <ProjectList
            items={[
              'Features that facilitate in-person meetups (competitive advantage)',
              'Resources section connecting patients to offline resources (carpooling, grocery delivery)',
              'Integration with the existing Mabu product for richer interactions',
            ]}
          />
          <ProjectText>
            While Catalia Health has already built a great solution in increasing patient engagement with Mabu, we believe the community app will further improve this engagement while enabling richer interactions between actual patients.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>
    </ProjectLayout>
  )
}
