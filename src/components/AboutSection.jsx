import { motion } from 'framer-motion'
import { MapPin, Code2, Heart, Globe } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 relative" aria-label="À propos">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" aria-hidden="true" />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs text-cyan uppercase tracking-widest mb-3">
            // about.enc — level: public
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="gradient-text-cyan">À propos</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 sm:gap-12">
          {/* Left: Photo / Identity */}
          <motion.div
            className="md:col-span-2 flex flex-col items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Avatar placeholder with terminal aesthetic */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden mb-6 glass glow-cyan">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-5xl sm:text-6xl font-bold gradient-text-cyan">HS</div>
                  <div className="font-mono text-[10px] text-slate-500 mt-2">shadow-builder</div>
                </div>
              </div>
              {/* Scan line effect */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent animate-scan-line pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">Hazem Soussi</h3>
              <p className="text-sm text-slate-400 font-mono mb-3">OS Architect & Game Developer</p>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <MapPin size={12} />
                <span>Tunisie → Monde</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            className="md:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Terminal-style bio */}
            <div className="glass rounded-2xl p-5 sm:p-6 font-mono text-sm leading-relaxed">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[10px] text-slate-600">identity.txt</span>
              </div>
              <p className="text-slate-300 mb-3">
                <span className="text-cyan">$</span> cat /identity/whoami.txt
              </p>
              <p className="text-slate-400 mb-4">
                Je suis Hazem Soussi, développeur full-stack et créateur de systèmes d'exploitation.
                Basé en Tunisie, je conçois et construis des systèmes complets — du noyau OS au moteur de jeu,
                de l'interface web à l'intelligence artificielle.
              </p>
              <p className="text-slate-300 mb-3">
                <span className="text-cyan">$</span> cat /identity/mission.txt
              </p>
              <p className="text-slate-400">
                Ma mission : construire une technologie qui soigne, qui connecte, qui élève.
                Chaque ligne de code est intentionnelle. Chaque projet est un acte de création
                qui refuse d'être ordinaire.
              </p>
            </div>

            {/* Key values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  icon: Code2,
                  title: 'Build',
                  desc: 'OS, jeux, IA, full-stack — du kernel au pixel',
                  color: 'cyan',
                },
                {
                  icon: Heart,
                  title: 'Heal',
                  desc: 'La technologie comme thérapie, le jeu comme médecine',
                  color: 'matrix',
                },
                {
                  icon: Globe,
                  title: 'Share',
                  desc: 'Open source parce que le savoir appartient à tous',
                  color: 'amber',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass rounded-xl p-4 text-center glass-hover"
                >
                  <item.icon
                    size={20}
                    className={`mx-auto mb-2 ${
                      item.color === 'cyan'
                        ? 'text-cyan'
                        : item.color === 'matrix'
                        ? 'text-matrix'
                        : 'text-amber'
                    }`}
                  />
                  <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2">
              {[
                'Operating Systems',
                'Game Development',
                'Full-Stack Web',
                'Artificial Intelligence',
                'DevOps & Security',
                'Kernel Programming',
              ].map((tag) => (
                <span key={tag} className="tag tag-cyan">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
