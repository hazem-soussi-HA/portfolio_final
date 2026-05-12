import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-6xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-lg gradient-text">HS</span>
        <div className="flex gap-6 text-sm text-slate-400">
          <a href="#projects" className="hover:text-cloud-cyan transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cloud-cyan transition-colors">Contact</a>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar