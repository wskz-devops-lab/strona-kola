import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  Mail,
  Copy,
  Check,
  ChevronDown,
  HelpCircle,
  ArrowUpRight,
  ClipboardList,
  Sparkles,
} from 'lucide-react';
import { CONTACT, FAQ_ITEMS } from '../data/projectsData';

const FORM_FIELDS_PREVIEW = [
  'Imię, nazwisko, numer indeksu oraz kierunek i rok studiów WSKZ',
  'Aktualny poziom wiedzy (od zupełnego początku po średniozaawansowany)',
  'Priorytety technologiczne (Linux, Docker, K8s, VPN, Proxmox, AI/Ollama, Security)',
  'Wstępny wybór ścieżki projektowej LUB zgłoszenie własnego pomysłu na projekt',
  'Preferowany tryb pracy (indywidualnie, w parze, w zespole z Gitem) oraz dyspozycyjność',
];

export default function RecruitmentAndFaq() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [showPlaceholderNotice, setShowPlaceholderNotice] = useState(false);

  const isLiveForm = CONTACT.formUrl.startsWith('http');

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <section id="rekrutacja" className="px-4 sm:px-6 py-20 border-t border-edge">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="section-coord">SYS.06 // REKRUTACJA & FAQ</span>
            <p className="section-title">// zapisy do koła, własne pomysły i kontakt</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Dołącz do DevOps & Virtualization Lab
          </h2>
          <p className="mt-3 text-ink-soft max-w-3xl leading-relaxed">
            Rekrutacja jest otwarta dla studentów wszystkich kierunków i roczników WSKZ. Wypełnij
            krótki formularz zapisowy, abyśmy mogli dopasować ścieżkę projektową, grupę i terminy
            spotkań do Twoich możliwości.
          </p>
        </motion.div>

        {/* Główne karty: Formularz Zapisowy WSKZ + Kontakt bezpośredni (2 maile) */}
        <div className="grid lg:grid-cols-12 gap-6 mb-16">
          {/* Karta Formularza Zgłoszeniowego (7 kolumn) */}
          <div className="lg:col-span-7 blueprint-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-neon">
                  <ClipboardList size={16} /> FORMULARZ ZAPISOWY STUDENTÓW (GOOGLE FORMS WSKZ)
                </span>
                <span className="mono-badge">CZAS: ~3 MINUTY</span>
              </div>

              <h3 className="text-2xl font-bold text-ink mb-3">
                Zgłoś udział i wybierz temat lub zaproponuj własny projekt
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed mb-5">
                Ankieta pomaga nam uporządkować grupę przed kolejnymi spotkaniami (poniedziałki po
                19:00) oraz dobrać odpowiedni poziom wsparcia na konsultacjach. O co pytamy w
                formularzu?
              </p>

              <ul className="space-y-2.5 mb-6">
                {FORM_FIELDS_PREVIEW.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-soft">
                    <span className="font-mono text-xs font-bold text-neon mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {isLiveForm ? (
                <a
                  href={CONTACT.formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neon text-white dark:text-slate-950 font-semibold text-sm hover:shadow-neon-md transition-all"
                >
                  <UserPlus size={17} />
                  Otwórz formularz zapisowy Google Forms (WSKZ)
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setShowPlaceholderNotice((v) => !v)}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neon text-white dark:text-slate-950 font-semibold text-sm hover:shadow-neon-md transition-all cursor-pointer"
                  >
                    <UserPlus size={17} />
                    Wypełnij formularz zgłoszeniowy (Google Forms WSKZ)
                    <ArrowUpRight size={16} />
                  </button>

                  {showPlaceholderNotice && (
                    <div className="p-4 rounded-xl border border-amber/40 bg-amber/10 text-xs text-ink space-y-1.5 font-mono">
                      <p className="font-bold text-amber flex items-center gap-1.5">
                        <Sparkles size={14} /> Nowy formularz na koncie Google WSKZ jest w trakcie podpinania
                      </p>
                      <p className="text-ink-soft font-sans leading-relaxed">
                        Docelowy link do formularza zostanie zaktualizowany w tym miejscu. W
                        międzyczasie możesz napisać bezpośrednio na jeden z dwóch adresów e-mail
                        opiekuna koła obok lub dołączyć od razu na komunikator Zulip!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Karta Kontaktu Bezpośredniego — tylko 2 maile do opiekuna (5 kolumn) */}
          <div
            id="kontakt"
            className="lg:col-span-5 blueprint-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-violet">
                  <Mail size={16} /> KONTAKT BEZPOŚREDNI
                </span>
                <span className="mono-badge">OPIEKUN KOŁA</span>
              </div>

              <h3 className="text-xl font-bold text-ink mb-1">{CONTACT.supervisor}</h3>
              <p className="text-xs font-mono text-ink-muted mb-4">
                Koło Naukowe DevOps & Virtualization Lab · WSKZ
              </p>

              <p className="text-sm text-ink-soft leading-relaxed mb-5">
                Masz pytania o działanie koła, dobór sprzętu lub własny projekt? Napisz bezpośrednio
                na jeden z dwóch adresów e-mail (prywatny dydaktyczny lub uczelniany WSKZ):
              </p>

              <div className="space-y-3 mb-6">
                {CONTACT.emails.map((email, idx) => {
                  const isCopied = copiedEmail === email;
                  const label = idx === 0 ? 'E-mail dydaktyczny (szybki kontakt)' : 'E-mail uczelniany WSKZ';
                  return (
                    <div
                      key={email}
                      className="p-3.5 rounded-xl border border-edge bg-surface/60 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">
                          {label}
                        </p>
                        <a
                          href={`mailto:${email}`}
                          className="font-mono text-xs sm:text-sm font-bold text-ink hover:text-neon transition-colors break-all"
                        >
                          {email}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyEmail(email)}
                        title="Skopiuj adres e-mail"
                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-edge bg-panel text-xs font-mono text-ink-soft hover:text-neon hover:border-neon/40 transition-colors cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check size={13} className="text-neon" />
                            <span className="text-neon">Skopiowano</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Kopiuj</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-edge space-y-2 text-xs font-mono">
              <p className="text-ink-muted">Szybkie linki dla uczestników:</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={CONTACT.zulipInviteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neon hover:underline inline-flex items-center gap-1"
                >
                  Komunikator Zulip <ArrowUpRight size={13} />
                </a>
                <a
                  href={CONTACT.consultationsCalendarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyanic hover:underline inline-flex items-center gap-1"
                >
                  Rezerwacja konsultacji <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sekcja FAQ oparta o natywne <details name="wskz-faq"> (search-hidden-content) */}
        <div className="glass-panel p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={16} className="text-cyanic" />
            <span className="font-mono text-xs font-semibold text-cyanic uppercase tracking-wider">
              Najczęstsze pytania studentów (FAQ)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-ink mb-6">
            Wszystko, o co najczęściej pytacie przed pierwszym spotkaniem
          </h3>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                name="wskz-faq"
                open={idx === 0}
                className="group rounded-xl border border-edge bg-surface/40 open:bg-surface/80 open:border-cyanic/50 transition-colors"
              >
                <summary className="list-none cursor-pointer px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-ink select-none">
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-ink-muted shrink-0 group-open:rotate-180 group-open:text-cyanic transition-transform"
                  />
                </summary>
                <div className="px-5 pb-4 pt-1 text-sm text-ink-soft leading-relaxed border-t border-edge/60">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
