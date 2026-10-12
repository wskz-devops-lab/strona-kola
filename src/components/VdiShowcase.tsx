import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, Layers, Timer, Trash2, HardDrive } from 'lucide-react';
import { VDI_METRICS, VDI_PIPELINE } from '../data/projectsData';

const STEP_ICONS = [Layers, Timer, MonitorSmartphone, Trash2];

export default function VdiShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((s) => (s + 1) % VDI_PIPELINE.length), 3600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="vdi" className="px-4 sm:px-6 py-20 border-t border-edge/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-title mb-3">// praktyczna architektura vdi</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">
            Golden Image + Linked Clones
          </h2>
          <p className="mt-4 text-slate-400 max-w-3xl leading-relaxed">
            Tradycyjne laboratorium: 30 studentów × 25 GB = 750 GB dysku i „boot storm" zarzynający
            macierz o pełnej godzinie. Nasza odpowiedź na Proxmox VE: klonowanie dowiązane
            Copy-on-Write, bezklientowy dostęp noVNC i niszczenie maszyn po zajęciach flagą{' '}
            <span className="font-mono text-neon">--purge 1</span>.
          </p>
        </motion.div>

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
              <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">{m.label}</p>
              <p className="mt-2 text-2xl font-bold font-mono text-cyanic">{m.value}</p>
              <p className="mt-1 text-xs text-slate-500">{m.detail}</p>
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
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left glass-panel p-4 flex items-start gap-4 transition-all duration-300 ${
                    active ? 'border-neon/50 shadow-neon-sm' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span
                    className={`mt-0.5 p-2 rounded-lg border ${
                      active ? 'bg-neon/15 border-neon/40 text-neon' : 'bg-void/60 border-edge text-slate-500'
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <span>
                    <span className={`block font-mono text-sm font-semibold ${active ? 'text-neon' : 'text-slate-300'}`}>
                      {i + 1}. {s.step}
                    </span>
                    <span className="block mt-1 text-xs text-slate-500 leading-relaxed">{s.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Podgląd komendy */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-panel terminal-scanlines relative overflow-hidden lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-edge bg-void/70">
              <HardDrive size={14} className="text-cyanic" />
              <span className="font-mono text-xs text-slate-500">
                root@pve-node-02 — {VDI_PIPELINE[activeStep].step}
              </span>
            </div>
            <div className="p-5 font-mono text-sm">
              <p className="text-slate-500 text-xs mb-2"># krok {activeStep + 1}/4</p>
              <p className="text-neon terminal-glow break-all">$ {VDI_PIPELINE[activeStep].cmd}</p>
              <p className="mt-4 text-slate-400 text-xs leading-relaxed">{VDI_PIPELINE[activeStep].desc}</p>
              {activeStep === 1 && (
                <pre className="mt-4 text-[11px] leading-relaxed text-slate-500 overflow-x-auto">
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
