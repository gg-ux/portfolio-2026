/**
 * Resume Content Component
 * Extracted from ResumePrintPage with template support
 * Supports 'visual' and 'ats' formats
 */

import { QRCodeSVG } from 'qrcode.react'
import {
  personalInfo,
  getPrintExperience,
  getResumeDataForTemplate,
} from '../../data/resumeData'

// ATS-friendly single-column layout with styling
function ATSResumeContent({ template }) {
  const accent = template.colors.accent
  const templateId = template.id
  const resumeData = getResumeDataForTemplate(templateId)
  const experience = getPrintExperience(templateId)
  const { skills, education } = resumeData
  const tagline = resumeData.personalInfo.tagline

  return (
    <div className="ats-resume">
      <style>{`
        .ats-resume {
          font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 9.5pt;
          line-height: 1.5;
          color: #1a1a1a;
          background: white;
          max-width: 8.5in;
          margin: 0 auto;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        .ats-resume * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        /* Header */
        .ats-header {
          margin-bottom: 12px;
          padding-bottom: 10px;
        }

        .ats-header h1 {
          font-family: 'Silk Serif', Georgia, serif;
          font-size: 32pt;
          font-weight: 400;
          margin: 0 0 4px 0;
          letter-spacing: -0.5px;
          color: #111;
        }

        .ats-header .ats-title {
          font-family: 'Azeret Mono', monospace;
          font-size: 8pt;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: ${accent} !important;
          margin: 0 0 8px 0;
        }

        .ats-contact {
          font-size: 9pt;
          color: #555;
        }

        .ats-contact span {
          margin-right: 16px;
        }

        .ats-contact-separator {
          color: #ccc;
          margin: 0 8px;
        }

        /* Section titles */
        .ats-section-title {
          font-family: 'Azeret Mono', monospace;
          font-size: 8pt;
          font-weight: 550;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 12px 0 6px 0;
          padding-bottom: 4px;
          border-bottom: 1.5px solid #1a1a1a;
          color: #1a1a1a;
        }

        /* About/Summary */
        .ats-summary {
          font-size: 9pt;
          line-height: 1.5;
          color: #333;
          margin-bottom: 0;
        }

        /* Experience entries */
        .ats-experience-entry {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .ats-experience-entry:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .ats-job-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2px;
        }

        .ats-job-title {
          font-size: 10.5pt;
          font-weight: 700;
          margin: 0;
          color: #111;
        }

        .ats-job-dates {
          font-family: 'Azeret Mono', monospace;
          font-size: 7.5pt;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.3px;
        }

        .ats-job-company {
          font-size: 9.5pt;
          font-weight: 500;
          color: ${accent} !important;
          margin: 0 0 6px 0;
        }

        .ats-job-location {
          font-weight: 400;
          color: #666;
        }

        .ats-job-bullets {
          margin: 0;
          padding-left: 16px;
          list-style: disc;
        }

        .ats-job-bullets li {
          font-size: 8.5pt;
          margin-bottom: 2px;
          line-height: 1.4;
          color: #2a2a2a;
        }

        .ats-job-bullets li::marker {
          color: #999;
        }

        /* Skills */
        .ats-skills-section {
          margin-bottom: 0;
        }

        .ats-skills-row {
          display: flex;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .ats-skills-label {
          font-family: 'Azeret Mono', monospace;
          font-size: 7pt;
          font-weight: 550;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: ${accent} !important;
          min-width: 90px;
          padding-top: 2px;
        }

        .ats-skills-list {
          font-size: 9pt;
          color: #333;
          flex: 1;
        }

        /* Education */
        .ats-education-entry {
          margin-bottom: 10px;
        }

        .ats-education-entry:last-child {
          margin-bottom: 0;
        }

        .ats-edu-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
        }

        .ats-edu-degree {
          font-size: 9.5pt;
          font-weight: 600;
          margin: 0;
          color: #111;
          flex: 1;
        }

        .ats-edu-dates {
          font-family: 'Azeret Mono', monospace;
          font-size: 7pt;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.3px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ats-edu-school {
          font-size: 9pt;
          color: #555;
          margin: 2px 0 0 0;
        }

        .ats-edu-award {
          font-size: 8.5pt;
          font-weight: 500;
          color: ${accent} !important;
          margin: 4px 0 0 0;
        }

        /* Two-column footer for skills/education */
        .ats-footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          margin-top: 0;
        }
      `}</style>

      {/* Header */}
      <header className="ats-header">
        <h1>{personalInfo.name}</h1>
        <p className="ats-title">{resumeData.personalInfo.title} | {personalInfo.credentials}</p>
        <div className="ats-contact">
          <span>{personalInfo.email}</span>
          <span className="ats-contact-separator">|</span>
          <span>{personalInfo.linkedin}</span>
          <span className="ats-contact-separator">|</span>
          <span>graceguo.io</span>
        </div>
      </header>

      {/* Summary */}
      <section>
        <h2 className="ats-section-title">About</h2>
        <p className="ats-summary">{tagline}</p>
      </section>

      {/* Experience - FIRST for ATS */}
      <section>
        <h2 className="ats-section-title">Experience</h2>
        {experience.map((job, i) => (
          <div key={i} className="ats-experience-entry">
            <div className="ats-job-header">
              <h3 className="ats-job-title">{job.title}</h3>
              <span className="ats-job-dates">{job.dates}</span>
            </div>
            <p className="ats-job-company">{job.company} <span className="ats-job-location">- {job.location}</span></p>
            <ul className="ats-job-bullets">
              {job.bullets.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills & Education side by side */}
      <div className="ats-footer-grid">
        {/* Skills */}
        <section className="ats-skills-section">
          <h2 className="ats-section-title">Skills</h2>
          <div className="ats-skills-row">
            <span className="ats-skills-label">Design</span>
            <span className="ats-skills-list">{skills.design.join(', ')}</span>
          </div>
          <div className="ats-skills-row">
            <span className="ats-skills-label">Development</span>
            <span className="ats-skills-list">{skills.development.join(', ')}</span>
          </div>
          <div className="ats-skills-row">
            <span className="ats-skills-label">Strategy</span>
            <span className="ats-skills-list">{skills.strategy.join(', ')}</span>
          </div>
          <div className="ats-skills-row">
            <span className="ats-skills-label">Tools</span>
            <span className="ats-skills-list">{skills.tools.join(', ')}</span>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="ats-section-title">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="ats-education-entry">
              <div className="ats-edu-header">
                <h3 className="ats-edu-degree">{edu.degree}</h3>
                <span className="ats-edu-dates">{edu.dates}</span>
              </div>
              <p className="ats-edu-school">{edu.school}</p>
              {edu.award && <p className="ats-edu-award">{edu.award}</p>}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default function ResumeContent({ template, format = 'visual' }) {
  // Render ATS version if format is 'ats'
  if (format === 'ats') {
    return <ATSResumeContent template={template} />
  }

  const accent = template.colors.accent
  const templateId = template.id

  // Get template-specific data
  const resumeData = getResumeDataForTemplate(templateId)
  const experience = getPrintExperience(templateId)
  const { skills, education, languages } = resumeData
  const tagline = resumeData.personalInfo.tagline

  return (
    <div className="print-resume">
      <style>{`
        .print-resume {
          font-family: 'Satoshi', -apple-system, sans-serif;
          font-size: 9pt;
          font-weight: 450;
          line-height: 1.4;
          color: #1a1a1a;
          background: white;
          max-width: 8.5in;
          margin: 0 auto;
        }

        .print-resume * {
          box-sizing: border-box;
        }

        /* Two column layout - CSS order keeps sidebar visually left */
        .resume-grid {
          display: grid;
          grid-template-columns: 170px 1fr;
          gap: 0.25in;
        }

        /* Sidebar visually first (left), but main content first in HTML for ATS */
        .sidebar {
          order: 1;
        }

        .main-content {
          order: 2;
        }

        /* Header - full width */
        .resume-header {
          grid-column: 1 / -1;
          margin-bottom: 0.08in;
          padding-bottom: 0.06in;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-left {
          flex: 1;
        }

        .header-right {
          display: flex;
          align-items: flex-start;
        }

        .resume-header h1 {
          font-family: 'Silk Serif', serif;
          font-size: 48pt;
          font-weight: 400;
          margin: 0 0 4px 0;
          letter-spacing: -1px;
          line-height: 0.85;
          color: #111;
        }

        .resume-header .tagline {
          font-family: 'Azeret Mono', monospace;
          font-size: 7.5pt;
          font-weight: 500;
          color: ${accent} !important;
          margin: 8px 0 0 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .header-qr {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .qr-with-heart {
          position: relative;
          display: inline-block;
        }

        .qr-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: white;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr-logo svg {
          width: 100%;
          height: 100%;
          fill: ${accent} !important;
        }

        .qr-logo svg path {
          fill: ${accent} !important;
        }

        .header-qr-label {
          font-family: 'Azeret Mono', monospace;
          font-size: 7pt;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.3px;
        }

        /* Left sidebar */
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 0.18in;
        }

        /* Right main content */
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 0.1in;
        }

        /* About section */
        .about-section {
          margin-bottom: 14px;
        }

        .about-text {
          font-size: 9pt;
          line-height: 1.5;
          color: #333;
          margin: 0;
        }

        /* Section titles */
        .section-title {
          font-family: 'Azeret Mono', monospace;
          font-size: 8pt;
          font-weight: 550;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0 0 10px 0;
          padding-bottom: 6px;
          color: #1a1a1a;
          border-bottom: 2px solid #1a1a1a;
        }

        /* Experience entries */
        .experience-entry {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
        }

        .experience-entry:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2px;
        }

        .job-title {
          font-size: 10pt;
          font-weight: 700;
          margin: 0;
          color: #111;
        }

        .job-dates {
          font-family: 'Azeret Mono', monospace;
          font-size: 7pt;
          font-weight: 500;
          color: #555;
          white-space: nowrap;
          letter-spacing: 0.3px;
        }

        .job-company {
          font-size: 9pt;
          color: ${accent} !important;
          font-weight: 500;
          margin: 0 0 6px 0;
        }

        .job-company .location {
          font-size: 8pt;
          color: #666;
          font-weight: 500;
        }

        .job-bullets {
          margin: 0;
          padding-left: 14px;
          list-style: disc;
        }

        .job-bullets li {
          font-size: 8.5pt;
          font-weight: 450;
          margin-bottom: 3px;
          line-height: 1.4;
          color: #2a2a2a;
        }

        .job-bullets li::marker {
          color: #999;
          font-size: 8pt;
        }

        /* Education entries */
        .education-entry {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .education-entry:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .edu-degree {
          font-size: 8.5pt;
          font-weight: 600;
          margin: 0 0 2px 0;
          color: #111;
        }

        .edu-school {
          font-size: 8pt;
          color: #555;
          margin: 0;
        }

        .edu-dates {
          font-family: 'Azeret Mono', monospace;
          font-size: 6.5pt;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.3px;
        }

        .edu-award {
          font-size: 8pt;
          font-weight: 500;
          color: #333;
          margin: 4px 0 0 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .edu-award svg {
          color: ${accent} !important;
          flex-shrink: 0;
        }

        /* Contact */
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .contact-item-text {
          font-size: 7.5pt;
          font-weight: 500;
          color: #333;
          display: block;
          margin-bottom: 4px;
        }

        .contact-icon {
          color: ${accent};
          font-size: 8pt;
          font-weight: 600;
          margin-right: 6px;
          display: inline-block;
          width: 14px;
          text-align: center;
        }

        /* Skills */
        .skills-category {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .skills-category:last-of-type {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .skills-label {
          font-family: 'Azeret Mono', monospace;
          font-size: 6.5pt;
          font-weight: 550;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${accent};
          margin-bottom: 4px;
          display: block;
        }

        .skills-list {
          display: block;
        }

        .skill-tag {
          font-size: 7.5pt;
          font-weight: 500;
          color: #333;
          display: block;
          line-height: 1.5;
        }

        .skills-list.inline {
          display: inline;
        }

        .skills-list.inline .skill-tag {
          display: inline;
        }

        .skills-list.inline .skill-tag::after {
          content: ' · ';
          color: #999;
        }

        .skills-list.inline .skill-tag:last-child::after {
          content: '';
        }

        /* Languages */
        .language-item {
          margin-bottom: 10px;
        }

        .language-item:last-child {
          margin-bottom: 0;
        }

        .language-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .language-name {
          font-size: 8pt;
          font-weight: 500;
          color: #333;
        }

        .language-level {
          font-family: 'Satoshi', -apple-system, sans-serif;
          font-size: 8pt;
          font-weight: 500;
          color: #666;
        }

        .language-bar {
          height: 3px;
          background: #eee;
          border-radius: 3px;
          overflow: hidden;
        }

        .language-fill {
          height: 100%;
          background: ${template.colors.accentGradient} !important;
          border-radius: 3px;
        }
      `}</style>

      <div className="resume-grid">
        {/* Header */}
        <header className="resume-header">
          <div className="header-left">
            <h1>{personalInfo.name}</h1>
            <p className="tagline">{resumeData.personalInfo.title} | {personalInfo.credentials}</p>
          </div>
          <div className="header-right">
            <div className="header-qr">
              <div className="qr-with-heart">
                <QRCodeSVG
                  value="https://graceguo.io"
                  size={72}
                  level="H"
                  fgColor="#1a1a1a"
                />
                <span className="qr-logo">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.27 91.71">
                    <path fillRule="evenodd" d="M519,279.86A45.77,45.77,0,0,1,564.68,234H579.6c13.57,0,21.78,4.54,27.24,9.35a31,31,0,0,1,5.69,6.6,23.68,23.68,0,0,1,1.28,2.26c.14.29.25.52.33.7a1.46,1.46,0,0,0,.09.21l0,.08v0h0s0,0-3.5,1.37l3.51-1.36,2,5.13H564.68a21.48,21.48,0,0,0,0,42.95H582a13,13,0,0,0,12.45-9.28H564.68a12.2,12.2,0,0,1,0-24.39h18.13a19.7,19.7,0,0,1,19.45,16.83H615.5v3.78h3.76A37.38,37.38,0,0,1,582,325.71H564.68A45.77,45.77,0,0,1,519,279.86Zm92.5,12.19h-9.37A20.55,20.55,0,0,1,582,308.88H564.68a29,29,0,0,1,0-58h39.05a24.36,24.36,0,0,0-1.84-1.8c-4.11-3.61-10.56-7.48-22.29-7.48H564.68a38.31,38.31,0,0,0,0,76.61H582A29.84,29.84,0,0,0,611.5,292.05Zm-16.9-7.56a12.16,12.16,0,0,0-11.79-9.28H564.68a4.64,4.64,0,0,0,0,9.28Z" transform="translate(-519 -234)"/>
                    <path d="M614.44,284.49h4.83v3.91l-4.45-.09Z" transform="translate(-519 -234)"/>
                  </svg>
                </span>
              </div>
              <span className="header-qr-label">graceguo.io</span>
            </div>
          </div>
        </header>

        {/* Main Content - FIRST in HTML for ATS parsing, CSS order displays sidebar visually left */}
        <main className="main-content">
          {/* About */}
          <section className="about-section">
            <h2 className="section-title">About</h2>
            <p className="about-text">{tagline}</p>
          </section>

          <section>
            <h2 className="section-title">Experience</h2>
            {experience.map((job, i) => (
              <div key={i} className="experience-entry">
                <div className="job-header">
                  <h3 className="job-title">{job.title}</h3>
                  <span className="job-dates">{job.dates}</span>
                </div>
                <p className="job-company">{job.company} <span className="location">- {job.location}</span></p>
                <ul className="job-bullets">
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </main>

        {/* Sidebar - second in HTML but visually left via CSS order */}
        <aside className="sidebar">
          {/* Contact */}
          <section>
            <h2 className="section-title">Contact</h2>
            <div className="contact-list">
              <span className="contact-item-text">
                <span className="contact-icon">@</span>
                {personalInfo.email}
              </span>
              <span className="contact-item-text">
                <span className="contact-icon">in</span>
                {personalInfo.linkedin}
              </span>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="section-title">Skills</h2>
            <div className="skills-category">
              <div className="skills-label">Design</div>
              <div className="skills-list">
                {skills.design.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-category">
              <div className="skills-label">Development</div>
              <div className="skills-list">
                {skills.development.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-category">
              <div className="skills-label">Strategy</div>
              <div className="skills-list">
                {skills.strategy.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-category">
              <div className="skills-label">Tools</div>
              <div className="skills-list inline">
                {skills.tools.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="section-title">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="education-entry">
                <p className="edu-degree">{edu.degree}</p>
                <p className="edu-school">{edu.school}</p>
                <span className="edu-dates">{edu.dates}</span>
                {edu.award && (
                  <p className="edu-award">
                    <svg width="10" height="10" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M216,96A88,88,0,1,0,72,163.83V240a8,8,0,0,0,11.58,7.16L128,225l44.43,22.21A8,8,0,0,0,184,240V163.83A87.86,87.86,0,0,0,216,96ZM56,96a72,72,0,1,1,72,72A72.08,72.08,0,0,1,56,96Zm112,127.58-36.43-18.21a8,8,0,0,0-7.16,0L88,223.58V175.32a87.87,87.87,0,0,0,80,0ZM128,152a56,56,0,1,1,56-56A56.06,56.06,0,0,1,128,152Z"/>
                    </svg>
                    {edu.award}
                  </p>
                )}
              </div>
            ))}
          </section>

          {/* Languages */}
          <section>
            <h2 className="section-title">Languages</h2>
            {languages.map((lang, i) => (
              <div key={i} className="language-item">
                <div className="language-header">
                  <span className="language-name">{lang.name}</span>
                  <span className="language-level">{lang.level}</span>
                </div>
                <div className="language-bar">
                  <div className="language-fill" style={{ width: `${lang.proficiency}%` }} />
                </div>
              </div>
            ))}
          </section>

        </aside>
      </div>
    </div>
  )
}
