import { IS_DEBUG_DIALOG_MODE_ENABLED } from '@/constants'
import { TEXT_SAMPLES, TextSamples } from '@/i18n/data'
import { create } from 'zustand'

type DialogModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
  messages: TextSamples
  setMessages: (messages: TextSamples) => void
}

export const useDialogModal = create<DialogModalState>((set) => ({
  isOpen: IS_DEBUG_DIALOG_MODE_ENABLED,
  open: () => set({ isOpen: true }),
  close: () => {
    set({ isOpen: false })
  },
  messages: IS_DEBUG_DIALOG_MODE_ENABLED
    ? TEXT_SAMPLES
    : { en: [], es: [], ru: [], it: [] },
  setMessages: (messages) => set({ messages }),
}))
