import { useMemo, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import { useTypingEffect } from '../hooks/useTypingEffect'
import { SITE } from '../utils/constants'

const PROMPT = `${SITE.prompt}:~$ `

const COMMANDS = {
  help: `Available commands:
  help        — show this message
  about       — jump to about section
  projects    — jump to projects section
  achievements— jump to achievements
  resume      — jump to resume
  college     — jump to college highlights
  contact     — jump to contact info
  skills      — list my skills
  clear       — clear the terminal
  date        — show current date
  neofetch    — show system info
  vamos       — a little inspiration`,

  skills: `Languages:  Python, Java, C++, C, JavaScript, C#
ML/Data:    PyTorch, Scikit-learn, Pandas, NumPy, XGBoost, HuggingFace
Tools:      Git, GitHub Actions, Django, Streamlit, GCP, Groq`,

  date: () => new Date().toString(),

  vamos: `"La victoria pertenece a los más opiniatres." — Rafa Nadal`,

  neofetch: `       ╔══════════════╗
       ║  ▓▓▓▓▓▓▓▓▓▓  ║      ${SITE.name}
       ║  ▓▓      ▓▓  ║      ───────────────────────
       ║  ▓▓  ██  ▓▓  ║      OS: Portfolio v1.0
       ║  ▓▓      ▓▓  ║      School: Georgia Tech
       ║  ▓▓▓▓▓▓▓▓▓▓  ║      Lab: LLAMAS @ GT
       ╚══════════════╝      Vamos!`,
}

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
    typingSpeed: 35,
    lineDelay: 300,
    startDelay: 500,
  })

  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isComplete && inputRef.current) {
      inputRef.current.focus()
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

    const sections = ['about', 'projects', 'achievements', 'resume', 'college', 'contact']
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
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <TerminalWindow title="welcome.sh" className="w-full max-w-2xl" clickToMaximize={false}>
        <div
          className="space-y-1 cursor-text"
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

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs">
            Try typing <span className="text-accent-green">help</span> or a section name
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-block text-text-muted text-sm"
          >
            scroll down
          </motion.span>
        </motion.div>
      )}
    </section>
  )
}
