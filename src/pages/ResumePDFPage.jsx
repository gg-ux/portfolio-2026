/**
 * Resume PDF using @react-pdf/renderer
 * Pixel-perfect PDF generation
 */

import { useState } from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Link,
} from '@react-pdf/renderer'

// Built-in PDF fonts (custom fonts have loading issues with react-pdf)

const styles = StyleSheet.create({
  page: {
    padding: '0.4in',
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 28,
    fontFamily: 'Times-Roman',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 10,
    fontWeight: 500,
    color: '#444',
  },
  contactItem: {
    fontSize: 6.5,
    color: '#888',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    fontFamily: 'Courier',
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
  },
  sidebar: {
    width: 150,
  },
  main: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  section: {
    marginBottom: 12,
  },
  // Skills
  skillsCategory: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  skillsCategoryLast: {
    marginBottom: 8,
    borderBottomWidth: 0,
  },
  skillsLabel: {
    fontSize: 6.5,
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#888',
    marginBottom: 3,
    fontFamily: 'Courier',
  },
  skillsList: {
    fontSize: 7.5,
    color: '#333',
    lineHeight: 1.4,
  },
  // Experience
  experienceEntry: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  jobTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },
  jobDates: {
    fontSize: 8,
    color: '#666',
  },
  jobCompany: {
    fontSize: 8.5,
    color: '#444',
    marginBottom: 3,
  },
  jobBullets: {
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 8,
    marginBottom: 2,
    lineHeight: 1.35,
    flexDirection: 'row',
  },
  bulletDot: {
    width: 10,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.35,
  },
  // Education
  eduEntry: {
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  eduSchool: {
    fontSize: 8,
    color: '#555',
  },
  eduDates: {
    fontSize: 7.5,
    color: '#777',
  },
  // Languages
  languageItem: {
    marginBottom: 8,
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  languageName: {
    fontSize: 8,
    fontWeight: 500,
  },
  languageLevel: {
    fontSize: 6.5,
    color: '#888',
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  languageBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  languageFill: {
    height: 4,
    backgroundColor: '#5B21B6',
    borderRadius: 2,
  },
})

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

// PDF Document Component
const ResumeDocument = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>Grace Guo</Text>
          <Text style={styles.tagline}>Senior UX/UI Designer, MHCI+D</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.contactItem}>GRACEGUO.DESIGN @ GMAIL.COM</Text>
          <Text style={styles.contactItem}>LINKEDIN.COM/IN/GRACE-GUO-UX</Text>
        </View>
      </View>

      {/* Two Column Layout */}
      <View style={styles.twoColumn}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>

            <View style={styles.skillsCategory}>
              <Text style={styles.skillsLabel}>DESIGN</Text>
              <Text style={styles.skillsList}>{skills.design.join(' · ')}</Text>
            </View>

            <View style={styles.skillsCategory}>
              <Text style={styles.skillsLabel}>DEVELOPMENT</Text>
              <Text style={styles.skillsList}>{skills.development.join(' · ')}</Text>
            </View>

            <View style={styles.skillsCategory}>
              <Text style={styles.skillsLabel}>STRATEGY</Text>
              <Text style={styles.skillsList}>{skills.strategy.join(' · ')}</Text>
            </View>

            <View style={styles.skillsCategoryLast}>
              <Text style={styles.skillsLabel}>TOOLS</Text>
              <Text style={styles.skillsList}>{skills.tools.join(' · ')}</Text>
            </View>
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.eduEntry}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduSchool}>{edu.school}</Text>
                <Text style={styles.eduDates}>{edu.dates}</Text>
              </View>
            ))}
          </View>

          {/* Languages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.languageItem}>
              <View style={styles.languageHeader}>
                <Text style={styles.languageName}>English</Text>
                <Text style={styles.languageLevel}>NATIVE</Text>
              </View>
              <View style={styles.languageBar}>
                <View style={[styles.languageFill, { width: '100%' }]} />
              </View>
            </View>
            <View style={styles.languageItem}>
              <View style={styles.languageHeader}>
                <Text style={styles.languageName}>Mandarin (Chinese)</Text>
                <Text style={styles.languageLevel}>PROFICIENT</Text>
              </View>
              <View style={styles.languageBar}>
                <View style={[styles.languageFill, { width: '80%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((job, i) => (
              <View key={i} style={styles.experienceEntry}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobDates}>{job.dates}</Text>
                </View>
                <Text style={styles.jobCompany}>{job.company} · {job.location}</Text>
                <View style={styles.jobBullets}>
                  {job.bullets.map((bullet, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
)

export default function ResumePDFPage() {
  const [showViewer, setShowViewer] = useState(true)

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
        <PDFDownloadLink
          document={<ResumeDocument />}
          fileName="GraceGuo_Resume.pdf"
          style={{
            background: '#1a1a1a',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {({ loading }) => (loading ? 'Generating...' : 'Download PDF')}
        </PDFDownloadLink>
        <button
          onClick={() => setShowViewer(!showViewer)}
          style={{
            background: '#f0f0f0',
            color: '#333',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          {showViewer ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {/* PDF Viewer */}
      {showViewer && (
        <PDFViewer style={{ flex: 1, border: 'none' }}>
          <ResumeDocument />
        </PDFViewer>
      )}
    </div>
  )
}
