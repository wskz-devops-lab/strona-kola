import { motion } from 'framer-motion';
import { Server, Zap, FolderGit2, ShieldCheck } from 'lucide-react';
import { TELEMETRY } from '../data/projectsData';

const ICONS = [Server, Zap, FolderGit2, ShieldCheck];

const ACCENT_CLASSES: Record<string, { text: string; border: string; glow: string }> = {
  neon: { text: 'text-neon', border: 'hover:border-neon/50', glow: 'hover:shadow-neon-md' },
  cyanic: { text: 'text-cyanic', border: 'hover:border-cyanic/50', glow: 'hover:shadow-cyan-md' },
  violet: { text: 'text-violet', border: 'hover:border-violet/50', glow: 'hover:shadow-violet-md' },
};

export default function StatsSection() {
  return (
    <section className="px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {TELEMETRY.map((t, i) => {
          const Icon = ICONS[i % ICONS.length];
          const accent = ACCENT_CLASSES[t.accent];
          return (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass-panel p-5 transition-all duration-300 ${accent.border} ${accent.glow}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] tracking-widest text-slate-500">{t.label}</span>
                <Icon size={16} className={accent.text} />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-3xl sm:text-4xl font-bold font-mono ${accent.text}`}>{t.value}</span>
                <span className="font-mono text-xs text-slate-500">{t.unit}</span>
              </div>
              <div className="mt-3 h-1 rounded-full bg-edge overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    t.accent === 'neon' ? 'bg-neon' : t.accent === 'cyanic' ? 'bg-cyanic' : 'bg-violet'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
