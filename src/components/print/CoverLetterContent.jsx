/**
 * Cover Letter Content Component
 * Single-column letter format with contenteditable sections
 * Letter aspect ratio (8.5" x 11")
 */

import { QRCodeSVG } from 'qrcode.react'

export default function CoverLetterContent({ template, content, onContentChange }) {
  const accent = template.colors.accent

  // Format today's date
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleEdit = (field, value) => {
    if (onContentChange) {
      onContentChange({
        ...content,
        content: {
          ...content.content,
          [field]: value,
        },
      })
    }
  }

  return (
    <div className="print-cover-letter">
      <style>{`
        .print-cover-letter {
          font-family: 'Satoshi', -apple-system, sans-serif;
          font-size: 10pt;
          font-weight: 450;
          line-height: 1.6;
          color: #1a1a1a;
          background: white;
          max-width: 8.5in;
          margin: 0 auto;
        }

        .print-cover-letter * {
          box-sizing: border-box;
        }

        /* Header */
        .letter-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 0.15in;
          margin-bottom: 0.3in;
          border-bottom: 2px solid #1a1a1a;
        }

        .header-left {
          flex: 1;
        }

        .header-right {
          display: flex;
          align-items: flex-start;
        }

        .letter-header h1 {
          font-family: 'Silk Serif', serif;
          font-size: 48pt;
          font-weight: 400;
          margin: 0 0 4px 0;
          letter-spacing: -1px;
          line-height: 0.85;
          color: #111;
        }

        .letter-header .tagline {
          font-family: 'Azeret Mono', monospace;
          font-size: 7.5pt;
          font-weight: 500;
          color: ${accent} !important;
          margin: 8px 0 0 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }


        .header-qr {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .qr-with-heart {
          position: relative;
          display: inline-block;
        }

        .qr-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: white;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr-logo svg {
          width: 100%;
          height: 100%;
          fill: ${accent} !important;
        }

        .qr-logo svg path {
          fill: ${accent} !important;
        }

        .header-qr-label {
          font-family: 'Azeret Mono', monospace;
          font-size: 7pt;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.3px;
        }

        /* Letter content */
        .letter-content {
          max-width: 100%;
        }

        .letter-date {
          font-family: 'Azeret Mono', monospace;
          font-size: 8pt;
          font-weight: 500;
          color: #666;
          margin-bottom: 0.2in;
          letter-spacing: 0.3px;
        }

        .letter-greeting {
          font-size: 10pt;
          font-weight: 600;
          color: #111;
          margin-bottom: 0.15in;
        }

        .letter-body {
          font-size: 10pt;
          color: #2a2a2a;
          line-height: 1.5;
          white-space: pre-wrap;
          margin-bottom: 44px;
        }

        .letter-signoff {
          font-size: 10pt;
          color: #333;
          margin-bottom: 12px;
        }

        .letter-signature-img {
          height: 50px;
          width: auto;
          margin-bottom: 4px;
          display: block;
        }

        .letter-signature {
          font-size: 10pt;
          font-weight: 500;
          color: #111;
          margin: 0;
        }

        .signature-contact {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 4px;
          font-size: 9pt;
          color: #2a2a2a;
        }

        /* Contenteditable styling - screen only */
        @media screen {
          [contenteditable] {
            transition: all 0.15s ease;
            border-radius: 2px;
            padding: 2px 4px;
            margin-left: -4px;
            margin-right: -4px;
          }

          [contenteditable]:hover {
            background: rgba(91, 33, 182, 0.04);
            outline: 1px dashed rgba(91, 33, 182, 0.25);
            outline-offset: 2px;
          }

          [contenteditable]:focus {
            background: rgba(91, 33, 182, 0.06);
            outline: 2px solid ${accent};
            outline-offset: 2px;
          }
        }

        /* Reset contenteditable in print */
        @media print {
          [contenteditable] {
            outline: none !important;
            background: transparent !important;
            padding: 0 !important;
          }

          .letter-body {
            margin-bottom: 44px !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="letter-header">
        <div className="header-left">
          <h1>{content.sender.name}</h1>
          <p className="tagline">{content.sender.title} ✦ {content.sender.credentials}</p>
        </div>
        <div className="header-right">
          <div className="header-qr">
            <div className="qr-with-heart">
              <QRCodeSVG
                value={content.sender.portfolioUrl}
                size={72}
                level="H"
                fgColor="#1a1a1a"
              />
              <span className="qr-logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.27 91.71">
                  <path fillRule="evenodd" d="M519,279.86A45.77,45.77,0,0,1,564.68,234H579.6c13.57,0,21.78,4.54,27.24,9.35a31,31,0,0,1,5.69,6.6,23.68,23.68,0,0,1,1.28,2.26c.14.29.25.52.33.7a1.46,1.46,0,0,0,.09.21l0,.08v0h0s0,0-3.5,1.37l3.51-1.36,2,5.13H564.68a21.48,21.48,0,0,0,0,42.95H582a13,13,0,0,0,12.45-9.28H564.68a12.2,12.2,0,0,1,0-24.39h18.13a19.7,19.7,0,0,1,19.45,16.83H615.5v3.78h3.76A37.38,37.38,0,0,1,582,325.71H564.68A45.77,45.77,0,0,1,519,279.86Zm92.5,12.19h-9.37A20.55,20.55,0,0,1,582,308.88H564.68a29,29,0,0,1,0-58h39.05a24.36,24.36,0,0,0-1.84-1.8c-4.11-3.61-10.56-7.48-22.29-7.48H564.68a38.31,38.31,0,0,0,0,76.61H582A29.84,29.84,0,0,0,611.5,292.05Zm-16.9-7.56a12.16,12.16,0,0,0-11.79-9.28H564.68a4.64,4.64,0,0,0,0,9.28Z" transform="translate(-519 -234)"/>
                  <path d="M614.44,284.49h4.83v3.91l-4.45-.09Z" transform="translate(-519 -234)"/>
                </svg>
              </span>
            </div>
            <span className="header-qr-label">graceguo.io</span>
          </div>
        </div>
      </header>


      {/* Letter Content */}
      <div className="letter-content">
        {/* Date */}
        <p className="letter-date">{today}</p>

        {/* Greeting */}
        <p
          className="letter-greeting"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleEdit('greeting', e.target.innerText)}
        >
          {content.content.greeting}
        </p>

        {/* Body - single editable field */}
        <div
          className="letter-body"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleEdit('body', e.target.innerText)}
        >
          {content.content.body}
        </div>

        {/* Sign-off */}
        <p
          className="letter-signoff"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleEdit('signoff', e.target.innerText)}
        >
          {content.content.signoff}
        </p>

        {/* Signature */}
        <div className="letter-signature-block">
          <img
            src="/assets/resume/signature.png"
            alt="Signature"
            className="letter-signature-img"
          />
          <p className="letter-signature">{content.content.signature}</p>
          <div className="signature-contact">
            <span>{content.sender.email}</span>
            <span>{content.sender.linkedin}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
