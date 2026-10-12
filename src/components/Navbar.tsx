import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Github, TerminalSquare } from 'lucide-react';
import { CONTACT } from '../data/projectsData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'bg-void/90 backdrop-blur-lg border-edge' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="p-1.5 rounded-md bg-neon/10 border border-neon/30 text-neon group-hover:shadow-neon-sm transition-shadow">
            <TerminalSquare size={18} />
          </span>
          <span className="font-mono font-bold text-sm sm:text-base tracking-tight text-slate-100">
            [WSKZ <span className="text-neon">//</span> DEVOPS-LAB]
          </span>
        </a>

        {/* Status klastra */}
        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-400 border border-edge rounded-full px-3 py-1.5 bg-panel/60">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
          </span>
          <span>
            PROXMOX CLUSTER: <span className="text-neon font-semibold">ONLINE</span>
          </span>
        </div>

        {/* Akcje */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="#projekty"
            className="font-mono text-xs px-3 py-2 rounded-lg text-slate-300 hover:text-neon transition-colors"
          >
            Projekty
          </a>
          <a
            href={CONTACT.materialsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs px-3 py-2 rounded-lg border border-edge bg-panel/60 text-slate-300 hover:text-cyanic hover:border-cyanic/40 transition-colors"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Materiały</span>
          </a>
          <a
            href={CONTACT.githubOrg}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs px-3 py-2 rounded-lg border border-edge bg-panel/60 text-slate-300 hover:text-neon hover:border-neon/40 transition-colors"
          >
            <Github size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="#kontakt"
            className="font-mono text-xs px-3 py-2 rounded-lg bg-neon/15 border border-neon/40 text-neon hover:bg-neon/25 transition-all"
          >
            Kontakt
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
