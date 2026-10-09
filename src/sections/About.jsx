import { useState } from 'react'
import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import CommandOutput from '../components/terminal/CommandOutput'
import Badge from '../components/ui/Badge'
import Highlight from '../components/ui/Highlight'
import { useCountUp } from '../hooks/useCountUp'

const info = [
  { label: 'Name', value: 'Jaime Alonso' },
  { label: 'Location', value: 'Atlanta, GA' },
  { label: 'University', value: 'Georgia Institute of Technology' },
  { label: 'Major', value: 'CS — Systems Architecture & Info Internetworks' },
  { label: 'Current', value: 'Undergraduate Researcher @ LLAMAS Lab' },
  { label: 'Languages', value: 'English, Spanish (Native), French (Fluent)' },
]

const skills = [
  'C++', 'C', 'Python', 'Kotlin', 'Java',
  'POSIX threads', 'Linux scheduling', 'GGML', 'Docker', 'gRPC',
  'PyTorch', 'JAX', 'XGBoost', 'Git', 'GitHub Actions', 'GCP',
]

const quickStats = [
  { label: 'gpa', target: 40, render: (c) => (c / 10).toFixed(1) },
  { label: 'research_labs', target: 3 },
  { label: 'devices_shipped_to', target: 2500, render: (c) => `${c.toLocaleString()}+` },
  { label: 'infra_savings', target: 500, render: (c) => `$${c}K/yr` },
  { label: 'languages', target: 3 },
  { label: 'cold_pressed_oj', value: '∞' },
]

const moments = [
  {
    src: 'images/college/nova-111-selection.jpg',
    caption: 'Nova 111 — Top 10 CS in Spain',
  },
  {
    src: 'images/college/plix-internship.jpg',
    caption: 'Joining Plix AI in San Francisco',
  },
  {
    src: 'images/college/state-capitol-sga.jpg',
    caption: 'GT SGA at the Georgia State Capitol',
  },
  {
    src: 'images/college/bolivia-energy-project.jpg',
    caption: 'Sustainable energy proposal for rural Bolivia',
  },
]

function StatValue({ stat }) {
  const { count, ref } = useCountUp(stat.target ?? 0, 1500)

  if (stat.value) {
    return <span className="text-accent-cyan font-semibold">{stat.value}</span>
  }
  return (
    <span ref={ref} className="text-accent-cyan font-semibold">
      {stat.render ? stat.render(count) : count}
    </span>
  )
}

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="w-full px-4 py-20 max-w-4xl mx-auto">
      <SectionHeader command="cat about.md" id="about" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <TerminalWindow title="about.sh">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Headshot — centered above the info on phones, beside it on desktop */}
            <div className="flex flex-col items-center shrink-0 self-center sm:self-start">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-accent-green/60 shadow-[0_0_20px_rgba(63,185,80,0.15)] bg-bg-primary">
                {!imgError ? (
                  <img
                    src={`${import.meta.env.BASE_URL}images/headshot.png`}
                    alt="Jaime Alonso"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-accent-green text-3xl font-bold select-none">JA</span>
                  </div>
                )}
              </div>
              <span className="text-text-muted text-xs mt-2">v1.0.0</span>
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              <CommandOutput lines={info} />

              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:gap-4 py-3 px-4 rounded border border-border bg-bg-primary/30">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="text-xs">
                    <span className="text-text-muted">{stat.label}:</span>{' '}
                    <StatValue stat={stat} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5 space-y-4">
            <p className="text-text-primary leading-relaxed">
              <Highlight>
                CS student at Georgia Tech researching on-device AI at the LLAMAS Lab. Spent summer
                2026 at Plix AI (Sequoia- and a16z-backed body cameras), shipping real-time incident
                detection to **2,500+ deployed devices** and accelerating on-device speech
                recognition ~10x to cut **~$500K/yr in cloud costs**. Previously applied ML to
                healthcare diagnostics at GTRI with 97.25% precision. Trilingual, **Nova 111 honoree
                (top 10 CS in Spain)**, and always looking for the next hard problem to break down
                and solve.
              </Highlight>
            </p>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <div className="text-text-muted text-xs mb-3">
              <span className="text-accent-green">$</span> ls ~/beyond-code/
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {moments.map((m) => (
                <figure
                  key={m.src}
                  className="rounded border border-border overflow-hidden bg-bg-primary/40 hover:border-accent-green/50 transition-colors"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${m.src}`}
                    alt={m.caption}
                    loading="lazy"
                    className="w-full h-24 sm:h-28 object-cover"
                  />
                  <figcaption className="px-2 py-1.5 text-xs leading-snug text-text-muted">
                    {m.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <div className="flex items-start gap-2">
              <span className="text-accent-green select-none">&gt;</span>
              <div>
                <span className="text-text-muted">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  )
}
