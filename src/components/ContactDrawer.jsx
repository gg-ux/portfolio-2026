import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkle, LinkedinLogo, Envelope } from '@phosphor-icons/react'
import { useTheme } from '../context/ThemeContext'
import { useContactDrawer } from '../context/ContactDrawerContext'
import { H2, Body } from './Typography'
import ContactForm from './ContactForm'

export default function ContactDrawer() {
  const { isDark } = useTheme()
  const { isOpen, closeDrawer } = useContactDrawer()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeDrawer])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 right-0 h-full w-full max-w-lg z-[999] overflow-hidden ${
              isDark ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'
            }`}
            style={{
              boxShadow: isDark
                ? '-10px 0 40px rgba(0,0,0,0.5)'
                : '-10px 0 40px rgba(0,0,0,0.1)',
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6">
              <div /> {/* Spacer */}
              <button
                onClick={closeDrawer}
                className={`p-2 rounded-full transition-colors ${
                  isDark
                    ? 'hover:bg-white/10 text-white/60 hover:text-white'
                    : 'hover:bg-black/5 text-black/60 hover:text-black'
                }`}
              >
                <X size={24} weight="light" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-[calc(100%-72px)] px-8">
              <div>
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <H2>Say hello</H2>
                    <Sparkle
                      size={28}
                      weight="fill"
                      style={{ color: '#DBA166' }}
                    />
                  </div>
                  <Body className={`${isDark ? 'text-white/50' : 'text-black/50'}`}>
                    Let's make something meaningful together.
                  </Body>
                </div>
                <ContactForm />
              </div>

              {/* Footer with email and social - pinned to bottom */}
              <div className={`mt-auto pt-8 pb-10 border-t ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}>
                <div className={`flex flex-wrap items-center gap-6 font-mono text-[11px] tracking-wide`}>
                  <a
                    href="mailto:graceguo.design@gmail.com"
                    className={`flex items-center gap-1.5 transition-colors ${
                      isDark ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
                    }`}
                  >
                    <Envelope size={16} weight="regular" />
                    <span>graceguo.design@gmail.com</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/grace-guo-ux/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 transition-colors ${
                      isDark ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
                    }`}
                  >
                    <LinkedinLogo size={16} weight="regular" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
