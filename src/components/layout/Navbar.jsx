import { useState } from 'react'
import { SITE, NAV_LINKS } from '../../utils/constants'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionIds = NAV_LINKS.map((l) => l.href.slice(1))
  const activeId = useScrollSpy(sectionIds)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Prompt badge */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="text-sm text-accent-green font-semibold hover:text-accent-cyan transition-colors whitespace-nowrap"
        >
          {SITE.prompt}:~
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1)
            const isActive = activeId === id

            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-accent-green'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {link.label}
                {isActive && <span className="cursor-blink ml-0.5">_</span>}
              </a>
            )
          })}

          {/* Currently working on */}
          {SITE.currentlyWorkingOn && (
            <span className="hidden lg:inline-flex items-center gap-1.5 text-xs text-text-muted border-l border-border pl-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green cursor-blink" />
              <span>{SITE.currentlyWorkingOn}</span>
            </span>
          )}

          {/* Source code */}
          <a
            href={SITE.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-green transition-colors text-sm"
            title="View source code"
          >
            {'</>'}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-text-muted hover:text-accent-green transition-colors text-sm"
          aria-label="Open menu"
        >
          <span className="text-accent-green">$</span> menu
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </nav>
  )
}
