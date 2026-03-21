import { useTheme } from '../../context/ThemeContext'
import { colors } from '../../constants/tokens'

/**
 * Table Component
 *
 * Atomic design: Molecule
 *
 * A flexible table component with consistent styling following the Gooey design system.
 * Supports headers, semantic color coding, and responsive behavior.
 *
 * Usage:
 * <Table
 *   headers={['Name', 'Type', 'Description']}
 *   columnWidths={['col-span-3', 'col-span-3', 'col-span-6']}
 * >
 *   <Table.Row>
 *     <Table.Cell>value</Table.Cell>
 *     <Table.Cell color="success">passing</Table.Cell>
 *     <Table.Cell>description here</Table.Cell>
 *   </Table.Row>
 * </Table>
 */

// Get semantic color based on type and theme
const getSemanticColor = (colorType, isDark) => {
  const colorMap = {
    success: colors.semantic.success[isDark ? 'dark' : 'light'],
    error: colors.semantic.error[isDark ? 'dark' : 'light'],
    accent: colors.semantic.accent[isDark ? 'dark' : 'light'],
    warning: isDark ? '#F59E0B' : '#D97706', // Using warning from system colors
    muted: colors.text.muted[isDark ? 'dark' : 'light'],
  }
  return colorMap[colorType] || null
}

export function Table({ headers, columnWidths, children, className = '' }) {
  const { isDark } = useTheme()
  const borderClass = isDark ? 'border-white/[0.06]' : 'border-black/[0.08]'

  return (
    <div className={`border ${borderClass} rounded-xl overflow-hidden ${className}`}>
      {/* Table Header */}
      {headers && (
        <div className={`grid grid-cols-12 gap-4 items-center px-6 py-3 ${isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]'}`}>
          {headers.map((header, index) => (
            <span
              key={header}
              className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-black/40'} ${columnWidths?.[index] || ''}`}
            >
              {header}
            </span>
          ))}
        </div>
      )}
      {/* Table Body */}
      <div className={`divide-y ${isDark ? 'divide-white/[0.06]' : 'divide-black/[0.06]'} px-6`}>
        {children}
      </div>
    </div>
  )
}

export function TableRow({ children, className = '' }) {
  return (
    <div className={`py-3 grid grid-cols-12 gap-4 items-center ${className}`}>
      {children}
    </div>
  )
}

export function TableCell({ children, className = '', color, mono = false }) {
  const { isDark } = useTheme()

  // Determine text color
  let textColorStyle = {}
  let textColorClass = ''

  if (color) {
    const semanticColor = getSemanticColor(color, isDark)
    if (semanticColor) {
      textColorStyle = { color: semanticColor }
    }
  } else if (mono) {
    textColorClass = isDark ? 'text-white/70' : 'text-black/70'
  }

  return (
    <span
      className={`text-xs ${mono ? 'font-mono' : ''} ${textColorClass} ${className}`}
      style={textColorStyle}
    >
      {children}
    </span>
  )
}

// Attach subcomponents
Table.Row = TableRow
Table.Cell = TableCell

export default Table
