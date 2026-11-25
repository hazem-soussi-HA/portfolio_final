export default function AboutSection() {
  const pillars = [
    {
      title: 'AI & algorithms, applied',
      body: 'I apply AI and algorithmic thinking where they create real value — from LLM-powered workflows and intelligent automation to custom logic designed around performance, reliability, and context.',
      tags: ['LLMs & agents', 'Algorithms', 'Automation', 'Data-driven logic'],
    },
    {
      title: 'Engineering with rigor',
      body: 'As a Computer Science Engineer, I build from solid foundations: clean architecture, secure defaults, measurable behavior, and systems I can explain from interface to infrastructure.',
      tags: ['System design', 'Security', 'Performance', 'Maintainability'],
    },
    {
      title: 'Proof over claims',
      body: 'Public work is linked to repositories, and private work is clearly labeled. I focus on deliverables, reproducible engineering, and outcomes that hold up under scrutiny.',
      tags: ['Public repos', 'Private case studies', 'Measured delivery'],
    },
  ];

  return (
    <section id="about" className="py-20 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">About</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">Computer science, applied with intent.</h2>

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
