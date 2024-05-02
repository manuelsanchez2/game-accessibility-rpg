import { create } from 'zustand'

interface SpriteStoreProps {
  generalSpriteSheet: HTMLImageElement | null
  characterSpriteSheet: HTMLImageElement | null
  npcSpriteSheet: HTMLImageElement | null
  npcInfoSpriteSheet: HTMLImageElement | null
  setGeneralSpriteSheet: (image: HTMLImageElement) => void
  setCharacterSpriteSheet: (image: HTMLImageElement) => void
  setNpcSpriteSheet: (image: HTMLImageElement) => void
  setInfoSpriteSheet: (image: HTMLImageElement) => void
}

export const useSpriteStore = create<SpriteStoreProps>((set) => ({
  generalSpriteSheet: null,
  characterSpriteSheet: null,
  npcSpriteSheet: null,
  npcInfoSpriteSheet: null,
  setGeneralSpriteSheet: (image) => set({ generalSpriteSheet: image }),
  setCharacterSpriteSheet: (image) => set({ characterSpriteSheet: image }),
  setNpcSpriteSheet: (image) => set({ npcSpriteSheet: image }),
  setInfoSpriteSheet: (image) => set({ npcInfoSpriteSheet: image }),
}))
