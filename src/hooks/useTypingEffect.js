import { useState, useEffect, useRef } from 'react'

export function useTypingEffect({ lines, typingSpeed = 40, lineDelay = 400, startDelay = 300 }) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    let currentLineIndex = 0
    let currentCharIndex = 0
    let currentLines = []

    const typeNext = () => {
      if (currentLineIndex >= lines.length) {
        setIsComplete(true)
        return
      }

      const currentLine = lines[currentLineIndex]

      if (currentCharIndex <= currentLine.length) {
        currentLines = [
          ...currentLines.slice(0, currentLineIndex),
          currentLine.slice(0, currentCharIndex),
        ]
        setDisplayedLines([...currentLines])
        currentCharIndex++
        timeoutRef.current = setTimeout(typeNext, typingSpeed)
      } else {
        currentLineIndex++
        currentCharIndex = 0
        timeoutRef.current = setTimeout(typeNext, lineDelay)
      }
    }

    timeoutRef.current = setTimeout(typeNext, startDelay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [lines, typingSpeed, lineDelay, startDelay])

  return { displayedLines, isComplete }
}
