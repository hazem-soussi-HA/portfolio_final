import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Work' },
  { href: '#lab', label: 'Lab' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#top" className="text-lg font-bold gradient-text tracking-tight">Hazem Soussi</a>

        <div className="hidden md:flex gap-7 text-sm text-slate-400">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-white transition">{l.label}</a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-400 hover:text-white"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-950 border-t border-white/5 py-4 px-6">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="block py-2 text-slate-300 hover:text-white">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
