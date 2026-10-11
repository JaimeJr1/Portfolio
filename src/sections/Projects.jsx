import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from '../components/terminal/SectionHeader'
import Badge from '../components/ui/Badge'
import Highlight from '../components/ui/Highlight'
import { projects } from '../data/projects'

export default function Projects() {
  // Newest work first so the trajectory reads top-down; featured breaks ties.
  const sorted = [...projects].sort(
    (a, b) => b.year - a.year || (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  )
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
    <section id="projects" className="w-full px-4 py-16 max-w-5xl mx-auto">
      <SectionHeader command="ls ~/projects/" title="Selected Work" />

      {/* Typographic index: name does the talking, click opens the full view */}
      <div className="border-t border-border">
        {sorted.map((project, i) => (
          <motion.button
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            onClick={() => setLightbox(project)}
            className="w-full text-left py-7 sm:py-9 border-b border-border group cursor-pointer"
          >
            <div className="flex items-baseline justify-between gap-6">
              <div className="min-w-0">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-text-muted mb-2.5">
                  {project.category} · {project.year}
                </p>
                <h3 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-text-muted group-hover:text-text-primary transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 hidden sm:block">
                $ open {project.filename} ↗
              </span>
            </div>
          </motion.button>
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
                <span className="font-mono text-text-muted text-sm">{lightbox.filename}</span>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-text-muted hover:text-accent-red transition-colors text-xs cursor-pointer"
                >
                  Close (Esc) ✕
                </button>
              </div>

              {lightbox.image &&
                (lightbox.image.type === 'video' ? (
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
                ))}

              <div className="p-5">
                {lightbox.metrics && (
                  <div className="font-mono flex flex-wrap gap-2 mb-3">
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
                  <Highlight>{lightbox.description}</Highlight>
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
                        View code ↗
                      </a>
                    )}
                    {lightbox.live && (
                      <a
                        href={lightbox.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-cyan hover:underline"
                      >
                        Live demo ↗
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
