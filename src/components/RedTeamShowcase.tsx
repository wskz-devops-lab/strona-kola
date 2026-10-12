import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, FileWarning } from 'lucide-react';
import { REDTEAM_PILLARS, AUDIT_VERDICT, HARDENING_ACTIONS } from '../data/projectsData';

export default function RedTeamShowcase() {
  const [open, setOpen] = useState(0);
  const pillar = REDTEAM_PILLARS[open];

  return (
    <section id="redteam" className="px-4 sm:px-6 py-20 border-t border-edge/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-title mb-3">// pakiet audytu red teaming</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">
            5 filarów bezpieczeństwa infrastruktury
          </h2>
          <p className="mt-4 text-slate-400 max-w-3xl leading-relaxed">
            Zautomatyzowany zestaw testów (<span className="font-mono text-violet">security_redteam_audit.py</span>)
            weryfikuje odporność środowiska Proxmox VE przed wpuszczeniem studentów: od ucieczki
            z kontenera po higienę danych RODO.
          </p>
        </motion.div>

        {/* Werdykt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-5 mb-10 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <span className="font-mono text-xs text-slate-500">
            AUDIT ID: <span className="text-slate-300">{AUDIT_VERDICT.auditId}</span> · {AUDIT_VERDICT.version}
          </span>
          <span className="flex items-center gap-2 font-mono text-sm text-neon">
            <CheckCircle2 size={16} /> {AUDIT_VERDICT.passed} PASSED
          </span>
          <span className="flex items-center gap-2 font-mono text-sm text-amber">
            <AlertTriangle size={16} /> {AUDIT_VERDICT.warnings} WARNINGS
          </span>
          <span className="flex items-center gap-2 font-mono text-sm text-slate-500">
            <ShieldCheck size={16} /> {AUDIT_VERDICT.critical} CRITICAL
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Lista filarów */}
          <div className="space-y-2">
            {REDTEAM_PILLARS.map((p, i) => {
              const warns = p.tests.filter((t) => t.status === 'WARN').length;
              const active = i === open;
              return (
                <button
                  key={p.id}
                  onClick={() => setOpen(i)}
                  className={`w-full text-left glass-panel p-4 transition-all duration-300 ${
                    active ? 'border-violet/50 shadow-violet-md' : 'hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-mono text-xs ${active ? 'text-violet' : 'text-slate-500'}`}>
                      FILAR {p.id}
                    </span>
                    {warns > 0 ? (
                      <span className="flex items-center gap-1 font-mono text-[10px] text-amber">
                        <ShieldAlert size={11} /> {warns} WARN
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-mono text-[10px] text-neon">
                        <ShieldCheck size={11} /> ALL PASS
                      </span>
                    )}
                  </div>
                  <p className={`mt-1.5 text-sm font-semibold ${active ? 'text-slate-100' : 'text-slate-400'}`}>
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
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6"
            >
              <p className="font-mono text-xs text-violet mb-1">FILAR {pillar.id} — {pillar.short}</p>
              <h3 className="text-xl font-bold text-slate-100">{pillar.name}</h3>
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-500">Ochrona przed:</span> {pillar.protects}
              </p>

              <div className="mt-5 space-y-2.5">
                {pillar.tests.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-lg border p-3.5 font-mono text-xs ${
                      t.status === 'PASS'
                        ? 'border-neon/25 bg-neon/5'
                        : 'border-amber/30 bg-amber/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      {t.status === 'PASS' ? (
                        <CheckCircle2 size={14} className="text-neon shrink-0" />
                      ) : (
                        <AlertTriangle size={14} className="text-amber shrink-0" />
                      )}
                      <span className="text-slate-500">{t.id}</span>
                      <span className="text-slate-200 font-semibold">{t.title}</span>
                      <span className={`ml-auto ${t.status === 'PASS' ? 'text-neon' : 'text-amber'}`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-slate-400 leading-relaxed pl-6">{t.findings}</p>
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
          <p className="flex items-center gap-2 font-mono text-sm text-amber mb-4">
            <FileWarning size={16} />
            Hardening Action Items — przed pilotem studenckim
          </p>
          <ol className="space-y-2.5">
            {HARDENING_ACTIONS.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                <span className="font-mono text-amber shrink-0">{i + 1}.</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
