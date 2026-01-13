import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { H2, Body, Caption } from './Typography'
import { useTheme } from '../context/ThemeContext'
import ContactForm from './ContactForm'

export default function Footer() {
  const [ctaRef, ctaVisible] = useScrollReveal()
  const [footerRef, footerVisible] = useScrollReveal()
  const { isDark } = useTheme()

  return (
    <footer id="contact" className="bg-transparent">
      {/* Contact CTA Section */}
      <div>
        <div
          ref={ctaRef}
          className={`max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40 transition-all duration-1000 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Header */}
            <div>
              <H2 className="mb-6">Have a project in mind?</H2>
              <Body size="lg" className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                I'm always open to discussing new opportunities or creative ideas. Fill out the form and I'll get back to you soon.
              </Body>

              {/* Direct email fallback */}
              <div className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-wide ${
                isDark ? 'text-white/40' : 'text-black/40'
              }`}>
                <span>Or email directly:</span>
                <a
                  href="mailto:graceguo.design@gmail.com"
                  className={`transition-colors ${
                    isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'
                  }`}
                >
                  graceguo.design@gmail.com
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

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
                href="https://linkedin.com/in/grace-guo-ux"
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
