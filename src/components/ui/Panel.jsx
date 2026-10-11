// Flat content panel: the calm counterpart to the hero's TerminalWindow.
export default function Panel({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-border bg-bg-terminal ${className}`}>
      <div className="p-6 sm:p-7 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
