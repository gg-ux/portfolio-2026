// Brand colors with dark mode variants
// Dark mode variants are adjusted for better visibility on dark backgrounds

export const brandColors = {
  amethyst: { light: '#5835B0', dark: '#8B6AFF' },
  lilac: { light: '#BF92F0', dark: '#BF92F0' },
  rose: { light: '#D78F8D', dark: '#D78F8D' },
  gold: { light: '#DBA166', dark: '#DBA166' },
  // Semantic/extended palette
  peridot: { light: '#87AA61', dark: '#87AA61' },
}

// Helper to get the appropriate color based on theme
export const getColor = (colorKey, isDark) =>
  brandColors[colorKey]?.[isDark ? 'dark' : 'light'] || brandColors[colorKey]?.light

// Raw hex values for cases where you need just the color
export const colors = {
  amethyst: '#5835B0',
  lilac: '#BF92F0',
  rose: '#D78F8D',
  gold: '#DBA166',
}

// Palette array in order (useful for charts, gradients, etc.)
export const paletteOrder = ['amethyst', 'lilac', 'rose', 'gold']

export const getPaletteColors = (isDark) =>
  paletteOrder.map((key) => getColor(key, isDark))
