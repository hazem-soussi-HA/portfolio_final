import InfraStatus from './components/InfraStatus'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import TerminalSection from './components/TerminalSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <HeroSection />

      {/* Telemetry Dashboard — Security-First Infra Status */}
      <section className="py-12 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">Live System Telemetry</p>
          </div>
          <InfraStatus />
        </div>
      </section>

      <TechStack />
      <Projects />
      <TerminalSection />
      <ContactSection />

      <footer className="py-8 text-center text-xs text-slate-600 border-t border-white/5">
        <p>Designed by Hazem Soussi — Cloud Architect & DevOps Engineer</p>
        <p className="mt-1 text-[10px] text-slate-700 font-mono">[ all systems encrypted · audited · hardened ]</p>
      </footer>
    </div>
  )
}