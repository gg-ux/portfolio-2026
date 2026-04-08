export default function SlideLabel({ children, className = '' }) {
  return (
    <span className={`font-mono text-[12px] uppercase tracking-wide text-white/40 ${className}`}>
      {children}
    </span>
  )
}
