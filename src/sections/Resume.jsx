import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import Badge from '../components/ui/Badge'
import { resume } from '../data/resume'

export default function Resume() {
  return (
    <section className="w-full px-4 py-20 max-w-4xl mx-auto">
      <SectionHeader command="cat resume.txt" id="resume" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <TerminalWindow title="resume.txt">
          {/* Education */}
          <div className="mb-6">
            <div className="text-accent-purple font-semibold mb-3">=== EDUCATION ===</div>
            {resume.education.map((edu, i) => (
              <div key={i}>
                <div className="text-text-primary font-medium">
                  {edu.school} -- {edu.degree}
                </div>
                <div className="text-text-muted text-sm">
                  {edu.date} | GPA: {edu.gpa}
                </div>
                <ul className="mt-2 space-y-1">
                  {edu.highlights.map((h, j) => (
                    <li key={j} className="text-text-muted text-sm flex gap-2">
                      <span className="text-accent-green select-none">-</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="mb-6">
            <div className="text-accent-purple font-semibold mb-3">=== EXPERIENCE ===</div>
            <div className="space-y-5">
              {resume.experience.map((exp, i) => (
                <div key={i}>
                  <div className="text-text-primary font-medium">
                    {exp.title}{' '}
                    <span className="text-accent-yellow">@</span>{' '}
                    {exp.company}
                  </div>
                  <div className="text-text-muted text-sm">{exp.date}</div>
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-text-muted text-sm flex gap-2">
                        <span className="text-accent-green select-none">-</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <div className="text-accent-purple font-semibold mb-3">=== SKILLS ===</div>
            <div className="space-y-3">
              {Object.entries(resume.skills).map(([category, items]) => (
                <div key={category} className="flex flex-wrap items-start gap-2">
                  <span className="text-text-muted text-sm capitalize min-w-[100px]">
                    {category}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TerminalWindow>

        {/* Download Button */}
        <div className="mt-6 flex justify-center">
          <a
            href="/Portfolio/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent-green text-accent-green rounded-lg hover:bg-accent-green hover:text-bg-primary transition-all duration-300 text-sm font-medium"
          >
            <span className="text-text-muted">$</span> download resume.pdf
          </a>
        </div>
      </motion.div>
    </section>
  )
}
