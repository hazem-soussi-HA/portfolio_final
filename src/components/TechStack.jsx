export default function TechStack() {
  const categories = [
    {
      name: 'Cloud Platforms',
      tech: ['AWS', 'GCP', 'Azure', 'Kubernetes']
    },
    {
      name: 'DevOps & Automation',
      tech: ['Terraform', 'Ansible', 'Docker', 'CI/CD']
    },
    {
      name: 'Monitoring & Security',
      tech: ['Prometheus', 'Grafana', 'ELK', 'Vault']
    },
    {
      name: 'Programming',
      tech: ['Python', 'Go', 'Bash', 'JavaScript']
    }
  ];

  return (
    <section id="tech" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-4">Expertise</p>
          <h2 className="text-5xl font-bold mb-4">Technology Stack</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Deep expertise across cloud platforms, DevOps tools, and modern infrastructure practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="glass p-6 rounded-xl hover:glass-hover transition">
              <h3 className="font-bold text-lg mb-4 text-blue-300">{cat.name}</h3>
              <ul className="space-y-2">
                {cat.tech.map((t, i) => (
                  <li key={i} className="text-slate-300 text-sm">
                    • {t}
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
