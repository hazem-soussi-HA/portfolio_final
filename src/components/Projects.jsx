import { Github, ExternalLink, Shield, Clock } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'AI Copilot Platform',
      description: 'Chat interface with streaming responses, RAG integration, and multi-model support via OpenRouter.',
      tags: ['React', 'AI', 'LLM'],
      link: 'https://github.com/hazem-soussi-HA/ai-copilot',
      status: 'Active',
      securityStatus: 'Audited'
    },
    {
      title: 'CodePilot',
      description: 'AI-powered code review assistant using Ollama/Phi3 for real-time suggestions and security scanning.',
      tags: ['Python', 'AI', 'Security'],
      link: 'https://github.com/hazem-soussi-HA/codepilot',
      status: 'Active',
      securityStatus: 'Scanned'
    },
    {
      title: 'Infrastructure Monitoring Dashboard',
      description: 'Real-time metrics, alerting, and automated remediation for infrastructure.',
      tags: ['Prometheus', 'Grafana', 'Go'],
      link: 'https://github.com/hazem-soussi-HA/infragraph',
      status: 'Active',
      securityStatus: 'Hardened'
    },
    {
      title: 'Omega Deploy',
      description: 'Zero-downtime deployment platform with automatic rollback and health checks.',
      tags: ['Kubernetes', 'DevOps', 'Go'],
      link: 'https://github.com/hazem-soussi-HA/omega-deploy',
      status: 'Active',
      securityStatus: 'Encrypted'
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-4">Portfolio</p>
          <h2 className="text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Architecting solutions that combine performance, security, and scalability
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <div key={idx} className="glass p-8 rounded-xl hover:glass-hover transition group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{proj.title}</h3>
                <Github size={20} className="text-slate-600 group-hover:text-blue-400 transition" />
              </div>
              
              <p className="text-slate-300 mb-4">{proj.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <Shield size={14} /> {proj.securityStatus}
              </div>

              <a 
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
              >
                View Project <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
