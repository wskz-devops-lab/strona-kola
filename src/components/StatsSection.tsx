import { motion } from 'framer-motion';
import { Server, Zap, FolderGit2, CalendarClock } from 'lucide-react';
import { TELEMETRY } from '../data/projectsData';

const ICONS = [Server, Zap, FolderGit2, CalendarClock];

const ACCENT_CLASSES: Record<string, { text: string; border: string; glow: string; bar: string }> = {
  neon: {
    text: 'text-neon',
    border: 'hover:border-neon/60',
    glow: 'hover:shadow-neon-sm',
    bar: 'bg-neon',
  },
  cyanic: {
    text: 'text-cyanic',
    border: 'hover:border-cyanic/60',
    glow: 'hover:shadow-cyan-md',
    bar: 'bg-cyanic',
  },
  violet: {
    text: 'text-violet',
    border: 'hover:border-violet/60',
    glow: 'hover:shadow-violet-md',
    bar: 'bg-violet',
  },
};

export default function StatsSection() {
  return (
    <section className="px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {TELEMETRY.map((t, i) => {
          const Icon = ICONS[i % ICONS.length];
          const accent = ACCENT_CLASSES[t.accent];
          return (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`blueprint-card p-5 transition-all duration-300 ${accent.border} ${accent.glow}`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] tracking-widest text-ink-muted font-semibold">
                  [0{i + 1}] {t.label}
                </span>
                <Icon size={16} className={accent.text} />
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className={`text-3xl sm:text-4xl font-extrabold font-mono ${accent.text}`}>
                  {t.value}
                </span>
                <span className="font-mono text-xs text-ink-soft">{t.unit}</span>
              </div>
              <div className="mt-3 h-1 rounded-full bg-surface overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                  className={`h-full rounded-full ${accent.bar}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
