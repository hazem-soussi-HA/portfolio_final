export default function AboutSection() {
  const pillars = [
    {
      title: 'Systems first',
      body: 'Every feature sits on a system I can name and measure — virtualization, networking, storage, process isolation. I don\'t hand-wave the layers underneath.',
      tags: ['Proxmox VE', 'KVM / LXC', 'Linux', 'nginx'],
    },
    {
      title: 'Security is a constraint, not a feature',
      body: 'Offline-first modes, least-privilege defaults, mesh allowlists, credential gating and audit-before-merge. If it isn\'t measured, it doesn\'t ship.',
      tags: ['Offline-first', 'Least privilege', 'Allowlisting', 'Audits'],
    },
    {
      title: 'Proof over claims',
      body: 'Everything linked here is reproducible from a public repository or explicitly labeled private. No invented metrics, no decorative telemetry.',
      tags: ['Measured inventories', 'MIT where open', 'Private stays private'],
    },
  ];

  return (
    <section id="about" className="py-20 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">How I work</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">Three principles, zero decoration.</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map(p => (
            <div key={p.title} className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-100 mb-2">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{p.body}</p>
              <ul className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <li key={t} className="text-[10px] font-mono px-2 py-1 rounded border border-white/10 text-slate-500">{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
