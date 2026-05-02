import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import Badge from '../components/ui/Badge'
import { projects } from '../data/projects'

const statusColors = {
  active: 'bg-accent-green',
  'in-progress': 'bg-accent-yellow',
  archived: 'bg-accent-orange',
}

const statusLabels = {
  active: 'active',
  'in-progress': 'wip',
  archived: 'archived',
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <TerminalWindow
        title={
          <span className="inline-flex items-center gap-2">
            {project.filename}
            {project.featured && (
              <span className="text-accent-yellow text-xs">[FEATURED]</span>
            )}
            <span className="inline-flex items-center gap-1 ml-auto">
              <span className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
              <span className="text-xs text-text-muted">{statusLabels[project.status]}</span>
            </span>
          </span>
        }
        className="h-full hover:border-accent-green hover:shadow-[0_0_20px_rgba(63,185,80,0.1)] transition-all duration-300"
      >
        {/* Project preview strip */}
        <div
          className="w-full h-2 rounded-full mb-4 opacity-60"
          style={{ background: `linear-gradient(90deg, ${project.color}40, ${project.color})` }}
        />

        <div className="text-text-muted text-xs mb-3">
          <span className="text-accent-green">$</span> cat README.md
        </div>

        <h3 className="text-accent-purple text-base font-semibold mb-2">
          {project.title}
        </h3>

        <p className="text-text-primary text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="flex gap-4 text-xs pt-3 border-t border-border">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline"
          >
            <span className="text-accent-green">$</span> open --github
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline"
            >
              <span className="text-accent-green">$</span> open --live
            </a>
          )}
        </div>
      </TerminalWindow>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section className="w-full px-4 py-20 max-w-5xl mx-auto">
      <SectionHeader command="ls ~/projects/" id="projects" />

      <p className="text-text-muted text-sm text-center mb-8 -mt-4">
        A collection of things I've built — from full-stack apps to CLI tools.
      </p>

      {/* Featured projects first */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      )}

      {/* Rest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rest.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i + featured.length} />
        ))}
      </div>
    </section>
  )
}
