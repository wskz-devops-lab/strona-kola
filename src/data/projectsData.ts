// Dane merytoryczne wyciągnięte wprost z repozytoriów koła:
// - 02_materialy_dydaktyczne/docs/projekty/katalog-projektow-1-16.md
// - 04_architektura_vdi (Golden Image / Linked Clones / noVNC)
// - 05_pakiet_red_teaming (5 filarów audytu + przykładowy raport)
// - 00_organizacja_kola (analiza zainteresowań, plan koła, kontakt)

export type ProjectCategory = 'infra' | 'ai-cyber';
export type Difficulty = 'podstawowy' | 'podstawowy / średni' | 'średni' | 'średni / zaawansowany' | 'podstawowy → zaawansowany';
export type ProjectStatus = 'rekrutacja' | 'w realizacji' | 'gotowe demo';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  difficulty: Difficulty;
  status: ProjectStatus;
  description: string;
  tech: string[];
  outcome: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Wirtualizacja firmowego środowiska roboczego',
    category: 'infra',
    difficulty: 'podstawowy / średni',
    status: 'w realizacji',
    description:
      'Budowa platformy wirtualizacji do uruchamiania maszyn dla pracowników i testowania usług firmowych. Planowanie zasobów, tworzenie VM, zarządzanie snapshotami i separacja środowisk na KVM/QEMU.',
    tech: ['Proxmox', 'KVM/QEMU', 'Cockpit', 'virt-manager', 'virsh', 'snapshoty'],
    outcome: 'Demo środowiska, pokaz zarządzania maszynami i ich odtwarzania ze snapshotów.',
  },
  {
    id: 2,
    title: 'Konteneryzacja małej usługi biznesowej',
    category: 'infra',
    difficulty: 'podstawowy',
    status: 'w realizacji',
    description:
      'Uruchomienie prostej usługi (panel webowy, interpreter Python) w odizolowanym kontenerze. Bezpieczne wydzielenie usługi i przygotowanie jej do powtarzalnego uruchamiania.',
    tech: ['Docker', 'Podman', 'Dockerfile', 'Docker Compose', 'Python', 'wolumeny'],
    outcome: 'Demonstracja działania usługi i uzasadnienie sensu konteneryzacji w małej firmie.',
  },
  {
    id: 3,
    title: 'Automatyczny build po zmianach w repozytorium',
    category: 'infra',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Produkcyjny pipeline CI/CD: serwer wykrywa zmianę w repo, pobiera kod, wykonuje build, uruchamia testy, robi backup poprzedniej wersji i wysyła powiadomienie o wyniku. Z rollbackiem.',
    tech: ['Git', 'Codeberg', 'webhooki', 'CI/CD', 'Ansible', 'Mattermost'],
    outcome: 'Pokaz pełnej drogi od commita do wdrożenia z backupem i rollbackiem.',
  },
  {
    id: 4,
    title: 'Prywatna chmura i własny office',
    category: 'infra',
    difficulty: 'podstawowy / średni',
    status: 'w realizacji',
    description:
      'Środowisko typu prywatna chmura: przechowywanie i współdzielenie plików, edycja dokumentów, praca zdalna jak w rozwiązaniach firmowych. Praktyczna usługa, nie „czysto informatyczna”.',
    tech: ['Nextcloud', 'OnlyOffice', 'reverse proxy', 'SSL/TLS', 'WebDAV'],
    outcome: 'Demo logowania, współdzielenia folderów i wspólnej edycji dokumentów.',
  },
  {
    id: 5,
    title: 'System backupu przyrostowego i odtwarzania',
    category: 'infra',
    difficulty: 'podstawowy / średni',
    status: 'rekrutacja',
    description:
      'Realny system kopii zapasowych z testowanym odtworzeniem po awarii, błędzie użytkownika lub nieudanej aktualizacji. Backup bez przetestowanego restore nie jest rozwiązaniem.',
    tech: ['Restic', 'BorgBackup', 'rsync', 'cron', 'szyfrowanie', 'retencja'],
    outcome: 'Pokaz wykonania kopii, odtworzenia danych i polityki retencji.',
  },
  {
    id: 6,
    title: 'Bezpieczny dostęp zdalny i sieć nakładkowa',
    category: 'infra',
    difficulty: 'podstawowy / średni',
    status: 'rekrutacja',
    description:
      'Bezpieczne łączenie urządzeń i usług przez Internet bez wystawiania wszystkiego na publiczny adres. Najczęściej wskazywany temat w ankietach uczestników (VPN / overlay networks).',
    tech: ['WireGuard', 'Tailscale', 'ZeroTier', 'DDNS', 'firewall', 'VPN'],
    outcome: 'Pokaz zdalnego dostępu do usługi, schemat sieci i analiza bezpieczeństwa.',
  },
  {
    id: 7,
    title: 'Automatyzacja Linuksa playbookami Ansible',
    category: 'infra',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Ansible nie tylko na serwerach: automatyzacja instalacji pakietów, konfiguracji użytkowników i usług w domu i małej firmie. Inventory, role, testy idempotencji.',
    tech: ['Ansible', 'playbooki', 'inventory', 'role', 'SSH', 'systemd'],
    outcome: 'Jedno polecenie konfigurujące całą maszynę lub grupę maszyn.',
  },
  {
    id: 8,
    title: 'Lokalny klaster Kubernetes i wdrożenie usługi',
    category: 'infra',
    difficulty: 'średni / zaawansowany',
    status: 'rekrutacja',
    description:
      'Uruchomienie prostego klastra i wdrożenie usług: deploymenty, service, ingress, konfiguracja YAML. Cel aspiracyjny dla większości grupy — dochodzimy do niego etapami.',
    tech: ['Kubernetes', 'k3s', 'kind', 'minikube', 'kubectl', 'YAML'],
    outcome: 'Działające wdrożenie, wyjaśnienie roli zasobów i demo zmiany wersji.',
  },
  {
    id: 9,
    title: 'Monitoring usług i reakcja na awarie',
    category: 'infra',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Infrastruktura to nie tylko uruchomienie, ale utrzymanie: zbieranie metryk, dashboardy, alerty i test awarii. Warstwa wspierająca pozostałe projekty koła.',
    tech: ['Prometheus', 'Grafana', 'exporters', 'alerty', 'dashboardy'],
    outcome: 'Pokaz dashboardu i reakcji na błąd lub przeciążenie usługi.',
  },
  {
    id: 10,
    title: 'Mini-platforma usługowa na urządzeniu ARM',
    category: 'infra',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Tania, energooszczędna baza dla małej infrastruktury: płytka ARM z usługami sieciowymi, dostępem zdalnym, backupami i monitoringiem. Opcja rozszerzająca, nie wymóg.',
    tech: ['ARM', 'Linux', 'Docker', 'reverse proxy', 'Nextcloud', 'monitoring'],
    outcome: 'Działająca platforma z omówieniem oszczędności energii i zastosowań.',
  },
  {
    id: 11,
    title: 'Własny serwer AI — lokalne modele lub API',
    category: 'ai-cyber',
    difficulty: 'podstawowy → zaawansowany',
    status: 'w realizacji',
    description:
      'Serwer udostępniający modele językowe przez interfejs i API: w pełni lokalny model (bez wysyłania danych na zewnątrz) albo kontrolowana brama do modeli API. Odpowiedź na najliczniejszą grupę AI/ML w kole (ok. 9 osób).',
    tech: ['Ollama', 'llama.cpp', 'Open WebUI', 'LiteLLM', 'RAG', 'Qdrant'],
    outcome: 'Demo asystenta/API, porównanie model lokalny vs API (prywatność, koszt, wydajność).',
  },
  {
    id: 12,
    title: 'Bezpieczny węzeł brzegowy — reverse proxy, TLS i WAF',
    category: 'ai-cyber',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Pojedynczy punkt wejścia chroniący usługi: terminacja TLS, kierowanie ruchu, rate limiting i blokowanie podejrzanych żądań. Uczciwa ocena granic małego sprzętu (Zero 2 W vs mocniejszy węzeł).',
    tech: ['Caddy', 'Traefik', 'Nginx', "Let's Encrypt", 'fail2ban', 'CrowdSec', 'WAF'],
    outcome: 'Demo bezpiecznego dostępu przez bramę i pokaz zablokowanego ruchu.',
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
  },
  {
    id: 14,
    title: 'Szyfrowanie danych i zarządzanie sekretami',
    category: 'ai-cyber',
    difficulty: 'średni',
    status: 'rekrutacja',
    description:
      'Ochrona danych w spoczynku i w przesyle oraz porządne zarządzanie hasłami i kluczami — zamiast trzymania ich w plikach konfiguracyjnych. Rozszerzenie: klucze sprzętowe, TPM, secure boot.',
    tech: ['LUKS', 'TLS', 'GnuPG', 'age', 'SOPS', 'Vault', 'YubiKey'],
    outcome: 'Pokaz danych nieczytelnych bez klucza i bezpiecznego pobrania sekretu przez aplikację.',
  },
  {
    id: 15,
    title: 'Rozproszone przechowywanie danych — IPFS i analiza prywatności',
    category: 'ai-cyber',
    difficulty: 'średni / zaawansowany',
    status: 'rekrutacja',
    description:
      'Krytyczna weryfikacja haseł „skrajnie prywatny” i „zero-knowledge”: publiczny IPFS nie jest prywatny — prywatność budujemy świadomie (szyfrowanie przed dodaniem, private swarm). Replikacja i erasure coding na małych węzłach.',
    tech: ['IPFS (Kubo)', 'swarm key', 'IPFS Cluster', 'age/GnuPG', 'erasure coding'],
    outcome: 'Demo odzyskania danych po utracie węzła i rzetelna ocena deklaracji prywatności.',
  },
  {
    id: 16,
    title: 'Laboratorium bezpieczeństwa — analiza ruchu i honeypot',
    category: 'ai-cyber',
    difficulty: 'podstawowy → zaawansowany',
    status: 'rekrutacja',
    description:
      'Bezpieczna piaskownica do obserwacji ruchu sieciowego i typowych ataków. Honeypot jako celowo wystawiona przynęta pozwala bezpiecznie zobaczyć próby nadużyć i nauczyć się czytać ruch.',
    tech: ['Wireshark', 'tcpdump', 'Suricata', 'Cowrie', 'Grafana', 'IDS'],
    outcome: 'Pokaz przechwyconego ruchu, zdarzeń z honeypota i wniosków o realnych zagrożeniach.',
  },
];

