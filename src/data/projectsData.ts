// Dane merytoryczne wyciągnięte wprost z repozytoriów koła:
// - 02_materialy_dydaktyczne/docs/projekty/katalog-projektow-1-16.md
// - 04_architektura_proxmox (Track A: Proxmox VE, KVM, LXC, ZFS/Ceph, GPU Passthrough, VDI)
// - 06_architektura_opennebula (Track B: OpenNebula + AlmaLinux 9, Sunstone, VXLAN, VDI)
// - 05_pakiet_red_teaming (5 filarów audytu + przykładowy raport)
// - 00_organizacja_kola (analiza zainteresowań, plan koła, wymagania, kontakt)

export type ProjectCategory = 'infra' | 'ai-cyber';
export type Difficulty =
  | 'podstawowy'
  | 'podstawowy / średni'
  | 'średni'
  | 'średni / zaawansowany'
  | 'podstawowy → zaawansowany';
export type ProjectStatus = 'rekrutacja' | 'w realizacji' | 'gotowe demo';
export type StarterTrack = 'all' | 'cloud-virt' | 'containers-auto' | 'ai-llm' | 'cyber-net';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  difficulty: Difficulty;
  status: ProjectStatus;
  description: string;
  tech: string[];
  outcome: string;
  docPath?: string; // Ścieżka w opublikowanej Bazie Wiedzy MkDocs
  tracks: StarterTrack[];
  levels: SkillLevel[];
}

