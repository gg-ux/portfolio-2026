import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('enter') // enter, loading, complete, exit
  const [gradientRotation, setGradientRotation] = useState(0)
  const { isDark } = useTheme()

  // Circle properties
  const size = 80
  const strokeWidth = 1.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    // Logo fades in
    const loadingTimer = setTimeout(() => {
      setPhase('loading')
    }, 400)

    // Ring completes filling
    const completeTimer = setTimeout(() => {
      setPhase('complete')
    }, 1800)

    // Begin exit
    const exitTimer = setTimeout(() => {
      setPhase('exit')
    }, 2400)

    // Unmount
    const unmountTimer = setTimeout(() => {
      onComplete?.()
    }, 3200)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(completeTimer)
      clearTimeout(exitTimer)
      clearTimeout(unmountTimer)
    }
  }, [onComplete])

  // Rotate gradient while loading
  useEffect(() => {
    if (phase !== 'loading' && phase !== 'complete') return

    const interval = setInterval(() => {
      setGradientRotation(prev => (prev + 2) % 360)
    }, 16)

    return () => clearInterval(interval)
  }, [phase])

  // Calculate stroke offset based on phase
  const getStrokeOffset = () => {
    if (phase === 'enter') return circumference
    if (phase === 'loading') return 0
    return 0
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity`}
      style={{
        backgroundColor: isDark ? '#0a0a0a' : '#FAF8F4',
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
        opacity: phase === 'exit' ? 0 : 1,
        transitionDuration: '800ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Bloom glow on completion */}
        <div
          className="absolute rounded-full transition-all"
          style={{
            width: size + 40,
            height: size + 40,
            background: `radial-gradient(circle, rgba(167, 139, 250, ${phase === 'complete' ? 0.4 : 0}) 0%, rgba(167, 139, 250, ${phase === 'complete' ? 0.2 : 0}) 50%, transparent 70%)`,
            filter: 'blur(20px)',
            opacity: phase === 'complete' ? 1 : 0,
            transform: phase === 'complete' ? 'scale(1.2)' : 'scale(0.8)',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Progress ring */}
        <svg
          width={size}
          height={size}
          className="absolute transition-all"
          style={{
            transform: 'rotate(-90deg)',
            opacity: phase === 'exit' ? 0 : phase === 'enter' ? 0 : 1,
            filter: phase === 'exit'
              ? 'blur(8px)'
              : phase === 'loading' || phase === 'complete'
              ? 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.5)) drop-shadow(0 0 16px rgba(15, 118, 110, 0.3))'
              : 'none',
            transitionDuration: phase === 'exit' ? '800ms' : '400ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <defs>
            <linearGradient
              id="progressGradient"
              gradientTransform={`rotate(${gradientRotation}, 0.5, 0.5)`}
            >
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="50%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={getStrokeOffset()}
            style={{
              transition: phase === 'loading'
                ? 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)'
                : 'none',
            }}
          />
        </svg>

        {/* Logo with breathing pulse */}
        <img
          src="/images/branding/logo.svg"
          alt="Grace Guo"
          className={`h-6 w-auto transition-all ${isDark ? 'invert' : ''} ${
            phase === 'loading' ? 'animate-breathe' : ''
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDuration: phase === 'exit' ? '800ms' : '500ms',
            opacity: phase === 'enter' ? 0 : phase === 'exit' ? 0 : 1,
            filter: phase === 'enter'
              ? 'blur(8px)'
              : phase === 'exit'
              ? 'blur(16px)'
              : 'blur(0)',
            transform: phase === 'enter'
              ? 'scale(0.8)'
              : phase === 'exit'
              ? 'scale(1.1)'
              : 'scale(1)',
          }}
        />
      </div>
    </div>
  )
}
