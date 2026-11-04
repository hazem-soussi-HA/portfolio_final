import { Github, ExternalLink, Lock } from 'lucide-react';

const featured = [
  {
    title: 'lumen-studio',
    blurb: 'Browser-native 3D engine and editor written directly on WebGL / OpenGL ES — no engine, no framework, no bundler.',
    tags: ['JavaScript', 'WebGL', 'OpenGL ES'],
    link: 'https://github.com/hazem-soussi-HA/lumen-studio',
    visibility: 'public',
  },
  {
    title: 'nine-room',
    blurb: 'Premium nine-ball billiards — custom fixed-step physics, adaptive AI opponent, synthesized audio. MIT-licensed.',
    tags: ['JavaScript', 'Canvas', 'Web Audio'],
    link: 'https://github.com/hazem-soussi-HA/nine-room',
    visibility: 'public',
  },
  {
    title: 'amazon-expedition-3d',
    blurb: 'First-person jungle adventure that runs entirely in the browser — every tree, river and bird generated at runtime. MIT.',
    tags: ['JavaScript', 'Procedural', 'WebGL'],
    link: 'https://github.com/hazem-soussi-HA/amazon-expedition-3d',
    visibility: 'public',
  },
  {
    title: 'hazoom-dj-techno',
    blurb: 'Generative techno engine — pure DSP, no samples, no libraries. A full DJ arrangement rendered to WAV in ~4s.',
    tags: ['JavaScript', 'DSP', 'Audio synthesis'],
    link: 'https://github.com/hazem-soussi-HA/hazoom-dj-techno',
    visibility: 'public',
  },
  {
    title: 'boutique-vetements-saas',
    blurb: 'Tunisian apparel e-commerce platform — catalog, accounts and storefront. PHP / Symfony / Twig.',
    tags: ['PHP', 'Symfony', 'Twig'],
    link: 'https://github.com/hazem-soussi-HA/boutique-vetements-saas',
    visibility: 'public',
  },
  {
    title: 'HAZOOM ecosystem',
    blurb: 'Private product platform: HAZOOM FM (AI radio with a cryptographically verifiable broadcast ledger), REASON (intelligence spine + mesh registry, 56 services), and HAZOOM HUB (Symfony bridge to a private GitHub API — live repo inventory, always fresh).',
    tags: ['Python', 'Symfony', 'Proxmox', 'k8s'],
    link: null,
    visibility: 'private',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">Work</p>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Selected engineering.</h2>
          <a href="https://github.com/hazem-soussi-HA?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition inline-flex items-center gap-2">
            All repositories <Github size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map(p => (
            <article key={p.title} className="glass glass-hover rounded-xl p-6 flex flex-col transition">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
                {p.visibility === 'private'
                  ? <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded border border-amber-500/30 text-amber-400"><Lock size={11} /> PRIVATE</span>
                  : <span className="text-[10px] font-mono px-2 py-1 rounded border border-green-500/30 text-green-400">PUBLIC</span>}
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-4">{p.blurb}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map(t => <span key={t} className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-300">{t}</span>)}
              </div>

              <div className="mt-auto pt-4 border-t border-white/5">
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition">
                    View source <ExternalLink size={14} />
                  </a>
                ) : (
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm text-amber-400/90 hover:text-amber-300 transition">
                    Case study on request <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
