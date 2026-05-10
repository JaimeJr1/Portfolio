import { useState } from 'react'
import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import CommandOutput from '../components/terminal/CommandOutput'
import Badge from '../components/ui/Badge'

const info = [
  { label: 'Name', value: 'Jaime Alonso' },
  { label: 'Location', value: 'Atlanta, GA' },
  { label: 'University', value: 'Georgia Institute of Technology' },
  { label: 'Major', value: 'CS — Intelligence & Info Internetworks' },
  { label: 'Current', value: 'Systems & Infrastructure Intern @ Plix' },
  { label: 'Languages', value: 'English, Spanish (Native), French (Fluent)' },
]

const skills = [
  'Python', 'Java', 'C++', 'C', 'JavaScript',
  'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'XGBoost',
  'Unity', 'Streamlit', 'Django', 'Git', 'GCP', 'Docker',
]

const quickStats = [
  { label: 'gpa', value: '4.0' },
  { label: 'research_labs', value: '3' },
  { label: 'internships', value: '3' },
  { label: 'technologies', value: '15+' },
  { label: 'languages', value: '3' },
  { label: 'cups_of_coffee', value: '∞' },
]

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
            {/* ASCII Initials */}
            <div className="hidden sm:flex flex-col items-center shrink-0">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-accent-green/60 shadow-[0_0_20px_rgba(63,185,80,0.15)] bg-bg-primary">
                {!imgError ? (
                  <img
                    src={`${import.meta.env.BASE_URL}images/headshot.jpg`}
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

              <div className="mt-5 flex flex-wrap gap-4 py-3 px-4 rounded border border-border bg-bg-primary/30">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="text-xs">
                    <span className="text-text-muted">{stat.label}:</span>{' '}
                    <span className="text-accent-cyan font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5 space-y-4">
            <p className="text-text-primary leading-relaxed">
              CS student at Georgia Tech researching AI systems and edge computing at the LLAMAS Lab.
              Currently building infrastructure at Plix in San Francisco. Previously applied ML at
              MIT Energy Initiative and GTRI — from optimizing energy grids to achieving 97.25%
              precision on healthcare diagnostics. Trilingual, Nova 111 honoree (top 10 CS in Spain),
              and always looking for the next hard problem to break down and solve.
            </p>
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