export const MKDOCS_BASE_URL = 'https://wskz-devops-lab.github.io/materialy-dydaktyczne';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Wirtualizacja firmowego środowiska roboczego',
    category: 'infra',
    difficulty: 'podstawowy / średni',
    status: 'w realizacji',
    description:
      'Budowa platformy wirtualizacji do uruchamiania maszyn dla pracowników i testowania usług firmowych. Planowanie zasobów, tworzenie VM, zarządzanie snapshotami i separacja środowisk na KVM/QEMU.',
    tech: ['Proxmox VE', 'KVM/QEMU', 'Cockpit', 'virt-manager', 'virsh', 'snapshoty'],
    outcome: 'Demo środowiska, pokaz zarządzania maszynami i ich odtwarzania ze snapshotów.',
    docPath: 'projekty/projekt-01-wirtualizacja/',
    tracks: ['cloud-virt'],
    levels: ['beginner', 'intermediate'],
  },
  {
    id: 2,
    title: 'Konteneryzacja małej usługi biznesowej',
    category: 'infra',
    difficulty: 'podstawowy',
    status: 'w realizacji',
    description:
      'Uruchomienie prostej usługi (panel webowy, serwis Python/JS) w odizolowanym kontenerze. Bezpieczne wydzielenie usługi i przygotowanie jej do powtarzalnego uruchamiania na każdym systemie.',
    tech: ['Docker', 'Podman', 'Dockerfile', 'Docker Compose', 'Python', 'wolumeny'],
    outcome: 'Demonstracja działania usługi i uzasadnienie sensu konteneryzacji w małej firmie.',
    docPath: 'projekty/projekt-02-konteneryzacja/',
    tracks: ['containers-auto'],
    levels: ['beginner'],
  },
  {
    id: 3,
    title: 'Automatyczny build po zmianach w repozytorium',
    category: 'infra',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Produkcyjny pipeline CI/CD: serwer wykrywa zmianę w repo, pobiera kod, wykonuje build, uruchamia testy, robi backup poprzedniej wersji i wysyła powiadomienie o wyniku z możliwością rollbacku.',
    tech: ['Git', 'Codeberg / GitHub', 'webhooki', 'CI/CD Actions', 'Ansible', 'Zulip'],
    outcome: 'Pokaz pełnej drogi od commita do wdrożenia z backupem i rollbackiem.',
    docPath: 'projekty/projekt-03-cicd/',
    tracks: ['containers-auto'],
    levels: ['intermediate', 'advanced'],
  },
  {
    id: 4,
    title: 'Prywatna chmura i własny office (Self-Hosting)',
    category: 'infra',
    difficulty: 'podstawowy / średni',
    status: 'w realizacji',
    description:
      'Środowisko typu prywatna chmura: przechowywanie i współdzielenie plików, edycja dokumentów, praca zdalna jak w rozwiązaniach firmowych. Praktyczna usługa przydatna w domu i firmie.',
    tech: ['Nextcloud', 'OnlyOffice', 'reverse proxy', 'SSL/TLS', 'Docker Compose'],
    outcome: 'Demo logowania, współdzielenia folderów i wspólnej edycji dokumentów.',
    docPath: 'projekty/projekt-04-prywatna-chmura/',
    tracks: ['cloud-virt', 'containers-auto'],
    levels: ['beginner', 'intermediate'],
  },
  {
    id: 5,
    title: 'System backupu przyrostowego i odtwarzania',
    category: 'infra',
    difficulty: 'podstawowy / średni',
    status: 'rekrutacja',
    description:
      'Realny system kopii zapasowych z testowanym odtworzeniem po awarii, błędzie użytkownika lub nieudanej aktualizacji. Backup bez przetestowanego restore nie jest żadnym zabezpieczeniem.',
    tech: ['Restic', 'BorgBackup', 'rsync', 'systemd timers', 'szyfrowanie', 'retencja'],
    outcome: 'Pokaz wykonania kopii, odtworzenia danych i polityki retencji.',
    docPath: 'projekty/projekt-05-backup/',
    tracks: ['cloud-virt', 'cyber-net'],
    levels: ['beginner', 'intermediate'],
  },
  {
    id: 6,
    title: 'Suwerenna chmura IaaS — OpenNebula & AlmaLinux 9',
    category: 'infra',
    difficulty: 'podstawowy / średni',
    status: 'w realizacji',
    description:
      'Własna chmura IaaS na OpenNebula i AlmaLinux 9: klonowanie CoW poniżej 2s, automatyczna sprawdzarka zadań Ansible, dynamiczne zwalnianie GPU z AI dla VDI i wygodne sterowanie na żądanie bez autostartu.',
    tech: ['OpenNebula', 'AlmaLinux 9', 'KVM', 'Copy-on-Write', 'Ansible', 'noVNC', 'Terraform'],
    outcome: 'Demo suwerennej chmury, powołanie grupy maszyn, automatyczny test i czyszczenie.',
    docPath: 'projekty/projekt-06-suwerenna-chmura-opennebula/',
    tracks: ['cyber-net', 'cloud-virt'],
    levels: ['beginner', 'intermediate'],
  },
  {
    id: 7,
    title: 'Klaster wirtualizacji Proxmox VE — KVM, LXC i Rolling Upgrade',
    category: 'infra',
    difficulty: 'średni',
    status: 'w realizacji',
    description:
      'Wirtualizacja Proxmox VE 8.x: kontenery LXC z nesting=1 pod Dockera i k3s, klony dowiązane, aktualizacje klastra w locie bez wyłączania maszyn (Rolling Upgrade) i zarządzanie węzłami na żądanie.',
    tech: ['Proxmox VE', 'Ansible', 'Terraform', 'LXC Nesting', 'ZFS/Ceph', 'Corosync', 'Rolling Upgrade'],
    outcome: 'Jedno polecenie konfigurujące węzeł, migracja maszyn na żywo i automatyczne testy.',
    docPath: 'projekty/projekt-07-architektura-klastra-proxmox/',
    tracks: ['containers-auto', 'cloud-virt'],
    levels: ['intermediate', 'advanced'],
  },
  {
    id: 8,
    title: 'Lokalny klaster Kubernetes i wdrożenie usługi',
    category: 'infra',
    difficulty: 'średni / zaawansowany',
    status: 'rekrutacja',
    description:
      'Uruchomienie prostego klastra i wdrożenie usług: deploymenty, service, ingress, konfiguracja YAML. Cel aspiracyjny dla wielu uczestników — dochodzimy do niego po opanowaniu Dockera.',
    tech: ['Kubernetes', 'k3s', 'kind', 'minikube', 'kubectl', 'YAML', 'ArgoCD', 'GitOps'],
    outcome: 'Działające wdrożenie, wyjaśnienie roli zasobów i demo aktualizacji bez przestoju.',
    docPath: 'projekty/projekt-08-klaster-k8s-k3s-gitops/',
    tracks: ['containers-auto', 'cloud-virt'],
    levels: ['intermediate', 'advanced'],
  },
  {
    id: 9,
    title: 'Monitoring usług i reakcja na awarie (Green Computing & DCGM)',
    category: 'infra',
    difficulty: 'średni',
    status: 'w realizacji',
    description:
      'Infrastruktura to nie tylko uruchomienie, ale też utrzymanie: zbieranie metryk systemowych, dashboardy, alerty i monitoring poboru energii/temperatur kart graficznych z NVIDIA DCGM.',
    tech: ['Prometheus', 'Grafana', 'node_exporter', 'DCGM Exporter', 'alerty', 'dashboardy'],
    outcome: 'Pokaz dashboardu, automatycznego alertu na błąd oraz pomiar zużycia energii inferencji AI.',
    docPath: 'projekty/projekt-09-monitoring-i-obserwowalnosc/',
    tracks: ['cloud-virt', 'containers-auto'],
    levels: ['intermediate'],
  },
  {
    id: 10,
    title: 'Mini-platforma usługowa na urządzeniu ARM',
    category: 'infra',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Tania, energooszczędna baza dla domowego homelabu: płytka ARM (np. Raspberry Pi) lub jej emulacja w VM z usługami sieciowymi, VPN, backupem i monitoringiem.',
    tech: ['ARM / Raspberry Pi', 'Linux', 'Docker', 'reverse proxy', 'Nextcloud'],
    outcome: 'Działająca mikro-platforma z pomiarem zużycia zasobów i energii.',
    tracks: ['cloud-virt'],
    levels: ['beginner', 'intermediate'],
  },
  {
    id: 11,
    title: 'Własny serwer AI — lokalne modele LLM, RAG i GPU Passthrough',
    category: 'ai-cyber',
    difficulty: 'podstawowy → zaawansowany',
    status: 'w realizacji',
    description:
      'Suwerenny serwer udostępniający modele językowe bez wysyłania danych w chmurę: od prostego uruchomienia Ollama + Open WebUI na laptopie po VFIO GPU Passthrough i własny RAG na dokumentach.',
    tech: ['Ollama', 'llama.cpp', 'Open WebUI', 'RAG / Qdrant', 'VFIO / IOMMU', 'LiteLLM'],
    outcome: 'Demo prywatnego asystenta AI i porównanie modelu lokalnego z komercyjnym API.',
    docPath: 'projekty/projekt-11-serwer-ai-i-gpu-passthrough/',
    tracks: ['ai-llm'],
    levels: ['beginner', 'intermediate', 'advanced'],
  },
  {
    id: 12,
    title: 'Bezpieczny węzeł brzegowy — reverse proxy, TLS i WAF',
    category: 'ai-cyber',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Pojedynczy punkt wejścia chroniący usługi: terminacja TLS, kierowanie ruchu, rate limiting i blokowanie podejrzanych żądań. Uczciwe porównanie małego sprzętu (RPi Zero 2 W) z maszyną VM.',
    tech: ['Caddy', 'Traefik', 'Nginx', "Let's Encrypt", 'fail2ban', 'CrowdSec', 'WAF'],
    outcome: 'Demo bezpiecznego dostępu przez bramę i pokaz automatycznie zablokowanego ataku.',
    tracks: ['cyber-net'],
    levels: ['intermediate'],
  },
  {
    id: 13,
    title: 'Segmentacja sieci i automatyczna reakcja na atak',
    category: 'ai-cyber',
    difficulty: 'średni / zaawansowany',
    status: 'rekrutacja',
    description:
      'Ograniczanie skutków incydentu: strefy bezpieczeństwa, wykrywanie podejrzanego ruchu i automatyczne odcięcie zagrożonego fragmentu środowiska zgodnie z zasadą „fail closed”.',
    tech: ['VLAN', 'nftables', 'fail2ban', 'CrowdSec', 'Suricata', 'Zeek'],
    outcome: 'Symulacja incydentu i pokaz automatycznej izolacji — ograniczenie „promienia rażenia”.',
    tracks: ['cyber-net'],
    levels: ['intermediate', 'advanced'],
  },
  {
    id: 14,
    title: 'Szyfrowanie danych i zarządzanie sekretami',
    category: 'ai-cyber',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Ochrona danych w spoczynku i w przesyle oraz porządne zarządzanie hasłami i kluczami API — zamiast trzymania ich w kodzie. Rozszerzenie: klucze sprzętowe YubiKey, TPM i Secure Boot.',
    tech: ['LUKS', 'TLS', 'GnuPG', 'age', 'SOPS', 'HashiCorp Vault', 'YubiKey'],
    outcome: 'Pokaz danych nieczytelnych bez klucza i bezpiecznego pobrania sekretu w pipeline’ie.',
    tracks: ['cyber-net', 'containers-auto'],
    levels: ['intermediate'],
  },
  {
    id: 15,
    title: 'Rozproszone przechowywanie danych — IPFS i analiza prywatności',
    category: 'ai-cyber',
    difficulty: 'średni / zaawansowany',
    status: 'rekrutacja',
    description:
      'Krytyczna weryfikacja haseł „zero-knowledge”: publiczny IPFS nie jest prywatny sam z siebie — prywatność budujemy przez szyfrowanie przed publikacją i prywatną sieć (private swarm).',
    tech: ['IPFS (Kubo)', 'swarm key', 'IPFS Cluster', 'age / GnuPG', 'erasure coding'],
    outcome: 'Demo odzyskania danych po awarii węzła i rzetelna ocena deklaracji prywatności.',
    tracks: ['cyber-net', 'cloud-virt'],
    levels: ['intermediate', 'advanced'],
  },
  {
    id: 16,
    title: 'Laboratorium bezpieczeństwa — analiza ruchu, honeypot i Red Teaming',
    category: 'ai-cyber',
    difficulty: 'podstawowy → zaawansowany',
    status: 'gotowe demo',
    description:
      'Izolowana piaskownica do obserwacji ruchu sieciowego, pułapka honeypot (Cowrie) oraz zautomatyzowany skrypt audytujący 5 filarów bezpieczeństwa klastra wirtualizacji.',
    tech: ['Python RedTeam', 'Wireshark', 'Suricata', 'Cowrie', 'LXC namespaces', 'cgroups v2'],
    outcome: 'Pełny raport audytu bezpieczeństwa i analiza przechwyconych prób włamań.',
    docPath: 'projekty/projekt-16-red-teaming-i-audyt-bezpieczenstwa/',
    tracks: ['cyber-net'],
    levels: ['beginner', 'intermediate', 'advanced'],
  },
];

// --- Przewodniki Inżynierskie w Bazie Wiedzy MkDocs ---
export interface EngineeringGuide {
  code: string;
  title: string;
  subtitle: string;
  tags: string[];
  url: string;
}

export const ENGINEERING_GUIDES: EngineeringGuide[] = [
  {
    code: 'GUIDE-01',
    title: 'Wirtualizacja Ręczna: Proxmox VE i OpenNebula',
    subtitle: 'Tworzenie kontenerów LXC/Podman, maszyn KVM, wzorców Golden Image i klonów CoW krok po kroku.',
    tags: ['Proxmox VE', 'OpenNebula', 'KVM', 'LXC'],
    url: `${MKDOCS_BASE_URL}/przewodnik/reczna-wirtualizacja-proxmox-i-opennebula/`,
  },
  {
    code: 'GUIDE-02',
    title: 'Architektura IaC: Ansible i Terraform',
    subtitle: 'Zwalczanie dryfu konfiguracyjnego, model 4-warstwowy i deklaratywne wdrażanie laboratoriów.',
    tags: ['Ansible', 'Terraform', 'IaC', 'Idempotencja'],
    url: `${MKDOCS_BASE_URL}/przewodnik/automatyzacja-ansible-i-terraform/`,
  },
  {
    code: 'GUIDE-03',
    title: 'Klastry, Quorum i Pamięć Masowa',
    subtitle: 'Corosync, ochrona przed Split-Brain, Ceph HCI vs ZFS ARC oraz wirtualne sieci SDN (VLAN/VXLAN).',
    tags: ['Corosync', 'Ceph', 'ZFS', 'SDN'],
    url: `${MKDOCS_BASE_URL}/przewodnik/architektura-klastrow-i-pamieci-masowej/`,
  },
  {
    code: 'GUIDE-04',
    title: 'Akceleracja AI i GPU Passthrough',
    subtitle: 'Izolacja grup IOMMU, sterowniki VFIO i przekazywanie kart GPU bezpośrednio do maszyn z Ollama i vLLM.',
    tags: ['VFIO', 'IOMMU', 'Ollama', 'vLLM'],
    url: `${MKDOCS_BASE_URL}/przewodnik/akceleracja-ai-i-gpu-passthrough/`,
  },
  {
    code: 'GUIDE-05',
    title: 'Bezpieczeństwo Wirtualizacji i Red Teaming',
    subtitle: 'Zapobieganie ucieczkom z kontenerów, izolacja gniazd Docker/LXD, cgroups v2 i higiena RODO.',
    tags: ['Red Teaming', 'User Namespaces', 'Hardening'],
    url: `${MKDOCS_BASE_URL}/przewodnik/bezpieczenstwo-wirtualizacji-i-red-teaming/`,
  },
  {
    code: 'GUIDE-06',
    title: 'Kompendium Technologii i Pakiet Startowy',
    subtitle: 'Wymagania sprzętowe, wybór dystrybucji (Debian/Ubuntu vs AlmaLinux/Fedora) i zestaw minimalny na 1. zajęcia.',
    tags: ['Linux', 'WSL2', 'VirtualBox', 'Git'],
    url: `${MKDOCS_BASE_URL}/start/wymagania/`,
  },
];

// --- Paczka na start (Zestaw minimalny na pierwsze zajęcia) ---
export interface StarterItem {
  id: string;
  title: string;
  detail: string;
  category: 'sprzet' | 'narzedzia' | 'komunikacja';
}

export const STARTER_CHECKLIST: StarterItem[] = [
  {
    id: 'virt-bios',
    title: 'Komputer z min. 8 GB RAM (komfortowo 16 GB) i wirtualizacją w BIOS/UEFI',
    detail: 'Włączone VT-x (Intel) lub AMD-V (AMD). Jeśli masz słabszy sprzęt — skorzystasz z naszego zdalnego VDI w przeglądarce.',
    category: 'sprzet',
  },
  {
    id: 'hypervisor',
    title: 'Lokalny hiperwizor + obraz ISO Linuksa (Debian/Ubuntu lub AlmaLinux/Fedora)',
    detail: 'VirtualBox (Windows/Linux/Intel-Mac), UTM (macOS Apple Silicon) lub natywne KVM/QEMU + virt-manager na Linuksie.',
    category: 'narzedzia',
  },
  {
    id: 'containers',
    title: 'Środowisko kontenerowe: Docker lub Podman',
    detail: 'Docker Desktop (Windows + WSL2 / macOS), Docker Engine lub bezdemonowy Podman na Linuksie.',
    category: 'narzedzia',
  },
  {
    id: 'editor-git',
    title: 'Edytor kodu (VS Code / VSCodium), Git oraz klucze SSH',
    detail: 'Skonfigurowane git user.name / user.email, wygenerowana para kluczy (ssh-keygen) i menedżer haseł (np. KeePassXC / Bitwarden).',
    category: 'narzedzia',
  },
  {
    id: 'accounts',
    title: 'Zgłoszenie w formularzu i dołączenie do Zulipa koła',
    detail: 'Bieżąca komunikacja techniczna toczy się w wątkach na Zulipie, a kod projektów trzymamy na Codebergu i GitHubie.',
    category: 'komunikacja',
  },
];

