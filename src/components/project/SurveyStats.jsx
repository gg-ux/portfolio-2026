import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ChartTitle } from '../Typography'
import { FacebookLogo, RedditLogo, UsersThree, Heartbeat } from '@phosphor-icons/react'

// Colors from design system palette
const getStatColors = (isDark) => ({
  amethyst: '#5835B0',
  lilac: '#BF92F0',
  rose: '#D78F8D',
  gold: '#DBA166',
})

const stats = [
  {
    label: 'Facebook Groups',
    value: 55,
    colorKey: 'amethyst',
    icon: FacebookLogo,
  },
  {
    label: 'Reddit',
    value: 31,
    colorKey: 'lilac',
    icon: RedditLogo,
  },
  {
    label: 'Personal Networks',
    value: 10,
    colorKey: 'rose',
    icon: UsersThree,
  },
  {
    label: 'Catalia Health Patients',
    value: 4,
    colorKey: 'gold',
    icon: Heartbeat,
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
        <ChartTitle>Where We Recruited Participants</ChartTitle>

        {/* Stats */}
        <div className="space-y-6">
          {stats.map((stat, index) => {
            const statColor = colors[stat.colorKey]
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex items-start gap-4 transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon in circular container */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${statColor}20` }}
                >
                  <Icon size={20} weight="fill" style={{ color: statColor }} />
                </div>

                {/* Label, percentage, and progress bar */}
                <div className="flex-1 pt-0.5">
                  <div className="flex justify-between items-baseline mb-2">
                    <span
                      className="font-mono text-[11px] tracking-wide uppercase font-medium"
                      style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                    >
                      {stat.label}
                    </span>
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                    >
                      {stat.value}%
                    </span>
                  </div>

                  {/* Progress bar */}
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
