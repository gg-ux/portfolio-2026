/**
 * Interview Notes Panel - Disney Senior UX Designer
 * Inline side panel that fits within the page layout
 */

import { useState } from 'react'
import { X } from '@phosphor-icons/react'

const TABS = [
  { id: 'presentation', label: 'Presentation' },
  { id: 'interviewer', label: 'Interviewer' },
  { id: 'talking-points', label: 'Talking Points' },
  { id: 'qa', label: 'Q&A Prep' },
  { id: 'tips', label: 'Tips' },
]

export default function InterviewNotesPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('presentation')

  return (
    <div className={`interview-panel ${isOpen ? 'open' : ''}`}>
      <style>{`
        .interview-panel {
          width: 0;
          min-width: 0;
          flex-shrink: 0;
          background: #FAF8F4;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 1px solid transparent;
        }

        .interview-panel.open {
          width: 380px;
          min-width: 380px;
          border-left-color: rgba(0,0,0,0.1);
        }

        @media (max-width: 1200px) {
          .interview-panel.open {
            width: 340px;
            min-width: 340px;
          }
        }

        @media (max-width: 768px) {
          .interview-panel.open {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            bottom: 60px;
            width: 100%;
            min-width: 100%;
            z-index: 100;
            border-left: none;
          }
        }

        /* Header */
        .ip-header {
          padding: 16px 20px 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          background: #FAF8F4;
          flex-shrink: 0;
        }

        .ip-header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .ip-title {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .ip-subtitle {
          font-family: 'Azeret Mono', monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #2563EB;
          margin-top: 2px;
        }

        .ip-close {
          padding: 6px;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          color: #999;
          transition: all 0.2s;
          margin: -2px -2px 0 0;
        }

        .ip-close:hover {
          background: rgba(0,0,0,0.05);
          color: #1a1a1a;
        }

        /* Tabs */
        .ip-tabs {
          display: flex;
          gap: 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .ip-tabs::-webkit-scrollbar {
          display: none;
        }

        .ip-tab {
          font-family: 'Satoshi', sans-serif;
          font-size: 12px;
          font-weight: 500;
          padding: 10px 12px;
          border: none;
          background: transparent;
          color: #888;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          white-space: nowrap;
          margin-bottom: -1px;
        }

        .ip-tab:hover {
          color: #555;
        }

        .ip-tab.active {
          color: #2563EB;
          border-bottom-color: #2563EB;
        }

        /* Content */
        .ip-content {
          padding: 16px 20px;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }

        .interview-panel ::-webkit-scrollbar {
          width: 4px;
        }

        .interview-panel ::-webkit-scrollbar-track {
          background: transparent;
        }

        .interview-panel ::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 2px;
        }

        /* Card */
        .ip-card {
          background: white;
          border-radius: 8px;
          padding: 14px 16px;
          margin-bottom: 10px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }

        .ip-card:last-child {
          margin-bottom: 0;
        }

        /* Typography - only 2 sizes */
        .ip-heading {
          font-family: 'Satoshi', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 2px 0;
        }

        .ip-subheading {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          color: #555;
          margin: 0 0 10px 0;
        }

        .ip-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #2563EB;
          margin-bottom: 4px;
        }

        .ip-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          line-height: 1.5;
          color: #555;
          margin: 0;
        }

        .ip-text strong {
          color: #2563EB;
          font-weight: 600;
        }

        /* List */
        .ip-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ip-list li {
          font-family: 'Satoshi', sans-serif;
          font-size: 13px;
          line-height: 1.5;
          color: #555;
          padding: 4px 0;
          padding-left: 12px;
          position: relative;
        }

        .ip-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 4px;
          height: 4px;
          background: #2563EB;
          border-radius: 50%;
        }

        /* Section spacing */
        .ip-section {
          margin-bottom: 12px;
        }

        .ip-section:last-child {
          margin-bottom: 0;
        }

        /* Highlight box */
        .ip-highlight {
          background: rgba(37, 99, 235, 0.05);
          border-radius: 6px;
          padding: 10px 12px;
          margin-bottom: 8px;
        }

        .ip-highlight:last-child {
          margin-bottom: 0;
        }

        /* Metric badge */
        .ip-badge {
          display: inline-block;
          background: #2563EB;
          color: white;
          font-family: 'Satoshi', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
          margin-top: 6px;
        }

        /* Value tags */
        .ip-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
        }

        .ip-tag {
          font-family: 'Satoshi', sans-serif;
          font-size: 12px;
          color: #2563EB;
          background: rgba(37, 99, 235, 0.08);
          padding: 3px 8px;
          border-radius: 4px;
        }

        /* Tip callout */
        .ip-tip {
          background: rgba(37, 99, 235, 0.05);
          border-radius: 6px;
          padding: 10px 12px;
          margin-top: 10px;
        }
      `}</style>

      {/* Header */}
      <div className="ip-header">
        <div className="ip-header-top">
          <div>
            <h1 className="ip-title">Interview Prep</h1>
            <p className="ip-subtitle">Disney - Senior UX</p>
          </div>
          <button className="ip-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="ip-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`ip-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="ip-content">
        {activeTab === 'presentation' && <PresentationTab />}
        {activeTab === 'interviewer' && <InterviewerTab />}
        {activeTab === 'talking-points' && <TalkingPointsTab />}
        {activeTab === 'qa' && <QATab />}
        {activeTab === 'tips' && <TipsTab />}
      </div>
    </div>
  )
}

function InterviewerTab() {
  return (
    <>
      <div className="ip-card">
        <h2 className="ip-heading">Jenn Lee</h2>
        <p className="ip-subheading">Director, R&D Emerging Tech @ Disney</p>

        <div className="ip-section">
          <p className="ip-label">Background</p>
          <p className="ip-text">
            20+ years exp. Ex-Amazon/Audible (7 yrs Sr Director). MBA, AWS Certified Architect.
          </p>
        </div>

        <div className="ip-section">
          <p className="ip-label">Passionate About</p>
          <ul className="ip-list">
            <li>Spatial tech (Vision Pro, Quest)</li>
            <li>Innovation & emerging tech R&D</li>
            <li>Building high-performing teams</li>
            <li>"Learn. Do. Teach."</li>
          </ul>
        </div>
      </div>

      <div className="ip-card">
        <h2 className="ip-heading">Her Values</h2>
        <div className="ip-tags">
          <span className="ip-tag">"Lead by excellence"</span>
          <span className="ip-tag">"Understand before acting"</span>
          <span className="ip-tag">"Dare to innovate"</span>
        </div>
        <p className="ip-text">Ships real work. Research-driven. Iterative.</p>
      </div>

      <div className="ip-card">
        <h2 className="ip-heading">Connection Points</h2>
        <ul className="ip-list">
          <li>Both: emerging tech + practical application</li>
          <li>Both value shipping over concepts</li>
          <li>She'll appreciate your code skills</li>
          <li>Values "experiential" demos</li>
        </ul>
      </div>
    </>
  )
}

function TalkingPointsTab() {
  return (
    <>
      <div className="ip-card">
        <h2 className="ip-heading">Complex Systems UX</h2>
        <div className="ip-highlight">
          <p className="ip-label">Avala AI</p>
          <p className="ip-text">
            Sole designer across <strong>5 products</strong>: annotation platform, mobile app, marketing, admin, LMS.
          </p>
        </div>
        <div className="ip-highlight">
          <p className="ip-label">Complexity</p>
          <p className="ip-text">
            <strong>5 user types</strong> with different mental models.
          </p>
        </div>
      </div>

      <div className="ip-card">
        <h2 className="ip-heading">End-to-End Ownership</h2>
        <div className="ip-highlight">
          <p className="ip-label">Tesla AI Chatbot</p>
          <p className="ip-text">
            Problem framing → launch. Analyzed tickets, journey maps, conversation flows, machine learning collaboration.
          </p>
          <span className="ip-badge">120% conversion increase</span>
        </div>
        <div className="ip-section" style={{ marginTop: '10px' }}>
          <p className="ip-label">How we measured 120%</p>
          <p className="ip-text">
            <strong>Method:</strong> A/B test over 4 weeks
          </p>
          <ul className="ip-list">
            <li><strong>Control (A):</strong> Existing flow — FAQ pages, forms, direct to human</li>
            <li><strong>Treatment (B):</strong> New AI chatbot as first touchpoint</li>
            <li><strong>Conversion event:</strong> User expresses purchase intent for vehicle or energy product</li>
            <li><strong>Results:</strong> Control ~12% → Treatment ~26% = 120% relative increase</li>
          </ul>
          <div className="ip-tip">
            <p className="ip-text">"Confidence-based routing meant high-confidence answers served instantly, low-confidence routed to humans. Faster resolution = less drop-off = higher conversion."</p>
          </div>
        </div>
      </div>

      <div className="ip-card">
        <h2 className="ip-heading">Engineering Partnership</h2>
        <p className="ip-text">
          <strong>Ship production React</strong> myself. Understand state, APIs, performance.
        </p>
        <div className="ip-tip">
          <p className="ip-label">For Jenn</p>
          <p className="ip-text">She's AWS certified. Talk React & design tokens.</p>
        </div>
      </div>
    </>
  )
}

function PresentationTab() {
  return (
    <>
      <div className="ip-card">
        <p className="ip-label">Impact Metrics Methodology</p>
        <p className="ip-text" style={{ fontStyle: 'italic' }}>How I gathered each metric</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">33% Productivity Increase</p>
        <p className="ip-text">
          <strong>Method:</strong> Internal productivity tracking system
        </p>
        <p className="ip-text" style={{ marginTop: '6px' }}>
          Annotators are paid per task, so we had granular throughput data. Compared cuboids/hour before and after: ~150 → ~200.
        </p>
        <div className="ip-tip">
          <p className="ip-text">"We already had robust productivity metrics in place for compensation purposes, giving us a reliable baseline."</p>
        </div>
      </div>

      <div className="ip-card">
        <p className="ip-heading">6x Faster Ground Alignment</p>
        <p className="ip-text">
          <strong>Method:</strong> User testing with benchmark comparison
        </p>
        <p className="ip-text" style={{ marginTop: '6px' }}>
          Timed tasks during initial shadow sessions (~3 min). Re-tested after shipping snap-to-ground (~30 sec).
        </p>
        <div className="ip-tip">
          <p className="ip-text">"I established benchmarks during discovery research, which let me quantify improvements in usability testing."</p>
        </div>
      </div>

      <div className="ip-card">
        <p className="ip-heading">SUS 52 → 78</p>
        <p className="ip-text">
          <strong>Method:</strong> Standardized survey, administered twice
        </p>
        <p className="ip-text" style={{ marginTop: '6px' }}>
          Baseline SUS during research. Re-administered after 1 week of usage with redesigned tool.
        </p>
        <div className="ip-tip">
          <p className="ip-text">"Using a standardized instrument gave us a credible, comparable metric stakeholders understood."</p>
        </div>
      </div>

      <div className="ip-card">
        <p className="ip-heading">Higher Accuracy</p>
        <p className="ip-text">
          <strong>Method:</strong> QA review correction tracking
        </p>
        <p className="ip-text" style={{ marginTop: '6px' }}>
          Our QA pipeline tracks reviewer corrections per annotator. After redesign, fewer interventions needed.
        </p>
        <div className="ip-tip">
          <p className="ip-text">"The existing QA infrastructure gave us a built-in way to measure accuracy without additional instrumentation."</p>
        </div>
      </div>

      <div className="ip-card">
        <p className="ip-label">Key Talking Points</p>
        <ul className="ip-list">
          <li><strong>Leveraged existing systems</strong> — productivity tracking + QA metrics already in place</li>
          <li><strong>Established baselines early</strong> — shadow sessions + initial surveys gave benchmarks</li>
          <li><strong>Mixed methods</strong> — quantitative (throughput, SUS) + qualitative feedback</li>
          <li><strong>Real-world validation</strong> — production usage, not just controlled tests</li>
        </ul>
      </div>
    </>
  )
}

function QATab() {
  return (
    <>
      <div className="ip-card">
        <p className="ip-label">They May Ask</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"Designed for ambiguity?"</p>
        <p className="ip-text"><strong>INDI EV</strong> — 0→1 HMI, no existing patterns. Started with driver mental models, not competitor analysis.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"Engineering disagreements?"</p>
        <p className="ip-text"><strong>Tesla overseas</strong> — Scheduled calls to understand constraints, returned with alternative solutions that respected their reality.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"Prioritize when urgent?"</p>
        <p className="ip-text"><strong>Avala</strong> — Tie to business impact. MVP first, polish later. Shipped imperfect but useful over perfect but late.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"User vs business needs?"</p>
        <p className="ip-text"><strong>Tesla Chatbot</strong> — Found the "and": confidence-based routing served users AND reduced costs.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"Staying current?"</p>
        <p className="ip-text">Claude Code daily, shipping production code. "Learn. Do. Teach." — just like her philosophy.</p>
      </div>

      <div className="ip-card">
        <p className="ip-label" style={{ marginTop: '16px' }}>Ask Her</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"What's the AI/UX workflow today?"</p>
        <p className="ip-text">Shows ecosystem thinking—where would you fit in?</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"How do UX and machine learning teams collaborate?"</p>
        <p className="ip-text">Understand the AI product dynamics at Disney.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"Biggest UX challenge right now?"</p>
        <p className="ip-text">Pain points you could solve—shows initiative.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"How does spatial tech intersect?"</p>
        <p className="ip-text">Shows you researched her; her passion area.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">"Success in first 6 months?"</p>
        <p className="ip-text">Impact-focused question she'll respect.</p>
      </div>
    </>
  )
}

function TipsTab() {
  return (
    <>
      <div className="ip-card">
        <p className="ip-heading">Show, don't tell</p>
        <p className="ip-text">Portfolio ready. "Experiential" demos.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">Be technical</p>
        <p className="ip-text">She's an engineer. Show React knowledge.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">Systems thinking</p>
        <p className="ip-text">Connect designs to ecosystem.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">Metrics</p>
        <p className="ip-text">"120% conversion" is memorable.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">Constraints</p>
        <p className="ip-text">Show tradeoff thinking.</p>
      </div>

      <div className="ip-card">
        <p className="ip-heading">AI enthusiasm</p>
        <p className="ip-text">Genuine interest matters.</p>
      </div>
    </>
  )
}
