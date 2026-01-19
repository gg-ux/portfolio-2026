import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { getColor } from '../constants/colors'

/**
 * FluidityLoader - Welcome loader with Soulful color palette
 *
 * Same concept as the Welcome Loader but using the Soulful colors:
 * - Lilac #BF92F0
 * - Amethyst (theme-aware)
 * - Rose #D78F8D
 *
 * Features:
 * - Progress ring that fills then fades with blur
 * - Rotating gradient
 * - Bloom glow on completion
 * - Logo breathing animation
 * - Blur fade out at completion
 */
export default function FluidityLoader({ onComplete, duration = 4000, contained = false }) {
  const { isDark } = useTheme()
  const [key, setKey] = useState(0)

  // Theme-aware brand colors
  const amethyst = getColor('amethyst', isDark)
  const lilac = getColor('lilac', isDark)
  const rose = getColor('rose', isDark)

  // Call onComplete when animation finishes
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, duration)
      return () => clearTimeout(timer)
    }
  }, [onComplete, duration, key])

  const animationDuration = `${duration / 1000}s`

  const content = (
    <>
      {/* Keyframes */}
      <style>{`
        @keyframes fluidity-ring-fill {
          0% { stroke-dashoffset: 245; }
          40%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes fluidity-gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fluidity-bloom {
          0%, 40% { opacity: 0; transform: scale(0.8); }
          60%, 80% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.4); }
        }
        @keyframes fluidity-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fluidity-fade {
          0%, 10% { opacity: 0; filter: blur(8px); }
          25%, 75% { opacity: 1; filter: blur(0); }
          90%, 100% { opacity: 0; filter: blur(8px); }
        }
      `}</style>

      <div key={key} className="relative flex items-center justify-center">
        {/* Bloom glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            background: `radial-gradient(circle, ${lilac}66 0%, ${amethyst}33 50%, transparent 70%)`,
            filter: 'blur(20px)',
            animation: `fluidity-bloom ${animationDuration} ease-in-out`,
          }}
        />

        {/* Progress ring */}
        <svg
          width={80}
          height={80}
          className="absolute"
          style={{
            transform: 'rotate(-90deg)',
            filter: `drop-shadow(0 0 8px ${lilac}80) drop-shadow(0 0 16px ${amethyst}4D)`,
            animation: `fluidity-fade ${animationDuration} ease-in-out`,
          }}
        >
          <defs>
            <linearGradient id="fluidityLoaderGradient">
              <stop offset="0%" stopColor={lilac} />
              <stop offset="50%" stopColor={amethyst} />
              <stop offset="100%" stopColor={rose} />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                from="0 0.5 0.5"
                to="360 0.5 0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx={40}
            cy={40}
            r={39}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1.5}
          />
          {/* Progress circle */}
          <circle
            cx={40}
            cy={40}
            r={39}
            fill="none"
            stroke="url(#fluidityLoaderGradient)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray={245}
            strokeDashoffset={245}
            style={{
              animation: `fluidity-ring-fill ${animationDuration} ease-in-out forwards`,
            }}
          />
        </svg>

        {/* Logo */}
        <img
          src="/assets/branding/logo.svg"
          alt="Logo"
          className={`h-6 w-auto relative ${isDark ? 'invert' : ''}`}
          style={{
            animation: `fluidity-breathe 2s ease-in-out infinite, fluidity-fade ${animationDuration} ease-in-out`,
          }}
        />
      </div>
    </>
  )

  if (contained) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0f]">
      {content}
    </div>
  )
}
