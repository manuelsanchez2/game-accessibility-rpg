import { IS_DEBUG_SETTINGS_MODE_ENABLED } from '@/constants'
import { create } from 'zustand'

type DialogModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useDialogModal = create<DialogModalState>((set) => ({
  isOpen: IS_DEBUG_SETTINGS_MODE_ENABLED,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
