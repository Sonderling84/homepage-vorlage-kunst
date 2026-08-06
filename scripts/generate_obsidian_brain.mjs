import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')
const BRAIN_DIR = path.join(ROOT_DIR, 'Deutsche-Kunst-Brain')

// Ensure directory exists
if (!fs.existsSync(BRAIN_DIR)) {
  fs.mkdirSync(BRAIN_DIR, { recursive: true })
}

const subdirs = [
  '01 - 🎨 Werkverzeichnis',
  '02 - 🏛️ HBK Bewerbung',
  '03 - 🧪 Materialforschung',
  '04 - 📂 Google Drive Mappings',
  '.obsidian'
]

subdirs.forEach(dir => {
  const p = path.join(BRAIN_DIR, dir)
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
})

// Create Obsidian settings
fs.writeFileSync(
  path.join(BRAIN_DIR, '.obsidian', 'app.json'),
  JSON.stringify({ useMarkdownLinks: true, newLinkFormat: 'relative', showFrontmatter: true }, null, 2)
)

// Index MOC File
const indexContent = `# 🧠 Deutsche Kunst – Homepage Brain & Knowledge Vault

> **Zentrales Künstler-Hirn & Digital Garden** für das Werkverzeichnis, Google Drive Ordner, HBK-Bewerbung und Materialforschungen.

---

## 🗺️ Navigation & Maps of Content (MOC)

### 🎨 1. Die 7 Galerien & Werkverzeichnis
- [[01 - 🎨 Werkverzeichnis/WV-2026-001 - Lebenskunst N° 1|WV-2026-001 • Lebenskunst N° 1]]
- [[01 - 🎨 Werkverzeichnis/WV-2026-002 - Öl-Portrait Chiaroscuro|WV-2026-002 • Öl-Portrait Chiaroscuro]]
- [[01 - 🎨 Werkverzeichnis/WV-2026-003 - Anatomische Torsostudie|WV-2026-003 • Anatomische Torsostudie (A4 Mappe)]]
- [[01 - 🎨 Werkverzeichnis/WV-2026-009 - Epoxidharz Ocean Wave|WV-2026-009 • Epoxidharz Ocean Wave]]
- [[01 - 🎨 Werkverzeichnis/WV-2026-010 - Digitale Synthese KI Concept|WV-2026-010 • Digitale Synthese N° 1]]
- [[01 - 🎨 Werkverzeichnis/WV-2025-014 - Abstrakte 3D Simulation|WV-2025-014 • Farben Konflikt 3D]]
- [[01 - 🎨 Werkverzeichnis/WV-2026-020 - Das Gesellenstück|WV-2026-020 • Das Gesellenstück]]

---

### 🏛️ 2. Meisterschule & HBK Bewerbung
- [[02 - 🏛️ HBK Bewerbung/Zulassungsdossier-2026|Zulassungsdossier & Statement]]
- [[02 - 🏛️ HBK Bewerbung/Mappenaufsatz-Anatomie-Skizzen|Mappenaufsatz: Skizzen & Proportionslehre]]
- [[02 - 🏛️ HBK Bewerbung/Meisterschul-Manifest|Manifest der bildenden Künste]]

---

### 🧪 3. Materialforschung & Techniken
- [[03 - 🧪 Materialforschung/24k Blattgold & Eichenholz|24k Echtes Blattgold & Historische Eiche]]
- [[03 - 🧪 Materialforschung/Altmeisterliche Öl-Schichtmalerei|Altmeisterliche Öl- & Acrylschichttechnik]]
- [[03 - 🧪 Materialforschung/UV-Resin & Ocean Pigments|UV-Resin Epoxidharzguss]]
- [[03 - 🧪 Materialforschung/Unreal Engine & Blender 3D|Unreal Engine 5 & Blender Motion Graphics]]
- [[03 - 🧪 Materialforschung/Meister-Schreinerei & Holzverbindungen|Traditionelle Schreinerei & Holzverbindungen]]

---

### 📂 4. Google Drive Ordner-Synchronsystem
- [[04 - 📂 Google Drive Mappings/Google-Drive-Galerien-Index|Ordnerstruktur Google Drive Cloud & Lokal]]

---

## 🏷️ Tags & Metadaten-Index
#werkverzeichnis #lebenskunst #blattgold #oel-acryl #anatomie #digitalkunst #epoxidharz #unreal-engine #handwerk #hbk-bewerbung
`

