'use client'

import { useEffect, useRef } from 'react'

interface AsciiPixelFilterProps {
  mode: 'none' | 'ascii' | 'pixel' | 'matrix'
  videoSrc: string
  className?: string
}

export function AsciiPixelFilter({ mode, videoSrc, className = '' }: AsciiPixelFilterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mode === 'none') return

    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let animationFrameId: number

    const render = () => {
      if (video.paused || video.ended) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      const width = canvas.width
      const height = canvas.height

      // Draw current video frame scaled down
      if (mode === 'pixel') {
        const pixelSize = 12
        const w = Math.floor(width / pixelSize)
        const h = Math.floor(height / pixelSize)

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(video, 0, 0, w, h)
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height)
      } else if (mode === 'ascii' || mode === 'matrix') {
        const cols = 80
        const rows = 45
        const cellW = width / cols
        const cellH = height / rows

        // Temporary draw to low res
        ctx.drawImage(video, 0, 0, cols, rows)
        const imgData = ctx.getImageData(0, 0, cols, rows).data

        // Clear canvas for drawing text
        ctx.fillStyle = '#060709'
        ctx.fillRect(0, 0, width, height)

        ctx.font = `${cellH * 0.9}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const chars = mode === 'matrix' ? '0123456789ABCDEF$#@%' : ' .:-=+*#%@'

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const i = (r * cols + c) * 4
            const red = imgData[i]
            const green = imgData[i + 1]
            const blue = imgData[i + 2]
            const brightness = (red + green + blue) / 3

            const charIdx = Math.floor((brightness / 255) * (chars.length - 1))
            const char = chars[charIdx]

            if (mode === 'matrix') {
              ctx.fillStyle = `rgb(50, ${brightness + 80}, 100)`
            } else {
              // Warm Amber Gold ASCII
              ctx.fillStyle = `rgb(${brightness + 100}, ${Math.floor(brightness * 0.8 + 50)}, 40)`
            }

            ctx.fillText(char, c * cellW + cellW / 2, r * cellH + cellH / 2)
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [mode, videoSrc])

  if (mode === 'none') return null

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
