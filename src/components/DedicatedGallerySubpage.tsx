'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, CheckCircle, Sparkles } from 'lucide-react'
import type { Artwork } from '@/data/artworks'

interface DedicatedGallerySubpageProps {
  category: 'lebenskunst' | 'portrait' | 'abstrakt' | 'anatomie' | 'epoxid'
  artworks: Artwork[]
  onSelectArtwork: (artwork: Artwork) => void
  onOpenInquiry: (artwork: Artwork) => void
}

const THEMES = {
  lebenskunst: {
    title: "Galerie Lebenskunst",
    subtitle: "24k Blattgold & Eichenholz-Objekte",
    badge: "Signatur-Serie N° 1",
    themeBg: "bg-gradient-to-br from-amber-950 via-zinc-950 to-amber-900/40",
    bannerBorder: "border-amber-500/50 shadow-amber-950/60",
    accentColor: "text-amber-400",
    gradientText: "bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent",
    cardBorder: "border-amber-500/30 hover:border-amber-400",
    cardBg: "bg-amber-950/30 backdrop-blur-md",
    btnStyle: "bg-amber-400 text-zinc-950 hover:bg-amber-300 font-bold",
    tagBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    description: "Philosophische Wandobjekte aus 24k Blattgold, historischem Eichenholz & altmeisterlicher Öl-Lasurtechnik.",
    stats: [
      { label: "Veredelung", val: "24k Echtes Blattgold" },
      { label: "Träger", val: "Historische Eiche" },
      { label: "Versiegelung", val: "UV-Resin & Lasur" }
    ],
    videoSrc: "/artworks/copy_88449E85-F23B-42BD-8C34-7DD1842C2E3B.MP4"
  },
  portrait: {
    title: "Galerie Öl-Portraitmalerei",
    subtitle: "Altmeisterliches Chiaroscuro & Lichtstudien",
    badge: "Klassische Öl-Kollektion",
    themeBg: "bg-gradient-to-br from-rose-950 via-zinc-950 to-red-950/40",
    bannerBorder: "border-rose-500/50 shadow-rose-950/60",
    accentColor: "text-rose-400",
    gradientText: "bg-gradient-to-r from-rose-200 via-rose-400 to-red-500 bg-clip-text text-transparent",
    cardBorder: "border-rose-500/30 hover:border-rose-400",
    cardBg: "bg-rose-950/30 backdrop-blur-md",
    btnStyle: "bg-rose-500 text-white hover:bg-rose-400 font-bold",
    tagBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    description: "Ausdrucksstarke Portraitmalerei auf feiner belgischer Leinwand. Fokus auf Lichtführung und emotionale Tiefe.",
    stats: [
      { label: "Technik", val: "Öl auf Leinwand" },
      { label: "Stil", val: "Chiaroscuro (Licht/Schatten)" },
      { label: "Schutz", val: "Museums-Firnis" }
    ],
    videoSrc: "/artworks/glam_video_magic.MP4"
  },
  abstrakt: {
    title: "Galerie Abstrakte Malerei",
    subtitle: "3D Blender Animationen & Farb-Konflikte",
    badge: "Digitale & Analoge Synthese",
    themeBg: "bg-gradient-to-br from-purple-950 via-zinc-950 to-indigo-950/40",
    bannerBorder: "border-purple-500/50 shadow-purple-950/60",
    accentColor: "text-purple-400",
    gradientText: "bg-gradient-to-r from-purple-200 via-purple-400 to-indigo-400 bg-clip-text text-transparent",
    cardBorder: "border-purple-500/30 hover:border-purple-400",
    cardBg: "bg-purple-950/30 backdrop-blur-md",
    btnStyle: "bg-purple-500 text-white hover:bg-purple-400 font-bold",
    tagBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    description: "Explosive Farbkompositionen zwischen digitaler 3D-Simulation und analogem Schichtauftrag.",
    stats: [
      { label: "Simulation", val: "Blender 3D Motion" },
      { label: "Medium", val: "Mischtechnik & Acryl" },
      { label: "Format", val: "Großformat-Leinwand" }
    ],
    videoSrc: "/artworks/FERTIGE_ANIMATION_Farben_Konflikt.mp4"
  },
  anatomie: {
    title: "Galerie Anatomie-Skizzen",
    subtitle: "Rötel, Sepia & Büttenpapier (A4 / A3)",
    badge: "Mappenkollektion HBK",
    themeBg: "bg-gradient-to-br from-stone-900 via-zinc-950 to-neutral-900",
    bannerBorder: "border-stone-400/50 shadow-stone-950/60",
    accentColor: "text-stone-300",
    gradientText: "bg-gradient-to-r from-stone-100 via-stone-300 to-zinc-300 bg-clip-text text-transparent",
    cardBorder: "border-stone-500/30 hover:border-stone-300",
    cardBg: "bg-stone-950/40 backdrop-blur-md",
    btnStyle: "bg-stone-300 text-zinc-950 hover:bg-white font-bold",
    tagBg: "bg-stone-500/20 text-stone-300 border-stone-400/40",
    description: "Klassische Proportions- und Gestenstudien nach dem lebenden Modell. Auf säurefreiem 300g Hahnemühle Büttenpapier.",
    stats: [
      { label: "Papier", val: "300g Hahnemühle Bütten" },
      { label: "Stift", val: "Rötel & Sepia-Kohle" },
      { label: "Formate", val: "A4 & A3 Mappenwerke" }
    ],
    videoSrc: "/artworks/Clip2Comic-2024-09-09-14-50-27.MP4"
  },
  epoxid: {
    title: "Galerie Epoxidharz & Resin",
    subtitle: "Harzwellen, Pigmente & Naturholz",
    badge: "Fluid Ocean Series",
    themeBg: "bg-gradient-to-br from-cyan-950 via-zinc-950 to-teal-950/40",
    bannerBorder: "border-cyan-500/50 shadow-cyan-950/60",
    accentColor: "text-cyan-400",
    gradientText: "bg-gradient-to-r from-cyan-200 via-cyan-400 to-teal-300 bg-clip-text text-transparent",
    cardBorder: "border-cyan-500/30 hover:border-cyan-400",
    cardBg: "bg-cyan-950/30 backdrop-blur-md",
    btnStyle: "bg-cyan-500 text-zinc-950 hover:bg-cyan-400 font-bold",
    tagBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    description: "Kristallklare Glanzgüsse mit flüssigen Pigmentströmen auf edlen Hölzern. UV-beständig veredelt.",
    stats: [
      { label: "Harz", val: "UV-Resin Kristallguss" },
      { label: "Holz", val: "Akazie & Nussbaum" },
      { label: "Effekt", val: "Tiefe Fluid-Zellen" }
    ],
    videoSrc: "/artworks/IMG_0244.MP4"
  }
}

