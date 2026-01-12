/**
 * Divider Component
 *
 * Atomic design: Atom
 *
 * Consistent divider styling used throughout the site.
 * Uses theme-aware colors via CSS classes
 */

export function Divider({
  orientation = 'horizontal',
  className = '',
  fullWidth = true,
}) {
  // Using a class that will be styled differently for light/dark
  const baseStyles = 'divider-color'

  if (orientation === 'vertical') {
    return (
      <div className={`w-px h-full ${baseStyles} ${className}`} />
    )
  }

  return (
    <div className={`h-px ${fullWidth ? 'w-full' : ''} ${baseStyles} ${className}`} />
  )
}

// Full-width section divider
export function SectionDivider({ className = '' }) {
  return <Divider fullWidth className={className} />
}

// Vertical divider for grids
export function GridDivider({ className = '' }) {
  return (
    <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-px divider-color ${className}`} />
  )
}

export default Divider
