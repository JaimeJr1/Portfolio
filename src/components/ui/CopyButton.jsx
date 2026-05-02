import { useState } from 'react'

export default function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-text-muted hover:text-accent-green transition-colors cursor-pointer"
      title={`Copy ${label}`}
    >
      {copied ? 'copied!' : 'copy'}
    </button>
  )
}
