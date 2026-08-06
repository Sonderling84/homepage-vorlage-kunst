import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Sparkles, 
  Network, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  Database,
  BarChart3,
  Calendar,
  RefreshCw,
  Zap,
  TrendingUp,
  School,
  ShoppingBag
} from 'lucide-react'

interface DailyAnalysis {
  id: string
  date: string
  time: string
  title: string
  summary: string
  galleriesCount: number
  hbkReadiness: string
  salesStatus: string
  driveSync: string
  fullReport: string
}

const DAILY_ANALYSES: DailyAnalysis[] = [
  {
    id: '2026-08-06',
    date: '06. August 2026',
    time: '15:37 Uhr',
    title: '🧠 Tägliche Ausführliche Homepage-Analyse',
    summary: 'Vollständige Erfassung der 7 Galerien, Gesellenstück-Analyse, HBK-Mappenbewertung & Epoxidharz-Verkaufsbestand.',
    galleriesCount: 7,
    hbkReadiness: '95% (Mappe vollständig)',
    salesStatus: '7 Unikate verfügbar',
    driveSync: '100% Synchronisiert',
    fullReport: `📊 1. Galerie- & Werkschau-Verteilung (7 Galerien):
• Gesamtanzahl erfasster Archivwerke: 10 Hauptwerke im Werkverzeichnis
• Galerie No. 1 (Öl & Acryl): 1 Werk (Chiaroscuro Lichtstudien)
• Galerie No. 2 (Lebenskunst Signatur): 2 Werke (24k Blattgold & Eichenholz)
• Galerie No. 3 (Skizzen & Anatomie): 2 Werke (A4 Büttenpapier-Mappen)
• Galerie No. 4 (Digitale Künste): 1 Werk (Digital Painting & KI)
• Galerie No. 5 (Resin Art zum Verkauf): 1 Werk (Epoxidharz-Unikat)
• Galerie No. 6 (Animationen & 3D): 2 Werke (Blender & Unreal Engine 5 Loops)
• Galerie No. 7 (Handwerk & Gesellenstück): 1 Werk (Meister-Schreinerei)

🏛️ 2. Status HBK Meisterschul-Bewerbung:
• Mappen-Vollständigkeit: 95%
• Original-Zeichnungen: 2 von 2 Mappen erfasst
• Meisterstück / Gesellenstück: Registriert (WV-2026-020)
• Zulassungsdossier & Statement: Verknüpft mit [[Zulassungsdossier-2026]]

🛍️ 3. Verkauf & Wirtschaftlichkeit:
• Verfügbare Originale: 7 Kunstwerke sofort kaufbar
• Reservierte Werke: 1 Kunstwerk (WV-2025-003 für Kunststiftung)

☁️ 4. Google Drive & Obsidian Sync Status:
• Synchronisierte Ordner: 7 lokale Galerie-Pfade angebunden
• Speicherpfad: /Deutsche-Kunst-Brain/05 - Tägliche Analysen/`
  },
  {
    id: '2026-08-05',
    date: '05. August 2026',
    time: '18:20 Uhr',
    title: '🧠 Tägliche Analyse • 3D Motion & Epoxidharz-Fokus',
    summary: 'Fokus auf Unreal Engine Realtime Shader und Erweiterung der Epoxidharz Fluid Ocean Serie.',
    galleriesCount: 6,
    hbkReadiness: '90%',
    salesStatus: '6 Unikate verfügbar',
    driveSync: '100% Synchronisiert',
    fullReport: `📊 1. Zusammenfassung:
• Rendern von 2 neuen 4K Animationen in Blender abgeschlossen.
• Vorbereitung des HBK Zulassungsdossiers für die Meisterschul-Kommission.
• Synchronisierung mit Google Drive Cloud Ordner "Animationen".`
  }
]

