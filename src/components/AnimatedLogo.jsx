import { useId } from 'react'

// Geometry copied verbatim from public/assets/branding/logo.svg
const MARK_OUTLINE =
  'M519,279.86A45.77,45.77,0,0,1,564.68,234H579.6c13.57,0,21.78,4.54,27.24,9.35a31,31,0,0,1,5.69,6.6,23.68,23.68,0,0,1,1.28,2.26c.14.29.25.52.33.7a1.46,1.46,0,0,0,.09.21l0,.08v0h0s0,0-3.5,1.37l3.51-1.36,2,5.13H564.68a21.48,21.48,0,0,0,0,42.95H582a13,13,0,0,0,12.45-9.28H564.68a12.2,12.2,0,0,1,0-24.39h18.13a19.7,19.7,0,0,1,19.45,16.83H615.5v3.78h3.76A37.38,37.38,0,0,1,582,325.71H564.68A45.77,45.77,0,0,1,519,279.86Zm92.5,12.19h-9.37A20.55,20.55,0,0,1,582,308.88H564.68a29,29,0,0,1,0-58h39.05a24.36,24.36,0,0,0-1.84-1.8c-4.11-3.61-10.56-7.48-22.29-7.48H564.68a38.31,38.31,0,0,0,0,76.61H582A29.84,29.84,0,0,0,611.5,292.05Zm-16.9-7.56a12.16,12.16,0,0,0-11.79-9.28H564.68a4.64,4.64,0,0,0,0,9.28Z'
const MARK_TERMINAL = 'M614.44,284.49h4.83v3.91l-4.45-.09Z'

// Centerline of the mark traced as one continuous stroke, in drawing order:
// top-right tip → along the top → outer ring (counterclockwise) → up to the
// right edge → switchback, drawing the crossbar and the curl's bottom bar as
// one straight pull → up around the inner curl and back down to the bar →
// middle ring → ending under the starting tip. Animated as a thick masking
// stroke, it reveals the exact original mark as if drawn.
const DRAW_TRACE =
  'M95.3,20.5 C88.5,11.5 74.5,4.7 60.6,4.7 L45.7,4.7 A42.1,42.1 0 0 0 45.7,88.9 L63,88.9 A33.6,33.6 0 0 0 96.6,55.3 C97.9,54.7 97.6,54.3 96.3,54.3 L45.7,54.3 A8.4,8.4 0 0 1 45.7,37.5 L63.8,37.5 A15.9,15.9 0 0 1 79.7,54.3 L79.8,54.3 A16.8,16.8 0 0 1 63,71.15 L45.7,71.15 A25.2,25.2 0 0 1 45.7,20.7 L91,21'

/**
 * The logo mark drawn on as one continuous stroke.
 * Fills with currentColor so it follows the surrounding text color.
 */
export default function AnimatedLogo({ duration = 2.2, delay = 0, className = '', ...props }) {
  const maskId = useId()

  return (
    <svg viewBox="0 0 100.27 91.71" className={className} aria-label="Grace Guo logo" role="img" {...props}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-2" y="-2" width="105" height="96">
          <path
            d={DRAW_TRACE}
            pathLength="1"
            fill="none"
            stroke="white"
            strokeWidth="10.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1"
            strokeDashoffset="1"
            style={{ animation: `logo-draw ${duration}s cubic-bezier(0.25, 0, 0.75, 1) ${delay}s forwards` }}
          />
          {/* The tapered tip is two merged stroke passes (drawn first and last).
              At pen-down reveal only the upper pass, cut along the seam between
              them, so the start reads as a single clean stroke end. */}
          <path
            d="M84,7 L101,7 L101,26 L99,26 L84.7,16.95 Z"
            fill="white"
            opacity="0"
            style={{ animation: `logo-tip-in 0.2s linear ${delay}s forwards` }}
          />
          {/* Right-edge switchback terminal — same treatment: the ring's ascent
              and the crossbar merge here, so reveal the corner whole the moment
              the pen arrives (≈48% of the eased timeline). */}
          <rect
            x="90"
            y="49.5"
            width="11"
            height="14"
            fill="white"
            opacity="0"
            style={{ animation: `logo-tip-in 0.15s linear ${delay + duration * 0.48}s forwards` }}
          />
          {/* Below-seam underside of the tip: belongs to the final pass, but the
              trace's start cap overlaps it. Hold it black until the pen returns
              to finish the tip (≈94% of the eased timeline). */}
          <path
            d="M84.6,16.75 L99.2,26 L84,26 Z"
            fill="black"
            style={{ animation: `logo-notch-out 0.12s linear ${delay + duration * 0.94}s forwards` }}
          />
          {/* The masking stroke is wider than the ink, so while the bar draws it
              leaks slivers of the junction throats above and below it (they read
              as square notches). Hold each spot black until the pen actually
              passes through: the curl's return lands at ≈60%, the dive to the
              middle ring departs at ≈63%. */}
          <rect
            x="74.8"
            y="48.2"
            width="8.7"
            height="2.3"
            fill="black"
            style={{ animation: `logo-notch-out 0.12s linear ${delay + duration * 0.58}s forwards` }}
          />
          <rect
            x="73.5"
            y="58.3"
            width="11"
            height="2.7"
            fill="black"
            style={{ animation: `logo-notch-out 0.12s linear ${delay + duration * 0.63}s forwards` }}
          />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <g fill="currentColor" transform="translate(-519 -234)">
          <path d={MARK_OUTLINE} fillRule="evenodd" />
          <path d={MARK_TERMINAL} />
        </g>
      </g>
    </svg>
  )
}
