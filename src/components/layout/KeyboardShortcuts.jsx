import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SECTION_IDS = ['about', 'projects', 'achievements', 'resume', 'college', 'contact']

const shortcuts = [
  { keys: '?', description: 'Toggle this help' },
  { keys: '1-6', description: 'Jump to section' },
  { keys: '0', description: 'Scroll to top' },
  { keys: '/', description: 'Focus terminal input' },
]

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.key === '?') {
        setOpen((v) => !v)
        return
      }

      if (open && e.key === 'Escape') {
        setOpen(false)
        return
      }

      if (e.key === '0') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      const num = parseInt(e.key)
      if (num >= 1 && num <= SECTION_IDS.length) {
        const el = document.getElementById(SECTION_IDS[num - 1])
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        return
      }

      if (e.key === '/') {
        e.preventDefault()
        const input = document.querySelector('input[aria-label="Terminal input"]')
        if (input) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setTimeout(() => input.focus(), 500)
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <>
      {/* Floating hint */}
      <div className="fixed bottom-6 left-6 z-40 text-text-muted text-xs hidden md:block">
        Press <span className="text-accent-green px-1.5 py-0.5 rounded bg-bg-titlebar border border-border">?</span> for shortcuts
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-bg-terminal border border-border rounded-lg p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-accent-purple font-semibold mb-4">Keyboard Shortcuts</div>
              <div className="space-y-3">
                {shortcuts.map((s) => (
                  <div key={s.keys} className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{s.description}</span>
                    <kbd className="px-2 py-0.5 rounded bg-bg-titlebar border border-border text-accent-green text-xs">
                      {s.keys}
                    </kbd>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border text-text-muted text-xs text-center">
                Press <span className="text-accent-green">ESC</span> or <span className="text-accent-green">?</span> to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
