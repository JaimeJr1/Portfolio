import { motion } from 'framer-motion'
import TerminalWindow from '../components/terminal/TerminalWindow'
import SectionHeader from '../components/terminal/SectionHeader'
import { achievements } from '../data/achievements'

function AchievementItem({ achievement, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-8 pb-8 border-l-2 border-border last:pb-0 hover:border-l-accent-green transition-colors duration-300 group"
    >
      <div className="absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-border group-hover:bg-accent-green transition-colors duration-300" />

      <div className="text-sm">
        <span className="text-accent-yellow font-semibold">commit {achievement.hash}</span>
        <span className="text-text-muted ml-3 text-xs">({achievement.date})</span>
      </div>
      <div className="mt-2">
        <p className="text-text-primary font-medium">{achievement.title}</p>
        <p className="text-text-muted text-sm mt-1">{achievement.description}</p>
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section className="w-full px-4 py-20 max-w-4xl mx-auto">
      <SectionHeader command="git log --achievements" id="achievements" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        <TerminalWindow title="git-log-achievements">
          <div className="text-text-muted text-xs mb-5">
            <span className="text-accent-green">$</span> git log --oneline --all --graph
          </div>
          <div className="ml-2">
            {achievements.map((achievement, i) => (
              <AchievementItem key={achievement.hash} achievement={achievement} index={i} />
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border text-text-muted text-xs text-center">
            {achievements.length} commits total
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  )
}
