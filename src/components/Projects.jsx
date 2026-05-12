import { motion } from 'framer-motion'
import { devSecOpsProjects } from '../projects'

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cloud-blue/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cloud-blue/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-slate-500">Projects that define my expertise</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {devSecOpsProjects?.map((project, i) => (
            <motion.div
              key={project?.title ?? i}
              className="glass glass-hover rounded-2xl p-8 flex flex-col justify-between group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <div>
                <span className="text-xs font-medium text-cloud-cyan uppercase tracking-wider">{project?.tech ?? 'Infrastructure'}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{project?.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{project?.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project?.securityStatus && (
                    <span className="px-2 py-0.5 border border-green-500/50 text-[10px] text-green-500 rounded-full font-mono">
                      SEC: {project.securityStatus}
                    </span>
                  )}
                  {project?.lastScan && (
                    <span className="px-2 py-0.5 border border-slate-600/50 text-[10px] text-slate-400 rounded-full font-mono">
                      SCAN: {project.lastScan}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <a
                  href={project?.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cloud-cyan hover:text-cloud-blue transition-colors font-mono"
                >
                  view_repo →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects