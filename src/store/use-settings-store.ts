import { LanguageProps } from '@/types/_index'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

// SETTINGS - LANGUAGE
interface SettingsLanguageStoreProps {
  language: LanguageProps
  setLanguage: (language: LanguageProps) => void
}

export const useSettingsLanguageStore = create<SettingsLanguageStoreProps>()(
  devtools(
    persist(
      (set) => ({
        language: 'en',
        setLanguage: (language: LanguageProps) => set({ language: language }),
      }),
      { name: 'settings-language' }
    )
  )
)

// SETTINGS - AUDIO (START)
interface SettingsAudioStoreProps {
  volumeMusic: number
  volumeEffects: number
  setVolumeMusic: (volume: number) => void
  setVolumeEffects: (volume: number) => void
  resetAudioSettings: () => void
}

export const useSettingsAudioStore = create<SettingsAudioStoreProps>()(
  devtools(
    persist(
      (set) => ({
        volumeMusic: 0.5,
        volumeEffects: 0.5,
        setVolumeMusic: (volume: number) => set({ volumeMusic: volume }),
        setVolumeEffects: (volume: number) => set({ volumeEffects: volume }),
        resetAudioSettings: () => set({ volumeMusic: 0.5, volumeEffects: 0.5 }),
      }),
      { name: 'settings-audio' }
    )
  )
)

// SETTINGS - DISPLAY (START)
interface SettingsDisplayStoreProps {
  textSize: number
  textColor: string
  textDialogSize: number
  textDialogColor: string
  hudColorBg: string
  dialogColorBg: string
  setTextSize: (size: number) => void
  setTextColor: (color: string) => void
  setTextDialogSize: (size: number) => void
  setTextDialogColor: (color: string) => void
  setHudColorBg: (color: string) => void
  setDialogColorBg: (color: string) => void
  resetDisplaySettings: () => void
}

export const useSettingsDisplayStore = create<SettingsDisplayStoreProps>()(
  devtools(
    persist(
      (set) => ({
        textSize: 3,
        textColor: '#fff',
        textDialogSize: 5,
        textDialogColor: '#292929',
        hudColorBg: '#FF9A03',
        dialogColorBg: '#fff',
        setTextSize: (size: number) => set({ textSize: size }),
        setTextColor: (color: string) => set({ textColor: color }),
        setTextDialogSize: (size: number) => set({ textDialogSize: size }),
        setTextDialogColor: (color: string) => set({ textDialogColor: color }),
        setHudColorBg: (color: string) => set({ hudColorBg: color }),
        setDialogColorBg: (color: string) => set({ dialogColorBg: color }),
        resetDisplaySettings: () =>
          set({
            textSize: 3,
            textColor: '#fff',
            textDialogColor: '#292929',
            textDialogSize: 5,
            hudColorBg: '#FF9A03',
            dialogColorBg: '#fff',
          }),
      }),
      { name: 'settings-display' }
    )
  )
)

// SETTINGS - MOTION (START)
interface SettingsMotionStoreProps {
  reducedMotion: boolean
  setReducedMotion: (reduced: boolean) => void
  resetMotionSettings: () => void
}

export const useSettingsMotionStore = create<SettingsMotionStoreProps>()(
  devtools(
    persist(
      (set) => ({
        reducedMotion: false,
        setReducedMotion: (reduced: boolean) => set({ reducedMotion: reduced }),
        resetMotionSettings: () => set({ reducedMotion: false }),
      }),
      { name: 'settings-motion' }
    )
  )
)
