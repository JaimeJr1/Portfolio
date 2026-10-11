import { motion } from 'framer-motion'
import SectionHeader from '../components/terminal/SectionHeader'
import SkillsMarquee from '../components/SkillsMarquee'
import Highlight from '../components/ui/Highlight'
import { resume } from '../data/resume'

// Deterministic short "commit" hashes for the achievements git log.
const HASHES = ['a3f9c21', '7e4d0b8', 'c91a4f2', '2b8e7d3', 'f60c5a9']

const ACCENTS = [
  'var(--color-accent-green)',
  'var(--color-accent-cyan)',
  'var(--color-accent-purple)',
  'var(--color-accent-yellow)',
  'var(--color-accent-orange)',
]

// Renders **bold** markers as <strong>. Timeline cards invert to a light
// surface, where the cyan Highlight treatment would lack contrast.
function Plain({ text }) {
  return text.split('**').map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

export default function Resume() {
  const entries = [
    ...resume.experience.map((e) => ({
      heading: e.title,
      sub: e.company,
      date: e.date,
      bullets: e.bullets,
    })),
    ...resume.education.map((e) => ({
      heading: e.school,
      sub: e.degree,
      date: `${e.date} · GPA ${e.gpa}`,
      bullets: e.highlights,
    })),
  ]

  return (
    <section className="w-full px-4 py-16 max-w-5xl mx-auto">
      <SectionHeader command="cat resume.txt" title="Experience" id="resume" />

      {/* Timeline: light cards against the dark page are the contrast pop */}
      <div className="relative max-w-3xl">
        <div className="absolute left-[7px] top-1 bottom-4 w-px bg-border" aria-hidden="true" />
        {entries.map((entry, i) => {
          const accent = ACCENTS[i % ACCENTS.length]
          return (
            <motion.div
              key={entry.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="relative pl-10 pb-10"
            >
              <span
                className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-[3px] border-bg-primary"
                style={{ background: accent }}
                aria-hidden="true"
              />
              <div
                className="rounded-xl bg-text-primary text-bg-primary p-5 sm:p-6 shadow-xl shadow-black/20"
                style={{ borderLeft: `4px solid ${accent}` }}
              >
                <h3 className="font-display text-2xl sm:text-3xl leading-none">{entry.heading}</h3>
                <p className="text-sm font-medium mt-1.5 opacity-80">{entry.sub}</p>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase mt-1.5 opacity-60">
                  {entry.date}
                </p>
                <ul className="mt-4 space-y-2">
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="text-sm leading-relaxed opacity-85 flex gap-2">
                      <span className="font-mono select-none" style={{ color: accent }}>
                        +
                      </span>
                      <span>
                        <Plain text={b} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Highlights as a git log */}
      {resume.highlights && (
        <div className="mt-2 mb-14 max-w-3xl">
          <p className="font-mono text-xs text-text-muted mb-1">
            <span className="text-accent-green">$</span>{' '}
            <span className="text-accent-purple">git log --achievements</span>
          </p>
          <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-text-primary mb-5">
            Highlights
          </h3>
          <div className="font-mono text-sm space-y-2.5">
            {resume.highlights.map((h, i) => (
              <div key={i} className="flex gap-3 items-baseline">
                <span className="text-accent-yellow shrink-0">{HASHES[i % HASHES.length]}</span>
                <span className="text-accent-green select-none shrink-0">★</span>
                <span className="text-text-primary">
                  <Highlight>{h}</Highlight>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toolkit: counter-scrolling logo marquee */}
      <div className="mb-14">
        <p className="font-mono text-xs text-text-muted mb-1">
          <span className="text-accent-green">$</span>{' '}
          <span className="text-accent-purple">cat toolkit.txt</span>
        </p>
        <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-text-primary mb-6">
          Toolkit
        </h3>
        <SkillsMarquee />
      </div>

      {/* Download Button */}
      <a
        href={`${import.meta.env.BASE_URL}resume.pdf`}
        download
        className="inline-flex items-center gap-2 px-6 py-3 border border-accent-green text-accent-green rounded-lg hover:bg-accent-green hover:text-bg-primary transition-all duration-300 text-sm font-medium"
      >
        Download resume (PDF)
      </a>
    </section>
  )
}
