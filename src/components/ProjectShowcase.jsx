import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Badge from './ui/Badge'
import Highlight from './ui/Highlight'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const mediaVariants = {
  enter: (dir) => ({ opacity: 0, y: dir >= 0 ? 28 : -28, scale: 0.97 }),
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (dir) => ({ opacity: 0, y: dir >= 0 ? -24 : 24, scale: 0.98, transition: { duration: 0.22, ease: 'easeIn' } }),
}

const textVariants = {
  enter: (dir) => ({ opacity: 0, y: dir >= 0 ? 24 : -24 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut', delay: 0.07 } },
  exit: (dir) => ({ opacity: 0, y: dir >= 0 ? -18 : 18, transition: { duration: 0.2, ease: 'easeIn' } }),
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

  // Warm full-size media so switching projects never shows an empty frame.
  useEffect(() => {
    projects.forEach((p) => {
      const src = p.image?.type === 'video' ? p.image.thumb : p.image?.src
      if (src) {
        const img = new Image()
        img.src = `${import.meta.env.BASE_URL}${src}`
      }
    })
  }, [projects])

  const project = projects[index]

  return (
    <div ref={wrapperRef} style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-svh flex items-center justify-center overflow-hidden pt-14">
        <div className="showcase-ambient absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative w-full max-w-5xl px-4 sm:px-6">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={project.title}
              className="grid md:grid-cols-[1.05fr_1fr] gap-7 md:gap-12 items-center"
            >
              {/* Media, framed as a terminal window */}
              <motion.div
                variants={mediaVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
              >
                <div
                  className="absolute -inset-6 rounded-3xl bg-accent-green/5 blur-2xl pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="relative rounded-xl border border-border bg-bg-terminal overflow-hidden shadow-2xl shadow-black/25 cursor-zoom-in"
                  onClick={() => onViewImage(project)}
                >
                  <div className="font-mono flex items-center gap-2 px-4 py-2.5 bg-bg-titlebar border-b border-border">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="w-3 h-3 rounded-full bg-accent-red/80" />
                      <span className="w-3 h-3 rounded-full bg-accent-orange/80" />
                      <span className="w-3 h-3 rounded-full bg-accent-green/80" />
                    </span>
                    <span className="text-text-muted text-xs ml-1 truncate">{project.filename}</span>
                    <span className="text-text-muted text-xs ml-auto shrink-0">{project.year}</span>
                  </div>
                  <div className="relative h-[26svh] md:h-[46svh] bg-bg-primary">
                    {project.image?.type === 'video' ? (
                      <video
                        src={`${import.meta.env.BASE_URL}${project.image.src}`}
                        poster={`${import.meta.env.BASE_URL}${project.image.thumb}`}
                        autoPlay={!reduceMotion}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      project.image?.src && (
                        <img
                          src={`${import.meta.env.BASE_URL}${project.image.src}`}
                          alt={project.image.alt || project.title}
                          className="w-full h-full object-cover"
                        />
                      )
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Text column */}
              <motion.div
                variants={textVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="font-mono text-xs sm:text-sm mb-3">
                  <TypedCommand key={index} text={project.filename} reduceMotion={reduceMotion} />
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
                  {project.title}
                </h3>

                {project.metrics && (
                  <div className="font-mono flex flex-wrap gap-2 mb-4">
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-accent-green/10 border border-accent-green/15"
                      >
                        <span className="text-accent-green font-bold">{m.value}</span>
                        <span className="text-text-muted">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-text-primary/80 text-sm md:text-base leading-relaxed mb-5 line-clamp-4 md:line-clamp-none">
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
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Progress: counter + rail, centered under the stage */}
          <div className="mt-10 flex items-center justify-center gap-3 font-mono text-xs text-text-muted">
            <span>
              [{index + 1}/{projects.length}]
            </span>
            <span className="flex items-center gap-2" aria-hidden="true">
              {projects.map((p, i) => (
                <span
                  key={p.title}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-accent-green' : 'w-3 bg-border'
                  }`}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
