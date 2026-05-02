export default function CommandOutput({ lines }) {
  return (
    <div className="space-y-1">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="text-accent-green mr-2 select-none">&gt;</span>
          <span>
            <span className="text-text-muted">{line.label}:</span>{' '}
            <span className="text-text-primary">{line.value}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
