import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cloud, ShieldAlert, LayoutGrid } from 'lucide-react';
import { PROJECTS, type Project, type ProjectCategory } from '../data/projectsData';

type Filter = 'all' | ProjectCategory;

const FILTERS: { key: Filter; label: string; icon: typeof LayoutGrid }[] = [
  { key: 'all', label: 'Wszystkie Projekty (16)', icon: LayoutGrid },
  { key: 'infra', label: 'Infrastruktura & DevOps (1–10)', icon: Cloud },
  { key: 'ai-cyber', label: 'Sztuczna Inteligencja & Cyberbezpieczeństwo (11–16)', icon: ShieldAlert },
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  // Dla projektów 1-5 mamy dedykowane tutoriale w repozytorium materiałów
  const hasDetailedTutorial = p.id <= 5;
  const tutorialSlug = [
    '',
    'projekt-01-wirtualizacja.md',
    'projekt-02-konteneryzacja.md',
    'projekt-03-cicd.md',
    'projekt-04-prywatna-chmura.md',
    'projekt-05-backup.md',
  ][p.id];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className="p-6 rounded-xl border border-edge/80 bg-panel/40 hover:bg-panel/70 hover:border-slate-700 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs text-slate-500 font-semibold tracking-wider">
            PROJEKT #{String(p.id).padStart(2, '0')}
          </span>
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
            {p.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-100 leading-snug mb-2.5">
          {p.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-edge/60 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-mono">
          Cel: <span className="text-slate-300">{p.outcome}</span>
        </span>

        {hasDetailedTutorial && (
          <a
            href={`https://github.com/wskz-devops-lab/materialy-dydaktyczne/blob/main/docs/projekty/${tutorialSlug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-neon hover:underline shrink-0 ml-2"
          >
            Tutorial <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projekty" className="px-4 sm:px-6 py-20 border-t border-edge/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="section-title mb-2">// program inżynierski</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Katalog 16 Projektów Laboratoryjnych
          </h2>
          <p className="mt-3 text-slate-400 max-w-3xl leading-relaxed text-sm sm:text-base">
            Projekty realizowane są w trybie indywidualnym lub dwuosobowym.
            Poniższe zestawienie stanowi ustrukturyzowany zbiór zagadnień: od wirtualizacji KVM
            i konteneryzacji po suwerenne serwery AI oraz zautomatyzowane testy penetracyjne.
          </p>
        </motion.div>

        {/* Zakładki filtrowania */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                filter === key
                  ? 'bg-slate-800 text-slate-100 border-slate-600 shadow-sm'
                  : 'bg-panel/40 text-slate-400 border-edge hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Siatka projektów */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p, idx) => (
            <ProjectCard key={p.id} p={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
