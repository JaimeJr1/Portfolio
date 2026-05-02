import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'

const stats = [
  { label: 'research_labs', value: 3, suffix: '' },
  { label: 'internships', value: 3, suffix: '' },
  { label: 'technologies', value: 15, suffix: '+' },
  { label: 'cups_of_coffee', value: null, display: '∞' },
]

function StatItem({ stat }) {
  const { count, ref } = useCountUp(stat.value || 0, 1800)

  return (
    <div ref={ref} className="flex items-center gap-2 text-sm">
      <span className="text-accent-green select-none">&gt;</span>
      <span className="text-text-muted">{stat.label}:</span>
      <span className="text-accent-cyan font-semibold tabular-nums">
        {stat.display || `${count}${stat.suffix}`}
      </span>
    </div>
  )
}

export default function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 px-6 py-4 rounded-lg border border-border bg-bg-terminal/50">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </motion.div>
  )
}
