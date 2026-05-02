import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TerminalWindow({ title = 'terminal', children, className = '', clickToMaximize = true }) {
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)

  useEffect(() => {
    if (maximized) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [maximized])

  useEffect(() => {
    if (!maximized) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setMaximized(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [maximized])

  const titleBar = (isMax) => (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-titlebar border-b border-border">
      <div className="flex gap-1.5">
        <button
          onClick={(e) => { e.stopPropagation(); if (isMax) setMaximized(false); else setMinimized((v) => !v) }}
          className="terminal-btn w-3 h-3 rounded-full bg-accent-red hover:brightness-125 transition-all cursor-pointer"
          data-tooltip={isMax ? 'close' : minimized ? 'expand' : 'minimize'}
          aria-label={isMax ? 'Close fullscreen' : 'Minimize'}
        />
        <button
          onClick={(e) => { e.stopPropagation(); setMinimized((v) => !v); if (isMax) setMaximized(false) }}
          className="terminal-btn w-3 h-3 rounded-full bg-accent-orange hover:brightness-125 transition-all cursor-pointer"
          data-tooltip={minimized ? 'expand' : 'minimize'}
          aria-label="Minimize"
        />
        <button
          onClick={(e) => { e.stopPropagation(); setMaximized((v) => !v); setMinimized(false) }}
          className="terminal-btn w-3 h-3 rounded-full bg-accent-green hover:brightness-125 transition-all cursor-pointer"
          data-tooltip={isMax ? 'restore' : 'maximize'}
          aria-label="Maximize"
        />
      </div>
      <span className="text-text-muted text-sm ml-2 select-none">{title}</span>
      {isMax && (
        <span className="ml-auto text-text-muted text-xs select-none">ESC to close</span>
      )}
    </div>
  )

  return (
    <>
      {/* Normal inline window */}
      <div
        className={`rounded-lg border border-border overflow-hidden bg-bg-terminal transition-all duration-300 ${clickToMaximize ? 'cursor-pointer' : ''} ${className}`}
        onClick={(e) => {
          if (!clickToMaximize || minimized) return
          const tag = e.target.closest('a, button, input, textarea')
          if (tag) return
          setMaximized(true)
        }}
      >
        {titleBar(false)}
        <AnimatePresence initial={false}>
          {!minimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-5 text-sm leading-relaxed">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Maximized fullscreen overlay */}
      <AnimatePresence>
        {maximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-bg-primary/80 backdrop-blur-sm"
            onClick={() => setMaximized(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-5xl max-h-[90vh] rounded-lg border border-border overflow-hidden bg-bg-terminal shadow-2xl shadow-black/50 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {titleBar(true)}
              <div className="p-6 sm:p-8 text-sm leading-relaxed overflow-y-auto flex-1">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
