export default function SectionDivider() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-2">
      <div className="flex items-center justify-center gap-1 text-border overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="text-sm select-none">───</span>
        ))}
      </div>
    </div>
  )
}
