import { AnimatePresence, motion, useTransform } from 'framer-motion'

// Shared cursor-following preview. The consumer tracks what is hovered and
// feeds mouse position through useCursorPreview's onMouseMove; this renders
// the floating card below-right of the cursor, clamped to the viewport.
// Desktop pointer only.
export default function CursorPreview({ show, previewKey, x, y, width = 288, height = 240, children }) {
  const px = useTransform(x, (v) =>
    Math.min(v + 36, (typeof window !== 'undefined' ? window.innerWidth : 1440) - width - 24)
  )
  const py = useTransform(y, (v) =>
    Math.min(v + 20, (typeof window !== 'undefined' ? window.innerHeight : 900) - height - 16)
  )

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={previewKey}
          initial={{ opacity: 0, scale: 0.92, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed top-0 left-0 z-40 pointer-events-none hidden lg:block"
          style={{ left: px, top: py, width }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
