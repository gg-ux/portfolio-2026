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
  ProjectVimeo,
  DoubleDiamond,
  PDFCarousel,
  ResearchTimeline,
  SurveyStats,
} from '../../components/project'
import { useTheme } from '../../context/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'team', label: 'Team' },
  { id: 'research', label: 'Research' },
  { id: 'findings', label: 'Findings' },
  { id: 'design', label: 'Design' },
  { id: 'testing', label: 'Testing' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'case-study', label: 'Case Study' },
]

export default function CataliaHealth() {
  const { isDark } = useTheme()

  return (
    <ProjectLayout sections={sections}>
      <ProjectHero
        company="Catalia Health"
        title="Patient Community App"
        description="Catalia Health is a digital healthcare management company. Their core product is an interactive personal assistant robot, Mabu. The mission was to create a HIPAA-compliant patient community to improve patients' well-being through access to a greater patient community and personalized resources."
        role="Lead UX Designer + Researcher"
        timeline="April–June 2019"
        team="Team of 4 UX Experts"
        coverImage="/images/projects/catalia-health/content/banner.png"
        lightBanner
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          The goal is that by creating a safe space for patients to engage, patients will feel more informed about their condition, more motivated to adhere to their treatment plan, and a heightened sense of social belonging that could ultimately lead to better personal health care management. Following an aggressive timeline, we were able to successfully research and design a high-fidelity prototype of the app, <em>Flourish</em>, in 5 months.
        </ProjectText>
        <ProjectImage
          src="/images/projects/catalia-health/content/mabu-robot.jpg"
          alt="Mabu, Catalia Health's interactive personal assistant robot"
          caption="Mabu - Catalia Health's core product, an interactive personal assistant robot"
        />

        <ProjectSubsection title="Research Requirements">
          <ProjectList
            ordered
            items={[
              'Secondary research',
              'Generative primary research with chronically ill patients',
              'Iterative research with prototypes',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Successful Output">
          <ProjectText>
            A high-fidelity prototype, tested with chronically ill patients, which outlines the solution and demonstrates 2-3 user flows of key community features.
          </ProjectText>
          <ProjectVimeo url="https://vimeo.com/358226687" />
        </ProjectSubsection>
      </ProjectSection>

      {/* Case Study */}
      <ProjectSection id="case-study" title="Case Study">
        <ProjectText>
          As part of our deliverables, Catalia Health required a comprehensive booklet to present to their stakeholders. I owned the design of the complete 36-page print-ready case study, documenting our research methodology, key findings, and design process from start to finish.
        </ProjectText>
        <PDFCarousel
          pages={[
            { src: '/images/projects/catalia-health/content/pdf-pages/page-1-cover.png', alt: 'Cover' },
            { src: '/images/projects/catalia-health/content/pdf-pages/page-2-toc.png', alt: 'Table of Contents' },
            { src: '/images/projects/catalia-health/content/pdf-pages/page-3-left.png', alt: 'Executive Summary' },
            { src: '/images/projects/catalia-health/content/pdf-pages/page-3-right.png', alt: 'Meet Our Team' },
          ]}
          pdfUrl="https://gg-portfolio.s3-us-west-1.amazonaws.com/FlourishApp-PrintReadySpread.pdf"
        />
      </ProjectSection>

      {/* Team */}
      <ProjectSection id="team" title="Meet the Team">
        <ProjectText>
          Our team is made up of four UX experts — based in San Francisco and Los Angeles, California — with one unified goal in mind: To deliver the most well-researched, usable, and clean design solution possible.
        </ProjectText>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {[
            { name: 'Alex Rosales', role: 'Product Manager', image: 'Catalia-Alex.png' },
            { name: 'Grace Guo', role: 'Lead UX/UI Designer\nUser Researcher', image: 'Catalia-Grace.png' },
            { name: 'Renee Reid', role: 'Lead User Researcher', image: 'Catalia-Renee.png' },
            { name: 'Alexa Steinhauser', role: 'UX/UI Designer\nUser Researcher', image: 'Catalia-Alexa.png' },
          ].map((member, index) => (
            <div key={member.name} className="text-center">
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                {/* Photo */}
                <div className="absolute inset-0 z-10 rounded-full overflow-hidden">
                  <img
                    src={`/images/projects/catalia-health/content/${member.image}`}
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
              <p className={`font-satoshi text-[15px] whitespace-pre-line ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                {member.role}
              </p>
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
          <ProjectImage
            src="/images/projects/catalia-health/content/people-2.png"
            alt="Team collaborative research work"
          />
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
          <ProjectText>
            Most interviews were conducted using Zoom. Phonecall participants tended to be older—in their 60s—and less likely to engage with online communities, while video chat participants tended to be younger and more engaged.
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/card-sort.jpg"
            alt="Card sort activity materials"
          />
          <ProjectText>
            We also sent out a card sort activity and survey to discover desired attributes of an online patient community. For the first part, participants completed a survey gauging demographics, behaviors, and devices used. They then sorted 17 cards containing aspects of a patient community into categories by importance.
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/topics.png"
            alt="Community topics visualization"
            caption="17 community topic cards sorted by participants"
          />
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
          <ProjectImage
            src="/images/projects/catalia-health/content/dots.png"
            alt="Survey data visualization showing participant behaviors"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Top Community Attributes">
          <ProjectText>
            When asked to indicate their top 3 most important attributes from a list of community attributes, "Respect and kindness", "Access to chronic illness research", and "Info on local support groups and physicians" ranked at the top.
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/traits.png"
            alt="Community traits comparison chart"
            caption="Top community attributes ranked by participants"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Card Sort Findings">
          <ProjectText>
            The most important community aspects were: ability to discuss a specific diagnosis, educational resources, a safe space to share ideas, a community that can be checked any time, and low sodium diet information. Intimacy, religious support, and an unmoderated community ranked lowest.
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/card-sort-2.png"
            alt="Card sort results showing community priorities"
            caption="Card sort results revealing patient priorities"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Key Interview Findings">
          <ProjectText>
            We uncovered 5 major themes that informed us of patient attitudes and behaviors:
          </ProjectText>
          <ProjectList
            items={[
              'Patients use community for a sense of belonging and giving back',
              'Identified (vs. anonymous) users made patients feel more supported',
              'Older participants preferred face-to-face interactions',
              'All patients use their mobile phones; not all had a computer',
              'Common pain points: transportation and maintaining a good diet',
            ]}
          />
          <ProjectImage
            src="/images/projects/catalia-health/content/callouts.png"
            alt="Key interview findings callout graphic"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Archetypes">
          <ProjectText>
            We found three types of community user archetypes: Contributors (mainly female, preferred to be identified), Lurkers (mainly male, preferred anonymity), and Mentors (further along in their journey, wished to give back).
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/archetypes.jpg"
            alt="Three user archetypes: Contributors, Lurkers, and Mentors"
            caption="User archetypes: Contributors, Lurkers, and Mentors"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Personas">
          <ProjectText>
            Based on our research, we developed detailed personas representing the spectrum of patients we aimed to serve—from those newly diagnosed to those further along in their health journey.
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/screen-09.png"
            alt="Patient personas: Shrini the Beginner and Leslie the Intermediate"
            caption="Personas: Shrini 'The Beginner' and Leslie 'The Intermediate'"
          />
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
          <ProjectImage
            src="/images/projects/catalia-health/content/screen-03.png"
            alt="User story and method diagram showing app concept"
            caption="Core user story: connecting patients to community, education, and services"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Brainstorming">
          <ProjectText>
            We used Miro to organize our thoughts around a potential concept. This took the form of an initial site map for the community. We split into two groups to tackle our initial thoughts—one focusing on person-to-person interactions, the other on patient-to-education interactions.
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/screen-01.png"
            alt="Miro brainstorming board with site map concepts"
            caption="Initial site map exploration on Miro"
          />
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
          <ProjectImageGrid
            images={[
              { src: '/images/projects/catalia-health/content/screen-02.png', alt: 'Crazy Eights design sprint sketches' },
              { src: '/images/projects/catalia-health/content/screen-04.png', alt: 'Hand-drawn wireframe sketches' },
            ]}
            columns={2}
          />
        </ProjectSubsection>

        <ProjectSubsection title="User Flows">
          <ProjectText>
            We mapped out the community user flow to understand how patients would navigate and engage with the app's core features.
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/screen-05.png"
            alt="Community user flow diagram"
            caption="Community feature user flow"
          />
        </ProjectSubsection>

        <ProjectSubsection title="Final Look">
          <ProjectText>
            For the main color, we chose a shade of teal (#47bcca) that complements Catalia Health's blue and orange but also stands well on its own. The shade represents genuinity and organic growth.
          </ProjectText>
          <ProjectText>
            We chose the app name "Flourish" because it means to grow in a healthy way from being in a favorable environment. The logo symbolizes both a flower in full bloom and the intersection of similarities.
          </ProjectText>
          <ProjectImage
            src="/images/projects/catalia-health/content/banner.png"
            alt="Flourish app branding and logo"
            caption="Flourish branding - representing growth and connection"
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Testing */}
      <ProjectSection id="testing" title="User Testing">
        <ProjectText>
          Upon completion of the first working prototype, we conducted user tests to validate our design work. 5 participants volunteered to work with us to test the prototype remotely.
        </ProjectText>
        <ProjectText>
          The goals were to understand how patients engage with the prototype's "Explore" and "Community" features, and understand patient expectations for content types along their patient journey.
        </ProjectText>

        <ProjectSubsection title="Key Findings">
          <ProjectList
            items={[
              'Every participant is willing to use the Stories section to share their personal story',
              'Stories and posts should have titles to give readers a general idea',
              'Stories should also have an option to add pictures',
            ]}
          />
        </ProjectSubsection>
        <ProjectImageGrid
          images={[
            { src: '/images/projects/catalia-health/content/screen-11.png', alt: 'User testing session screenshot' },
            { src: '/images/projects/catalia-health/content/screen-12.png', alt: 'User testing findings' },
          ]}
          columns={2}
        />
      </ProjectSection>

      {/* Outcome */}
      <ProjectSection id="outcome" title="Final Deliverable & Next Steps">
        <ProjectText>
          Our team was able to provide an interactive high-fidelity prototype, tested with chronically ill patients, which outlines the solution and demonstrates 2-3 user flows of key community features.
        </ProjectText>
        <ProjectImageGrid
          images={[
            { src: '/images/projects/catalia-health/content/screen-06.png', alt: 'Flourish app home screen' },
            { src: '/images/projects/catalia-health/content/screen-07.png', alt: 'Flourish community screen' },
            { src: '/images/projects/catalia-health/content/screen-08.png', alt: 'Flourish explore screen' },
            { src: '/images/projects/catalia-health/content/screen-14.png', alt: 'Flourish profile screen' },
          ]}
          columns={2}
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
