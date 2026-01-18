import { Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ size = 'default', variant = 'default' }) {
  const { isDark, toggleTheme } = useTheme()

  const iconSize = size === 'small' ? 16 : 18

  // Glassmorphic minimal toggle
  if (variant === 'glass') {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-center gap-2 px-2 py-1.5 rounded-full transition-all duration-300 ${
          isDark
            ? 'bg-white/[0.04] hover:bg-white/[0.08]'
            : 'bg-black/[0.03] hover:bg-black/[0.06]'
        }`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <Sun
          size={14}
          weight="fill"
          className={`transition-all duration-300 ${
            isDark ? 'text-white/20 scale-90' : 'text-amber-500 scale-110'
          }`}
          style={{
            filter: isDark ? 'none' : 'drop-shadow(0 1px 2px rgba(245, 158, 11, 0.4))'
          }}
        />
        <span className={`w-px h-3 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
        <Moon
          size={14}
          weight="fill"
          className={`transition-all duration-300 ${
            isDark ? 'text-violet-400 scale-110' : 'text-black/20 scale-90'
          }`}
          style={{
            filter: isDark ? 'drop-shadow(0 1px 2px rgba(167, 139, 250, 0.4))' : 'none'
          }}
        />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 group focus:outline-none"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun icon */}
      <div
        className="absolute transition-all duration-500 ease-out"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(-90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
          color: '#f59e0b',
        }}
      >
        <Sun size={iconSize} weight="fill" />
      </div>

      {/* Moon icon */}
      <div
        className="absolute transition-all duration-500 ease-out"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.5)',
          color: '#a78bfa',
        }}
      >
        <Moon size={iconSize} weight="fill" />
      </div>
    </button>
  )
}
