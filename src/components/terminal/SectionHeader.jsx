import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function SectionHeader({ command, title, id }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [chars, setChars] = useState(0)
  const [reduceMotion] = useState(prefersReducedMotion)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.6 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || reduceMotion || chars >= command.length) return
    const t = setTimeout(() => setChars((c) => c + 1), 45)
    return () => clearTimeout(t)
  }, [started, reduceMotion, chars, command.length])

  const shown = reduceMotion ? command.length : chars
  const done = shown >= command.length

  return (
    <div id={id} ref={ref} className="mb-8">
      <p className="font-mono text-xs text-text-muted mb-1">
        <span className="text-accent-green">$</span>{' '}
        <span className="text-accent-purple">{command.slice(0, shown)}</span>
        {started && !done && <span className="cursor-blink text-accent-green">_</span>}
      </p>
      <h2 className="font-display text-text-primary text-5xl sm:text-6xl leading-none tracking-wide">
        {title}
      </h2>
    </div>
  )
}
