/**
 * Interview Notes Panel - Disney Senior UX Designer
 * Figma-style side panel with tabbed navigation
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

  // Lock body scroll when panel is open
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

  return (
    <>
      <style>{`
        /* Overlay */
        .interview-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .interview-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* Side Panel */
        .interview-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 420px;
          max-width: 100vw;
          background: #FAF8F4;
          z-index: 2000;
          display: flex;
          flex-direction: column;
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .interview-panel.open {
          transform: translateX(0);
        }

        @media (max-width: 480px) {
          .interview-panel {
            width: 100vw;
          }
        }

        /* Override any dark scrollbar styles */
        .interview-panel,
        .interview-panel * {
          scrollbar-color: #ccc #FAF8F4;
        }

        /* Header */
        .interview-header {
          padding: 20px 24px 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          background: #FAF8F4;
          flex-shrink: 0;
        }

        .interview-header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .interview-title {
          font-family: 'Silk Serif', serif;
          font-size: 22px;
          font-weight: 400;
          color: #1A1A1A;
          margin: 0;
        }

        .interview-subtitle {
          font-family: 'Azeret Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #5835B0;
          margin-top: 4px;
        }

        .interview-close {
          padding: 8px;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: #6B6B6B;
          transition: all 0.2s;
          margin: -4px -4px 0 0;
        }

        .interview-close:hover {
          background: rgba(0,0,0,0.05);
          color: #1A1A1A;
        }

        /* Tabs - horizontal scroll */
        .interview-tabs {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          padding-bottom: 0;
          margin: 0 -8px;
          padding: 0 8px;
          -webkit-overflow-scrolling: touch;
        }

        .interview-tabs::-webkit-scrollbar {
          display: none;
        }

        .interview-tab {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 12px;
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
          padding: 24px;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }

        /* Light scrollbar */
        .interview-panel ::-webkit-scrollbar {
          width: 6px;
        }

        .interview-panel ::-webkit-scrollbar-track {
          background: #FAF8F4;
        }

        .interview-panel ::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 3px;
        }

        .interview-panel ::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }

        /* Cards */
        .interview-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .interview-card:last-child {
          margin-bottom: 0;
        }

        .interview-card-title {
          font-family: 'Satoshi', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #1A1A1A;
          margin: 0 0 4px 0;
        }

        .interview-card-subtitle {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          color: #6B6B6B;
          margin: 0 0 16px 0;
        }

        /* Story highlight box */
        .story-box {
          background: linear-gradient(135deg, rgba(88, 53, 176, 0.06) 0%, rgba(88, 53, 176, 0.02) 100%);
          border-left: 3px solid #5835B0;
          border-radius: 0 10px 10px 0;
          padding: 16px 18px;
          margin-bottom: 14px;
        }

        .story-box:last-child {
          margin-bottom: 0;
        }

        .story-label {
          font-family: 'Azeret Mono', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #5835B0;
          margin-bottom: 6px;
        }

        .story-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
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
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 16px;
          margin-top: 10px;
        }

        /* Tip box */
        .tip-box {
          background: rgba(88, 53, 176, 0.08);
          border-radius: 10px;
          padding: 16px 18px;
          margin-top: 16px;
        }

        .tip-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #5835B0;
          margin-bottom: 6px;
        }

        .tip-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          line-height: 1.5;
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
          font-size: 14px;
          line-height: 1.5;
          color: #1A1A1A;
          padding: 10px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .interview-list li:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .interview-list li:first-child {
          padding-top: 0;
        }

        .list-bullet {
          width: 5px;
          height: 5px;
          background: #5835B0;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }

        /* Section within card */
        .card-section {
          margin-bottom: 18px;
        }

        .card-section:last-child {
          margin-bottom: 0;
        }

        .card-section-title {
          font-family: 'Satoshi', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #5835B0;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-section-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #4A4A4A;
        }

        /* Question card */
        .question-card {
          background: white;
          border-radius: 12px;
          padding: 18px 20px;
          margin-bottom: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .question-card:last-child {
          margin-bottom: 0;
        }

        .question-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #1A1A1A;
          margin: 0 0 10px 0;
        }

        .question-answer {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #4A4A4A;
        }

        .question-answer strong {
          color: #5835B0;
          font-weight: 600;
        }

        /* Ask question card */
        .ask-card {
          background: white;
          border-radius: 12px;
          padding: 16px 18px;
          margin-bottom: 10px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ask-card:last-child {
          margin-bottom: 0;
        }

        .ask-question {
          font-family: 'Satoshi', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #1A1A1A;
        }

        .ask-why {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          color: #6B6B6B;
        }

        /* Tips grid - single column in panel */
        .tips-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tip-card {
          background: white;
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .tip-card-title {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 6px;
        }

        .tip-card-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          line-height: 1.5;
          color: #4A4A4A;
        }

        /* Value tag */
        .value-tag {
          display: inline-block;
          font-family: 'Satoshi', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #5835B0;
          background: rgba(88, 53, 176, 0.1);
          padding: 3px 8px;
          border-radius: 5px;
          margin-right: 6px;
          margin-bottom: 6px;
        }
      `}</style>

      {/* Overlay */}
      <div
        className={`interview-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className={`interview-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="interview-header">
          <div className="interview-header-top">
            <div>
              <h1 className="interview-title">Interview Prep</h1>
              <p className="interview-subtitle">Disney - Senior UX Designer</p>
            </div>
            <button className="interview-close" onClick={onClose}>
              <X size={20} />
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
    </>
  )
}

function InterviewerTab() {
  return (
    <>
      <div className="interview-card">
        <h2 className="interview-card-title">Jenn Lee</h2>
        <p className="interview-card-subtitle">Director, R&D Emerging Technologies @ Disney</p>

        <div className="card-section">
          <p className="card-section-title">Background</p>
          <p className="card-section-text">
            Software Engineering Leader with 20+ years experience. Ex-Amazon/Audible (7 years as Sr Director).
            MBA in IT/Finance, AWS Certified Architect.
          </p>
        </div>

        <div className="card-section">
          <p className="card-section-title">What She's Passionate About</p>
          <ul className="interview-list">
            <li><span className="list-bullet" />Spatial technologies (Vision Pro, Quest, photogrammetry)</li>
            <li><span className="list-bullet" />Innovation & emerging tech R&D</li>
            <li><span className="list-bullet" />Building and mentoring high-performing teams</li>
            <li><span className="list-bullet" />Continuous learning - "Learn. Do. Teach."</li>
          </ul>
        </div>
      </div>

      <div className="interview-card">
        <h2 className="interview-card-title">Her Core Values</h2>

        <div style={{ marginBottom: '12px' }}>
          <span className="value-tag">"Lead by demonstrating excellence"</span>
          <span className="value-tag">"Fully understand problems before acting"</span>
          <span className="value-tag">"Plan. Do. Reflect."</span>
          <span className="value-tag">"Dare to innovate"</span>
        </div>

        <p className="card-section-text">
          She ships, not just talks. Research-driven. Iterative approach.
        </p>
      </div>

      <div className="interview-card">
        <h2 className="interview-card-title">Connection Points</h2>

        <ul className="interview-list">
          <li><span className="list-bullet" />Both work at intersection of emerging tech + practical application</li>
          <li><span className="list-bullet" />Both value shipping real products over just concepts</li>
          <li><span className="list-bullet" />She'll appreciate your hands-on code skills</li>
          <li><span className="list-bullet" />She values "experiential" demos - your portfolio matters</li>
        </ul>
      </div>
    </>
  )
}

function TalkingPointsTab() {
  return (
    <>
      <div className="interview-card">
        <h2 className="interview-card-title">Leading UX Across Complex Systems</h2>

        <div className="story-box">
          <p className="story-label">Your Story: Avala AI</p>
          <p className="story-text">
            "As the sole designer at Avala AI, I lead all design across <strong>five interconnected products</strong>:
            data annotation platform, native mobile app, marketing site, admin tools, and LMS."
          </p>
        </div>

        <div className="story-box">
          <p className="story-label">Systems Complexity</p>
          <p className="story-text">
            "I design for <strong>five distinct user types</strong> - annotators, customers, admins, investors,
            and the public - each with different mental models."
          </p>
        </div>
      </div>

      <div className="interview-card">
        <h2 className="interview-card-title">End-to-End UX Ownership</h2>

        <div className="story-box">
          <p className="story-label">Your Story: Tesla AI Chatbot</p>
          <p className="story-text">
            "I led design from problem framing through launch. Analyzed support tickets, created journey maps,
            designed conversation flows, iterated through testing, worked with ML team on confidence thresholds."
          </p>
          <span className="metric-callout">120% increase in sales lead conversion</span>
        </div>
      </div>

      <div className="interview-card">
        <h2 className="interview-card-title">Partnering with Engineers</h2>

        <div className="story-box">
          <p className="story-label">Your Approach</p>
          <p className="story-text">
            "I don't hand off designs - I collaborate. At Avala, I <strong>ship production React components
            myself</strong> using Claude Code. I understand state management, API limitations, and performance trade-offs."
          </p>
        </div>

        <div className="tip-box">
          <p className="tip-label">For Jenn specifically</p>
          <p className="tip-text">
            She's deeply technical (AWS certified). She'll appreciate that you can talk about React and design tokens.
          </p>
        </div>
      </div>

      <div className="interview-card">
        <h2 className="interview-card-title">AI Agents & Automation</h2>

        <div className="story-box">
          <p className="story-label">Your Story: Avala AI</p>
          <p className="story-text">
            "I design <strong>human-in-the-loop workflows</strong> where annotators review and correct ML predictions.
            This requires designing for uncertainty - confidence scores, highlighting model uncertainty."
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
          No existing patterns, defined interaction paradigms from scratch.
        </p>
      </div>

      <div className="question-card">
        <p className="question-text">"How do you handle disagreements with engineering?"</p>
        <p className="question-answer">
          <strong>Use: Tesla overseas teams</strong> - Scheduled calls to understand constraints,
          returned with 2-3 alternatives. Speaking their language helped earn trust.
        </p>
      </div>

      <div className="question-card">
        <p className="question-text">"How do you prioritize when everything is urgent?"</p>
        <p className="question-answer">
          <strong>Use: Avala</strong> - Sole designer, 5 products, 5 user types.
          Tie work to business impact. MVP first, iterate based on data.
        </p>
      </div>

      <div className="question-card">
        <p className="question-text">"Balance user needs with business constraints?"</p>
        <p className="question-answer">
          <strong>Use: Tesla Chatbot</strong> - Balanced user desire for human support
          with need to reduce tickets. Confidence-based routing solution.
        </p>
      </div>

      <div className="question-card">
        <p className="question-text">"How do you stay current?"</p>
        <p className="question-answer">
          <strong>Your practice</strong> - Building with Claude Code daily, shipping production code,
          portfolio demonstrates current best practices. "Learn. Do. Teach."
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
        <p className="ask-why">Shows you're thinking about the full ecosystem.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"How does UX collaborate with AI/ML teams here?"</p>
        <p className="ask-why">Signals you understand AI product dynamics.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"What's the biggest UX challenge you're trying to solve?"</p>
        <p className="ask-why">Gets her talking about pain points you could solve.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"I saw your blog on spatial tech - is there intersection with this role?"</p>
        <p className="ask-why">Shows you did research, connects to her passion.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"What does success look like in the first 6 months?"</p>
        <p className="ask-why">Shows you're thinking about impact and outcomes.</p>
      </div>

      <div className="ask-card">
        <p className="ask-question">"How do you approach innovation - R&D time, hackathons?"</p>
        <p className="ask-why">Connects to her background running hackathons at Audible.</p>
      </div>
    </>
  )
}

function TipsTab() {
  return (
    <div className="tips-grid">
      <div className="tip-card">
        <p className="tip-card-title">Show, don't just tell</p>
        <p className="tip-card-text">Have portfolio ready to screenshare. She values "experiential" demos.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Be technical</p>
        <p className="tip-card-text">Jenn is an engineer. Don't hide your React/design tokens knowledge.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Systems thinking</p>
        <p className="tip-card-text">Connect individual designs to broader ecosystem. Show how pieces fit together.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Show learning agility</p>
        <p className="tip-card-text">She values "Learn. Do. Teach." Mention how you stay current.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Be specific with metrics</p>
        <p className="tip-card-text">"120% conversion increase" is memorable. Quantify impact.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Acknowledge constraints</p>
        <p className="tip-card-text">Show you think about tradeoffs. "Fully understand problems before acting."</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Show AI enthusiasm</p>
        <p className="tip-card-text">This is an AI-focused role. Genuine interest matters.</p>
      </div>

      <div className="tip-card">
        <p className="tip-card-title">Connect to her values</p>
        <p className="tip-card-text">"Lead by demonstrating excellence" - talk about shipping real work.</p>
      </div>
    </div>
  )
}
