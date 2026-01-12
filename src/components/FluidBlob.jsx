import { useRef, useState, useEffect, memo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'

// Global mouse position - completely outside React
const globalMouse = { x: 0, y: 0, listenerAdded: false }

// Single window-level listener (runs once on module load, with duplicate check for HMR)
if (typeof window !== 'undefined' && !globalMouse.listenerAdded) {
  globalMouse.listenerAdded = true
  window.addEventListener('mousemove', (e) => {
    // Normalize to -1 to 1 based on window center
    globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1
    globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  })
}

// Custom shader material for gradient coloring
class GradientMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uSeed: { value: 0 },
        uColor1: { value: new THREE.Color('#C4B5FD') }, // Soft Lavender
        uColor2: { value: new THREE.Color('#8B3AED') }, // Violet (warmer)
        uColor3: { value: new THREE.Color('#FBBF24') }, // Amber/Gold (warm rim)
        uColor4: { value: new THREE.Color('#5EEAD4') }, // Soft Teal (cool accent)
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uSeed;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        // Simple smooth noise
        float noise(vec3 p) {
          return sin(p.x * 1.5) * sin(p.y * 1.5) * sin(p.z * 1.5);
        }

        float getDisplacement(vec3 n, float t, float seed) {
          // Offset position by seed for unique shapes
          vec3 offset = vec3(seed * 10.0, seed * 7.3, seed * 13.7);

          // Primary large-scale organic motion
          float n1 = noise(n * 1.3 + t * 0.4 + offset);
          // Secondary flow in different direction
          float n2 = noise(n * 1.6 + vec3(t * 0.35, -t * 0.25, t * 0.3) + 5.0 + offset);
          // Medium detail with rotation
          float n3 = noise(n * 2.0 + vec3(-t * 0.5, t * 0.4, t * 0.3) + 10.0 + offset);
          // Fine detail for surface tension feel
          float n4 = noise(n * 2.8 + t * 0.6 + 15.0 + offset);

          // Subtle breathing/pulsing - offset by seed for different timing
          float breathe = sin(t * 0.8 + seed * 3.14) * 0.02;

          return n1 * 0.18 + n2 * 0.12 + n3 * 0.08 + n4 * 0.04 + breathe;
        }

        float getMouseDeform(vec3 n, vec2 mouse) {
          // Convert mouse position to a 3D direction
          vec3 mouseDir = normalize(vec3(mouse.x, mouse.y, 0.6));

          // How aligned is this vertex with the mouse direction?
          float alignment = dot(n, mouseDir);

          // Gentler, wider bulge - start earlier, smaller intensity
          float bulge = smoothstep(-0.2, 0.8, alignment) * 0.05;

          return bulge;
        }

        void main() {
          vec3 norm = normalize(position);
          float t = uTime * 0.5;

          // Get displacement for this vertex
          float displacement = getDisplacement(norm, t, uSeed);

          // Add mouse-based deformation
          float mouseDeform = getMouseDeform(norm, uMouse);

          vec3 pos = norm * (1.0 + displacement + mouseDeform);

          // Compute displaced normal by sampling neighbors
          float eps = 0.01;
          vec3 tangent = normalize(cross(norm, vec3(0.0, 1.0, 0.0)));
          if (length(tangent) < 0.1) tangent = normalize(cross(norm, vec3(1.0, 0.0, 0.0)));
          vec3 bitangent = normalize(cross(norm, tangent));

          vec3 neighbor1 = normalize(norm + tangent * eps);
          vec3 neighbor2 = normalize(norm + bitangent * eps);

          float d1 = getDisplacement(neighbor1, t, uSeed) + getMouseDeform(neighbor1, uMouse);
          float d2 = getDisplacement(neighbor2, t, uSeed) + getMouseDeform(neighbor2, uMouse);

          vec3 pos1 = neighbor1 * (1.0 + d1);
          vec3 pos2 = neighbor2 * (1.0 + d2);

          // Cross product gives us the displaced normal
          vec3 displacedNormal = normalize(cross(pos2 - pos, pos1 - pos));

          // Make sure normal points outward
          if (dot(displacedNormal, norm) < 0.0) displacedNormal = -displacedNormal;

          vNormal = normalize(normalMatrix * displacedNormal);
          vPosition = pos;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        // Simplex noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vec3 pos = vPosition;
          float t = uTime * 0.12;

          vec3 viewDir = normalize(cameraPosition - vPosition);

          // Fresnel for glassy edges
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);

          // Flowing noise for color variation
          float flow1 = snoise(pos * 0.6 + vec3(t * 0.15, t * 0.1, 0.0)) * 0.5 + 0.5;
          float flow2 = snoise(pos * 0.4 + vec3(-t * 0.1, t * 0.12, t * 0.05) + 30.0) * 0.5 + 0.5;

          float blend1 = smoothstep(0.3, 0.7, flow1);
          float blend2 = smoothstep(0.4, 0.6, flow2);
          float combinedBlend = mix(blend1, blend2, 0.4);

          // Violet base with lavender variation
          vec3 color = mix(uColor2, uColor1, combinedBlend * 0.65);

          // Two light sources for dimensionality
          vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
          vec3 lightDir2 = normalize(vec3(-1.0, 0.3, 0.5));

          // Diffuse lighting - very soft shadows
          float diffuse = max(dot(vNormal, lightDir), 0.0);
          float diffuse2 = max(dot(vNormal, lightDir2), 0.0);
          float combinedDiffuse = diffuse * 0.4 + diffuse2 * 0.15 + 0.55;
          vec3 finalColor = color * combinedDiffuse;

          // Primary specular highlight
          vec3 halfDir = normalize(lightDir + viewDir);
          float spec = pow(max(dot(vNormal, halfDir), 0.0), 20.0);
          finalColor += vec3(0.95, 0.9, 1.0) * spec * 0.45;

          // Broader specular layer for soft glow
          float specBroad = pow(max(dot(vNormal, halfDir), 0.0), 6.0);
          finalColor += vec3(0.9, 0.85, 1.0) * specBroad * 0.15;

          // Secondary specular from lower-left light
          vec3 halfDir2 = normalize(lightDir2 + viewDir);
          float spec2 = pow(max(dot(vNormal, halfDir2), 0.0), 25.0);
          finalColor += vec3(0.9, 0.85, 1.0) * spec2 * 0.2;

          // Fresnel rim
          finalColor += vec3(0.8, 0.75, 1.0) * fresnel * 0.1;

          // Dithering to prevent banding
          vec2 screenPos = gl_FragCoord.xy;
          float dither = fract(sin(dot(screenPos, vec2(12.9898, 78.233))) * 43758.5453);
          dither += fract(sin(dot(screenPos + 0.5, vec2(39.346, 11.135))) * 43758.5453);
          dither = (dither - 1.0) * 0.015; // Subtle dithering
          finalColor += dither;

          // Film grain on top
          vec2 grainUV = vPosition.xy * 150.0 + uTime * 8.0;
          float grain = fract(sin(dot(grainUV, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
          finalColor += grain * 0.03;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    })
  }
}

