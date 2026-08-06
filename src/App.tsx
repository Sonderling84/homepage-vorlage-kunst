import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Code2,
  Copy,
  Check,
  GraduationCap,
  ArrowRight,
  UserCheck,
  BookOpen,
  FileCheck,
  PenTool,
  User,
  HeartHandshake,
  School,
  FileText,
  Printer,
  Award,
  Maximize2,
  Search,
  Video,
  Play,
  RotateCw,
  Sun,
  Globe,
  Tv,
  Menu,
  Brain
} from 'lucide-react'
import { DynamicFrameLayout } from '@/components/ui/dynamic-frame-layout'
import { ParallaxComponent } from '@/components/ui/parallax-scrolling'
import { AsciiPixelFilter } from '@/components/ui/ascii-pixel-filter'
import { FlipGallery } from '@/components/ui/flip-gallery'
import { HomepageBrainViewer } from '@/components/HomepageBrainViewer'
import { ARTWORKS_DATA, type Artwork } from '@/data/artworks'
import { ArtworkDetailPage } from '@/components/ArtworkDetailPage'
import { DedicatedGallerySubpage } from '@/components/DedicatedGallerySubpage'

// 7 Numbered Galleries mapping to exact user specifications
const HERO_ANIMATION_PLAYLIST: {
  title: string
  url: string
  category: 'oel-acryl' | 'lebenskunst' | 'anatomie' | 'digitalkunst' | 'epoxid' | 'animationen' | 'handwerk'
  label: string
}[] = [
  {
    title: "1. Öl & Acryl fertig auf Leinwand 🎨",
    url: "/artworks/glam_video_magic.MP4",
    category: "oel-acryl",
    label: "Fertig vollendete Leinwandgemälde"
  },
  {
    title: "2. Lebenskunst Signatur 🌟",
    url: "/artworks/copy_88449E85-F23B-42BD-8C34-7DD1842C2E3B.MP4",
    category: "lebenskunst",
    label: "24k Blattgold, Eichenholz & Lasur"
  },
  {
    title: "3. Skizzen & Anatomie ✏️",
    url: "/artworks/Clip2Comic-2024-09-09-14-50-27.MP4",
    category: "anatomie",
    label: "Handzeichnungen (A4 / A3 Mappen)"
  },
  {
    title: "4. Digitale Künste 💻",
    url: "/artworks/2D96E6D8-5A37-41E1-B049-974A0D558076.mp4",
    category: "digitalkunst",
    label: "Digital Painting, KI & Concept Art"
  },
  {
    title: "5. Resin Art (Werke zum Verkauf) 🌊",
    url: "/artworks/IMG_0244.MP4",
    category: "epoxid",
    label: "Resin Art Epoxidharz (Zum Verkauf)"
  },
  {
    title: "6. Animationen, 3D & Unreal Engine 🎬",
    url: "/artworks/FERTIGE_ANIMATION_Farben_Konflikt.mp4",
    category: "animationen",
    label: "3D Motion, Blender & Realtime 3D"
  },
  {
    title: "7. Handwerkliche Kunst & Gesellenstück 🪵",
    url: "/artworks/copy_88449E85-F23B-42BD-8C34-7DD1842C2E3B.MP4",
    category: "handwerk",
    label: "Traditionelle Meister-Schreinerei"
  }
]

