/**
 * Print-optimized Resume Page
 * Two-column layout designed for one-page PDF export
 * Access at /resume-print, click Download PDF button
 */

import { useRef } from 'react'
import html2pdf from 'html2pdf.js'
import { QRCodeSVG } from 'qrcode.react'
import {
  personalInfo,
  getPrintExperience,
  education,
  printSkills as skills,
  languages,
} from '../data/resumeData'

// Get print-optimized experience data
const experience = getPrintExperience()

export default function ResumePrintPage() {
  const resumeRef = useRef(null)

  const handleDownloadPDF = () => {
    const element = resumeRef.current
    const opt = {
      margin: 0,
      filename: 'GraceGuo_Resume.pdf',
      image: { type: 'png', quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        letterRendering: true,
        logging: false,
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(element).save()
  }

  return (
    <div>
      {/* Download button - hidden in print */}
      <div className="no-print" style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <button
          onClick={handleDownloadPDF}
          style={{
            background: '#1a1a1a',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          Download PDF
        </button>
      </div>

      <div className="print-resume" ref={resumeRef}>
      <style>{`
        @page {
          size: letter;
          margin: 0.4in 0.5in;
        }

        @media print {
          @page {
            margin: 0.4in 0.5in;
          }
          html, body, * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }

        * {
          cursor: auto !important;
        }

        .print-resume {
          font-family: 'Satoshi', -apple-system, sans-serif;
          font-size: 9pt;
          font-weight: 450;
          line-height: 1.4;
          color: #1a1a1a;
          background: white;
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.64in 0.5in 0.4in 0.5in;
        }

        .print-resume * {
          box-sizing: border-box;
        }

        /* Two column layout */
        .resume-grid {
          display: grid;
          grid-template-columns: 170px 1fr;
          gap: 0.25in;
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
          color: #5B21B6 !important;
          margin: 14px 0 0 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 6px;
        }

        .contact-item {
          font-family: 'Satoshi', -apple-system, sans-serif;
          font-size: 8pt;
          font-weight: 500;
          color: #555;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .contact-item svg {
          color: #5B21B6;
          flex-shrink: 0;
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

        .qr-heart {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
          color: #5B21B6 !important;
          background: white;
          padding: 2px 4px;
          line-height: 1;
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

        /* Section titles */
        .section-title {
          font-family: 'Azeret Mono', monospace;
          font-size: 8pt;
          font-weight: 600;
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
          color: #5B21B6 !important;
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
          padding-left: 0;
          list-style: none;
        }

        .job-bullets li {
          font-size: 8.5pt;
          font-weight: 450;
          margin-bottom: 3px;
          line-height: 1.4;
          padding-left: 12px;
          position: relative;
          color: #2a2a2a;
        }

        .job-bullets li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          width: 4px;
          height: 4px;
          background: #999;
          border-radius: 50%;
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
          color: #5B21B6 !important;
          flex-shrink: 0;
        }

        /* Contact */
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .contact-link {
          font-size: 7.5pt;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .contact-link svg {
          color: #5B21B6 !important;
          flex-shrink: 0;
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
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #5B21B6;
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
          background: linear-gradient(90deg, #5B21B6, #7C3AED) !important;
          border-radius: 3px;
        }


        @media screen {
          .print-resume {
            padding: 0.75in;
            box-shadow: 0 4px 40px rgba(0,0,0,0.08);
            margin: 40px auto;
            border-radius: 4px;
          }
        }

        .no-print {
          display: block;
        }

        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="resume-grid">
        {/* Header */}
        <header className="resume-header">
          <div className="header-left">
            <h1>{personalInfo.name}</h1>
            <p className="tagline">{personalInfo.title} ✦ {personalInfo.credentials}</p>
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
                <span className="qr-heart">❤</span>
              </div>
              <span className="header-qr-label">graceguo.io</span>
            </div>
          </div>
        </header>

        {/* Left Sidebar */}
        <aside className="sidebar">
          {/* Contact */}
          <section>
            <h2 className="section-title">Contact</h2>
            <div className="contact-list">
              <a href={`mailto:${personalInfo.email}`} className="contact-link">
                <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
                </svg>
                {personalInfo.email}
              </a>
              <a href={personalInfo.linkedinUrl} className="contact-link">
                <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"/>
                </svg>
                {personalInfo.linkedin}
              </a>
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

        {/* Right Main Content */}
        <main className="main-content">
          <section>
            <h2 className="section-title">Experience</h2>
            {experience.map((job, i) => (
              <div key={i} className="experience-entry">
                <div className="job-header">
                  <h3 className="job-title">{job.title}</h3>
                  <span className="job-dates">{job.dates}</span>
                </div>
                <p className="job-company">{job.company} <span className="location">· {job.location}</span></p>
                <ul className="job-bullets">
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </main>
      </div>
      </div>
    </div>
  )
}
