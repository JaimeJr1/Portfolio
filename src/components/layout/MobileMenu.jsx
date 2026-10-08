import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '../../utils/constants'
import { socialLinks } from '../../data/socialLinks'
import { GitHubIcon, LinkedInIcon } from '../ui/icons'

const menuIcons = { github: GitHubIcon, linkedin: LinkedInIcon }

export default function MobileMenu({ open, onClose, activeId }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-muted hover:text-accent-red transition-colors text-sm"
            aria-label="Close menu"
          >
            <span className="text-accent-green">$</span> close
          </button>

          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1)
            const isActive = activeId === id

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className={`text-xl transition-colors duration-200 ${
                  isActive
                    ? 'text-accent-green'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <span className="text-accent-green mr-2">&gt;</span>
                {link.label}
              </a>
            )
          })}

          <div className="flex items-center gap-6 mt-2 pt-6 border-t border-border">
            {socialLinks
              .filter((link) => menuIcons[link.icon])
              .map((link) => {
                const Icon = menuIcons[link.icon]
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent-green transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download
              onClick={onClose}
              className="text-sm px-3 py-1.5 rounded border border-accent-green/50 text-accent-green"
            >
              resume.pdf
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
