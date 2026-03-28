/**
 * Gooey Design System Tokens
 * Single source of truth for all design decisions
 *
 * These tokens define the visual language of the portfolio.
 * CSS custom properties in index.css should mirror these values.
 */

// =============================================================================
// COLORS
// =============================================================================

export const colors = {
  // Brand palette with light/dark mode variants
  brand: {
    amethyst: { light: '#5835B0', dark: '#8B6AFF' },
    lilac: { light: '#BF92F0', dark: '#BF92F0' },
    rose: { light: '#D78F8D', dark: '#D78F8D' },
    gold: { light: '#DBA166', dark: '#DBA166' },
    peridot: { light: '#87AA61', dark: '#87AA61' },
    turquoise: { light: '#36CBC6', dark: '#36CBC6' },
  },

  // Semantic colors
  semantic: {
    accent: { light: '#5835B0', dark: '#8B6AFF' }, // Maps to amethyst
    error: { light: '#DC2626', dark: '#EF4444' },
    success: { light: '#16A34A', dark: '#22C55E' },
  },

  // Background colors
  background: {
    dark: '#0a0a0a',
    light: '#FAF8F4',
    surface: { light: '#FFFFFF', dark: '#141414' },
  },

  // Text colors
  text: {
    primary: { light: '#1A1A1A', dark: '#FAFAFA' },
    secondary: { light: '#4A4A4A', dark: '#A1A1A1' },
    muted: { light: '#6B6B6B', dark: '#737373' },
  },

  // Border colors
  border: {
    light: 'rgba(0, 0, 0, 0.08)',
    dark: 'rgba(255, 255, 255, 0.08)',
  },
}

// Palette order for charts, gradients, sequences
export const paletteOrder = ['amethyst', 'lilac', 'rose', 'gold', 'peridot']

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  fonts: {
    display: "'Silk Serif', serif",      // Headlines, hero text
    body: "'Satoshi', sans-serif",       // Body copy, UI
    mono: "'Azeret Mono', monospace",    // Code, labels, captions
  },

  // Font sizes (using clamp for fluid typography)
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },

  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  leading: {
    none: 1,
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  32: '8rem',       // 128px
}

// =============================================================================
// ANIMATION
// =============================================================================

export const animation = {
  // Easing functions
  easing: {
    default: 'cubic-bezier(0.22, 1, 0.36, 1)', // Smooth, slightly bouncy
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    snappy: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },

  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Stagger delays for sequences
  stagger: {
    fast: 50,    // ms between items
    normal: 100,
    slow: 150,
  },
}

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  // Custom
  dsDesktop: '1077px', // Design system grid breakpoint
}

// =============================================================================
// EFFECTS
// =============================================================================

export const effects = {
  // Border radius
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Box shadows
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },

  // Backdrop blur
  blur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get color value based on theme
 * @param {string} colorKey - Key from brand palette (e.g., 'amethyst')
 * @param {boolean} isDark - Whether dark mode is active
 */
export const getColor = (colorKey, isDark) =>
  colors.brand[colorKey]?.[isDark ? 'dark' : 'light'] ||
  colors.brand[colorKey]?.light

/**
 * Get all palette colors as array for charts/gradients
 * @param {boolean} isDark - Whether dark mode is active
 */
export const getPaletteColors = (isDark) =>
  paletteOrder.map((key) => getColor(key, isDark))

/**
 * Get semantic color
 * @param {string} key - Semantic key (e.g., 'accent', 'error')
 * @param {boolean} isDark - Whether dark mode is active
 */
export const getSemanticColor = (key, isDark) =>
  colors.semantic[key]?.[isDark ? 'dark' : 'light']
