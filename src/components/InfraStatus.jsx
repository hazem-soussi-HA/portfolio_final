import { Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function InfraStatus() {
  const [uptime, setUptime] = useState(99.98);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => Math.min(99.99, prev + (Math.random() * 0.01)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const systems = [
    { name: 'Kubernetes Cluster', status: 'operational', uptime: 99.99 },
    { name: 'CI/CD Pipeline', status: 'operational', uptime: 99.95 },
    { name: 'Database Cluster', status: 'operational', uptime: 99.98 },
    { name: 'API Gateway', status: 'operational', uptime: 99.97 },
    { name: 'Monitoring Stack', status: 'operational', uptime: 99.99 },
    { name: 'Security Vault', status: 'operational', uptime: 100.0 }
  ];

  return (
    <div className="space-y-6">
      <div className="glass p-8 rounded-xl border border-green-500/20">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle2 className="text-green-400" size={28} />
          <div>
            <p className="text-xs text-slate-400 font-mono">System Uptime</p>
            <p className="text-3xl font-bold text-green-400">{uptime.toFixed(2)}%</p>
          </div>
        </div>
        <p className="text-sm text-slate-400">All critical systems operational • Last incident: 47 days ago</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map((sys, idx) => (
          <div key={idx} className="glass p-4 rounded-lg border border-green-500/10 hover:border-green-500/30 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{sys.name}</span>
              <Activity className="text-green-400" size={16} />
            </div>
            <p className="text-xs text-slate-400">{sys.uptime}% uptime</p>
          </div>
        ))}
      </div>
    </div>
  );
}
