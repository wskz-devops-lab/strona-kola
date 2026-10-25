import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MonitorSmartphone,
  Layers,
  Timer,
  Trash2,
  HardDrive,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { VDI_METRICS, VDI_PIPELINE, VDI_TRACKS } from '../data/projectsData';

const STEP_ICONS = [Layers, Timer, MonitorSmartphone, Trash2];

export default function VdiShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((s) => (s + 1) % VDI_PIPELINE.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="vdi" className="px-4 sm:px-6 py-20 border-t border-edge">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="section-coord">SYS.03 // ARCHITEKTURA VDI & CHMURA</span>
            <p className="section-title">// dwie równoległe ścieżki wirtualizacji</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Golden Image + Linked Clones (Proxmox & OpenNebula)
          </h2>
          <p className="mt-4 text-ink-soft max-w-3xl leading-relaxed">
            Tradycyjne laboratorium: 30 studentów × 25 GB = 750 GB dysku i „boot storm” paraliżujący
            macierz o pełnej godzinie. Nasza odpowiedź w dwóch wariantach klastrowych: klonowanie
            dowiązane Copy-on-Write, bezklientowy dostęp z przeglądarki (noVNC / VS Code) oraz
            automatyczne czyszczenie dysków po zajęciach flagą{' '}
            <span className="font-mono text-neon font-semibold">--purge 1</span>.
          </p>
        </motion.div>

        {/* Porównanie Track A (Proxmox VE) vs Track B (OpenNebula) */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {VDI_TRACKS.map((track, idx) => (
            <div
              key={track.id}
              className="blueprint-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded border ${
                      idx === 0
                        ? 'bg-neon/10 text-neon border-neon/30'
                        : 'bg-cyanic/10 text-cyanic border-cyanic/30'
                    }`}
                  >
                    {track.badge}
                  </span>
                  <span className="mono-badge">{track.os}</span>
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">{track.title}</h3>
                <p className="font-mono text-xs text-ink-muted mb-4">
                  Storage & Sieć: <span className="text-ink-soft">{track.storage}</span>
                </p>
                <ul className="space-y-2 mb-5">
                  {track.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-ink-soft">
                      <CheckCircle2
                        size={15}
                        className={`mt-0.5 shrink-0 ${idx === 0 ? 'text-neon' : 'text-cyanic'}`}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3.5 border-t border-edge flex items-center justify-between text-xs font-mono">
                <span className="text-ink-muted">Pełne IaC: Ansible + Terraform</span>
                <a
                  href={track.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1 font-semibold hover:underline ${
                    idx === 0 ? 'text-neon' : 'text-cyanic'
                  }`}
                >
                  Repozytorium GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Metryki */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {VDI_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass-panel p-5 border-l-2 border-l-cyanic"
            >
              <p className="font-mono text-[10px] tracking-widest text-ink-muted uppercase font-semibold">
                {m.label}
              </p>
              <p className="mt-2 text-2xl font-extrabold font-mono text-cyanic">{m.value}</p>
              <p className="mt-1 text-xs text-ink-soft">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Pipeline krok po kroku */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            {VDI_PIPELINE.map((s, i) => {
              const Icon = STEP_ICONS[i];
              const active = i === activeStep;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left glass-panel p-4 flex items-start gap-4 transition-all duration-300 cursor-pointer ${
                    active ? 'border-neon shadow-neon-sm' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <span
                    className={`mt-0.5 p-2 rounded-lg border ${
                      active
                        ? 'bg-neon/15 border-neon/40 text-neon'
                        : 'bg-surface border-edge text-ink-muted'
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <span>
                    <span
                      className={`block font-mono text-sm font-semibold ${
                        active ? 'text-neon' : 'text-ink'
                      }`}
                    >
                      {i + 1}. {s.step}
                    </span>
                    <span className="block mt-1 text-xs text-ink-soft leading-relaxed">
                      {s.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Podgląd komendy (zawsze ciemna konsola terminal-dark-surface) */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="terminal-dark-surface rounded-xl border terminal-scanlines relative overflow-hidden lg:sticky lg:top-24 shadow-xl"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-950/90">
              <HardDrive size={14} className="text-cyan-400" />
              <span className="font-mono text-xs text-slate-400">
                root@pve-node-02 — {VDI_PIPELINE[activeStep].step}
              </span>
            </div>
            <div className="p-5 font-mono text-sm">
              <p className="text-slate-400 text-xs mb-2"># krok {activeStep + 1}/4</p>
              <p className="text-emerald-400 terminal-glow break-all">
                $ {VDI_PIPELINE[activeStep].cmd}
              </p>
              <p className="mt-4 text-slate-300 text-xs leading-relaxed">
                {VDI_PIPELINE[activeStep].desc}
              </p>
              {activeStep === 1 && (
                <pre className="mt-4 text-[11px] leading-relaxed text-slate-400 overflow-x-auto">
{`--> [VM 301] Klonowanie dowiązane: wskz-student-1...
    Status: DZIAŁAJĄCA | IP: 192.168.122.150
    noVNC: http://192.168.122.150:6080/vnc.html`}
                </pre>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
