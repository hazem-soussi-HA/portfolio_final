import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="top" className="min-h-[92vh] flex items-center px-6 pt-24 relative overflow-hidden section-grid">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="max-w-5xl mx-auto relative z-10 glass apex-panel apex-ring rounded-2xl p-8 sm:p-12">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-5">Computer Science Engineer · AI & Intelligent Systems</p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          Building intelligent<br />systems that <span className="gradient-text">deliver.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10">
          I’m Hazem Soussi, a Computer Science Engineer with expertise in AI, algorithms,
          and modern software technologies. I design and deliver practical solutions — from
          intelligent automation and LLM-powered workflows to secure platforms and scalable
          infrastructure.
        </p>

        <div className="flex gap-4 flex-wrap">
          <a href="#services" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg shadow-blue-600/25">
            Explore services <ArrowRight size={18} />
          </a>
          <a href="#projects" className="px-6 py-3 border border-white/10 hover:border-blue-500/50 hover:text-white rounded-lg font-semibold text-slate-300 transition">
            See the code
          </a>
        </div>
      </div>
    </section>
  );
}