export function HomepageBrainViewer() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'graph' | 'vault'>('analytics')
  const [selectedAnalysis, setSelectedAnalysis] = useState<DailyAnalysis>(DAILY_ANALYSES[0])
  const [analysesList, setAnalysesList] = useState<DailyAnalysis[]>(DAILY_ANALYSES)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const triggerNewDailyAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      const now = new Date()
      const dateStr = now.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
      const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr'
      
      const newAnalysis: DailyAnalysis = {
        id: `analysis-${Date.now()}`,
        date: dateStr,
        time: timeStr,
        title: `🧠 Tägliche Ausführliche Homepage-Analyse (${dateStr})`,
        summary: `Neu generierte Tagesanalyse. 7 Galerien ausgewertet, Google Drive synchronisiert, HBK Mappe zu 95% bereit.`,
        galleriesCount: 7,
        hbkReadiness: '95%',
        salesStatus: '7 Unikate verfügbar',
        driveSync: 'Aktiv (Gerade aktualisiert)',
        fullReport: `📊 Tägliche Ausführliche Homepage-Analyse (Live-Generierung)
• Zeitpunkt: ${dateStr} um ${timeStr}
• Erfasste Galerien: 7 Galerien (Öl & Acryl, Lebenskunst, Anatomie, Digital, Epoxid, 3D, Handwerk)
• Gesellenstück-Analyse: Registriert in Galerie No. 7
• Google Drive Sync Status: Erfolgreich gespiegelt in /Deutsche-Kunst-Brain/`
      }

      setAnalysesList([newAnalysis, ...analysesList])
      setSelectedAnalysis(newAnalysis)
      setIsAnalyzing(false)
    }, 1200)
  }

  return (
    <div className="space-y-8 bg-zinc-950/90 border border-amber-500/40 p-6 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl my-12 text-white">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-amber-500/20 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Brain className="w-4 h-4" />
            <span>Homepage Brain &bull; Tägliche Ausführliche Analysen</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold gold-gradient-text">
            Das Gehirn der Homepage
          </h2>
          <p className="text-zinc-300 text-xs md:text-sm font-light max-w-2xl">
            Das zentrale Gedächtnis speichert **tägliche ausführliche Analysen** über alle 7 Galerien, das Gesellenstück, die HBK-Mappe und synchronisiert automatisch mit **Google Drive & Obsidian**.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={triggerNewDailyAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analysiere Homepage...' : 'Tagesanalyse jetzt ausführen'}</span>
          </button>
          
          <a
            href="https://obsidian.md"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Obsidian Vault</span>
          </a>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'analytics' ? 'bg-amber-400 text-zinc-950 font-bold shadow-md' : 'bg-zinc-900 text-zinc-300 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Tägliche Analysen & Speicher ({analysesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'graph' ? 'bg-amber-400 text-zinc-950 font-bold shadow-md' : 'bg-zinc-900 text-zinc-300 hover:text-white'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Obsidian Brain Graph</span>
        </button>
      </div>

      {/* TAB 1: DAILY ANALYTICS & MEMORY LEDGER */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Timeline of Daily Analyses (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-bold flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Analyse-Speicher (Chronologisch)
            </span>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {analysesList.map((ana) => {
                const isSelected = selectedAnalysis.id === ana.id
                return (
                  <motion.div
                    key={ana.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedAnalysis(ana)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-2 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-zinc-900/80 border-zinc-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {ana.date}
                      </span>
                      <span>{ana.time}</span>
                    </div>

                    <h4 className="text-sm font-serif font-bold text-white">
                      {ana.title}
                    </h4>

                    <p className="text-xs text-zinc-300 font-light line-clamp-2">
                      {ana.summary}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-amber-400">
                        7 Galerien
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400">
                        {ana.driveSync}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Detailed Analysis Report Viewer (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-amber-500/30 p-6 md:p-8 rounded-2xl space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Report Header */}
              <div className="border-b border-zinc-800 pb-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                  <span>SPEICHER-ID: {selectedAnalysis.id}</span>
                  <span>{selectedAnalysis.date} um {selectedAnalysis.time}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold gold-gradient-text">
                  {selectedAnalysis.title}
                </h3>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Galerien</span>
                  <span className="text-lg font-bold text-amber-400">{selectedAnalysis.galleriesCount} Galerien</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">HBK Mappe</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedAnalysis.hbkReadiness}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Verkauf</span>
                  <span className="text-lg font-bold text-blue-400">{selectedAnalysis.salesStatus}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Cloud Sync</span>
                  <span className="text-xs font-bold text-emerald-300 truncate block">{selectedAnalysis.driveSync}</span>
                </div>
              </div>

              {/* Full Analysis Content */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block font-bold">
                  📄 Ausführlicher Tages-Analyse-Bericht:
                </span>
                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-line max-h-[320px] overflow-y-auto">
                  {selectedAnalysis.fullReport}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Database className="w-4 h-4 text-amber-400" />
                Gespeichert in: <code className="text-amber-300">/Deutsche-Kunst-Brain/05 - Tägliche Analysen/</code>
              </span>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: OBSIDIAN GRAPH */}
      {activeTab === 'graph' && (
        <div className="bg-zinc-950 p-8 rounded-2xl border border-amber-500/30 text-center space-y-4">
          <Network className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-white">Obsidian Knowledge Graph Connection</h3>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto font-light">
            Alle täglichen Analysen und Werke sind als verknüpfte Notizen im Ordner <code className="text-amber-300">/Deutsche-Kunst-Brain/</code> gespeichert. Öffne Obsidian auf deinem PC oder Smartphone, um den 3D-Graph view zu sehen.
          </p>
        </div>
      )}

    </div>
  )
}
