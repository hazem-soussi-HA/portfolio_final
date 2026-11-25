import { Brain, Cpu, Server, Workflow } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI Solutions & Integration',
    body: 'Design and integrate practical AI into products — from local LLM pipelines and intelligent assistants to domain-specific automation that runs reliably, including offline-first setups.',
    tags: ['LLM pipelines', 'Ollama', 'RAG & agents', 'Offline-first AI'],
  },
  {
    icon: Cpu,
    title: 'Algorithms & Intelligent Systems',
    body: 'Build the logic behind the product: data processing, decision rules, optimization, and custom algorithms tuned for real constraints like latency, reliability, and security.',
    tags: ['Algorithms', 'Data processing', 'Optimization', 'System design'],
  },
  {
    icon: Server,
    title: 'Infrastructure & Platform Engineering',
    body: 'Architect and operate secure systems end to end — private clouds, virtualization, containerized services, networking, and deployment workflows built for maintainability.',
    tags: ['Proxmox / LXC', 'Linux', 'Docker / k8s', 'CI/CD'],
  },
  {
    icon: Workflow,
    title: 'Full-Stack & Automated Delivery',
    body: 'Deliver complete web platforms and tools, from backend APIs to polished frontends, with CI/CD and GitHub Actions expertise to ship, test, and share projects publicly with confidence.',
    tags: ['React', 'Python / PHP', 'GitHub Actions', 'CI/CD'],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 px-6 border-t border-white/5 section-grid">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">Services</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">What I build and deliver.</h2>
        <p className="text-slate-400 max-w-2xl mb-12">
          Computer Science engineering focused on AI, algorithms, and robust systems — turning complex
          requirements into reliable, secure solutions.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, body, tags }) => (
            <article key={title} className="glass glass-hover apex-panel rounded-xl p-6 transition">
              <div className="w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Icon size={22} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{body}</p>
              <ul className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <li key={t} className="text-[10px] font-mono px-2 py-1 rounded border border-white/10 text-slate-500">{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 glass apex-panel rounded-xl p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] text-cyan-400 uppercase tracking-widest mb-1">Delivery mindset</p>
            <p className="text-sm text-slate-300">From idea to deployment — vibe coding, rapid prototyping, and automated GitHub Actions workflows to ship and share projects publicly.</p>
          </div>
          <a href="#contact" className="shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition text-center">Work with me</a>
        </div>
      </div>
    </section>
  );
}
