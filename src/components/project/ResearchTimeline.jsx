import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// 5 colors from design system palette
const getPhaseColors = (isDark) => ({
  violetTwilight: isDark ? '#7C3AED' : '#5B21B6',
  brightLavender: isDark ? '#C084FC' : '#A855F7',
  dustyRose: isDark ? '#D4A5A5' : '#BE8585',
  dustyBlue: isDark ? '#7A9AC4' : '#5B7A9E',
  softSlate: isDark ? '#A8BCD8' : '#98AACA',
})

const phases = [
  {
    name: 'Planning',
    colorKey: 'violetTwilight',
    startWeek: 0,
    duration: 4,
    tasks: ['Agreement with Client Draft (2 weeks)', 'Agreement with Client Final (2 weeks)'],
  },
  {
    name: 'Discover',
    colorKey: 'brightLavender',
    startWeek: 0,
    duration: 8,
    tasks: ['Exploratory Research (6 weeks)'],
  },
  {
    name: 'Define',
    colorKey: 'dustyRose',
    startWeek: 8,
    duration: 3,
    tasks: ['Synthesis of Research (2 weeks)', 'Research Brief (1 week)'],
  },
  {
    name: 'Develop',
    colorKey: 'dustyBlue',
    startWeek: 10,
    duration: 5,
    tasks: ['Prototyping (4 weeks)', 'User Testing + Iterations (1 week)'],
  },
  {
    name: 'Deliver',
    colorKey: 'softSlate',
    startWeek: 14,
    duration: 2,
    tasks: ['Validated Prototype (1 week)', 'Final Deliverable (1 week)'],
  },
]

const months = ['April', 'May', 'June', 'July', 'August']
const totalWeeks = 20 // 5 months × 4 weeks

export default function ResearchTimeline() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const colors = getPhaseColors(isDark)

  return (
    <div
      ref={ref}
      className={`my-8 md:my-12 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`rounded-2xl p-6 md:p-8 ${isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'}`}>
        {/* Header */}
        <h3
          className="font-mono text-sm tracking-wide uppercase font-medium mb-6 md:mb-8"
          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
        >
          Project Timeline (Apr – June 2019)
        </h3>

        {/* Gantt Chart - same layout for all screen sizes */}
        <div className="mb-8 md:mb-10">
          <div className="flex">
            {/* Phase labels column */}
            <div className="w-16 sm:w-20 md:w-24 flex flex-col justify-around pr-2 md:pr-4" style={{ height: `${phases.length * 2.5}rem` }}>
              {phases.map((phase) => (
                <div
                  key={phase.name}
                  className="text-right font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wide uppercase font-medium"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                >
                  {phase.name}
                </div>
              ))}
            </div>

            {/* Chart area with continuous grid lines */}
            <div className="flex-1 relative" style={{ height: `${phases.length * 2.5}rem` }}>
              {/* Continuous vertical grid lines - dashed */}
              <div className="absolute inset-0 flex">
                {months.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-l border-dashed"
                    style={{
                      borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
              </div>

              {/* Progress bars */}
              {phases.map((phase, index) => {
                const phaseColor = colors[phase.colorKey]
                const rowHeight = 100 / phases.length
                const topPosition = rowHeight * index + rowHeight / 2
                return (
                  <div
                    key={phase.name}
                    className="absolute h-1 rounded-full transition-all duration-700"
                    style={{
                      top: `${topPosition}%`,
                      left: `${(phase.startWeek / totalWeeks) * 100}%`,
                      width: `${(phase.duration / totalWeeks) * 100}%`,
                      backgroundColor: phaseColor,
                      transitionDelay: `${index * 100}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(-50%) scaleX(1)' : 'translateY(-50%) scaleX(0)',
                      transformOrigin: 'left',
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* Month labels at bottom */}
          <div className="flex mt-4 ml-16 sm:ml-20 md:ml-24">
            {months.map((month) => (
              <div
                key={month}
                className="flex-1 font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-wide uppercase"
                style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>

        {/* Legend - 2 columns on all sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {phases.map((phase, index) => {
            const phaseColor = colors[phase.colorKey]
            return (
              <div key={phase.name} className="flex gap-3">
                {/* Number */}
                <span
                  className="font-mono text-sm font-medium flex-shrink-0 w-5"
                  style={{ color: phaseColor }}
                >
                  {index + 1}.
                </span>
                <div>
                  <div
                    className="font-mono text-[11px] tracking-wide uppercase font-medium mb-1"
                    style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }}
                  >
                    {phase.name}
                  </div>
                  <div className="space-y-0.5">
                    {phase.tasks.map((task, i) => (
                      <div
                        key={i}
                        className="text-sm"
                        style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                      >
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
