# Dokumentacja dla Studentów — Strona Koła (React + Vite + GitHub Pages)

**Koło Naukowe DevOps & Virtualization Lab — WSKZ**

Ten dokument prowadzi Cię krok po kroku przez wszystko, co musisz wiedzieć o stronie koła:
jak ją uruchomić u siebie, jak ją modyfikować i jak opublikować na **GitHub Pages**.
Nie zakładamy żadnego wcześniejszego doświadczenia z Reactem — wystarczy terminal i podstawy Gita.

---

## Spis treści

1. [Czym jest ten projekt?](#1-czym-jest-ten-projekt)
2. [Wymagania wstępne](#2-wymagania-wstępne)
3. [Pierwsze uruchomienie lokalne](#3-pierwsze-uruchomienie-lokalne)
4. [Struktura projektu — co gdzie leży](#4-struktura-projektu--co-gdzie-leży)
5. [Jak edytować treści strony](#5-jak-edytować-treści-strony)
6. [Publikacja na GitHub Pages — pełna instrukcja](#6-publikacja-na-github-pages--pełna-instrukcja)
7. [Jak działa automatyczne wdrożenie (GitHub Actions)](#7-jak-działa-automatyczne-wdrożenie-github-actions)
8. [Rozwiązywanie typowych problemów](#8-rozwiązywanie-typowych-problemów)
9. [Ściągawka komend](#9-ściągawka-komend)

---

## 1. Czym jest ten projekt?

To statyczna strona internetowa koła, zbudowana z:

| Technologia | Rola | Analogia z naszych laboratoriów |
| :--- | :--- | :--- |
| **React 19** | Biblioteka UI — strona składa się z komponentów | Jak modułowe playbooki Ansible |
| **TypeScript** | JavaScript z typami — wyłapuje błędy przed uruchomieniem | Jak `ansible --check` przed wdrożeniem |
| **Vite** | Narzędzie budujące — dev server + bundler | Jak `qm clone` — błyskawiczny start |
| **Tailwind CSS** | Style jako klasy użytkowe w HTML | Deklaratywny wygląd, jak YAML w K8s |
| **Framer Motion** | Animacje (wejścia sekcji, przejścia kart) | — |
| **Lucide Icons** | Ikony SVG jako komponenty | — |

Efekt końcowy to **czysto statyczne pliki** (HTML + CSS + JS) w katalogu `dist/` — nie potrzebujemy
żadnego backendu, bazy danych ani serwera Node w produkcji. Dlatego idealnie pasuje to na
darmowy hosting GitHub Pages.

---

## 2. Wymagania wstępne

| Co | Wersja | Sprawdzenie |
| :--- | :--- | :--- |
| Node.js (LTS) | **20 lub 22** | `node --version` |
| npm (w pakiecie z Node) | 10+ | `npm --version` |
| Git | dowolna | `git --version` |

### Instalacja Node.js

**Linux (zalecane: `nvm` — menedżer wersji):**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# zamknij i otwórz terminal, potem:
nvm install 22
nvm use 22
```

**Windows/macOS:** pobierz instalator LTS z <https://nodejs.org> i kliknij dalej.

> **Dlaczego akurat 20/22?** Nasz workflow na GitHub Actions używa Node 22. Pracując lokalnie
> na tej samej wersji unikasz sytuacji „u mnie działa, na CI nie działa".

---

## 3. Pierwsze uruchomienie lokalne

```bash
# 1. Sklonuj repozytorium (podmień URL na właściwy)
git clone https://github.com/wskz-devops-lab/strona-kola.git
cd strona-kola

# 2. Zainstaluj zależności (czyta package-lock.json — powtarzalna instalacja)
npm ci

# 3. Uruchom serwer deweloperski z hot-reload
npm run dev
```

Otwórz przeglądarkę na <http://localhost:5173>. Każda zmiana w plikach `src/` przeładowuje
stronę automatycznie — nie musisz nic restartować.

### Pozostałe polecenia

```bash
npm run build     # buduje wersję produkcyjną do katalogu dist/
npm run preview   # serwuje zbudowane dist/ lokalnie (test przed publikacją)
```

> **`npm ci` vs `npm install` — ważna różnica!**
> - `npm ci` instaluje **dokładnie** te wersje, które są zapisane w `package-lock.json`.
>   Używaj go zawsze po sklonowaniu repo i na CI.
> - `npm install` może zaktualizować zależności i nadpisać lockfile. Używaj go tylko,
>   gdy świadomie dodajesz/aktualizujesz pakiety.

---

## 4. Struktura projektu — co gdzie leży

```
strona-kola/
├── .github/workflows/deploy.yml   # Automatyczne wdrożenie na GitHub Pages
├── index.html                     # Punkt wejścia HTML (tytuł, fonty JetBrains Mono)
├── package.json                   # Skrypty npm + lista zależności
├── package-lock.json              # Dokładne wersje zależności (wymagane w repozytorium)
├── vite.config.ts                 # Konfiguracja bundlera (base: './' — obsługa GitHub Pages)
├── tailwind.config.js             # Konfiguracja palety barw i animacji Tailwind CSS
├── tsconfig.json                  # Konfiguracja TypeScript
└── src/
    ├── main.tsx                   # Punkt wejścia aplikacji React
    ├── App.tsx                    # Kompozycja głównych sekcji portalu
    ├── index.css                  # Style globalne Tailwind i klasy pomocnicze
    ├── data/
    │   └── projectsData.ts        # Kompletny zbiór danych: 16 projektów, VDI, audyt Red Team, kontakt
    └── components/
        ├── Navbar.tsx             # Pasek nawigacyjny ze statusem klastra Proxmox
        ├── TerminalHero.tsx       # Interaktywny terminal z obsługą poleceń
        ├── StatsSection.tsx       # Kafelki telemetryczne infrastruktury
        ├── ProjectsGrid.tsx       # Siatka projektów z filtrowaniem ścieżek
        ├── VdiShowcase.tsx        # Prezentacja architektury Golden Image i noVNC
        ├── RedTeamShowcase.tsx    # Prezentacja 5 filarów audytu bezpieczeństwa
        └── Footer.tsx             # Odnośniki do bazy wiedzy i kontaktu
```

**Zasada numer 1:** treści merytoryczne (opisy projektów, wyniki audytu, linki) trzymamy
w [`src/data/projectsData.ts`](./src/data/projectsData.ts), a **nie** na sztywno w komponentach.
Chcesz zmienić opis projektu? Edytujesz jeden plik z danymi — komponenty same się przebudują.

---

## 5. Jak edytować treści strony

### 5.1. Zmiana opisu projektu

Otwórz `src/data/projectsData.ts` i znajdź tablicę `PROJECTS`. Każdy projekt to obiekt:

```ts
{
  id: 6,
  title: 'Bezpieczny dostęp zdalny i sieć nakładkowa',
  category: 'infra',              // 'infra' (1–10) lub 'ai-cyber' (11–16)
  difficulty: 'podstawowy / średni',
  status: 'rekrutacja',           // 'rekrutacja' | 'w realizacji' | 'gotowe demo'
  description: 'Bezpieczne łączenie urządzeń...',
  tech: ['WireGuard', 'Tailscale', 'ZeroTier'],
  outcome: 'Pokaz zdalnego dostępu do usługi...',
},
```

Zmieniasz tekst, zapisujesz — dev server przeładuje stronę automatycznie.

### 5.2. Aktualizacja wyników audytu Red Teaming

W tym samym pliku: `REDTEAM_PILLARS` (5 filarów z testami) oraz `AUDIT_VERDICT`
(liczby PASS/WARN/CRITICAL). Po każdym nowym uruchomieniu `security_redteam_audit.py`
zaktualizuj statusy testów i werdykt.

### 5.3. Zmiana kolorów / animacji

Paleta i animacje są w `tailwind.config.js` (kolory `void`, `panel`, `edge`, `neon`,
`cyanic`, `violet`). Klasy używasz potem w komponentach, np. `text-neon`, `border-edge`.

### 5.4. Dodanie nowej komendy do terminala

W `src/components/TerminalHero.tsx` znajdź funkcję `runCommand()` — to zwykły `switch`.
Dodaj nowy `case 'mojakomenda':` zwracający tablicę linii i dopisz ją do wyniku `help`.

---

## 6. Publikacja na GitHub Pages — pełna instrukcja

### 6.1. Jak to działa w skrócie

GitHub Pages to **darmowy hosting statycznych plików** wbudowany w każde repozytorium.
My nie wrzucamy tam ręcznie plików — robi to za nas **GitHub Actions** (plik
`.github/workflows/deploy.yml`): po każdym pushu na gałąź `main` robot buduje projekt
(`npm ci && npm run build`) i publikuje zawartość `dist/`.

```
git push → GitHub Actions → npm ci → npm run build → dist/ → 🌐 https://<org>.github.io/<repo>/
```

### 6.2. Krok 1 — Utwórz repozytorium i wypchnij kod

```bash
# W katalogu projektu (jeśli jeszcze nie zainicjalizowane):
git init
git add .
git commit -m "Strona koła: React 19 + Vite + Tailwind"

# Podepnij zdalne repozytorium organizacji i wypchnij:
git remote add origin git@github.com:wskz-devops-lab/strona-kola.git
git branch -M main
git push -u origin main
```

> **UWAGA KRYTYCZNA: `package-lock.json` musi znajdować się w repozytorium.**
> Workflow używa polecenia `npm ci`, które bez pliku lockfile kończy się błędem:
> *"Dependencies lock file is not found"*. Sprawdź przed wysłaniem zmian:
> ```bash
> git status                    # package-lock.json nie może być oznaczony jako "untracked"
> git ls-files | grep lock      # polecenie powinno zwrócić: package-lock.json
> ```
> Jeśli pliku brakuje: `git add package-lock.json && git commit -m "Dodaj lockfile" && git push`.
> Plik `.gitignore` w tym projekcie celowo nie ignoruje pliku lockfile.

### 6.3. Krok 2 — Włączenie GitHub Pages w ustawieniach repozytorium

Czynność wykonywana jednorazowo w panelu GitHub:

1. Przejdź do repozytorium w serwisie GitHub.
2. Otwórz zakładkę **Settings** -> w menu bocznym wybierz **Pages**.
3. W sekcji **Build and deployment** -> **Source** wskaż opcję: **`GitHub Actions`**.
   - Nie wybieraj „Deploy from a branch" (publikacja surowych plików z gałęzi `gh-pages`). Projekt wymaga kompilacji narzędziem Vite w potoku Actions.
4. Wybór zapisywany jest automatycznie.

### 6.4. Krok 3 — Weryfikacja wdrożenia

Wypchnij zmiany do gałęzi `main` (lub w zakładce **Actions** wybierz workflow
„Wdrożenie Strony Koła na GitHub Pages" i kliknij **Run workflow**).

Postęp weryfikować można w zakładce **Actions**. Pomyślne zakończenie etapu
`build-and-deploy` oznacza gotowość witryny. Strona udostępniana jest pod adresem:

```
https://wskz-devops-lab.github.io/strona-kola/
```

Dokładny URL zobaczysz też w podsumowaniu zadania (pole `url` środowiska `github-pages`).

### 6.5. Dlaczego strona działa pod ścieżką `/strona-kola/`, a nie pod `/`?

Repo organizacji publikuje się pod **podścieżką** z nazwą repozytorium. Dlatego w
`vite.config.ts` ustawiliśmy:

```ts
export default defineConfig({
  base: './',   // względne ścieżki do assetów — działa pod KAŻDYM adresem
  // ...
});
```

Dzięki `base: './'` linki do JS/CSS w `index.html` są względne i strona działa poprawnie
zarówno pod `https://wskz-devops-lab.github.io/strona-kola/`, jak i pod własną domeną.
**Nie zmieniaj tego na `base: '/'`** — pod podścieżką Pages strona straci style i skrypty
(biały ekran, błędy 404 w konsoli).

### 6.6. (Opcjonalnie) Własna domena

Jeśli koło kiedyś dostanie domenę (np. `devops.wskz.pl`):
1. Settings → Pages → **Custom domain** → wpisz domenę.
2. U dostawcy DNS dodaj rekord `CNAME` wskazujący na `wskz-devops-lab.github.io`.
3. Zaznacz **Enforce HTTPS** (GitHub wystawi darmowy certyfikat Let's Encrypt —
   dokładnie ten sam mechanizm, który ćwiczymy w projekcie 12).

---

## 7. Jak działa automatyczne wdrożenie (GitHub Actions)

Plik `.github/workflows/deploy.yml`, linia po linii:

```yaml
on:
  push:
    branches: ["main"]     # uruchom się po każdym pushu na main
  workflow_dispatch:        # ...oraz pozwól odpalić ręcznie z zakładki Actions

permissions:
  contents: read            # robot może czytać kod
  pages: write              # robot może publikować na Pages
  id-token: write           # wymagane przez oficjalny mechanizm deploy-pages
```

Następnie zadanie `build-and-deploy` wykonuje na świeżej maszynie Ubuntu:

| Krok | Co robi | Po co |
| :--- | :--- | :--- |
| `actions/checkout@v4` | pobiera kod repo | bez kodu nie ma czego budować |
| `actions/setup-node@v4` (`node-version: 22`, `cache: "npm"`) | instaluje Node 22 i cache'uje zależności | build jest szybszy; **cache wymaga `package-lock.json` w repo!** |
| `npm ci` | instaluje zależności z lockfile'a | powtarzalność — te same wersje co u Ciebie |
| `npm run build` | `tsc -b && vite build` → `dist/` | kompilacja TS + bundling produkcyjny |
| `actions/configure-pages@v5` | przygotowuje środowisko Pages | formalność wymagana przez Pages |
| `actions/upload-pages-artifact@v3` (`path: "./dist"`) | pakuje `dist/` jako artefakt | to jest dokładnie to, co trafi na hosting |
| `actions/deploy-pages@v4` | publikuje artefakt | strona żyje pod adresem Pages |

**Sekcja `concurrency`** pilnuje, żeby dwa pushe nie wdrażały się jednocześnie
(grupa `pages`, bez anulowania trwającego wdrożenia).

---

## 8. Rozwiązywanie typowych problemów

### ❌ Błąd: „Dependencies lock file is not found"

**Przyczyna:** `package-lock.json` nie jest w repozytorium (niezacommitowany albo zignorowany).

**Naprawa:**
```bash
npm install          # wygeneruje lockfile, jeśli go nie ma
git add package-lock.json
git commit -m "fix(ci): dodaj package-lock.json wymagany przez npm ci"
git push
```

### ❌ Strona się wdrożyła, ale widzę biały ekran / brak stylów

**Przyczyna:** złe `base` w `vite.config.ts` (np. `'/'` zamiast `'./'`).

**Naprawa:** ustaw `base: './'`, zacommituj, wypchnij. Sprawdź też w DevTools (F12) →
Network, czy assety ładują się spod `/strona-kola/assets/...`, a nie `/assets/...`.

### ⚠️ Warning: „Node.js 20 is deprecated... forced to run on Node.js 24"

**Przyczyna:** GitHub wygasza obrazy z Node 20; akcje `@v4` są wymuszane na Node 24.

**Naprawa:** w workflow mamy `node-version: 22` (aktualne LTS). Sam warning o wewnętrznym
runtime akcji zniknie, gdy GitHub zaktualizuje akcje do `@v5` — można wtedy podbić wersje
`actions/checkout@v5` i `actions/setup-node@v5`. To tylko ostrzeżenie, nie błąd.

### ℹ️ Notice: „ubuntu-latest will migrate to Ubuntu 26"

Czysta informacja — GitHub podmieni obraz runnera w październiku 2026. Nasz workflow nie
zależy od specyfiki Ubuntu, więc **nie wymaga żadnej akcji**.

### ❌ `npm ci` kończy się błędem „lock file out of sync"

**Przyczyna:** ktoś edytował `package.json` ręcznie bez odświeżenia lockfile'a.

**Naprawa lokalna:** `npm install` (zsynchronizuje lockfile), commit + push obu plików.

### ❌ Push odrzucony: „Permission denied (publickey)"

Brak klucza SSH powiązanego z kontem GitHub. Wygeneruj i dodaj:
```bash
ssh-keygen -t ed25519 -C "twoj@email"
cat ~/.ssh/id_ed25519.pub   # wklej na github.com → Settings → SSH keys
```
Albo przełącz remote na HTTPS: `git remote set-url origin https://github.com/wskz-devops-lab/strona-kola.git`.

---

## 9. Ściągawka komend

```bash
# --- Praca lokalna ---
npm ci                  # instalacja zależności (po klonowaniu)
npm run dev             # dev server → http://localhost:5173
npm run build           # build produkcyjny → dist/
npm run preview         # podgląd zbudowanej wersji

# --- Publikacja (cała magia to zwykły push) ---
git add .
git commit -m "opis zmiany"
git push                # → Actions buduje i wdraża na Pages automatycznie

# --- Kontrola stanu ---
git ls-files | grep lock    # czy package-lock.json jest w repo? (MUSI być)
```

---

> **Pamiętaj:** GitHub Pages to hosting **wyłącznie statyczny** — nie uruchomisz tam
> backendu Node ani bazy. Nasza strona po `npm run build` to czyste HTML/CSS/JS,
> więc pasuje idealnie. Gdybyśmy kiedyś potrzebowali API (np. live-status klastra
> Proxmox), hostowalibyśmy je osobno — np. na węźle koła za WireGuardem, jak w projekcie 6.
