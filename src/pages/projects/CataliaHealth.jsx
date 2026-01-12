import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSubsection,
  ProjectText,
  ProjectList,
  ProjectCallout,
  ProjectImagePlaceholder,
  ProjectQuote,
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
]

export default function CataliaHealth() {
  const { isDark } = useTheme()

  return (
    <ProjectLayout
      sections={sections}
      prevProject={{ title: 'Electric Car IVI', href: '/project/indi-ev' }}
      nextProject={{ title: 'Audio Collaboration', href: '/project/notetracks' }}
    >
      <ProjectHero
        company="Catalia Health"
        title="Patient Community App"
        description="Catalia Health is a digital healthcare management company. Their core product is an interactive personal assistant robot, Mabu. The mission was to create a HIPAA-compliant patient community to improve patients' well-being through access to a greater patient community and personalized resources."
        role="Lead UX Designer + Researcher"
        timeline="April–June 2019"
        team="Team of 4 UX Experts"
        coverImage="/images/projects/catalia-health/catalia-card-filled.png"
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Overview">
        <ProjectText>
          The goal is that by creating a safe space for patients to engage, patients will feel more informed about their condition, more motivated to adhere to their treatment plan, and a heightened sense of social belonging that could ultimately lead to better personal health care management.
        </ProjectText>
        <ProjectCallout>
          <ProjectText className="mb-0">
            Following an aggressive timeline, we were able to successfully research and design a high-fidelity prototype of the app, <strong className={isDark ? 'text-white' : 'text-gray-900'}>Flourish</strong>, in 5 months.
          </ProjectText>
        </ProjectCallout>

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
        </ProjectSubsection>
      </ProjectSection>

      {/* Team */}
      <ProjectSection id="team" title="Meet the Team">
        <ProjectText>
          Our team is made up of four UX experts — based in San Francisco and Los Angeles, California — with one unified goal in mind: To deliver the most well-researched, usable, and clean design solution possible.
        </ProjectText>
        <ProjectImagePlaceholder label="Team Photos" />

        <ProjectSubsection title="Considerations">
          <ProjectText>
            This project would be very research heavy. Facilitating patient-to-patient interaction through a community was new territory for Catalia Health. Furthermore, recruiting patients required more effort due to the specificity of their conditions.
          </ProjectText>
          <ProjectText>
            We chose to narrow our scope and focus on patients with Congestive Heart Failure, as this was an important patient group that Catalia Health was already researching heavily for Mabu.
          </ProjectText>
          <ProjectCallout>
            <ProjectText className="mb-0">
              In order to become HIPAA-certified, our team completed a HIPAA-compliance training course.
            </ProjectText>
          </ProjectCallout>
        </ProjectSubsection>
      </ProjectSection>

      {/* Research */}
      <ProjectSection id="research" title="Research Phase">
        <ProjectSubsection title="Secondary Research">
          <ProjectText>
            To get better domain knowledge of the problem space, Catalia provided the team with data around patients with chronic illness. Key findings:
          </ProjectText>
          <ProjectList
            items={[
              '48% of chronically ill patients were scored as depressed by the Beck Depression Inventory',
              'Depression is more common in younger individuals than those over 65',
              'Patients maintain a "naturalistic" decision making process when dealing with their condition',
              'HF self-care requires following advice of providers: medications, low-sodium diet, exercise, and self-monitoring',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Primary Research">
          <ProjectText>
            We recruited 42 participants for interviews and a survey/card sort exercise. Participants were between the ages of 30-65 and lived across the United States. We leveraged existing connections from Catalia Health and reached out to chronic illness communities on Reddit.
          </ProjectText>
          <ProjectImagePlaceholder label="Research Methods Overview" />
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
          <ProjectImagePlaceholder label="Survey Results Visualization" />
        </ProjectSubsection>

        <ProjectSubsection title="Top Community Attributes">
          <ProjectText>
            When asked to indicate their top 3 most important attributes:
          </ProjectText>
          <ProjectList
            items={[
              'Respect and kindness',
              'Access to chronic illness research',
              'Info on local support groups and physicians',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Card Sort Findings">
          <ProjectText>
            The most important community aspects were: ability to discuss a specific diagnosis, educational resources, a safe space to share ideas, a community that can be checked any time, and low sodium diet information. Intimacy, religious support, and an unmoderated community ranked lowest.
          </ProjectText>
          <ProjectImagePlaceholder label="Card Sort Results" />
        </ProjectSubsection>

        <ProjectSubsection title="Key Interview Findings">
          <ProjectList
            items={[
              'Patients use community for a sense of belonging and giving back',
              'Identified (vs. anonymous) users made patients feel more supported',
              'Older participants preferred face-to-face interactions',
              'All patients use their mobile phones; not all had a computer',
              'Common pain points: transportation and maintaining a good diet',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Archetypes">
          <ProjectText>
            We found three types of community user archetypes: Contributors (mainly female, preferred to be identified), Lurkers (mainly male, preferred anonymity), and Mentors (further along in their journey, wished to give back).
          </ProjectText>
          <ProjectImagePlaceholder label="User Archetypes" />
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
        </ProjectSubsection>

        <ProjectSubsection title="Brainstorming">
          <ProjectText>
            We used Miro to organize our thoughts around a potential concept. This took the form of an initial site map for the community. We split into two groups to tackle our initial thoughts—one focusing on person-to-person interactions, the other on patient-to-education interactions.
          </ProjectText>
          <ProjectImagePlaceholder label="Miro Brainstorming Boards" />
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
          <ProjectImagePlaceholder label="Crazy Eights Sketches" />
        </ProjectSubsection>

        <ProjectSubsection title="Final Look">
          <ProjectText>
            For the main color, we chose a shade of teal (#47bcca) that complements Catalia Health's blue and orange but also stands well on its own. The shade represents genuinity and organic growth.
          </ProjectText>
          <ProjectText>
            We chose the app name "Flourish" because it means to grow in a healthy way from being in a favorable environment. The logo symbolizes both a flower in full bloom and the intersection of similarities.
          </ProjectText>
          <ProjectImagePlaceholder label="Flourish Branding" />
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
        <ProjectImagePlaceholder label="User Testing Sessions" />
      </ProjectSection>

      {/* Outcome */}
      <ProjectSection id="outcome" title="Final Deliverable & Next Steps">
        <ProjectText>
          Our team was able to provide an interactive high-fidelity prototype, tested with chronically ill patients, which outlines the solution and demonstrates 2-3 user flows of key community features.
        </ProjectText>
        <ProjectImagePlaceholder label="Flourish App Screens" aspectRatio="21/9" />

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
