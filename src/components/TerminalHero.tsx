import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, ChevronRight, Compass, Sparkles, UserPlus } from 'lucide-react';
import { PROJECTS, AUDIT_VERDICT, VDI_METRICS, CONTACT } from '../data/projectsData';

interface Line {
  kind: 'in' | 'out' | 'err' | 'ok' | 'sys';
  text: string;
}

const PROMPT = 'student@wskz-lab:~$';

const BOOT_SEQUENCE: Line[] = [
  { kind: 'sys', text: 'WSKZ DEVOPS-LAB SHELL v2.8 — połączono z klastrem Proxmox VE & OpenNebula' },
  { kind: 'ok', text: '[ OK ] Środowiska dla początkujących i zaawansowanych (Debian/Ubuntu & AlmaLinux/Fedora)' },
  { kind: 'ok', text: '[ OK ] Spotkania online: poniedziałki po 19:00 (harmonogram ustalany co miesiąc)' },
  { kind: 'ok', text: '[ OK ] Linked Clones VDI: stanowisko w przeglądarce (noVNC / VS Code) w 1.8 s' },
  { kind: 'sys', text: "Kliknij skrót poniżej lub wpisz 'help', aby przetestować terminal." },
];

const QUICK_COMMANDS = ['help', 'start', 'schedule', 'projects', 'vdi', 'join'];

function runCommand(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case 'help':
      return [
        { kind: 'out', text: 'Dostępne komendy w terminalu koła:' },
        { kind: 'out', text: '  start      — od czego zacząć i zestaw minimalny na 1. zajęcia' },
        { kind: 'out', text: '  schedule   — kiedy się spotykamy i jak działają konsultacje' },
        { kind: 'out', text: '  projects   — lista 16 projektów koła (+ własne pomysły)' },
        { kind: 'out', text: '  vdi        — architektura VDI: Proxmox VE (Track A) i OpenNebula (Track B)' },
        { kind: 'out', text: '  redteam    — 5 filarów audytu bezpieczeństwa' },
        { kind: 'out', text: '  join       — jak zapisać się do koła i kontakt do opiekuna' },
        { kind: 'out', text: '  clear      — wyczyść terminal' },
      ];
    case 'start':
      return [
        { kind: 'ok', text: '→ Nie musisz mieć doświadczenia z serwerami (~80% grupy zaczyna od podstaw!).' },
        { kind: 'out', text: '  1. Komputer z min. 8 GB RAM (lub nasze zdalne VDI w przeglądarce)' },
        { kind: 'out', text: '  2. VirtualBox / KVM + obraz ISO (Debian/Ubuntu lub AlmaLinux/Fedora)' },
        { kind: 'out', text: '  3. Docker lub Podman, VS Code / VSCodium oraz Git + klucze SSH' },
        { kind: 'sys', text: 'Pełna checklista w sekcji [01. JAK ZACZĄĆ] poniżej ↓' },
      ];
    case 'schedule':
      return [
        { kind: 'ok', text: '● Spotkania główne: zdalnie, orientacyjnie w poniedziałki po godz. 19:00' },
        { kind: 'out', text: '  Częstotliwość: ok. 2 spotkania w miesiącu (ustalane indywidualnie na każdy miesiąc)' },
        { kind: 'out', text: '  Konsultacje projektowe: środy (zapisy w kalendarzu online)' },
        { kind: 'out', text: '  Komunikacja bieżąca: Zulip (wątki tematyczne) + repozytoria GitHub / Codeberg' },
      ];
    case 'projects': {
      const lines: Line[] = [
        { kind: 'out', text: `Katalog projektów (${PROJECTS.length}) — praca indywidualna, w parach lub w zespole:` },
      ];
      PROJECTS.forEach((p) => {
        lines.push({
          kind: 'out',
          text: `  [${String(p.id).padStart(2, '0')}] ${p.title}  <${p.difficulty}>`,
        });
      });
      lines.push({ kind: 'ok', text: '  [+] Możesz też zgłosić własny pomysł na projekt (np. homelab / automatyzacja w pracy)!' });
      return lines;
    }
    case 'vdi':
      return [
        { kind: 'out', text: 'Dwie ścieżki architektury chmurowej i VDI:' },
        { kind: 'ok', text: '  Track A: Proxmox VE (Debian, KVM, LXC nesting, ZFS/Ceph, GPU Passthrough)' },
        { kind: 'ok', text: '  Track B: OpenNebula (AlmaLinux 9 / RHEL, QCOW2 CoW, sieci VXLAN, Sunstone)' },
        ...VDI_METRICS.map((m) => ({
          kind: 'out' as const,
          text: `  • ${m.label}: ${m.value} (${m.detail})`,
        })),
      ];
    case 'redteam':
      return [
        { kind: 'out', text: `Audyt ${AUDIT_VERDICT.auditId} — werdykt: ${AUDIT_VERDICT.passed} PASS / ${AUDIT_VERDICT.warnings} WARN / ${AUDIT_VERDICT.critical} CRITICAL` },
        { kind: 'out', text: '  F1 Container Escape & User Namespace  | F2 Resource Starvation & DoS' },
        { kind: 'out', text: '  F3 Network Segmentation & Lateral Mvmt| F4 Portal API & Gateway Hardening' },
        { kind: 'out', text: '  F5 Zero Residual Data & Higiena RODO' },
      ];
    case 'join':
    case 'whoami':
      return [
        { kind: 'ok', text: `Opiekun koła: ${CONTACT.supervisor}` },
        { kind: 'out', text: `  E-mail 1: ${CONTACT.emails[0]}` },
        { kind: 'out', text: `  E-mail 2: ${CONTACT.emails[1]}` },
        { kind: 'sys', text: 'Przejdź do sekcji [DOŁĄCZ DO KOŁA] na dole strony, aby wypełnić formularz WSKZ ↓' },
      ];
    case 'clear':
      return [];
    case '':
      return [];
    default:
      return [
        { kind: 'err', text: `bash: ${cmd}: nie znaleziono polecenia` },
        { kind: 'sys', text: "Wpisz 'help' lub kliknij jeden z przycisków pod terminalem." },
      ];
  }
}

