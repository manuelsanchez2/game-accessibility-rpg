import { IS_DEBUG_SETTINGS_MODE_ENABLED } from '@/constants'
import { create } from 'zustand'

type SettingsModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useSettingsModal = create<SettingsModalState>((set) => ({
  isOpen: IS_DEBUG_SETTINGS_MODE_ENABLED,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
