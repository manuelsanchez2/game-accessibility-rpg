'use client'

import { useEffect } from 'react'
import { useSpriteStore } from '@/store/use-sprite-store'
import { SPRITE_SHEET_CHARACTER, SPRITE_SHEET_SRC } from '@/constants'
import RenderLevel from '@/components/level-layout/RenderLevel'
import musicManager from '@/classes/Music'
import soundsManager from '@/classes/Sounds'

soundsManager.init()
musicManager.init()

musicManager.playMusic('AMBIENT')

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

  if (!spriteSheetImage || !spriteCharacterImage) return <LoadingScreen />

  return <RenderLevel />
}

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col gap-2 justify-center items-center bg-[#273701]">
      <h1 className="font-pressStart2P text-3xl">Loading...</h1>
    </div>
  )
}
