import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cloud-blue/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cloud-cyan/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cloud-blue/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,112,243,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,243,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-cloud-cyan">
            <span className="w-2 h-2 bg-cloud-cyan rounded-full animate-pulse" />
            Open to opportunities
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="gradient-text">Orchestrating</span>
          <br />
          <span className="text-white">Scalable Realities</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Cloud Architect & DevOps Engineer transforming infrastructure complexity into performance.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-cloud-blue to-cloud-cyan rounded-xl font-semibold text-white hover:shadow-[0_0_40px_rgba(0,112,243,0.4)] transition-all duration-300 hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass rounded-xl font-semibold text-cloud-cyan hover:border-cloud-cyan/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Photo with Premium Tech Effects */}
        <div className="md:w-1/2 flex-1 flex items-center justify-center mt-10 mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Parallax container with hover effect */}
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 bg-slate-800"
              whileHover={{ x: -10, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Octagon image with mask */}
              <motion.img
                src="/hazem-hero.jpg"
                alt="Hazem Soussi Graduation"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  WebkitClipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  filter: 'grayscale(100%) contrast(110%)',
                  transition: 'filter 0.5s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.target.style.filter = 'grayscale(0%) contrast(100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.filter = 'grayscale(100%) contrast(110%)';
                }}
                onError={(e) => {
                  e.target.style.border = '2px solid red';
                  e.target.style.backgroundColor = '#ffe6e6';
                }}
              />
              
              {/* Neon border effect */}
              <div className="absolute inset-0" style={{
                pointerEvents: 'none',
                border: '2px solid #0070f3',
                borderRadius: 'inherit',
                WebkitMaskClip: 'text, border-box'
              }}></div>
              
              {/* Electric blue halo effect */}
              <div className="absolute inset-0" style={{
                pointerEvents: 'none',
                filter: 'blur(20px)',
                background: 'radial-gradient(circle at center, #0070f3 0%, transparent 70%)',
                opacity: '0.3'
              }}></div>
            </motion.div>
            
            {/* Glassmorphism badge */}
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-[0_0_15px_rgba(0,112,243,0.2)]">
                <span className="text-xs font-medium text-cloud-cyan">Status:</span>
                <span className="text-xs font-medium text-white">Ready to Deploy</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 bg-cloud-blue rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection