import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { H2, H4, Caption } from './Typography'
import { useTheme } from '../context/ThemeContext'
import teslaMegaMenuImg from '../assets/projects/tesla/mega menu/tesla-mega-menu-card.png'
import teslaChatbotImg from '../assets/projects/tesla/chatbot/chatbot-card.png'
import indiEvImg from '../assets/projects/indi ev/card-indi-ev.png'

// WebGL Ripple Effect Component
function RippleImage({ src, alt, isHovered, onMouseMove }) {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const textureRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const rippleRef = useRef({ active: false, time: 0, x: 0.5, y: 0.5 })
  const [imageLoaded, setImageLoaded] = useState(false)

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
    precision highp float;
    varying vec2 v_texCoord;
    uniform sampler2D u_image;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_intensity;

    void main() {
      vec2 uv = v_texCoord;

      // Distance from mouse position
      vec2 toMouse = uv - u_mouse;
      float dist = length(toMouse);

      // Create ripple waves emanating from mouse
      float ripple = sin(dist * 30.0 - u_time * 4.0) * exp(-dist * 3.0);

      // Apply displacement based on ripple
      vec2 displacement = normalize(toMouse + 0.001) * ripple * u_intensity * 0.02;

      vec4 color = texture2D(u_image, uv + displacement);
      gl_FragColor = color;
    }
  `

  const initGL = useCallback(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image || !image.complete) return

    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true })
    if (!gl) return

    glRef.current = gl

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    // Create program
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)
    programRef.current = program

    // Set up geometry (full-screen quad)
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ])
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Texture coordinates
    const texCoords = new Float32Array([
      0, 1, 1, 1, 0, 0,
      0, 0, 1, 1, 1, 0
    ])
    const texCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)

    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord')
    gl.enableVertexAttribArray(texCoordLocation)
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

    // Create texture from image
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    textureRef.current = texture
  }, [])

  useEffect(() => {
    if (imageLoaded) {
      initGL()
    }
  }, [imageLoaded, initGL])

  useEffect(() => {
    const gl = glRef.current
    const program = programRef.current
    if (!gl || !program) return

    let startTime = performance.now()

    const render = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const time = (performance.now() - startTime) / 1000

      // Update uniforms
      const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
      const timeLocation = gl.getUniformLocation(program, 'u_time')
      const intensityLocation = gl.getUniformLocation(program, 'u_intensity')

      gl.uniform2f(mouseLocation, mouseRef.current.x, 1.0 - mouseRef.current.y)
      gl.uniform1f(timeLocation, time)
      gl.uniform1f(intensityLocation, isHovered ? 1.0 : 0.0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, imageLoaded])

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    }
    onMouseMove?.(e)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    const canvas = canvasRef.current
    const image = imageRef.current
    if (canvas && image) {
      canvas.width = image.naturalWidth || 800
      canvas.height = image.naturalHeight || 800
    }
  }

  return (
    <div className="relative w-full h-full" onMouseMove={handleMouseMove}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        onLoad={handleImageLoad}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: imageLoaded ? 0 : 1 }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: imageLoaded ? 1 : 0 }}
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
    bgDark: '#1e1b4b',   // Deep indigo
    bgLight: '#e0e7ff',  // Light indigo
  },
  {
    id: 2,
    name: 'Tesla Mega Menu',
    category: 'Navigation & IA Redesign',
    image: teslaMegaMenuImg,
    link: '/project/tesla-mega-menu',
    transparent: true,
    bgDark: '#134e4a',   // Deep teal
    bgLight: '#ccfbf1',  // Light teal
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
  },
  {
    id: 4,
    name: 'Catalia Health',
    category: 'Patient Community App',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
    link: '/project/catalia-health',
    bgDark: '#4c1d95',   // Deep violet (lavender family)
    bgLight: '#ede9fe',  // Light violet
  },
  {
    id: 5,
    name: 'Notetracks',
    category: 'Audio Collaboration Platform',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=800&fit=crop',
    link: '/project/notetracks',
    bgDark: '#7c2d12',   // Deep orange
    bgLight: '#ffedd5',  // Light orange
  },
]

function ProjectCard({ project, isDark, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  // Staggered entrance animation
  const entranceStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * 0.1}s`,
  }

  const bgColor = isDark ? project.bgDark : project.bgLight

  // Create radial gradient for dimensional feel
  const cardBackground = isDark
    ? `radial-gradient(ellipse at 30% 20%, ${bgColor} 0%, ${project.bgDark}dd 50%, ${project.bgDark} 100%)`
    : `radial-gradient(ellipse at 30% 20%, ${bgColor} 0%, ${project.bgLight}ee 50%, ${project.bgLight} 100%)`

  const cardShadow = isDark
    ? '0 0 0 1px rgba(255,255,255,0.06), 0 4px 8px rgba(0,0,0,0.3), 0 16px 32px rgba(0,0,0,0.3)'
    : '0 0 0 1px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.08)'

  return (
    <Link
      ref={cardRef}
      to={project.link}
      className="group block flex-shrink-0 w-[70vw] md:w-[40vw] lg:w-[30vw]"
      style={entranceStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div
        className="aspect-square overflow-hidden rounded-2xl transition-all duration-500"
        style={{
          background: cardBackground,
          boxShadow: cardShadow,
        }}
      >
        {project.transparent ? (
          // Simple image for transparent PNGs (no WebGL ripple, crisp rendering)
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              WebkitFontSmoothing: 'antialiased',
            }}
          />
        ) : (
          <RippleImage
            src={project.image}
            alt={project.name}
            isHovered={isHovered}
          />
        )}
      </div>

      {/* Text - below image */}
      <div className="mt-5">
        <H4 className={`mb-1 transition-colors duration-300 ${isDark ? 'group-hover:text-gray-300' : 'group-hover:text-gray-600'}`}>
          {project.name}
        </H4>
        <Caption trigger="hover" className={`transition-colors duration-300 ${isDark ? 'text-gray-500 group-hover:text-gray-400' : 'text-gray-500 group-hover:text-gray-600'}`}>
          {project.category}
        </Caption>
      </div>
    </Link>
  )
}

