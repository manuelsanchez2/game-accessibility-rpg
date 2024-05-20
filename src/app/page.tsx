'use client'

import { useEffect } from 'react'
import { useSpriteStore } from '@/store/use-sprite-store'
import {
  SPRITE_SHEET_CHARACTER,
  SPRITE_SHEET_SRC,
  SPRITE_SHEET_NPC,
  SPRITE_SHEET_INFO_NPC,
} from '@/constants'
import RenderLevel from '@/components/level-layout/RenderLevel'
import musicManager from '@/classes/Music'
import soundsManager from '@/classes/Sounds'
import { useSettingsLanguageStore } from '@/store/use-settings-store'
import { i18nData } from '@/i18n/data'

soundsManager.init()
musicManager.init()

musicManager.playMusic('AMBIENT')

export default function Home() {
  const language = useSettingsLanguageStore((state) => state.language)

  const spriteSheetImage = useSpriteStore((state) => state.generalSpriteSheet)
  const spriteCharacterImage = useSpriteStore(
    (state) => state.characterSpriteSheet
  )
  const spriteNpcImage = useSpriteStore((state) => state.npcSpriteSheet)
  const spriteInfoNpcImage = useSpriteStore((state) => state.npcInfoSpriteSheet)

  const setGeneralSpriteSheet = useSpriteStore(
    (state) => state.setGeneralSpriteSheet
  )
  const setCharacterSpriteSheet = useSpriteStore(
    (state) => state.setCharacterSpriteSheet
  )
  const setNpcSpriteSheet = useSpriteStore((state) => state.setNpcSpriteSheet)

  const setInfoSpriteSheet = useSpriteStore((state) => state.setInfoSpriteSheet)

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

  useEffect(() => {
    const image = document.createElement('img')
    image.src = SPRITE_SHEET_NPC
    image.onload = () => setNpcSpriteSheet(image)
  }, [setNpcSpriteSheet])

  useEffect(() => {
    const image = document.createElement('img')
    image.src = SPRITE_SHEET_INFO_NPC
    image.onload = () => setInfoSpriteSheet(image)
  }, [setInfoSpriteSheet])

  // console.log('spriteSheetImage', spriteSheetImage)

  if (
    !spriteSheetImage ||
    !spriteCharacterImage ||
    !spriteNpcImage ||
    !spriteInfoNpcImage
  )
    return (
      <LoadingScreen messageLanguage={i18nData[language].GENERAL.LOADING} />
    )

  return <RenderLevel />
}

const LoadingScreen = ({ messageLanguage }: { messageLanguage: string }) => {
  return (
    <div className="min-h-screen flex flex-col gap-2 justify-center items-center bg-[#273701]">
      <h1 className="font-pressStart2P text-3xl">{messageLanguage}</h1>
    </div>
  )
}
