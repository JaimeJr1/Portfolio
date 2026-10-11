import {
  siArm,
  siC,
  siCplusplus,
  siDjango,
  siDocker,
  siGit,
  siGithubactions,
  siGooglecloud,
  siHuggingface,
  siJavascript,
  siKotlin,
  siLinux,
  siMysql,
  siNumpy,
  siOpenjdk,
  siPandas,
  siPython,
  siPytorch,
  siScikitlearn,
  siScipy,
  siStreamlit,
} from 'simple-icons'

// Perceived luminance of a brand hex; near-black logos switch to the theme's
// ink color so they stay visible on the dark background (and invert in light).
const lum = (hex) => {
  const n = parseInt(hex, 16)
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
}

function Tile({ icon, label, glyph }) {
  const dark = icon && lum(icon.hex) < 0.25
  return (
    <div className="shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-border bg-bg-terminal">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          className={`w-5 h-5 shrink-0 ${dark ? 'text-text-primary' : ''}`}
          fill={dark ? 'currentColor' : `#${icon.hex}`}
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          className="w-5 h-5 rounded bg-accent-green/15 text-accent-green font-mono text-[9px] font-bold flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          {glyph}
        </span>
      )}
      <span className="font-mono text-xs text-text-primary whitespace-nowrap">{label}</span>
    </div>
  )
}

const ROW_A = [
  { icon: siCplusplus, label: 'C++' },
  { icon: siC, label: 'C' },
  { icon: siPython, label: 'Python' },
  { icon: siKotlin, label: 'Kotlin' },
  { icon: siOpenjdk, label: 'Java' },
  { icon: siJavascript, label: 'JavaScript' },
  { icon: siLinux, label: 'Linux syscalls' },
  { icon: siArm, label: 'ARM big.LITTLE' },
  { icon: siDocker, label: 'Docker' },
  { glyph: 'GG', label: 'GGML' },
  { glyph: '⇄', label: 'gRPC' },
]

const ROW_B = [
  { icon: siPytorch, label: 'PyTorch' },
  { icon: siScikitlearn, label: 'scikit-learn' },
  { glyph: 'JX', label: 'JAX' },
  { icon: siNumpy, label: 'NumPy' },
  { icon: siPandas, label: 'Pandas' },
  { icon: siScipy, label: 'SciPy' },
  { glyph: 'XG', label: 'XGBoost' },
  { icon: siHuggingface, label: 'Hugging Face' },
  { icon: siStreamlit, label: 'Streamlit' },
  { icon: siGit, label: 'Git' },
  { icon: siGithubactions, label: 'GitHub Actions' },
  { icon: siMysql, label: 'MySQL' },
  { icon: siDjango, label: 'Django' },
  { icon: siGooglecloud, label: 'Google Cloud' },
]

function Row({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-14 sm:w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-14 sm:w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className={`${reverse ? 'marquee-track-reverse' : 'marquee-track'} gap-3 py-1.5`}>
        {doubled.map((t, i) => (
          <Tile key={`${t.label}-${i}`} {...t} />
        ))}
      </div>
    </div>
  )
}

// Two counter-scrolling rows of the stack, logos and all; pauses on hover,
// wraps statically under reduced motion.
export default function SkillsMarquee() {
  return (
    <div className="space-y-3">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  )
}
