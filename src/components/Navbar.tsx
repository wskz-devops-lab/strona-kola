import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Github, Moon, Sun, TerminalSquare, UserPlus } from 'lucide-react';
import { CONTACT } from '../data/projectsData';

function getSystemScheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getRenderedScheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  const content = meta?.content;
  if (content === 'light' || content === 'dark') return content;
  return getSystemScheme();
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scheme, setScheme] = useState<'light' | 'dark'>(getRenderedScheme);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Synchronizacja ze zmianą motywu systemowego (gdy brak przypiętego override) oraz między kartami
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const syncState = () => setScheme(getRenderedScheme());

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'color-scheme') {
        const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
        if (meta) {
          meta.content = e.newValue === 'light' || e.newValue === 'dark' ? e.newValue : 'light dark';
        }
        syncState();
      }
    };

    mql.addEventListener('change', syncState);
    window.addEventListener('storage', onStorage);
    return () => {
      mql.removeEventListener('change', syncState);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Przełącznik dwustanowy zgodny z modern-web-guidance (dark-mode-toggle)
  const toggleScheme = useCallback(() => {
    const currentRendered = getRenderedScheme();
    const target: 'light' | 'dark' = currentRendered === 'dark' ? 'light' : 'dark';
    const system = getSystemScheme();
    const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');

    try {
      if (target !== system) {
        localStorage.setItem('color-scheme', target);
        if (meta) meta.content = target;
      } else {
        localStorage.removeItem('color-scheme');
        if (meta) meta.content = 'light dark';
      }
    } catch {
      if (meta) meta.content = target;
    }

    setScheme(target);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? 'bg-void/90 backdrop-blur-lg border-edge shadow-sm' : 'bg-void/60 backdrop-blur-sm border-edge/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 group shrink-0">
          <span className="p-1.5 rounded-md bg-neon/10 border border-neon/30 text-neon group-hover:shadow-neon-sm transition-shadow">
            <TerminalSquare size={18} />
          </span>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-xs sm:text-sm tracking-tight text-ink leading-none">
              [WSKZ <span className="text-neon">//</span> DEVOPS-LAB]
            </span>
            <span className="font-mono text-[10px] text-ink-muted hidden sm:inline mt-0.5">
              Koło Naukowe Wirtualizacji, AI & Security
            </span>
          </div>
        </a>

        {/* Nawigacja środkowa */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
          <a
            href="#start"
            className="px-2.5 py-1.5 rounded-lg text-ink-soft hover:text-neon hover:bg-surface transition-colors"
          >
            01.Jak zacząć
          </a>
          <a
            href="#projekty"
            className="px-2.5 py-1.5 rounded-lg text-ink-soft hover:text-neon hover:bg-surface transition-colors"
          >
            02.Projekty (16)
          </a>
          <a
            href="#vdi"
            className="px-2.5 py-1.5 rounded-lg text-ink-soft hover:text-cyanic hover:bg-surface transition-colors"
          >
            03.Architektura VDI
          </a>
          <a
            href="#galeria"
            className="px-2.5 py-1.5 rounded-lg text-ink-soft hover:text-cyanic hover:bg-surface transition-colors"
          >
            04.Galeria & Docs
          </a>
          <a
            href="#redteam"
            className="px-2.5 py-1.5 rounded-lg text-ink-soft hover:text-violet hover:bg-surface transition-colors"
          >
            05.Red Team
          </a>
        </nav>

        {/* Akcje prawe + Przełącznik motywu */}
        <div className="flex items-center gap-2">
          <a
            href={CONTACT.materialsSiteUrl}
            target="_blank"
            rel="noreferrer"
            title="Otwórz Bazę Wiedzy MkDocs"
            className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 rounded-lg border border-edge bg-panel text-ink-soft hover:text-cyanic hover:border-cyanic/50 transition-colors"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Baza Wiedzy</span>
          </a>

          <a
            href={CONTACT.githubOrg}
            target="_blank"
            rel="noreferrer"
            title="Organizacja GitHub wskz-devops-lab"
            className="hidden sm:flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 rounded-lg border border-edge bg-panel text-ink-soft hover:text-neon hover:border-neon/50 transition-colors"
          >
            <Github size={14} />
            <span className="hidden xl:inline">GitHub</span>
          </a>

          <button
            type="button"
            onClick={toggleScheme}
            aria-label={scheme === 'dark' ? 'Przełącz na motyw jasny (Blueprint)' : 'Przełącz na motyw ciemny (Terminal NOC)'}
            title={scheme === 'dark' ? 'Motyw jasny (Inżynierski Blueprint)' : 'Motyw ciemny (Konsola NOC)'}
            className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 rounded-lg border border-edge bg-panel text-ink hover:border-neon/50 transition-colors cursor-pointer"
          >
            {scheme === 'dark' ? (
              <>
                <Sun size={14} className="text-amber" />
                <span className="hidden md:inline text-[11px]">Jasny</span>
              </>
            ) : (
              <>
                <Moon size={14} className="text-violet" />
                <span className="hidden md:inline text-[11px]">Ciemny</span>
              </>
            )}
          </button>

          <a
            href="#rekrutacja"
            className="flex items-center gap-1.5 font-mono text-xs font-semibold px-3 py-1.5 rounded-lg bg-neon text-white dark:text-slate-950 hover:shadow-neon-sm transition-all"
          >
            <UserPlus size={14} />
            <span>Dołącz</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
