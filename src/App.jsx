import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/Projects'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <footer className="py-8 px-4 text-center border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-slate-600 font-mono">
            <span className="text-cyan">HS</span> — Hazem Soussi &copy; {new Date().getFullYear()}
          </p>
          <p className="mt-1 text-[10px] text-slate-700 font-mono">
            Built with React + Vite + Tailwind &middot; Deployed via GitHub Actions &middot; 0 vulns
          </p>
          <p className="mt-2 text-[10px] text-slate-800 font-mono italic">
            &quot;The builder remains in the shadow. The artefacts speak.&quot;
          </p>
        </div>
      </footer>
    </div>
  )
}