// --- Architektura VDI (repozytorium 04) ---
export interface VdiMetric {
  label: string;
  value: string;
  detail: string;
}

export const VDI_METRICS: VdiMetric[] = [
  { label: 'Czas klonowania Linked Clone', value: '1.8 s', detail: 'zamiast 5–10 min pełnego klonu' },
  { label: 'Miejsce na start', value: '0 MB', detail: 'Copy-on-Write na LVM-Thin / ZFS' },
  { label: 'Dostęp studenta', value: 'noVNC :6080', detail: 'bezklientowy pulpit HTML5 (XFCE)' },
  { label: 'Czysty stan po zajęciach', value: '--purge 1', detail: 'qm destroy — Zero Trust dla kolejnej grupy' },
];

export const VDI_PIPELINE: { step: string; cmd: string; desc: string }[] = [
  {
    step: 'Golden Image',
    cmd: 'qm importdisk 200 fedora44.qcow2 local-lvm',
    desc: 'Obraz Fedora Cloud Base + XFCE + noVNC, migawka nadrzędna, szablon tylko do odczytu.',
  },
  {
    step: 'Linked Clone',
    cmd: './deploy_qm_fast.sh  # lub terraform apply',
    desc: 'Klony dowiązane w 1.8 s, unikalne IP przez Cloud-Init (192.168.122.150+).',
  },
  {
    step: 'Clientless Access',
    cmd: 'http://192.168.122.150:6080/vnc.html',
    desc: 'Pełny pulpit XFCE i terminal w przeglądarce — działa na Windows, macOS, Linux i tablecie.',
  },
  {
    step: 'Teardown',
    cmd: 'qm destroy <vmid> --purge 1',
    desc: 'Natychmiastowe, fizyczne wyczyszczenie dysków po zajęciach — zero danych rezydualnych.',
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

// --- Telemetria hero ---
export const TELEMETRY = [
  { label: 'WĘZŁY KVM / PROXMOX', value: '3', unit: 'nody', accent: 'neon' as const },
  { label: 'KLONOWANIE VDI', value: '1.8', unit: 's', accent: 'cyanic' as const },
  { label: 'PROJEKTY W KATALOGU', value: '16', unit: 'ścieżek', accent: 'violet' as const },
  { label: 'FILARY AUDYTU', value: '5', unit: 'testów: 17', accent: 'neon' as const },
];

// --- Kontakt ---
export const CONTACT = {
  emails: ['nauczanie@pm.me', 'przemyslaw.zarnecki@wskz.pl'],
  materialsUrl: 'https://github.com/wskz-devops-lab/materialy-dydaktyczne',
  githubOrg: 'https://github.com/wskz-devops-lab',
  supervisor: 'Przemysław Żarnecki',
};
