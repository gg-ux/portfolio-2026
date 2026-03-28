/**
 * Interview Notes Modal - Disney Senior UX Designer
 * Tabbed navigation with card-based layout for easy scanning
 */

import { useState, useEffect } from 'react'
import { X } from '@phosphor-icons/react'

const TABS = [
  { id: 'interviewer', label: 'Interviewer' },
  { id: 'talking-points', label: 'Talking Points' },
  { id: 'behavioral', label: 'Behavioral' },
  { id: 'questions', label: 'Questions to Ask' },
  { id: 'tips', label: 'Quick Tips' },
]

export default function InterviewNotesModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('interviewer')

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="interview-modal-overlay" onClick={onClose}>
      <style>{`
        .interview-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          overflow: hidden;
        }

        .interview-modal {
          background: #FAF8F4;
          border-radius: 20px;
          max-width: 960px;
          width: 100%;
          max-height: calc(100vh - 80px);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          isolation: isolate;
        }

        /* Override any dark scrollbar styles from parent */
        .interview-modal,
        .interview-modal * {
          scrollbar-color: #ccc #FAF8F4;
        }

        /* Header with tabs */
        .interview-header {
          padding: 24px 32px 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          background: #FAF8F4;
          border-radius: 20px 20px 0 0;
          flex-shrink: 0;
          position: relative;
          z-index: 10;
        }

        /* Cover the scrollbar track in the header area */
        .interview-header::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 100%;
          background: #FAF8F4;
          border-radius: 0 20px 0 0;
        }

        .interview-header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .interview-title {
          font-family: 'Silk Serif', serif;
          font-size: 28px;
          font-weight: 400;
          color: #1A1A1A;
          margin: 0;
        }

        .interview-subtitle {
          font-family: 'Azeret Mono', monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #5835B0;
          margin-top: 4px;
        }

        .interview-close {
          padding: 10px;
          background: transparent;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: #6B6B6B;
          transition: all 0.2s;
        }

        .interview-close:hover {
          background: rgba(0,0,0,0.05);
          color: #1A1A1A;
        }

        /* Tabs */
        .interview-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 0;
          margin: 0 -8px;
          padding: 0 8px;
        }

        .interview-tab {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 12px 16px;
          border: none;
          background: transparent;
          color: #6B6B6B;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          white-space: nowrap;
          margin-bottom: -1px;
        }

        .interview-tab:hover {
          color: #4A4A4A;
        }

        .interview-tab.active {
          color: #5835B0;
          border-bottom-color: #5835B0;
        }

        /* Content area */
        .interview-content {
          padding: 32px;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }

        /* Light scrollbar for modal */
        .interview-modal ::-webkit-scrollbar {
          width: 8px;
        }

        .interview-modal ::-webkit-scrollbar-track {
          background: #FAF8F4;
        }

        .interview-modal ::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }

        .interview-modal ::-webkit-scrollbar-thumb:hover {
          background: #bbb;
        }

        /* Cards */
        .interview-card {
          background: white;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .interview-card:last-child {
          margin-bottom: 0;
        }

        .interview-card-title {
          font-family: 'Satoshi', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #1A1A1A;
          margin: 0 0 6px 0;
        }

        .interview-card-subtitle {
          font-family: 'Satoshi', sans-serif;
          font-size: 15px;
          color: #6B6B6B;
          margin: 0 0 20px 0;
        }

        /* Story highlight box */
        .story-box {
          background: linear-gradient(135deg, rgba(88, 53, 176, 0.06) 0%, rgba(88, 53, 176, 0.02) 100%);
          border-left: 3px solid #5835B0;
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          margin-bottom: 20px;
        }

        .story-box:last-child {
          margin-bottom: 0;
        }

        .story-label {
          font-family: 'Azeret Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #5835B0;
          margin-bottom: 8px;
        }

        .story-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #1A1A1A;
        }

        .story-text strong {
          color: #5835B0;
          font-weight: 600;
        }

        /* Metric callout */
        .metric-callout {
          display: inline-block;
          background: #5835B0;
          color: white;
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          margin-top: 12px;
        }

        /* Tip box */
        .tip-box {
          background: rgba(88, 53, 176, 0.08);
          border-radius: 12px;
          padding: 20px 24px;
          margin-top: 20px;
        }

        .tip-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #5835B0;
          margin-bottom: 8px;
        }

        .tip-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: #4A4A4A;
        }

        /* Lists */
        .interview-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .interview-list li {
          font-family: 'Satoshi', sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #1A1A1A;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .interview-list li:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .interview-list li:first-child {
          padding-top: 0;
        }

        .list-bullet {
          width: 6px;
          height: 6px;
          background: #5835B0;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 9px;
        }

        /* Section within card */
        .card-section {
          margin-bottom: 24px;
        }

        .card-section:last-child {
          margin-bottom: 0;
        }

        .card-section-title {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #5835B0;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-section-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #4A4A4A;
        }

        /* Question card */
        .question-card {
          background: white;
          border-radius: 16px;
          padding: 24px 28px;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .question-card:last-child {
          margin-bottom: 0;
        }

        .question-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #1A1A1A;
          margin: 0 0 12px 0;
        }

        .question-answer {
          font-family: 'Satoshi', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #4A4A4A;
        }

        .question-answer strong {
          color: #5835B0;
          font-weight: 600;
        }

        /* Ask question card */
        .ask-card {
          background: white;
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ask-card:last-child {
          margin-bottom: 0;
        }

        .ask-question {
          font-family: 'Satoshi', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #1A1A1A;
        }

        .ask-why {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          color: #6B6B6B;
        }

        /* Tips grid */
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .tip-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .tip-card-title {
          font-family: 'Satoshi', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 8px;
        }

        .tip-card-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 15px;
          line-height: 1.5;
          color: #4A4A4A;
        }

        /* Value tag */
        .value-tag {
          display: inline-block;
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #5835B0;
          background: rgba(88, 53, 176, 0.1);
          padding: 4px 10px;
          border-radius: 6px;
          margin-right: 8px;
          margin-bottom: 8px;
        }
      `}</style>

      <div className="interview-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="interview-header">
          <div className="interview-header-top">
            <div>
              <h1 className="interview-title">Disney Interview Prep</h1>
              <p className="interview-subtitle">Senior UX Designer - AI Enterprise</p>
            </div>
            <button className="interview-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="interview-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`interview-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="interview-content">
          {activeTab === 'interviewer' && <InterviewerTab />}
          {activeTab === 'talking-points' && <TalkingPointsTab />}
          {activeTab === 'behavioral' && <BehavioralTab />}
          {activeTab === 'questions' && <QuestionsTab />}
          {activeTab === 'tips' && <TipsTab />}
        </div>
      </div>
    </div>
  )
}

function InterviewerTab() {
  return (
    <>
      <div className="interview-card">
        <h2 className="interview-card-title">Jenn Lee</h2>
        <p className="interview-card-subtitle">Director, R&D Emerging Technologies @ Disney (since June 2025)</p>

        <div className="card-section">
          <p className="card-section-title">Background</p>
          <p className="card-section-text">
            Software Engineering Leader with 20+ years experience. Ex-Amazon/Audible (7 years as Sr Director).
            MBA in IT/Finance, AWS Certified Architect. Speaker at Grace Hopper, Women Impact Tech.
          </p>
        </div>

        <div className="card-section">
          <p className="card-section-title">What She's Passionate About</p>
          <ul className="interview-list">
            <li><span className="list-bullet" />Spatial technologies (Apple Vision Pro, Meta Quest, photogrammetry)</li>
            <li><span className="list-bullet" />Innovation & emerging tech R&D</li>
            <li><span className="list-bullet" />Building and mentoring high-performing teams</li>
            <li><span className="list-bullet" />Continuous learning - "Learn. Do. Teach."</li>
          </ul>
        </div>
      </div>

      <div className="interview-card">
        <h2 className="interview-card-title">Her Core Values</h2>
        <p className="interview-card-subtitle">From her personal website and blog</p>

        <div style={{ marginBottom: '16px' }}>
          <span className="value-tag">"Lead by demonstrating excellence"</span>
          <span className="value-tag">"Fully understand problems before acting"</span>
          <span className="value-tag">"Plan. Do. Reflect."</span>
          <span className="value-tag">"Dare to innovate"</span>
          <span className="value-tag">"Radical optimism"</span>
        </div>

        <p className="card-section-text">
          She ships, not just talks. Research-driven. Iterative approach. Views challenges as opportunities.
        </p>
      </div>

      <div className="interview-card">
        <h2 className="interview-card-title">Connection Points</h2>
        <p className="interview-card-subtitle">Why you're a good fit for her team</p>

        <ul className="interview-list">
          <li><span className="list-bullet" />Both work at intersection of emerging tech + practical application</li>
          <li><span className="list-bullet" />Both value shipping real products over just concepts</li>
          <li><span className="list-bullet" />She'll appreciate your hands-on code skills (she's technical herself)</li>
          <li><span className="list-bullet" />She values "experiential" demos - your portfolio's interactivity matters</li>
          <li><span className="list-bullet" />She founded a fitness business - entrepreneurial, values hustle</li>
        </ul>
      </div>
    </>
  )
}

function TalkingPointsTab() {
  return (
    <>
      {/* Area 1 */}
      <div className="interview-card">
        <h2 className="interview-card-title">Leading UX Across Complex Systems</h2>

        <div className="story-box">
          <p className="story-label">Your Story: Avala AI</p>
          <p className="story-text">
            "As the sole designer at Avala AI, I lead all design across <strong>five interconnected products</strong>:
            data annotation platform, native mobile labeling app, marketing site, internal admin tools,
            and learning management system."
          </p>
        </div>

        <div className="story-box">
          <p className="story-label">Systems Complexity</p>
          <p className="story-text">
            "I design for <strong>five distinct user types</strong> - annotators, customers, internal admins, investors,
            and the general public - each with completely different mental models. The annotation workflows involve
            LiDAR point clouds, 3D spatial data, and multi-frame video sequences."
          </p>
        </div>
      </div>

      {/* Area 2 */}
      <div className="interview-card">
        <h2 className="interview-card-title">End-to-End UX Ownership</h2>

        <div className="story-box">
          <p className="story-label">Your Story: Tesla AI Chatbot</p>
          <p className="story-text">
            "I led the design from initial problem framing through launch. Started with analyzing support ticket data,
            created journey maps for different customer intents, designed conversation flows and fallback patterns,
            iterated through usability testing, and worked closely with the ML team on confidence thresholds."
          </p>
          <span className="metric-callout">120% increase in sales lead conversion</span>
        </div>

        <div className="story-box">
          <p className="story-label">Artifacts You Create</p>
          <p className="story-text">
            "Journey maps, service blueprints, system diagrams, wireframes, high-fidelity prototypes.
            At Avala, I also write PRDs and partner with engineering leadership on roadmap prioritization -
            I'm comfortable operating at the <strong>strategy level</strong>, not just execution."
          </p>
        </div>
      </div>

      {/* Area 3 */}
      <div className="interview-card">
        <h2 className="interview-card-title">Enterprise Constraints</h2>
        <p className="interview-card-subtitle">Scale, Security, Compliance</p>

        <div className="story-box">
          <p className="story-label">Your Story: Accurate Background</p>
          <p className="story-text">
            "Designed for a <strong>highly regulated industry</strong> - background checks involve PII, FCRA compliance,
            and strict audit requirements. Created a compliance-focused error-detection tool that automatically flagged
            inconsistencies while maintaining legal compliance."
          </p>
        </div>

        <div className="story-box">
          <p className="story-label">Scale Experience</p>
          <p className="story-text">
            "Tesla.com serves <strong>millions of users globally across 8+ markets</strong>. I led the mega menu redesign
            which required scalable navigation components that could handle different product lines, languages,
            and regional variations."
          </p>
        </div>
      </div>

      {/* Area 4 */}
      <div className="interview-card">
        <h2 className="interview-card-title">Partnering with Engineers</h2>

        <div className="story-box">
          <p className="story-label">Your Approach</p>
          <p className="story-text">
            "I don't hand off designs - I collaborate. At Avala, I actually <strong>ship production React components
            and design tokens myself</strong> using Claude Code. This gives me deep empathy for engineering constraints.
            I understand state management, API limitations, and performance trade-offs firsthand."
          </p>
        </div>

        <div className="tip-box">
          <p className="tip-label">For Jenn specifically</p>
          <p className="tip-text">
            She's deeply technical (AWS certified, former software engineer). She'll appreciate that you
            can talk about React, design tokens, and component architecture. Don't hide your technical skills.
          </p>
        </div>
      </div>

      {/* Area 5 */}
      <div className="interview-card">
        <h2 className="interview-card-title">AI Agents & Automation</h2>
        <p className="interview-card-subtitle">Copilots, Human-in-the-Loop, Trust Patterns</p>

        <div className="story-box">
          <p className="story-label">Your Story: Avala AI</p>
          <p className="story-text">
            "I design <strong>human-in-the-loop workflows</strong> where annotators review, correct, and validate ML predictions.
            This requires designing for uncertainty - showing confidence scores, highlighting areas where
            the model is less certain, and making it easy to correct predictions without breaking flow."
          </p>
        </div>

        <div className="story-box">
          <p className="story-label">Trust & Transparency Patterns</p>
          <p className="story-text">
            "Progressive disclosure of AI reasoning, clear visual differentiation between AI-generated and
            human-verified content, undo/override controls that feel empowering not punitive, and feedback
            loops where annotator corrections improve future predictions."
          </p>
        </div>
      </div>

      {/* Area 6 */}
      <div className="interview-card">
        <h2 className="interview-card-title">Enterprise Internal Tools & B2B</h2>

        <ul className="interview-list">
          <li><span className="list-bullet" /><strong>Avala internal tools:</strong> Admin dashboards, customer management, annotator LMS</li>
          <li><span className="list-bullet" /><strong>Tesla advisor app:</strong> Native iOS/Android app for in-store employees scheduling test drives</li>
          <li><span className="list-bullet" /><strong>Tesla Energy Installers app:</strong> Tracking Powerwall installation arrivals</li>
          <li><span className="list-bullet" /><strong>Accurate Background:</strong> QA tools, compliance workflows for internal reviewers</li>
        </ul>

        <div className="tip-box">
          <p className="tip-label">B2B Mindset</p>
          <p className="tip-text">
            "Internal tools aren't simpler than consumer products - they're harder. Users can't just leave if the UX is bad.
            I focus on reducing cognitive load for repetitive tasks, building muscle memory through consistent patterns,
            and designing for 8-hour workdays where eye strain and fatigue are real concerns."
          </p>
        </div>
      </div>

      {/* Area 7 */}
      <div className="interview-card">
        <h2 className="interview-card-title">Design Systems</h2>

        <div className="story-box">
          <p className="story-label">Your Experience</p>
          <p className="story-text">
            "At Tesla, I added component guidelines and documentation to the Tesla Design System in Figma across
            web and native platforms. At Avala, I <strong>built the design system from scratch</strong> - component library
            in Figma plus production React components and design tokens that I ship myself."
          </p>
        </div>
      </div>
    </>
  )
}

function BehavioralTab() {
  return (
    <>
      <div className="question-card">
        <p className="question-text">"Tell me about a time you designed for ambiguity"</p>
        <p className="question-answer">
          <strong>Use: INDI EV</strong> - 0→1 HMI design for a vehicle that didn't exist yet.
          No existing patterns for this new EV startup. Had to define interaction paradigms from scratch,
          delivered high-fidelity prototype for LA Auto Show debut under tight deadline.
        </p>
      </div>

      <div className="question-card">
        <p className="question-text">"How do you handle disagreements with engineering?"</p>
        <p className="question-answer">
          <strong>Use: Tesla overseas teams</strong> - When engineers pushed back on a design, I'd schedule a call
          to understand constraints, then return with 2-3 alternatives that achieved the UX goal within
          technical limitations. Being able to speak their language (understanding React, state management)
          helped earn trust.
        </p>
      </div>

      <div className="question-card">
        <p className="question-text">"How do you prioritize when everything is urgent?"</p>
        <p className="question-answer">
          <strong>Use: Avala</strong> - Sole designer supporting 5 products and 5 user types.
          I work with leadership to tie design work to business impact metrics.
          I'm ruthless about scope - MVP first, iterate based on data.
          I also automate what I can (design tokens, component libraries) so I can move faster on novel problems.
        </p>
      </div>

      <div className="question-card">
        <p className="question-text">"Describe a project where you had to balance user needs with business constraints"</p>
        <p className="question-answer">
          <strong>Use: Tesla Chatbot</strong> - Had to balance user desire for immediate human support
          with business need to reduce support ticket volume. Solution: designed confidence-based routing
          that only escalated to humans when the model was uncertain, plus clear affordances so users
          never felt trapped.
        </p>
      </div>

      <div className="question-card">
        <p className="question-text">"How do you stay current with design trends and emerging tech?"</p>
        <p className="question-answer">
          <strong>Use: Your actual practice</strong> - Building with Claude Code daily, experimenting with AI tools
          in your workflow, shipping production code, maintaining a portfolio that demonstrates current best practices.
          Jenn values "Learn. Do. Teach." - show you embody this.
        </p>
      </div>
    </>
  )
}

function QuestionsTab() {
  return (
    <>
      <div className="ask-card">
        <p className="ask-question">"What does the AI-enabled workflow portfolio look like today?"</p>
        <p className="ask-why">Shows you're thinking about the full ecosystem, not just one product.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"How does the UX team collaborate with the AI/ML teams here?"</p>
        <p className="ask-why">Signals you understand the unique cross-functional dynamics of AI products.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"What's the biggest UX challenge you're trying to solve right now?"</p>
        <p className="ask-why">Gets her talking about pain points you could potentially solve.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"I saw your blog on spatial technologies - is there intersection with this role?"</p>
        <p className="ask-why">Shows you did your research, connects to her passion, opens conversation.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"What does success look like for this role in the first 6 months?"</p>
        <p className="ask-why">Shows you're thinking about impact and outcomes.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"How do you approach innovation here - dedicated R&D time, hackathons?"</p>
        <p className="ask-why">Connects to her background leading innovation at Audible (she ran hackathons).</p>
      </div>
    </>
  )
}

function TipsTab() {
  return (
    <div className="tips-grid">
      <div className="tip-card">
        <p className="tip-card-title">Show, don't just tell</p>
        <p className="tip-card-text">Have your portfolio ready to screenshare specific examples. She values "experiential" demos.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Be technical</p>
        <p className="tip-card-text">Jenn is an engineer. She'll respect that you ship code. Don't hide your React/design tokens knowledge.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Demonstrate systems thinking</p>
        <p className="tip-card-text">Connect individual designs to broader product ecosystem. Show how pieces fit together.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Show learning agility</p>
        <p className="tip-card-text">She values "Learn. Do. Teach." Mention how you stay current and share knowledge.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Be specific with metrics</p>
        <p className="tip-card-text">"120% conversion increase" is memorable. Quantify your impact wherever possible.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Acknowledge constraints</p>
        <p className="tip-card-text">She values "fully understand problems before acting." Show you think about tradeoffs.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Show enthusiasm for AI</p>
        <p className="tip-card-text">This is an AI-focused role. Genuine interest and hands-on experience matters.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Connect to her values</p>
        <p className="tip-card-text">"Lead by demonstrating excellence" - talk about shipping real work, not just concepts.</p>
      </div>
    </div>
  )
}
