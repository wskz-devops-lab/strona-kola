import { BookOpen, Github, Mail, TerminalSquare } from 'lucide-react';
import { CONTACT } from '../data/projectsData';

export default function Footer() {
  return (
    <footer className="border-t border-edge px-4 sm:px-6 py-12 bg-panel/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 pb-8 border-b border-edge">
          {/* Kolumna 1: Identyfikacja */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="p-1.5 rounded-md bg-neon/10 border border-neon/30 text-neon">
                <TerminalSquare size={16} />
              </span>
              <span className="font-mono font-bold text-sm text-ink">
                [WSKZ <span className="text-neon">//</span> DEVOPS-LAB]
              </span>
            </div>
            <p className="text-xs text-ink-soft leading-relaxed">
              Koło Naukowe DevOps & Virtualization Lab przy Wyższej Szkole Kształcenia Zawodowego
              (WSKZ). Praktyczna wirtualizacja (Proxmox VE & OpenNebula), konteneryzacja,
              automatyzacja IaC, lokalne serwery AI i cyberbezpieczeństwo.
            </p>
          </div>

          {/* Kolumna 2: Repozytoria organizacji */}
          <div>
            <p className="font-mono text-xs font-semibold text-cyanic mb-3 flex items-center gap-1.5">
              <BookOpen size={14} /> EKOSYSTEM REPOZYTORIÓW
            </p>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href={CONTACT.materialsSiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-neon transition-colors"
                >
                  → Baza Wiedzy (MkDocs — Projekty 1–16 i Poradniki)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/wskz-devops-lab/architektura-proxmox"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-cyanic transition-colors"
                >
                  → Track A: Architektura Proxmox VE (KVM, LXC, Ceph)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/wskz-devops-lab/architektura-vdi-opennebula"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-cyanic transition-colors"
                >
                  → Track B: Architektura OpenNebula (AlmaLinux 9)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/wskz-devops-lab/pakiet-red-teaming"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft hover:text-violet transition-colors"
                >
                  → Pakiet Audytu Bezpieczeństwa Red Teaming
                </a>
              </li>
            </ul>
          </div>

          {/* Kolumna 3: Kontakt do opiekuna */}
          <div>
            <p className="font-mono text-xs font-semibold text-violet mb-3 flex items-center gap-1.5">
              <Mail size={14} /> OPIEKUN KOŁA: {CONTACT.supervisor.toUpperCase()}
            </p>
            <ul className="space-y-1.5 text-xs font-mono mb-4">
              {CONTACT.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="text-ink-soft hover:text-neon transition-colors"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={CONTACT.githubOrg}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink transition-colors"
            >
              <Github size={14} /> github.com/wskz-devops-lab
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-ink-muted">
          <p>
            [WSKZ <span className="text-neon">//</span> DEVOPS-LAB] © 2026 · Wyższa Szkoła Kształcenia Zawodowego
          </p>
          <p>Spotkania: poniedziałki po 19:00 (zdalnie) · Konsultacje: środy</p>
        </div>
      </div>
    </footer>
  );
}
