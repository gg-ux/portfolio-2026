/**
 * Hero Configuration
 *
 * Change the ACTIVE_HERO value to switch between hero variants.
 *
 * Available options:
 * - 'solstice'  : Solstice - Canvas-based aurora-like organic form (current production)
 * - 'painterly' : Painterly - WebGL shader with paint-like blobs
 * - 'fluid'     : FluidBlob - 3D blob with text overlay
 *
 * To switch heroes, just tell Claude:
 * "Update hero to Solstice" or "Update hero to Painterly" or "Update hero to FluidBlob"
 */

export const HERO_VARIANTS = {
  SOLSTICE: 'solstice',
  PAINTERLY: 'painterly',
  FLUID: 'fluid',
}

// Change this value to switch the homepage hero
export const ACTIVE_HERO = HERO_VARIANTS.FLUID
