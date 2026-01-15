import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useTheme } from '../../context/ThemeContext'
import { ArrowsOut, X, ArrowRight, LinkSimple } from '@phosphor-icons/react'

/**
 * ExpandableChart - Wrapper component for tap-to-expand charts
 */
export function ExpandableChart({
  children,
  legend,
  title,
  width,
  height,
  initialY = 0,
  initialScale: fixedScale,
  // Fullscreen spacing props
  headerPaddingTop = 16,
  headerPaddingBottom = 12,
  legendPaddingTop = 12,
  legendPaddingBottom = 12,
  legendOffset = 0, // Allows adjusting legend position (negative = up, positive = down)
  className = ''
}) {
  const { isDark } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [calculatedScale, setCalculatedScale] = useState(1)

  // Calculate optimal scale when modal opens
  useEffect(() => {
    if (isExpanded && typeof window !== 'undefined') {
      const headerHeight = 56
      const legendHeight = legend ? 56 : 0
      const availableHeight = window.innerHeight - headerHeight - legendHeight
      const optimalScale = Math.min(availableHeight / height, 1)
      setCalculatedScale(fixedScale || optimalScale)
    }
  }, [isExpanded, height, legend, fixedScale])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isExpanded])

  return (
    <>
      {/* Preview */}
      <div className={`mt-12 mb-8 ${className}`}>
        <div className={`relative rounded-xl ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`} style={{ padding: '24px' }}>
          {/* Legend */}
          {legend && (
            <div className="overflow-x-auto mb-4 pb-4 border-b [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/5" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <div className="flex gap-6 flex-nowrap min-w-max">
                {legend}
              </div>
            </div>
          )}

          {/* Chart */}
          <div className="overflow-hidden">
            {children({ width: '100%', height: 'auto' })}
          </div>

          {/* Expand button - bottom right, mobile only */}
          <button
            className={`absolute bottom-4 right-4 p-2 rounded-lg transition-colors md:hidden ${
              isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
            }`}
            onClick={() => setIsExpanded(true)}
          >
            <ArrowsOut size={20} />
          </button>
        </div>
      </div>

      {/* Modal - rendered via portal to escape parent stacking contexts */}
      {isExpanded && createPortal(
        <div
          className={`fixed inset-0 z-[9998] cursor-default ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}
        >
          {/* Chart layer - fills entire viewport */}
          <TransformWrapper
            key={calculatedScale}
            initialScale={calculatedScale}
            minScale={0.4}
            maxScale={3}
            centerOnInit={false}
            wheel={{ step: 0.1 }}
            panning={{ velocityDisabled: true }}
          >
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
              contentStyle={{
                width: 'fit-content',
                height: 'fit-content',
              }}
            >
              {children({ width, height })}
            </TransformComponent>
          </TransformWrapper>

          {/* Fixed header overlay */}
          <div
            className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'}`}
            style={{ paddingTop: `${headerPaddingTop}px`, paddingBottom: `${headerPaddingBottom}px` }}
          >
            {title && (
              <h2 className={`font-satoshi text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h2>
            )}
            <button
              className={`ml-auto p-2 rounded-lg transition-colors ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
              }`}
              onClick={() => setIsExpanded(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Fixed legend overlay */}
          {legend && (
            <div
              className={`fixed left-0 right-0 z-10 px-4 border-t overflow-x-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FAF8F4]'} [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full ${
                isDark
                  ? '[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-white/5'
                  : '[&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-track]:bg-black/5'
              }`}
              style={{
                bottom: `${legendOffset}px`,
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                paddingTop: `${legendPaddingTop}px`,
                paddingBottom: `${legendPaddingBottom}px`
              }}
            >
              <div className="flex gap-6 flex-nowrap min-w-max">
                {legend}
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  )
}

/**
 * OldFlowChart - The old chat flow diagram
 */
export function OldFlowChart({ width = 780, height = 520 }) {
  const { isDark } = useTheme()

  const lineColor = isDark ? '#4a4a4a' : '#d0d0d0'
  const problemColor = isDark ? '#c45c5c' : '#d46a6a'
  const successColor = isDark ? '#5c9a6a' : '#6aaa78'
  const boxBg = isDark ? '#252525' : '#ffffff'
  const boxBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'
  const intentBg = isDark ? 'rgba(167, 139, 250, 0.18)' : 'rgba(167, 139, 250, 0.15)'
  const intentBorder = isDark ? 'rgba(167, 139, 250, 0.35)' : 'rgba(167, 139, 250, 0.3)'
  const textColor = isDark ? '#ffffff' : '#1f2937'
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'
  const linkColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'

  // Generate unique marker IDs to avoid conflicts
  const markerId = `old-arrow-${isDark ? 'dark' : 'light'}`
  const markerProblemId = `old-arrow-problem-${isDark ? 'dark' : 'light'}`
  const markerSuccessId = `old-arrow-success-${isDark ? 'dark' : 'light'}`

  return (
    <svg width={width} height={height} viewBox="0 0 780 520" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id={markerId} markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 8 3, 0 6" fill={lineColor} />
        </marker>
        <marker id={markerProblemId} markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 8 3, 0 6" fill={problemColor} />
        </marker>
        <marker id={markerSuccessId} markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 8 3, 0 6" fill={successColor} />
        </marker>
      </defs>

      {/* Connection lines */}
      {(() => {
        const r = 8
        const openChatX = 95
        const openChatY = 260
        const intentX = 160
        const turnX1 = 125
        const intentYs = [65, 145, 335, 485]
        const intentEndX = 300
        const diamondLeftX = 400
        const diamondY = 105
        const turnX2 = 340
        const diamondRightX = 500
        const outcomeX = 608
        const turnX3 = 560
        const contactFormY = 65
        const advisorRedirectY = 145
        const deliveryEndX = 300
        const deliveryY = 335
        const subOptionX = 380
        const turnX4 = 340
        const subOptionYs = [265, 305, 345, 385, 425]

        return (
          <>
            {/* Open Chat to intents */}
            {intentYs.map((intentY, i) => {
              const goingDown = intentY > openChatY
              return (
                <path
                  key={`open-intent-${i}`}
                  d={`M ${openChatX} ${openChatY} L ${turnX1 - r} ${openChatY} Q ${turnX1} ${openChatY}, ${turnX1} ${goingDown ? openChatY + r : openChatY - r} L ${turnX1} ${goingDown ? intentY - r : intentY + r} Q ${turnX1} ${intentY}, ${turnX1 + r} ${intentY} L ${intentX} ${intentY}`}
                  stroke={lineColor}
                  strokeWidth="1.5"
                  fill="none"
                />
              )
            })}

            {/* Previous Purchases → Diamond (PROBLEM PATH) */}
            <path
              d={`M ${intentEndX} ${65} L ${turnX2 - r} ${65} Q ${turnX2} ${65}, ${turnX2} ${65 + r} L ${turnX2} ${diamondY - r} Q ${turnX2} ${diamondY}, ${turnX2 + r} ${diamondY} L ${diamondLeftX - 12} ${diamondY}`}
              stroke={problemColor}
              strokeWidth="1.5"
              fill="none"
              markerEnd={`url(#${markerProblemId})`}
            />

            {/* Buying Tesla → Diamond (GOOD PATH) */}
            <path
              d={`M ${intentEndX} ${145} L ${turnX2 - r} ${145} Q ${turnX2} ${145}, ${turnX2} ${145 - r} L ${turnX2} ${diamondY + r} Q ${turnX2} ${diamondY}, ${turnX2 + r} ${diamondY} L ${diamondLeftX - 12} ${diamondY}`}
              stroke={successColor}
              strokeWidth="1.5"
              fill="none"
              markerEnd={`url(#${markerSuccessId})`}
            />

            {/* Diamond → Contact Form (No) */}
            <path
              d={`M ${diamondRightX} ${diamondY} L ${turnX3 - r} ${diamondY} Q ${turnX3} ${diamondY}, ${turnX3} ${diamondY - r} L ${turnX3} ${contactFormY + r} Q ${turnX3} ${contactFormY}, ${turnX3 + r} ${contactFormY} L ${outcomeX} ${contactFormY}`}
              stroke={lineColor}
              strokeWidth="1.5"
              fill="none"
              markerEnd={`url(#${markerId})`}
            />

            {/* Diamond → Advisor Redirect (Yes) */}
            <path
              d={`M ${diamondRightX} ${diamondY} L ${turnX3 - r} ${diamondY} Q ${turnX3} ${diamondY}, ${turnX3} ${diamondY + r} L ${turnX3} ${advisorRedirectY - r} Q ${turnX3} ${advisorRedirectY}, ${turnX3 + r} ${advisorRedirectY} L ${outcomeX} ${advisorRedirectY}`}
              stroke={lineColor}
              strokeWidth="1.5"
              fill="none"
              markerEnd={`url(#${markerId})`}
            />

            {/* Delivery → Sub-options */}
            {subOptionYs.map((subY, i) => {
              const isStillNeedHelp = subY === 425
              const strokeColor = isStillNeedHelp ? problemColor : lineColor

              if (Math.abs(subY - deliveryY) < 1) {
                return (
                  <path
                    key={`delivery-sub-${i}`}
                    d={`M ${deliveryEndX} ${deliveryY} L ${subOptionX} ${subY}`}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    fill="none"
                  />
                )
              }
              const goingDown = subY > deliveryY
              return (
                <path
                  key={`delivery-sub-${i}`}
                  d={`M ${deliveryEndX} ${deliveryY} L ${turnX4 - r} ${deliveryY} Q ${turnX4} ${deliveryY}, ${turnX4} ${goingDown ? deliveryY + r : deliveryY - r} L ${turnX4} ${goingDown ? subY - r : subY + r} Q ${turnX4} ${subY}, ${turnX4 + r} ${subY} L ${subOptionX} ${subY}`}
                  stroke={strokeColor}
                  strokeWidth="1.5"
                  fill="none"
                />
              )
            })}
          </>
        )
      })()}

      {/* Still Need Help → Diamond (PROBLEM PATH - the loop back) */}
      <path
        d="M 555 425 L 590 425 Q 610 425, 610 405 L 610 230 Q 610 210, 585 200 L 486 137"
        stroke={problemColor}
        strokeWidth="1.5"
        fill="none"
        markerEnd={`url(#${markerProblemId})`}
      />

      {/* ===== NODES ===== */}

      {/* Open Chat */}
      <rect x="20" y="240" width="75" height="40" rx="6" fill={boxBg} stroke={boxBorder} strokeWidth="1.5" />
      <text x="57" y="265" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Open Chat</text>

      {/* Intent: Help With Previous Purchases */}
      <rect x="160" y="40" width="140" height="50" rx="8" fill={intentBg} stroke={intentBorder} strokeWidth="1" />
      <text x="230" y="62" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Help With</text>
      <text x="230" y="78" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Previous Purchases</text>

      {/* Intent: Buying Tesla Products */}
      <rect x="160" y="120" width="140" height="50" rx="8" fill={intentBg} stroke={intentBorder} strokeWidth="1" />
      <text x="230" y="142" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Buying Tesla</text>
      <text x="230" y="158" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Products</text>

      {/* Intent: Questions About Delivery */}
      <rect x="160" y="310" width="140" height="50" rx="8" fill={intentBg} stroke={intentBorder} strokeWidth="1" />
      <text x="230" y="332" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Questions About</text>
      <text x="230" y="348" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Delivery</text>

      {/* Intent: Schedule Demo Drive */}
      <rect x="160" y="460" width="140" height="50" rx="8" fill={intentBg} stroke={intentBorder} strokeWidth="1" />
      <text x="230" y="482" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Schedule Demo</text>
      <text x="230" y="498" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Drive</text>
      <foreignObject x="280" y="468" width="14" height="14">
        <LinkSimple size={14} weight="bold" color={linkColor} />
      </foreignObject>

      {/* Advisor Online? Diamond */}
      <path d="M 450 55 L 500 105 L 450 155 L 400 105 Z" fill={boxBg} stroke={boxBorder} strokeWidth="1.5" strokeLinejoin="round" />
      <text x="450" y="102" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Advisor</text>
      <text x="450" y="118" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Online?</text>

      {/* Yes/No labels */}
      <text x="570" y="55" fill={textMuted} style={{ fontSize: '11px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>No</text>
      <text x="570" y="160" fill={textMuted} style={{ fontSize: '11px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Yes</text>

      {/* Delivery Sub-options */}
      <rect x="380" y="250" width="175" height="30" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1" />
      <text x="458" y="270" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Account</text>
      <foreignObject x="536" y="257" width="14" height="14">
        <LinkSimple size={14} weight="bold" color={linkColor} />
      </foreignObject>

      <rect x="380" y="290" width="175" height="30" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1" />
      <text x="458" y="310" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>After Taking Delivery</text>
      <foreignObject x="536" y="297" width="14" height="14">
        <LinkSimple size={14} weight="bold" color={linkColor} />
      </foreignObject>

      <rect x="380" y="330" width="175" height="30" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1" />
      <text x="458" y="350" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Prepare for Delivery</text>
      <foreignObject x="536" y="337" width="14" height="14">
        <LinkSimple size={14} weight="bold" color={linkColor} />
      </foreignObject>

      <rect x="380" y="370" width="175" height="30" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1" />
      <text x="458" y="390" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>What to Expect</text>
      <foreignObject x="536" y="377" width="14" height="14">
        <LinkSimple size={14} weight="bold" color={linkColor} />
      </foreignObject>

      <rect x="380" y="410" width="175" height="30" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1" />
      <text x="458" y="430" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Still Need Help</text>

      {/* Outcomes */}
      <rect x="620" y="45" width="130" height="40" rx="6" fill={boxBg} stroke={boxBorder} strokeWidth="1.5" />
      <text x="685" y="70" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Contact Form</text>

      <rect x="620" y="125" width="130" height="40" rx="6" fill={boxBg} stroke={boxBorder} strokeWidth="1.5" />
      <text x="685" y="150" textAnchor="middle" fill={textColor} style={{ fontSize: '13px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Advisor Redirect</text>
    </svg>
  )
}

/**
 * OldFlowChartLegend - Legend for the old flow chart
 */
export function OldFlowChartLegend() {
  const { isDark } = useTheme()

  return (
    <>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#c45c5c' : '#d46a6a' }} />
        <span className="font-mono text-[11px] tracking-wide uppercase flex items-center gap-1 whitespace-nowrap" style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}>
          Non-sales <ArrowRight size={10} weight="bold" /> Advisor
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#5c9a6a' : '#6aaa78' }} />
        <span className="font-mono text-[11px] tracking-wide uppercase flex items-center gap-1 whitespace-nowrap" style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}>
          Sales <ArrowRight size={10} weight="bold" /> Advisor
        </span>
      </div>
    </>
  )
}

/**
 * NewFlowChart - The new chatbot automation flow diagram
 */
export function NewFlowChart({ width = 800, height = 710 }) {
  const { isDark } = useTheme()

  const lineColor = isDark ? '#4a4a4a' : '#d0d0d0'
  const successColor = isDark ? '#5c9a6a' : '#6aaa78'
  const boxBg = isDark ? '#252525' : '#ffffff'
  const boxBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'
  const textColor = isDark ? '#ffffff' : '#1f2937'
  const textMuted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'

  // Category colors
  const catColors = {
    orderEdu: { bg: isDark ? 'rgba(167, 139, 250, 0.18)' : 'rgba(167, 139, 250, 0.15)', border: isDark ? 'rgba(167, 139, 250, 0.35)' : 'rgba(167, 139, 250, 0.3)' },
    vehicleAppt: { bg: isDark ? 'rgba(15, 118, 110, 0.25)' : 'rgba(15, 118, 110, 0.15)', border: isDark ? 'rgba(15, 118, 110, 0.5)' : 'rgba(15, 118, 110, 0.35)' },
    vehicleEdu: { bg: isDark ? 'rgba(139, 92, 246, 0.18)' : 'rgba(139, 92, 246, 0.15)', border: isDark ? 'rgba(139, 92, 246, 0.35)' : 'rgba(139, 92, 246, 0.3)' },
    energyAppt: { bg: isDark ? 'rgba(234, 88, 12, 0.2)' : 'rgba(234, 88, 12, 0.12)', border: isDark ? 'rgba(234, 88, 12, 0.4)' : 'rgba(234, 88, 12, 0.3)' },
    energyEdu: { bg: isDark ? 'rgba(20, 184, 166, 0.2)' : 'rgba(20, 184, 166, 0.12)', border: isDark ? 'rgba(20, 184, 166, 0.4)' : 'rgba(20, 184, 166, 0.3)' },
    general: { bg: isDark ? 'rgba(107, 114, 128, 0.2)' : 'rgba(107, 114, 128, 0.12)', border: isDark ? 'rgba(107, 114, 128, 0.4)' : 'rgba(107, 114, 128, 0.3)' },
    purchase: { bg: isDark ? 'rgba(192, 132, 252, 0.18)' : 'rgba(192, 132, 252, 0.15)', border: isDark ? 'rgba(192, 132, 252, 0.35)' : 'rgba(192, 132, 252, 0.3)' },
    undetermined: { bg: isDark ? 'rgba(107, 114, 128, 0.15)' : 'rgba(107, 114, 128, 0.1)', border: isDark ? 'rgba(107, 114, 128, 0.3)' : 'rgba(107, 114, 128, 0.25)' },
  }

  // Layout constants
  const catX = 120
  const subX = 280
  const rowH = 28

  // Category definitions
  const cats = [
    { name: 'Order Education', color: catColors.orderEdu, subs: ['Incentives ★', 'Financing ★', 'Leasing ★', 'Trade-Ins ★', 'Payment Methods ★', 'Order Modification ★'] },
    { name: 'Vehicle Appts', color: catColors.vehicleAppt, subs: ['Demo Drive ★', 'Service Appointments'] },
    { name: 'Vehicle Education', color: catColors.vehicleEdu, subs: ['Vehicles & Accessories', 'Charging', 'Delivery', 'Software Updates', 'Insurance'] },
    { name: 'Energy Appts', color: catColors.energyAppt, subs: ['Energy Consultation'] },
    { name: 'Energy Education', color: catColors.energyEdu, subs: ['Energy Products', 'Installations', 'Tesla Electric'] },
    { name: 'General Purchase', color: catColors.purchase, subs: [
      { text: 'App', toAdvisor: false },
      { text: 'Account', toAdvisor: false },
      { text: 'Order Vehicle ★', toAdvisor: true },
      { text: 'Order Energy Product', toAdvisor: true },
    ], mixedPaths: true },
    { name: 'Undetermined', color: catColors.undetermined, subs: [] },
  ]

  // Calculate positions
  const catYPositions = []
  let currentY = 25
  cats.forEach((cat) => {
    const subsArray = cat.subs
    const numRows = Math.max(subsArray.length, 1)
    const catHeight = numRows * rowH
    catYPositions.push({ y: currentY, height: catHeight, midY: currentY + catHeight / 2 })
    currentY += catHeight + 8
  })

  const firstCatMid = catYPositions[0].midY
  const lastCatMid = catYPositions[catYPositions.length - 1].midY
  const openChatY = (firstCatMid + lastCatMid) / 2

  return (
    <svg width={width} height={height} viewBox="0 0 800 710" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-new" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 8 3, 0 6" fill={lineColor} />
        </marker>
        <marker id="arrow-new-success" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0 0, 8 3, 0 6" fill={successColor} />
        </marker>
      </defs>

      {/* Open Chat box */}
      <rect x="15" y={openChatY - 16} width="70" height="32" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1.5" />
      <text x="50" y={openChatY + 4} textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Open Chat</text>

      {/* Lines from Open Chat to categories */}
      {catYPositions.map((pos, i) => {
        const catY = pos.midY
        const r = 8
        const turnX = 100
        if (Math.abs(catY - openChatY) < 1) {
          return <path key={`line-${i}`} d={`M 85 ${openChatY} L ${catX} ${catY}`} stroke={lineColor} strokeWidth="1.5" fill="none" />
        }
        const goingDown = catY > openChatY
        return (
          <path
            key={`line-${i}`}
            d={`M 85 ${openChatY} L ${turnX - r} ${openChatY} Q ${turnX} ${openChatY}, ${turnX} ${goingDown ? openChatY + r : openChatY - r} L ${turnX} ${goingDown ? catY - r : catY + r} Q ${turnX} ${catY}, ${turnX + r} ${catY} L ${catX} ${catY}`}
            stroke={lineColor}
            strokeWidth="1.5"
            fill="none"
          />
        )
      })}

      {/* Categories and sub-topics */}
      {cats.map((cat, catIdx) => {
        const pos = catYPositions[catIdx]
        const catMidY = pos.midY
        const catBoxH = 32
        const catBoxY = catMidY - catBoxH / 2

        return (
          <g key={cat.name}>
            {/* Category box */}
            <rect x={catX} y={catBoxY} width="100" height={catBoxH} rx="6" fill={cat.color.bg} stroke={cat.color.border} strokeWidth="1" />
            <text x={catX + 50} y={catMidY + 4} textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
              {cat.name}
            </text>

            {/* Sub-topics */}
            {cat.subs.map((sub, subIdx) => {
              const subY = pos.y + subIdx * rowH + rowH / 2
              const subData = typeof sub === 'string' ? { text: sub, toAdvisor: cat.toAdvisor || false } : sub
              const isStarred = subData.text.includes('★')
              const subText = subData.text.replace(' ★', '')
              const goesToAdvisor = subData.toAdvisor
              const lineStroke = goesToAdvisor ? successColor : lineColor

              const r = 8
              const turnX = catX + 140

              let linePath
              if (Math.abs(subY - catMidY) < 1) {
                linePath = `M ${catX + 100} ${catMidY} L ${subX} ${subY}`
              } else {
                const goingDown = subY > catMidY
                linePath = `M ${catX + 100} ${catMidY} L ${turnX - r} ${catMidY} Q ${turnX} ${catMidY}, ${turnX} ${goingDown ? catMidY + r : catMidY - r} L ${turnX} ${goingDown ? subY - r : subY + r} Q ${turnX} ${subY}, ${turnX + r} ${subY} L ${subX} ${subY}`
              }

              return (
                <g key={subData.text}>
                  <path d={linePath} stroke={lineStroke} strokeWidth="1.5" fill="none" />
                  <rect x={subX} y={subY - 11} width="120" height="22" rx="4" fill={boxBg} stroke={boxBorder} strokeWidth="1" />
                  <text x={subX + (isStarred ? 55 : 60)} y={subY + 3} textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>
                    {subText}
                  </text>
                  {isStarred && (
                    <text x={subX + 105} y={subY + 4} textAnchor="middle" fill={isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'} style={{ fontSize: '11px' }}>
                      ★
                    </text>
                  )}
                </g>
              )
            })}

            {/* Undetermined connects to Advisor Online */}
            {cat.name === 'Undetermined' && (
              <path d={`M ${catX + 100} ${catMidY} L ${subX + 70} ${catMidY}`} stroke={successColor} strokeWidth="1.5" fill="none" />
            )}
          </g>
        )
      })}

      {/* Still Need Help and Advisor paths */}
      {(() => {
        const genPurchasePos = catYPositions[5]
        const undeterminedPos = catYPositions[6]
        const orderVehicleY = genPurchasePos.y + 2 * rowH + rowH / 2
        const orderEnergyY = genPurchasePos.y + 3 * rowH + rowH / 2
        const undeterminedY = undeterminedPos.midY
        const advisorDiamondY = (orderVehicleY + orderEnergyY) / 2
        const advisorDiamondX = 580
        const stillNeedHelpY = catYPositions[2].midY

        // Collect self-service Y positions
        const selfServiceYs = []
        cats.forEach((cat, catIdx) => {
          if (catIdx === 6) return
          const pos = catYPositions[catIdx]
          cat.subs.forEach((sub, subIdx) => {
            const subData = typeof sub === 'string' ? { text: sub, toAdvisor: false } : sub
            if (!subData.toAdvisor) {
              const subY = pos.y + subIdx * rowH + rowH / 2
              selfServiceYs.push(subY)
            }
          })
        })

        const r = 8
        const turn1X = subX + 180
        const turn2X = subX + 210
        const subEndX = subX + 120

        return (
          <>
            {/* Still Need Help diamond */}
            <path d={`M 580 ${stillNeedHelpY - 40} L 620 ${stillNeedHelpY} L 580 ${stillNeedHelpY + 40} L 540 ${stillNeedHelpY} Z`} fill={boxBg} stroke={boxBorder} strokeWidth="1.5" strokeLinejoin="round" />
            <text x="580" y={stillNeedHelpY - 3} textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Still Need</text>
            <text x="580" y={stillNeedHelpY + 10} textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Help?</text>

            {/* Lines from self-service to Still Need Help */}
            {selfServiceYs.map((subY, idx) => {
              const isAtSameLevel = Math.abs(subY - stillNeedHelpY) < r * 2
              if (isAtSameLevel) {
                return <path key={`gray-${idx}`} d={`M ${subEndX} ${subY} L ${turn2X} ${subY}`} stroke={lineColor} strokeWidth="1.5" fill="none" />
              }
              const goingDown = subY < stillNeedHelpY
              return (
                <path
                  key={`gray-${idx}`}
                  d={`M ${subEndX} ${subY} L ${turn1X - r} ${subY} Q ${turn1X} ${subY}, ${turn1X} ${goingDown ? subY + r : subY - r} L ${turn1X} ${goingDown ? stillNeedHelpY - r : stillNeedHelpY + r} Q ${turn1X} ${stillNeedHelpY}, ${turn1X + r} ${stillNeedHelpY} L ${turn2X} ${stillNeedHelpY}`}
                  stroke={lineColor}
                  strokeWidth="1.5"
                  fill="none"
                />
              )
            })}
            <path d={`M ${turn2X} ${stillNeedHelpY} L ${540} ${stillNeedHelpY}`} stroke={lineColor} strokeWidth="1.5" fill="none" />

            {/* End Chat */}
            <rect x="670" y={stillNeedHelpY - 14} width="65" height="28" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1.5" />
            <text x="702" y={stillNeedHelpY + 3} textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>End Chat</text>

            {/* Still Need Help -> End Chat (No) */}
            <path d={`M 620 ${stillNeedHelpY} L 658 ${stillNeedHelpY}`} stroke={lineColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow-new)" />
            <text x="638" y={stillNeedHelpY - 6} fill={textMuted} style={{ fontSize: '9px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>No</text>

            {/* Still Need Help -> Open Chat (Yes) - feedback loop */}
            {(() => {
              const topY = 5
              const diamondTopY = stillNeedHelpY - 40
              const openChatCenterX = 50
              const openChatTopY = openChatY - 16
              return (
                <>
                  <path
                    d={`M 580 ${diamondTopY} L 580 ${topY + r} Q 580 ${topY}, ${580 - r} ${topY} L ${openChatCenterX + r} ${topY} Q ${openChatCenterX} ${topY}, ${openChatCenterX} ${topY + r} L ${openChatCenterX} ${openChatTopY - 10}`}
                    stroke={lineColor}
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#arrow-new)"
                  />
                  <text x="590" y={diamondTopY - 10} fill={textMuted} style={{ fontSize: '9px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Yes</text>
                </>
              )
            })()}

            {/* Advisor-bound paths */}
            <path d={`M ${catX + 100} ${undeterminedY} L ${turn1X - r} ${undeterminedY} Q ${turn1X} ${undeterminedY}, ${turn1X} ${undeterminedY - r} L ${turn1X} ${advisorDiamondY + r} Q ${turn1X} ${advisorDiamondY}, ${turn1X + r} ${advisorDiamondY} L ${turn2X} ${advisorDiamondY}`} stroke={lineColor} strokeWidth="1.5" fill="none" />
            <path d={`M ${subEndX} ${orderVehicleY} L ${turn1X - r} ${orderVehicleY} Q ${turn1X} ${orderVehicleY}, ${turn1X} ${orderVehicleY + r} L ${turn1X} ${advisorDiamondY - r} Q ${turn1X} ${advisorDiamondY}, ${turn1X + r} ${advisorDiamondY} L ${turn2X} ${advisorDiamondY}`} stroke={successColor} strokeWidth="1.5" fill="none" />
            <path d={`M ${subEndX} ${orderEnergyY} L ${turn1X - r} ${orderEnergyY} Q ${turn1X} ${orderEnergyY}, ${turn1X} ${orderEnergyY - r} L ${turn1X} ${advisorDiamondY + r} Q ${turn1X} ${advisorDiamondY}, ${turn1X + r} ${advisorDiamondY} L ${turn2X} ${advisorDiamondY}`} stroke={successColor} strokeWidth="1.5" fill="none" />
            <path d={`M ${turn2X} ${advisorDiamondY} L ${advisorDiamondX - 40} ${advisorDiamondY}`} stroke={successColor} strokeWidth="1.5" fill="none" />

            {/* Advisor Online diamond */}
            <path d={`M ${advisorDiamondX} ${advisorDiamondY - 40} L ${advisorDiamondX + 40} ${advisorDiamondY} L ${advisorDiamondX} ${advisorDiamondY + 40} L ${advisorDiamondX - 40} ${advisorDiamondY} Z`} fill={boxBg} stroke={boxBorder} strokeWidth="1.5" strokeLinejoin="round" />
            <text x={advisorDiamondX} y={advisorDiamondY - 3} textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Advisor</text>
            <text x={advisorDiamondX} y={advisorDiamondY + 10} textAnchor="middle" fill={textColor} style={{ fontSize: '11px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Online?</text>

            {/* Advisor Online -> Contact Form (No) */}
            <path d={`M ${advisorDiamondX + 40} ${advisorDiamondY} L ${advisorDiamondX + 60} ${advisorDiamondY} Q ${advisorDiamondX + 80} ${advisorDiamondY}, ${advisorDiamondX + 80} ${advisorDiamondY - 15} L ${advisorDiamondX + 80} ${advisorDiamondY - 20} Q ${advisorDiamondX + 80} ${advisorDiamondY - 30}, ${advisorDiamondX + 100} ${advisorDiamondY - 30}`} stroke={successColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow-new-success)" />
            <rect x={advisorDiamondX + 112} y={advisorDiamondY - 44} width="85" height="28" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1.5" />
            <text x={advisorDiamondX + 154} y={advisorDiamondY - 27} textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Contact Form</text>
            <text x={advisorDiamondX + 85} y={advisorDiamondY - 35} fill={textMuted} style={{ fontSize: '9px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>No</text>

            {/* Advisor Online -> Advisor Redirect (Yes) */}
            <path d={`M ${advisorDiamondX + 40} ${advisorDiamondY} L ${advisorDiamondX + 60} ${advisorDiamondY} Q ${advisorDiamondX + 80} ${advisorDiamondY}, ${advisorDiamondX + 80} ${advisorDiamondY + 15} L ${advisorDiamondX + 80} ${advisorDiamondY + 20} Q ${advisorDiamondX + 80} ${advisorDiamondY + 30}, ${advisorDiamondX + 100} ${advisorDiamondY + 30}`} stroke={successColor} strokeWidth="1.5" fill="none" markerEnd="url(#arrow-new-success)" />
            <rect x={advisorDiamondX + 112} y={advisorDiamondY + 16} width="85" height="28" rx="5" fill={boxBg} stroke={boxBorder} strokeWidth="1.5" />
            <text x={advisorDiamondX + 154} y={advisorDiamondY + 33} textAnchor="middle" fill={textColor} style={{ fontSize: '10px', fontFamily: 'Satoshi, sans-serif', fontWeight: 600 }}>Advisor Redirect</text>
            <text x={advisorDiamondX + 85} y={advisorDiamondY + 42} fill={textMuted} style={{ fontSize: '9px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Yes</text>
          </>
        )
      })()}
    </svg>
  )
}

/**
 * NewFlowChartLegend - Legend for the new flow chart
 */
export function NewFlowChartLegend() {
  const { isDark } = useTheme()

  return (
    <>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span style={{ fontSize: '14px', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)' }}>★</span>
        <span className="font-mono text-[10px] tracking-wide uppercase whitespace-nowrap" style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}>
          Business Incentive
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }} />
        <span className="font-mono text-[10px] tracking-wide uppercase whitespace-nowrap" style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}>
          Self-service
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-4 h-0.5 rounded" style={{ backgroundColor: isDark ? '#5c9a6a' : '#6aaa78' }} />
        <span className="font-mono text-[10px] tracking-wide uppercase flex items-center gap-1 whitespace-nowrap" style={{ color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)' }}>
          Sales <ArrowRight size={9} weight="bold" /> Advisor
        </span>
      </div>
    </>
  )
}
