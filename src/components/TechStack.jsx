import { motion } from 'framer-motion'
import { Cloud, Server, Shield, GitBranch } from 'lucide-react'

const techStack = [
  { name: 'Kubernetes', icon: Cloud, color: '#326ce5', desc: 'Container Orchestration' },
  { name: 'Docker', icon: Server, color: '#2496ed', desc: 'Containerization' },
  { name: 'AWS', icon: Shield, color: '#ff9900', desc: 'Cloud Platform' },
  { name: 'Ansible', icon: GitBranch, color: '#EE0000', desc: 'Configuration Mgmt' },
]

const TechStack = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-slate-500">Tools that power my infrastructure</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="glass glass-hover rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${tech.color}20` }}
              >
                <tech.icon size={32} style={{ color: tech.color }} />
              </div>
              <h3 className="text-xl font-bold mb-1">{tech.name}</h3>
              <p className="text-sm text-slate-500">{tech.desc}</p>
              <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r rounded-full transition-all duration-500" style={{ background: `linear-gradient(to right, ${tech.color}, ${tech.color}80)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack