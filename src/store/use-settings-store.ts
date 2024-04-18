import { create } from 'zustand'

interface SettingsStoreProps {
  volumeMusic: number
  volumeEffects: number
  setVolumeMusic: (volume: number) => void
  setVolumeEffects: (volume: number) => void
}

export const useSettingsStore = create<SettingsStoreProps>((set) => ({
  volumeMusic: 0.5,
  volumeEffects: 0.5,
  setVolumeMusic: (volume: number) => set({ volumeMusic: volume }),
  setVolumeEffects: (volume: number) => set({ volumeEffects: volume }),
}))
