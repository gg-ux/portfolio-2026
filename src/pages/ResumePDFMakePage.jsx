/**
 * Resume PDF using pdfmake
 */

import { useEffect, useState, useRef } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'

// Load fonts asynchronously
const loadFonts = async () => {
  const pdfFonts = await import('pdfmake/build/vfs_fonts')
  pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs || pdfFonts.pdfMake?.vfs || pdfFonts.default
}

const experience = [
  {
    company: 'Avala AI',
    location: 'Remote',
    title: 'Senior UX/UI Designer',
    dates: 'Jun 2024 — Present',
    bullets: [
      'Lead all design as sole designer across AI dataset platform, marketing site, internal tools, learning systems, and annotator app',
      'Author PRDs and shape product roadmap in collaboration with engineering and operations leadership',
      'Rapidly design, develop, and ship production code using agentic AI workflows—continuously updating UI component library and shipping platform iterations',
      'Design complex annotation workflows for LiDAR, 3D spatial data, and multi-frame sequences',
      'Own brand design across investor decks, trade shows, merchandise, and collateral',
    ],
  },
  {
    company: 'Tesla',
    location: 'Hawthorne, CA',
    title: 'UX/UI Designer',
    dates: 'Oct 2021 — Mar 2024',
    bullets: [
      'Led global launch of responsive feature pages for Tesla.com across Energy, Support, and Investor Relations',
      'Designed mega menu and AI chatbot for Tesla.com, achieving 120% sales lead conversion increase',
      'Redesigned internal and enterprise apps for in-store advisors and energy installers',
      'Developed components and guidelines for Figma library and Tesla Design System',
    ],
  },
  {
    company: 'Accurate Background',
    location: 'Irvine, CA',
    title: 'UX/UI Designer',
    dates: 'Apr 2018 — Sep 2021',
    bullets: [
      'Increased operational efficiency 25% through automated enterprise workflows',
      'Enhanced background check experience with improved IA and streamlined ID verification',
      'Designed key website flows for Pricing, Account Settings, and Project Dashboard',
    ],
  },
  {
    company: 'INDI EV',
    location: 'Los Angeles, CA',
    title: 'UX/UI Designer & Researcher',
    dates: 'Jul 2020 — Aug 2021',
    bullets: [
      'Led team of 4 designing in-vehicle infotainment system balancing safety with intuitive interactions',
      'Conducted research with 42 participants through interviews, card sorts, and surveys',
    ],
  },
]

const education = [
  {
    degree: 'Master of Human-Computer Interaction & Design',
    school: 'University of California, Irvine',
    dates: '2018 — 2019',
  },
  {
    degree: 'Bachelor of Arts in Psychology',
    school: 'University of California, Irvine',
    dates: '2013 — 2017',
  },
]

const skills = {
  design: ['Design Systems', 'Component Libraries', 'Interaction Design', 'Visual Design', 'Information Architecture', '3D/4D Data Visualization'],
  development: ['React', 'HTML/CSS/JS', 'Agentic AI Workflows', 'AI-Assisted Development', 'Production Front-end'],
  strategy: ['PRD Writing', 'Cross-Functional Collaboration', 'User Research', 'Requirements Gathering'],
  tools: ['Figma', 'GitHub', 'Claude Code', 'Warp', 'Midjourney', 'Adobe Creative Suite'],
}

