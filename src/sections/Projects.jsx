import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

function ProjectCard({ project, index, onViewImage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
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
        className="h-full group hover:border-accent-green hover:shadow-[0_0_20px_rgba(63,185,80,0.1)] transition-all duration-300"
      >
        {/* Terminal preview block — hovering reveals the project image when one exists */}
        <div
          className={`relative w-full h-28 rounded border border-border/50 bg-bg-primary/50 p-3 mb-4 overflow-hidden font-mono text-xs ${
            project.image ? 'cursor-zoom-in' : ''
          }`}
          onClick={
            project.image
              ? (e) => {
                  e.stopPropagation()
                  onViewImage(project)
                }
              : undefined
          }
        >
          {project.preview.map((line, i) => (
            <div key={i} className={i === 0 ? 'text-accent-green' : 'text-text-muted'}>
              {line}
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-bg-primary/80 to-transparent pointer-events-none" />
          {project.image?.thumb && (
            <img
              src={`${import.meta.env.BASE_URL}${project.image.thumb}`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
        </div>

        {project.metrics && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-accent-green/10 border border-accent-green/20"
              >
                <span className="text-accent-green font-bold">{m.value}</span>
                <span className="text-text-muted">{m.label}</span>
              </div>
            ))}
          </div>
        )}

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
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline"
            >
              <span className="text-accent-green">$</span> open --github
            </a>
          )}
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
          {project.image && (
            <button
              onClick={() => onViewImage(project)}
              className="text-accent-cyan hover:underline cursor-pointer"
            >
              <span className="text-accent-green">$</span> open {project.image.label}
            </button>
          )}
        </div>
      </TerminalWindow>
    </motion.div>
  )
}

export default function Projects() {
  const sorted = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section className="w-full px-4 py-20 max-w-5xl mx-auto">
      <SectionHeader command="ls ~/projects/" id="projects" />

      <p className="text-text-muted text-sm text-center mb-8 -mt-4">
        Featured builds — from AI systems to embedded hardware.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sorted.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            onViewImage={setLightbox}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-bg-primary/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-bg-terminal cursor-default shadow-2xl"
            >
              <div className="sticky top-0 flex items-center justify-between px-4 py-2.5 bg-bg-titlebar border-b border-border">
                <span className="text-text-muted text-sm">
                  <span className="text-accent-green">$</span> open {lightbox.image.label} —{' '}
                  {lightbox.filename}
                </span>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-text-muted hover:text-accent-red transition-colors text-xs cursor-pointer"
                >
                  [esc] close ✕
                </button>
              </div>

              {lightbox.image.type === 'video' ? (
                <video
                  src={`${import.meta.env.BASE_URL}${lightbox.image.src}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full max-h-[55vh] object-contain bg-bg-primary"
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}${lightbox.image.src}`}
                  alt={lightbox.image.alt}
                  className="w-full max-h-[55vh] object-contain bg-bg-primary"
                />
              )}

              <div className="p-5">
                {lightbox.metrics && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {lightbox.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-accent-green/10 border border-accent-green/20"
                      >
                        <span className="text-accent-green font-bold">{m.value}</span>
                        <span className="text-text-muted">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="text-accent-purple text-lg font-semibold mb-2">
                  {lightbox.title}
                </h3>

                <p className="text-text-primary text-sm leading-relaxed mb-4">
                  {lightbox.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {lightbox.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                {(lightbox.github || lightbox.live) && (
                  <div className="flex gap-4 text-xs pt-3 border-t border-border">
                    {lightbox.github && (
                      <a
                        href={lightbox.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan hover:underline"
                      >
                        <span className="text-accent-green">$</span> open --github
                      </a>
                    )}
                    {lightbox.live && (
                      <a
                        href={lightbox.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan hover:underline"
                      >
                        <span className="text-accent-green">$</span> open --live
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
