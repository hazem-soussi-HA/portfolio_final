import { Github, Linkedin, Mail } from 'lucide-react';

const channels = [
  { icon: Github, label: 'GitHub', sub: '@hazem-soussi-HA', href: 'https://github.com/hazem-soussi-HA' },
  { icon: Linkedin, label: 'LinkedIn', sub: 'hazem-soussi', href: 'https://linkedin.com/in/hazem-soussi' },
  { icon: Mail, label: 'Email', sub: 'hazem.soussi@gmail.com', href: 'mailto:hazem.soussi@gmail.com' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">Contact</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's build something defensible.</h2>
        <p className="text-slate-400 mb-12">Open to infrastructure, platform and security conversations — on-prem first, cloud when it earns it.</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {channels.map(({ icon: Icon, label, sub, href }) => (
            <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
               className="glass glass-hover rounded-xl p-6 flex flex-col items-center gap-3 transition group">
              <Icon size={28} className="text-slate-400 group-hover:text-blue-400 transition" />
              <span className="font-semibold">{label}</span>
              <span className="text-xs text-slate-500">{sub}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
