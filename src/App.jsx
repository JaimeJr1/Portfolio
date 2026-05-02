import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import KeyboardShortcuts from './components/layout/KeyboardShortcuts'
import SectionDivider from './components/ui/SectionDivider'
import Hero from './sections/Hero'
import Stats from './sections/Stats'
import About from './sections/About'
import Projects from './sections/Projects'
import Achievements from './sections/Achievements'
import Resume from './sections/Resume'
import CollegeHighlights from './sections/CollegeHighlights'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <div className="scanline-overlay" />
      <Navbar />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <Stats />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <Resume />
        <SectionDivider />
        <CollegeHighlights />
        <SectionDivider />
        <Contact />
      </main>
      <ScrollToTop />
      <KeyboardShortcuts />
    </>
  )
}
