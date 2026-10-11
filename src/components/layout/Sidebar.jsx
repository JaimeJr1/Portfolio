import { useState } from 'react'
import { projects } from '../../data/projects'
import { socialLinks } from '../../data/socialLinks'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { GitHubIcon, LinkedInIcon } from '../ui/icons'
import ThemeToggle from '../ui/ThemeToggle'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function FileRow({ depth = 0, glyph, glyphClass = '', label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-5 py-[5px] text-left transition-colors cursor-pointer ${
        active ? 'text-accent-green' : 'text-text-muted hover:text-text-primary'
      }`}
      style={{ paddingLeft: `${20 + depth * 18}px` }}
    >
      <span className={`select-none ${glyphClass}`}>{glyph}</span>
      <span className="truncate">{label}</span>
    </button>
  )
}

function Folder({ label, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-5 py-[5px] text-left text-text-primary hover:text-accent-green transition-colors cursor-pointer"
      >
        <span className="select-none text-text-muted">{open ? '▾' : '▸'}</span>
        <span className="text-accent-purple select-none">▰</span>
        <span className="font-semibold">{label}</span>
      </button>
      {open && <div className="border-l border-border ml-[26px]">{children}</div>}
    </div>
  )
}

// VSCode-style explorer: the whole site lives beside this one persistent
// frame, and the file tree is the navigation.
export default function Sidebar() {
  const activeId = useScrollSpy(['about', 'projects', 'resume', 'contact'])
  const sorted = [...projects].sort(
    (a, b) => b.year - a.year || (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  )
  const experienceFiles = ['plix-ai.ts', 'llamas-lab.ts', 'starner-vip.ts', 'gtri.ts']

  return (
    <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-bg-terminal border-r border-border font-mono text-sm z-40">
      {/* Identity */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-3 px-5 h-16 shrink-0 text-left cursor-pointer"
      >
        <span className="w-9 h-9 rounded-full overflow-hidden border border-accent-green/60 bg-bg-primary shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}images/headshot.png`}
            alt="Jaime Alonso"
            className="w-full h-full object-cover"
          />
        </span>
        <span className="leading-tight">
          <span className="block font-sans text-sm font-semibold text-text-primary">Jaime</span>
          <span className="block text-[10px] tracking-[0.3em] text-text-muted">PORTFOLIO</span>
        </span>
      </button>

      {/* Explorer chrome — the one window frame on the whole site */}
      <div className="flex items-center gap-2 px-5 py-2.5 border-y border-border shrink-0">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-red/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent-orange/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent-green/80" />
        </span>
        <span className="text-text-muted text-xs ml-1 tracking-widest">explorer</span>
      </div>

      {/* File tree */}
      <nav className="flex-1 overflow-y-auto py-3" aria-label="Sections">
        <FileRow
          glyph="◈"
          glyphClass="text-accent-green"
          label="home.jsx"
          active={!activeId}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        <FileRow
          glyph="◇"
          glyphClass="text-accent-cyan"
          label="about.md"
          active={activeId === 'about'}
          onClick={() => scrollTo('about')}
        />
        <Folder label="projects">
          {sorted.map((p) => (
            <FileRow
              key={p.filename}
              depth={0.5}
              glyph="$"
              glyphClass="text-accent-green"
              label={p.filename}
              active={activeId === 'projects'}
              onClick={() => scrollTo('projects')}
            />
          ))}
        </Folder>
        <Folder label="experience">
          {experienceFiles.map((f) => (
            <FileRow
              key={f}
              depth={0.5}
              glyph="◆"
              glyphClass="text-accent-cyan"
              label={f}
              active={activeId === 'resume'}
              onClick={() => scrollTo('resume')}
            />
          ))}
        </Folder>
        <a
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          download
          className="w-full flex items-center gap-2 px-5 py-[5px] text-text-muted hover:text-accent-green transition-colors"
        >
          <span className="text-accent-red select-none">↓</span>
          <span>resume.pdf</span>
        </a>
        <FileRow
          glyph="{}"
          glyphClass="text-accent-yellow"
          label="contact.json"
          active={activeId === 'contact'}
          onClick={() => scrollTo('contact')}
        />
      </nav>

      {/* Footer: socials + theme */}
      <div className="border-t border-border px-5 py-4 flex items-center gap-4 shrink-0">
        {socialLinks
          .filter((l) => l.icon === 'github' || l.icon === 'linkedin')
          .map((l) => {
            const Icon = l.icon === 'github' ? GitHubIcon : LinkedInIcon
            return (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-green transition-colors"
                aria-label={l.label}
              >
                <Icon />
              </a>
            )
          })}
        <span className="ml-auto">
          <ThemeToggle />
        </span>
      </div>
    </aside>
  )
}
