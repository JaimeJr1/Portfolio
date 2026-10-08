import { useMemo, useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { SITE } from '../utils/constants'

const PROMPT = `${SITE.prompt}:~$ `

const COMMANDS = {
  help: `Available commands:
  help        — show this message
  about       — jump to about section
  projects    — jump to projects section
  resume      — jump to resume
  contact     — jump to contact info
  skills      — list my skills
  clear       — clear the terminal
  date        — show current date
  neofetch    — show system info
  vamos       — a little inspiration`,

  skills: `Languages:  C++, C, Python, Kotlin, Java, JavaScript
Systems:    ARM big.LITTLE, Linux scheduling, POSIX threads, GGML, Docker, gRPC
ML/Data:    PyTorch, JAX, scikit-learn, XGBoost, Pandas, NumPy
Tools:      Git, GitHub Actions, CircuitSim, MySQL, GCP`,

  date: () => new Date().toString(),

  vamos: `"La victoire appartient aux plus opiniâtres." — Rafa Nadal`,

  neofetch: `       ╔══════════════╗
       ║  ▓▓▓▓▓▓▓▓▓▓  ║      ${SITE.name}
       ║  ▓▓      ▓▓  ║      ───────────────────────
       ║  ▓▓  ██  ▓▓  ║      OS: Portfolio v1.0
       ║  ▓▓      ▓▓  ║      School: Georgia Tech
       ║  ▓▓▓▓▓▓▓▓▓▓  ║      Lab: LLAMAS @ GT
       ╚══════════════╝      Vamos!`,
}

const cascade = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
}

const cascadeItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const PROOF_STATS = [
  '~$500K/yr cloud costs eliminated @ Plix AI',
  'shipped on 2,500+ production body cameras',
  '88% on-device Whisper latency reduction',
  'Top 10 CS in Spain — Nova 111 (2026)',
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const lines = useMemo(() => [
    `${PROMPT}whoami`,
    SITE.name,
    `${PROMPT}cat title.txt`,
    SITE.title,
    `${PROMPT}echo "Welcome to my portfolio"`,
    'Welcome to my portfolio',
  ], [])

  const { displayedLines, isComplete } = useTypingEffect({
    lines,
    typingSpeed: 18,
    lineDelay: 120,
    startDelay: 300,
  })

  const [statIndex, setStatIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(
      () => setStatIndex((i) => (i + 1) % PROOF_STATS.length),
      3000
    )
    return () => clearInterval(id)
  }, [])

  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isComplete && inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [isComplete])

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    let output = ''

    if (trimmed === '') return
    if (trimmed === 'clear') {
      setHistory([])
      setInput('')
      setCmdHistory((prev) => [...prev, trimmed])
      setHistoryIndex(-1)
      return
    }

    const sections = ['about', 'projects', 'resume', 'contact']
    if (sections.includes(trimmed)) {
      output = `Navigating to ${trimmed}...`
      setTimeout(() => scrollToSection(trimmed), 300)
    } else if (COMMANDS[trimmed]) {
      output = typeof COMMANDS[trimmed] === 'function' ? COMMANDS[trimmed]() : COMMANDS[trimmed]
    } else {
      output = `command not found: ${trimmed}. Type "help" for available commands.`
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output }])
    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(newIndex)
      setInput(cmdHistory[newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const newIndex = historyIndex + 1
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(newIndex)
        setInput(cmdHistory[newIndex])
      }
    }
  }

  return (
    <section className="min-h-[88vh] flex flex-col items-center justify-center px-4 pt-20 pb-10">
      <motion.div
        initial={{ scale: 1.08, y: 28 }}
        animate={isComplete ? { scale: 1, y: 0 } : { scale: 1.08, y: 28 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
      <TerminalWindow title="welcome.sh" className="w-full" clickToMaximize={false}>
        <div
          className="space-y-1 cursor-text min-h-[10.5rem]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Typing animation lines */}
          {displayedLines.map((line, i) => {
            const isCommand = line.startsWith(PROMPT)
            const isLastLine = i === displayedLines.length - 1 && !isComplete

            return (
              <div key={i} className="flex">
                <span>
                  {isCommand ? (
                    <>
                      <span className="text-accent-green">{PROMPT}</span>
                      <span className="text-text-primary">
                        {line.slice(PROMPT.length)}
                      </span>
                    </>
                  ) : (
                    <span className="text-accent-cyan">{line}</span>
                  )}
                  {isLastLine && (
                    <span className="cursor-blink text-accent-green">_</span>
                  )}
                </span>
              </div>
            )
          })}

          {/* Interactive command history */}
          {isComplete && history.map((entry, i) => (
            <div key={`h-${i}`}>
              <div>
                <span className="text-accent-green">{PROMPT}</span>
                <span className="text-text-primary">{entry.cmd}</span>
              </div>
              <pre className="text-accent-cyan whitespace-pre-wrap text-sm">{entry.output}</pre>
            </div>
          ))}

          {/* Live input line */}
          {isComplete && (
            <div className="flex items-center">
              <span className="text-accent-green">{PROMPT}</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none text-text-primary w-full caret-transparent font-[inherit] text-sm"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
                <span
                  className="absolute top-0 left-0 pointer-events-none text-sm"
                  aria-hidden="true"
                >
                  <span className="invisible">{input}</span>
                  <span className="cursor-blink text-accent-green">_</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </TerminalWindow>
      </motion.div>

      {isComplete && (
      <motion.div
        variants={cascade}
        initial="hidden"
        animate="show"
        className="mt-8 flex flex-col items-center gap-4"
      >
        <motion.h1
          variants={cascadeItem}
          className="text-text-primary text-lg sm:text-xl md:text-2xl font-semibold text-center leading-snug max-w-lg"
        >
          Building intelligent systems —{' '}
          <span className="text-accent-green">from edge devices to the cloud</span>.
        </motion.h1>
        <motion.div
          variants={cascadeItem}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-green/30 bg-accent-green/5"
        >
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-accent-green text-xs font-medium">
            Open to Summer 2027 internships
          </span>
        </motion.div>

        <motion.div variants={cascadeItem} className="h-6 overflow-hidden text-sm sm:text-base">
          <AnimatePresence mode="wait">
            <motion.div
              key={statIndex}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-accent-green">$</span>{' '}
              <span className="text-text-muted">tail -f impact.log →</span>{' '}
              <span className="text-accent-cyan font-semibold [text-shadow:0_0_12px_rgba(88,166,255,0.45)]">
                {PROOF_STATS[statIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={cascadeItem}
          className="flex flex-wrap items-center justify-center gap-3 mt-2"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="px-5 py-2.5 rounded-lg bg-accent-green text-bg-primary text-sm font-semibold hover:brightness-110 transition-all cursor-pointer shadow-[0_0_20px_rgba(63,185,80,0.35)]"
          >
            $ open projects/
          </button>
          <button
            onClick={() => scrollToSection('resume')}
            className="px-5 py-2.5 rounded-lg border border-border text-text-primary text-sm hover:border-accent-green hover:text-accent-green transition-colors cursor-pointer"
          >
            $ cat resume.txt
          </button>
        </motion.div>

        <motion.div variants={cascadeItem}>
          <motion.button
            onClick={() => scrollToSection('projects')}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            aria-label="Scroll to projects"
            className="mt-6 w-11 h-11 rounded-full border-2 border-accent-green/60 flex items-center justify-center text-accent-green hover:bg-accent-green/10 transition-colors cursor-pointer shadow-[0_0_18px_rgba(63,185,80,0.3)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-5 h-5"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs">
            Try typing <span className="text-accent-green">help</span> or a section name
          </span>
        </motion.div>
      )}
    </section>
  )
}