function ArrowButton({ direction, onClick, disabled, isDark }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
        isDark
          ? `border-white/30 ${disabled ? 'opacity-30' : 'hover:border-white/50 hover:bg-white/10'}`
          : `border-black/20 ${disabled ? 'opacity-30' : 'hover:border-black/50 hover:bg-black/5'}`
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
        className={`${isDark ? 'text-white' : 'text-gray-900'} ${direction === 'left' ? 'rotate-180' : ''}`}
      >
        <path
          d="M6 3L11 8L6 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function Projects() {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const { isDark } = useTheme()

  // Check scroll position to update arrow states
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScrollPosition()
    container.addEventListener('scroll', checkScrollPosition)
    return () => container.removeEventListener('scroll', checkScrollPosition)
  }, [])

  // Header visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Cards visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardsRef.current) {
      observer.observe(cardsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = container.querySelector('a')?.offsetWidth || 400
    const scrollAmount = cardWidth + 32 // card width + gap

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })

    // Check position after smooth scroll completes
    setTimeout(checkScrollPosition, 350)
  }

  return (
    <section id="work" className="relative z-10 bg-transparent py-20 md:py-28">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <div className="flex items-end justify-between">
          <H2 className={`opacity-0 ${headerVisible ? 'animate-fluid-in' : ''}`}>
            Selected Works
          </H2>

          {/* Arrow buttons */}
          <div className={`flex gap-3 opacity-0 ${headerVisible ? 'animate-fade-up' : ''}`} style={{ animationDelay: '0.3s' }}>
            <ArrowButton
              direction="left"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              isDark={isDark}
            />
            <ArrowButton
              direction="right"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              isDark={isDark}
            />
          </div>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div className="relative w-full" ref={cardsRef}>
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex gap-4 pb-4">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} isDark={isDark} index={index} isVisible={cardsVisible} />
              ))}
              {/* Right padding spacer */}
              <div className="flex-shrink-0 w-6 md:w-12 lg:w-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
