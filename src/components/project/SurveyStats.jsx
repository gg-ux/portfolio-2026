import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

// Colors from design system palette
const getStatColors = (isDark) => ({
  violetTwilight: isDark ? '#7C3AED' : '#5B21B6',
  brightLavender: isDark ? '#C084FC' : '#A855F7',
  dustyRose: isDark ? '#D4A5A5' : '#BE8585',
  dustyBlue: isDark ? '#7A9AC4' : '#5B7A9E',
})

const stats = [
  {
    label: 'Facebook Groups',
    value: 55,
    colorKey: 'violetTwilight',
  },
  {
    label: 'Reddit',
    value: 31,
    colorKey: 'brightLavender',
  },
  {
    label: 'Personal Networks',
    value: 10,
    colorKey: 'dustyRose',
  },
  {
    label: 'Catalia Health Patients',
    value: 4,
    colorKey: 'dustyBlue',
  },
]

export default function SurveyStats() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 })

  const colors = getStatColors(isDark)

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
          Where Patients Engage Online
        </h3>

        {/* Stats */}
        <div className="space-y-6">
          {stats.map((stat, index) => {
            const statColor = colors[stat.colorKey]
            return (
              <div
                key={stat.label}
                className="transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Label and percentage row */}
                <div className="flex justify-between items-baseline mb-2">
                  <span
                    className="font-mono text-[11px] tracking-wide uppercase font-medium"
                    style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                  >
                    {stat.label}
                  </span>
                  <span
                    className="font-mono text-sm font-medium"
                    style={{ color: statColor }}
                  >
                    {stat.value}%
                  </span>
                </div>

                {/* Progress bar - 4px height */}
                <div
                  className="h-1 rounded-full w-full"
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${stat.value}%`,
                      backgroundColor: statColor,
                      transitionDelay: `${index * 100 + 200}ms`,
                      transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                    }}
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
