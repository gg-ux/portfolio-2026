/**
 * Combined Print Page
 * Resume and Cover Letter with template support
 * Access at /print?tab=resume|cover-letter&template=default|doordash&format=visual|ats
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  PrintNavigation,
  PrintBottomBar,
  ResumeContent,
  CoverLetterContent,
} from '../components/print'
import { getTemplate } from '../styles/printTemplates'
import { getCoverLetter } from '../data/coverLetterData'
import { Button } from '../components/ui/Button'

// Simple password protection - change this to your desired password
const PRINT_PASSWORD = 'behappy333'

export default function PrintPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('printPageAuth') === 'true'
  })
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)

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
      <div className="password-screen">
        <style>{`
          .password-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f5f5;
            font-family: 'Satoshi', -apple-system, sans-serif;
            cursor: default !important;
            isolation: isolate;
            position: relative;
            z-index: 10000;
          }
          .password-screen * {
            cursor: auto !important;
            pointer-events: auto !important;
          }
          .password-screen input {
            cursor: text !important;
            pointer-events: auto !important;
            -webkit-user-select: text !important;
            user-select: text !important;
          }
          .password-screen button {
            cursor: pointer !important;
            pointer-events: auto !important;
          }
          .password-box {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 320px;
            width: 100%;
            position: relative;
            z-index: 9999;
          }
          .password-box h2 {
            font-family: 'Silk Serif', serif;
            font-size: 24px;
            font-weight: 400;
            margin: 0 0 8px 0;
            color: #111;
          }
          .password-box p {
            font-size: 14px;
            color: #666;
            margin: 0 0 24px 0;
          }
          .password-input {
            width: 100%;
            padding: 12px 16px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 12px;
            box-sizing: border-box;
            font-family: inherit;
            background: white;
            color: #1a1a1a;
            -webkit-appearance: none;
            appearance: none;
          }
          .password-input:focus {
            outline: none;
            border-color: #5B21B6;
          }
          .password-input::placeholder {
            color: #999;
          }
          .password-input.error {
            border-color: #e53e3e;
          }
          .password-submit {
            width: 100%;
          }
          .password-error {
            color: #e53e3e;
            font-size: 13px;
            margin-top: 12px;
          }
        `}</style>
        <form className="password-box" onSubmit={handlePasswordSubmit}>
          <h2>Print Tools</h2>
          <p>Enter password to access</p>
          <input
            type="password"
            className={`password-input ${passwordError ? 'error' : ''}`}
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoFocus
          />
          <div className="password-submit">
            <Button type="submit" variant="primary" className="w-full !bg-gray-900 !text-white hover:!bg-gray-800">
              Enter
            </Button>
          </div>
          {passwordError && (
            <p className="password-error">Incorrect password</p>
          )}
        </form>
      </div>
    )
  }

  return (
    <div className="print-page">
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
          .no-print {
            display: none !important;
          }
          .print-page {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
          .print-content {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            min-height: auto !important;
            aspect-ratio: auto !important;
          }
        }

        * {
          cursor: auto !important;
        }

        .print-page {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .print-content {
          width: 8.5in;
          margin: 0 auto;
          padding: 0.4in 0.5in;
          background: white;
        }

        @media screen {
          .print-content {
            min-height: 11in;
            margin: 100px auto;
            box-shadow: 0 4px 40px rgba(0,0,0,0.1);
            border-radius: 4px;
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
      />

      {/* Content Area */}
      <div className="print-content">
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
