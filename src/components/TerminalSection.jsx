import { Terminal } from 'lucide-react';

export default function TerminalSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-4">Capabilities</p>
          <h2 className="text-5xl font-bold mb-4">Engineering Excellence</h2>
        </div>

        <div className="glass p-8 rounded-xl border border-blue-500/20 font-mono text-sm">
          <div className="flex gap-2 mb-4">
            <Terminal className="text-cyan-400" size={18} />
            <span className="text-cyan-400">$ portfolio --show-expertise</span>
          </div>
          
          <div className="space-y-2 text-slate-300 text-xs md:text-sm">
            <div>
              <span className="text-green-400">✓</span> Kubernetes orchestration & autoscaling
            </div>
            <div>
              <span className="text-green-400">✓</span> CI/CD pipeline design & optimization
            </div>
            <div>
              <span className="text-green-400">✓</span> Infrastructure as Code (Terraform, Ansible)
            </div>
            <div>
              <span className="text-green-400">✓</span> Cloud architecture (AWS, GCP, Azure)
            </div>
            <div>
              <span className="text-green-400">✓</span> Security hardening & compliance
            </div>
            <div>
              <span className="text-green-400">✓</span> Monitoring & observability stack
            </div>
            <div>
              <span className="text-green-400">✓</span> Disaster recovery & business continuity
            </div>
            <div>
              <span className="text-green-400">✓</span> Cost optimization strategies
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="text-cyan-400">$ echo "Ready to architect your infrastructure"</div>
            <div className="mt-2 text-green-400">success ✨</div>
          </div>
        </div>
      </div>
    </section>
  );
}
