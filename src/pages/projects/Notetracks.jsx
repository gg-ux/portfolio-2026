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
} from '../../components/project'
import { useTheme } from '../../context/ThemeContext'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'audio-interface', label: 'Audio Interface' },
  { id: 'precision-editing', label: 'Precision Editing' },
  { id: 'track-management', label: 'Track Management' },
  { id: 'annotation-system', label: 'Annotation System' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'impact', label: 'Impact' },
  { id: 'extras', label: 'Additional Work' },
]

export default function Notetracks() {
  const { isDark } = useTheme()

  return (
    <ProjectLayout sections={sections}>
      <ProjectHero
        company="Notetracks"
        title="DAW Collaboration Platform"
        description="Notetracks is a cloud-based collaboration platform that enables time-anchored feedback on audio sessions. As the sole product designer, I designed the core interaction toolkit—waveform visualization, timeline scrubbing, non-destructive editing, and track layering—balancing professional-grade precision with accessibility for first-time collaborators."
        role="Lead Product Designer (Sole Designer)"
        timeline="Nov 2019 – Jan 2021"
        coverImage="/assets/projects/notetracks/content/banner.webp"
        coverPosition="center 0%"
        noLightFilter
        darkOverlay
        darkBanner
      />

      {/* Overview */}
      <ProjectSection id="overview" title="The Challenge">
        <ProjectText>
          Musicians, producers, and audio engineers needed a way to give precise, time-based feedback on tracks without the friction of back-and-forth emails or imprecise comments like "around the 2-minute mark." Existing tools forced users to choose between professional DAW complexity and consumer-grade simplicity.
        </ProjectText>
        <ProjectCallout>
          How might we bring DAW-level precision to a collaborative annotation tool while keeping the interface accessible to non-technical collaborators?
        </ProjectCallout>
        <ProjectText>
          I conducted competitive analysis across professional DAWs (Logic Pro, Ableton Live, Pro Tools) and consumer-grade editors (GarageBand, Audacity), identifying interaction patterns that would feel native to audio professionals while remaining learnable for collaboration-focused users.
        </ProjectText>
      </ProjectSection>

      {/* Audio Interface Architecture */}
      <ProjectSection id="audio-interface" title="Audio Interface Architecture">
        <ProjectText>
          The waveform is the heart of any audio tool. I studied how professional DAWs render waveforms, then adapted those patterns for a collaboration-first context where visual clarity matters as much as editing density.
        </ProjectText>

        <ProjectSubsection title="Waveform Visualization">
          <ProjectText>
            I designed the waveform display to balance audio fidelity with annotation legibility. Key decisions included:
          </ProjectText>
          <ProjectList
            items={[
              'Amplitude scaling that preserves dynamic range while maintaining readability at various zoom levels',
              'Color palette optimized for extended viewing sessions with reduced eye strain',
              'Responsive waveform rendering that adapts from full-track overview to sample-level precision',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Timeline Scrubbing">
          <ProjectText>
            Scrubbing behavior was critical—users needed to navigate hours of audio quickly while still being able to pinpoint exact moments. I designed a progressive scrubbing system:
          </ProjectText>
          <ProjectList
            items={[
              'Coarse scrubbing for rapid navigation across the full track',
              'Fine-grain scrubbing with audio preview for precise playhead positioning',
              'Snap-to-marker behavior that jumps to existing annotations',
              'Keyboard shortcuts matching DAW conventions (J/K/L for transport controls)',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Transport Controls">
          <ProjectText>
            I designed transport controls that would feel familiar to audio professionals while remaining intuitive for clients and collaborators who may not have DAW experience. Play, pause, skip, and loop controls follow industry-standard iconography and keyboard mappings.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* Precision Editing Tools */}
      <ProjectSection id="precision-editing" title="Non-Destructive Editing Toolkit">
        <ProjectText>
          Beyond annotation, Notetracks needed non-destructive editing capabilities for quick revisions without round-tripping to a full DAW. I designed a focused editing toolkit that prioritized the most common collaboration scenarios.
        </ProjectText>

        <ProjectSubsection title="Balancing Precision with Creative Flow">
          <ProjectText>
            Audio professionals operate in two distinct modes:
          </ProjectText>
          <ProjectList
            items={[
              'Precision Mode: Frame-accurate editing, exact fade curves, millisecond-level positioning with snap-to-grid and numerical input',
              'Flow Mode: Intuitive exploration, quick A/B comparisons, gestural control through direct manipulation',
            ]}
          />
          <ProjectText>
            The editing toolkit serves both modes. Trim handles allow quick gestural adjustments (flow), while holding Shift snaps to beat divisions (precision). This dual-mode interaction pattern appears throughout professional DAWs like Logic Pro.
          </ProjectText>
        </ProjectSubsection>

        <ProjectSubsection title="Split, Trim & Fade">
          <ProjectText>
            Each editing operation required careful consideration of trigger mechanisms, visual feedback, and undo behavior:
          </ProjectText>
          <ProjectList
            items={[
              'Split: Context menu + keyboard shortcut, with visual preview of cut point at playhead',
              'Trim: Drag-to-resize handles with snapping to beat grid when enabled',
              'Fade: Envelope curves with handles for smooth fade-in/fade-out transitions',
            ]}
          />
        </ProjectSubsection>

        <ProjectImageGrid
          images={[
            { src: '/assets/projects/notetracks/content/split.webp', alt: 'Split feature', caption: 'Context menu (split, fade, copy, cut, mute, solo, delete)' },
            { src: '/assets/projects/notetracks/content/fadein.webp', alt: 'Fade in/out feature', caption: 'Fade-in / fade-out with envelope curves' },
            { src: '/assets/projects/notetracks/content/trim.webp', alt: 'Trim feature', caption: 'Trim handles with snap-to-grid' },
          ]}
          columns={1}
          glassBorder
        />

        <ProjectSubsection title="Engineering Handoff">
          <ProjectText>
            For each editing feature, I delivered comprehensive specifications including interaction prototypes, state diagrams, keyboard shortcut mappings, and edge case documentation—ensuring engineering implementation matched design intent.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* Track Management */}
      <ProjectSection id="track-management" title="Track Layering & Management">
        <ProjectText>
          Projects often contain multiple tracks—stems, mixes, revisions. I designed the track management system to handle complex multi-track sessions while keeping the interface uncluttered.
        </ProjectText>

        <ProjectSubsection title="Multi-Track View">
          <ProjectText>
            The track list needed to accommodate projects ranging from single-track podcasts to multi-stem sessions. I designed a collapsible track panel with:
          </ProjectText>
          <ProjectList
            items={[
              'Solo and mute controls per track with clear visual states',
              'Track reordering via drag-and-drop',
              'Color coding for quick track identification',
              'Expandable waveform detail view per track',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Mixing Controls">
          <ProjectText>
            While Notetracks isn't a full mixing environment, collaborators often need to adjust relative levels when reviewing. I designed lightweight volume controls that would feel familiar to audio professionals without cluttering the annotation workflow.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* Timestamped Annotation System */}
      <ProjectSection id="annotation-system" title="Timestamped Annotation System">
        <ProjectText>
          The core value proposition: drop a pin anywhere on the waveform and attach feedback directly to that moment. This eliminates the ambiguity of "around 2:30" and creates a persistent, navigable feedback trail.
        </ProjectText>

        <ProjectSubsection title="Precision Markers">
          <ProjectText>
            Annotations needed to support both point-in-time markers ("fix this pop at 1:23") and range selections ("this whole section needs more reverb"). I designed:
          </ProjectText>
          <ProjectList
            items={[
              'Single-click markers for instant feedback at a specific timestamp',
              'Click-and-drag range selections for broader comments',
              'Visual markers on the waveform that don\'t obscure audio data',
              'Hover states showing annotation preview without leaving context',
            ]}
          />
        </ProjectSubsection>

        <ProjectImage
          src="/assets/projects/notetracks/content/comment-first.webp"
          alt="Post new comment with live voice recording feature"
          caption="Time-anchored commenting with multi-modal input"
          glassBorder
        />

        <ProjectSubsection title="Multi-Modal Feedback">
          <ProjectText>
            Different feedback types serve different purposes. Written comments work for technical notes; voice memos let collaborators hum a melody or demonstrate a desired effect.
          </ProjectText>
          <ProjectList
            items={[
              'Text comments with rich formatting and @mentions',
              'Voice note recording with inline waveform preview',
              'File attachments for reference tracks or documentation',
              'Emoji reactions for quick acknowledgment',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="Threaded Replies Panel">
          <ProjectText>
            I designed a replies panel that aggregates all responses to a comment, providing a cleaner viewing experience:
          </ProjectText>
          <ProjectList
            items={[
              'Conserves vertical space below the track, maintaining interface minimalism',
              'Reduces visual distractions, allowing users to focus on the waveform',
              'Scales from simple back-and-forth to multi-party discussion',
            ]}
          />
          <ProjectText>
            Due to engineering complexity, we phased this effort. Phase 1 maintained the existing reply framework; Phase 2 introduced the dedicated panel.
          </ProjectText>
          <ProjectImageGrid
            images={[
              { src: '/assets/projects/notetracks/content/comments-phase1.webp', alt: 'Replies panel phase 1', caption: 'Phase 1: Stacked replies' },
              { src: '/assets/projects/notetracks/content/comments-phase2.webp', alt: 'Replies panel phase 2', caption: 'Phase 2: Dedicated reply panel' },
            ]}
            columns={1}
            glassBorder
          />
        </ProjectSubsection>
      </ProjectSection>

      {/* Onboarding */}
      <ProjectSection id="onboarding" title="Reducing Friction in Onboarding">
        <ProjectText>
          I focused on enhancing the onboarding experience for guest users. Recognizing the importance of firsthand interaction, I enabled full access to annotation features for guests to demonstrate the platform's ease of use before requiring sign-up.
        </ProjectText>
        <ProjectText>
          To convert guest interactions into active engagements, I implemented a sign-up flow that activates when guests attempt to submit a comment. This flow overlays only part of the screen, keeping the user's comment in view to maintain context.
        </ProjectText>
        <ProjectCallout>
          The sign-up flow requests only an email in the initial step to avoid overwhelming new users, leveraging progressive disclosure and multi-factor authentication for security.
        </ProjectCallout>
        <ProjectImageGrid
          images={[
            { src: '/assets/projects/notetracks/content/comment-loggedoff.webp', alt: 'Guest commenting interface', caption: 'Guest annotation to sign-up conversion' },
            { src: '/assets/projects/notetracks/content/guest-verification.webp', alt: 'Guest verification flow', caption: 'Progressive sign-up with MFA' },
          ]}
          columns={1}
          glassBorder
        />
      </ProjectSection>

      {/* Impact */}
      <ProjectSection id="impact" title="Results & Learnings">
        <ProjectText>
          Working as the sole designer on an early-stage audio tool taught me how to balance professional-grade functionality with approachable design—the same tension that exists between Logic Pro and GarageBand.
        </ProjectText>
        <ProjectCallout>
          Designing for audio professionals requires balancing power with accessibility. Notetracks taught me to build for that spectrum—from bedroom producers to professional engineers—without compromising on precision.
        </ProjectCallout>

        <ProjectSubsection title="Key Outcomes">
          <ProjectList
            items={[
              'Shipped web application used by music professionals and educators',
              'Established interaction patterns for audio editing that reduced engineering questions by streamlining handoff documentation',
              'Designed component system for audio interface elements (waveforms, transport controls, track panels)',
            ]}
          />
        </ProjectSubsection>

        <ProjectSubsection title="What I Would Do Differently">
          <ProjectText>
            If I were to revisit this project, I would invest more in user research with professional audio engineers to validate editing tool priorities, and prototype more extensively around mobile waveform interactions where precision is harder to achieve.
          </ProjectText>
        </ProjectSubsection>
      </ProjectSection>

      {/* Additional Work */}
      <ProjectSection id="extras" title="Additional Work">
        <ProjectSubsection title="Marketing Collateral">
          <ProjectText>
            Beyond the core product interface, I created marketing assets to support user acquisition. I worked with the founder to develop taglines and produced multiple variations for A/B testing.
          </ProjectText>
          <ProjectImageGrid
            images={[
              { src: '/assets/projects/notetracks/content/ads-ig.webp', alt: 'Instagram ad', caption: 'Instagram Ads' },
              { src: '/assets/projects/notetracks/content/ad-banner.webp', alt: 'Facebook banner ad', caption: 'Facebook Ads' },
              { src: '/assets/projects/notetracks/content/marketing-flyer.webp', alt: 'Physical marketing flyer', caption: 'Physical Flyers' },
            ]}
            columns={1}
          />
        </ProjectSubsection>
      </ProjectSection>
    </ProjectLayout>
  )
}
