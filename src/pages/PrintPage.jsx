/**
 * Combined Print Page
 * Resume and Cover Letter with template support
 * Access at /print?tab=resume|cover-letter&template=default|doordash&format=visual|ats
 */

import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useSearchParams } from 'react-router-dom'
import {
  PrintNavigation,
  PrintBottomBar,
  ResumeContent,
  CoverLetterContent,
} from '../components/print'
import InterviewNotesPanel from '../components/print/InterviewNotesPanel'
import { getTemplate } from '../styles/printTemplates'
import { getCoverLetter } from '../data/coverLetterData'
import { Button } from '../components/ui/Button'

// Simple password protection - change this to your desired password
const PRINT_PASSWORD = 'behappy333'

export default function PrintPage() {
  const { isDark } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('printPageAuth') === 'true'
  })
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [isNotesOpen, setIsNotesOpen] = useState(false)
  const [mobileScale, setMobileScale] = useState(1)

  // Calculate scale for mobile to fit content in viewport
  useEffect(() => {
    const calculateScale = () => {
      if (window.innerWidth <= 768) {
        const contentWidth = 816 // 8.5in in pixels at 96dpi
        const availableWidth = window.innerWidth - 24 // viewport minus padding
        const scale = Math.min(availableWidth / contentWidth, 1)
        setMobileScale(scale)
      } else {
        setMobileScale(1)
      }
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [])

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordInput === PRINT_PASSWORD) {
      sessionStorage.setItem('printPageAuth', 'true')
      setIsAuthenticated(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  // Read state from URL
  const activeTab = searchParams.get('tab') || 'resume'
  const activeTemplate = searchParams.get('template') || 'default'
  const activeFormat = searchParams.get('format') || 'visual'

  // Get template configuration
  const template = getTemplate(activeTemplate)

  // Load saved cover letter from localStorage or use default
  const loadCoverLetter = (templateId) => {
    const saved = localStorage.getItem(`coverLetter_${templateId}`)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return getCoverLetter(templateId)
      }
    }
    return getCoverLetter(templateId)
  }

  // Cover letter content state
  const [coverLetterContent, setCoverLetterContent] = useState(() =>
    loadCoverLetter(activeTemplate)
  )

  // Track if user has unsaved edits
  const [hasEdits, setHasEdits] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  // Update cover letter when template changes
  useEffect(() => {
    setCoverLetterContent(loadCoverLetter(activeTemplate))
    setHasEdits(false)
    // Check if this template has been saved before
    const saved = localStorage.getItem(`coverLetter_${activeTemplate}`)
    setLastSaved(saved ? 'Loaded saved version' : null)
  }, [activeTemplate])

  // Save cover letter to localStorage
  const handleSave = useCallback(() => {
    localStorage.setItem(`coverLetter_${activeTemplate}`, JSON.stringify(coverLetterContent))
    setHasEdits(false)
    setLastSaved('Saved!')
    setTimeout(() => setLastSaved(null), 2000)
  }, [activeTemplate, coverLetterContent])

  // Reset cover letter to default (clear localStorage)
  const handleReset = useCallback(() => {
    const confirmed = window.confirm('Reset to default? This will discard your edits.')
    if (!confirmed) return
    localStorage.removeItem(`coverLetter_${activeTemplate}`)
    setCoverLetterContent(getCoverLetter(activeTemplate))
    setHasEdits(false)
    setLastSaved('Reset to default')
    setTimeout(() => setLastSaved(null), 2000)
  }, [activeTemplate])

  // Handle tab change
  const handleTabChange = useCallback((tab) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('tab', tab)
      return newParams
    })
  }, [setSearchParams])

  // Handle template change
  const handleTemplateChange = useCallback((templateId) => {
    if (hasEdits && activeTab === 'cover-letter') {
      const confirmed = window.confirm(
        'You have unsaved changes. Switch template anyway?'
      )
      if (!confirmed) return
    }
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('template', templateId)
      return newParams
    })
  }, [setSearchParams, hasEdits, activeTab])

  // Handle format change
  const handleFormatChange = useCallback((formatId) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)
      newParams.set('format', formatId)
      return newParams
    })
  }, [setSearchParams])

  // Handle cover letter content changes
  const handleContentChange = useCallback((newContent) => {
    setCoverLetterContent(newContent)
    setHasEdits(true)
  }, [])

  // Handle PDF download
  const handleDownloadPDF = useCallback(() => {
    window.print()
  }, [])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasEdits) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasEdits])

  // Password screen
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex flex-col ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}>
        <style>{`
          * { cursor: auto !important; }
          input, textarea { cursor: text !important; }
          button, a, [role="button"] { cursor: pointer !important; }
        `}</style>
        {/* Top Navigation */}
        <PrintNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          activeTemplate={activeTemplate}
          isNotesOpen={false}
          onToggleNotes={() => {}}
        />

        {/* Password Form */}
        <div className="flex-1 flex items-center justify-center pt-[60px]">
          <form
            onSubmit={handlePasswordSubmit}
            className={`p-10 rounded-2xl text-center max-w-[400px] w-full mx-4 ${
              isDark
                ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/[0.08]'
                : 'bg-white/90 backdrop-blur-xl shadow-2xl'
            }`}
          >
            <h2 className={`font-satoshi text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Password Required
            </h2>
            <p className={`font-satoshi text-base mb-6 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              This content is private
            </p>
            <input
              type="password"
              className={`w-full h-12 px-4 rounded-lg font-satoshi text-base outline-none transition-colors ${
                isDark
                  ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/40 focus:border-white/20 caret-white'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 caret-gray-900'
              } ${passwordError ? (isDark ? '!border-[#c45c5c]' : '!border-[#d46a6a]') : ''}`}
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value)
                if (passwordError) setPasswordError(false)
              }}
              autoFocus
            />
            {passwordError && (
              <p className={`mt-1.5 mb-3 font-mono text-[10px] tracking-wide ${isDark ? 'text-[#c45c5c]' : 'text-[#d46a6a]'}`}>
                Incorrect password
              </p>
            )}
            <Button type="submit" variant="primary" className={`w-full h-12 ${!passwordError ? 'mt-3' : ''}`}>
              Continue
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="print-page">
      <style>{`
        @page {
          size: letter;
          margin: 0.25in 0.35in 0.3in 0.35in;
        }

        @media print {
          @page {
            size: letter;
            margin: 0.25in 0.35in 0.3in 0.35in;
          }

          /* Reset everything */
          *, *::before, *::after {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            overflow: visible !important;
          }

          /* Hide EVERYTHING first */
          body > * {
            display: none !important;
          }

          /* Then show only the print page */
          body > #root,
          body > div:first-child {
            display: block !important;
          }

          .no-print,
          .print-navigation,
          .print-bottom-bar,
          .interview-panel,
          nav,
          [class*="Navigation"],
          [class*="BottomBar"],
          [class*="NotesPanel"] {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            visibility: hidden !important;
            position: absolute !important;
            left: -9999px !important;
          }

          .print-page,
          .print-layout,
          .print-content-wrapper {
            display: block !important;
            position: static !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: visible !important;
            flex: none !important;
          }

          .print-content {
            display: block !important;
            position: static !important;
            width: 100% !important;
            min-width: 0 !important;
            max-width: none !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: visible !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            flex: none !important;
            transform: none !important;
          }

          .print-resume,
          .ats-resume {
            width: 100% !important;
            max-width: none !important;
          }
        }

        * {
          cursor: auto !important;
        }

        input, textarea {
          cursor: text !important;
        }

        button, a, [role="button"] {
          cursor: pointer !important;
        }

        .print-page {
          height: 100vh;
          background: #f5f5f5;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .print-layout {
          display: flex;
          flex: 1;
          margin-top: 60px;
          margin-bottom: 60px;
          overflow: hidden;
        }

        .print-content-wrapper {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px 20px;
        }

        .print-content {
          width: 8.5in;
          min-width: 8.5in;
          padding: 0.25in 0.35in 0.3in 0.35in;
          background: white;
          flex-shrink: 0;
        }

        @media screen {
          .print-content {
            min-height: 11in;
            box-shadow: 0 4px 40px rgba(0,0,0,0.1);
            border-radius: 4px;
            margin-bottom: 40px;
          }
        }

        @media screen and (max-width: 768px) {
          .print-content-wrapper {
            padding: 12px;
            overflow: auto;
            touch-action: manipulation;
            -webkit-overflow-scrolling: touch;
            justify-content: flex-start;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .print-content-wrapper::-webkit-scrollbar {
            display: none;
          }

          .print-content {
            transform-origin: top left;
          }
        }

        .no-print {
          display: block;
        }
      `}</style>

      {/* Top Navigation */}
      <PrintNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        activeTemplate={activeTemplate}
        isNotesOpen={isNotesOpen}
        onToggleNotes={() => setIsNotesOpen(!isNotesOpen)}
      />

      {/* Main Content Area with optional Notes Panel */}
      <div className="print-layout">
        {/* Content Area */}
        <div className="print-content-wrapper">
          <div
            className="print-content"
            style={mobileScale < 1 ? {
              transform: `scale(${mobileScale})`,
              marginBottom: `calc(-11in * (1 - ${mobileScale}))`
            } : undefined}
          >
            {activeTab === 'resume' ? (
              <ResumeContent template={template} format={activeFormat} />
            ) : (
              <CoverLetterContent
                template={template}
                content={coverLetterContent}
                onContentChange={handleContentChange}
              />
            )}
          </div>
        </div>

        {/* Interview Notes Panel */}
        <InterviewNotesPanel
          isOpen={isNotesOpen}
          onClose={() => setIsNotesOpen(false)}
        />
      </div>

      {/* Bottom Bar */}
      <PrintBottomBar
        activeTemplate={activeTemplate}
        onTemplateChange={handleTemplateChange}
        activeFormat={activeFormat}
        onFormatChange={handleFormatChange}
        onDownload={handleDownloadPDF}
        onSave={handleSave}
        onReset={handleReset}
        hasEdits={hasEdits}
        lastSaved={lastSaved}
        showSave={activeTab === 'cover-letter'}
        showFormat={activeTab === 'resume'}
      />
    </div>
  )
}
