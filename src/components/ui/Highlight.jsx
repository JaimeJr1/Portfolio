// Renders **marked** phrases in cyan semibold. Highlights are chosen
// editorially in the content itself — complete claims a recruiter should
// anchor on, never bare numbers.
export default function Highlight({ children, className = '' }) {
  const parts = String(children).split(/\*\*(.+?)\*\*/g)
  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent-cyan font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  )
}
