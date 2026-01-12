/**
 * Painterly
 *
 * A WebGL shader background that creates organic, paint-like color blobs.
 *
 * Technical approach:
 * - Uses simplex noise for smooth, natural randomness
 * - Fractal Brownian Motion (FBM) layers multiple noise octaves for complex patterns
 * - Domain warping distorts the coordinate space to create flowing, organic shapes
 * - Mouse interaction subtly pushes the "paint" like a finger in wet pigment
 * - Film grain adds texture and warmth
 *
 * Props:
 * - contained: When true, renders within parent container instead of fixed fullscreen
 */

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Painterly({ contained = false }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const { isDark } = useTheme()
  const animationRef = useRef(null)
  const scrollRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection Observer to pause when offscreen
  useEffect(() => {
    const target = contained ? containerRef.current : canvasRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [contained])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    // Mouse state with momentum and velocity
    const mouse = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      velX: 0,
      velY: 0,
      prevX: 0.5,
      prevY: 0.5,
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      let width, height

      if (contained && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        width = rect.width
        height = rect.height
      } else {
        width = window.innerWidth
        height = window.innerHeight
      }

      canvas.width = width * dpr
      canvas.height = height * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()

    const handleMouseMove = (e) => {
      if (contained && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouse.targetX = (e.clientX - rect.left) / rect.width
        mouse.targetY = 1 - (e.clientY - rect.top) / rect.height
      } else {
        mouse.targetX = e.clientX / window.innerWidth
        mouse.targetY = 1 - e.clientY / window.innerHeight
      }
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader - organic paint-like blobs using simplex noise and FBM
    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec2 u_mouseVel;
      uniform float u_opacity;

      // Simplex noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                                + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Fractal Brownian Motion - layers multiple octaves of noise
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * snoise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = v_uv;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv;
        p.x *= aspect;

        float time = u_time * 0.001; // Blobs stay in place
        float innerTime = u_time * 0.15; // Visible fluid morphing

        // Mouse position in same coordinate space
        vec2 mousePos = vec2(u_mouse.x * aspect, u_mouse.y);

        // Mouse interaction - subtle radial push (like finger in paint)
        vec2 fromMouse = p - mousePos; // Direction away from mouse
        float mouseDist = length(fromMouse);
        float mouseRadius = 0.3;
        float mouseInfluence = smoothstep(mouseRadius, 0.0, mouseDist);
        mouseInfluence = mouseInfluence * mouseInfluence * mouseInfluence; // Very soft cubic falloff

        // Push coordinates away from mouse - subtle, no spiral
        vec2 pushDir = mouseDist > 0.001 ? normalize(fromMouse) : vec2(0.0);
        vec2 push = pushDir * mouseInfluence * 0.025; // Very subtle push
        vec2 pWarped = p + push;

        // Domain warping - distorts coordinate space for organic blob shapes
        vec2 warp = vec2(
          fbm(pWarped * 0.8),
          fbm(pWarped * 0.8 + 100.0)
        );
        vec2 warp2 = vec2(
          fbm(pWarped * 1.0 + warp * 1.2),
          fbm(pWarped * 1.0 + warp * 1.2 + 50.0)
        );

        vec2 finalWarp = pWarped + warp2 * 0.5;

        // Slow drifting blob regions - very gradual color shifts
        float slowTime = u_time * 0.008;
        float n1 = fbm(finalWarp * 0.6 + vec2(slowTime * 0.1, slowTime * 0.05));
        float n2 = fbm(finalWarp * 0.5 + vec2(slowTime * 0.08, -slowTime * 0.06) + 20.0);
        float n3 = fbm(finalWarp * 0.4 + vec2(-slowTime * 0.05, slowTime * 0.07) + 40.0);

        // Inner fluid motion - morphing within the blobs
        float fluidMotion = fbm(finalWarp * 1.5 + innerTime * 1.2) * 0.25;
        n1 += fluidMotion;
        n2 += fbm(finalWarp * 1.3 + innerTime * 1.0 + 10.0) * 0.22;
        n3 += fbm(finalWarp * 1.1 + innerTime * 0.8 + 30.0) * 0.18;

        // Color palette
        vec3 lavender = vec3(0.655, 0.545, 0.98);  // #A78BFA
        vec3 teal = vec3(0.06, 0.46, 0.43);        // #0F766E
        vec3 burntOrange = vec3(0.92, 0.345, 0.05); // #EA580C
        vec3 darkBase = vec3(0.12, 0.1, 0.18);     // Softer purple-ish dark

        // Create color regions based on warped noise
        vec3 color = darkBase;

        // Layer 1: Teal regions - subtle
        float tealMask = smoothstep(0.1, 0.5, n1);
        color = mix(color, teal, tealMask * 0.5);

        // Layer 2: Lavender regions
        float lavenderMask = smoothstep(-0.1, 0.4, n2);
        color = mix(color, lavender, lavenderMask * 0.8);

        // Layer 3: Burnt orange regions - more prominent
        float orangeMask = smoothstep(-0.1, 0.4, n3);
        color = mix(color, burntOrange, orangeMask * 0.75);

        // Add depth variation
        float depth = fbm(finalWarp * 2.5 + time * 0.2);
        color *= (0.7 + depth * 0.5);

        // Bright highlights where colors meet
        float edge = abs(n1 - n2) + abs(n2 - n3);
        float highlight = smoothstep(0.4, 0.1, edge);
        color = mix(color, color * 1.4, highlight * 0.3);

        // Subtle depth in crevices - not too dark
        float crevice = smoothstep(0.15, 0.0, abs(n1 - 0.1)) * smoothstep(0.15, 0.0, abs(n2 - 0.1));
        color = mix(color, darkBase * 0.7, crevice * 0.3);

        // Subtle mouse glow - very gentle brightening
        float glowIntensity = smoothstep(0.3, 0.0, mouseDist) * 0.12;
        color = mix(color, color * 1.08, glowIntensity);

        // Overall brightness and saturation boost
        color = pow(color, vec3(0.9)); // Slight gamma for richness
        color = mix(vec3(dot(color, vec3(0.299, 0.587, 0.114))), color, 1.3); // Saturation boost

        // Film grain texture for painterly feel
        float grain = (fract(sin(dot(uv * 1000.0 + u_time, vec2(12.9898, 78.233))) * 43758.5453) - 0.5);
        grain += (fract(sin(dot(uv * 800.0 - u_time * 0.5, vec2(39.346, 11.135))) * 43758.5453) - 0.5);
        grain *= 0.08;
        color += grain;

        // Clamp to valid range
        color = clamp(color, 0.0, 1.0);

        // Apply scroll opacity
        vec3 fadeColor = vec3(0.04, 0.04, 0.06);
        color = mix(fadeColor, color, u_opacity);

        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Compile shaders
    const compileShader = (source, type) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Set up geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const uniforms = {
      time: gl.getUniformLocation(program, 'u_time'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      mouseVel: gl.getUniformLocation(program, 'u_mouseVel'),
      opacity: gl.getUniformLocation(program, 'u_opacity'),
    }

    const startTime = Date.now()

    const animate = () => {
      // Skip rendering when not visible for performance
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const time = (Date.now() - startTime) / 1000

      // Store previous position before updating
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y

      // Faster mouse following - more responsive
      mouse.x += (mouse.targetX - mouse.x) * 0.2
      mouse.y += (mouse.targetY - mouse.y) * 0.2

      // Calculate velocity with some trailing
      const newVelX = (mouse.x - mouse.prevX) * 25
      const newVelY = (mouse.y - mouse.prevY) * 25
      mouse.velX += (newVelX - mouse.velX) * 0.4
      mouse.velY += (newVelY - mouse.velY) * 0.4
      // Gradual dissipation
      mouse.velX *= 0.92
      mouse.velY *= 0.92

      // Scroll-based opacity (disabled when contained)
      let opacity = 1
      if (!contained) {
        const vh = window.innerHeight
        const scrollY = scrollRef.current
        const pinnedUntil = vh * 0.3
        const scrollPastPinned = Math.max(0, scrollY - pinnedUntil)
        const progress = Math.min(scrollPastPinned / (vh * 0.5), 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        opacity = 1 - eased
      }

      // Set uniforms
      gl.uniform1f(uniforms.time, time)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y)
      gl.uniform2f(uniforms.mouseVel, mouse.velX, mouse.velY)
      gl.uniform1f(uniforms.opacity, opacity)

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDark, contained, isVisible])

  if (contained) {
    return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
        />
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
