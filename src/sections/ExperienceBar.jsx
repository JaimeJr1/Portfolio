import { motion } from 'framer-motion'

const companies = [
  { name: 'Plix', label: 'Infrastructure' },
  { name: 'Georgia Tech', label: 'Research' },
  { name: 'LLAMAS Lab', label: 'AI Systems' },
  { name: 'MIT Energy Initiative', label: 'ML' },
  { name: 'GTRI', label: 'Healthcare ML' },
]

export default function ExperienceBar() {
  const items = [...companies, ...companies]

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

        <div className="marquee-track gap-6">
          {items.map((company, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-border/60 bg-bg-terminal/40 hover:border-accent-green/40 transition-colors duration-300"
            >
              <span className="text-accent-green text-xs select-none">▸</span>
              <span className="text-text-primary text-sm font-medium whitespace-nowrap">
                {company.name}
              </span>
              <span className="text-text-muted text-xs whitespace-nowrap hidden sm:inline">
                {company.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
