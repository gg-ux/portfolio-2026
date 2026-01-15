import { forwardRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Input Component
 *
 * Underline-style form inputs matching the site's minimal aesthetic.
 *
 * Variants:
 * - input: Single-line text input
 * - textarea: Multi-line text area
 * - select: Dropdown select
 */

const Input = forwardRef(function Input({
  label,
  optional = false,
  required = false,
  error,
  className = '',
  ...props
}, ref) {
  const { isDark } = useTheme()

  const baseClasses = `
    w-full px-0 py-3
    font-satoshi text-base
    bg-transparent
    border-0 border-b
    transition-all duration-300
    outline-none
    rounded-none
    ${isDark
      ? 'border-white/20 text-white placeholder:text-white/30 focus:border-white/60'
      : 'border-black/20 text-gray-900 placeholder:text-black/30 focus:border-black/60'
    }
    ${error
      ? isDark ? '!border-red-400/60' : '!border-red-500/60'
      : ''
    }
  `

  const labelClasses = `
    block mb-1 font-mono text-[11px] tracking-wide uppercase
    ${isDark ? 'text-white/50' : 'text-black/50'}
  `

  const optionalClasses = isDark ? 'text-white/30' : 'text-black/30'
  const errorClasses = 'mt-1.5 font-mono text-[10px] tracking-wide text-red-400'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id} className={labelClasses}>
          {label}{required && ' *'}
          {optional && <span className={optionalClasses}> (optional)</span>}
        </label>
      )}
      <input
        ref={ref}
        className={baseClasses}
        {...props}
      />
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  )
})

const Textarea = forwardRef(function Textarea({
  label,
  optional = false,
  required = false,
  error,
  className = '',
  rows = 4,
  ...props
}, ref) {
  const { isDark } = useTheme()

  const baseClasses = `
    w-full px-0 py-3
    font-satoshi text-base
    bg-transparent
    border-0 border-b
    transition-all duration-300
    outline-none
    resize-none
    rounded-none
    ${isDark
      ? 'border-white/20 text-white placeholder:text-white/30 focus:border-white/60'
      : 'border-black/20 text-gray-900 placeholder:text-black/30 focus:border-black/60'
    }
    ${error
      ? isDark ? '!border-red-400/60' : '!border-red-500/60'
      : ''
    }
  `

  const labelClasses = `
    block mb-1 font-mono text-[11px] tracking-wide uppercase
    ${isDark ? 'text-white/50' : 'text-black/50'}
  `

  const optionalClasses = isDark ? 'text-white/30' : 'text-black/30'
  const errorClasses = 'mt-1.5 font-mono text-[10px] tracking-wide text-red-400'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id} className={labelClasses}>
          {label}{required && ' *'}
          {optional && <span className={optionalClasses}> (optional)</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={baseClasses}
        {...props}
      />
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  )
})

const Select = forwardRef(function Select({
  label,
  optional = false,
  error,
  options = [],
  className = '',
  ...props
}, ref) {
  const { isDark } = useTheme()

  const baseClasses = `
    w-full px-0 py-3
    font-satoshi text-base
    bg-transparent
    border-0 border-b
    transition-all duration-300
    outline-none
    appearance-none
    cursor-pointer
    rounded-none
    ${isDark
      ? 'border-white/20 text-white focus:border-white/60'
      : 'border-black/20 text-gray-900 focus:border-black/60'
    }
    ${!props.value ? (isDark ? 'text-white/30' : 'text-black/30') : ''}
    ${error
      ? isDark ? '!border-red-400/60' : '!border-red-500/60'
      : ''
    }
  `

  const labelClasses = `
    block mb-1 font-mono text-[11px] tracking-wide uppercase
    ${isDark ? 'text-white/50' : 'text-black/50'}
  `

  const optionalClasses = isDark ? 'text-white/30' : 'text-black/30'
  const errorClasses = 'mt-1.5 font-mono text-[10px] tracking-wide text-red-400'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id} className={labelClasses}>
          {label}
          {optional && <span className={optionalClasses}> (optional)</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={baseClasses}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  )
})

export { Input, Textarea, Select }
