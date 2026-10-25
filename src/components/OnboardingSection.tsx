import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  CheckSquare,
  Square,
  Users,
  Terminal,
  MessageSquare,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import {
  STARTER_CHECKLIST,
  GROUP_SURVEY_SUMMARY,
  MKDOCS_BASE_URL,
  CONTACT,
} from '../data/projectsData';

const STORAGE_KEY = 'wskz-starter-checklist-v1';

export default function OnboardingSection() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [distroTab, setDistroTab] = useState<'deb' | 'rpm'>('deb');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const completedCount = STARTER_CHECKLIST.filter((i) => checked[i.id]).length;

  return (
    <section id="start" className="px-4 sm:px-6 py-20 border-t border-edge">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="section-coord">SYS.01 // ONBOARDING</span>
            <p className="section-title">// jak działamy i od czego zacząć</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Dla kogo jest koło i jak wygląda praca?
          </h2>
          <p className="mt-3 text-ink-soft max-w-3xl leading-relaxed">
            Nie rzucamy nikogo na głęboką wodę bez instrukcji. Każdy uczestnik (lub para/zespół)
            wybiera jeden kierunek projektowy i rozwija go we własnym tempie — od prostych maszyn
            wirtualnych i kontenerów po klastry serwerowe, lokalne AI i bezpieczeństwo.
          </p>
        </motion.div>

        {/* Górny rząd: Rytm spotkań + Zwięzły profil z ankiet */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8">
          {/* Karta 1: Rytm pracy i spotkania (7 kolumn) */}
          <div className="lg:col-span-7 blueprint-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-neon">
                  <Calendar size={16} /> ORGANIZACJA SPOTKAŃ I KONSULTACJI
                </span>
                <span className="mono-badge">100% ZDALNIE</span>
              </div>

              <h3 className="text-xl font-bold text-ink mb-3">
                Poniedziałki po 19:00 — elastyczny harmonogram co miesiąc
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed mb-5">
                Spotkania główne odbywają się orientacyjnie w <strong className="text-ink">poniedziałki po godz. 19:00</strong>{' '}
                (zazwyczaj 2 spotkania w miesiącu, ok. 90 minut). Dokładne daty na każdy kolejny
                miesiąc ustalamy indywidualnie pod dyspozycyjność grupy i na bieżąco aktualizujemy.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                <div className="p-3.5 rounded-lg border border-edge bg-surface/60">
                  <p className="font-mono text-[11px] text-neon font-semibold">1. WARSZTAT & DEMO</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    Krótkie wprowadzenie teoretyczne i praktyczny pokaz konfiguracji na żywo.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-edge bg-surface/60">
                  <p className="font-mono text-[11px] text-cyanic font-semibold">2. KONSULTACJE</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    W tygodniach bez spotkań (obecnie środy) — wsparcie 1-na-1 lub zespołowe przy projektach.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-edge bg-surface/60">
                  <p className="font-mono text-[11px] text-violet font-semibold">3. NARZĘDZIA</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    Bieżące pytania w wątkach na <strong className="text-ink">Zulipie</strong>, kod na GitHubie i Codebergu.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-edge flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <a
                href={CONTACT.consultationsCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-cyanic hover:underline"
              >
                Kalendarz zapisów na konsultacje <ArrowUpRight size={14} />
              </a>
              <a
                href={CONTACT.zulipInviteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-neon hover:underline"
              >
                <MessageSquare size={14} /> Dołącz do komunikatora Zulip <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Karta 2: Zwięzły obraz grupy z ankiet (5 kolumn) */}
          <div className="lg:col-span-5 blueprint-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-cyanic">
                  <Users size={16} /> PROFIL GRUPY Z ANKIET
                </span>
                <span className="mono-badge">~80% START OD PODSTAW</span>
              </div>

              <p className="text-sm text-ink-soft leading-relaxed mb-5">
                {GROUP_SURVEY_SUMMARY.lead}
              </p>

              <p className="font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-3">
                Najczęściej wybierane priorytety w ankietach:
              </p>
              <div className="space-y-3">
                {GROUP_SURVEY_SUMMARY.topInterests.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-ink font-medium">{item.name}</span>
                      <span className="font-mono text-ink-muted">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-neon to-cyanic"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 pt-3 border-t border-edge text-xs text-ink-muted font-mono">
              Tryb pracy: indywidualnie, w parach lub w małym zespole (nauka Gita).
            </p>
          </div>
        </div>

        {/* Dolny rząd: Paczka na start (Checklista) + Dwie rodziny Linuksa */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Interaktywna checklista na pierwsze zajęcia (7 kolumn) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-neon">
                <Terminal size={16} /> PACZKA NA START — ZESTAW MINIMALNY
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-neon/10 text-neon border border-neon/30">
                Gotowość: {completedCount}/{STARTER_CHECKLIST.length}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-ink-soft mb-4">
              Nie trzeba instalować wszystkiego naraz. Na pierwsze spotkanie wystarczy poniższy zestaw
              (możesz odhaczać pozycje — stan zapisuje się w Twojej przeglądarce):
            </p>

            <div className="space-y-2.5">
              {STARTER_CHECKLIST.map((item) => {
                const isDone = !!checked[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isDone
                        ? 'border-neon/50 bg-neon/5'
                        : 'border-edge bg-surface/40 hover:border-ink-muted/40'
                    }`}
                  >
                    <span className="mt-0.5 text-neon shrink-0">
                      {isDone ? <CheckSquare size={17} /> : <Square size={17} className="text-ink-muted" />}
                    </span>
                    <span>
                      <span
                        className={`block text-sm font-semibold ${
                          isDone ? 'line-through text-ink-muted' : 'text-ink'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="block mt-1 text-xs text-ink-soft leading-relaxed">
                        {item.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-edge flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <a
                href={`${MKDOCS_BASE_URL}/start/zestaw-minimalny/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-neon hover:underline"
              >
                Instrukcja instalacji krok po kroku (Windows WSL2 / macOS / Linux) <ArrowUpRight size={14} />
              </a>
              <a
                href={`${MKDOCS_BASE_URL}/start/wymagania/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink"
              >
                Pełne wymagania per projekt 1–16 <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Którą dystrybucję Linuksa wybrać? (5 kolumn) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-violet">
                  <Layers size={16} /> DWIE RODZINY LINUKSA W KOLE
                </span>
                <span className="mono-badge">.DEB vs .RPM</span>
              </div>

              <h3 className="text-lg font-bold text-ink mb-2">
                Nie zamykamy się na jedną dystrybucję
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-4">
                W realnej pracy DevOps spotkasz zarówno systemy z rodziny Debian/Ubuntu, jak i korporacyjne
                środowiska Red Hat (RHEL). W materiałach koła pokazujemy komendy dla obu światów:
              </p>

              {/* Przełącznik rodzin */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-surface border border-edge mb-4 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setDistroTab('deb')}
                  className={`py-2 px-3 rounded-md transition-colors cursor-pointer font-semibold ${
                    distroTab === 'deb'
                      ? 'bg-panel text-neon shadow-sm border border-edge'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  Debian / Ubuntu (.deb)
                </button>
                <button
                  type="button"
                  onClick={() => setDistroTab('rpm')}
                  className={`py-2 px-3 rounded-md transition-colors cursor-pointer font-semibold ${
                    distroTab === 'rpm'
                      ? 'bg-panel text-cyanic shadow-sm border border-edge'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  RHEL / Alma / Fedora (.rpm)
                </button>
              </div>

              {distroTab === 'deb' ? (
                <div className="p-4 rounded-xl border border-edge bg-surface/50 space-y-2 text-xs">
                  <p className="font-mono text-neon font-semibold">
                    Rodzina Debian & Ubuntu Server LTS (Menedżer: apt)
                  </p>
                  <p className="text-ink-soft leading-relaxed">
                    Największa społeczność, najłagodniejsze wejście dla osób początkujących oraz baza pod nasz{' '}
                    <strong className="text-ink">Track A (Proxmox VE)</strong>.
                  </p>
                  <pre className="p-2.5 rounded bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                    $ sudo apt update && sudo apt install -y docker.io git
                  </pre>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-edge bg-surface/50 space-y-2 text-xs">
                  <p className="font-mono text-cyanic font-semibold">
                    Rodzina Red Hat: AlmaLinux 9, Rocky, Fedora (Menedżer: dnf)
                  </p>
                  <p className="text-ink-soft leading-relaxed">
                    Standard w korporacjach i serwerowniach. Domyślnie aktywny <strong className="text-ink">SELinux</strong>{' '}
                    oraz <span className="font-mono">firewalld</span>. Fundament naszego{' '}
                    <strong className="text-ink">Track B (OpenNebula + Fedora Golden Image)</strong>.
                  </p>
                  <pre className="p-2.5 rounded bg-slate-950 text-cyan-300 font-mono text-[11px] overflow-x-auto">
                    $ sudo dnf install -y podman git && sestatus
                  </pre>
                </div>
              )}
            </div>

            <p className="mt-4 pt-3 border-t border-edge text-xs text-ink-muted leading-relaxed">
              <strong className="text-ink">Wskazówka na start:</strong> wybierz jedną dystrybucję do pierwszego projektu,
              a przy kolejnym postaw maszynę z drugiej rodziny, by zobaczyć różnice w praktyce.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