export function DedicatedGallerySubpage({
  category,
  artworks,
  onSelectArtwork,
  onOpenInquiry
}: DedicatedGallerySubpageProps) {
  const theme = THEMES[category]
  const filtered = artworks.filter(a => a.category === category)

  return (
    <div className="space-y-10 py-4">
      {/* Subpage Distinct Hero Banner */}
      <div className={`${theme.themeBg} ${theme.bannerBorder} border p-8 md:p-12 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className={`font-mono text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${theme.tagBg} inline-block`}>
              {theme.badge}
            </span>
            <h2 className={`text-4xl md:text-6xl font-serif font-bold ${theme.gradientText} leading-tight drop-shadow-xl`}>
              {theme.title}
            </h2>
            <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed">
              {theme.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {theme.stats.map(s => (
                <div key={s.label} className="bg-zinc-950/70 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <span className="text-[11px] text-zinc-400 block font-medium">{s.label}</span>
                  <span className={`font-serif font-bold text-sm ${theme.accentColor}`}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subpage Video Feature Card */}
          <div className="w-full lg:w-96 aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative bg-zinc-950">
            <video
              src={theme.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider block">Live Animation Video-Loop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subpage Artwork Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${theme.accentColor}`} /> Werke dieser Galerie ({filtered.length})
            </h3>
            <p className="text-zinc-400 text-xs mt-1">Exklusive Einzelauswahl mit detaillierter Werkakte</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(art => (
            <motion.div
              key={art.id}
              whileHover={{ y: -4 }}
              className={`${theme.cardBg} ${theme.cardBorder} border rounded-2xl overflow-hidden transition-all shadow-2xl flex flex-col justify-between`}
            >
              <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => onSelectArtwork(art)}>
                {art.video ? (
                  <video src={art.video} loop muted autoPlay playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                )}
                
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] font-bold bg-zinc-950/90 text-amber-300 px-2.5 py-1 rounded border border-amber-500/40 shadow">
                    {art.wvNr}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border shadow ${
                    art.status === 'Verfügbar' ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40' :
                    art.status === 'Reserviert' ? 'bg-amber-950/90 text-amber-300 border-amber-500/40' :
                    'bg-zinc-900/90 text-zinc-400 border-zinc-700'
                  }`}>
                    {art.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-semibold ${theme.accentColor} uppercase tracking-widest`}>{art.year}</span>
                    <span className="text-xs text-zinc-400">{art.dimensions}</span>
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white mt-1 cursor-pointer hover:underline" onClick={() => onSelectArtwork(art)}>
                    {art.title}
                  </h4>
                  <p className="text-zinc-300 text-xs mt-1 font-light line-clamp-2">{art.medium}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-medium">Wert / Status</span>
                    <p className={`font-serif font-bold text-lg ${theme.accentColor}`}>{art.price}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectArtwork(art)}
                      className="px-3 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-all flex items-center gap-1"
                    >
                      <span>Werkakte</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenInquiry(art)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold ${theme.btnStyle} transition-all flex items-center gap-1 shadow-md`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Anfragen</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
