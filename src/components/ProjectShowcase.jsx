import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Badge from './ui/Badge'
import Highlight from './ui/Highlight'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const variants = {
  enter: (dir) => ({ y: dir >= 0 ? 32 : -32, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir >= 0 ? -32 : 32, opacity: 0 }),
}

// Typed `$ open <filename>` accent; remounted (via key) on each project
// switch so the typing restarts without reset effects.
function TypedCommand({ text, reduceMotion }) {
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (reduceMotion || chars >= text.length) return
    const t = setTimeout(() => setChars((c) => c + 1), 40)
    return () => clearTimeout(t)
  }, [chars, reduceMotion, text.length])

  const shown = reduceMotion ? text : text.slice(0, chars)
  const typing = !reduceMotion && chars < text.length

  return (
    <span>
      <span className="text-accent-green">$</span>{' '}
      <span className="text-accent-purple">open {shown}</span>
      {typing && <span className="cursor-blink text-accent-green">_</span>}
    </span>
  )
}

// Pinned scroll showcase: the stage sticks for one viewport per project while
// native scrolling swaps the active project. No wheel hijacking — fast
// scrollers pass straight through.
export default function ProjectShowcase({ projects, onViewImage }) {
  const wrapperRef = useRef(null)
  const indexRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [reduceMotion] = useState(prefersReducedMotion)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(projects.length - 1, Math.max(0, Math.floor(v * projects.length)))
    if (next !== indexRef.current) {
      setDirection(next > indexRef.current ? 1 : -1)
      indexRef.current = next
      setIndex(next)
    }
  })

  // Warm the thumbnails so switching projects never shows an empty frame.
  useEffect(() => {
    projects.forEach((p) => {
      if (p.image?.thumb) {
        const img = new Image()
        img.src = `${import.meta.env.BASE_URL}${p.image.thumb}`
      }
    })
  }, [projects])

  const project = projects[index]

  return (
    <div ref={wrapperRef} style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-svh flex items-center justify-center overflow-hidden pt-14">
        <div className="w-full max-w-5xl px-4">
          <div className="font-mono text-xs sm:text-sm mb-5 flex items-center gap-3">
            <span className="text-text-muted">
              [{index + 1}/{projects.length}]
            </span>
            <TypedCommand key={index} text={project.filename} reduceMotion={reduceMotion} />
            <span className="text-text-muted ml-auto">{project.year}</span>
          </div>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={project.title}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid md:grid-cols-2 gap-6 md:gap-10 items-center"
            >
              <div
                className="relative h-[30svh] md:h-[52svh] rounded-xl border border-border bg-bg-terminal overflow-hidden cursor-zoom-in"
                onClick={() => onViewImage(project)}
              >
                {project.image?.thumb && (
                  <img
                    src={`${import.meta.env.BASE_URL}${project.image.thumb}`}
                    alt={project.image.alt || project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {project.image?.type === 'video' && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-bg-primary/70 border border-accent-green/60 flex items-center justify-center text-accent-green pl-0.5">
                      ▶
                    </span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
                  {project.title}
                </h3>

                {project.metrics && (
                  <div className="font-mono flex flex-wrap gap-2 mb-4">
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

                <p className="text-text-primary text-sm md:text-base leading-relaxed mb-5 line-clamp-4 md:line-clamp-none">
                  <Highlight>{project.description}</Highlight>
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <div className="flex gap-4 text-xs sm:text-sm">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-cyan hover:underline"
                    >
                      View code ↗
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-cyan hover:underline"
                    >
                      Live demo ↗
                    </a>
                  )}
                  {project.image && (
                    <button
                      onClick={() => onViewImage(project)}
                      className="text-accent-cyan hover:underline cursor-pointer"
                    >
                      {project.image.type === 'video' ? 'Watch demo' : 'View full size'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-2" aria-hidden="true">
            {projects.map((p, i) => (
              <span
                key={p.title}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-accent-green' : 'w-3 bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
