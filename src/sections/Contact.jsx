import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import CopyButton from '../components/ui/CopyButton'
import { SITE } from '../utils/constants'
import { socialLinks } from '../data/socialLinks'

const iconMap = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
}

export default function Contact() {
  return (
    <section className="w-full px-4 py-20 max-w-4xl mx-auto">
      <SectionHeader command="cat contact.txt" id="contact" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <TerminalWindow title="contact.txt">
          <div className="flex flex-col items-center">
            <p className="text-text-muted text-sm mb-6 text-center">
              Want to collaborate or just say hi? Reach out through any of these channels.
            </p>

            <div className="w-full max-w-md mb-6 px-4 py-3 rounded-lg border border-accent-green/30 bg-accent-green/5">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-accent-green font-semibold">status:</span>
                <span className="text-text-primary">open to opportunities</span>
              </div>
              <div className="mt-2 text-xs text-text-muted pl-4">
                <span className="text-accent-green select-none">&gt; </span>
                <span className="text-text-primary">looking_for</span>
                <span className="text-accent-yellow"> = </span>
                <span className="text-accent-cyan">"Fall 2026 / Summer 2027 internships"</span>
              </div>
              <div className="text-xs text-text-muted pl-4">
                <span className="text-accent-green select-none">&gt; </span>
                <span className="text-text-primary">interests</span>
                <span className="text-accent-yellow"> = </span>
                <span className="text-accent-cyan">["AI/ML", "systems", "infrastructure"]</span>
              </div>
            </div>

            <div className="space-y-3 w-full max-w-md">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-bg-primary/50 hover:border-accent-green hover:shadow-[0_0_15px_rgba(63,185,80,0.08)] transition-all duration-300 group"
                >
                  <span className="text-accent-green select-none">&gt;</span>
                  <span className="text-text-muted w-20 text-sm">{link.label}</span>
                  <span className="text-accent-cyan group-hover:text-accent-green transition-colors inline-flex items-center gap-2 text-sm flex-1">
                    {iconMap[link.icon]}
                    {link.url.replace('mailto:', '').replace('https://', '')}
                  </span>
                  <CopyButton text={link.url.replace('mailto:', '')} label={link.label} />
                </a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border space-y-2 w-full text-center">
              <div>
                <span className="text-accent-green">{SITE.prompt}:~$</span>{' '}
                <span className="text-text-primary">echo "Thanks for visiting!"</span>
              </div>
              <div className="text-accent-cyan">Thanks for visiting!</div>
              <div className="mt-2">
                <span className="text-accent-green">{SITE.prompt}:~$</span>{' '}
                <span className="text-text-primary">exit</span>
                <span className="cursor-blink text-accent-green ml-1">_</span>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </motion.div>

      <footer className="mt-16 pt-6 border-t border-border text-center text-text-muted text-xs space-y-3">
        <pre className="text-border text-xs select-none leading-none">
{`───────────────────────────────────────`}
        </pre>
        <div className="flex flex-wrap justify-center gap-3">
          <span>Built with</span>
          <span className="text-accent-cyan">React</span>
          <span>+</span>
          <span className="text-accent-purple">Vite</span>
          <span>+</span>
          <span className="text-accent-green">Tailwind</span>
        </div>
        <div>
          &copy; {new Date().getFullYear()} {SITE.name}
        </div>
        <a
          href={SITE.sourceCode}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-text-muted hover:text-accent-green transition-colors"
        >
          {'</>'} view source
        </a>
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-text-muted/60 italic text-xs">
            <span className="text-accent-yellow/60">{'// '}</span>
            "The day you stop working hard, is the day you stop being lucky."
            <span className="text-text-muted/40"> — R. Nadal</span>
          </p>
        </div>
      </footer>
    </section>
  )
}