fs.writeFileSync(path.join(BRAIN_DIR, '00 - 🧠 Homepage Brain Index.md'), indexContent)

// Create HBK Note
const hbkContent = `---
type: hbk-dossier
status: eingereicht
ziel: HBK Bildende Künste Meisterschule
tags:
  - hbk-bewerbung
  - zulassung
  - meisterschule
---

# 🏛️ Offizielles Zulassungsdossier – HBK Bildende Künste

## Künstlerisches Statement
> "Die Synthese aus altmeisterlicher Handwerkskunst (24k Blattgold, Schwerleinwand, Zinkenverbindungen) und zukunftsweisenden 3D-Realtime-Environments (Unreal Engine 5)."

### Eingereichte Werke & Mappenabschnitte:
1. [[01 - 🎨 Werkverzeichnis/WV-2026-001 - Lebenskunst N° 1|WV-2026-001 • Lebenskunst N° 1]]
2. [[01 - 🎨 Werkverzeichnis/WV-2026-003 - Anatomische Torsostudie|WV-2026-003 • Anatomie-Skizze]]
3. [[01 - 🎨 Werkverzeichnis/WV-2026-020 - Das Gesellenstück|WV-2026-020 • Das Gesellenstück]]
4. [[03 - 🧪 Materialforschung/Unreal Engine & Blender 3D|Unreal Engine 3D Environment Loop]]
`
fs.writeFileSync(path.join(BRAIN_DIR, '02 - 🏛️ HBK Bewerbung', 'Zulassungsdossier-2026.md'), hbkContent)

// Create Google Drive Mapping Note
const gdriveContent = `---
type: gdrive-sync
service: Google Drive Desktop Client
sync_path: "c:\\Users\\Home\\Desktop\\Homepae Vorlage kunst"
tags:
  - gdrive
  - cloud-sync
  - backup
---

# 📂 Google Drive Ordner-Synchronsystem

Die lokalen Kunstordner sind direkt mit Google Drive synchronisiert und bilden die Datenbasis für die Homepage:

- 📁 \`Gallerie 01 Digitale Kunst\` &rarr; Galerie No. 4
- 📁 \`Gallerie 02 Ol portrat acryl auf leinwand\` &rarr; Galerie No. 1
- 📁 \`Gallerie 03 Resin Art ) Verkauf=\` &rarr; Galerie No. 5
- 📁 \`Gallerie 04 Anatomie\` &rarr; Galerie No. 3
- 📁 \`Gallewrie 05 Skizzen\` &rarr; Galerie No. 3
- 📁 \`Gallerie 06 Lebenskunst\` &rarr; Galerie No. 2
- 📁 \`Animationen\` &rarr; Galerie No. 6
- 📁 \`Deutsche-Kunst-Brain\` &rarr; **Obsidian Vault (Google Drive Brain Sync)**
`
fs.writeFileSync(path.join(BRAIN_DIR, '04 - 📂 Google Drive Mappings', 'Google-Drive-Galerien-Index.md'), gdriveContent)

// Create Material Notes
const mat1 = `---
material: 24k Blattgold & Eichenholz
kategorie: lebenskunst
tags:
  - blattgold
  - eichenholz
  - veredelung
---

# 🧪 Materialstudie: 24k Echtes Blattgold & Historische Eiche

Altmeisterliche Anschusstechnik mit Mixtion auf historischem Eichenholz. Versiegelt mit transparentem UV-Schutzharz.

Verknüpfte Werke:
- [[01 - 🎨 Werkverzeichnis/WV-2026-001 - Lebenskunst N° 1|WV-2026-001 • Lebenskunst N° 1]]
`
fs.writeFileSync(path.join(BRAIN_DIR, '03 - 🧪 Materialforschung', '24k Blattgold & Eichenholz.md'), mat1)

console.log('✅ Obsidian Brain Vault (Deutsche-Kunst-Brain) successfully created and linked!')
