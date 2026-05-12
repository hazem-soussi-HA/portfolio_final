import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TerminalSection = () => {
  const [lines, setLines] = useState([])

  useEffect(() => {
    const cmds = [
      '$ kubectl config use-context production-cluster',
      'Switched to context "production-cluster".',
      '$ kubectl apply -f deployment.yaml',
      'deployment.apps/api-gateway created',
      'service/api-gateway created',
      '$ terraform plan -out=infra.tfplan',
      'Terraform used the selected providers to generate execution plan.',
      'Plan: 12 to add, 0 to change, 3 to destroy.',
      '$ ansible-playbook -i inventory/ site.yml --diff',
      'TASK [deploy app] *** changed: [web-01] => (delta)',
      'TASK [configure monitoring] => ok: [monitor-01]',
      '',
      'Infrastructure ready. All systems operational.',
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < cmds.length) {
        setLines(prev => [...prev, cmds[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Expertise Terminal</span>
          </h2>
          <p className="text-slate-500">Watch infrastructure come alive</p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0c1021] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-slate-500 font-mono">terminal — hazem@cloud-infrastructure</span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed min-h-[280px]">
            <AnimatePresence>
               {lines.filter(Boolean).map((line, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.2 }}
                   className={line?.startsWith('$') ? 'text-cloud-cyan' : 'text-slate-400'}
                 >
                   {line}
                 </motion.div>
               ))}
            </AnimatePresence>
            <span className="inline-block w-2 h-4 bg-cloud-cyan animate-pulse ml-1" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TerminalSection