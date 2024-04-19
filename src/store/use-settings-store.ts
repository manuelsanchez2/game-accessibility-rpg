import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

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
  hudColorBg: string
  setTextSize: (size: number) => void
  setTextColor: (color: string) => void
  setHudColorBg: (color: string) => void
  resetDisplaySettings: () => void
}

export const useSettingsDisplayStore = create<SettingsDisplayStoreProps>()(
  devtools(
    persist(
      (set) => ({
        textSize: 3,
        textColor: '#fff',
        hudColorBg: '#FF9A03',
        setTextSize: (size: number) => set({ textSize: size }),
        setTextColor: (color: string) => set({ textColor: color }),
        setHudColorBg: (color: string) => set({ hudColorBg: color }),
        resetDisplaySettings: () =>
          set({ textSize: 3, textColor: '#fff', hudColorBg: '#FF9A03' }),
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
