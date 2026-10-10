// Flat content panel: the calm counterpart to the hero's TerminalWindow.
export default function Panel({ children, className = '' }) {
  return (
    <div className={`rounded-lg border border-border bg-bg-terminal ${className}`}>
      <div className="p-5 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
