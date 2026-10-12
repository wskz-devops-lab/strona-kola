# 🚀 Specyfikacja i Prompt dla Kimi K3: Nowoczesny Portal WWW Koła Naukowego WSKZ

> **Instrukcja:** Skopiuj całą poniższą treść i wklej jako polecenie dla modelu **Kimi K3**. Zawiera ona precyzyjne wytyczne architektoniczne, wymagania technologiczne oraz estetyczne.

---

```markdown
Jesteś Principal Frontend Engineerem oraz Senior Creative Developerem specjalizującym się w nowoczesnych stronach technologicznych dla środowisk Cloud-Native, DevOps i cyberbezpieczeństwa.

Twoim celem jest zaprojektowanie i napisanie kodu nowoczesnego, reprezentacyjnego portalu internetowego (Single Page Application / Static Site) dla Koła Naukowego i Laboratorium Badawczego:
"DevOps & Virtualization Lab" (Uczelnia WSKZ).

Portal będzie hostowany na GitHub Pages i stanowi publiczną wizytówkę organizacji. Całość ma być przygotowana w JĘZYKU POLSKIM.

---

### 1. Stylistyka i Benchmark Wizualny (Aesthetic)
Połącz estetykę topowych portali inżynierskich i stron hakerskich (np. Vercel, Stripe Devs, DEF CON, paco.me, leerob.io):
- **Kolorystyka:** Głęboki Dark Mode (tło w tonacji grafitu/czerni `#090a0f`, panele `#11131a`, obramowania `#1f2330`).
- **Akcenty świetlne:** Neonowa zieleń terminalowa (`#10b981`), cyjan infrastruktury (`#06b6d4`), subtelny fiolet security (`#8b5cf6`).
- **Typografia:** Nagłówki i tekst główny – nowoczesny font sans-serif (Inter lub Geist); elementy techniczne, komendy, ścieżki i kody – font monospace (JetBrains Mono / Fira Code).
- **Efekty wizualne:** Siatka w tle (subtelny grid), delikatny blur na kartach (backdrop-filter / glassmorphism), pulsujące diody statusowe (`animate-pulse`).

---

### 2. Stos Technologiczny
- **Framework:** Next.js (App Router) LUB Vite + React 19 + TypeScript.
- **Style:** Tailwind CSS.
- **Ikony:** Lucide React (`lucide-react`).
- **Animacje:** Framer Motion (delikatne przejścia, fading, typing effect).
- **Terminal:** Interaktywny komponent konsoli w React (z historią komend i promptem `student@wskz-lab:~$`).

---

### 3. Struktura i Moduły Portalu

#### A. Belka Nawigacyjna (Navbar)
- Sygnatura: `[WSKZ//DEVOPS-LAB]` (font mono).
- Badge telemetryczny: `● PROXMOX CLUSTER: ONLINE` (pulsująca zielona kropka).
- Menu odnośników: `O nas`, `Ścieżki Badawcze`, `Projekty`, `Laboratorium KVM`, `Dołącz`.
- Przyciski akcji: Odnośnik do organizacji na GitHubie oraz przycisk dołączenia do Zulipa.

#### B. Sekcja Główna (Hero) z Interaktywnym Terminalem
- **Lewa kolumna:**
  - Dynamiczny nagłówek: *"Suwerenna Wirtualizacja, Automatyzacja i Nowoczesne DevOps"*.
  - Krótki manifest koła (praktyczna nauka, badania doktoranckie, KVM/QEMU, kontenery, serwery AI).
  - Przyciski CTA: `[Eksploruj Projekty]` oraz `[Baza Wiedzy MkDocs]`.
- **Prawa kolumna — Interaktywny Terminal (`<InteractiveTerminal />`):**
  - Wygląd: Okno terminala macOS/Linux z 3 kropkami kontrolnymi i tytułem `bash - wskz-session-01`.
  - Obsługa interaktywnych komend wpisywanych przez użytkownika:
    - `help` — wyświetla listę dostępnych komend.
    - `projects` — drukuje podsumowanie projektów (Wirtualizacja, Docker, K8s, AI, Red Teaming).
    - `status` — wyświetla stan węzłów Proxmox VE (2 węzły KVM, 25 maszyn testowych, Thin-Pool OK).
    - `whoami` — żartobliwy/motywacyjny opis gościa (np. `status: przyszły inżynier devops`).
    - `clear` — czyści bufor terminala.
  - Na starcie terminal sam wypisuje sekwencję powitalną z animowanym efektem wpisywania.

#### C. Kafelki Telemetrii Laboratoryjnej (Live Stats)
- Licznik: `2 Węzły KVM` (Klaster Proxmox 8.x).
- Licznik: `16 Kart Projektowych` (Od wirtualizacji po Red Teaming).
- Licznik: `0 MB` narzutu początkowego dzięki klonowaniu dowiązanemu (Linked Clones).
- Wskaźnik: `Zulip Threaded Streams` (Nowy standard komunikacji bez chaosu).

#### D. Katalog Ścieżek i Projektów (Interactive Cards)
Karty projektów z filtrowaniem i odznakami trudności:
1. *Projekt 01: Wirtualizacja i KVM/QEMU* (Proxmox, AlmaLinux, virt-manager, snapshoty).
2. *Projekt 02: Konteneryzacja i Docker/Podman* (Wielokontenerowe usługi biznesowe).
3. *Projekt 03: Automatyzacja CI/CD i Git* (Automatyczne pipeline'y, audyt kodu).
4. *Projekt 04: Prywatna Chmura i Self-Hosting* (Nextcloud, bezpieczny dysk, WireGuard).
5. *Projekt 05: Systemy Backupu Przyrostowego* (BorgBackup, Restic, odzyskiwanie awaryjne).
6. *Badania: Serwer AI & Suwerenne Modele* (vLLM, Ollama, dynamiczne preemption GPU).
7. *Badania: Pakiet Red Teaming i Hardening* (Izolacja cgroups v2, segmentacja sieci).

#### E. Sekcja Badań Doktoranckich i Infrastruktury
- Wizualizacja architektury: Jak działa Golden Image (Fedora 44 Base) + Linked Clones + bezklientowe Web VDI (noVNC).
- Informacja o suwerennej chmurze akademickiej bez uzależnienia od komercyjnych dostawców.

#### F. Stopka (Footer)
- Informacje o uczelni (WSKZ), licencji (Open Source / MIT), linki do GitHub Org i Zulipa.

---

### 4. Oczekiwany Wynik
Wygeneruj:
1. Strukturę projektu (`package.json`, konfigurację `tailwind.config.js`).
2. Główny plik aplikacji (`App.tsx` lub `page.tsx`).
3. Kompletny komponent `InteractiveTerminal.tsx` z obsługą stanu poleceń i animacji.
4. Komponenty kart projektów i wskaźników telemetrycznych.
```
