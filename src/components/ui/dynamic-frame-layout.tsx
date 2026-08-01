"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export interface Frame {
  id: number
  video?: string
  image?: string
  title?: string
  medium?: string
  price?: string
  status?: string
  dimensions?: string
  year?: string
  description?: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize: number
  borderThickness?: number
  borderSize?: number
  isHovered?: boolean
}

interface FrameComponentProps {
  video?: string
  image?: string
  title?: string
  medium?: string
  price?: string
  status?: string
  width: number | string
  height: number | string
  className?: string
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize: number
  borderThickness?: number
  borderSize?: number
  showFrame: boolean
  isHovered: boolean
  onClick?: () => void
}

function FrameComponent({
  video,
  image,
  title,
  medium,
  price,
  status,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness = 0,
  borderSize = 100,
  showFrame,
  isHovered,
  onClick,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (video) {
      if (isHovered) {
        videoRef.current?.play().catch(() => {})
      } else {
        videoRef.current?.pause()
      }
    }
  }, [isHovered, video])

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer group ${className}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl border border-amber-500/20 shadow-2xl bg-zinc-950">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden relative"
            style={{
              transform: `scale(${isHovered ? mediaSize * 1.04 : mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {video ? (
              <video
                className="w-full h-full object-cover"
                src={video}
                loop
                muted
                playsInline
                ref={videoRef}
              />
            ) : image ? (
              <img
                src={image}
                alt={title || "Kunstwerk"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-500 font-serif">
                Kunstwerk Vorschau
              </div>
            )}

            {/* Sleek Art Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-75 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-4">
              {status && (
                <div className="mb-1.5 flex items-center gap-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${
                    status === 'Verfügbar' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                    status === 'Reserviert' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    'bg-zinc-800/80 text-zinc-400 border-zinc-700'
                  }`}>
                    {status}
                  </span>
                </div>
              )}
              {title && <h3 className="text-white font-serif text-lg font-bold leading-tight drop-shadow">{title}</h3>}
              {medium && <p className="text-zinc-300 text-xs font-light mt-0.5">{medium}</p>}
              {price && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                  <span className="text-amber-300 font-serif text-sm font-semibold">{price}</span>
                  <span className="text-[11px] text-amber-200/80 font-medium group-hover:translate-x-0.5 transition-transform">Details & Buy &rarr;</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {showFrame && corner && edgeHorizontal && edgeVertical && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})` }}
            />
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }}
            />

            <div
              className="absolute top-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
              }}
            />
            <div
              className="absolute bottom-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
                transform: "rotate(180deg)",
              }}
            />
            <div
              className="absolute left-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
              }}
            />
            <div
              className="absolute right-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
  onSelectFrame?: (frame: Frame) => void
}

export function DynamicFrameLayout({ 
  frames: initialFrames, 
  className = "",
  showFrames = false,
  hoverSize = 6,
  gapSize = 4,
  onSelectFrame
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  const getRowSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

        return (
          <motion.div
            key={frame.id}
            className="relative"
            style={{
              transformOrigin,
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <FrameComponent
              video={frame.video}
              image={frame.image}
              title={frame.title}
              medium={frame.medium}
              price={frame.price}
              status={frame.status}
              width="100%"
              height="100%"
              className="absolute inset-0"
              corner={frame.corner || ""}
              edgeHorizontal={frame.edgeHorizontal || ""}
              edgeVertical={frame.edgeVertical || ""}
              mediaSize={frame.mediaSize}
              borderThickness={frame.borderThickness || 0}
              borderSize={frame.borderSize || 100}
              showFrame={showFrames}
              isHovered={hovered?.row === row && hovered?.col === col}
              onClick={() => onSelectFrame?.(frame)}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
