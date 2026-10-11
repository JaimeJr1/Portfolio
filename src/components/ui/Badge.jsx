export default function Badge({ children }) {
  return (
    <span className="font-mono inline-block px-2.5 py-0.5 text-xs rounded border border-border bg-bg-titlebar text-accent-cyan">
      {children}
    </span>
  )
}
