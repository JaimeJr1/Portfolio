import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const companies = [
  { name: 'Plix AI', label: 'Systems & Infrastructure' },
  { name: 'Georgia Tech', label: 'Research' },
  { name: 'LLAMAS Lab', label: 'On-Device AI' },
  { name: 'Ramblin\' Rocket Club', label: 'Simulations' },
  { name: 'GTRI', label: 'Healthcare ML' },
]

export default function ExperienceBar() {
  const items = [...companies, ...companies]
  const trackRef = useRef(null)

  // Scale and glow each chip by its proximity to the container's center as
  // the CSS marquee animation moves the track underneath.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    const tick = () => {
      const track = trackRef.current
      if (track) {
        const parent = track.parentElement.getBoundingClientRect()
        const centerX = parent.left + parent.width / 2
        for (const chip of track.children) {
          const r = chip.getBoundingClientRect()
          const d = Math.abs(r.left + r.width / 2 - centerX)
          const p = Math.max(0, 1 - d / 280)
          chip.style.transform = `scale(${1 + 0.22 * p})`
          chip.style.borderColor = `rgba(63, 185, 80, ${0.2 + 0.6 * p})`
          chip.style.boxShadow =
            p > 0.4 ? `0 0 ${Math.round(20 * p)}px rgba(63, 185, 80, 0.3)` : 'none'
          chip.style.zIndex = p > 0.4 ? '1' : '0'
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full py-6 overflow-hidden"
    >
      <p className="text-text-muted text-xs text-center mb-5">
        <span className="text-accent-green">$</span>{' '}
        <span className="text-accent-purple">grep</span>{' '}
        <span className="text-text-primary">"experience"</span> ./career.log
      </p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="marquee-track gap-6">
          {items.map((company, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-lg border border-accent-green/20 bg-bg-terminal/60 hover:border-accent-green/60 transition-colors duration-300"
            >
              <span className="text-accent-green text-sm select-none">▸</span>
              <span className="text-text-primary text-base font-semibold whitespace-nowrap">
                {company.name}
              </span>
              <span className="text-text-muted text-sm whitespace-nowrap hidden sm:inline">
                {company.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