extend({ GradientMaterial })

// Color palettes for light/dark modes
const COLOR_PALETTES = {
  dark: {
    color1: '#C4B5FD', // Soft Lavender
    color2: '#8B3AED', // Violet (warmer)
    color3: '#FBBF24', // Amber/Gold (warm rim)
    color4: '#5EEAD4', // Soft Teal (cool accent)
  },
  light: {
    color1: '#E4CCFF', // Light Lilac
    color2: '#F5B8B8', // Light Rose
    color3: '#93C5FD', // Soft sky blue
    color4: '#99F6E4', // Light teal
  },
}

function GradientBlob({ position = [0, 0, 0], scale = 1, speed = 1, seed = 0, isVisible = true, isDark = true }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const palette = isDark ? COLOR_PALETTES.dark : COLOR_PALETTES.light

  useFrame((state) => {
    if (!isVisible) return

    const t = state.clock.elapsedTime * speed

    if (meshRef.current) {
      // Offset base rotation by seed for different starting angles
      const baseRotX = Math.sin(t * 0.4 + seed * 2.1) * 0.12
      const baseRotY = t * 0.18 + seed * 1.5
      const baseRotZ = Math.cos(t * 0.25 + seed * 1.7) * 0.06

      // Target rotation with mouse influence (read from global)
      const targetX = baseRotX + globalMouse.y * 0.35
      const targetY = baseRotY + globalMouse.x * 0.35

      // Smooth easing toward target - slightly more responsive
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.06
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.06
      meshRef.current.rotation.z = baseRotZ
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t
      materialRef.current.uniforms.uMouse.value.set(globalMouse.x, globalMouse.y)
      materialRef.current.uniforms.uSeed.value = seed
      // Update colors based on theme
      materialRef.current.uniforms.uColor1.value.set(palette.color1)
      materialRef.current.uniforms.uColor2.value.set(palette.color2)
      materialRef.current.uniforms.uColor3.value.set(palette.color3)
      materialRef.current.uniforms.uColor4.value.set(palette.color4)
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 64]} />
      <gradientMaterial ref={materialRef} />
    </mesh>
  )
}

function Scene({ seed, isVisible, isDark }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 1 : 1.2} />
      <GradientBlob position={[0, 0, 0]} scale={1.2} speed={0.5} seed={seed} isVisible={isVisible} isDark={isDark} />
    </>
  )
}

function FluidBlob({ size = 300, className = '', seed = 0, isDark = true }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        overflow: 'visible',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Scene seed={seed} isVisible={true} isDark={isDark} />
      </Canvas>
    </div>
  )
}

export default memo(FluidBlob)
