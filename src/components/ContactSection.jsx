import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-blue-400 font-mono uppercase tracking-widest mb-4">Get In Touch</p>
          <h2 className="text-5xl font-bold mb-4">Let's Build Something Great</h2>
          <p className="text-slate-400 text-lg">
            Open to discussing infrastructure challenges, DevOps optimization, and cloud architecture.
          </p>
        </div>

        <div className="glass p-12 rounded-xl border border-blue-500/20">
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <a 
              href="https://github.com/hazem-soussi-HA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-blue-500/10 transition group"
            >
              <Github size={32} className="group-hover:text-blue-400 transition" />
              <span className="text-sm font-semibold">GitHub</span>
              <span className="text-xs text-slate-500 group-hover:text-slate-400">@hazem-soussi-HA</span>
            </a>

            <a 
              href="https://linkedin.com/in/hazem-soussi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-blue-500/10 transition group"
            >
              <Linkedin size={32} className="group-hover:text-blue-400 transition" />
              <span className="text-sm font-semibold">LinkedIn</span>
              <span className="text-xs text-slate-500 group-hover:text-slate-400">Connect</span>
            </a>

            <a 
              href="mailto:hazem.soussi@gmail.com"
              className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-blue-500/10 transition group"
            >
              <Mail size={32} className="group-hover:text-blue-400 transition" />
              <span className="text-sm font-semibold">Email</span>
              <span className="text-xs text-slate-500 group-hover:text-slate-400">hazem.soussi@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
