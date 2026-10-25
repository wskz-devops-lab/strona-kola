import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileWarning,
  ArrowUpRight,
} from 'lucide-react';
import { REDTEAM_PILLARS, AUDIT_VERDICT, HARDENING_ACTIONS } from '../data/projectsData';

export default function RedTeamShowcase() {
  const [open, setOpen] = useState(0);
  const pillar = REDTEAM_PILLARS[open];

  return (
    <section id="redteam" className="px-4 sm:px-6 py-20 border-t border-edge">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="section-coord">SYS.05 // AUDYT BEZPIECZEŃSTWA</span>
            <p className="section-title">// pakiet audytu red teaming</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            5 filarów bezpieczeństwa infrastruktury
          </h2>
          <p className="mt-4 text-ink-soft max-w-3xl leading-relaxed">
            Zautomatyzowany zestaw testów (
            <span className="font-mono text-violet font-semibold">security_redteam_audit.py</span>)
            weryfikuje odporność środowiska Proxmox VE i OpenNebula przed wpuszczeniem studentów: od
            ucieczki z kontenera po higienę danych RODO.
          </p>
        </motion.div>

        {/* Werdykt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="blueprint-card p-5 mb-10 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="font-mono text-xs text-ink-muted">
              AUDIT ID: <span className="text-ink font-semibold">{AUDIT_VERDICT.auditId}</span> ·{' '}
              {AUDIT_VERDICT.version}
            </span>
            <span className="flex items-center gap-2 font-mono text-sm font-semibold text-neon">
              <CheckCircle2 size={16} /> {AUDIT_VERDICT.passed} PASSED
            </span>
            <span className="flex items-center gap-2 font-mono text-sm font-semibold text-amber">
              <AlertTriangle size={16} /> {AUDIT_VERDICT.warnings} WARNINGS
            </span>
            <span className="flex items-center gap-2 font-mono text-sm text-ink-muted">
              <ShieldCheck size={16} /> {AUDIT_VERDICT.critical} CRITICAL
            </span>
          </div>
          <a
            href="https://github.com/wskz-devops-lab/pakiet-red-teaming"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-violet hover:underline"
          >
            Kod audytu na GitHubie <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-[330px_1fr] gap-6">
          {/* Lista filarów */}
          <div className="space-y-2.5">
            {REDTEAM_PILLARS.map((p, i) => {
              const warns = p.tests.filter((t) => t.status === 'WARN').length;
              const active = i === open;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setOpen(i)}
                  className={`w-full text-left glass-panel p-4 transition-all duration-200 cursor-pointer ${
                    active ? 'border-violet shadow-violet-md' : 'hover:border-ink-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        active ? 'text-violet' : 'text-ink-muted'
                      }`}
                    >
                      FILAR 0{p.id}
                    </span>
                    {warns > 0 ? (
                      <span className="flex items-center gap-1 font-mono text-[10px] font-semibold text-amber">
                        <ShieldAlert size={11} /> {warns} WARN
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-mono text-[10px] font-semibold text-neon">
                        <ShieldCheck size={11} /> ALL PASS
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-1.5 text-sm font-bold ${
                      active ? 'text-ink' : 'text-ink-soft'
                    }`}
                  >
                    {p.name}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Szczegóły filaru */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.25 }}
              className="glass-panel p-6"
            >
              <p className="font-mono text-xs font-semibold text-violet mb-1">
                FILAR 0{pillar.id} — {pillar.short}
              </p>
              <h3 className="text-xl font-bold text-ink">{pillar.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">
                <span className="text-ink-muted font-mono">Ochrona przed:</span> {pillar.protects}
              </p>

              <div className="mt-5 space-y-2.5">
                {pillar.tests.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-lg border p-3.5 font-mono text-xs ${
                      t.status === 'PASS'
                        ? 'border-neon/30 bg-neon/5'
                        : 'border-amber/35 bg-amber/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      {t.status === 'PASS' ? (
                        <CheckCircle2 size={14} className="text-neon shrink-0" />
                      ) : (
                        <AlertTriangle size={14} className="text-amber shrink-0" />
                      )}
                      <span className="text-ink-muted">{t.id}</span>
                      <span className="text-ink font-semibold">{t.title}</span>
                      <span
                        className={`ml-auto font-bold ${
                          t.status === 'PASS' ? 'text-neon' : 'text-amber'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-ink-soft leading-relaxed pl-6">{t.findings}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rekomendacje hardeningu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 glass-panel p-6 border-l-2 border-l-amber"
        >
          <p className="flex items-center gap-2 font-mono text-sm font-semibold text-amber mb-4">
            <FileWarning size={16} />
            Hardening Action Items — przed pilotem studenckim
          </p>
          <ol className="space-y-2.5">
            {HARDENING_ACTIONS.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink-soft leading-relaxed">
                <span className="font-mono text-amber font-bold shrink-0">{i + 1}.</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
