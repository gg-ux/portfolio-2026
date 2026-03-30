import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { House } from '@phosphor-icons/react'

export default function NotFoundPage() {
  const { isDark } = useTheme()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      {/* 404 */}
      <h1
        className="font-silk text-[clamp(120px,25vw,200px)] leading-none tracking-tight select-none"
        style={{
          color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        }}
      >
        404
      </h1>

      {/* Message */}
      <div className="text-center -mt-8 md:-mt-12">
        <h2
          className="font-silk text-2xl md:text-3xl mb-8"
          style={{ color: isDark ? '#fff' : '#1a1a1a' }}
        >
          This page doesn't exist
        </h2>

        {/* Back home button */}
        <Link
          to="/"
          className={`group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-normal px-7 py-3 rounded-md transition-all duration-300 ${
            isDark
              ? 'bg-white text-black hover:bg-white/90'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          <House size={14} weight="bold" />
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  )
}
