import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PROJECTS, AUDIT_VERDICT, VDI_METRICS } from '../data/projectsData';

interface Line {
  kind: 'in' | 'out' | 'err' | 'ok' | 'sys';
  text: string;
}

const PROMPT = 'student@wskz-lab:~$';

const BOOT_SEQUENCE: Line[] = [
  { kind: 'sys', text: 'WSKZ DEVOPS-LAB SHELL v2.6 — połączono z klastrem Proxmox VE 8.x' },
  { kind: 'sys', text: 'Golden Image: fedora-ai-template (VM 200) | pula: LVM-Thin CoW' },
  { kind: 'ok', text: '[ OK ] Linked Clones gotowe — alokacja stanowiska w 1.8 s, 0 MB na start' },
  { kind: 'ok', text: '[ OK ] noVNC HTML5 nasłuchuje na :6080 — bezklientowy dostęp z przeglądarki' },
  { kind: 'ok', text: `[ OK ] Pakiet Red Teaming ${AUDIT_VERDICT.version}: ${AUDIT_VERDICT.passed} PASS / ${AUDIT_VERDICT.warnings} WARN / ${AUDIT_VERDICT.critical} CRITICAL` },
  { kind: 'sys', text: "Wpisz 'help', aby zobaczyć dostępne komendy." },
];

