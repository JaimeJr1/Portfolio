import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-lg bg-bg-titlebar border border-border text-accent-green hover:bg-accent-green hover:text-bg-primary transition-all duration-300 flex items-center justify-center text-sm font-bold"
          aria-label="Scroll to top"
        >
          ^C
        </motion.button>
      )}
    </AnimatePresence>
  )
}
