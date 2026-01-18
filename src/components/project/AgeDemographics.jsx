import { useTheme } from '../../context/ThemeContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Person } from '@phosphor-icons/react'

export default function AgeDemographics() {
  const { isDark } = useTheme()
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 })

  // Theme-aware primary accent: Lilac (dark) / Amethyst (light)
  const accentColor = isDark ? '#BF92F0' : '#5835B0'
  const grayColor = isDark ? '#ffffff' : '#6B7280'

  const iconSize = 48

  const data = [
    { percent: 5.1, age: 'Age 19-34' },
    { percent: 7.6, age: 'Age 35-39' },
    { percent: 48.7, age: 'Age 40-54' },
    { percent: 38.4, age: 'Age 55-75' },
  ]

  // Find the max percentage for highlighting
  const maxPercent = Math.max(...data.map(d => d.percent))

  // Calculate opacity for gray icons (min 0.2, max 0.6)
  const getOpacity = (percent) => {
    const normalized = percent / maxPercent
    return 0.2 + (normalized * 0.4) // Range from 0.2 to 0.6 for grays
  }

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div
        className={`rounded-2xl p-8 md:p-10 ${
          isDark ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
        }`}
      >
        <div className="flex justify-around items-end gap-4 md:gap-8">
          {data.map((item, index) => (
            <div
              key={item.age}
              className="flex flex-col items-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.5s ease-out ${index * 0.15}s, transform 0.5s ease-out ${index * 0.15}s`,
              }}
            >
              <Person
                size={iconSize}
                weight="fill"
                style={{
                  color: item.percent === maxPercent ? accentColor : grayColor,
                  opacity: item.percent === maxPercent ? 1 : getOpacity(item.percent),
                }}
              />
              <span
                className="text-xl tracking-normal theme-heading mt-4"
                style={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontWeight: 600,
                }}
              >
                {item.percent}%
              </span>
              <span
                className={`font-mono text-[12px] mt-1 ${
                  isDark ? 'text-white/50' : 'text-black/50'
                }`}
              >
                {item.age}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
