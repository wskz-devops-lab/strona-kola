import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Maximize2,
  X,
  BookOpen,
  ArrowUpRight,
  Monitor,
  Server,
  CloudCog,
  Layers,
} from 'lucide-react';
import {
  LAB_GALLERY,
  ENGINEERING_GUIDES,
  MKDOCS_BASE_URL,
  type LabScreenshot,
} from '../data/projectsData';

type GalleryCategory = 'all' | LabScreenshot['category'];

const GALLERY_TABS: { key: GalleryCategory; label: string; icon: typeof Layers }[] = [
  { key: 'all', label: 'Wszystkie widoki (8)', icon: Layers },
  { key: 'portal', label: 'Student VDI Portal (Przeglądarka)', icon: Monitor },
  { key: 'proxmox', label: 'Track A: Klaster Proxmox VE', icon: Server },
  { key: 'opennebula', label: 'Track B: Chmura OpenNebula', icon: CloudCog },
];

export default function LabGallerySection() {
  const [cat, setCat] = useState<GalleryCategory>('all');
  const [selected, setSelected] = useState<LabScreenshot | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible =
    cat === 'all' ? LAB_GALLERY : LAB_GALLERY.filter((item) => item.category === cat);

  const openLightbox = (item: LabScreenshot) => {
    setSelected(item);
    const dlg = dialogRef.current;
    if (dlg && !dlg.open) {
      dlg.showModal();
    }
  };

  const closeLightbox = () => {
    dialogRef.current?.close();
  };

  // Fallback dla przeglądarek bez natywnego wsparcia atrybutu closedby="any" (light-dismiss-a-dialog)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener('click', handleBackdropClick);
      return () => dialog.removeEventListener('click', handleBackdropClick);
    }
  }, []);

  return (
    <section id="galeria" className="px-4 sm:px-6 py-20 border-t border-edge">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="section-coord">SYS.04 // ŚRODOWISKO & DOKUMENTACJA</span>
            <p className="section-title">// zrzuty ekranu z laboratorium i baza wiedzy</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Jak wygląda nasze środowisko w praktyce?
          </h2>
          <p className="mt-3 text-ink-soft max-w-3xl leading-relaxed">
            Poniżej znajdziesz rzeczywiste widoki z uruchomionych klastrów koła: od samoobsługowego
            portalu studenckiego VDI (pulpit Fedora XFCE i VS Code w przeglądarce) po klastry
            Proxmox VE, testy obciążeniowe Boot Storm oraz chmurę OpenNebula na AlmaLinux 9.
          </p>
        </motion.div>

        {/* Zakładki filtrowania galerii */}
        <div className="flex flex-wrap gap-2 mb-8">
          {GALLERY_TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setCat(key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                cat === key
                  ? 'bg-panel text-ink border-cyanic font-semibold shadow-sm'
                  : 'bg-surface/60 text-ink-soft border-edge hover:text-ink'
              }`}
            >
              <Icon size={14} className={cat === key ? 'text-cyanic' : ''} />
              {label}
            </button>
          ))}
        </div>

        {/* Siatka zrzutów ekranu */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {visible.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => openLightbox(item)}
              className="group text-left blueprint-card overflow-hidden flex flex-col justify-between hover:border-cyanic/60 transition-all cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden border-b border-edge">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/35 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-slate-900/90 text-white border border-slate-700 font-mono text-xs flex items-center gap-1.5">
                      <Maximize2 size={13} /> Powiększ
                    </span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950/85 text-cyan-300 border border-slate-700">
                    {item.tag}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-bold text-ink leading-snug mb-1.5 group-hover:text-cyanic transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed line-clamp-3">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Natywny modal <dialog closedby="any"> dla powiększonego zrzutu ekranu */}
        <dialog
          ref={dialogRef}
          closedby="any"
          aria-labelledby="lightbox-dialog-title"
          onClose={() => setSelected(null)}
          className="lightbox-dialog m-auto max-w-5xl w-[94vw] rounded-2xl border border-edge bg-panel text-ink p-0 shadow-2xl overflow-hidden"
        >
          {selected && (
            <div>
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-edge bg-surface">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-cyanic/15 text-cyanic border border-cyanic/30">
                    {selected.tag}
                  </span>
                  <h3 id="lightbox-dialog-title" className="font-bold text-sm sm:text-base text-ink">
                    {selected.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Zamknij podgląd"
                  className="p-1.5 rounded-lg border border-edge bg-panel text-ink-soft hover:text-ink cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="bg-slate-950 p-2 sm:p-4 flex items-center justify-center max-h-[72vh] overflow-auto">
                <img
                  src={selected.src}
                  alt={selected.title}
                  className="max-h-[68vh] w-auto object-contain rounded-lg"
                />
              </div>
              <div className="px-5 py-3.5 border-t border-edge bg-panel flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-ink-soft">{selected.caption}</p>
                <span className="font-mono text-[11px] text-ink-muted">
                  Kliknij poza oknem lub naciśnij Esc, aby zamknąć
                </span>
              </div>
            </div>
          )}
        </dialog>

        {/* Przewodniki Inżynierskie w Bazie Wiedzy MkDocs */}
        <div className="blueprint-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-neon mb-1">
                <BookOpen size={15} /> BAZA WIEDZY DOCS-AS-CODE (MKDOCS)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                Przewodniki Inżynierskie i Instrukcje Krok po Kroku
              </h3>
            </div>
            <a
              href={MKDOCS_BASE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neon text-white dark:text-slate-950 font-mono text-xs font-semibold hover:shadow-neon-sm transition-all"
            >
              Otwórz pełną Bazę Wiedzy <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENGINEERING_GUIDES.map((g) => (
              <a
                key={g.code}
                href={g.url}
                target="_blank"
                rel="noreferrer"
                className="group p-4 rounded-xl border border-edge bg-surface/50 hover:bg-surface hover:border-neon/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] text-neon font-semibold">{g.code}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-ink-muted group-hover:text-neon group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-ink group-hover:text-neon transition-colors mb-1.5">
                    {g.title}
                  </h4>
                  <p className="text-xs text-ink-soft leading-relaxed mb-3">{g.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {g.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-panel text-ink-muted border border-edge"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
