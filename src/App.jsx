import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import LabSection from './components/LabSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStack />
      <Projects />
      <LabSection />
      <ContactSection />

      <footer className="py-8 px-6 text-center border-t border-white/5">
        <p className="text-xs text-slate-500">© 2026 Hazem Soussi — Computer Science Engineer. Every claim on this page traces to a public repository, or it is labeled private.</p>
        <p className="mt-1 text-[10px] text-slate-700 font-mono">hazem :: proof of concept · no metric on this page is fabricated</p>
      </footer>
    </div>
  )
}
