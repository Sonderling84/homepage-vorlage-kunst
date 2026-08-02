'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const defaultArtImages = [
  { title: 'WV-2026-001 • Lebenskunst N° 1 (24k Blattgold & Eiche)', url: '/artworks/gold_leaf_canvas_1784989991003.png' },
  { title: 'WV-2026-002 • Öl-Portrait im Chiaroscuro', url: '/artworks/oil_painting_abstract_1784989375408.png' },
  { title: 'WV-2026-003 • Anatomische Torsostudie (A4 Bütten)', url: '/artworks/anatomie/IMG_1070.jpg' },
  { title: 'WV-2026-009 • Epoxidharz Ocean Wave (Resin Art)', url: '/artworks/epoxid/436241146_336920962729022_164646371994329756_n copy.jpg' },
  { title: 'WV-2026-015 • Unreal Engine 3D Environment Loop', url: '/artworks/abstrakt/Robotic Rainbow .jpg' }
]

const FLIP_SPEED = 750
const flipTiming = { duration: FLIP_SPEED, iterations: 1 }

// flip down
const flipAnimationTop = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' }
]
const flipAnimationBottom = [
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(0)' }
]

// flip up
const flipAnimationTopReverse = [
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(0)' }
]
const flipAnimationBottomReverse = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' }
]

export function FlipGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const uniteRef = useRef<NodeListOf<HTMLElement> | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // initialise first image once
  useEffect(() => {
    if (!containerRef.current) return
    uniteRef.current = containerRef.current.querySelectorAll<HTMLElement>('.unite')
    defineFirstImg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const defineFirstImg = () => {
    if (!uniteRef.current) return
    uniteRef.current.forEach(setActiveImage)
    setImageTitle(currentIndex)
  }

  const setActiveImage = (el: HTMLElement) => {
    el.style.backgroundImage = `url('${defaultArtImages[currentIndex].url}')`
  }

  const setImageTitle = (index: number) => {
    const gallery = containerRef.current
    if (!gallery) return
    gallery.setAttribute('data-title', defaultArtImages[index].title)
    gallery.style.setProperty('--title-y', '0')
    gallery.style.setProperty('--title-opacity', '1')
  }

  const updateGallery = (nextIndex: number, isReverse = false) => {
    const gallery = containerRef.current
    if (!gallery) return

    // determine direction animation arrays
    const topAnim = isReverse ? flipAnimationTopReverse : flipAnimationTop
    const bottomAnim = isReverse
      ? flipAnimationBottomReverse
      : flipAnimationBottom

    const overlayTop = gallery.querySelector('.overlay-top')
    const overlayBottom = gallery.querySelector('.overlay-bottom')

    if (overlayTop) overlayTop.animate(topAnim, flipTiming)
    if (overlayBottom) overlayBottom.animate(bottomAnim, flipTiming)

    // hide title
    gallery.style.setProperty('--title-y', '-1rem')
    gallery.style.setProperty('--title-opacity', '0')

    // update images with slight delay so animation looks continuous
    if (uniteRef.current) {
      uniteRef.current.forEach((el, idx) => {
        const delay =
          (isReverse && (idx !== 1 && idx !== 2)) ||
          (!isReverse && (idx === 1 || idx === 2))
            ? FLIP_SPEED - 200
            : 0

        setTimeout(() => {
          el.style.backgroundImage = `url('${defaultArtImages[nextIndex].url}')`
        }, delay)
      })
    }

    // reveal new title roughly half‑way through animation
    setTimeout(() => {
      setImageTitle(nextIndex)
    }, FLIP_SPEED * 0.5)
  }

  const updateIndex = (increment: number) => {
    const inc = Number(increment)
    const newIndex = (currentIndex + inc + defaultArtImages.length) % defaultArtImages.length
    const isReverse = inc < 0
    setCurrentIndex(newIndex)
    updateGallery(newIndex, isReverse)
  }

  return (
    <div className="relative w-full py-12 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden my-8">
      <div className="mb-6 text-center space-y-1 px-4">
        <span className="text-amber-400 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> 3D Klapp-Galerie &bull; Flip-Kinematik
        </span>
        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white">
          Mechanische Werk-Vorschau
        </h3>
        <p className="text-zinc-400 text-xs max-w-md mx-auto font-light">
          Klick auf die Pfeile für eine kinematisierte 3D-Flip-Animation der Hauptwerke
        </p>
      </div>

      <div
        className="relative bg-zinc-900/90 border border-amber-500/40 p-3 rounded-2xl shadow-2xl"
        style={{ colorScheme: 'dark' }}
      >
        {/* flip gallery */}
        <div
          id="flip-gallery"
          ref={containerRef}
          className="relative w-[260px] h-[360px] md:w-[320px] md:h-[440px] text-center rounded-xl overflow-hidden shadow-2xl"
          style={{ perspective: '800px' }}
        >
          <div className="top unite bg-cover bg-no-repeat bg-center"></div>
          <div className="bottom unite bg-cover bg-no-repeat bg-center"></div>
          <div className="overlay-top unite bg-cover bg-no-repeat bg-center"></div>
          <div className="overlay-bottom unite bg-cover bg-no-repeat bg-center"></div>
        </div>

        {/* navigation */}
        <div className="absolute top-full right-3 mt-3 flex items-center gap-2">
          <span className="text-[11px] text-amber-300 font-mono font-bold mr-2">
            {currentIndex + 1} / {defaultArtImages.length}
          </span>
          <button
            type="button"
            onClick={() => updateIndex(-1)}
            title="Vorheriges Werk"
            aria-label="Vorheriges Werk"
            className="p-2 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/20 hover:scale-110 transition-all shadow-md"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => updateIndex(1)}
            title="Nächstes Werk"
            aria-label="Nächstes Werk"
            className="p-2 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/20 hover:scale-110 transition-all shadow-md"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* component-scoped styles for 3D flip effect */}
      <style>{`
        #flip-gallery::after {
          content: '';
          position: absolute;
          background-color: rgba(212, 175, 55, 0.6);
          width: 100%;
          height: 3px;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 10;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
        }

        #flip-gallery::before {
          content: attr(data-title);
          color: #f3e5ab;
          font-family: monospace;
          font-size: 0.75rem;
          font-weight: 600;
          left: 0;
          width: 100%;
          text-align: left;
          position: absolute;
          top: calc(100% + 0.75rem);
          line-height: 1.4;
          opacity: var(--title-opacity, 0);
          transform: translateY(var(--title-y, 0));
          transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
        }

        #flip-gallery > * {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
          background-size: 260px 360px;
        }

        @media (min-width: 768px) {
          #flip-gallery > * {
            background-size: 320px 440px;
          }
        }

        .top,
        .overlay-top {
          top: 0;
          transform-origin: bottom;
          background-position: top;
        }

        .bottom,
        .overlay-bottom {
          bottom: 0;
          transform-origin: top;
          background-position: bottom;
        }
      `}</style>
    </div>
  )
}

export default FlipGallery
