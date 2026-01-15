import { useTheme } from '../context/ThemeContext'
import { H1, H2, H4, Caption, Body } from '../components/Typography'
import { Button, Divider, Tag } from '../components/ui'
import { LinkedinLogo, DribbbleLogo, EnvelopeSimple, FilePdf, Medal } from '@phosphor-icons/react'
import bioPic from '../assets/BioPic2.JPG'
import {
  personalInfo,
  experience,
  education,
  skills,
  languages,
} from '../data/resumeData'

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
          <div className="flex gap-8 md:gap-12 items-start">
            {/* Bio photo with frosted frame + social icons */}
            <div className="hidden sm:block flex-shrink-0">
              <div className="relative aspect-[3/4] w-32 md:w-40">
                <div
                  className="absolute inset-0 z-10 rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: isDark
                      ? '0 20px 50px rgba(0,0,0,0.5)'
                      : '0 20px 50px rgba(0,0,0,0.15)',
                  }}
                >
                  <img
                    src={bioPic}
                    alt="Grace Guo"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Frosted glass frame */}
                <div
                  className={`absolute -inset-2 rounded-2xl pointer-events-none backdrop-blur-md border ${
                    isDark
                      ? 'border-white/[0.08] bg-white/[0.015]'
                      : 'border-black/[0.08] bg-white/20'
                  }`}
                >
                  <svg className="absolute inset-0 w-full h-full rounded-2xl opacity-40">
                    <defs>
                      <filter id="bio-frame-grain-resume" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.8"
                          numOctaves="4"
                          seed="42"
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
                    <rect width="100%" height="100%" filter="url(#bio-frame-grain-resume)" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Header text */}
            <div className="flex-1">
              <H1 className="mb-4">{personalInfo.name}</H1>
              <Body className="text-xl max-w-2xl mb-6">
                {personalInfo.tagline}
              </Body>
              <div className="flex items-center gap-4">
                <Button
                  as="a"
                  href="/assets/resume/Grace_Guo_Resume_2026.pdf"
                  download="Grace_Guo_Resume_2026.pdf"
                  variant="secondary"
                  size="sm"
                  icon={<FilePdf size={13} weight="regular" />}
                >
                  Download Resume
                </Button>
                <div className="flex items-center gap-1">
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'text-white/40 hover:text-white hover:bg-white/10'
                        : 'text-black/40 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    <LinkedinLogo size={20} weight="regular" />
                  </a>
                  <a
                    href={personalInfo.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'text-white/40 hover:text-white hover:bg-white/10'
                        : 'text-black/40 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    <DribbbleLogo size={20} weight="regular" />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'text-white/40 hover:text-white hover:bg-white/10'
                        : 'text-black/40 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    <EnvelopeSimple size={20} weight="regular" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Divider className="mb-16" />

        {/* Experience */}
        <section className="mb-16">
          <H2 serif className="mb-10">Experience</H2>
          <div className="space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="flex gap-4">
                {/* Logo */}
                {job.logo && (
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg overflow-hidden border ${
                      isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white'
                    }`}>
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="w-full h-full object-contain p-1.5"
                      />
                    </div>
                  </div>
                )}
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <H4>{job.title}</H4>
                    <Caption className={`${textMuted} tracking-normal`}>{job.dates}</Caption>
                  </div>
                  <Body className={`!text-lg mb-4 ${textSecondary}`}>
                    {job.company} <span className="theme-muted text-base">· {job.location}</span>
                  </Body>
                  <ul className="space-y-2">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className={`pt-[9px] flex-shrink-0 ${
                            isDark ? 'text-[#9CA3AF]' : 'text-[#3A3A3A]'
                          }`}
                        >
                          <svg width="4" height="4" viewBox="0 0 4 4" fill="currentColor">
                            <circle cx="2" cy="2" r="2" />
                          </svg>
                        </span>
                        <Body size="sm" className={textSecondary}>{bullet}</Body>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider className="mb-16" />

        {/* Education */}
        <section className="mb-16">
          <H2 serif className="mb-10">Education</H2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <H4>{edu.degree}</H4>
                  <Caption className={`${textMuted} tracking-normal`}>{edu.dates}</Caption>
                </div>
                <Body className={`!text-lg ${textSecondary}`}>{edu.school}</Body>
                {edu.award && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Medal size={14} weight="fill" className={isDark ? 'text-white/40' : 'text-black/40'} />
                    <Caption className={isDark ? 'text-white/40' : 'text-black/40'}>{edu.award}</Caption>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <Divider className="mb-16" />

        {/* Skills */}
        <section>
          <H2 serif className="mb-10">Skills</H2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <Caption className="mb-4 block">Design</Caption>
              <div className="flex flex-wrap gap-2">
                {skills.design.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <Caption className="mb-4 block">Development</Caption>
              <div className="flex flex-wrap gap-2">
                {skills.development.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <Caption className="mb-4 block">Strategy</Caption>
              <div className="flex flex-wrap gap-2">
                {skills.strategy.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <Caption className="mb-4 block">Tools</Caption>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Languages */}
        <div className="mt-12">
          <Caption className="mb-4 block">Languages</Caption>
          <div className="flex gap-8">
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-3">
                <Body className={textSecondary}>{lang.name}</Body>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((dot) => (
                    <span
                      key={dot}
                      className={`w-1.5 h-1.5 rounded-full theme-accent-bg ${
                        dot > Math.round(lang.proficiency / 20) ? 'opacity-30' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
