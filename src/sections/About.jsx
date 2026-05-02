import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import CommandOutput from '../components/terminal/CommandOutput'
import Badge from '../components/ui/Badge'

const info = [
  { label: 'Name', value: 'Jaime Alonso' },
  { label: 'Location', value: 'City, State' },
  { label: 'University', value: 'University of Technology' },
  { label: 'Major', value: 'Computer Science' },
]

const skills = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js',
  'PostgreSQL', 'Docker', 'Git', 'AWS', 'Linux',
]

const quickStats = [
  { label: 'years_coding', value: '4' },
  { label: 'projects', value: '6+' },
  { label: 'gpa', value: '3.85' },
]

export default function About() {
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
              <pre className="text-accent-green text-xs leading-tight select-none">{`
     ██  █████
     ██ ██   ██
     ██ ███████
██   ██ ██   ██
 █████  ██   ██
              `.trim()}</pre>
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
              I'm a passionate full stack developer and computer science student who loves building
              things that solve real problems. From distributed systems to sleek front-end interfaces,
              I enjoy working across the entire stack.
            </p>
            <p className="text-text-primary leading-relaxed">
              When I'm not coding, you can find me contributing to open-source projects,
              competing in hackathons, or exploring the latest in cloud computing and AI.
              I believe in writing clean, maintainable code and learning something new every day.
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
