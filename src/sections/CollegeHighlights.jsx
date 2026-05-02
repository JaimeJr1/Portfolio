import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import { collegeHighlights } from '../data/collegeHighlights'

function HighlightCard({ highlight, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <TerminalWindow
        title={highlight.filename}
        className="hover:border-accent-green hover:shadow-[0_0_20px_rgba(63,185,80,0.1)] transition-all duration-300"
      >
        <div
          className="w-full aspect-video rounded-md flex items-center justify-center text-4xl mb-3 border border-border/50"
          style={{ backgroundColor: highlight.color + '12' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span style={{ color: highlight.color, opacity: 0.4, fontSize: '2.5rem' }}>{'</>'}</span>
            <span className="text-xs text-text-muted">image placeholder</span>
          </div>
        </div>

        <p className="text-text-muted text-xs text-center">
          <span className="text-accent-green">#</span> {highlight.caption}
        </p>
      </TerminalWindow>
    </motion.div>
  )
}

export default function CollegeHighlights() {
  return (
    <section className="w-full px-4 py-20 max-w-5xl mx-auto">
      <SectionHeader command="ls ~/college/highlights/" id="college" />

      <p className="text-text-muted text-sm text-center mb-8 -mt-4">
        Some of my favorite moments from my time in college.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {collegeHighlights.map((highlight, i) => (
          <HighlightCard key={highlight.filename} highlight={highlight} index={i} />
        ))}
      </div>
    </section>
  )
}