// --- Zwięzły profil grupy z ankiet ---
export const GROUP_SURVEY_SUMMARY = {
  lead: 'Większość uczestników to studenci I roku (AI/ML, Informatyka, Cyberbezpieczeństwo, Analiza Danych, Mechatronika) startujący od podstaw — ale są też osoby pracujące już w IT.',
  topInterests: [
    { name: 'VPN i sieci nakładkowe (WireGuard, Tailscale)', pct: 88 },
    { name: 'Administracja Linux i kontenery (Docker / Podman)', pct: 84 },
    { name: 'Cyberbezpieczeństwo, hardening i analiza ruchu', pct: 76 },
    { name: 'Własny serwer AI (Ollama / RAG) i prywatna chmura', pct: 71 },
    { name: 'Kubernetes, Ansible i automatyzacja CI/CD', pct: 65 },
  ],
};

// --- Architektura VDI (Track A: Proxmox VE & Track B: OpenNebula) ---
export interface VdiMetric {
  label: string;
  value: string;
  detail: string;
}

export const VDI_METRICS: VdiMetric[] = [
  { label: 'Czas klonowania Linked Clone', value: '1.8 s', detail: 'zamiast 5–10 min pełnego klonu' },
  { label: 'Miejsce na start', value: '0 MB', detail: 'Copy-on-Write na LVM-Thin / ZFS' },
  { label: 'Dostęp studenta', value: 'noVNC :6080', detail: 'bezklientowy pulpit HTML5 i VS Code' },
  { label: 'Czysty stan po zajęciach', value: '--purge 1', detail: 'qm destroy — Zero Trust dla kolejnej grupy' },
];

export const VDI_PIPELINE: { step: string; cmd: string; desc: string }[] = [
  {
    step: 'Golden Image',
    cmd: 'qm importdisk 200 fedora44.qcow2 local-lvm',
    desc: 'Obraz Fedora Cloud Base + XFCE + noVNC + VS Code Server, migawka nadrzędna, szablon tylko do odczytu.',
  },
  {
    step: 'Linked Clone (IaC)',
    cmd: './deploy_qm_fast.sh  # lub terraform apply',
    desc: 'Klony dowiązane w 1.8 s (Proxmox Track A lub OpenNebula Track B), unikalne IP przez Cloud-Init.',
  },
  {
    step: 'Clientless Access',
    cmd: 'http://192.168.122.150:6080/vnc.html',
    desc: 'Pełny pulpit XFCE, VS Code IDE i terminal w przeglądarce — działa nawet na słabym laptopie czy tablecie.',
  },
  {
    step: 'Teardown (Zero-Residual)',
    cmd: 'qm destroy <vmid> --purge 1',
    desc: 'Natychmiastowe, fizyczne wyczyszczenie dysków po zajęciach — zero danych rezydualnych między grupami.',
  },
];

export const VDI_TRACKS = [
  {
    id: 'track-a',
    badge: 'TRACK A // REPO 04',
    title: 'Klaster Proxmox VE (KVM + LXC + Ceph/ZFS)',
    os: 'Debian 12 / Proxmox VE 8.x & 9.x',
    storage: 'LVM-Thin CoW / ZFS ARC / Ceph HCI',
    highlights: [
      'Błyskawiczne klonowanie dowiązane (qm clone --full 0) w 1.8 sekundy.',
      'Kontenery nieuprzywilejowane LXC z obsługą Docker Nesting (subuid 100000+).',
      'Izolacja VFIO / IOMMU i przekazywanie GPU do maszyn z lokalnymi modelami LLM.',
    ],
    repoUrl: 'https://github.com/wskz-devops-lab/architektura-proxmox',
  },
  {
    id: 'track-b',
    badge: 'TRACK B // REPO 06',
    title: 'Suwerenna Chmura OpenNebula (Enterprise RHEL)',
    os: 'AlmaLinux 9 (rodzina RHEL / SELinux Enforcing)',
    storage: 'QCOW2 Backing Store + sieci VXLAN / SDN',
    highlights: [
      'Pełna alternatywa klastrowa oparta o ekosystem Red Hat / AlmaLinux 9.',
      'Wdrożenie 4-warstwowe z użyciem playbooków Ansible i providera OpenNebula w Terraform.',
      'Samoobsługowy portal studencki VDI (VS Code IDE, Jupyter AI Lab, Fedora Desktop).',
    ],
    repoUrl: 'https://github.com/wskz-devops-lab/architektura-vdi-opennebula',
  },
];

