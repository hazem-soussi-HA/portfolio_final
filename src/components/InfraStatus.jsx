import React, { useState, useEffect } from 'react';
import { Shield, Activity, Lock } from 'lucide-react';

const InfraStatus = () => {
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      const h = Math.floor(diff / 3600).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const s = (diff % 60).toString().padStart(2, '0');
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-md border border-green-500/20 p-4 font-mono rounded-lg mb-6 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-green-500 text-xs uppercase tracking-tighter flex items-center gap-2">
          <Activity size={14} className="animate-pulse" /> System Telemetry
        </h3>
        <span className="text-[10px] text-gray-500 font-bold">UPTIME: {uptime}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'K8S CLUSTER', val: 'HEALTHY', color: 'text-green-400', icon: <Shield size={12}/> },
          { label: 'PASCAL VAULT', val: 'ENCRYPTED', color: 'text-blue-400', icon: <Lock size={12}/> },
          { label: 'FIREWALL', val: 'ACTIVE', color: 'text-cyan-400', icon: <Activity size={12}/> }
        ].map((sys) => (
          <div key={sys.label} className="border border-white/5 p-2 rounded bg-white/5">
            <p className="text-[9px] text-gray-500">{sys.label}</p>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs font-bold ${sys.color}`}>{sys.val}</span>
              <span className={sys.color}>{sys.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfraStatus;