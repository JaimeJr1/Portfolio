// Syntax-highlights metrics in prose: dollar amounts, percentages,
// multipliers, counts, and before→after pairs ($500K/yr, 88%, 10x,
// 2,500+, 70s → 13s) render cyan and semibold so scanners anchor on them.
const METRIC_RE =
  /(~?\$?\d[\d,.]*(?:[–-]\d[\d,.]*)?(?:\s?[KM])?(?:\/yr|\/hr)?(?:x|%|ms|s|W)?\+?(?:\s*→\s*~?\$?\d[\d,.]*(?:\s?[KM])?(?:\/yr|\/hr)?(?:x|%|ms|s|W)?\+?)?)/g

export default function Highlight({ children, className = '' }) {
  const parts = String(children).split(METRIC_RE)
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
