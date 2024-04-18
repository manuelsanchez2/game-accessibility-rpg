'use client'

import { useEffect } from 'react'
import { useSpriteStore } from '@/store/use-sprite-store'
import { SPRITE_SHEET_CHARACTER, SPRITE_SHEET_SRC } from '@/constants'
import RenderLevel from '@/components/level-layout/RenderLevel'

export default function Home() {
  const spriteSheetImage = useSpriteStore((state) => state.generalSpriteSheet)
  const spriteCharacterImage = useSpriteStore(
    (state) => state.characterSpriteSheet
  )
  const setGeneralSpriteSheet = useSpriteStore(
    (state) => state.setGeneralSpriteSheet
  )
  const setCharacterSpriteSheet = useSpriteStore(
    (state) => state.setCharacterSpriteSheet
  )

  useEffect(() => {
    const image = document.createElement('img')
    image.src = SPRITE_SHEET_SRC
    image.onload = () => setGeneralSpriteSheet(image)
  }, [setGeneralSpriteSheet])

  useEffect(() => {
    const image = document.createElement('img')
    image.src = SPRITE_SHEET_CHARACTER
    image.onload = () => setCharacterSpriteSheet(image)
  }, [setCharacterSpriteSheet])

  // console.log('spriteSheetImage', spriteSheetImage)

  if (!spriteSheetImage) return <div>Loading...</div>
  if (!spriteCharacterImage) return <div>Loading...</div>

  return <RenderLevel />
}