// --- Galeria prawdziwych zrzutów ekranu z laboratorium ---
export interface LabScreenshot {
  id: string;
  src: string;
  title: string;
  category: 'portal' | 'proxmox' | 'opennebula';
  tag: string;
  caption: string;
}

export const LAB_GALLERY: LabScreenshot[] = [
  {
    id: 'portal-catalog',
    src: './img/portal_catalog_view.png',
    title: 'Student VDI Portal — Katalog środowisk laboratoryjnych',
    category: 'portal',
    tag: 'PORTAL VDI',
    caption:
      'Samoobsługowy portal studencki: wybór gotowego kontenera lub maszyny VM (VS Code Web-IDE, Python & AI Lab, Linux DevOps Lab, Security Sandbox) uruchamianej w przeglądarce.',
  },
  {
    id: 'fedora-gui',
    src: './img/vdi_fedora_gui_session.png',
    title: 'Bezklientowy pulpit Fedora 44 XFCE w przeglądarce (60 FPS)',
    category: 'portal',
    tag: 'noVNC / HTML5',
    caption:
      'Pełne środowisko graficzne Fedora 44 (KVM VM 200) przesyłane strumieniowo do okna przeglądarki przy opóźnieniu 12 ms — zero instalacji klienta na komputerze studenta.',
  },
  {
    id: 'vscode-session',
    src: './img/portal_workspace_editor.png',
    title: 'Web-IDE (VS Code) bezpośrednio w sesji przeglądarkowej',
    category: 'portal',
    tag: 'CODE-SERVER',
    caption:
      'Izolowana instancja VS Code z gotowym kompilatorem, Pythonem 3.12, bibliotekami AI i dostępem do terminala kontenera studenckiego.',
  },
  {
    id: 'portal-terminal',
    src: './img/portal_workspace_terminal.png',
    title: 'Konsola powłoki Linux w portalu laboratoryjnym',
    category: 'portal',
    tag: 'WEB SHELL',
    caption:
      'Natychmiastowy dostęp przez WebSocket do powłoki Bash/Zsh wewnątrz odizolowanego środowiska bez konieczności przekierowania portów SSH.',
  },
  {
    id: 'proxmox-cluster',
    src: './img/fig_proxmox_cluster.png',
    title: 'Klaster Proxmox VE — węzły, Golden Template i zadania qmclone',
    category: 'proxmox',
    tag: 'TRACK A // PROXMOX',
    caption:
      'Widok produkcyjny klastra Proxmox VE: węzły pve-node-01/02, brama LXC Caddy, szablon bazowy VM 9000 oraz logi błyskawicznego klonowania w dolnym panelu zadań.',
  },
  {
    id: 'boot-storm',
    src: './img/boot_storm_phase2_peak_100cpu.png',
    title: 'Test obciążeniowy „Boot Storm” — 25 maszyn studenckich jednocześnie',
    category: 'proxmox',
    tag: 'BENCHMARK VDI',
    caption:
      'Eksperyment badawczy koła: jednoczesny rozruch 25 klonów dowiązanych (vdi-bench-201..225) na puli LVM-Thin CoW podczas szczytowego obciążenia procesora.',
  },
  {
    id: 'opennebula-dash',
    src: './img/fig_opennebula_dashboard.png',
    title: 'OpenNebula Sunstone — Dashboard chmury na AlmaLinux 9',
    category: 'opennebula',
    tag: 'TRACK B // OPENNEBULA',
    caption:
      'Panel zarządzania chmurą prywatną OpenNebula (Track B): monitorowanie hostów KVM, alokacji CPU/RAM, obrazów QCOW2 i sieci wirtualnych.',
  },
  {
    id: 'opennebula-topo',
    src: './img/fig_opennebula_topology.png',
    title: 'Topologia sieci SDN / VXLAN w chmurze OpenNebula',
    category: 'opennebula',
    tag: 'SDN / VXLAN',
    caption:
      'Automatycznie zestawiona topologia odizolowanej sieci studenckiej (vnet-private / vnet-vxlan) łączącej maszyny laboratoryjne VM 2..8.',
  },
];

// --- Pakiet Red Teaming (repozytorium 05) ---
export interface AuditTest {
  id: string;
  title: string;
  status: 'PASS' | 'WARN';
  findings: string;
}

export interface AuditPillar {
  id: number;
  name: string;
  short: string;
  protects: string;
  tests: AuditTest[];
}

