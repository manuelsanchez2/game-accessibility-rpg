'use client'

import { CELL_SIZE } from '@/constants'
import { useSpriteStore } from '@/store/use-sprite-store'
import { SpriteProps } from '@/types'
import { memo, useEffect, useRef } from 'react'

function ProtoSprite({
  frameCoord,
  cropWidth = 16,
  cropHeight = 16,
  alternativeSpriteSheetImage,
}: SpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spriteSheetImageFromStore = useSpriteStore(
    (state) => state.generalSpriteSheet
  )

  useEffect(() => {
    // This is they way to type with JSDOC /** @type {HTMLCanvasElement} */
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    ctx?.clearRect(0, 0, canvas.width, canvas.height)

    const [tileSheetX, tileSheetY] = frameCoord.split('x').map(Number)
    const spriteSheetImage = alternativeSpriteSheetImage
      ? alternativeSpriteSheetImage
      : spriteSheetImageFromStore

    ctx?.drawImage(
      spriteSheetImage as CanvasImageSource, // This is the image loaded in the parent component,
      tileSheetX * CELL_SIZE,
      tileSheetY * CELL_SIZE,
      cropWidth, // changed
      cropHeight, // changed
      0, // Where to place the image on the canvas
      0, // Where to place the image on the canvas
      cropWidth, // Changed this
      cropHeight // And this
    )
  }, [spriteSheetImageFromStore, frameCoord, cropWidth, cropHeight])

  return <canvas width={cropWidth} height={cropHeight} ref={canvasRef} />
}

export const Sprite = memo(ProtoSprite)
