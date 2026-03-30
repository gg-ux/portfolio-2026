/**
 * Print Navigation Component
 * Top bar with logo and tab switcher
 */

import { Link } from 'react-router-dom'
import { Notepad } from '@phosphor-icons/react'

export default function PrintNavigation({ activeTab, onTabChange, activeTemplate, isNotesOpen, onToggleNotes }) {
  const showNotesButton = activeTemplate === 'disney-ai'

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

          .print-nav-right {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 100px;
            justify-content: flex-end;
          }

          .print-nav-notes-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: 'Satoshi', -apple-system, sans-serif;
            font-size: 13px;
            font-weight: 500;
            padding: 8px 14px;
            border: none;
            background: rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.9);
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .print-nav-notes-btn:hover {
            background: rgba(255,255,255,0.15);
            color: white;
          }

          .print-nav-notes-btn.active {
            background: rgba(37, 99, 235, 0.3);
            color: white;
          }

          .print-nav-notes-btn .btn-text {
            display: inline;
          }

          .print-nav-tab .mobile-text {
            display: none;
          }

          .print-nav-tab .desktop-text {
            display: inline;
          }

          @media (max-width: 768px) {
            .print-navigation {
              padding: 0 16px;
            }

            .print-nav-tab {
              padding: 8px 12px;
              font-size: 10px;
            }

            .print-nav-tab .mobile-text {
              display: inline;
            }

            .print-nav-tab .desktop-text {
              display: none;
            }

            .print-nav-notes-btn {
              padding: 8px;
              gap: 0;
            }

            .print-nav-notes-btn .btn-text {
              display: none;
            }

            .print-nav-right {
              min-width: auto;
            }
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
            <span className="desktop-text">Cover Letter</span>
            <span className="mobile-text">Cover</span>
          </button>
        </div>

        {/* Right side - Interview Notes button (only for disney-ai) */}
        <div className="print-nav-right">
          {showNotesButton && (
            <button
              className={`print-nav-notes-btn ${isNotesOpen ? 'active' : ''}`}
              onClick={onToggleNotes}
            >
              <Notepad size={18} />
              <span className="btn-text">Interview Notes</span>
            </button>
          )}
        </div>
      </nav>
  )
}
