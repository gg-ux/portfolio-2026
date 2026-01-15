import { useTheme } from '../context/ThemeContext'
import { H1, H3, H4, Caption, Body } from '../components/Typography'
import { Button, Divider, Tag } from '../components/ui'
import { LinkedinLogo, DribbbleLogo, EnvelopeSimple, ArrowUpRight, Medal } from '@phosphor-icons/react'
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

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex gap-8 md:gap-12 items-start">
            {/* Bio photo with frosted frame + social icons */}
            <div className="hidden md:block flex-shrink-0">
              <div className="relative aspect-[3/4] w-32 md:w-48 min-[832px]:w-40">
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
                  href="/assets/resume/GraceGuo_Resume_2026.pdf"
                  external
                  variant="secondary"
                  size="md"
                  icon={<ArrowUpRight size={13} weight="regular" />}
                >
                  View as PDF
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

        <Divider className="mb-12" />

        {/* Two-column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">
          {/* Experience - First on mobile, right column on desktop */}
          <section className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-4">
            <H3 serif className="mb-8">Experience</H3>
            <div className="relative space-y-10">
              {experience.map((job, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Connector line - positioned relative to job entry */}
                  <div
                    className={`absolute w-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`}
                    style={{
                      left: '21px', // Center of 44px logo
                      top: '54px', // Below logo (44px) with 10px gap
                      bottom: index < experience.length - 1
                        ? '-42px' // Extend into space-y-10 gap, stop before next logo
                        : '0', // Last item: extend to bottom of content
                    }}
                  />
                  {/* Logo */}
                  {job.logo && (
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-11 h-11 rounded-lg overflow-hidden border p-1.5 ${
                        isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white'
                      }`}>
                        <div className="w-full h-full rounded overflow-hidden">
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                      <H4 className="text-base">{job.title}</H4>
                      <Caption className={`${textMuted} tracking-normal`}>{job.dates}</Caption>
                    </div>
                    <Body size="sm" className={`mb-3 ${textSecondary}`}>
                      {job.company} <span className="theme-muted">· {job.location}</span>
                    </Body>
                    <ul className="space-y-2.5">
                      {job.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span
                            className={`pt-[8px] flex-shrink-0 ${
                              isDark ? 'text-[#9CA3AF]' : 'text-[#3A3A3A]'
                            }`}
                          >
                            <svg width="4" height="4" viewBox="0 0 4 4" fill="currentColor">
                              <circle cx="2" cy="2" r="2" />
                            </svg>
                          </span>
                          <Body size="sm" className={`${textSecondary} !leading-snug`}>{bullet}</Body>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education - Second on mobile, sidebar on desktop */}
          <section className="order-2 lg:order-1 lg:col-start-1">
            <H3 serif className="mb-6">Education</H3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index}>
                  <H4 className="text-base mb-1">{edu.degree}</H4>
                  <Body size="sm" className={textSecondary}>{edu.school}</Body>
                  <Caption className={`${textMuted} tracking-normal mt-1 block`}>{edu.dates}</Caption>
                  {edu.award && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Medal size={14} weight="fill" className="theme-accent" />
                      <Body size="sm" className={textSecondary}>{edu.award}</Body>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills - Third on mobile, sidebar on desktop */}
          <section className="order-3 lg:order-1 lg:col-start-1">
            <H3 serif className="mb-6">Skills</H3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div>
                <H4 className="text-sm mb-3">Design</H4>
                <div className="flex flex-wrap gap-2">
                  {skills.design.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
              <div>
                <H4 className="text-sm mb-3">Development</H4>
                <div className="flex flex-wrap gap-2">
                  {skills.development.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
              <div>
                <H4 className="text-sm mb-3">Strategy</H4>
                <div className="flex flex-wrap gap-2">
                  {skills.strategy.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
              <div>
                <H4 className="text-sm mb-3">Tools</H4>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Languages - Fourth on mobile, sidebar on desktop */}
          <section className="order-4 lg:order-1 lg:col-start-1">
            <H3 serif className="mb-6">Languages</H3>
            <div className="space-y-3 max-w-[280px] sm:max-w-[320px] lg:max-w-none">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between">
                  <Body size="sm" className={textSecondary}>{lang.name}</Body>
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
          </section>
        </div>
      </div>
    </div>
  )
}