export function App() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'oel-acryl' | 'lebenskunst' | 'anatomie' | 'digitalkunst' | 'epoxid' | 'animationen' | 'handwerk'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [viewingSubpage, setViewingSubpage] = useState<Artwork | null>(null)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [showFrames, setShowFrames] = useState(false)
  const [copiedIntegration, setCopiedIntegration] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'gallery' | 'archive' | 'galerie-oel-acryl' | 'galerie-lebenskunst' | 'galerie-anatomie' | 'galerie-digitalkunst' | 'galerie-epoxid' | 'galerie-animationen' | 'galerie-handwerk' | 'hbk' | 'commissions' | 'about' | 'integration' | 'brain'>('gallery')
  
  // Video Playlist Auto-Rotation State (Rotates every 45 seconds)
  const [videoIndex, setVideoIndex] = useState(0)
  const [isAutoRotate, setIsAutoRotate] = useState(true)
  
  // Background Brightness Control State ('bright' | 'ultra' | 'vibrant')
  const [backgroundMode, setBackgroundMode] = useState<'ultra' | 'vibrant' | 'balanced'>('ultra')

  // Retro ASCII & Pixel Filter Effect State ('none' | 'ascii' | 'pixel' | 'matrix')
  const [filterMode, setFilterMode] = useState<'none' | 'ascii' | 'pixel' | 'matrix'>('none')

  const selectAnimationGallery = (idx: number) => {
    setVideoIndex(idx)
    setIsAutoRotate(false)
    setActiveCategory(HERO_ANIMATION_PLAYLIST[idx].category)
  }

  // 45-second automatic video rotation timer
  useEffect(() => {
    if (!isAutoRotate) return
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % HERO_ANIMATION_PLAYLIST.length)
    }, 45000)
    return () => clearInterval(interval)
  }, [isAutoRotate])

  const currentHeroVideo = HERO_ANIMATION_PLAYLIST[videoIndex].url

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    artworkTitle: ''
  })

  // Handle URL hashes or direct subpage opening
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#artwork-')) {
        const id = parseInt(hash.replace('#artwork-', ''), 10)
        const found = ARTWORKS_DATA.find(a => a.id === id)
        if (found) setViewingSubpage(found)
      } else {
        setViewingSubpage(null)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const openSubpage = (art: Artwork) => {
    setViewingSubpage(art)
    window.location.hash = `#artwork-${art.id}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeSubpage = () => {
    setViewingSubpage(null)
    window.location.hash = ''
  }

  // Filter artworks by Category AND Search Query
  const filteredArtworks = ARTWORKS_DATA.filter(art => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch = !q || (
      art.wvNr.toLowerCase().includes(q) ||
      art.title.toLowerCase().includes(q) ||
      art.medium.toLowerCase().includes(q) ||
      art.year.includes(q) ||
      art.status.toLowerCase().includes(q)
    )
    return matchesCategory && matchesSearch
  })

  // Map to frame structure for DynamicFrameLayout
  const frames = filteredArtworks.map(art => ({
    id: art.id,
    video: art.video,
    image: art.image,
    title: `${art.wvNr}: ${art.title}`,
    medium: art.medium,
    price: art.price,
    status: art.status,
    dimensions: art.dimensions,
    year: art.year,
    description: art.description,
    defaultPos: art.defaultPos,
    mediaSize: art.mediaSize,
    corner: showFrames ? "https://static.cdn-luma.com/files/58ab7363888153e3/Corner.png" : undefined,
    edgeHorizontal: showFrames ? "https://static.cdn-luma.com/files/58ab7363888153e3/EdgeHorizontal.png" : undefined,
    edgeVertical: showFrames ? "https://static.cdn-luma.com/files/58ab7363888153e3/EdgeVertical.png" : undefined,
    borderThickness: showFrames ? 16 : 0,
    borderSize: showFrames ? 92 : 100
  }))

  const handleSelectFrame = (frame: any) => {
    const originalArt = ARTWORKS_DATA.find(a => a.id === frame.id)
    if (originalArt) {
      openSubpage(originalArt)
    }
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInquirySubmitted(true)
    setTimeout(() => {
      setInquirySubmitted(false)
      setShowInquiryForm(false)
    }, 2500)
  }

  const copyCodeSnippet = () => {
    const code = `<div id="homepage-tab-kunst">
  <!-- Integration der Kunst-Sektion in deine Hauptwebsite -->
  <iframe src="https://deine-domain.de/kunst" style="width:100%; height:950px; border:none;"></iframe>
</div>`
    navigator.clipboard.writeText(code)
    setCopiedIntegration(true)
    setTimeout(() => setCopiedIntegration(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#060709] text-slate-100 font-sans selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      
      {/* SUPER BRIGHT FULL-BLEED FULL BACKGROUND MP4 VIDEO ANIMATION */}
      <div className="absolute top-0 left-0 w-full h-[900px] md:h-[1050px] overflow-hidden pointer-events-none z-0">
        {filterMode === 'none' ? (
          <video
            key={currentHeroVideo}
            src={currentHeroVideo}
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-all duration-1000 scale-105 ${
              backgroundMode === 'ultra' ? 'opacity-95 filter brightness-125 contrast-110 saturate-150 mix-blend-screen' :
              backgroundMode === 'vibrant' ? 'opacity-85 filter brightness-115 saturate-135 mix-blend-screen' :
              'opacity-65 filter brightness-105 saturate-110 mix-blend-screen'
            }`}
          />
        ) : (
          <AsciiPixelFilter mode={filterMode} videoSrc={currentHeroVideo} className="w-full h-full opacity-95" />
        )}
        {/* Ultra-light subtle gradient overlay so open spaces stay brilliantly bright */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          backgroundMode === 'ultra' ? 'bg-gradient-to-b from-black/10 via-black/25 to-[#060709]' :
          backgroundMode === 'vibrant' ? 'bg-gradient-to-b from-zinc-950/25 via-zinc-950/45 to-[#060709]' :
          'bg-gradient-to-b from-zinc-950/50 via-zinc-950/70 to-[#060709]'
        }`} />
      </div>

      {/* Top Bar Banner - HBK & Meisterschule Focus */}
      <header className="relative z-40 bg-zinc-950/80 backdrop-blur-md border-b border-amber-500/20 text-xs py-2 px-4 text-center flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-300 mx-auto sm:mx-0">
          <School className="w-4 h-4 text-amber-400" />
          <span className="font-semibold">Offizielle Bewerbung HBK (Hochschule für Bildende Künste) &bull; Mappe & Portfolio</span>
          <span className="hidden md:inline text-zinc-400">| Deutscher Künstler (geb. 1984)</span>
        </div>
        <button 
          onClick={() => setActiveTab('integration')}
          aria-label="Tab in Website einbinden Anleitung"
          className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition-colors text-xs font-semibold px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800"
        >
          <Code2 className="w-3.5 h-3.5 text-amber-400" />
          Tab in deine Website einbinden
        </button>
      </header>

      {/* Main Navigation Header */}
      <nav className="sticky top-0 z-40 bg-zinc-950/75 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={closeSubpage}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-zinc-950 font-serif text-xl font-bold shadow-lg shadow-amber-500/20">
              K
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif tracking-wide font-bold gold-gradient-text drop-shadow">
                DEUTSCHE KUNST
              </h1>
              <p className="text-[11px] text-zinc-400 font-light tracking-widest uppercase">
                Künstler-Archiv & Werkverzeichnis (geb. 1984)
              </p>
            </div>
          </div>
          
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-400 hover:text-white transition-all focus:outline-none"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Nav Tabs (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-xs font-medium">
            <button
              onClick={() => {
                closeSubpage()
                setActiveTab('gallery')
              }}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === 'gallery' && !viewingSubpage ? 'bg-amber-400 text-zinc-950 font-semibold shadow-md' : 'text-zinc-300 hover:text-white'}`}
            >
              Werkschau & Katalog
            </button>
            <button
              onClick={() => {
                closeSubpage()
                setActiveTab('hbk')
              }}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${activeTab === 'hbk' ? 'bg-amber-400 text-zinc-950 font-bold shadow-md' : 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/20'}`}
            >
              <School className="w-3.5 h-3.5" />
              <span>Bewerbung HBK</span>
            </button>
            <button
              onClick={() => {
                closeSubpage()
                setActiveTab('commissions')
              }}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === 'commissions' ? 'bg-amber-400 text-zinc-950 font-semibold shadow-md' : 'text-zinc-300 hover:text-white'}`}
            >
              Auftragsarbeiten nach Maß
            </button>
            <button
              onClick={() => {
                closeSubpage()
                setActiveTab('archive')
              }}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === 'archive' ? 'bg-amber-400 text-zinc-950 font-semibold shadow-md' : 'text-zinc-300 hover:text-white'}`}
            >
              Werkverzeichnis
            </button>
            <button
              onClick={() => {
                closeSubpage()
                setActiveTab('about')
              }}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === 'about' ? 'bg-amber-400 text-zinc-950 font-semibold shadow-md' : 'text-zinc-300 hover:text-white'}`}
            >
              Künstler & Vita
            </button>
            <button
              onClick={() => {
                closeSubpage()
                setActiveTab('integration')
              }}
              className={`px-4 py-2 rounded-full transition-all ${activeTab === 'integration' ? 'bg-amber-400 text-zinc-950 font-semibold shadow-md' : 'text-zinc-300 hover:text-white'}`}
            >
              Einbinden
            </button>
            <button
              onClick={() => {
                closeSubpage()
                setActiveTab('brain')
              }}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${activeTab === 'brain' ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-500/20' : 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30'}`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>🧠 Homepage Brain</span>
            </button>
          </div>

          {/* Mobile Dropdown Menu Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 space-y-2 font-medium"
              >
                <button
                  onClick={() => {
                    closeSubpage()
                    setActiveTab('gallery')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${activeTab === 'gallery' && !viewingSubpage ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-900/90 text-zinc-200'}`}
                >
                  <span>Werkschau & Katalog</span>
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    closeSubpage()
                    setActiveTab('brain')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${activeTab === 'brain' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}`}
                >
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>🧠 Homepage Brain (Obsidian)</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    closeSubpage()
                    setActiveTab('hbk')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${activeTab === 'hbk' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}`}
                >
                  <div className="flex items-center gap-2">
                    <School className="w-4 h-4" />
                    <span>Bewerbung HBK</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    closeSubpage()
                    setActiveTab('commissions')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${activeTab === 'commissions' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-900/90 text-zinc-200'}`}
                >
                  <span>Auftragsarbeiten nach Maß</span>
                  <PenTool className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    closeSubpage()
                    setActiveTab('archive')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${activeTab === 'archive' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-900/90 text-zinc-200'}`}
                >
                  <span>Werkverzeichnis (WV-Nr.)</span>
                  <BookOpen className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    closeSubpage()
                    setActiveTab('about')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${activeTab === 'about' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-900/90 text-zinc-200'}`}
                >
                  <span>Künstler & Vita</span>
                  <User className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    closeSubpage()
                    setActiveTab('integration')
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${activeTab === 'integration' ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-900/90 text-zinc-200'}`}
                >
                  <span>Website-Einbindung</span>
                  <Code2 className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                const firstAvailable = ARTWORKS_DATA.find(a => a.status === 'Verfügbar') || ARTWORKS_DATA[0]
                setSelectedArtwork(firstAvailable)
                setShowInquiryForm(true)
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold px-4 py-2 rounded-lg text-xs md:text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Werk anfragen</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Gallery Subpages Dedicated Navigation Bar */}
      <div className="sticky top-[73px] z-30 bg-zinc-950/90 backdrop-blur-md border-b border-white/10 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-2 text-xs font-semibold scrollbar-none py-1">
          <span className="text-amber-400/90 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Galerie-Unterseiten (1 - 6):
          </span>

          {/* Galerie 1 */}
          <button
            onClick={() => {
              closeSubpage()
              setActiveTab('galerie-oel-acryl')
              setVideoIndex(0)
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'galerie-oel-acryl' ? 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/30' : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-rose-500/20'
            }`}
          >
            <span>🎨 No. 1 Öl & Acryl auf Leinwand</span>
          </button>

          {/* Galerie 2 */}
          <button
            onClick={() => {
              closeSubpage()
              setActiveTab('galerie-lebenskunst')
              setVideoIndex(1)
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'galerie-lebenskunst' ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/30' : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-amber-500/20'
            }`}
          >
            <span>🌟 No. 2 Lebenskunst Signatur</span>
          </button>

          {/* Galerie 3 */}
          <button
            onClick={() => {
              closeSubpage()
              setActiveTab('galerie-anatomie')
              setVideoIndex(2)
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'galerie-anatomie' ? 'bg-stone-300 text-zinc-950 font-bold shadow-lg shadow-stone-300/30' : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-stone-500/20'
            }`}
          >
            <span>✏️ No. 3 Skizzen & Anatomie</span>
          </button>

          {/* Galerie 4 */}
          <button
            onClick={() => {
              closeSubpage()
              setActiveTab('galerie-digitalkunst')
              setVideoIndex(3)
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'galerie-digitalkunst' ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/30' : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-purple-500/20'
            }`}
          >
            <span>💻 No. 4 Digitale Künste</span>
          </button>

          {/* Galerie 5 */}
          <button
            onClick={() => {
              closeSubpage()
              setActiveTab('galerie-epoxid')
              setVideoIndex(4)
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'galerie-epoxid' ? 'bg-emerald-400 text-zinc-950 font-bold shadow-lg shadow-emerald-400/30' : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-emerald-500/20'
            }`}
          >
            <span>🌊 No. 5 Resin Art (Zum Verkauf)</span>
          </button>

          {/* Galerie 6 */}
          <button
            onClick={() => {
              closeSubpage()
              setActiveTab('galerie-animationen')
              setVideoIndex(5)
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'galerie-animationen' ? 'bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30' : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-blue-500/20'
            }`}
          >
            <span>🎬 No. 6 Animationen & 3D</span>
          </button>

          {/* Galerie 7 */}
          <button
            onClick={() => {
              closeSubpage()
              setActiveTab('galerie-handwerk')
              setVideoIndex(6)
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'galerie-handwerk' ? 'bg-amber-600 text-white font-bold shadow-lg shadow-amber-600/30' : 'bg-zinc-900/80 text-zinc-300 hover:text-white border border-amber-600/20'
            }`}
          >
            <span>🪵 No. 7 Handwerk & Gesellenstück</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* IF A DEDICATED ARTWORK SUBPAGE IS OPEN */}
        {viewingSubpage ? (
          <ArtworkDetailPage
            artwork={viewingSubpage}
            onBack={closeSubpage}
            onInquire={(art) => {
              setSelectedArtwork(art)
              setShowInquiryForm(true)
            }}
          />
        ) : (
          <>
            {/* TAB: BEWERBUNG HBK (HOCHSCHULE FÜR BILDENDE KÜNSTE) */}
            {activeTab === 'hbk' && (
              <section className="space-y-8 max-w-5xl mx-auto">
                {/* Header Area floating over video background */}
                <div className="py-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs uppercase tracking-widest font-semibold backdrop-blur-md">
                    <School className="w-4 h-4" /> HBK Bewerbungsdossier & Mappe
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">
                    Mappe & Portfolio für die Hochschule für Bildende Künste (HBK)
                  </h2>
                  <p className="text-zinc-200 text-sm md:text-base font-light leading-relaxed max-w-2xl drop-shadow">
                    Strukturierte Werkschau und Zulassungsmappe eines deutschen Künstlers (Jahrgang 1984) für den Studiengang **Freie Kunst / Meisterschule**.
                  </p>

                  <div className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs border-t border-white/10">
                    <div className="bg-zinc-950/80 backdrop-blur-md p-3.5 rounded-xl border border-zinc-800 shadow-lg">
                      <span className="text-zinc-400 block text-[10px]">BEWERBER:</span>
                      <span className="font-bold text-white">Deutscher Künstler (geb. 1984)</span>
                    </div>
                    <div className="bg-zinc-950/80 backdrop-blur-md p-3.5 rounded-xl border border-zinc-800 shadow-lg">
                      <span className="text-zinc-400 block text-[10px]">INSTITUTION:</span>
                      <span className="font-bold text-amber-300">HBK (Bildende Künste)</span>
                    </div>
                    <div className="bg-zinc-950/80 backdrop-blur-md p-3.5 rounded-xl border border-zinc-800 shadow-lg">
                      <span className="text-zinc-400 block text-[10px]">MAPPENUMFANG:</span>
                      <span className="font-bold text-white">{ARTWORKS_DATA.length} Dokumentierte Arbeiten</span>
                    </div>
                    <div className="bg-zinc-950/80 backdrop-blur-md p-3.5 rounded-xl border border-zinc-800 shadow-lg">
                      <span className="text-zinc-400 block text-[10px]">SCHWERPUNKTE:</span>
                      <span className="font-bold text-white">Malerei, Anatomie, Epoxidharz</span>
                    </div>
                  </div>
                </div>

                {/* Motivation & Artistic Statement for HBK */}
                <div className="bg-zinc-950/85 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-2xl font-serif font-bold text-amber-300 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-400" /> Künstlerisches Statement für die HBK-Zulassungskommission
                    </h3>
                    <button
                      onClick={() => alert('Druckansicht für die HBK-Mappe wird generiert...')}
                      className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-700 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-400" />
                      <span>HBK-Mappe drucken / PDF</span>
                    </button>
                  </div>

                  <div className="space-y-4 text-zinc-200 text-sm leading-relaxed font-light">
                    <p>
                      **Sehr geehrte Damen und Herren der Zulassungskommission,**
                    </p>
                    <p>
                      mein künstlerischer Weg (geb. 1984 in Deutschland) basiert auf dem stetigen Dialog zwischen klassischem, akademischem Handwerk und der freien, modernen Materialforschung. Die hier vorgelegte Mappe zur Bewerbung an der Hochschule für Bildende Künste (HBK) gliedert sich in vier zentrale Werkkomplexe:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-amber-400 font-bold font-serif text-base">1. Anatomische Studien & Zeichnung</span>
                        <p className="text-zinc-400 text-xs">
                          Untersuchung des menschlichen Körpers in Rötel, Kohle und Graphit. Erfassung von Proportionslehre, Muskeltonus und Bewegung.
                        </p>
                      </div>

                      <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-amber-400 font-bold font-serif text-base">2. Öl-Portraitmalerei</span>
                        <p className="text-zinc-400 text-xs">
                          Altmeisterliche Lasurtechnik im Chiaroscuro sowie expressive Spachtelaufträge auf schwerem Leinen.
                        </p>
                      </div>

                      <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-amber-400 font-bold font-serif text-base">3. Abstrakte Malerei</span>
                        <p className="text-zinc-400 text-xs">
                          Großformatige Kompositionen mit 24k Blattgold, Pigmenten und vielschichtigen Texturen.
                        </p>
                      </div>

                      <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-amber-400 font-bold font-serif text-base">4. Serie "Lebenskunst" & Epoxidharz</span>
                        <p className="text-zinc-400 text-xs">
                          Freie Konzeptionen, in denen Naturmaterialien, Blattgold und veredeltes Epoxidharz zu zeitgenössischen Wandobjekten verschmelzen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Portfolio Works for HBK Review */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white">Ausgewählte Mappenarbeiten für die HBK</h3>
                      <p className="text-zinc-400 text-xs mt-1">Gliedern sich nach WV-Nummern und Arbeitsbereichen</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ARTWORKS_DATA.map(art => (
                      <motion.div
                        key={art.id}
                        whileHover={{ y: -4 }}
                        className="bg-zinc-950/85 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between"
                      >
                        <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => openSubpage(art)}>
                          {art.video ? (
                            <video src={art.video} loop muted autoPlay playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img src={art.image} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                          )}
                          
                          <div className="absolute top-3 left-3">
                            <span className="font-mono text-[10px] font-bold bg-zinc-950/90 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                              {art.wvNr}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-widest">{art.year}</span>
                              <span className="text-xs text-zinc-400">{art.dimensions}</span>
                            </div>
                            <h4 className="text-lg font-serif font-bold text-white mt-1 cursor-pointer hover:text-amber-300 transition-colors" onClick={() => openSubpage(art)}>{art.title}</h4>
                            <p className="text-zinc-400 text-xs mt-1 font-light line-clamp-2">{art.medium}</p>
                          </div>

                          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[11px] text-zinc-400">{art.provenance || "Mappenauswahl"}</span>
                            <button
                              onClick={() => openSubpage(art)}
                              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-amber-400 hover:text-zinc-950 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5"
                            >
                              <span>HBK-Werkakte</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* TAB 1 & ARCHIVE: GALLERY & CATALOGUE */}
            {(activeTab === 'gallery' || activeTab === 'archive') && (
              <section className="space-y-12">
                {/* Full-bleed Hero Title & Social Media Header */}
                <div className="py-4 space-y-6">
                  <div className="max-w-3xl space-y-4">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight drop-shadow-xl">
                      Vollständiges Künstlerarchiv
                    </h2>
                    <p className="text-zinc-100 text-base md:text-lg font-light leading-relaxed drop-shadow-md">
                      Säuberlich archiviertes Gesamtschaffen eines deutschen Künstlers (geb. 1984). Jedes Werk ist mit einer eindeutigen Werkverzeichnis-Nummer (WV-Nr.), Standort, Technik und eigener Unterseite dokumentiert.
                    </p>

                    {/* Social Media & Direct Atelier Links */}
                    <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10">
                      {/* Instagram */}
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-xs text-zinc-100 bg-zinc-950/80 hover:bg-zinc-900 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-pink-500/50 shadow-lg transition-all transform hover:scale-[1.02]"
                      >
                        <svg className="w-4 h-4 text-pink-400 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <div className="overflow-hidden">
                          <span className="font-bold block text-white text-[11px]">Instagram</span>
                          <span className="text-[10px] text-pink-300 block truncate">@atelier.kunst</span>
                        </div>
                      </a>

                      {/* Pinterest */}
                      <a
                        href="https://pinterest.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-xs text-zinc-100 bg-zinc-950/80 hover:bg-zinc-900 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-red-500/50 shadow-lg transition-all transform hover:scale-[1.02]"
                      >
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/>
                        </svg>
                        <div className="overflow-hidden">
                          <span className="font-bold block text-white text-[11px]">Pinterest</span>
                          <span className="text-[10px] text-red-300 block truncate">Inspirations-Board</span>
                        </div>
                      </a>

                      {/* Facebook Seite */}
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-xs text-zinc-100 bg-zinc-950/80 hover:bg-zinc-900 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-blue-500/50 shadow-lg transition-all transform hover:scale-[1.02]"
                      >
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <div className="overflow-hidden">
                          <span className="font-bold block text-white text-[11px]">Facebook Seite</span>
                          <span className="text-[10px] text-blue-300 block truncate">Künstler-Seite</span>
                        </div>
                      </a>

                      {/* Facebook Gruppe */}
                      <a
                        href="https://facebook.com/groups"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-xs text-zinc-100 bg-zinc-950/80 hover:bg-zinc-900 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-indigo-500/50 shadow-lg transition-all transform hover:scale-[1.02]"
                      >
                        <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        <div className="overflow-hidden">
                          <span className="font-bold block text-white text-[11px]">Facebook Gruppe</span>
                          <span className="text-[10px] text-indigo-300 block truncate">Kunst-Community</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* SECTION 01: "LEBENSKUNST" MANIFEST & MATERIALFORSCHUNG (SPECIAL GOLD HIGHLIGHT) */}
                <div className="my-8 bg-gradient-to-r from-amber-950/40 via-zinc-950 to-amber-900/20 border border-amber-500/40 p-8 md:p-12 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
                  
                  <div className="relative z-10 space-y-4 max-w-3xl">
                    <span className="text-amber-400 font-mono text-[11px] uppercase tracking-widest font-bold block">Abschnitt 01 &bull; Signatur-Philosophie</span>
                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                      Die Philosophie der "Lebenskunst"
                    </h3>
                    <p className="text-zinc-200 text-sm md:text-base font-light leading-relaxed">
                      Kunst ist mehr als reine Repräsentation – sie ist gebundene Lebensenergie und stetiger Dialog zwischen Zeit, Natur und Form. In der Serie **"Lebenskunst"** verschmelzen jahrhundertealtes Eichenholz, 24k Blattgold, altmeisterliche Öl-Lasurtechnik und veredeltes Epoxidharz zu zeitgenössischen Resonanzkörpern.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                      <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-amber-500/20">
                        <span className="text-amber-400 font-bold block text-sm">24k Blattgold</span>
                        <span className="text-zinc-400 block mt-1">Echtes Blattgold für zeitlose Lichtreflexionen.</span>
                      </div>
                      <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-amber-500/20">
                        <span className="text-amber-400 font-bold block text-sm">Naturmaterialien</span>
                        <span className="text-zinc-400 block mt-1">Historisches Eichenholz & Edelharz-Kompositionen.</span>
                      </div>
                      <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-amber-500/20">
                        <span className="text-amber-400 font-bold block text-sm">Öl & Lasur</span>
                        <span className="text-zinc-400 block mt-1">Altmeisterliche Schichtmalerei im Chiaroscuro.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 02: DIGITALES WERKVERZEICHNIS (WV-LISTE & VIDEO-LOOPS) */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-amber-400 font-mono text-[11px] uppercase tracking-widest font-bold">Abschnitt 02</span>
                      <h3 className="text-2xl font-serif font-bold text-white">Digitales Werkverzeichnis (WV-Katalog)</h3>
                      <p className="text-zinc-400 text-xs mt-1">Säuberlich dokumentiertes Archiv mit echten MP4-Video-Animationen</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArtworks.map(art => (
                      <motion.div
                        key={art.id}
                        whileHover={{ y: -4 }}
                        className="bg-zinc-950/85 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between"
                      >
                        <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => openSubpage(art)}>
                          {art.video ? (
                            <video src={art.video} loop muted autoPlay playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img src={art.image} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                          )}
                          
                          <div className="absolute top-3 left-3">
                            <span className="font-mono text-[10px] font-bold bg-zinc-950/90 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                              {art.wvNr}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border shadow-md ${
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
                              <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-widest">{art.year}</span>
                              <span className="text-xs text-zinc-400">{art.dimensions}</span>
                            </div>
                            <h4 className="text-lg font-serif font-bold text-white mt-1 cursor-pointer hover:text-amber-300 transition-colors" onClick={() => openSubpage(art)}>{art.title}</h4>
                            <p className="text-zinc-400 text-xs mt-1 font-light line-clamp-2">{art.medium}</p>
                          </div>

                          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-zinc-500 uppercase font-medium">Wert / Status</span>
                              <p className="text-amber-300 font-serif font-bold text-lg">{art.price}</p>
                            </div>

                            <button
                              onClick={() => openSubpage(art)}
                              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-amber-400 hover:text-zinc-950 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5"
                            >
                              <span>Werkakte ansehen</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* BLAU LEUCHTENDE KONTROLLLEISTE UNTER DEM WERKVERZEICHNIS */}
                <div className="my-8 p-6 rounded-2xl bg-blue-950/80 backdrop-blur-md border border-blue-500/50 shadow-2xl shadow-blue-950/50 space-y-4">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider">
                        <RotateCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                        <span>Auto-Rotation 45s ({videoIndex + 1}/{HERO_ANIMATION_PLAYLIST.length})</span>
                      </div>
                      <span className="text-xs text-blue-200/80 font-medium hidden sm:inline">&bull; Interaktive Animation-Steuerung</span>
                    </div>

                    {/* Blue Control Buttons */}
                    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                      {/* Brightness Pills */}
                      <div className="flex items-center gap-1 text-[11px] bg-blue-900/60 p-1 rounded-xl border border-blue-400/30">
                        <Sun className="w-3.5 h-3.5 text-blue-300 ml-1.5" />
                        <button
                          onClick={() => setBackgroundMode('ultra')}
                          className={`px-2.5 py-1 rounded-lg transition-all ${backgroundMode === 'ultra' ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/40' : 'text-blue-200 hover:text-white'}`}
                        >
                          Extrem Hell ☀️
                        </button>
                        <button
                          onClick={() => setBackgroundMode('vibrant')}
                          className={`px-2.5 py-1 rounded-lg transition-all ${backgroundMode === 'vibrant' ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/40' : 'text-blue-200 hover:text-white'}`}
                        >
                          Leuchtend ✨
                        </button>
                      </div>

                      {/* Retro Filter Pills */}
                      <div className="flex items-center gap-1 text-[11px] bg-blue-900/60 p-1 rounded-xl border border-blue-400/30">
                        <span className="text-blue-300 font-mono font-bold text-[10px] ml-1.5 uppercase">Effekt:</span>
                        <button
                          onClick={() => setFilterMode('none')}
                          className={`px-2.5 py-1 rounded-lg transition-all ${filterMode === 'none' ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/40' : 'text-blue-200 hover:text-white'}`}
                        >
                          HD Video 🎬
                        </button>
                        <button
                          onClick={() => setFilterMode('ascii')}
                          className={`px-2.5 py-1 rounded-lg transition-all ${filterMode === 'ascii' ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/40' : 'text-blue-200 hover:text-white'}`}
                        >
                          ASCII Art 🔤
                        </button>
                        <button
                          onClick={() => setFilterMode('pixel')}
                          className={`px-2.5 py-1 rounded-lg transition-all ${filterMode === 'pixel' ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/40' : 'text-blue-200 hover:text-white'}`}
                        >
                          Pixel 8-Bit 👾
                        </button>
                        <button
                          onClick={() => setFilterMode('matrix')}
                          className={`px-2.5 py-1 rounded-lg transition-all ${filterMode === 'matrix' ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/40' : 'text-blue-200 hover:text-white'}`}
                        >
                          Matrix ⚡
                        </button>
                      </div>

                      {/* Video Selector Pills mapping directly to 5 Galleries */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] bg-blue-900/60 p-1.5 rounded-xl border border-blue-400/40">
                        <span className="text-blue-300 font-mono font-bold text-[10px] ml-1 uppercase">Direkt zu Galerie:</span>
                        {HERO_ANIMATION_PLAYLIST.map((item, idx) => (
                          <button
                            key={item.url}
                            onClick={() => selectAnimationGallery(idx)}
                            className={`px-3 py-1 rounded-lg transition-all ${videoIndex === idx ? 'bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/50 scale-105' : 'text-blue-200 hover:text-white bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/20'}`}
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 03: INTERAKTIVER KUNST-RASTER (VIRTUELLE ATELIERWAND - DEEPER DOWN) */}
                <div className="space-y-4 pt-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-blue-400 font-mono text-[11px] uppercase tracking-widest font-bold">Abschnitt 03</span>
                      <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-400" /> Interaktiver Kunst-Raster & Dynamic Layout
                      </h3>
                    </div>
                    <span className="text-xs text-zinc-400">Klick auf ein Werk öffnet die individuelle Werkakte</span>
                  </div>

                  {/* Archive Search Bar & Filter Controls Container */}
                  <div className="space-y-4 bg-zinc-950/90 backdrop-blur-md p-5 rounded-2xl border border-blue-500/30 shadow-2xl">
                    <div className="relative">
                      <Search className="w-4 h-4 text-blue-400 absolute left-4 top-3.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Im Werkverzeichnis suchen (z.B. 'WV-2026-001', 'Öl', 'Portrait', '2025', 'Nussbaum')..."
                        className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-blue-400 shadow-inner"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          aria-label="Suchbegriff zurücksetzen"
                          className="absolute right-3 top-3 text-xs text-zinc-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setActiveCategory('all')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === 'all' ? 'bg-blue-500 text-white font-bold' : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800'}`}
                        >
                          Alle Archivwerke ({ARTWORKS_DATA.length})
                        </button>
                        <button
                          onClick={() => setActiveCategory('oel-acryl')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === 'oel-acryl' ? 'bg-blue-500 text-white font-bold' : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800'}`}
                        >
                          No. 1 Öl & Acryl
                        </button>
                        <button
                          onClick={() => setActiveCategory('lebenskunst')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === 'lebenskunst' ? 'bg-blue-500 text-white font-bold' : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800'}`}
                        >
                          No. 2 Lebenskunst
                        </button>
                        <button
                          onClick={() => setActiveCategory('anatomie')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === 'anatomie' ? 'bg-blue-500 text-white font-bold' : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800'}`}
                        >
                          No. 3 Skizzen & Anatomie
                        </button>
                        <button
                          onClick={() => setActiveCategory('digitalkunst')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === 'digitalkunst' ? 'bg-blue-500 text-white font-bold' : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800'}`}
                        >
                          No. 4 Digitale Künste
                        </button>
                        <button
                          onClick={() => setActiveCategory('epoxid')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === 'epoxid' ? 'bg-blue-500 text-white font-bold' : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800'}`}
                        >
                          No. 5 Resin Art (Verkauf)
                        </button>
                        <button
                          onClick={() => setActiveCategory('animationen')}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === 'animationen' ? 'bg-blue-500 text-white font-bold' : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800'}`}
                        >
                          No. 6 Animationen & 3D
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={showFrames}
                            onChange={(e) => setShowFrames(e.target.checked)}
                            className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
                          />
                          <span>Galerie-Rahmen</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Frame Grid Container */}
                  <div className="w-full h-[680px] sm:h-[750px] bg-zinc-950/70 p-4 rounded-2xl border border-blue-500/30 shadow-inner backdrop-blur-md">
                    <DynamicFrameLayout
                      frames={frames}
                      showFrames={showFrames}
                      hoverSize={6}
                      gapSize={8}
                      onSelectFrame={handleSelectFrame}
                    />
                  </div>

                  {/* 3D Kinematik Flip-Gallery Component */}
                  <FlipGallery />
                </div>

                {/* SECTION 2: "LEBENSKUNST" MANIFEST & MATERIALFORSCHUNG (SPECIAL GOLD HIGHLIGHT) */}
                <div className="my-16 bg-gradient-to-r from-amber-950/40 via-zinc-950 to-amber-900/20 border border-amber-500/40 p-8 md:p-12 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
                  
                  <div className="relative z-10 space-y-4 max-w-3xl">
                    <span className="text-amber-400 font-mono text-[11px] uppercase tracking-widest font-bold block">Abschnitt 02 &bull; Signatur-Philosophie</span>
                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                      Die Philosophie der "Lebenskunst"
                    </h3>
                    <p className="text-zinc-200 text-sm md:text-base font-light leading-relaxed">
                      Kunst ist mehr als reine Repräsentation – sie ist gebundene Lebensenergie und stetiger Dialog zwischen Zeit, Natur und Form. In der Serie **"Lebenskunst"** verschmelzen jahrhundertealtes Eichenholz, 24k Blattgold, altmeisterliche Öl-Lasurtechnik und veredeltes Epoxidharz zu zeitgenössischen Resonanzkörpern.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                      <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-amber-500/20">
                        <span className="text-amber-400 font-bold block text-sm">24k Blattgold</span>
                        <span className="text-zinc-400 block mt-1">Echtes Blattgold für zeitlose Lichtreflexionen.</span>
                      </div>
                      <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-amber-500/20">
                        <span className="text-amber-400 font-bold block text-sm">Naturmaterialien</span>
                        <span className="text-zinc-400 block mt-1">Historisches Eichenholz & Edelharz-Kompositionen.</span>
                      </div>
                      <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-amber-500/20">
                        <span className="text-amber-400 font-bold block text-sm">Öl & Lasur</span>
                        <span className="text-zinc-400 block mt-1">Altmeisterliche Schichtmalerei im Chiaroscuro.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PARALLAX SCROLLING SECTION */}
                <ParallaxComponent />

                {/* SECTION 3: DIGITALES WERKVERZEICHNIS (WV-LISTE & VIDEO-LOOPS) */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-amber-400 font-mono text-[11px] uppercase tracking-widest font-bold">Abschnitt 03</span>
                      <h3 className="text-2xl font-serif font-bold text-white">Digitales Werkverzeichnis (WV-Katalog)</h3>
                      <p className="text-zinc-400 text-xs mt-1">Säuberlich dokumentiertes Archiv mit echten MP4-Video-Animationen</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArtworks.map(art => (
                      <motion.div
                        key={art.id}
                        whileHover={{ y: -4 }}
                        className="bg-zinc-950/85 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between"
                      >
                        <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => openSubpage(art)}>
                          {art.video ? (
                            <video src={art.video} loop muted autoPlay playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img src={art.image} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                          )}
                          
                          <div className="absolute top-3 left-3">
                            <span className="font-mono text-[10px] font-bold bg-zinc-950/90 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                              {art.wvNr}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border shadow-md ${
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
                              <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-widest">{art.year}</span>
                              <span className="text-xs text-zinc-400">{art.dimensions}</span>
                            </div>
                            <h4 className="text-lg font-serif font-bold text-white mt-1 cursor-pointer hover:text-amber-300 transition-colors" onClick={() => openSubpage(art)}>{art.title}</h4>
                            <p className="text-zinc-400 text-xs mt-1 font-light line-clamp-2">{art.medium}</p>
                          </div>

                          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-zinc-500 uppercase font-medium">Wert / Status</span>
                              <p className="text-amber-300 font-serif font-bold text-lg">{art.price}</p>
                            </div>

                            <button
                              onClick={() => openSubpage(art)}
                              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-amber-400 hover:text-zinc-950 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5"
                            >
                              <span>Werkakte ansehen</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* SECTION 4: MEISTERSCHUL & HBK BEWERBUNGS-BANNER */}
                <div className="mt-16 bg-gradient-to-r from-zinc-950 via-amber-950/40 to-zinc-950 border border-amber-500/40 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-amber-400 font-mono text-[11px] uppercase tracking-widest font-bold">Abschnitt 04 &bull; Meisterschule</span>
                    <h3 className="text-2xl font-serif font-bold text-white">Offizielle Bewerbung HBK (Bildende Künste)</h3>
                    <p className="text-zinc-300 text-xs md:text-sm font-light max-w-xl">
                      Einsicht in das vollständige Zulassungsdossier, die Mappenaufsätze und das Statement für die Zulassungskommission.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      closeSubpage()
                      setActiveTab('hbk')
                    }}
                    className="flex-shrink-0 flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold px-5 py-3 rounded-xl text-xs md:text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:scale-[1.02]"
                  >
                    <School className="w-4 h-4" />
                    <span>HBK-Mappe öffnen &rarr;</span>
                  </button>
                </div>
              </section>
            )}

            {/* DEDICATED SUBPAGES FOR ALL 6 NUMBERED GALLERIES */}
            {activeTab === 'galerie-oel-acryl' && (
              <DedicatedGallerySubpage
                category="oel-acryl"
                artworks={ARTWORKS_DATA}
                onSelectArtwork={(art) => openSubpage(art)}
                onOpenInquiry={(art) => { setSelectedArtwork(art); setShowInquiryForm(true); }}
              />
            )}

            {activeTab === 'galerie-lebenskunst' && (
              <DedicatedGallerySubpage
                category="lebenskunst"
                artworks={ARTWORKS_DATA}
                onSelectArtwork={(art) => openSubpage(art)}
                onOpenInquiry={(art) => { setSelectedArtwork(art); setShowInquiryForm(true); }}
              />
            )}

            {activeTab === 'galerie-anatomie' && (
              <DedicatedGallerySubpage
                category="anatomie"
                artworks={ARTWORKS_DATA}
                onSelectArtwork={(art) => openSubpage(art)}
                onOpenInquiry={(art) => { setSelectedArtwork(art); setShowInquiryForm(true); }}
              />
            )}

            {activeTab === 'galerie-digitalkunst' && (
              <DedicatedGallerySubpage
                category="digitalkunst"
                artworks={ARTWORKS_DATA}
                onSelectArtwork={(art) => openSubpage(art)}
                onOpenInquiry={(art) => { setSelectedArtwork(art); setShowInquiryForm(true); }}
              />
            )}

            {activeTab === 'galerie-epoxid' && (
              <DedicatedGallerySubpage
                category="epoxid"
                artworks={ARTWORKS_DATA}
                onSelectArtwork={(art) => openSubpage(art)}
                onOpenInquiry={(art) => { setSelectedArtwork(art); setShowInquiryForm(true); }}
              />
            )}

            {activeTab === 'galerie-animationen' && (
              <DedicatedGallerySubpage
                category="animationen"
                artworks={ARTWORKS_DATA}
                onSelectArtwork={(art) => openSubpage(art)}
                onOpenInquiry={(art) => { setSelectedArtwork(art); setShowInquiryForm(true); }}
              />
            )}

            {activeTab === 'galerie-handwerk' && (
              <DedicatedGallerySubpage
                category="handwerk"
                artworks={ARTWORKS_DATA}
                onSelectArtwork={(art) => openSubpage(art)}
                onOpenInquiry={(art) => { setSelectedArtwork(art); setShowInquiryForm(true); }}
              />
            )}

            {/* TAB: OBSIDIAN & GOOGLE DRIVE HOMEPAGE BRAIN */}
            {activeTab === 'brain' && (
              <HomepageBrainViewer />
            )}

            {/* TAB 3: AUFTRAGSARBEITEN */}
            {activeTab === 'commissions' && (
              <section className="space-y-8 max-w-4xl mx-auto">
                <div className="text-center space-y-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" /> Auftragsarbeiten & Portrait-Aufträge
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
                    Auftrags-Portraits & Wunschgemälde
                  </h2>
                  <p className="text-zinc-300 text-sm md:text-base max-w-2xl mx-auto font-light">
                    Anfertigung persönlicher Öl-Portraits nach Vorlage/Modell, individueller abstrakter Wandbilder oder Epoxidharz-Arbeiten.
                  </p>
                </div>

                <div className="bg-zinc-950/85 backdrop-blur-md p-8 rounded-2xl border border-amber-500/30 shadow-2xl space-y-6">
                  <h3 className="text-xl font-serif font-bold text-amber-300">Unverbindliche Anfrage starten</h3>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    alert('Vielen Dank! Ihre Anfrage wurde übermittelt.')
                  }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Ihr Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="Vor- und Nachname"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">E-Mail-Adresse *</label>
                        <input
                          required
                          type="email"
                          placeholder="adresse@domain.de"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Art der Auftragsarbeit</label>
                        <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400">
                          <option>Lebenskunst / Freies Signaturwerk</option>
                          <option>Öl-Portraitmalerei (nach Fotovorlage / Modell)</option>
                          <option>Abstrakte Malerei (Wunschformat & Farben)</option>
                          <option>Anatomie- oder Aktzeichnung (Graphit / Rötel)</option>
                          <option>Epoxidharz-Kunst / Möbel</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Wunschmaße (ca.)</label>
                        <input
                          type="text"
                          placeholder="z.B. 140 x 100 cm"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Wünsche & Vorstellungen</label>
                      <textarea
                        rows={4}
                        placeholder="Beschreiben Sie Ihr Projekt..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold py-3 rounded-lg text-sm shadow-lg shadow-amber-500/20 transition-all"
                    >
                      Unverbindliche Anfrage absenden &rarr;
                    </button>
                  </form>
                </div>
              </section>
            )}

            {/* TAB 4: ÜBER DEN KÜNSTLER & VITA */}
            {activeTab === 'about' && (
              <section className="space-y-8 max-w-4xl mx-auto">
                <div className="bg-zinc-950/85 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/10 space-y-6">
                  <div className="space-y-3">
                    <span className="text-amber-400 font-serif text-sm tracking-widest uppercase font-semibold">Künstlerische Vita & Werkverzeichnis</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Deutscher Künstler (geb. 1984)</h2>
                    <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-400" /> Digitales Archiv & Bewerbung an der HBK
                    </p>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed font-light">
                    Säuberliche Archivierung des künstlerischen Gesamtwerks. Die Werkschau umfasst Öl-Portraitmalerei, Anatomie-Skizzen, abstrakte Großformate, Epoxidharz-Arbeiten sowie den Signatur-Leitgedanken der **"Lebenskunst"**.
                  </p>
                </div>
              </section>
            )}

            {/* TAB 5: HOMEPAGE INTEGRATION GUIDE */}
            {activeTab === 'integration' && (
              <section className="space-y-8 max-w-4xl mx-auto">
                <div className="bg-zinc-950/85 backdrop-blur-md p-8 rounded-2xl border border-amber-500/30 space-y-6">
                  <div className="flex items-center gap-3 text-amber-300">
                    <Code2 className="w-6 h-6" />
                    <h2 className="text-2xl font-serif font-bold text-white">Integration in deine bestehende Homepage</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-amber-300 text-sm font-bold font-serif">HTML Iframe Embed (Am schnellsten)</h4>
                        <button
                          onClick={copyCodeSnippet}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-amber-300 font-semibold transition-colors"
                        >
                          {copiedIntegration ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedIntegration ? 'Kopiert!' : 'Code kopieren'}
                        </button>
                      </div>
                      <pre className="bg-zinc-950 p-4 rounded-lg text-xs font-mono text-zinc-300 overflow-x-auto border border-zinc-800">
{`<div id="homepage-tab-kunst">
  <iframe 
    src="https://deine-domain.de/kunst" 
    style="width:100%; height:950px; border:none;"
    title="Kunst & Werkverzeichnis Tab"
  ></iframe>
</div>`}
                      </pre>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}

      </main>

      {/* DIRECT INQUIRY / SHOPPING MODAL */}
      <AnimatePresence>
        {showInquiryForm && selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowInquiryForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setShowInquiryForm(false)}
                aria-label="Anfrageformular schließen"
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {inquirySubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Anfrage erfolgreich übermittelt!</h3>
                  <p className="text-zinc-300 text-xs max-w-xs mx-auto">
                    Das Werk <strong>"{selectedArtwork.title}"</strong> ({selectedArtwork.wvNr}) wurde für Sie vorgemerkt.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">{selectedArtwork.wvNr}</span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">"{selectedArtwork.title}"</h3>
                    <p className="text-zinc-400 text-xs mt-1">Preis/Wert: <strong className="text-amber-300">{selectedArtwork.price}</strong> &bull; {selectedArtwork.dimensions}</p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Ihr Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Vor- und Nachname"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">E-Mail-Adresse *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="adresse@domain.de"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Telefonnummer (für Lieferabsprache)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+49 170 1234567"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Nachricht / Anmerkungen (Optional)</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Fragen zur Lieferung, Rahmung etc."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold py-3 rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all"
                    >
                      Kaufanfrage verbindlich absenden &rarr;
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10 bg-zinc-950 py-10 px-6 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="font-serif font-bold text-amber-300 text-base">DEUTSCHE KUNST</h4>
            <p className="text-zinc-500 text-xs mt-0.5">Deutscher Künstler (geb. 1984) &bull; HBK Mappedossier & Werkverzeichnis</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-zinc-400">
            <span>&copy; {new Date().getFullYear()} HBK Bewerbungsdossier</span>
            <span>Versicherter Kunsttransport</span>
            <span>Atelier-Zertifikat</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
