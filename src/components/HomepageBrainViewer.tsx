import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  FolderGit2, 
  Sparkles, 
  Network, 
  FileText, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  BookOpen,
  Layers,
  School,
  Database
} from 'lucide-react'

interface BrainNode {
  id: string
  title: string
  category: string
  tags: string[]
  content: string
  links: string[]
}

const BRAIN_NODES: BrainNode[] = [
  {
    id: 'index',
    title: '00 - 🧠 Homepage Brain Index',
    category: 'zentral',
    tags: ['#brain-index', '#sitemap', '#mocs'],
    content: 'Zentrales Hirn der Homepage. Verknüpft alle 7 Galerien, Google Drive Ordner, HBK-Bewerbungsunterlagen und Materialforschungen.',
    links: ['wv-001', 'hbk-dossier', 'material-blattgold', 'gdrive-sync']
  },
  {
    id: 'wv-001',
    title: 'WV-2026-001 • Lebenskunst N° 1',
    category: 'lebenskunst',
    tags: ['#wv', '#lebenskunst', '#blattgold', '#eichenholz'],
    content: 'Signaturwerk der Serie "Lebenskunst". 24k echtes Blattgold auf historischem Eichenholz mit fließender Epoxidharz-Veredelung.',
    links: ['material-blattgold', 'hbk-dossier']
  },
  {
    id: 'wv-002',
    title: 'WV-2026-002 • Öl-Portrait Chiaroscuro',
    category: 'oel-acryl',
    tags: ['#wv', '#oel-acryl', '#chiaroscuro', '#leinwand'],
    content: 'Fertiges Gemälde auf fein strukturierter belgischer Schwerleinwand in altmeisterlicher Öl- und Acrylschichttechnik.',
    links: ['material-oel', 'index']
  },
  {
    id: 'wv-003',
    title: 'WV-2026-003 • Anatomische Torsostudie',
    category: 'anatomie',
    tags: ['#wv', '#anatomie', '#roetel', '#buettenpapier'],
    content: 'Originale Handzeichnung aus den Google Drive Mappen. Rötel & Sepiakohle auf 300g Hahnemühle Büttenpapier.',
    links: ['hbk-dossier', 'gdrive-sync']
  },
  {
    id: 'wv-007',
    title: 'WV-2026-020 • Das Gesellenstück',
    category: 'handwerk',
    tags: ['#wv', '#handwerk', '#gesellenstueck', '#eichenholz'],
    content: 'Offizielles Gesellenstück. Traditionelle Zinken- und Zapfenverbindungen, Meister-Schreinerei & Massivholz-Passungen.',
    links: ['material-schreinerei', 'hbk-dossier']
  },
  {
    id: 'hbk-dossier',
    title: 'Zulassungsdossier 2026 • HBK Meisterschule',
    category: 'hbk',
    tags: ['#hbk-bewerbung', '#zulassung', '#meisterschule'],
    content: 'Offizielles Mappenkonzept und künstlerisches Statement zur Synthese aus traditionellem Kunsthandwerk & Realtime 3D Shader.',
    links: ['wv-001', 'wv-003', 'wv-007', 'index']
  },
  {
    id: 'material-blattgold',
    title: 'Materialstudie: 24k Blattgold & Eiche',
    category: 'material',
    tags: ['#material', '#blattgold', '#veredelung'],
    content: 'Altmeisterliche Anschusstechnik mit Mixtion auf historischer Eiche. Dauerhaft versiegelt mit UV-Kristallharz.',
    links: ['wv-001', 'index']
  },
  {
    id: 'gdrive-sync',
    title: 'Google Drive Ordner-Synchronsystem',
    category: 'system',
    tags: ['#gdrive', '#cloud-sync', '#obsidian-vault'],
    content: 'Automatische Spiegelung aller local gallery folders (Gallerie 01 - 06, Animationen) mit dem Google Drive Cloud-Brain.',
    links: ['index', 'wv-003']
  }
]

export function HomepageBrainViewer() {
  const [selectedNode, setSelectedNode] = useState<BrainNode>(BRAIN_NODES[0])
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredNodes = activeTag 
    ? BRAIN_NODES.filter(n => n.tags.includes(activeTag))
    : BRAIN_NODES

  return (
    <div className="space-y-8 bg-zinc-950/90 border border-amber-500/40 p-6 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl my-12 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-amber-500/20 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Brain className="w-4 h-4" />
            <span>Obsidian &bull; Google Drive Homepage Brain</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold gold-gradient-text">
            Das Künstlerin- & Portfolio-Hirn (Digital Garden)
          </h2>
          <p className="text-zinc-300 text-xs md:text-sm font-light max-w-2xl">
            Ein vernetztes Wissen-Graph-System in **Obsidian Markdown**, direkt synchronisiert mit den lokalen **Google Drive Galerie-Ordnern**.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://obsidian.md"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>In Obsidian öffnen</span>
          </a>
          <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Drive Sync: Aktiv</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Graph Nodes & Content Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Knowledge Graph Nodes (8 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400/90 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Network className="w-3.5 h-3.5" /> Obsidian Graph Network ({filteredNodes.length} Notizen)
            </span>
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="text-[11px] text-zinc-400 hover:text-white underline font-mono"
              >
                Filter zurücksetzen
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id
              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-2.5 ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-amber-500/20">
                      {node.category}
                    </span>
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  
                  <h4 className="text-sm font-semibold text-white font-serif line-clamp-1">
                    {node.title}
                  </h4>
                  
                  <p className="text-xs text-zinc-400 font-light line-clamp-2">
                    {node.content}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {node.tags.map(t => (
                      <span 
                        key={t}
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTag(t)
                        }}
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                          activeTag === t ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400 hover:text-amber-300'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Note Reader & Wikilink Explorer (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-900/90 border border-amber-500/30 p-6 rounded-2xl space-y-5 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Notiz-Leser & Wikilinks
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                .md Format
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-amber-300">
                {selectedNode.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tags.map(t => (
                  <span key={t} className="text-[10px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-line">
              {selectedNode.content}
            </div>

            {/* Linked Notes (Obsidian [[Wikilinks]]) */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                 Verknüpfte Wikilinks ([[...]]):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedNode.links.map(linkId => {
                  const target = BRAIN_NODES.find(n => n.id === linkId)
                  if (!target) return null
                  return (
                    <button
                      key={linkId}
                      onClick={() => setSelectedNode(target)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-400 hover:text-zinc-950 text-xs font-mono transition-all flex items-center gap-1"
                    >
                      <span>[[{target.title.split('•')[0].trim()}]]</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sync Status Footer */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              Pfad: <code className="text-zinc-200 text-[10px]">/Deutsche-Kunst-Brain/</code>
            </span>
            <span className="text-emerald-400 font-bold">Synced</span>
          </div>
        </div>

      </div>
    </div>
  )
}