export const REDTEAM_PILLARS: AuditPillar[] = [
  {
    id: 1,
    name: 'Container Escape & User Namespace',
    short: 'Ucieczka z kontenera',
    protects: 'Przejęciem uprawnień root hosta z wnętrza kontenera.',
    tests: [
      { id: 'SEC-1.1', title: 'Unprivileged User Namespace Configuration', status: 'PASS', findings: '4 konfiguracje kontenerów, wszystkie z unprivileged: 1' },
      { id: 'SEC-1.2', title: 'Kernel UID Mapping (Host root protection)', status: 'PASS', findings: 'Root kontenera (uid 0) mapowany na host subuid 100000' },
      { id: 'SEC-1.3', title: 'Raw Block & Physical Device Exposure', status: 'PASS', findings: 'Zero fizycznych urządzeń hosta w /dev kontenera' },
      { id: 'SEC-1.4', title: 'Docker Nesting Flag Containment', status: 'PASS', findings: 'nesting=1 dla CT 103 pod ograniczeniami unprivileged subuid' },
    ],
  },
  {
    id: 2,
    name: 'Resource Starvation & DoS Immunity',
    short: 'Odporność na DoS',
    protects: 'Sparaliżowaniem serwera przez jednego użytkownika/studenta.',
    tests: [
      { id: 'SEC-2.1', title: 'cgroups v2 pids.max Fork-Bomb Throttle', status: 'WARN', findings: 'Brak jawnego lxc.cgroup2.pids.max — bomby widelcowe mogą wyczerpać tablicę PID' },
      { id: 'SEC-2.2', title: 'Memory Quota and Swap Boundaries', status: 'PASS', findings: 'Rygorystyczne limity RAM/Swap per kontener (1024M–4096M)' },
      { id: 'SEC-2.3', title: 'LVM-Thin Data & Metadata Headroom', status: 'PASS', findings: 'Zużycie puli dyskowej zaudytowane na węźle 1' },
    ],
  },
  {
    id: 3,
    name: 'Network Segmentation & Lateral Movement',
    short: 'Segmentacja sieci',
    protects: 'Ruchem lateralnym i skanowaniem infrastruktury uczelnianej.',
    tests: [
      { id: 'SEC-3.1', title: 'Hypervisor Core Firewall Status', status: 'WARN', findings: 'pve-firewall wyłączony na poziomie klastra; port 8006 eksponowany na moście studenckim' },
      { id: 'SEC-3.2', title: 'Web GUI (8006) Access from Lab Sandbox', status: 'WARN', findings: 'Port 8006 osiągalny z CT 102 — wymagany filtr iptables/pve-firewall' },
      { id: 'SEC-3.3', title: 'Corosync Cluster Ring (5405/UDP) Exposure', status: 'PASS', findings: 'Broadcast Corosync UDP monitorowany' },
      { id: 'SEC-3.4', title: 'Bridge Port Isolation (Anti-Sniffing)', status: 'WARN', findings: 'Brak flagi isolated w net0 — studenci mogą wąchać ruch sąsiadów' },
    ],
  },
  {
    id: 4,
    name: 'Portal API & Gateway Hardening',
    short: 'Hardening API portalu',
    protects: 'Wykonywaniem złośliwych poleceń w warstwie orkiestracji.',
    tests: [
      { id: 'SEC-4.1', title: 'REST API Command Whitelist Enforcement', status: 'PASS', findings: 'Niedozwolona komenda odrzucona z HTTP 403' },
      { id: 'SEC-4.2', title: 'WebSocket Terminal Root Fallback Elimination', status: 'PASS', findings: 'server.cjs odrzuca nieautoryzowane cele i blokuje shell roota hosta' },
      { id: 'SEC-4.3', title: 'Atomic VMID Reservation Mutex', status: 'PASS', findings: 'Atomowe blokady rezerwacji VMID chronią przed kolizjami przy równoległych żądaniach' },
    ],
  },
  {
    id: 5,
    name: 'Zero Residual Data & Higiena RODO',
    short: 'Higiena danych / RODO',
    protects: 'Wyciekiem danych wrażliwych i kluczy między grupami studentów.',
    tests: [
      { id: 'SEC-5.1', title: 'Ephemeral Workspace /tmp Hygiene', status: 'WARN', findings: 'Katalog /tmp zawiera 5 plików rezydualnych' },
      { id: 'SEC-5.2', title: 'Bash History Isolation Between Cohorts', status: 'PASS', findings: 'Historia poleceń monitorowana pod kątem kontaminacji między studentami' },
      { id: 'SEC-5.3', title: 'VM Destruction Disk Purge (--purge 1)', status: 'PASS', findings: 'qm destroy z --purge 1 gwarantuje natychmiastową sanitizację Zero-Residual' },
    ],
  },
];

export const AUDIT_VERDICT = {
  passed: 12,
  warnings: 5,
  critical: 0,
  auditId: 'security_audit_20261012_071105',
  version: 'v0.9.5-rc',
};

