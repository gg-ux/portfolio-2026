/**
 * Print Navigation Component
 * Top bar with logo and tab switcher
 */

import { Link } from 'react-router-dom'

export default function PrintNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="print-navigation no-print">
      <style>{`
        .print-navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 1000;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .print-nav-logo {
          display: flex;
          align-items: center;
        }

        .print-nav-logo img {
          height: 20px;
          width: auto;
          filter: invert(1);
          transition: transform 0.3s ease;
        }

        .print-nav-logo:hover img {
          transform: scale(1.1);
        }

        .print-nav-tabs {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
          background: rgba(255,255,255,0.05);
          padding: 4px;
          border-radius: 8px;
        }

        .print-nav-tab {
          font-family: 'Azeret Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .print-nav-tab:hover {
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
        }

        .print-nav-tab.active {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .print-nav-spacer {
          width: 100px;
        }
      `}</style>

      {/* Logo - links to home */}
      <Link to="/" className="print-nav-logo">
        <img src="/assets/branding/logo.svg" alt="Grace Guo" />
      </Link>

      {/* Tab Switcher */}
      <div className="print-nav-tabs">
        <button
          className={`print-nav-tab ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => onTabChange('resume')}
        >
          Resume
        </button>
        <button
          className={`print-nav-tab ${activeTab === 'cover-letter' ? 'active' : ''}`}
          onClick={() => onTabChange('cover-letter')}
        >
          Cover Letter
        </button>
      </div>

      {/* Spacer for balance */}
      <div className="print-nav-spacer" />
    </nav>
  )
}
