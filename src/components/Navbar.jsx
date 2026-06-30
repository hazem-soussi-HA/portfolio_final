import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-slate-950 via-slate-950 to-transparent">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold gradient-text">Hazem Soussi</div>
        
        <div className="hidden md:flex gap-8 text-sm">
          <a href="#tech" className="hover:text-blue-400 transition">Tech Stack</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-400 hover:text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-950 border-t border-white/5 py-4 px-6">
          <a href="#tech" className="block py-2 hover:text-blue-400">Tech Stack</a>
          <a href="#projects" className="block py-2 hover:text-blue-400">Projects</a>
          <a href="#contact" className="block py-2 hover:text-blue-400">Contact</a>
        </div>
      )}
    </nav>
  );
}
