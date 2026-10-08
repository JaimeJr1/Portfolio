import { useEffect, useRef, useState } from 'react'
import { SITE } from '../../utils/constants'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function SectionHeader({ command, id }) {
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
    <h2 id={id} ref={ref} className="text-lg mb-8 font-normal text-center">
      <span className="text-accent-green">{SITE.prompt}:~$</span>{' '}
      <span className="text-accent-purple">{command.slice(0, shown)}</span>
      {started && !done && <span className="cursor-blink text-accent-green">_</span>}
    </h2>
  )
}