export const HARDENING_ACTIONS = [
  "Dodać 'lxc.cgroup2.pids.max: 512' do konfiguracji LXC studentów — gwarancja powstrzymania fork-bomb.",
  'Włączyć pve-firewall i odrzucać ruch przychodzący na porty 8006, 22 i 5405 z mostka studenckiego (vmbr0).',
  "Dodać 'isolated: 1' do net0 we wszystkich konfiguracjach kontenerów i VM — blokada podsłuchiwania między studentami.",
];

// --- FAQ dla kandydatów i członków koła ---
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Czy muszę mieć wcześniejsze doświadczenie z Linuksem, serwerami lub DevOps?',
    a: 'Nie! Około 80% zapisanych studentów zaczyna od poziomu podstawowego. Pierwsze spotkania i konsultacje służą właśnie temu, aby spokojnie postawić pierwszą maszynę wirtualną, poznać terminal i uruchomić pierwszy kontener. Osoby bardziej zaawansowane mogą od razu wejść w tematy klastrowe, IaC lub audyty bezpieczeństwa.',
  },
  {
    q: 'Kiedy odbywają się spotkania i co jeśli pracuję zmianowo lub nie zawsze mogę być?',
    a: 'Spotkania główne odbywają się zdalnie orientacyjnie w poniedziałki po godz. 19:00 (zazwyczaj 2 razy w miesiącu, ok. 90 minut), ale dokładne terminy w każdym miesiącu ustalamy indywidualnie pod dyspozycyjność grupy. W pozostałe tygodnie dostępne są konsultacje, a wszystkie materiały i instrukcje krok po kroku czekają w Bazie Wiedzy.',
  },
  {
    q: 'Mam własny pomysł na projekt (np. domowy serwer albo automatyzację czegoś w pracy). Czy mogę go realizować?',
    a: 'Jak najbardziej! Katalog 16 projektów to nasza ustrukturyzowana baza propozycji, ale w formularzu zapisowym jest dedykowane miejsce na zgłoszenie własnego pomysłu lub problemu technicznego z pracy/domu, który wspólnie pomożemy zaprojektować i wdrożyć.',
  },
  {
    q: 'Czy potrzebuję mocnego komputera albo własnego Raspberry Pi?',
    a: 'Do lokalnych ćwiczeń wystarczy zwykły laptop/PC z min. 8 GB RAM (komfortowo 16 GB). Jeśli Twój komputer jest słabszy lub ma ograniczenia, możesz korzystać z naszego zdalnego środowiska VDI uruchamianego bezpośrednio w przeglądarce (noVNC / VS Code Web-IDE). Płytki ARM (Raspberry Pi) to wyłącznie opcja dodatkowa dla chętnych.',
  },
  {
    q: 'Dlaczego w materiałach pokazujecie zarówno Ubuntu/Debiana, jak i AlmaLinux/Fedorę?',
    a: 'W realnej pracy inżyniera DevOps spotkasz dwie główne rodziny Linuksa: rodzinę Debian/Ubuntu (pakiety .deb, apt) oraz rodzinę korporacyjną Red Hat / RHEL (AlmaLinux, Rocky, Fedora — pakiety .rpm, dnf, domyślny SELinux i firewalld). Na start wybierasz jedną, ale pokazujemy różnice w obu światach, bo daje to ogromną przewagę zawodową.',
  },
];

// --- Telemetria hero ---
export const TELEMETRY = [
  { label: 'ARCHITEKTURY LAB', value: '2', unit: 'Proxmox & OpenNebula', accent: 'neon' as const },
  { label: 'KLONOWANIE VDI', value: '1.8', unit: 's (Linked Clone)', accent: 'cyanic' as const },
  { label: 'PROJEKTY DO WYBORU', value: '16', unit: '+ własne pomysły', accent: 'violet' as const },
  { label: 'SPOTKANIA ZDALNE', value: 'Pon', unit: 'po 19:00 + konsultacje', accent: 'neon' as const },
];

// --- Kontakt i Formularz Zapisowy ---
export const CONTACT = {
  emails: ['nauczanie@pm.me', 'przemyslaw.zarnecki@wskz.pl'],
  // TODO: Po uruchomieniu skryptu Google Apps Script na koncie WSKZ wklej tutaj wygenerowany link Google Forms:
  formUrl: '#formularz-wskz-placeholder',
  formIsPlaceholder: true,
  materialsSiteUrl: 'https://wskz-devops-lab.github.io/materialy-dydaktyczne/',
  materialsUrl: 'https://github.com/wskz-devops-lab/materialy-dydaktyczne',
  githubOrg: 'https://github.com/wskz-devops-lab',
  zulipInviteUrl: 'https://zullip.zarnecki.org',
  consultationsCalendarUrl: 'https://chmura.zarnecki.org/apps/calendar/appointment/Pk86wK62KEGr',
  supervisor: 'Przemysław Żarnecki',
};
