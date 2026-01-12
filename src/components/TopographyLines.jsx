import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function TopographyLines() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()
  const mouseRef = useRef({ x: -1000, y: -1000, smoothX: -1000, smoothY: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resize()

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resize)

    // Match the VoronoiAura shader's noise functions
    const mod289 = (x) => x - Math.floor(x / 289) * 289
    const permute = (x) => mod289((x * 34 + 1) * x)

    // Simplex-like 2D noise to match shader
    const snoise = (x, y) => {
      const C_x = 0.211324865405187
      const C_y = 0.366025403784439

      let i_x = Math.floor(x + (x + y) * C_y)
      let i_y = Math.floor(y + (x + y) * C_y)

      let x0_x = x - i_x + (i_x + i_y) * C_x
      let x0_y = y - i_y + (i_x + i_y) * C_x

      let i1_x = x0_x > x0_y ? 1 : 0
      let i1_y = x0_x > x0_y ? 0 : 1

      let x1_x = x0_x - i1_x + C_x
      let x1_y = x0_y - i1_y + C_x
      let x2_x = x0_x - 1.0 + 2.0 * C_x
      let x2_y = x0_y - 1.0 + 2.0 * C_x

      i_x = mod289(i_x)
      i_y = mod289(i_y)

      let p1 = permute(permute(i_y) + i_x)
      let p2 = permute(permute(i_y + i1_y) + i_x + i1_x)
      let p3 = permute(permute(i_y + 1) + i_x + 1)

      let m1 = Math.max(0.5 - x0_x*x0_x - x0_y*x0_y, 0)
      let m2 = Math.max(0.5 - x1_x*x1_x - x1_y*x1_y, 0)
      let m3 = Math.max(0.5 - x2_x*x2_x - x2_y*x2_y, 0)

      m1 = m1 * m1 * m1 * m1
      m2 = m2 * m2 * m2 * m2
      m3 = m3 * m3 * m3 * m3

      let grad1 = (p1 % 7) / 3.5 - 1
      let grad2 = (p2 % 7) / 3.5 - 1
      let grad3 = (p3 % 7) / 3.5 - 1

      return 70 * (m1 * grad1 * x0_x + m2 * grad2 * x1_x + m3 * grad3 * x2_x)
    }

    // FBM - reduced octaves for performance
    const fbm = (x, y) => {
      let value = 0
      let amplitude = 0.5
      for (let i = 0; i < 3; i++) {
        value += amplitude * snoise(x, y)
        x *= 2
        y *= 2
        amplitude *= 0.5
      }
      return value
    }

    let animationId
    let startTime = performance.now()

    const animate = (timestamp) => {
      const elapsed = (timestamp - startTime) / 1000

      const width = window.innerWidth
      const height = window.innerHeight
      const mouse = mouseRef.current

      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.08
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.08

      ctx.clearRect(0, 0, width, height)

      const lineColor = isDark ? 'rgba(255, 255, 255,' : 'rgba(0, 0, 0,'
      const cellSize = 6 // Smaller for smoother lines
      const numContours = 18

      const cols = Math.ceil(width / cellSize) + 1
      const rows = Math.ceil(height / cellSize) + 1
      const elevations = []

      // Simple organic topography - independent of VoronoiAura
      const slowDrift = elapsed * 0.015

      for (let row = 0; row < rows; row++) {
        elevations[row] = []
        for (let col = 0; col < cols; col++) {
          const px = col * cellSize
          const py = row * cellSize

          // Normalize coordinates
          const nx = px / width
          const ny = py / height

          // Create organic flowing elevation with domain warping - LARGER SCALE
          const warpX = fbm(nx * 0.8 + slowDrift, ny * 0.8) * 0.4
          const warpY = fbm(nx * 0.8 + 50, ny * 0.8 + slowDrift * 0.6) * 0.4

          // Main elevation from warped coordinates - lower frequency = larger shapes
          const elevation = fbm(
            (nx + warpX) * 1.2 + slowDrift * 0.3,
            (ny + warpY) * 1.2
          )

          // Mouse creates a gentle hill
          const mx = mouse.smoothX / width
          const my = mouse.smoothY / height
          const dx = nx - mx
          const dy = ny - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const mouseRadius = 0.15
          if (dist < mouseRadius) {
            const influence = Math.pow(1 - dist / mouseRadius, 2)
            elevations[row][col] = elevation + influence * 0.3
          } else {
            elevations[row][col] = elevation
          }
        }
      }

      // Draw contour lines
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (let level = 0; level < numContours; level++) {
        const threshold = -0.4 + (level / numContours) * 0.8 // Even spacing across elevation range

        for (let row = 0; row < rows - 1; row++) {
          for (let col = 0; col < cols - 1; col++) {
            const x = col * cellSize
            const y = row * cellSize
            const centerX = x + cellSize / 2
            const centerY = y + cellSize / 2

            const tl = elevations[row][col]
            const tr = elevations[row][col + 1]
            const br = elevations[row + 1][col + 1]
            const bl = elevations[row + 1][col]

            let caseIndex = 0
            if (tl > threshold) caseIndex |= 1
            if (tr > threshold) caseIndex |= 2
            if (br > threshold) caseIndex |= 4
            if (bl > threshold) caseIndex |= 8

            if (caseIndex === 0 || caseIndex === 15) continue

            const lerp = (a, b, t) => a + (b - a) * Math.max(0, Math.min(1, t))
            const getT = (v1, v2) => {
              if (Math.abs(v2 - v1) < 0.0001) return 0.5
              return (threshold - v1) / (v2 - v1)
            }

            // Mouse highlight
            const dx = centerX - mouse.smoothX
            const dy = centerY - mouse.smoothY
            const dist = Math.sqrt(dx * dx + dy * dy)
            const mouseHighlightRadius = 180

            let opacity = 0.08
            if (dist < mouseHighlightRadius) {
              const intensity = Math.pow(1 - dist / mouseHighlightRadius, 2)
              opacity = 0.08 + intensity * 0.12
            }

            ctx.strokeStyle = lineColor + opacity + ')'
            ctx.lineWidth = 1

            let x1, y1, x2, y2

            switch (caseIndex) {
              case 1: case 14:
                x1 = x; y1 = lerp(y, y + cellSize, getT(tl, bl))
                x2 = lerp(x, x + cellSize, getT(tl, tr)); y2 = y
                break
              case 2: case 13:
                x1 = lerp(x, x + cellSize, getT(tl, tr)); y1 = y
                x2 = x + cellSize; y2 = lerp(y, y + cellSize, getT(tr, br))
                break
              case 3: case 12:
                x1 = x; y1 = lerp(y, y + cellSize, getT(tl, bl))
                x2 = x + cellSize; y2 = lerp(y, y + cellSize, getT(tr, br))
                break
              case 4: case 11:
                x1 = x + cellSize; y1 = lerp(y, y + cellSize, getT(tr, br))
                x2 = lerp(x, x + cellSize, getT(bl, br)); y2 = y + cellSize
                break
              case 5:
                x1 = x; y1 = lerp(y, y + cellSize, getT(tl, bl))
                x2 = lerp(x, x + cellSize, getT(tl, tr)); y2 = y
                ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
                x1 = x + cellSize; y1 = lerp(y, y + cellSize, getT(tr, br))
                x2 = lerp(x, x + cellSize, getT(bl, br)); y2 = y + cellSize
                break
              case 6: case 9:
                x1 = lerp(x, x + cellSize, getT(tl, tr)); y1 = y
                x2 = lerp(x, x + cellSize, getT(bl, br)); y2 = y + cellSize
                break
              case 7: case 8:
                x1 = x; y1 = lerp(y, y + cellSize, getT(tl, bl))
                x2 = lerp(x, x + cellSize, getT(bl, br)); y2 = y + cellSize
                break
              case 10:
                x1 = lerp(x, x + cellSize, getT(tl, tr)); y1 = y
                x2 = x + cellSize; y2 = lerp(y, y + cellSize, getT(tr, br))
                ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
                x1 = x; y1 = lerp(y, y + cellSize, getT(tl, bl))
                x2 = lerp(x, x + cellSize, getT(bl, br)); y2 = y + cellSize
                break
              default:
                continue
            }

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  )
}
