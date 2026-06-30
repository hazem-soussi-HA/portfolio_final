import { ArrowRight, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 rounded-full text-xs font-mono bg-blue-500/10 border border-blue-500/30 text-blue-300">
            <Zap className="inline mr-2" size={14} />CLOUD ARCHITECT & DEVSECOPS ENGINEER
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Transform Infrastructure into <span className="gradient-text">Performance</span>
        </h1>

        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Senior engineer specializing in Kubernetes, CI/CD automation, cloud infrastructure, and security-first DevOps. Building resilient systems that scale.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center gap-2 transition">
            View My Work <ArrowRight size={18} />
          </button>
          <button className="px-8 py-3 border border-blue-500/50 hover:bg-blue-500/10 rounded-lg font-semibold transition">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
