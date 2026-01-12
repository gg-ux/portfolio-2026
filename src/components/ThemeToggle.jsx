import { Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ size = 'default' }) {
  const { isDark, toggleTheme } = useTheme()

  const iconSize = size === 'small' ? 16 : 18

  return (
    <button
      onClick={toggleTheme}
      className="relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 group"
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
