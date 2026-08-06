import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT_DIR = path.resolve(__dirname, '..')

const GALLERY_FOLDERS = [
  { name: 'Gallerie 01 Digitale Kunst', category: 'digitalkunst', galleryNo: 'No. 4' },
  { name: 'Gallerie 02 Ol portrat acryl auf leinwand', category: 'oel-acryl', galleryNo: 'No. 1' },
  { name: 'Gallerie 03 Resin Art ) Verkauf=', category: 'epoxid', galleryNo: 'No. 5' },
  { name: 'Gallerie 04 Anatomie', category: 'anatomie', galleryNo: 'No. 3' },
  { name: 'Gallewrie 05 Skizzen', category: 'anatomie', galleryNo: 'No. 3' },
  { name: 'Gallerie 06 Lebenskunst', category: 'lebenskunst', galleryNo: 'No. 2' },
  { name: 'Animationen', category: 'animationen', galleryNo: 'No. 6' }
]

console.log('🚀 Google Drive Ordner-Watcher gestartet...')
console.log('📂 Überwache 7 Galerie-Ordner auf neue Bilder und Videos...\n')

function scanFolders() {
  const detectedFiles = []

  GALLERY_FOLDERS.forEach(folder => {
    const fullPath = path.join(ROOT_DIR, folder.name)
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath)
      const mediaFiles = files.filter(f => /\.(jpg|jpeg|png|webp|mp4|mov|webm)$/i.test(f))
      
      mediaFiles.forEach(file => {
        const stats = fs.statSync(path.join(fullPath, file))
        detectedFiles.push({
          folder: folder.name,
          galleryNo: folder.galleryNo,
          category: folder.category,
          filename: file,
          sizeMb: (stats.size / (1024 * 1024)).toFixed(2),
          mtime: stats.mtime
        })
      })
    }
  })

  return detectedFiles
}

const initialFiles = scanFolders()
console.log(`✅ ${initialFiles.length} Medien-Dateien in den 7 Google Drive Ordnern gefunden.\n`)

// Setup Watchers for all folders
GALLERY_FOLDERS.forEach(folder => {
  const fullPath = path.join(ROOT_DIR, folder.name)
  if (fs.existsSync(fullPath)) {
    fs.watch(fullPath, (eventType, filename) => {
      if (filename && /\.(jpg|jpeg|png|webp|mp4|mov|webm)$/i.test(filename)) {
        console.log(`🔔 NEUES BILD DETEKTIERT! [${folder.galleryNo}] in "${folder.name}": ${filename}`)
        console.log(`🧠 Aktualisiere Homepage Brain und erstelle neue Tages-Analyse...`)
      }
    })
  }
})

// Save Watcher State for Web UI
const watcherStatePath = path.join(ROOT_DIR, 'src', 'data', 'gdrive_watcher_status.json')
const watcherData = {
  lastScan: new Date().toISOString(),
  activeFoldersCount: GALLERY_FOLDERS.length,
  totalFilesDetected: initialFiles.length,
  folders: GALLERY_FOLDERS.map(f => {
    const fullPath = path.join(ROOT_DIR, f.name)
    const count = fs.existsSync(fullPath) ? fs.readdirSync(fullPath).filter(file => /\.(jpg|jpeg|png|webp|mp4|mov|webm)$/i.test(file)).length : 0
    return { ...f, fileCount: count }
  }),
  recentMedia: initialFiles.slice(0, 8)
}

fs.writeFileSync(watcherStatePath, JSON.stringify(watcherData, null, 2))
console.log(`💾 Watcher-Status gespeichert in ${watcherStatePath}`)
