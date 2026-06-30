import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, CheckCircle, FileText } from 'lucide-react'

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', sent: false })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to a backend or service like Formspree
    // For now, open mailto with form data
    const subject = encodeURIComponent(`Portfolio contact: ${formState.name}`)
    const body = encodeURIComponent(`From: ${formState.name} ($formState.email})\n\n${formState.message}`)
    window.location.href = `mailto:hazem.soussi@gmail.com?subject=${subject}&body=${body}`
    setFormState((prev) => ({ ...prev, sent: true }))
    setTimeout(() => setFormState((prev) => ({ ...prev, sent: false })), 4000)
  }

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 relative" aria-label="Contact">
      <div className="absolute top-0 left-0 right-0 section-divider" aria-hidden="true" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs text-cyan uppercase tracking-widest mb-3">
            // transmission — level: open
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan">Contact</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Un projet en tête ? Une collaboration ? Une question ?
            N'hésitez pas à me contacter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 sm:gap-10">
          {/* Left: Social links */}
          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 mb-6">
              Canaux directs
            </h3>

            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'hazem.soussi@gmail.com',
                href: 'mailto:hazem.soussi@gmail.com',
                color: 'cyan',
              },
              {
                icon: Github,
                label: 'GitHub',
                value: 'hazem-soussi-HA',
                href: 'https://github.com/hazem-soussi-HA',
                color: 'matrix',
              },
              {
                icon: Linkedin,
                label: 'LinkedIn',
                value: 'Hazem Soussi',
                href: 'https://www.linkedin.com/in/hazem-soussi/',
                color: 'amber',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group transition-all"
                aria-label={item.label}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    item.color === 'cyan'
                      ? 'bg-cyan/10 text-cyan'
                      : item.color === 'matrix'
                      ? 'bg-matrix/10 text-matrix'
                      : 'bg-amber/10 text-amber'
                  }`}
                >
                  <item.icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-500">{item.label}</div>
                  <div className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}

            {/* CV / Resume placeholder */}
            <div className="glass rounded-xl p-4 flex items-center gap-4 opacity-50">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                <FileText size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-500">CV</div>
                <div className="text-sm text-slate-500">Bientôt disponible</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 mb-2">
                Envoyer un message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs text-slate-500 mb-1.5 font-mono">
                    Nom
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs text-slate-500 mb-1.5 font-mono">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs text-slate-500 mb-1.5 font-mono">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 transition-all resize-none"
                  placeholder="Décrivez votre projet ou votre message..."
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[10px] text-slate-600 font-mono">
                  {formState.sent ? (
                    <span className="text-matrix flex items-center gap-1.5">
                      <CheckCircle size={12} /> Message prêt à envoyer
                    </span>
                  ) : (
                    'Votre client email s\'ouvrira'
                  )}
                </p>
                <button
                  type="submit"
                  className="btn-primary text-sm"
                >
                  <Send size={14} />
                  Envoyer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
