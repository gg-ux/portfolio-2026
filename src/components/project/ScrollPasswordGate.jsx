import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../ui/Button'
import { X } from '@phosphor-icons/react'

/**
 * ScrollPasswordGate - NYT-style paywall for project pages
 * Shows content until a specified section, then locks scroll and shows password modal
 */
export default function ScrollPasswordGate({
  sectionId,
  password,
  storageKey,
  subtitle = 'Full case study is confidential',
  children,
}) {
  const { isDark } = useTheme()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(storageKey) === 'true'
  })
  const [showGate, setShowGate] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const gateTriggered = useRef(false)

  useEffect(() => {
    if (isAuthenticated) return

    const section = document.getElementById(sectionId)
    if (!section) return

    // Use Intersection Observer for reliable detection during fast scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !gateTriggered.current) {
            gateTriggered.current = true
            setShowGate(true)
            document.body.style.overflow = 'hidden'
          }
        })
      },
      {
        // Trigger when section is 40% from top of viewport
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0,
      }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [isAuthenticated, sectionId])

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordInput === password) {
      setIsAnimatingOut(true)
      setTimeout(() => {
        sessionStorage.setItem(storageKey, 'true')
        setIsAuthenticated(true)
        setShowGate(false)
        document.body.style.overflow = ''
      }, 400)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  // If authenticated, just render children
  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <>
      {children}

      {/* Overlay with gradient */}
      {showGate && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
            isAnimatingOut ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ overscrollBehavior: 'contain', touchAction: 'none' }}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          {/* Gradient overlay - stronger at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.7) 30%, rgba(10,10,10,0.95) 60%, rgba(10,10,10,1) 80%)'
                : 'linear-gradient(to bottom, rgba(250,248,244,0) 0%, rgba(250,248,244,0.7) 30%, rgba(250,248,244,0.95) 60%, rgba(250,248,244,1) 80%)',
            }}
          />

          {/* Password modal */}
          <form
            onSubmit={handlePasswordSubmit}
            className={`relative z-10 p-10 rounded-2xl text-center max-w-[400px] w-full mx-4 transform transition-all duration-500 ${
              isAnimatingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            } ${
              isDark
                ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/[0.08]'
                : 'bg-white/90 backdrop-blur-xl shadow-2xl'
            }`}
            style={{
              animation: !isAnimatingOut ? 'slideUp 0.5s ease-out' : undefined,
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setShowGate(false)
                document.body.style.overflow = ''
                // Scroll up to get out of trigger zone
                window.scrollBy({ top: -300, behavior: 'smooth' })
                // Reset trigger after scroll completes so popup re-appears if they scroll back down
                setTimeout(() => {
                  gateTriggered.current = false
                }, 400)
              }}
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                isDark
                  ? 'text-white/40 hover:text-white/70 hover:bg-white/[0.06]'
                  : 'text-black/40 hover:text-black/70 hover:bg-black/[0.04]'
              }`}
            >
              <X size={20} weight="regular" />
            </button>

            <h2 className="font-satoshi text-xl font-semibold theme-heading mb-2">
              Enter password to continue
            </h2>
            <p className="font-satoshi text-base theme-muted mb-6">
              {subtitle}
            </p>
            <input
              type="password"
              className={`w-full h-12 px-4 rounded-lg font-satoshi text-base mb-3 outline-none transition-colors ${
                isDark
                  ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/40 focus:border-white/20'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400'
              } ${passwordError ? '!border-red-500' : ''}`}
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            <Button type="submit" variant="primary" className="w-full h-12">
              Continue
            </Button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-3">Incorrect password</p>
            )}
          </form>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
