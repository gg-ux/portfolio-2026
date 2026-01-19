import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { getColor } from '../../constants/colors'
import { Caption } from '../Typography'

/**
 * IndiEVDeliverables - Icon-based deliverables display
 */
export function IndiEVDeliverables() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  // Brand colors
  const amethyst = getColor('amethyst', isDark)
  const lilac = getColor('lilac', isDark)
  const rose = getColor('rose', isDark)

  const deliverables = [
    {
      title: 'IVI Mockups',
      description: '40+ high-fidelity mockups of 15+ features in light/dark mode',
      color: amethyst,
      icon: (color) => (
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          {/* Outer screen frame */}
          <rect x="2" y="2" width="96" height="70" rx="4" stroke={color} strokeWidth="2" />
          {/* Sidebar buttons */}
          <rect x="8" y="12" width="18" height="10" rx="2" stroke={color} strokeWidth="1.5" />
          <rect x="8" y="26" width="18" height="10" rx="2" stroke={color} strokeWidth="1.5" />
          <rect x="8" y="40" width="18" height="10" rx="2" stroke={color} strokeWidth="1.5" />
          <rect x="8" y="54" width="18" height="10" rx="2" stroke={color} strokeWidth="1.5" />
          {/* Divider line */}
          <line x1="30" y1="8" x2="30" y2="66" stroke={color} strokeWidth="1.5" />
          {/* Navigation pin */}
          <circle cx="42" cy="22" r="5" stroke={color} strokeWidth="1.5" />
          <circle cx="42" cy="22" r="2" fill={color} />
          {/* Dashed navigation path */}
          <path d="M42 27 Q50 40, 58 35 Q72 26, 70 48 Q68 58, 82 55" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" fill="none" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Design System',
      description: 'Design system library for IVI with linked components',
      color: lilac,
      icon: (color) => (
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          {/* Top row: two pills + square */}
          <rect x="4" y="4" width="32" height="12" rx="6" stroke={color} strokeWidth="2" />
          <rect x="4" y="22" width="32" height="12" rx="6" stroke={color} strokeWidth="2" />
          <rect x="44" y="4" width="52" height="30" rx="4" stroke={color} strokeWidth="2" />
          {/* Bottom row: small square + wide rectangle */}
          <rect x="4" y="42" width="22" height="22" rx="3" stroke={color} strokeWidth="2" />
          <rect x="32" y="42" width="64" height="22" rx="3" stroke={color} strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Demo Reel',
      description: 'Demo reel showing 7 key flows to be shown in-vehicle at auto show',
      color: rose,
      icon: (color) => (
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          {/* Monitor frame */}
          <rect x="2" y="2" width="96" height="60" rx="4" stroke={color} strokeWidth="2" />
          {/* Screen inner border */}
          <rect x="8" y="8" width="84" height="48" rx="2" stroke={color} strokeWidth="1.5" />
          {/* Play button circle */}
          <circle cx="50" cy="32" r="14" stroke={color} strokeWidth="2" />
          {/* Play triangle */}
          <path d="M46 25 L46 39 L58 32 Z" fill={color} />
          {/* Progress slider */}
          <line x1="15" y1="72" x2="85" y2="72" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="30" cy="72" r="3" fill={color} />
        </svg>
      ),
    },
  ]

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {deliverables.map((item, index) => (
          <div
            key={item.title}
            className={`rounded-2xl p-5 md:p-6 text-center ${
              isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease-out ${0.1 + index * 0.1}s`,
            }}
          >
            <div className="flex justify-center mb-4 md:mb-5">
              {item.icon(item.color)}
            </div>

            <h4
              className="font-satoshi text-base md:text-lg mb-2 theme-heading"
              style={{ fontWeight: 600 }}
            >
              {item.title}
            </h4>
            <p className={`font-satoshi text-[13px] md:text-[15px] leading-snug ${
              isDark ? 'text-white/60' : 'text-gray-600'
            }`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * UsabilityResults - Chart showing usability testing metrics
 * Three sections: Task Success Rate, Time on Task, System Ease Question
 */
/**
 * InteractiveClimateDemo - Shows climate iteration 3 with clickable fan hotspot
 * Clicking the fan button reveals the expanded fan controls
 */
export function InteractiveClimateDemo() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })
  const [isFanOpen, setIsFanOpen] = useState(false)

  return (
    <figure
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-xl md:rounded-2xl ${
          isDark ? 'bg-[#111111]' : 'bg-gray-100'
        }`}
      >
        {/* Base image (iteration 3) */}
        <img
          src="/assets/projects/indi-ev/content/climate-iteration3.png"
          alt="Climate control interface - click fan button to interact"
          className={`w-full h-auto transition-opacity duration-300 ${
            isFanOpen ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Fan open image (overlaid) */}
        <img
          src="/assets/projects/indi-ev/content/climate-iteration3-fan.png"
          alt="Climate control with fan layer expanded"
          className={`absolute inset-0 w-full h-auto transition-opacity duration-300 ${
            isFanOpen ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Clickable hotspot on fan button */}
        <button
          onClick={() => setIsFanOpen(!isFanOpen)}
          className="absolute cursor-pointer group"
          style={{
            left: '65%',
            top: '86%',
            width: '8%',
            height: '9%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
          }}
          aria-label={isFanOpen ? 'Close fan controls' : 'Open fan controls'}
        >
          {/* Pulse ring animation - only shows when fan is closed */}
          {!isFanOpen && (
            <>
              <span
                className="absolute inset-0 rounded-lg animate-ping opacity-30"
                style={{ backgroundColor: colors.lilac }}
              />
              <span
                className="absolute inset-0 rounded-lg animate-pulse opacity-20"
                style={{
                  backgroundColor: colors.lilac,
                  animationDelay: '0.5s'
                }}
              />
            </>
          )}

          {/* Hover indicator */}
          <span
            className={`absolute inset-0 rounded-lg transition-all duration-200 ${
              isFanOpen
                ? 'bg-white/10 ring-2 ring-white/30'
                : 'bg-transparent group-hover:bg-white/10 group-hover:ring-2 group-hover:ring-white/20'
            }`}
          />
        </button>
      </div>

      <figcaption className="mt-4 text-center">
        <Caption className="theme-caption">
          {isFanOpen ? 'Fan layer active' : 'Click fan button to interact'}
        </Caption>
      </figcaption>
    </figure>
  )
}

export function UsabilityResults() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const taskSuccessData = [
    { task: 'T1', value: 100, label: '100%' },
    { task: 'T2', value: 66.6, label: '66.6%' },
    { task: 'T3', value: 100, label: '100%' },
    { task: 'T4', value: 100, label: '100%' },
  ]

  const timeOnTaskData = [
    { task: 'T1', value: 2.6, label: '2.6 sec' },
    { task: 'T2', value: 23, label: '23 sec' },
    { task: 'T3', value: 5, label: '5 sec' },
    { task: 'T4', value: 5.3, label: '5.3 sec' },
  ]
  const maxTime = 23 // for scaling

  const systemEaseData = [
    { task: 'T1', value: 6.7, label: '6.7' },
    { task: 'T2', value: 4, label: '4' },
    { task: 'T3', value: 5.7, label: '5.7' },
    { task: 'T4', value: 6, label: '6' },
  ]
  const maxEase = 7 // score out of 7

  const MetricSection = ({ title, data, color, maxValue = 100, delayOffset = 0 }) => (
    <div className="space-y-4">
      <h4
        className="font-mono text-[11px] md:text-[12px] tracking-wide uppercase font-medium"
        style={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)' }}
      >
        {title}
      </h4>
      <div className="space-y-3 md:space-y-4">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100
          return (
            <div
              key={item.task}
              className="flex items-center gap-3 md:gap-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease-out, transform 0.5s ease-out`,
                transitionDelay: `${(delayOffset + index) * 80}ms`,
              }}
            >
              <span
                className="font-mono text-[12px] md:text-[13px] w-6 flex-shrink-0"
                style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
              >
                {item.task}
              </span>
              <div className="flex-1 flex items-center gap-3">
                <div
                  className="h-1 rounded-full flex-1"
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: isVisible ? `${percentage}%` : '0%',
                      backgroundColor: color,
                      transitionDelay: `${(delayOffset + index) * 80 + 150}ms`,
                    }}
                  />
                </div>
                <span
                  className="font-mono text-[12px] md:text-[13px] w-16 md:w-20 text-right flex-shrink-0"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 lg:p-10 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          <MetricSection
            title="Task Success Rate"
            data={taskSuccessData}
            color={colors.amethyst}
            maxValue={100}
            delayOffset={0}
          />
          <MetricSection
            title="Time on Task"
            data={timeOnTaskData}
            color={colors.lilac}
            maxValue={maxTime}
            delayOffset={4}
          />
          <MetricSection
            title="System Ease (out of 7)"
            data={systemEaseData}
            color={colors.rose}
            maxValue={maxEase}
            delayOffset={8}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * UsabilityResultsHighlighted - Option 3: Highlight problem areas (T2)
 */
export function UsabilityResultsHighlighted() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const taskSuccessData = [
    { task: 'T1', value: 100, label: '100%', highlight: false },
    { task: 'T2', value: 66.6, label: '66.6%', highlight: true },
    { task: 'T3', value: 100, label: '100%', highlight: false },
    { task: 'T4', value: 100, label: '100%', highlight: false },
  ]

  const timeOnTaskData = [
    { task: 'T1', value: 2.6, label: '2.6 sec', highlight: false },
    { task: 'T2', value: 23, label: '23 sec', highlight: true },
    { task: 'T3', value: 5, label: '5 sec', highlight: false },
    { task: 'T4', value: 5.3, label: '5.3 sec', highlight: false },
  ]
  const maxTime = 23

  const systemEaseData = [
    { task: 'T1', value: 6.7, label: '6.7', highlight: false },
    { task: 'T2', value: 4, label: '4', highlight: true },
    { task: 'T3', value: 5.7, label: '5.7', highlight: false },
    { task: 'T4', value: 6, label: '6', highlight: false },
  ]
  const maxEase = 7

  const warningColor = '#E57373'
  const accentColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'

  const MetricSection = ({ title, data, maxValue = 100, delayOffset = 0 }) => (
    <div className="space-y-4">
      <h4
        className="font-mono text-[11px] md:text-[12px] tracking-wide uppercase font-medium"
        style={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)' }}
      >
        {title}
      </h4>
      <div className="space-y-3 md:space-y-4">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100
          const barColor = item.highlight ? warningColor : accentColor
          return (
            <div
              key={item.task}
              className={`flex items-center gap-3 md:gap-4 px-2 py-1 -mx-2 rounded-lg ${
                item.highlight
                  ? isDark ? 'bg-red-500/10' : 'bg-red-500/5'
                  : ''
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease-out, transform 0.5s ease-out`,
                transitionDelay: `${(delayOffset + index) * 80}ms`,
              }}
            >
              <span
                className="font-mono text-[12px] md:text-[13px] w-6 flex-shrink-0"
                style={{ color: item.highlight ? warningColor : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)') }}
              >
                {item.task}
              </span>
              <div className="flex-1 flex items-center gap-3">
                <div
                  className="h-1 rounded-full flex-1"
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: isVisible ? `${percentage}%` : '0%',
                      backgroundColor: barColor,
                      transitionDelay: `${(delayOffset + index) * 80 + 150}ms`,
                    }}
                  />
                </div>
                <span
                  className="font-mono text-[12px] md:text-[13px] w-16 md:w-20 text-right flex-shrink-0"
                  style={{ color: item.highlight ? warningColor : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)') }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <p
        className="font-mono text-[11px] tracking-wide uppercase mb-4"
        style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
      >
        Option 3: Highlight Problem Areas
      </p>
      <div className={`rounded-2xl p-6 md:p-8 lg:p-10 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          <MetricSection
            title="Task Success Rate"
            data={taskSuccessData}
            maxValue={100}
            delayOffset={0}
          />
          <MetricSection
            title="Time on Task"
            data={timeOnTaskData}
            maxValue={maxTime}
            delayOffset={4}
          />
          <MetricSection
            title="System Ease (out of 7)"
            data={systemEaseData}
            maxValue={maxEase}
            delayOffset={8}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * UsabilityResultsTaskCentric - Option 1: Task-centric rows with circular progress
 * Each task shows all 3 metrics together using circular indicators
 */
export function UsabilityResultsTaskCentric() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const tasks = [
    {
      name: 'Turn on AC',
      success: { value: 100, label: '100%' },
      time: { value: 2.6, label: '2.6s' },
      ease: { value: 6.7, label: '6.7' },
      highlight: false,
    },
    {
      name: 'Change fan speed',
      success: { value: 66.6, label: '67%' },
      time: { value: 23, label: '23s' },
      ease: { value: 4, label: '4' },
      highlight: true,
    },
    {
      name: 'Sync temperatures',
      success: { value: 100, label: '100%' },
      time: { value: 5, label: '5s' },
      ease: { value: 5.7, label: '5.7' },
      highlight: false,
    },
    {
      name: 'Change airflow direction',
      success: { value: 100, label: '100%' },
      time: { value: 5.3, label: '5.3s' },
      ease: { value: 6, label: '6' },
      highlight: false,
    },
  ]

  const maxTime = 23
  const maxEase = 7
  const warningColor = '#E57373'
  const accentColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
  const trackColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  const CircularProgress = ({ value, maxValue, color, label, delay, size = 32 }) => {
    const percentage = (value / maxValue) * 100
    const radius = (size - 4) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth="3"
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            style={{
              transition: 'stroke-dashoffset 0.8s ease-out',
              transitionDelay: `${delay}ms`,
            }}
          />
        </svg>
        <span
          className="font-mono text-[10px] md:text-[11px]"
          style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
        >
          {label}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 lg:p-10 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        {/* Header row - visible on all sizes */}
        <div className="grid grid-cols-[1fr_40px_40px_40px] min-[510px]:grid-cols-[1fr_50px_50px_50px] gap-4 min-[510px]:gap-6 mb-3 pb-3 border-b items-end"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        >
          <span
            className="font-mono text-[10px] min-[510px]:text-[11px] tracking-wide uppercase"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          >
            Task
          </span>
          <span
            className="font-mono text-[10px] min-[510px]:text-[11px] tracking-wide uppercase text-center"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          >
            Success
          </span>
          <span
            className="font-mono text-[10px] min-[510px]:text-[11px] tracking-wide uppercase text-center"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          >
            Time
          </span>
          <span
            className="font-mono text-[10px] min-[510px]:text-[11px] tracking-wide uppercase text-center"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          >
            Ease
          </span>
        </div>

        {/* Task rows */}
        <div className="space-y-1">
          {tasks.map((task, index) => (
            <div
              key={task.name}
              className={`grid grid-cols-[1fr_40px_40px_40px] min-[510px]:grid-cols-[1fr_50px_50px_50px] gap-4 min-[510px]:gap-6 py-2 px-3 -mx-3 rounded-lg items-center ${
                task.highlight
                  ? isDark ? 'bg-red-500/10' : 'bg-red-500/5'
                  : ''
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease-out, transform 0.5s ease-out`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Task name - caption style */}
              <span
                className="font-mono text-[11px] min-[510px]:text-[12px] tracking-wide"
                style={{ color: task.highlight ? warningColor : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)') }}
              >
                {task.name}
              </span>

              {/* Circular metrics - all visible in grid */}
              <div className="flex justify-center">
                <CircularProgress
                  value={task.success.value}
                  maxValue={100}
                  color={task.highlight ? warningColor : accentColor}
                  label={task.success.label}
                  delay={index * 100 + 150}
                  size={28}
                />
              </div>
              <div className="flex justify-center">
                <CircularProgress
                  value={task.time.value}
                  maxValue={maxTime}
                  color={task.highlight ? warningColor : accentColor}
                  label={task.time.label}
                  delay={index * 100 + 200}
                  size={28}
                />
              </div>
              <div className="flex justify-center">
                <CircularProgress
                  value={task.ease.value}
                  maxValue={maxEase}
                  color={task.highlight ? warningColor : accentColor}
                  label={task.ease.label}
                  delay={index * 100 + 250}
                  size={28}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * UsabilityResultsValidation - Follow-up testing results showing improvement
 */
export function UsabilityResultsValidation() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const tasks = [
    {
      name: 'Turn on AC',
      success: { value: 100, label: '100%' },
      time: { value: 2.4, label: '2.4s' },
      ease: { value: 6.7, label: '6.7' },
      highlight: false,
    },
    {
      name: 'Change fan speed',
      success: { value: 100, label: '100%' },
      time: { value: 4.8, label: '4.8s' },
      ease: { value: 6.3, label: '6.3' },
      highlight: 'success', // green highlight for improvement
    },
    {
      name: 'Sync temperatures',
      success: { value: 100, label: '100%' },
      time: { value: 3.8, label: '3.8s' },
      ease: { value: 6.3, label: '6.3' },
      highlight: false,
    },
    {
      name: 'Change airflow direction',
      success: { value: 100, label: '100%' },
      time: { value: 4.6, label: '4.6s' },
      ease: { value: 6.3, label: '6.3' },
      highlight: false,
    },
  ]

  const maxTime = 23 // keep same scale for comparison
  const maxEase = 7
  const successColor = '#4CAF50'
  const accentColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
  const trackColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  const CircularProgress = ({ value, maxValue, color, label, delay, size = 32 }) => {
    const percentage = (value / maxValue) * 100
    const radius = (size - 4) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth="3"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            style={{
              transition: 'stroke-dashoffset 0.8s ease-out',
              transitionDelay: `${delay}ms`,
            }}
          />
        </svg>
        <span
          className="font-mono text-[10px] md:text-[11px]"
          style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
        >
          {label}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 lg:p-10 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        {/* Header row - visible on all sizes */}
        <div className="grid grid-cols-[1fr_40px_40px_40px] min-[510px]:grid-cols-[1fr_50px_50px_50px] gap-4 min-[510px]:gap-6 mb-3 pb-3 border-b items-end"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        >
          <span
            className="font-mono text-[10px] min-[510px]:text-[11px] tracking-wide uppercase"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          >
            Task
          </span>
          <span
            className="font-mono text-[10px] min-[510px]:text-[11px] tracking-wide uppercase text-center"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          >
            Success
          </span>
          <span
            className="font-mono text-[10px] min-[510px]:text-[11px] tracking-wide uppercase text-center"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          >
            Time
          </span>
          <span
            className="font-mono text-[10px] min-[510px]:text-[11px] tracking-wide uppercase text-center"
            style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
          >
            Ease
          </span>
        </div>

        <div className="space-y-1">
          {tasks.map((task, index) => {
            const isSuccess = task.highlight === 'success'
            const rowColor = isSuccess ? successColor : accentColor
            return (
              <div
                key={task.name}
                className={`grid grid-cols-[1fr_40px_40px_40px] min-[510px]:grid-cols-[1fr_50px_50px_50px] gap-4 min-[510px]:gap-6 py-2 px-3 -mx-3 rounded-lg items-center ${
                  isSuccess
                    ? isDark ? 'bg-green-500/10' : 'bg-green-500/5'
                    : ''
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.5s ease-out, transform 0.5s ease-out`,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <span
                  className="font-mono text-[11px] min-[510px]:text-[12px] tracking-wide"
                  style={{ color: isSuccess ? successColor : (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)') }}
                >
                  {task.name}
                </span>

                {/* Circular metrics - all visible in grid */}
                <div className="flex justify-center">
                  <CircularProgress
                    value={task.success.value}
                    maxValue={100}
                    color={rowColor}
                    label={task.success.label}
                    delay={index * 100 + 150}
                    size={28}
                  />
                </div>
                <div className="flex justify-center">
                  <CircularProgress
                    value={task.time.value}
                    maxValue={maxTime}
                    color={rowColor}
                    label={task.time.label}
                    delay={index * 100 + 200}
                    size={28}
                  />
                </div>
                <div className="flex justify-center">
                  <CircularProgress
                    value={task.ease.value}
                    maxValue={maxEase}
                    color={rowColor}
                    label={task.ease.label}
                    delay={index * 100 + 250}
                    size={28}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * StyleComparisonToggle - Horizontal grid showing Hybrid vs Neumorphic in Dark/Light modes
 */
export function StyleComparisonToggle() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const concepts = [
    { src: '/assets/projects/indi-ev/content/concept-dark-neumorphic.png', label: 'Neumorphic', winner: false },
    { src: '/assets/projects/indi-ev/content/concept-dark-hybrid.png', label: 'Hybrid', winner: true },
    { src: '/assets/projects/indi-ev/content/concept-light-neumorphic.png', label: 'Neumorphic', winner: false },
    { src: '/assets/projects/indi-ev/content/concept-light-hybrid.png', label: 'Hybrid', winner: true },
  ]

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {concepts.map((concept, index) => (
          <figure
            key={`${concept.label}-${index}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: `all 0.5s ease-out ${index * 100}ms`,
            }}
          >
            <div
              className={`overflow-hidden rounded-xl ${
                isDark ? 'bg-[#111111]' : 'bg-gray-100'
              }`}
            >
              <img
                src={concept.src}
                alt={concept.label}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-2 flex items-center justify-center gap-1">
              <Caption className="theme-caption">
                {concept.label}
              </Caption>
              {concept.winner && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill={colors.lilac}>
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
