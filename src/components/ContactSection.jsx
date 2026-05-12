import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react'

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cloud-blue/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Build<br /><span className="gradient-text">Together</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Ready to transform your infrastructure? Let's connect and create something remarkable.
          </p>

          <a
            href="mailto:hazem.soussi@example.com"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cloud-blue to-cloud-cyan rounded-2xl font-bold text-lg text-white hover:shadow-[0_0_60px_rgba(0,112,243,0.4)] transition-all duration-300 hover:-translate-y-1 glow"
          >
            <Mail size={22} />
            Get in Touch
          </a>

          <div className="flex justify-center gap-4 mt-10">
            {[
              { icon: Github, href: 'https://github.com/hazem-soussi-HA', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/hazem-soussi/', label: 'LinkedIn' },
              { icon: ExternalLink, href: '#projects', label: 'Portfolio' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-cloud-cyan hover:border-cloud-cyan/40 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection