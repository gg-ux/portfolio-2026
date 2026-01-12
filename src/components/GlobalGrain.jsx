import { useTheme } from '../context/ThemeContext'

export default function GlobalGrain() {
  const { isDark } = useTheme()

  // Dark mode: pure black grain, normal blend, very low opacity
  // Light mode: neutral gray grain, overlay blend
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
      aria-hidden="true"
    >
      <defs>
        <filter id="global-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            seed="5"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values={isDark
              ? "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"  // Black, alpha from noise
              : "0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.3 0"
            }
            in="noise"
            result="coloredNoise"
          />
        </filter>
      </defs>
      <rect
        width="100%"
        height="100%"
        filter="url(#global-grain)"
        opacity={isDark ? "0.06" : "0.35"}
        style={{ mixBlendMode: isDark ? 'normal' : 'overlay' }}
      />
    </svg>
  )
}
