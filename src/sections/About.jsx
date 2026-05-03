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
  { label: 'languages', value: '3' },
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
              Rafa Nadal once said every point should be played like the last. That mentality shapes
              how I approach engineering — no problem is too small to deserve full effort, no system
              too complex to break down and master. Growing up between Spain and the U.S. taught me
              to adapt fast and think across boundaries, which is exactly what pulled me into computer science.
            </p>
            <p className="text-text-primary leading-relaxed">
              At Georgia Tech, I've channeled that intensity into work at the boundary of hardware and
              intelligence — building ML-informed VR safety simulations, researching edge computing at the
              LLAMAS Lab, and leading software for the Ramblin Rocket Club. Internships at Plix, MIT Energy
              Initiative, and Metro de Madrid each taught me something different: how to build infrastructure
              that scales, how AI reshapes energy grids, and how engineering keeps a city moving.
            </p>
            <p className="text-text-primary leading-relaxed">
              I'm a Faculty Honors student, a Nova 111 honoree (top 10 CS in Spain), and CS Representative
              in Student Government — but what I want people to remember is the curiosity. I want to build
              systems that are as relentless as a Nadal forehand: precise, tireless, and always improving.
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
