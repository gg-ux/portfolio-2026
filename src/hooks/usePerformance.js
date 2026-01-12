import { useState, useEffect } from 'react'

/**
 * Detects device performance capabilities
 * Returns true if device can handle heavy effects
 */
export function usePerformance() {
  const [canHandleEffects, setCanHandleEffects] = useState(true)

  useEffect(() => {
    // Check for low-end device indicators
    const checks = {
      // Low memory (< 4GB)
      lowMemory: navigator.deviceMemory && navigator.deviceMemory < 4,
      // Slow CPU (< 4 cores)
      lowCores: navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4,
      // Mobile device
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      // Prefers reduced motion
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      // No WebGL support or software rendering
      weakGPU: (() => {
        try {
          const canvas = document.createElement('canvas')
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
          if (!gl) return true
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            // Check for software renderers
            return /SwiftShader|Software|llvmpipe/i.test(renderer)
          }
          return false
        } catch {
          return true
        }
      })(),
    }

    // If any significant indicator is true, disable heavy effects
    const isLowEnd = checks.lowMemory || checks.weakGPU || checks.prefersReducedMotion ||
                     (checks.isMobile && checks.lowCores)

    setCanHandleEffects(!isLowEnd)
  }, [])

  return canHandleEffects
}

export default usePerformance
