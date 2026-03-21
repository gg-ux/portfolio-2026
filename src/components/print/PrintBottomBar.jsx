/**
 * Print Bottom Bar Component
 * Template dropdown and download button
 */

import { getTemplateList } from '../../styles/printTemplates'

export default function PrintBottomBar({
  activeTemplate,
  onTemplateChange,
  activeFormat,
  onFormatChange,
  onDownload,
  onSave,
  onReset,
  hasEdits,
  lastSaved,
  showSave,
  showFormat
}) {
  const templates = getTemplateList()
  const formats = [
    { id: 'visual', name: 'Visual' },
    { id: 'ats', name: 'ATS-Friendly' },
  ]

  return (
    <div className="print-bottom-bar no-print">
      <style>{`
        .print-bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 1000;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .print-bottom-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .template-label {
          font-family: 'Azeret Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.5);
        }

        .template-select {
          font-family: 'Satoshi', -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 32px 8px 12px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          color: white;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23fff' fill-opacity='0.5' d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: all 0.2s ease;
        }

        .template-select:hover {
          border-color: rgba(255,255,255,0.3);
          background-color: rgba(255,255,255,0.08);
        }

        .template-select:focus {
          outline: none;
          border-color: rgba(255,255,255,0.4);
        }

        .reset-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-button:hover {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .reset-icon {
          width: 16px;
          height: 16px;
        }

        .download-button {
          font-family: 'Satoshi', -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          background: white;
          color: #1a1a1a;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .download-button:hover {
          background: #f0f0f0;
          transform: translateY(-1px);
        }

        .download-button:active {
          transform: translateY(0);
        }

        .download-icon {
          width: 16px;
          height: 16px;
        }

        .save-button {
          font-family: 'Satoshi', -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 20px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: transparent;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .save-button:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
        }

        .save-button.has-edits {
          border-color: rgba(255,255,255,0.4);
          color: white;
        }

        .save-button.has-edits:hover {
          background: rgba(255,255,255,0.15);
        }

        .save-status {
          font-family: 'Azeret Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
        }

        .button-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
      `}</style>

      {/* Left side - Template & Format selectors */}
      <div className="print-bottom-left">
        <span className="template-label">Template:</span>
        <select
          className="template-select"
          value={activeTemplate}
          onChange={(e) => onTemplateChange(e.target.value)}
        >
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        {showFormat && (
          <>
            <span className="template-label">Format:</span>
            <select
              className="template-select"
              value={activeFormat}
              onChange={(e) => onFormatChange(e.target.value)}
            >
              {formats.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </>
        )}
        {showSave && (
          <button
            className="reset-button"
            onClick={onReset}
            title="Reset to default"
          >
            <svg className="reset-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        )}
      </div>

      {/* Right side - Save & Download buttons */}
      <div className="button-group">
        {lastSaved && <span className="save-status">{lastSaved}</span>}
        {showSave && (
          <button
            className={`save-button ${hasEdits ? 'has-edits' : ''}`}
            onClick={onSave}
          >
            {hasEdits ? 'Save Changes' : 'Saved'}
          </button>
        )}
        <button className="download-button" onClick={onDownload}>
          <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  )
}
