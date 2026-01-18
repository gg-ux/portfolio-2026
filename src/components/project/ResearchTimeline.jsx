import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Caption, Body, ChartTitle } from '../Typography'

// 5 colors from design system palette
const getPhaseColors = (isDark) => ({
  amethyst: '#5835B0',
  lilac: '#BF92F0',
  rose: '#D78F8D',
  gold: '#DBA166',
  turquoise: '#36CBC6',
})

const phases = [
  {
    name: 'Planning',
    colorKey: 'amethyst',
    startWeek: 0,
    duration: 5,
    tasks: ['Agreement with Client Draft (2 weeks)', 'Agreement with Client Final (2 weeks)'],
  },
  {
    name: 'Discover',
    colorKey: 'lilac',
    startWeek: 0,
    duration: 7,
    tasks: ['Exploratory Research (6 weeks)'],
  },
  {
    name: 'Define',
    colorKey: 'rose',
    startWeek: 7,
    duration: 3,
    tasks: ['Synthesis of Research (2 weeks)', 'Research Brief (1 week)'],
  },
  {
    name: 'Develop',
    colorKey: 'gold',
    startWeek: 8,
    duration: 6,
    tasks: ['Prototyping (4 weeks)', 'User Testing + Iterations (1 week)'],
  },
  {
    name: 'Deliver',
    colorKey: 'turquoise',
    startWeek: 14,
    duration: 3,
    tasks: ['Validated Prototype (1 week)', 'Final Deliverable (1 week)'],
  },
]

const months = ['April', 'May', 'June', 'July', 'August']
const totalWeeks = 20 // 5 months × 4 weeks each

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
        <ChartTitle>Project Timeline (Apr – Aug 2019)</ChartTitle>

        {/* Desktop: Side by side layout */}
        <div className="md:flex md:gap-10">
          {/* Gantt Chart */}
          <div className="mb-8 md:mb-0 md:flex-1">
            <div className="flex">
              {/* Phase labels column */}
              <div className="w-16 sm:w-20 md:w-24 flex flex-col justify-around pr-2 md:pr-4 h-[17.5rem] md:h-[20rem]">
                {phases.map((phase) => (
                  <div key={phase.name} className="text-right">
                    <Caption scramble={false} size="sm" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                      {phase.name}
                    </Caption>
                  </div>
                ))}
              </div>

              {/* Chart area with continuous grid lines */}
              <div className="flex-1 relative h-[17.5rem] md:h-[20rem]">
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
                <div key={month} className="flex-1">
                  <Caption scramble={false} size="sm" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
                    {month}
                  </Caption>
                </div>
              ))}
            </div>
          </div>

          {/* Legend - single column on desktop, 2 columns on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-4 md:w-72">
            {phases.map((phase, index) => {
              const phaseColor = colors[phase.colorKey]
              return (
                <div key={phase.name} className="flex gap-3">
                  {/* Number */}
                  <Caption scramble={false} size="sm" className="flex-shrink-0 w-5" style={{ color: phaseColor }}>
                    {index + 1}.
                  </Caption>
                  <div>
                    <Caption scramble={false} size="sm" className="block mb-1" style={{ color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)' }}>
                      {phase.name}
                    </Caption>
                    <div className="space-y-0.5">
                      {phase.tasks.map((task, i) => (
                        <Body key={i} size="sm" className="mb-0 theme-muted">
                          {task}
                        </Body>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
