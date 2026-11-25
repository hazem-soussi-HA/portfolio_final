import { Code2, Cpu, Shield, Sparkles } from 'lucide-react';

const commitments = [
  {
    icon: Sparkles,
    title: 'AI & Intelligent Systems',
    blurb: 'I build practical intelligence into products — local LLM workflows, agent-style automation, and decision logic designed for real constraints.',
    code: `const response = await agent.run({
  goal: user.intent,
  tools: ["search", "analyze", "execute"],
  constraints: { offlineFirst: true, auditable: true }
});`,
    tags: ['LLMs', 'Agents', 'Automation'],
  },
  {
    icon: Shield,
    title: 'Secure Platform Integration',
    blurb: 'Real engineering from my private platform work: server-side API proxying, token isolation, and controlled service integration.',
    code: `function pveProxy(req, res, apiPath, query) {
  const options = {
    hostname: PVE_HOST,
    port: PVE_PORT,
    path: '/api2/json' + apiPath + (query ? '?' + query : ''),
    method: req.method,
    rejectUnauthorized: false,
  };
  if (PVE_TOKEN) options.headers = { Authorization: 'PVEAPIToken=' + PVE_TOKEN };
  return https.request(options, proxyRes => proxyRes.pipe(res));
}`,
    tags: ['Node.js', 'Security', 'Integration'],
  },
  {
    icon: Cpu,
    title: 'Algorithms & Engineering Logic',
    blurb: 'Strong products need strong logic. I focus on algorithms, data flow, and system behavior that stays clear, measurable, and maintainable.',
    code: `function prioritize(tasks, constraints) {
  return tasks
    .map(scoreByImpact(constraints))
    .sort((a, b) => b.score - a.score)
    .filter(withinBudget(constraints));
}`,
    tags: ['Algorithms', 'Optimization', 'Data flow'],
  },
  {
    icon: Code2,
    title: 'Automated Delivery & GitHub Actions',
    blurb: 'I ship fast and share publicly when possible — vibe coding across projects, automated with GitHub Actions for build, test, and deployment workflows.',
    code: `name: build-and-deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/deploy-pages@v4`,
    tags: ['GitHub Actions', 'CI/CD', 'Public delivery'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 border-t border-white/5 section-grid">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">Code & Commitment</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Intelligence built through code.</h2>
        <p className="text-slate-400 max-w-2xl mb-12">
          I don’t just talk about AI and engineering — I build it. This portfolio reflects my commitment
          to intelligent systems, solid algorithms, and hands-on development.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {commitments.map(({ icon: Icon, title, blurb, code, tags }) => (
            <article key={title} className="glass glass-hover apex-panel rounded-xl p-6 flex flex-col transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold leading-snug">{title}</h3>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-4">{blurb}</p>

              <pre className="text-[11px] sm:text-xs font-mono text-slate-300 bg-[#05070d] border border-white/5 rounded-lg p-4 overflow-x-auto mb-4">
                <code>{code}</code>
              </pre>

              <div className="flex flex-wrap gap-2 mt-auto">
                {tags.map(t => <span key={t} className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-300">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
