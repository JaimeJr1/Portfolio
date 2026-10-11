import { useMotionValue, useSpring } from 'framer-motion'

const SPRING = { stiffness: 350, damping: 32 }

// Tracks the cursor for a CursorPreview: feed onMouseMove to the hover area,
// pass x/y to the preview component.
export function useCursorPreview() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING)
  const y = useSpring(my, SPRING)
  const onMouseMove = (e) => {
    mx.set(e.clientX)
    my.set(e.clientY)
  }
  return { x, y, onMouseMove }
}
