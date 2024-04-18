import { create } from 'zustand'

interface SpriteStoreProps {
  generalSpriteSheet: HTMLImageElement | null
  characterSpriteSheet: HTMLImageElement | null
  setGeneralSpriteSheet: (image: HTMLImageElement) => void
  setCharacterSpriteSheet: (image: HTMLImageElement) => void
}

export const useSpriteStore = create<SpriteStoreProps>((set) => ({
  generalSpriteSheet: null,
  characterSpriteSheet: null,
  setGeneralSpriteSheet: (image) => set({ generalSpriteSheet: image }),
  setCharacterSpriteSheet: (image) => set({ characterSpriteSheet: image }),
}))
