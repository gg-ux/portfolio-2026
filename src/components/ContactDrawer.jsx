import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
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
            className={`fixed top-0 right-0 h-full w-full max-w-lg z-[999] overflow-y-auto ${
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
            <div className="px-8 pb-12">
              <H2 className="mb-8">Say hello</H2>
              <ContactForm />

              {/* Email fallback */}
              <div className={`mt-8 pt-8 border-t ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}>
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
