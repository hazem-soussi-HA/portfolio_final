const groups = [
  { name: 'AI & Algorithms', items: ['Local LLM pipelines (Ollama)', 'AI agents & workflow automation', 'Algorithm design & optimization', 'Data processing & intelligent logic', 'Offline-first AI systems'] },
  { name: 'Software Engineering', items: ['Python', 'JavaScript · React 19', 'PHP · Symfony · Twig', 'SQL', 'Shell', 'HTML · CSS'] },
  { name: 'Systems & Infrastructure', items: ['Proxmox VE', 'KVM / unprivileged LXC', 'Debian Linux', 'Docker / Kubernetes manifests', 'nginx · PHP-FPM', 'Bridged LAN networking'] },
  { name: 'Automation & Platforms', items: ['Terraform', 'Ansible', 'GitHub Actions / CI-CD', 'GitHub API integrations', 'WebGL / OpenGL ES engines', 'Browser audio synthesis (DSP)'] },
];

export default function TechStack() {
  return (
    <section id="stack" className="py-20 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">The stack</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">AI, algorithms, and engineering depth.</h2>

        <div className="grid sm:grid-cols-2 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
          {groups.map(g => (
            <div key={g.name} className="bg-[#0a0e1a] p-6">
              <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-4">{g.name}</h3>
              <ul className="space-y-2">
                {g.items.map(item => (
                  <li key={item} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-blue-500 select-none">›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
