import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Cloud,
  ShieldAlert,
  LayoutGrid,
  Sparkles,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import {
  PROJECTS,
  MKDOCS_BASE_URL,
  type Project,
  type ProjectCategory,
  type StarterTrack,
  type SkillLevel,
} from '../data/projectsData';

type Filter = 'all' | ProjectCategory;

const FILTERS: { key: Filter; label: string; icon: typeof LayoutGrid }[] = [
  { key: 'all', label: 'Wszystkie Projekty (16)', icon: LayoutGrid },
  { key: 'infra', label: 'Infrastruktura & DevOps (1–10)', icon: Cloud },
  { key: 'ai-cyber', label: 'AI & Cyberbezpieczeństwo (11–16)', icon: ShieldAlert },
];

const TRACK_OPTIONS: { key: StarterTrack; label: string }[] = [
  { key: 'all', label: 'Wszystkie obszary' },
  { key: 'cloud-virt', label: 'Wirtualizacja, Serwery & Chmura' },
  { key: 'containers-auto', label: 'Docker, CI/CD & Ansible' },
  { key: 'ai-llm', label: 'Własny Serwer AI / LLM' },
  { key: 'cyber-net', label: 'Cyberbezpieczeństwo & VPN' },
];

const LEVEL_OPTIONS: { key: SkillLevel | 'any'; label: string }[] = [
  { key: 'any', label: 'Dowolny poziom' },
  { key: 'beginner', label: 'Początkujący (na start)' },
  { key: 'intermediate', label: 'Średniozaawansowany' },
  { key: 'advanced', label: 'Ambitny / Zaawansowany' },
];

const STATUS_BADGE: Record<Project['status'], string> = {
  'gotowe demo': 'bg-neon/15 text-neon border-neon/40',
  'w realizacji': 'bg-cyanic/15 text-cyanic border-cyanic/40',
  rekrutacja: 'bg-surface text-ink-soft border-edge',
};

