import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Sun, 
  Droplets, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  Maximize2,
  Info,
  Award,
  Layers,
  Ruler,
  FileCheck,
  Bookmark,
  MapPin
} from 'lucide-react'
import { type Artwork } from '@/data/artworks'

interface ArtworkDetailPageProps {
  artwork: Artwork
  onBack: () => void
  onInquire: (artwork: Artwork) => void
}

export function ArtworkDetailPage({ artwork, onBack, onInquire }: ArtworkDetailPageProps) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'archive' | 'materials' | 'care' | 'shipping'>('details')

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto space-y-8 py-4"
    >
      {/* Top Breadcrumb & Archive Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-amber-300 text-xs font-semibold transition-colors bg-zinc-950 px-3.5 py-2 rounded-lg border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zum Werkverzeichnis / Archiv</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-amber-400/90 font-bold bg-zinc-950 px-3 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
            {artwork.wvNr}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-950 px-3 py-2 rounded-lg border border-white/10 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{copiedLink ? 'Link kopiert!' : 'Werkakte teilen'}</span>
          </button>
        </div>
      </div>

      {/* Main Subpage Hero Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Large High-Res Artwork Visual */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-amber-500/30 shadow-2xl group">
            {artwork.video ? (
              <video src={artwork.video} loop autoPlay muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
            )}
            
            <div className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Werkakten-Archiv &bull; {artwork.wvNr}
            </div>

            <div className="absolute bottom-4 right-4 bg-zinc-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-zinc-300 border border-white/10 flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" /> Original Atelier-Fotografie
            </div>
          </div>

          {/* Quick Specs Overview */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-white/10 space-y-1">
              <Bookmark className="w-4 h-4 text-amber-400 mx-auto" />
              <p className="font-bold text-white">WV-Nummer</p>
              <p className="text-[11px] text-amber-300 font-mono">{artwork.wvNr}</p>
            </div>
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-white/10 space-y-1">
              <MapPin className="w-4 h-4 text-amber-400 mx-auto" />
              <p className="font-bold text-white">Standort</p>
              <p className="text-[10px] text-zinc-400 truncate">{artwork.location}</p>
            </div>
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-white/10 space-y-1">
              <Award className="w-4 h-4 text-amber-400 mx-auto" />
              <p className="font-bold text-white">Zertifikat</p>
              <p className="text-[10px] text-emerald-400">Handgezeichnet</p>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Comprehensive Specifications & Purchase Box */}
        <div className="lg:col-span-5 bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${
                artwork.status === 'Verfügbar' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' :
                artwork.status === 'Reserviert' ? 'bg-amber-950 text-amber-300 border-amber-500/40' :
                'bg-zinc-900 text-zinc-400 border-zinc-700'
              }`}>
                {artwork.status}
              </span>
              <span className="text-xs text-zinc-400 font-mono">Entstehung: {artwork.year}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">{artwork.title}</h1>
            <p className="text-amber-400/90 text-xs font-semibold uppercase tracking-wider">{artwork.medium}</p>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-zinc-500 uppercase font-medium">Atelierpreis / Wertschätzung</span>
              <span className="text-3xl font-serif font-bold text-amber-300">{artwork.price}</span>
            </div>

            {artwork.status === 'Verfügbar' ? (
              <button
                onClick={() => onInquire(artwork)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold py-3.5 rounded-xl text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>Kaufanfrage stellen / Unikat reservieren</span>
              </button>
            ) : (
              <button
                onClick={() => onInquire(artwork)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 font-semibold py-3.5 rounded-xl text-sm transition-all text-center"
              >
                Ähnliche Auftragsarbeit nach Maß anfragen
              </button>
            )}
          </div>

          {/* Quick Features List */}
          <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-zinc-300">
            <div className="flex items-center justify-between py-1.5 border-b border-zinc-900">
              <span className="text-zinc-500 flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-amber-400" /> Abmessungen:</span>
              <span className="font-semibold text-white">{artwork.dimensions}</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-zinc-900">
              <span className="text-zinc-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Verbleib / Standort:</span>
              <span className="font-semibold text-amber-300">{artwork.location}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-zinc-500 flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-amber-400" /> Echtheitszertifikat:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Inklusive & Signiert
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Subpage Material & Technical Tabs */}
      <div className="bg-zinc-950 rounded-2xl border border-white/10 p-6 md:p-8 space-y-6">
        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'details' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900'}`}
          >
            <Info className="w-3.5 h-3.5" /> Werkbeschreibung & Konzept
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'archive' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900'}`}
          >
            <FileCheck className="w-3.5 h-3.5" /> Werkverzeichnis & Provenienz
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'materials' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900'}`}
          >
            <Layers className="w-3.5 h-3.5" /> Material- & Technik-Analyse
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'care' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900'}`}
          >
            <Sun className="w-3.5 h-3.5" /> Konservierung & Pflege
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'shipping' ? 'bg-amber-400 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900'}`}
          >
            <Truck className="w-3.5 h-3.5" /> Kunstversand & Handhabung
          </button>
        </div>

        {/* Tab Content: Details */}
        {activeTab === 'details' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-amber-300">Konzept & Ausführung</h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              {artwork.description}
            </p>
          </div>
        )}

        {/* Tab Content: Archive */}
        {activeTab === 'archive' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-xl font-serif font-bold text-amber-300">Archivakte {artwork.wvNr}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-500 uppercase font-semibold">Werkverzeichnis-ID:</span>
                <p className="font-mono text-sm text-white font-bold">{artwork.wvNr}</p>
              </div>
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-500 uppercase font-semibold">Ausstellungshistorie & Provenienz:</span>
                <p className="text-zinc-300">{artwork.provenance || "Atelierbestand seit Entstehung."}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Materials */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 space-y-2">
              <h4 className="font-serif font-bold text-white text-sm">Materialität & Farbpigmente</h4>
              <ul className="space-y-1.5 text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> {artwork.medium}</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Lichtechte Pigmente höchster Güteklasse</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Content: Care */}
        {activeTab === 'care' && (
          <div className="space-y-3 text-xs text-zinc-300">
            <h4 className="font-serif font-bold text-amber-300 text-sm">Konservierungshinweise</h4>
            <p className="leading-relaxed">
              {artwork.careInstructions || "Staubfrei und vor extremer Feuchtigkeit geschützt lagern."}
            </p>
          </div>
        )}

        {/* Tab Content: Shipping */}
        {activeTab === 'shipping' && (
          <div className="space-y-3 text-xs text-zinc-300">
            <h4 className="font-serif font-bold text-amber-300 text-sm">Sicherer Kunsttransport</h4>
            <p className="leading-relaxed">
              {artwork.shipping}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
