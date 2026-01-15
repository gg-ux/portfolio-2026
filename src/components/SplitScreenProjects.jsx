import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { H2, H4, Caption, Body } from './Typography'
import ScrambleText from './ScrambleText'
import { ButtonWithArrow } from './ui/Button'
import { ArrowUp, ArrowDown } from '@phosphor-icons/react'
import { usePerformance } from '../hooks/usePerformance'

// Import project images
import teslaMegaMenuImg from '../assets/projects/tesla/mega menu/mega-menu-card-filled.png'
import teslaChatbotImg from '../assets/projects/tesla/chatbot/chatbot-card-filled.png'
import indiEvImg from '../assets/projects/indi ev/card-indi-ev.png'
import notetracksImg from '../assets/projects/notetracks/notetracks-card-filled.png'
import cataliaImg from '../assets/projects/catalia health/catalia-card-filled.png'

// Simple zoom effect for low-end devices
function SimpleImage({ src, alt, isHovered }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        }}
      />
    </div>
  )
}

// Subtle WebGL Ripple Effect Component - optimized for performance
function RippleImage({ src, alt, isHovered }) {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const uniformsRef = useRef(null) // Cache uniform locations
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const startTimeRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Reset when src changes
  useEffect(() => {
    setImageLoaded(false)
    glRef.current = null
    programRef.current = null
    uniformsRef.current = null
  }, [src])

  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `

  const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_image;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_intensity;

    void main() {
      vec2 uv = v_texCoord;
      vec2 toMouse = uv - u_mouse;
      float dist = length(toMouse);
      float ripple = sin(dist * 10.0 - u_time * 2.0) * exp(-dist * 2.5);
      vec2 displacement = normalize(toMouse + 0.001) * ripple * u_intensity * 0.012;
      gl_FragColor = texture2D(u_image, uv + displacement);
    }
  `

  const initGL = useCallback(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image || !image.complete) return

    const gl = canvas.getContext('webgl', {
      preserveDrawingBuffer: false,
      antialias: false,
      alpha: true
    })
    if (!gl) return

    glRef.current = gl

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)
    programRef.current = program

    // Cache uniform locations
    uniformsRef.current = {
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      time: gl.getUniformLocation(program, 'u_time'),
      intensity: gl.getUniformLocation(program, 'u_intensity'),
    }

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0])
    const texCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)

    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord')
    gl.enableVertexAttribArray(texCoordLocation)
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

    // Draw initial static frame
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uniformsRef.current.mouse, 0.5, 0.5)
    gl.uniform1f(uniformsRef.current.time, 0)
    gl.uniform1f(uniformsRef.current.intensity, 0)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }, [])

  useEffect(() => {
    if (imageLoaded) initGL()
  }, [imageLoaded, initGL])

  // Only run animation loop when hovered
  useEffect(() => {
    const gl = glRef.current
    const program = programRef.current
    const uniforms = uniformsRef.current
    if (!gl || !program || !uniforms) return

    if (!isHovered) {
      // Draw static frame when not hovered
      const canvas = canvasRef.current
      if (canvas) {
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform1f(uniforms.intensity, 0)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      return
    }

    // Start animation when hovered
    startTimeRef.current = performance.now()

    const render = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const time = (performance.now() - startTimeRef.current) / 1000

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uniforms.mouse, mouseRef.current.x, 1.0 - mouseRef.current.y)
      gl.uniform1f(uniforms.time, time)
      gl.uniform1f(uniforms.intensity, 1.0)
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationRef.current = requestAnimationFrame(render)
    }

    render()
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered, imageLoaded])

  const handleMouseMove = (e) => {
    if (!isHovered) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    const canvas = canvasRef.current
    const image = imageRef.current
    if (canvas && image) {
      // Use native image resolution for crisp rendering
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
    }
  }

  return (
    <div className="relative w-full h-full" onMouseMove={handleMouseMove}>
      {/* Show img when not hovered, canvas when hovered */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        onLoad={handleImageLoad}
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200"
        style={{ opacity: isHovered && imageLoaded ? 0 : 1 }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200"
        style={{ opacity: isHovered && imageLoaded ? 1 : 0 }}
      />
    </div>
  )
}

const projects = [
  {
    id: 1,
    name: 'Tesla Assist',
    category: 'AI Chatbot Design',
    image: teslaChatbotImg,
    link: '/project/tesla-chatbot',
    transparent: true,
    bgDark: '#B1CCFF',
    bgLight: '#B1CCFF',
    contribution: 'Designed an AI-powered support chatbot end-to-end, streamlining self-service flows to reduce customer service volume.',
  },
  {
    id: 2,
    name: 'Tesla Mega Menu',
    category: 'Navigation & IA Redesign',
    image: teslaMegaMenuImg,
    link: '/project/tesla-mega-menu',
    transparent: true,
    bgDark: '#30409B',
    bgLight: '#30409B',
    contribution: 'Restructured Tesla.com\'s global navigation and information architecture, improving product discoverability across 30+ markets.',
  },
  {
    id: 3,
    name: 'INDI EV',
    category: 'In-Vehicle Infotainment',
    image: indiEvImg,
    link: '/project/indi-ev',
    transparent: true,
    bgDark: '#000000',
    bgLight: '#000000',
    contribution: 'Led the 0→1 design of an in-vehicle infotainment system, balancing driver safety with intuitive interactions.',
  },
  {
    id: 4,
    name: 'Catalia Health',
    category: 'Patient Community App',
    image: cataliaImg,
    link: '/project/catalia-health',
    bgDark: '#31ECF6',
    bgLight: '#31ECF6',
    contribution: 'Built a patient community platform centered on trust and accessibility, helping users manage chronic conditions through peer support.',
  },
  {
    id: 5,
    name: 'Notetracks',
    category: 'Audio Collaboration Platform',
    image: notetracksImg,
    link: '/project/notetracks',
    bgDark: '#1a1a1a',
    bgLight: '#2a2a2a',
    contribution: 'Shaped the collaboration experience for audio professionals, designing feedback and version control workflows.',
  },
]

function ProjectSlide({ project, isDark, isActive, showText = true, showChip = true }) {
  const bgColor = isDark ? project.bgDark : project.bgLight

  const cardBackground = isDark
    ? `radial-gradient(ellipse at 30% 20%, ${bgColor} 0%, ${project.bgDark}dd 50%, ${project.bgDark} 100%)`
    : `radial-gradient(ellipse at 30% 20%, ${bgColor} 0%, ${project.bgLight}ee 50%, ${project.bgLight} 100%)`

  const cardShadow = isDark
    ? '0 0 0 1px rgba(255,255,255,0.06), 0 8px 16px rgba(0,0,0,0.4), 0 24px 48px rgba(0,0,0,0.4)'
    : '0 0 0 1px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.1)'

  return (
    <Link
      to={project.link}
      className="group block w-full max-w-md mx-auto"
    >
      {/* Image container */}
      <div
        className="relative aspect-square overflow-hidden rounded-2xl"
        style={{
          background: cardBackground,
          boxShadow: cardShadow,
        }}
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          style={{
            imageRendering: '-webkit-optimize-contrast',
          }}
        />

        {/* Category chip - top left */}
        {isActive && showChip && (
          <span
            className={`absolute top-4 left-4 font-mono text-[11px] tracking-wide uppercase px-2.5 pt-[7px] pb-[5px] rounded-md backdrop-blur-sm leading-none ${
              isDark ? 'bg-black/40 text-white/70' : 'bg-white/60 text-black/60'
            }`}
          >
            {project.category}
          </span>
        )}
      </div>

      {/* Text - only show for active card */}
      {showText && (
        <div className="mt-6 text-center">
          <H4 className={`mb-1 transition-colors duration-300 ${isDark ? 'group-hover:text-gray-300' : 'group-hover:text-gray-600'}`}>
            {project.name}
          </H4>
          <Caption trigger="hover" className={isDark ? 'text-gray-500' : 'text-gray-500'}>
            {project.category}
          </Caption>
        </div>
      )}
    </Link>
  )
}

export default function SplitScreenProjects() {
  const { isDark } = useTheme()
  const canHandleEffects = usePerformance()
  const containerRef = useRef(null)
  const carouselRef = useRef(null)
  const craftingRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [morphProgress, setMorphProgress] = useState(0) // 0 = centered, 1 = left-aligned
  const [projectProgress, setProjectProgress] = useState(0) // 0-1 progress through all projects
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null)
  const [craftingVisible, setCraftingVisible] = useState(false)
  const [tiltState, setTiltState] = useState({ x: 0, y: 0 })
  const [isStuck, setIsStuck] = useState(false)
  const [stickWiggle, setStickWiggle] = useState(false)
  const hasTriggeredStuck = useRef(false)

  // Use simple image effect on low-end devices
  const ImageComponent = canHandleEffects ? RippleImage : SimpleImage

  // RAF refs for throttling
  const rafRef = useRef(null)
  const lastValuesRef = useRef({ morphProgress: 0, activeIndex: 0, craftingVisible: false, projectProgress: 0 })
  const viewportHeight = useRef(typeof window !== 'undefined' ? window.innerHeight : 800)

  // Check for mobile/tablet breakpoint and cache viewport height
  const [isMedium, setIsMedium] = useState(false)
  useEffect(() => {
    const checkBreakpoints = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
      setIsMedium(window.innerWidth >= 768) // md breakpoint
      viewportHeight.current = window.innerHeight
    }
    checkBreakpoints()
    window.addEventListener('resize', checkBreakpoints)
    return () => window.removeEventListener('resize', checkBreakpoints)
  }, [])

  // Trigger Crafting animation when scrolled into view (mobile only - desktop uses scroll handler)
  // Also track scroll-based opacity for fade effect
  const [mobileScrollOpacity, setMobileScrollOpacity] = useState(0)
  const [mobileWorksOpacity, setMobileWorksOpacity] = useState(0)
  const [mobileSoulfulFill, setMobileSoulfulFill] = useState(0)
  const mobileRafRef = useRef(null)
  useEffect(() => {
    if (!isMobile) return

    const checkVisibility = () => {
      if (craftingRef.current) {
        const rect = craftingRef.current.getBoundingClientRect()
        const vh = window.innerHeight
        const scrollY = window.scrollY

        // Don't show until user has scrolled past the hero
        // This prevents the section from being faintly visible on small screens at load
        if (scrollY < vh * 0.3) {
          setMobileScrollOpacity(0)
          setMobileWorksOpacity(0)
          mobileRafRef.current = null
          return
        }

        // Calculate opacity based on how far into view the section is
        // Start fading in when section is 80% down the viewport, fully visible at 50%
        const fadeStart = vh * 0.8
        const fadeEnd = vh * 0.4
        const progress = Math.max(0, Math.min(1, (fadeStart - rect.top) / (fadeStart - fadeEnd)))

        setMobileScrollOpacity(progress)

        // "soulful" color fill - starts after text is visible, fills while centered
        const fillStart = vh * 0.5
        const fillEnd = vh * 0.25
        const fillProgress = Math.max(0, Math.min(1, (fillStart - rect.top) / (fillStart - fillEnd)))
        setMobileSoulfulFill(fillProgress)

        // Selected Works fades in later - when Crafting is near center/top
        const worksFadeStart = vh * 0.5
        const worksFadeEnd = vh * 0.1
        const worksProgress = Math.max(0, Math.min(1, (worksFadeStart - rect.top) / (worksFadeStart - worksFadeEnd)))
        setMobileWorksOpacity(worksProgress)

        if (rect.top < vh && !craftingVisible) {
          setCraftingVisible(true)
        }
      }
      mobileRafRef.current = null
    }

    const handleScroll = () => {
      if (mobileRafRef.current) return
      mobileRafRef.current = requestAnimationFrame(checkVisibility)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    checkVisibility() // Check immediately

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (mobileRafRef.current) cancelAnimationFrame(mobileRafRef.current)
    }
  }, [craftingVisible, isMobile])

  // Mobile carousel navigation
  const scrollToCard = (direction) => {
    if (!carouselRef.current) return
    const scrollCardWidth = 280 + 16 // card width + gap
    const newIndex = direction === 'next'
      ? Math.min(activeIndex + 1, projects.length - 1)
      : Math.max(activeIndex - 1, 0)
    setActiveIndex(newIndex)
    carouselRef.current.scrollTo({
      left: newIndex * scrollCardWidth,
      behavior: 'smooth'
    })
  }

  // Keyboard navigation cooldown to prevent skipping
  const lastKeyNavTime = useRef(0)
  const keyNavCooldown = 600 // ms - matches smooth scroll duration

  // Keyboard navigation for desktop - scroll to exact project positions
  useEffect(() => {
    // Skip on mobile/tablet
    if (window.innerWidth < 1024) return

    const handleKeyDown = (e) => {
      // Only handle arrow keys
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return

      const container = containerRef.current
      if (!container) return

      // Check if section is visible
      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight

      // Section must be on screen
      if (rect.bottom < 0 || rect.top > vh) return

      // Only handle keyboard nav when morph is complete (projects are visible)
      if (lastValuesRef.current.morphProgress < 0.95) return

      e.preventDefault()

      // Cooldown check to prevent rapid-fire navigation
      const now = Date.now()
      if (now - lastKeyNavTime.current < keyNavCooldown) return
      lastKeyNavTime.current = now

      const currentIndex = lastValuesRef.current.activeIndex
      const direction = e.key === 'ArrowDown' ? 1 : -1
      const newIndex = Math.max(0, Math.min(projects.length - 1, currentIndex + direction))

      // If at last project and pressing down, scroll to next section
      if (newIndex === currentIndex && direction === 1 && currentIndex === projects.length - 1) {
        const nextSection = document.getElementById('about')
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' })
        }
        return
      }

      // If at first project and pressing up, scroll to center the Crafting blurb
      if (newIndex === currentIndex && direction === -1 && currentIndex === 0) {
        const currentScrollY = window.scrollY
        const sectionTop = currentScrollY + rect.top
        // Target morphProgress ~0.4 (middle of "hold clear" phase where Crafting is centered)
        const targetRectTop = vh * 0.08
        const targetScrollY = sectionTop - targetRectTop

        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        })
        return
      }

      // If already at boundary, don't scroll
      if (newIndex === currentIndex) return

      // Calculate exact scroll position for this project
      const morphStart = vh * 0.6
      const morphEnd = vh * 1.3
      const scrollRange = container.offsetHeight - vh - morphEnd
      const targetProgress = (newIndex + 0.5) / projects.length // Center of project
      const targetScrolled = morphEnd + (targetProgress * scrollRange)
      const targetRectTop = morphStart - targetScrolled

      // Current scroll position relative to section
      const currentScrollY = window.scrollY
      const sectionTop = currentScrollY + rect.top

      // Target scroll position
      const targetScrollY = sectionTop - targetRectTop

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      })
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isMobile) return // Skip on mobile

    const container = containerRef.current
    if (!container) return

    const updateScrollState = () => {
      const rect = container.getBoundingClientRect()
      const vh = window.innerHeight
      const last = lastValuesRef.current

      // Calculate new values
      const newCraftingVisible = rect.top <= vh * 0.5

      let newMorph = 0
      let newActiveIndex = 0
      let newProjectProgress = 0

      // Start morph when section is 60% into view (earlier entrance)
      const morphStart = vh * 0.6
      if (rect.top <= morphStart) {
        const scrolled = morphStart - rect.top
        const morphEnd = vh * 1.3 // total scroll distance for morph phase
        newMorph = Math.min(1, scrolled / morphEnd)

        if (newMorph >= 1) {
          const projectScrollStart = morphEnd
          const totalScrolled = morphStart - rect.top
          newProjectProgress = Math.min(1, (totalScrolled - projectScrollStart) / (container.offsetHeight - vh - projectScrollStart))
          newActiveIndex = Math.min(projects.length - 1, Math.floor(newProjectProgress * projects.length))
        }
      }

      // Only update state if values changed significantly (avoid unnecessary re-renders)
      if (newCraftingVisible !== last.craftingVisible) {
        setCraftingVisible(newCraftingVisible)
        last.craftingVisible = newCraftingVisible
      }
      // Only update morphProgress if change is significant (> 1%)
      if (Math.abs(newMorph - last.morphProgress) > 0.01) {
        setMorphProgress(newMorph)
        last.morphProgress = newMorph
      }
      if (newActiveIndex !== last.activeIndex) {
        setPrevIndex(last.activeIndex)
        setActiveIndex(newActiveIndex)
        last.activeIndex = newActiveIndex
      }
      // Update projectProgress for hint fade-out
      if (Math.abs(newProjectProgress - last.projectProgress) > 0.01) {
        setProjectProgress(newProjectProgress)
        last.projectProgress = newProjectProgress
      }

      rafRef.current = null
    }

    const handleScroll = () => {
      // RAF throttle - only process once per frame
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(updateScrollState)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollState() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  // Easing for smoother animations
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  // "Crafting..." - scroll-based animation
  const vh = viewportHeight.current

  // CRAFTING TIMING:
  // - Fades in: 0→0.2
  // - HOLDS clear: 0.2→0.6 (reading time)
  // - Exits (blur + fade + scroll up): 0.6→0.85
  const opacityIn = Math.min(1, morphProgress / 0.2)
  const opacityOut = Math.max(0, (morphProgress - 0.6) / 0.25)
  const craftingOpacity = Math.min(easeOutCubic(opacityIn), 1 - easeOutCubic(opacityOut))

  // Blur: entrance clears, holds, exit blurs
  const entranceBlur = (1 - easeOutCubic(Math.min(1, morphProgress / 0.35))) * 6
  const exitBlur = easeOutCubic(Math.max(0, (morphProgress - 0.6) / 0.25)) * 8
  const craftingBlur = entranceBlur + exitBlur

  // Scale: subtle settle
  const craftingScale = 1.02 - (Math.min(1, morphProgress / 0.25) * 0.02)

  // Parallax: starts moving up during exit
  const parallaxProgress = Math.max(0, (morphProgress - 0.55) / 0.45)
  const craftingTranslateY = -easeOutCubic(parallaxProgress) * vh * 0.4

  // PROJECT CARD TIMING:
  // - Hidden while Crafting is centered (0→0.6)
  // - Scrolls up from below + fades in (0.6→1.0)
  const projectStart = 0.6

  // Entrance progress: 0.6 → 1.0
  const entranceProgress = Math.max(0, Math.min(1, (morphProgress - projectStart) / (1 - projectStart)))
  const easedEntrance = easeOutCubic(entranceProgress)

  // Position: starts completely offscreen (100%), scrolls up to 0%
  const projectTranslateY = (1 - easedEntrance) * 100 // 100% → 0%

  // Opacity: fades in as it scrolls up
  const projectImagesOpacity = easedEntrance // 0 → 1

  // Scale: starts at unfocused card scale (0.75), grows to 1.0
  const projectImagesScale = 0.75 + (easedEntrance * 0.25) // 0.75 → 1.0

  // "Selected Works" text fades in with card
  const selectedWorksOpacity = easeOutCubic(Math.max(0, (morphProgress - 0.75) / 0.25))

  // "soulful" color fill progress (during hold phase 0.15→0.5)
  const humanFirstFillProgress = Math.max(0, Math.min(1, (morphProgress - 0.15) / 0.35))
  const humanFirstFill = easeOutCubic(humanFirstFillProgress) * 100 // 0% → 100%

  // Scrolljack effect - triggers when "soulful" fill completes (desktop only)
  useEffect(() => {
    if (isMobile) return
    if (hasTriggeredStuck.current) return
    if (humanFirstFill < 100) return

    // Mark as triggered immediately to prevent re-entry
    hasTriggeredStuck.current = true

    // Delay before triggering the scrolljack (let user see completed fill)
    const delayTimeout = setTimeout(() => {
      setIsStuck(true)
      setStickWiggle(true)

      // Lock scroll position
      const lockedScrollY = window.scrollY

      // Aggressively prevent all scrolling
      const preventScroll = (e) => {
        e.preventDefault()
        e.stopPropagation()
        window.scrollTo(0, lockedScrollY)
        return false
      }

      const preventKeyScroll = (e) => {
        const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40] // space, pgup, pgdn, end, home, arrows
        if (scrollKeys.includes(e.keyCode)) {
          e.preventDefault()
          return false
        }
      }

      // Capture phase to intercept before anything else
      document.addEventListener('wheel', preventScroll, { passive: false, capture: true })
      document.addEventListener('touchmove', preventScroll, { passive: false, capture: true })
      document.addEventListener('scroll', preventScroll, { passive: false, capture: true })
      document.addEventListener('keydown', preventKeyScroll, { passive: false, capture: true })

      // Release after animation
      setTimeout(() => {
        setIsStuck(false)
        setStickWiggle(false)
        document.removeEventListener('wheel', preventScroll, { capture: true })
        document.removeEventListener('touchmove', preventScroll, { capture: true })
        document.removeEventListener('scroll', preventScroll, { capture: true })
        document.removeEventListener('keydown', preventKeyScroll, { capture: true })
      }, 1000)
    }, 400)

    return () => {
      clearTimeout(delayTimeout)
    }
  }, [humanFirstFill, isMobile])

  // Mobile/tablet layout
  if (isMobile) {
    // Calculate left padding to match container
    const containerPadding = isMedium ? 48 : 24 // px-6 = 24px, md:px-12 = 48px

    return (
      <section
        className="-mt-32 md:-mt-48 relative z-10"
        style={{
          backgroundColor: isDark ? '#0a0a0a' : '#FAF8F4',
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          opacity: mobileScrollOpacity,
          transition: 'opacity 0.15s ease-out',
        }}
      >
        {/* Centered "Crafting..." blurb */}
        <div
          ref={craftingRef}
          className="flex items-center justify-center px-6 md:px-12 pt-8 pb-64 md:pb-72 md:pt-12"
        >
          <div className="max-w-md sm:max-w-xl md:max-w-2xl text-center">
            <h2
              className="font-satoshi text-4xl md:text-5xl lg:text-5xl leading-snug tracking-tight"
              style={{
                color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)',
              }}
            >
              Shipping{' '}
              <span className="relative inline-block">
                <span>soulful</span>
                <span
                  className="absolute inset-0"
                  style={{
                    backgroundImage: isDark
                      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 Z' fill='%23D4A5A5'/%3E%3Cpath d='M0,0 L100,0 L100,55 Q70,75 40,60 Q15,48 0,65 Z' fill='%23A78BFA'/%3E%3C/svg%3E")`
                      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 Z' fill='%23BE8585'/%3E%3Cpath d='M0,0 L100,0 L100,55 Q70,75 40,60 Q15,48 0,65 Z' fill='%23A78BFA'/%3E%3C/svg%3E")`,
                    backgroundSize: '100% 100%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                    clipPath: `polygon(
                      0% ${100 - (mobileSoulfulFill * 100) + Math.sin(mobileSoulfulFill * 10) * 8}%,
                      15% ${100 - (mobileSoulfulFill * 100) + Math.sin(mobileSoulfulFill * 10 + 1) * 6}%,
                      30% ${100 - (mobileSoulfulFill * 100) + Math.sin(mobileSoulfulFill * 10 + 2) * 8}%,
                      50% ${100 - (mobileSoulfulFill * 100) + Math.sin(mobileSoulfulFill * 10 + 3) * 5}%,
                      70% ${100 - (mobileSoulfulFill * 100) + Math.sin(mobileSoulfulFill * 10 + 4) * 7}%,
                      85% ${100 - (mobileSoulfulFill * 100) + Math.sin(mobileSoulfulFill * 10 + 5) * 6}%,
                      100% ${100 - (mobileSoulfulFill * 100) + Math.sin(mobileSoulfulFill * 10 + 6) * 8}%,
                      100% 100%,
                      0% 100%
                    )`,
                  }}
                  aria-hidden="true"
                >
                  soulful
                </span>
              </span>{' '}
              digital experiences that stick.
            </h2>
          </div>
        </div>

        {/* Anchor for nav link - positioned at project start */}
        <div id="work" />

        {/* Selected Works section - fades in after Crafting */}
        <div
          style={{
            opacity: mobileWorksOpacity,
            transition: 'opacity 0.15s ease-out',
          }}
        >
        {/* Header row: Selected Works + arrows - inside container */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-8">
          <div className="flex items-center justify-between">
            <h2
              className="font-satoshi text-3xl md:text-4xl font-medium tracking-tight"
              style={{
                color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)',
              }}
            >
              Selected Works
            </h2>

            {/* Carousel indicators */}
            <div className="flex items-center gap-1">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    if (carouselRef.current) {
                      const scrollCardWidth = 280 + 16 // card width + gap
                      carouselRef.current.scrollTo({
                        left: index * scrollCardWidth,
                        behavior: 'smooth'
                      })
                    }
                  }}
                  className="transition-all duration-700"
                  style={{
                    width: index === activeIndex ? '24px' : '6px',
                    transition: 'all 700ms cubic-bezier(0.33, 1, 0.68, 1)',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: isDark
                      ? index === activeIndex ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)'
                      : index === activeIndex ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.08)',
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal scrolling cards - edge to edge but first card aligned with container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            WebkitOverflowScrolling: 'touch',
            paddingLeft: `${containerPadding}px`,
            scrollPaddingLeft: `${containerPadding}px`,
          }}
          onScroll={(e) => {
            const { scrollLeft, scrollWidth, clientWidth } = e.target
            const scrollCardWidth = 280 + 16 // card width + gap

            // Check if we're at the end of scroll
            const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10
            const newIndex = isAtEnd
              ? projects.length - 1
              : Math.round(scrollLeft / scrollCardWidth)

            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < projects.length) {
              setActiveIndex(newIndex)
            }
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 snap-start"
              style={{ width: '280px' }}
            >
              <ProjectSlide
                project={project}
                isDark={isDark}
                isActive={index === activeIndex}
                showText={true}
                showChip={false}
              />
            </div>
          ))}
          {/* Right padding spacer */}
          <div className="flex-shrink-0" style={{ width: `${containerPadding}px` }} />
        </div>
        </div>
      </section>
    )
  }

  // Desktop layout with scroll-based animations
  const sectionHeight = projects.length * 100 + 130 // vh units

  return (
    <section
      ref={containerRef}
      className="relative -mt-56"
      style={{ height: `${sectionHeight}vh` }}
    >
      {/* Anchor for nav link - positioned where first project appears */}
      <div id="work" className="absolute" style={{ top: '100vh' }} />

      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ isolation: 'isolate', zIndex: 101 }}>
        {/* Centered "Crafting..." text - GPU-accelerated scroll animation */}
        <div
          ref={craftingRef}
          className="absolute top-[42%] left-1/2 px-8 md:px-12 w-full max-w-4xl text-center z-10"
          style={{
            transform: `translate(-50%, -50%) translateY(${craftingTranslateY}px) scale(${craftingScale})`,
            opacity: craftingOpacity,
            filter: craftingBlur > 0.5 ? `blur(${craftingBlur}px)` : 'none',
            willChange: 'transform, opacity',
            pointerEvents: craftingOpacity > 0.5 ? 'auto' : 'none',
          }}
        >
          <h2
            className="font-satoshi text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-snug tracking-tight"
            style={{
              color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)',
            }}
          >
            Shipping{' '}
            <span className="relative inline-block">
              {/* Base text (default color) */}
              <span>soulful</span>
              {/* Colored overlay - water fill from bottom with wavy top edge + two-tone pattern */}
              <span
                className="absolute inset-0"
                style={{
                  backgroundImage: isDark
                    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 Z' fill='%23D4A5A5'/%3E%3Cpath d='M0,0 L100,0 L100,55 Q70,75 40,60 Q15,48 0,65 Z' fill='%23A78BFA'/%3E%3C/svg%3E")`
                    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 Z' fill='%23BE8585'/%3E%3Cpath d='M0,0 L100,0 L100,55 Q70,75 40,60 Q15,48 0,65 Z' fill='%23A78BFA'/%3E%3C/svg%3E")`,
                  backgroundSize: '100% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  clipPath: `polygon(
                    0% ${100 - humanFirstFill + Math.sin(humanFirstFill * 0.1) * 8}%,
                    15% ${100 - humanFirstFill + Math.sin(humanFirstFill * 0.1 + 1) * 6}%,
                    30% ${100 - humanFirstFill + Math.sin(humanFirstFill * 0.1 + 2) * 8}%,
                    50% ${100 - humanFirstFill + Math.sin(humanFirstFill * 0.1 + 3) * 5}%,
                    70% ${100 - humanFirstFill + Math.sin(humanFirstFill * 0.1 + 4) * 7}%,
                    85% ${100 - humanFirstFill + Math.sin(humanFirstFill * 0.1 + 5) * 6}%,
                    100% ${100 - humanFirstFill + Math.sin(humanFirstFill * 0.1 + 6) * 8}%,
                    100% 100%,
                    0% 100%
                  )`,
                }}
                aria-hidden="true"
              >
                soulful
              </span>
            </span>{' '}
            digital experiences that{' '}
            <span
              className={stickWiggle ? 'animate-wiggle' : ''}
              style={{
                display: 'inline-block',
              }}
            >
              stick
            </span>
            .
          </h2>
        </div>

        {/* Left side - numbered counter + single focus */}
        <div
          className="absolute inset-0 flex items-center pointer-events-none"
          style={{
            opacity: selectedWorksOpacity,
            transform: `translateX(${(1 - selectedWorksOpacity) * -30}px)`,
          }}
        >
          <div className="w-full h-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative flex items-center">
            {/* Navigation hint - bottom left, fades out past last project */}
            <div
              className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-center gap-2 transition-opacity duration-300"
              style={{
                // Fade out once 1% past the last project's CENTER position
                opacity: Math.max(0, 1 - Math.max(0, (projectProgress - ((projects.length - 0.5) / projects.length) - 0.01) * 20)),
              }}
            >
              <span className={`font-mono text-[11px] tracking-wide uppercase ${isDark ? 'text-white/40' : 'text-black/35'}`}>
                Scroll or use
              </span>
              <div className={`flex items-center gap-1 ${isDark ? 'text-white/40' : 'text-black/35'}`}>
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded border ${isDark ? 'border-white/25' : 'border-black/20'}`}>
                  <ArrowUp size={10} weight="bold" />
                </span>
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded border ${isDark ? 'border-white/25' : 'border-black/20'}`}>
                  <ArrowDown size={10} weight="bold" />
                </span>
              </div>
            </div>
            <div
              className="w-1/2"
              style={{ maxWidth: '480px', pointerEvents: selectedWorksOpacity > 0.5 ? 'auto' : 'none' }}
            >
              {/* Counter - slot roll */}
              <div
                key={`counter-${activeIndex}`}
                className="mb-8 animate-slot-roll opacity-0"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)' }}
              >
                <Caption trigger="mount">
                  {String(activeIndex + 1).padStart(2, '0')}
                </Caption>
                <Caption scramble={false}> / {String(projects.length).padStart(2, '0')}</Caption>
              </div>

              {/* Active project - staggered slot roll */}
              <div className="overflow-hidden">
                <H2
                  key={`title-${activeIndex}`}
                  className="mb-4 animate-slot-roll opacity-0"
                  style={{ animationDelay: '50ms' }}
                >
                  {projects[activeIndex].name}
                </H2>
              </div>
              <div className="overflow-hidden">
                <Body
                  key={`desc-${activeIndex}`}
                  className="text-xl leading-relaxed mb-6 animate-slot-roll opacity-0"
                  style={{ animationDelay: '100ms' }}
                >
                  {projects[activeIndex].contribution}
                </Body>
              </div>
              <div
                key={`btn-${activeIndex}`}
                className="animate-slot-roll opacity-0"
                style={{ animationDelay: '150ms' }}
              >
                <ButtonWithArrow
                  href={projects[activeIndex].link}
                  variant="secondary"
                  size="md"
                  direction="right"
                  className="pointer-events-auto"
                >
                  View Project
                </ButtonWithArrow>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Project cards with bleeding edges */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center z-20"
          style={{
            opacity: projectImagesOpacity,
            transform: `translateY(${projectTranslateY}%) scale(${projectImagesScale})`,
            pointerEvents: morphProgress > 0.5 ? 'auto' : 'none',
          }}
        >
          <div className="h-full w-full relative">
            {/* Cards */}
            <div className="absolute inset-0">
              {projects.map((project, index) => {
                const diff = index - activeIndex
                const isActive = diff === 0
                const isAdjacent = Math.abs(diff) === 1
                const opacity = isActive ? 1 : isAdjacent ? 0.4 : 0
                const translateY = diff * 75 // Spacing that shows peeking cards without overlap
                const scale = isActive ? 1 : 0.75
                const zIndex = isActive ? 10 : 1 // Focused card always on top

                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 flex items-center justify-center p-8"
                    style={{
                      opacity,
                      transform: `translateY(${translateY}%) scale(${scale})`,
                      pointerEvents: isActive ? 'auto' : 'none',
                      transition: 'opacity 700ms cubic-bezier(0.33, 1, 0.68, 1), transform 700ms cubic-bezier(0.33, 1, 0.68, 1)',
                      zIndex,
                    }}
                  >
                    <Link
                      to={project.link}
                      className="group block w-full max-w-xl"
                      data-project-card
                      onMouseEnter={() => setHoveredCardIndex(index)}
                      onMouseLeave={() => {
                        setHoveredCardIndex(null)
                        setTiltState({ x: 0, y: 0 })
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = (e.clientX - rect.left) / rect.width - 0.5
                        const y = (e.clientY - rect.top) / rect.height - 0.5
                        setTiltState({ x, y })
                      }}
                      style={{ perspective: '1000px' }}
                    >
                      <div
                        className="relative z-[101] aspect-square overflow-hidden rounded-2xl transition-transform duration-150 ease-out"
                        style={{
                          background: isDark ? project.bgDark : project.bgLight,
                          boxShadow: isDark
                            ? '0 0 0 1px rgba(255,255,255,0.06), 0 8px 16px rgba(0,0,0,0.4), 0 24px 48px rgba(0,0,0,0.4)'
                            : '0 0 0 1px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.1)',
                          isolation: 'isolate',
                          transform: hoveredCardIndex === index
                            ? `rotateY(${tiltState.x * 8}deg) rotateX(${-tiltState.y * 8}deg)`
                            : 'rotateY(0deg) rotateX(0deg)',
                        }}
                      >
                        {/* Category chip - top left */}
                        <span
                          className={`absolute top-4 left-4 z-10 font-mono text-[11px] tracking-wide uppercase px-2.5 pt-[7px] pb-[5px] rounded-md backdrop-blur-sm leading-none ${
                            isDark ? 'bg-black/40 text-white/70' : 'bg-white/60 text-black/60'
                          }`}
                        >
                          <ScrambleText key={`chip-${index}-${activeIndex}`} trigger="mount" iterations={3} speed={25}>
                            {project.category}
                          </ScrambleText>
                        </span>

                        <ImageComponent
                          src={project.image}
                          alt={project.name}
                          isHovered={hoveredCardIndex === index}
                        />
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
