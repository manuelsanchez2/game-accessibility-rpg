import { create } from 'zustand'

type SettingsModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useSettingsModal = create<SettingsModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