// Build the document definition
const getDocDefinition = () => {
  const experienceContent = experience.map((job) => [
    {
      columns: [
        { text: job.title, style: 'jobTitle', width: '*' },
        { text: job.dates, style: 'jobDates', width: 'auto', alignment: 'right' },
      ],
      marginBottom: 1,
    },
    { text: `${job.company} · ${job.location}`, style: 'jobCompany' },
    {
      ul: job.bullets,
      style: 'bullets',
      marginBottom: 8,
    },
  ]).flat()

  const educationContent = education.map((edu) => ({
    stack: [
      { text: edu.degree, style: 'eduDegree' },
      { text: edu.school, style: 'eduSchool' },
      { text: edu.dates, style: 'eduDates' },
    ],
    marginBottom: 6,
  }))

  const skillsSection = (label, items) => ({
    stack: [
      { text: label.toUpperCase(), style: 'skillsLabel' },
      { text: items.join(' · '), style: 'skillsList' },
    ],
    marginBottom: 8,
  })

  return {
    pageSize: 'LETTER',
    pageMargins: [29, 29, 29, 29], // 0.4in margins

    content: [
      // Header
      {
        columns: [
          {
            stack: [
              { text: 'Grace Guo', style: 'name' },
              { text: 'Senior UX/UI Designer, MHCI+D', style: 'tagline' },
            ],
            width: '*',
          },
          {
            stack: [
              { text: 'GRACEGUO.DESIGN @ GMAIL.COM', style: 'contactItem' },
              { text: 'LINKEDIN.COM/IN/GRACE-GUO-UX', style: 'contactItem' },
            ],
            width: 'auto',
            alignment: 'right',
          },
        ],
        marginBottom: 12,
      },

      // Two column layout
      {
        columns: [
          // Sidebar
          {
            width: 150,
            stack: [
              { text: 'SKILLS', style: 'sectionTitle' },
              skillsSection('Design', skills.design),
              skillsSection('Development', skills.development),
              skillsSection('Strategy', skills.strategy),
              skillsSection('Tools', skills.tools),

              { text: 'EDUCATION', style: 'sectionTitle', marginTop: 8 },
              ...educationContent,

              { text: 'LANGUAGES', style: 'sectionTitle', marginTop: 8 },
              {
                stack: [
                  {
                    columns: [
                      { text: 'English', style: 'languageName' },
                      { text: 'NATIVE', style: 'languageLevel', alignment: 'right' },
                    ],
                  },
                  {
                    canvas: [
                      { type: 'rect', x: 0, y: 0, w: 130, h: 4, r: 2, color: '#e0e0e0' },
                      { type: 'rect', x: 0, y: 0, w: 130, h: 4, r: 2, color: '#5B21B6' },
                    ],
                    marginBottom: 8,
                  },
                ],
              },
              {
                stack: [
                  {
                    columns: [
                      { text: 'Mandarin (Chinese)', style: 'languageName' },
                      { text: 'PROFICIENT', style: 'languageLevel', alignment: 'right' },
                    ],
                  },
                  {
                    canvas: [
                      { type: 'rect', x: 0, y: 0, w: 130, h: 4, r: 2, color: '#e0e0e0' },
                      { type: 'rect', x: 0, y: 0, w: 104, h: 4, r: 2, color: '#5B21B6' },
                    ],
                  },
                ],
              },
            ],
          },

          // Main content
          {
            width: '*',
            stack: [
              { text: 'EXPERIENCE', style: 'sectionTitle' },
              ...experienceContent,
            ],
            marginLeft: 20,
          },
        ],
      },
    ],

    styles: {
      name: {
        fontSize: 28,
        font: 'Times',
        marginBottom: 4,
      },
      tagline: {
        fontSize: 10,
        color: '#444444',
      },
      contactItem: {
        fontSize: 6.5,
        color: '#888888',
        marginBottom: 3,
      },
      sectionTitle: {
        fontSize: 10,
        bold: true,
        marginBottom: 6,
        decoration: 'underline',
        decorationStyle: 'solid',
      },
      skillsLabel: {
        fontSize: 6.5,
        color: '#888888',
        marginBottom: 2,
      },
      skillsList: {
        fontSize: 7.5,
        color: '#333333',
        lineHeight: 1.3,
      },
      eduDegree: {
        fontSize: 9,
        bold: true,
      },
      eduSchool: {
        fontSize: 8,
        color: '#555555',
      },
      eduDates: {
        fontSize: 7.5,
        color: '#777777',
      },
      languageName: {
        fontSize: 8,
      },
      languageLevel: {
        fontSize: 6.5,
        color: '#888888',
      },
      jobTitle: {
        fontSize: 9.5,
        bold: true,
      },
      jobDates: {
        fontSize: 8,
        color: '#666666',
      },
      jobCompany: {
        fontSize: 8.5,
        color: '#444444',
        marginBottom: 3,
      },
      bullets: {
        fontSize: 8,
        lineHeight: 1.3,
      },
    },

    defaultStyle: {
      font: 'Helvetica',
      fontSize: 9,
      color: '#1a1a1a',
    },
  }
}

export default function ResumePDFMakePage() {
  const [pdfUrl, setPdfUrl] = useState(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    const generatePdf = async () => {
      try {
        console.log('Loading fonts...')
        await loadFonts()
        console.log('Fonts loaded, vfs:', !!pdfMake.vfs)

        // Test with simple document first
        const simpleDoc = {
          content: [
            { text: 'Grace Guo', fontSize: 28 },
            { text: 'Senior UX/UI Designer', fontSize: 12 },
          ]
        }

        console.log('Creating PDF...')
        const pdfDocGenerator = pdfMake.createPdf(simpleDoc)
        console.log('Getting blob...')
        pdfDocGenerator.getBlob((blob) => {
          console.log('Got blob:', blob.size)
          const url = URL.createObjectURL(blob)
          setPdfUrl(url)
        })
      } catch (err) {
        console.error('PDF generation error:', err)
      }
    }
    generatePdf()

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [])

  const handleDownload = () => {
    pdfMake.createPdf(getDocDefinition()).download('GraceGuo_Resume.pdf')
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f5f5f5',
    }}>
      {/* Controls */}
      <div style={{
        padding: '16px 24px',
        background: 'white',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}>
        <button
          onClick={handleDownload}
          style={{
            background: '#1a1a1a',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Download PDF
        </button>
      </div>

      {/* PDF Viewer */}
      {pdfUrl ? (
        <iframe
          ref={iframeRef}
          src={pdfUrl}
          style={{ flex: 1, border: 'none' }}
          title="Resume PDF"
        />
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Generating PDF...
        </div>
      )}
    </div>
  )
}