function ProjectCard({
  p,
  index,
  recommended,
}: {
  p: Project;
  index: number;
  recommended: boolean;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.25) }}
      className={`p-6 rounded-xl border transition-all flex flex-col justify-between ${
        recommended
          ? 'bg-panel border-neon shadow-neon-sm ring-1 ring-neon/30'
          : 'bg-panel/90 border-edge hover:border-ink-muted/50'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-muted font-bold tracking-wider">
              PROJEKT #{String(p.id).padStart(2, '0')}
            </span>
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${STATUS_BADGE[p.status]}`}>
              {p.status}
            </span>
          </div>
          <span className="mono-badge">{p.difficulty}</span>
        </div>

        {recommended && (
          <div className="mb-2.5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-neon bg-neon/10 px-2.5 py-0.5 rounded-full border border-neon/30">
            <Sparkles size={12} /> Rekomendowany dla Twojego wyboru
          </div>
        )}

        <h3 className="text-lg font-bold text-ink leading-snug mb-2.5">{p.title}</h3>

        <p className="text-sm text-ink-soft leading-relaxed mb-4">{p.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface text-ink-soft border border-edge"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-edge flex items-center justify-between gap-2 text-xs">
        <span className="text-ink-muted font-mono leading-relaxed">
          Efekt: <span className="text-ink-soft">{p.outcome}</span>
        </span>

        {p.docPath ? (
          <a
            href={`${MKDOCS_BASE_URL}/${p.docPath}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-neon hover:underline shrink-0 ml-2"
          >
            Dokumentacja <ArrowUpRight size={13} />
          </a>
        ) : (
          <a
            href={`${MKDOCS_BASE_URL}/projekty/katalog-projektow-1-16/`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-cyanic shrink-0 ml-2"
          >
            Opis w katalogu <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedTrack, setSelectedTrack] = useState<StarterTrack>('all');
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | 'any'>('any');

  const isMatcherActive = selectedTrack !== 'all' || selectedLevel !== 'any';

  const visible = useMemo(() => {
    const base = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
    if (!isMatcherActive) return base;

    return [...base].sort((a, b) => {
      const aMatch =
        (selectedTrack === 'all' || a.tracks.includes(selectedTrack)) &&
        (selectedLevel === 'any' || a.levels.includes(selectedLevel));
      const bMatch =
        (selectedTrack === 'all' || b.tracks.includes(selectedTrack)) &&
        (selectedLevel === 'any' || b.levels.includes(selectedLevel));
      return Number(bMatch) - Number(aMatch);
    });
  }, [filter, selectedTrack, selectedLevel, isMatcherActive]);

  const checkRecommended = (p: Project) => {
    if (!isMatcherActive) return false;
    const trackOk = selectedTrack === 'all' || p.tracks.includes(selectedTrack);
    const levelOk = selectedLevel === 'any' || p.levels.includes(selectedLevel);
    return trackOk && levelOk;
  };

  return (
    <section id="projekty" className="px-4 sm:px-6 py-20 border-t border-edge">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="section-coord">SYS.02 // KATALOG 1–16</span>
            <p className="section-title">// projekty laboratoryjne & własne inicjatywy</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Katalog 16 Projektów Laboratoryjnych
          </h2>
          <p className="mt-3 text-ink-soft max-w-3xl leading-relaxed text-sm sm:text-base">
            Projekty realizowane są indywidualnie, w parach lub w małym zespole. Nie musisz znać
            wszystkiego na starcie — wybierz temat, który Cię ciekawi, lub skorzystaj z szybkiego
            filtratora poniżej.
          </p>
        </motion.div>

        {/* Interaktywny Konfigurator / Dobór Ścieżki dla Studenta */}
        <div className="blueprint-card p-5 sm:p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-neon">
              <Sparkles size={15} /> INTERAKTYWNY DOBÓR ŚCIEŻKI — CO WARTO WYBRAĆ NA START?
            </span>
            {isMatcherActive && (
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('all');
                  setSelectedLevel('any');
                }}
                className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-ink cursor-pointer"
              >
                <RotateCcw size={12} /> Resetuj dobór
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Krok 1: Poziom */}
            <div>
              <p className="font-mono text-[11px] text-ink-muted mb-2">
                1. Twój aktualny punkt startowy:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {LEVEL_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedLevel(opt.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                      selectedLevel === opt.key
                        ? 'bg-neon text-white dark:text-slate-950 border-neon font-semibold'
                        : 'bg-surface text-ink-soft border-edge hover:text-ink'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Krok 2: Obszar */}
            <div>
              <p className="font-mono text-[11px] text-ink-muted mb-2">
                2. Co najbardziej chcesz przećwiczyć:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TRACK_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedTrack(opt.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                      selectedTrack === opt.key
                        ? 'bg-cyanic text-white dark:text-slate-950 border-cyanic font-semibold'
                        : 'bg-surface text-ink-soft border-edge hover:text-ink'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pasek o własnym pomyśle projektowym */}
          <div className="mt-4 pt-3.5 border-t border-edge flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="inline-flex items-center gap-2 text-ink-soft">
              <Lightbulb size={15} className="text-amber shrink-0" />
              <span>
                <strong className="text-ink">Masz własny pomysł na projekt?</strong> (np. domowy homelab,
                automatyzacja zadania w pracy, własny serwer) — nie musisz ograniczać się do listy!
              </span>
            </span>
            <a
              href="#rekrutacja"
              className="font-mono text-xs text-neon font-semibold hover:underline"
            >
              Zgłoś własny pomysł w formularzu →
            </a>
          </div>
        </div>

        {/* Zakładki kategorii (1-10 vs 11-16) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                filter === key
                  ? 'bg-panel text-ink border-neon shadow-sm font-semibold'
                  : 'bg-surface/60 text-ink-soft border-edge hover:text-ink'
              }`}
            >
              <Icon size={14} className={filter === key ? 'text-neon' : ''} />
              {label}
            </button>
          ))}
        </div>

        {/* Siatka projektów */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p, idx) => (
            <ProjectCard key={p.id} p={p} index={idx} recommended={checkRecommended(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}