export default function TerminalHero() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let li = 0;
    let ci = 0;
    let cancelled = false;
    const timer = setInterval(() => {
      if (cancelled) return;
      const current = BOOT_SEQUENCE[li];
      if (!current) {
        clearInterval(timer);
        setBooted(true);
        return;
      }
      ci += 4;
      const partial = current.text.slice(0, ci);
      setLines((prev) => {
        const next = [...prev];
        next[li] = { kind: current.kind, text: partial };
        return next;
      });
      if (ci >= current.text.length) {
        li += 1;
        ci = 0;
      }
    }, 16);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const executeCommand = useCallback((rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (trimmed) setHistory((h) => [...h, trimmed]);
    if (trimmed.toLowerCase() === 'clear') {
      setLines([]);
      return;
    }
    const output = runCommand(trimmed);
    setLines((prev) => [...prev, { kind: 'in', text: `${PROMPT} ${trimmed}` }, ...output]);
  }, []);

  const submit = useCallback(() => {
    const raw = input;
    setInput('');
    setHistIdx(-1);
    executeCommand(raw);
  }, [input, executeCommand]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  const colorFor = (kind: Line['kind']) =>
    kind === 'in'
      ? 'text-slate-100 font-semibold'
      : kind === 'err'
        ? 'text-red-400'
        : kind === 'ok'
          ? 'text-emerald-400'
          : kind === 'sys'
            ? 'text-cyan-300/90'
            : 'text-slate-300';

  return (
    <section id="top" className="relative pt-24 sm:pt-28 pb-14 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="relative max-w-7xl mx-auto">
        {/* Górny pasek statusu inżynierskiego (Blueprint Spec Bar) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-edge bg-panel/90 backdrop-blur-sm font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <span className="section-coord">SYS.00 // WSKZ</span>
            <span className="text-ink font-medium">
              Koło Naukowe Nowoczesnej Infrastruktury IT, Wirtualizacji i Bezpieczeństwa
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-ink-soft">
            <span className="flex items-center gap-1.5">
              <CalendarClock size={14} className="text-neon" />
              <span>
                Spotkania: <strong className="text-ink">Poniedziałki po 19:00</strong> (ustalane co miesiąc)
              </span>
            </span>
            <span className="hidden sm:inline text-edge">|</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
              <span>Rekrutacja otwarta (I–III rok, wszystkie kierunki)</span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 items-center">
          {/* Lewa kolumna — pitch studencki i inżynierski */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="section-title mb-3">// praktyczny warsztat zamiast suchej teorii</p>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-ink leading-[1.06]">
              DevOps &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-cyanic to-violet">
                Virtualization Lab
              </span>
            </h1>

            <p className="mt-5 text-ink-soft text-base sm:text-lg leading-relaxed max-w-2xl">
              Niezależnie czy stawiasz pierwsze kroki w Linuksie i chcesz uruchomić własny kontener Docker,
              czy planujesz budować klastry <strong className="text-ink font-semibold">Proxmox VE</strong> i{' '}
              <strong className="text-ink font-semibold">OpenNebula</strong>, lokalne serwery AI (Ollama / RAG)
              oraz audyty <strong className="text-ink font-semibold">Red Teaming</strong> — pracujesz we własnym
              tempie nad realnym projektem do portfolio.
            </p>

            {/* Trzy filary wejścia dla studenta */}
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-edge bg-panel/80">
                <p className="font-mono text-[11px] text-neon font-semibold">01 // PRÓG WEJŚCIA</p>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                  Przyjazny start od podstaw Linuksa i VirtualBoxa — ok. 80% grupy zaczyna od zera.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-edge bg-panel/80">
                <p className="font-mono text-[11px] text-cyanic font-semibold">02 // SWOBODA PROJEKTU</p>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                  16 gotowych ścieżek w katalogu lub <strong className="text-ink">Twój własny pomysł</strong> (np. homelab, praca).
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-edge bg-panel/80">
                <p className="font-mono text-[11px] text-violet font-semibold">03 // DWA ŚWIATY LINUX</p>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                  Poznajesz w praktyce zarówno rodzinę <span className="font-mono">Debian/Ubuntu</span>, jak i <span className="font-mono">RHEL/AlmaLinux</span>.
                </p>
              </div>
            </div>

            {/* Przyciski CTA */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#rekrutacja"
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-neon text-white dark:text-slate-950 font-semibold text-sm hover:shadow-neon-md transition-all"
              >
                <UserPlus size={16} />
                Zapisz się do koła (Formularz)
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#start"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-edge bg-panel font-mono text-xs sm:text-sm text-ink hover:border-neon/60 transition-all"
              >
                <Compass size={15} className="text-neon" />
                Od czego zacząć?
              </a>
              <a
                href="#projekty"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-edge bg-panel font-mono text-xs sm:text-sm text-cyanic hover:border-cyanic/60 transition-all"
              >
                <Sparkles size={15} />
                Dobierz projekt (1–16)
              </a>
            </div>
          </motion.div>

          {/* Prawa kolumna — interaktywny terminal (zawsze ciemna powierzchnia terminal-dark-surface) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
            className="terminal-dark-surface relative rounded-xl border terminal-scanlines overflow-hidden shadow-2xl"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Pasek tytułu terminala */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/90">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  ssh student@wskz-lab — interaktywna konsola
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                TTY READY
              </span>
            </div>

            {/* Ciało terminala */}
            <div
              ref={bodyRef}
              className="h-[330px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed"
            >
              {lines.map((l, i) => (
                <div key={i} className={`${colorFor(l.kind)} whitespace-pre-wrap break-words`}>
                  {l.text}
                </div>
              ))}
              {booted && (
                <div className="flex items-center text-slate-100 mt-1.5">
                  <span className="text-emerald-400 terminal-glow mr-2 shrink-0">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="wpisz komendę (np. help, start, schedule)..."
                    className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-600"
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="terminal input"
                  />
                </div>
              )}
            </div>

            {/* Pasek szybkich komend do kliknięcia */}
            <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[11px] text-slate-400 mr-1">Szybkie komendy:</span>
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    executeCommand(cmd);
                  }}
                  className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 hover:bg-emerald-500/20 text-emerald-300 border border-slate-700 hover:border-emerald-500/40 transition-colors cursor-pointer"
                >
                  $ {cmd}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
