import { motion } from 'framer-motion';
import { BookOpen, Github, Mail, ShieldCheck } from 'lucide-react';
import { CONTACT } from '../data/projectsData';

export default function Footer() {
  return (
    <footer id="kontakt" className="border-t border-edge/60 px-4 sm:px-6 py-16 bg-panel/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-title mb-3">// kontakt & informacja</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">
            Kontakt z laboratorium
          </h2>
          <p className="mt-4 text-slate-400 max-w-3xl leading-relaxed">
            Koło Naukowe DevOps & Virtualization Lab przy Wyższej Szkole Kształcenia Zawodowego (WSKZ)
            prowadzi warsztaty inżynierskie, badania nad wirtualizacją KVM oraz projekty open-source.
            Wszelkie zapytania rekrutacyjne i merytoryczne prosimy kierować bezpośrednio do opiekuna koła.
          </p>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {/* O Kole */}
          <div className="glass-panel p-6">
            <p className="flex items-center gap-2 font-mono text-sm text-neon mb-4">
              <ShieldCheck size={16} /> FORMUŁA PRACY
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Zajęcia laboratoryjne odbywają się zdalnie w cyklu dwutygodniowym. Uczestnicy realizują
              indywidualne lub zespołowe mini-projekty w wybranym obszarze: od podstaw Linuksa i Dockera
              po suwerenne serwery AI oraz audyty Red Teaming.
            </p>
          </div>

          {/* Repozytoria i Kod */}
          <div className="glass-panel p-6">
            <p className="flex items-center gap-2 font-mono text-sm text-cyanic mb-4">
              <BookOpen size={16} /> KOD I DOKUMENTACJA
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={CONTACT.githubOrg}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-cyanic transition-colors"
                >
                  <Github size={15} className="shrink-0" /> Organizacja GitHub: wskz-devops-lab
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/wskz-devops-lab/materialy-dydaktyczne"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-cyanic transition-colors"
                >
                  <BookOpen size={15} className="shrink-0" /> Repozytorium Bazy Wiedzy
                </a>
              </li>
            </ul>
          </div>

          {/* Kontakt bezpośredni do opiekuna */}
          <div className="glass-panel p-6">
            <p className="flex items-center gap-2 font-mono text-sm text-violet mb-4">
              <Mail size={16} /> OPIEKUN KOŁA
            </p>
            <p className="text-sm font-medium text-slate-200 mb-2">
              {CONTACT.supervisor}
            </p>
            <ul className="space-y-2 text-sm">
              {CONTACT.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-xs text-slate-400 hover:text-neon transition-colors break-all"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Brak formularzy kontaktowych w celu ochrony przed automatycznym spamem.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-edge/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-slate-600">
            [WSKZ <span className="text-neon">//</span> DEVOPS-LAB] © 2026 · Wyższa Szkoła Kształcenia Zawodowego
          </p>
          <p className="font-mono text-xs text-slate-600">
            Praktyczna Wirtualizacja, Konteneryzacja i Bezpieczeństwo
          </p>
        </div>
      </div>
    </footer>
  );
}
