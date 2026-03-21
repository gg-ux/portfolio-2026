/**
 * Color utilities - re-exports from tokens.js for backwards compatibility
 *
 * Note: tokens.js is the single source of truth for all design tokens.
 * This file exists for backwards compatibility with existing imports.
 */

import { colors, paletteOrder, getColor, getPaletteColors } from './tokens'

// Re-export brand colors in the legacy format
export const brandColors = colors.brand

// Re-export helpers
export { getColor, getPaletteColors, paletteOrder }

// Legacy raw hex values (light mode defaults)
export { colors }
