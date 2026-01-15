import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Caption } from './Typography'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const [footerRef, footerVisible] = useScrollReveal()
  const { isDark } = useTheme()

  return (
    <footer className="bg-transparent">
      {/* Bottom Footer */}
      <div className={`border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'}`}>
        <div
          ref={footerRef}
          className={`max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-12 transition-all duration-1000 ${
            footerVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Copyright */}
            <Caption scramble={false} className={isDark ? 'text-gray-600' : 'text-gray-500'}>
              &copy; Grace Guo {new Date().getFullYear()}
            </Caption>

            {/* Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/grace-guo-ux/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-600 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Caption>LinkedIn</Caption>
              </a>
              <span className={isDark ? 'text-gray-700' : 'text-gray-400'}>·</span>
              <Link
                to="/playground"
                className={`transition-colors duration-300 ${isDark ? 'text-gray-600 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <Caption>Playground</Caption>
              </Link>
            </div>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`transition-colors duration-300 flex items-center gap-2 group ${
                isDark ? 'text-gray-600 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Caption trigger="hover" className={isDark ? 'text-gray-600 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'}>
                Back to top
              </Caption>
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
