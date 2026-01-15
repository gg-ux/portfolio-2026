import { useTheme } from '../context/ThemeContext'
import { H1, H2, H4, Caption, Body } from '../components/Typography'
import { ButtonWithArrow } from '../components/ui/Button'
import { Divider } from '../components/ui/Divider'

const experience = [
  {
    company: 'Tesla',
    location: 'Hawthorne, CA',
    title: 'UX/UI Designer',
    dates: 'Oct 2021 – Mar 2024',
    bullets: [
      'Led global launch of responsive feature pages for Tesla.com, enhancing user experience across Energy, Support, and Investor Relations',
      'Designed and implemented mega menu and AI chatbot for Tesla.com, achieving 120% sales lead conversion increase',
      'Redesigned internal and enterprise apps, optimizing workflows for in-store advisors and energy installers',
      'Developed components and guidelines for Figma library and Tesla Design System through cross-functional collaboration',
    ],
  },
  {
    company: 'Accurate Background',
    location: 'Irvine, CA',
    title: 'UX/UI Designer',
    dates: 'Apr 2018 – Sep 2021',
    bullets: [
      'Increased operational efficiency 25% through automated enterprise workflows and enhanced processes',
      'Enhanced background check experience with improved information architecture and streamlined ID verification',
      'Designed key website flows for Pricing, Account Settings, and Project Dashboard',
      'Created marketing materials for social media ads and flyers',
    ],
  },
  {
    company: 'Notetracks',
    location: 'Remote',
    title: 'UX/UI Designer',
    dates: 'Oct 2019 – Dec 2020',
    bullets: [
      'Collaborated with founder to enhance collaborative cloud-based audio arranging and note-taking tool',
      'Iteratively designed and refined user experiences through BETA user feedback',
      'Designed key website flows for Pricing, Account Settings, and Project Dashboard',
    ],
  },
  {
    company: 'INDI EV',
    location: 'Los Angeles, CA',
    title: 'UX/UI Designer & Researcher',
    dates: 'Jul 2020 – Aug 2021',
    bullets: [
      'Led team of 4 designing in-vehicle infotainment system balancing driver safety with intuitive interactions',
      'Conducted research with 42 participants through interviews, card sorts, and surveys',
      'Delivered high-fidelity prototype with key driver flows and vehicle control features',
    ],
  },
]

const education = [
  {
    school: 'University of California, Irvine',
    degree: 'Master of Human-Computer Interaction & Design',
    dates: '2018 – 2019',
    award: 'Mid-Year Fellowship',
  },
  {
    school: 'University of California, Irvine',
    degree: 'Bachelor of Arts in Psychology',
    dates: '2013 – 2017',
  },
]

const skills = {
  design: [
    'Wireframing',
    'Rapid Prototyping',
    'User-Centered Design',
    'Information Architecture',
    'Visual Design',
    'Interaction Design',
    'Design Systems',
  ],
  research: [
    'User Research',
    'Usability Testing',
    'User Needs Analysis',
    'Requirements Gathering',
  ],
  tools: ['Figma', 'Adobe Creative Suite', 'UserTesting', 'Miro', 'Confluence', 'Jira'],
  other: ['HTML/CSS/JavaScript', 'Agile', 'Cross-Functional Collaboration', 'Stakeholder Presentations'],
}

export default function ResumePage() {
  const { isDark } = useTheme()

  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500'
  const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600'
  const borderColor = isDark ? 'border-white/10' : 'border-black/10'
  const bgSubtle = isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header className="mb-16">
          <H1 className="mb-4">Grace Guo</H1>
          <Body className="text-xl mb-6 max-w-2xl">
            UX/UI designer based in Los Angeles with 5+ years of experience and a Master's in Human-Computer Interaction & Design. Passionate about healthcare, sustainability, and emerging tech.
          </Body>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
            <Caption className={textMuted}>Los Angeles, CA</Caption>
            <Caption className={textMuted}>graceguo.design@gmail.com</Caption>
            <Caption className={textMuted}>linkedin.com/in/grace-guo-ux</Caption>
          </div>
          <ButtonWithArrow
            href="/resume.pdf"
            variant="secondary"
            size="sm"
            direction="external"
          >
            Download PDF
          </ButtonWithArrow>
        </header>

        <Divider className="mb-16" />

        {/* Experience */}
        <section className="mb-16">
          <H2 className="mb-10">Experience</H2>
          <div className="space-y-12">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <div>
                    <H4 className="inline">{job.company}</H4>
                    <span className={`ml-2 ${textMuted}`}>· {job.location}</span>
                  </div>
                  <Caption className={textMuted}>{job.dates}</Caption>
                </div>
                <p className={`font-satoshi text-lg mb-4 ${textSecondary}`}>{job.title}</p>
                <ul className="space-y-2">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3">
                      <span className={`${textMuted} mt-2`}>·</span>
                      <Body size="sm" className={textSecondary}>{bullet}</Body>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Divider className="mb-16" />

        {/* Education */}
        <section className="mb-16">
          <H2 className="mb-10">Education</H2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <H4>{edu.school}</H4>
                  <Caption className={textMuted}>{edu.dates}</Caption>
                </div>
                <p className={`font-satoshi text-lg ${textSecondary}`}>{edu.degree}</p>
                {edu.award && (
                  <Caption className="mt-2 text-lavender">{edu.award}</Caption>
                )}
              </div>
            ))}
          </div>
        </section>

        <Divider className="mb-16" />

        {/* Skills */}
        <section>
          <H2 className="mb-10">Skills</H2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <Caption className="mb-4 block">Design</Caption>
              <div className="flex flex-wrap gap-2">
                {skills.design.map((skill) => (
                  <span
                    key={skill}
                    className={`font-mono text-[11px] tracking-wide uppercase px-2 py-1 rounded-md ${
                      isDark ? 'bg-white/[0.06] text-white/40' : 'bg-black/[0.04] text-black/40'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Caption className="mb-4 block">Research</Caption>
              <div className="flex flex-wrap gap-2">
                {skills.research.map((skill) => (
                  <span
                    key={skill}
                    className={`font-mono text-[11px] tracking-wide uppercase px-2 py-1 rounded-md ${
                      isDark ? 'bg-white/[0.06] text-white/40' : 'bg-black/[0.04] text-black/40'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Caption className="mb-4 block">Tools</Caption>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span
                    key={skill}
                    className={`font-mono text-[11px] tracking-wide uppercase px-2 py-1 rounded-md ${
                      isDark ? 'bg-white/[0.06] text-white/40' : 'bg-black/[0.04] text-black/40'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Caption className="mb-4 block">Other</Caption>
              <div className="flex flex-wrap gap-2">
                {skills.other.map((skill) => (
                  <span
                    key={skill}
                    className={`font-mono text-[11px] tracking-wide uppercase px-2 py-1 rounded-md ${
                      isDark ? 'bg-white/[0.06] text-white/40' : 'bg-black/[0.04] text-black/40'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Languages */}
        <div className="mt-12">
          <Caption className="mb-4 block">Languages</Caption>
          <div className="flex gap-6">
            <div>
              <span className={`font-satoshi ${textSecondary}`}>English</span>
              <span className={`ml-2 text-sm ${textMuted}`}>Native</span>
            </div>
            <div>
              <span className={`font-satoshi ${textSecondary}`}>Mandarin Chinese</span>
              <span className={`ml-2 text-sm ${textMuted}`}>Proficient</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
