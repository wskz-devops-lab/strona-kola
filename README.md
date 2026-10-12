# Portal Internetowy Koła Naukowego DevOps & Virtualization Lab (WSKZ)

Repozytorium zawiera kod źródłowy publicznego portalu internetowego Koła Naukowego WSKZ, wdrażanego bezpośrednio w usłudze **GitHub Pages**.

## Architektura i Wdrożenie
- Aplikacja typu Single Page Application / Static Site oparta o React 19, TypeScript, Vite, Tailwind CSS, Framer Motion i Lucide Icons.
- Pipeline Continuous Integration / Continuous Deployment (`.github/workflows/deploy.yml`) odpowiada za automatyczną kompilację projektu oraz publikację artefaktów na GitHub Pages po zatwierdzeniu zmian w gałęzi `main`.

## Dokumentacja dla studentów

**Zacznij tutaj:** [`DOKUMENTACJA_DLA_STUDENTOW.md`](./DOKUMENTACJA_DLA_STUDENTOW.md) — pełny przewodnik krok po kroku: wymagania, uruchomienie lokalne (`npm ci && npm run dev`), struktura projektu, edycja treści oraz **kompletna instrukcja publikacji na GitHub Pages** z rozwiązywaniem typowych błędów CI.

## Szybki start

```bash
npm ci          # instalacja zależności (wymaga package-lock.json — zawsze commituj ten plik!)
npm run dev     # serwer deweloperski → http://localhost:5173
npm run build   # build produkcyjny → dist/
git push        # push na main → GitHub Actions automatycznie wdraża na Pages
```