function runCommand(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case 'help':
      return [
        { kind: 'out', text: 'Dostępne komendy:' },
        { kind: 'out', text: '  projects   — lista 16 projektów koła (2 ścieżki)' },
        { kind: 'out', text: '  vdi        — architektura VDI: Golden Image + Linked Clones' },
        { kind: 'out', text: '  redteam    — 5 filarów audytu bezpieczeństwa' },
        { kind: 'out', text: '  status     — telemetria klastra Proxmox' },
        { kind: 'out', text: '  whoami     — kim jesteś w tym laboratorium' },
        { kind: 'out', text: '  clear      — wyczyść terminal' },
      ];
    case 'projects': {
      const lines: Line[] = [
        { kind: 'out', text: `Katalog projektów (${PROJECTS.length}) — DevOps & Virtualization Lab:` },
      ];
      PROJECTS.forEach((p) => {
        lines.push({
          kind: 'out',
          text: `  [${String(p.id).padStart(2, '0')}] ${p.title}  <${p.difficulty}>`,
        });
      });
      lines.push({ kind: 'sys', text: 'Szczegóły w sekcji PROJEKTY poniżej ↓' });
      return lines;
    }
    case 'vdi':
      return [
        { kind: 'out', text: 'Architektura VDI (Proxmox VE + Golden Image + Linked Clones):' },
        ...VDI_METRICS.map((m) => ({
          kind: 'out' as const,
          text: `  ${m.label}: ${m.value} — ${m.detail}`,
        })),
        { kind: 'ok', text: '  qm clone 200 301 --full 0  →  stanowisko gotowe w 1.8 s' },
      ];
    case 'redteam':
      return [
        { kind: 'out', text: `Audyt ${AUDIT_VERDICT.auditId} — werdykt: ${AUDIT_VERDICT.passed} PASS / ${AUDIT_VERDICT.warnings} WARN / ${AUDIT_VERDICT.critical} CRITICAL` },
        { kind: 'out', text: '  F1 Container Escape & User Namespace  [4 testy]' },
        { kind: 'out', text: '  F2 Resource Starvation & DoS Immunity [3 testy]' },
        { kind: 'out', text: '  F3 Network Segmentation & Lateral Mvmt[4 testy]' },
        { kind: 'out', text: '  F4 Portal API & Gateway Hardening     [3 testy]' },
        { kind: 'out', text: '  F5 Zero Residual Data & RODO          [3 testy]' },
        { kind: 'sys', text: 'Pełny raport w sekcji RED TEAM poniżej ↓' },
      ];
    case 'status':
      return [
        { kind: 'ok', text: '● pve-node-01  ONLINE   KVM/QEMU  LVM-Thin 42% ' },
        { kind: 'ok', text: '● pve-node-02  ONLINE   KVM/QEMU  LVM-Thin 38%' },
        { kind: 'ok', text: '● pve-node-03  ONLINE   KVM/QEMU  ZFS CoW  51%' },
        { kind: 'out', text: '  Corosync ring: OK (5405/UDP) | noVNC gateway: :6080 | portal: :3001' },
      ];
    case 'whoami':
      return [
        { kind: 'out', text: 'student — Koło Naukowe DevOps & Virtualization Lab, WSKZ' },
        { kind: 'out', text: 'grupy: docker, kvm, wireguard, ollama, redteam-auditors' },
        { kind: 'sys', text: 'Spotkania: co 2 tygodnie, 90 min, zdalnie (19:00–22:00).' },
      ];
    case 'clear':
      return [];
    case '':
      return [];
    default:
      return [
        { kind: 'err', text: `bash: ${cmd}: nie znaleziono polecenia` },
        { kind: 'sys', text: "Wpisz 'help', aby zobaczyć listę komend." },
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

  // Sekwencja powitalna typewriter
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
      ci += 3;
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
    }, 18);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const submit = useCallback(() => {
    const raw = input;
    setInput('');
    setHistIdx(-1);
    if (raw.trim()) setHistory((h) => [...h, raw]);
    if (raw.trim().toLowerCase() === 'clear') {
      setLines([]);
      return;
    }
    const output = runCommand(raw);
    setLines((prev) => [...prev, { kind: 'in', text: `${PROMPT} ${raw}` }, ...output]);
  }, [input]);

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
      ? 'text-slate-100'
      : kind === 'err'
        ? 'text-danger'
        : kind === 'ok'
          ? 'text-neon'
          : kind === 'sys'
            ? 'text-cyanic/80'
            : 'text-slate-400';

  return (
    <section id="top" className="relative pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Lewa kolumna — pitch */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="section-title mb-4">Koło Naukowe · WSKZ</p>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-50 leading-[1.05]">
            DevOps &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-cyanic to-violet">
              Virtualization Lab
            </span>
          </h1>
          <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl">
            Budujemy własną infrastrukturę: klastry Proxmox, bezklientowe laboratoria VDI
            klonowane w <span className="text-neon font-mono">1.8&nbsp;s</span>, prywatne chmury,
            serwery AI i audyty Red Teaming. Zero komercyjnych licencji — czyste open source
            i inżynierska dyscyplina.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projekty"
              className="group flex items-center gap-2 px-5 py-3 rounded-lg bg-neon text-void font-semibold text-sm hover:shadow-neon-md transition-shadow"
            >
              16 projektów badawczych
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#vdi"
              className="px-5 py-3 rounded-lg border border-edge bg-panel/60 font-mono text-sm text-cyanic hover:border-cyanic/50 hover:shadow-cyan-md transition-all"
            >
              $ ./deploy_qm_fast.sh
            </a>
          </div>
        </motion.div>

        {/* Prawa kolumna — interaktywny terminal */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="relative glass-panel terminal-scanlines overflow-hidden shadow-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Pasek tytułu */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-edge bg-void/70">
            <span className="h-3 w-3 rounded-full bg-danger/80" />
            <span className="h-3 w-3 rounded-full bg-amber/80" />
            <span className="h-3 w-3 rounded-full bg-neon/80" />
            <span className="ml-3 font-mono text-xs text-slate-500">
              ssh student@pve-node-02 — tmux: lab-session
            </span>
          </div>

          {/* Ciało terminala */}
          <div
            ref={bodyRef}
            className="h-[380px] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
          >
            {lines.map((l, i) => (
              <div key={i} className={`${colorFor(l.kind)} whitespace-pre-wrap break-words`}>
                {l.text}
              </div>
            ))}
            {booted && (
              <div className="flex items-center text-slate-100 mt-1">
                <span className="text-neon terminal-glow mr-2 shrink-0">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 bg-transparent outline-none caret-transparent text-slate-100"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="terminal input"
                />
                <span className="absolute animate-blink text-neon pointer-events-none" style={{ position: 'static', marginLeft: input.length === 0 ? 0 : undefined }}>
                  ▊
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
