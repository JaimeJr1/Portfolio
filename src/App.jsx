import { MotionConfig } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import KeyboardShortcuts from './components/layout/KeyboardShortcuts'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Resume from './sections/Resume'
import Contact from './sections/Contact'
import ExperienceBar from './sections/ExperienceBar'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <ExperienceBar />
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <ScrollToTop />
      <KeyboardShortcuts />
    </MotionConfig>
  )
}
