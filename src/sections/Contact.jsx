import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import CopyButton from '../components/ui/CopyButton'
import { SITE } from '../utils/constants'
import { socialLinks } from '../data/socialLinks'
import { GitHubIcon, LinkedInIcon, EmailIcon } from '../components/ui/icons'

const iconMap = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  email: <EmailIcon />,
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
                <span className="text-accent-cyan">"Summer 2027 internships"</span>
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
