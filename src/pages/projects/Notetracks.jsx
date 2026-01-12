import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSubsection,
  ProjectText,
  ProjectList,
  ProjectCallout,
  ProjectImagePlaceholder,
  ProjectImageGrid,
} from '../../components/project'
import { useTheme } from '../../context/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'commenting', label: 'Commenting' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'editing', label: 'Editing' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'extras', label: 'Extras' },
]

export default function Notetracks() {
  const { isDark } = useTheme()

  return (
    <ProjectLayout
      sections={sections}
      prevProject={{ title: 'Patient Community', href: '/project/catalia-health' }}
      nextProject={null}
    >
      <ProjectHero
        company="Notetracks"
        title="Audio Collaboration Tool"
        description="Notetracks is an innovative cloud-based platform designed to streamline audio collaboration for students and professionals by enabling precise track annotations. During its critical early startup phase, I collaborated closely with the founder, delivering high-fidelity prototypes and strategic marketing materials."
        role="UX/UI/Graphic Designer"
        timeline="2020–2021"
        coverImage="/images/projects/notetracks/notetracks-card-filled.png"
      />

      {/* Overview */}
      <ProjectSection id="overview" title="Key Contributions">
        <ProjectList
          items={[
            'Commenting Features (Signed In vs. Guest)',
            'Sign-Up Flow',
            'Editing Features',
            'Pricing Page Redesign',
            'Project Sharing',
            'Project Dashboard',
            'Account Settings',
            'Website Enhancements',
            '404/Maintenance Pages',
            'Social Media Advertising Assets',
          ]}
        />
      </ProjectSection>

      {/* Commenting */}
      <ProjectSection id="commenting" title="Commenting Features">
        <ProjectText>
          I designed commenting features that allowed users to interact precisely within the audio track. Users could incorporate emojis, text, voice notes, or attachments. This multi-modal interaction deepened user engagement by accommodating various communication preferences.
        </ProjectText>
        <ProjectImagePlaceholder label="Post New Comment - Live Voice Recording" />

        <ProjectSubsection title="Replies Panel">
          <ProjectText>
            I designed a Replies panel that aggregated all responses to a comment to provide a cleaner viewing experience. Key benefits include:
          </ProjectText>
          <ProjectList
            items={[
              'Conserves vertical space below the track, enhancing the interface\'s minimalism',
              'Reduces visual distractions, allowing users to focus better on other tasks',
              'Enhances the chat feature to also serve as live chat due to its added scalability',
            ]}
          />
          <ProjectText>
            Due to the heavy engineering scope, we split this effort into phases. Phase 1 closely resembles the existing replying framework.
          </ProjectText>
          <ProjectImagePlaceholder label="Replies Panel - Phase 1 vs Phase 2" />
        </ProjectSubsection>
      </ProjectSection>

      {/* Onboarding */}
      <ProjectSection id="onboarding" title="Guest Experience & Onboarding">
        <ProjectText>
          I focused on enhancing the onboarding experience for guest users. Recognizing the importance of firsthand interaction, I enabled full access to commenting features for guests to demonstrate the platform's ease of use.
        </ProjectText>
        <ProjectText>
          To convert guest interactions into active engagements, I implemented a sign-up flow that activates when guests attempt to submit a comment. This flow overlays only part of the screen, keeping the user's comment in view to maintain engagement and context.
        </ProjectText>
        <ProjectCallout>
          <ProjectText className="mb-0">
            The sign-up flow requests only an email in the initial step to avoid overwhelming new users, leveraging it for both simplicity and security through multi-factor authentication.
          </ProjectText>
        </ProjectCallout>
        <ProjectText>
          After users enter their verification code and become more invested, I then prompt them for their name and password. This phased approach minimizes entry barriers and reduces initial friction.
        </ProjectText>
        <ProjectImagePlaceholder label="Guest Sign-Up Flow + MFA" />
      </ProjectSection>

      {/* Editing */}
      <ProjectSection id="editing" title="Editing Features">
        <ProjectText>
          For each editing feature, I delivered a comprehensive prototype, detailed screens for every flow, and clear guidelines to ensure engineers fully grasped the intended interactions and triggers.
        </ProjectText>
        <ProjectText>
          I conducted thorough research on leading audio engineering platforms like Ableton to ensure our user interactions were both intuitive and familiar to industry professionals. Wherever ambiguity could arise, I strategically implemented tooltips to enhance clarity.
        </ProjectText>

        <ProjectSubsection title="Select Features">
          <ProjectList
            items={[
              'Right Click Options (Split, Fade, Copy, Cut, Mute, Solo, Delete)',
              'Fade-In / Fade-Out',
              'Trim',
              'Track States (Guidelines for Engineers)',
            ]}
          />
          <ProjectImagePlaceholder label="Editing Features Overview" />
        </ProjectSubsection>
      </ProjectSection>

      {/* Pricing */}
      <ProjectSection id="pricing" title="Pricing Page Redesign">
        <ProjectText>
          I redesigned the Pricing page to enhance user engagement and decision-making. The new design incorporates:
        </ProjectText>
        <ProjectList
          items={[
            'Intuitive toggles between monthly and annual views',
            'Easy comparison of plan benefits and differences',
            'FAQ section for common questions',
            'Testimonials section to boost user confidence',
          ]}
        />

        <ProjectSubsection title="Before & After">
          <ProjectImagePlaceholder label="Old Pricing Page" />
          <ProjectImagePlaceholder label="New Pricing Page" />
        </ProjectSubsection>
      </ProjectSection>

      {/* Extras */}
      <ProjectSection id="extras" title="Additional Work">
        <ProjectSubsection title="404 / Maintenance Pages">
          <ProjectText>
            These were fun to design! I created playful yet on-brand error pages that maintain the user experience even when things go wrong.
          </ProjectText>
          <ProjectImagePlaceholder label="404 and Maintenance Pages" />
        </ProjectSubsection>

        <ProjectSubsection title="Social Media Advertising Assets">
          <ProjectText>
            Beyond just working on designs for the audio collaboration interface and website, I also created a number of marketing assets. I worked with the founder to come up with taglines and created multiple versions to see which one made the biggest impact.
          </ProjectText>
          <ProjectImagePlaceholder label="Instagram, Facebook Ads, and Physical Flyers" />
        </ProjectSubsection>
      </ProjectSection>
    </ProjectLayout>
  )
}
