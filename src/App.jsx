import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import KeyboardShortcuts from './components/layout/KeyboardShortcuts'
import SectionDivider from './components/ui/SectionDivider'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Resume from './sections/Resume'
import Contact from './sections/Contact'
import ExperienceBar from './sections/ExperienceBar'

export default function App() {
  return (
    <>
      <div className="scanline-overlay" />
      <Navbar />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <ExperienceBar />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Resume />
        <SectionDivider />
        <Contact />
      </main>
      <ScrollToTop />
      <KeyboardShortcuts />
    </>
  )
}
