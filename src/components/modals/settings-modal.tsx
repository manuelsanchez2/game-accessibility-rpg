'use client'

import { useSettingsModal } from '@/store/use-settings-modal'
import { LevelProps } from '@/types'
import { useEffect, useRef } from 'react'

const SettingsModal = ({ level }: { level: LevelProps }) => {
  const { isOpen, close } = useSettingsModal()
  const modalRef = useRef<HTMLDivElement>(null)

  // This useEffect will handle clicks outside the modal element
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        level?.gameLoop.restart()
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Clean up the event listener when the component is unmounted or the modal is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, close])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed w-full inset-0 z-10">
      <div className="bg-black/25 absolute inset-0 w-full h-full"></div>
      <div
        ref={modalRef}
        id="modal-settings"
        className="absolute max-h-[80vh] md:max-h-[50vh] scroll-y-auto overflow-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border-pixel"
      >
        <div className="flex justify-end">
          <button
            className="text-2xl"
            onClick={() => {
              level?.gameLoop.restart()
              close()
            }}
          >
            X
          </button>
        </div>
        <div>
          <div className="text-center font-bold text-2xl mb-12">Settings</div>
          TO BE DETERMINED HERE heheh
          <p className="mb-4">
            Good luck, and if you find anything weird, you can let me know{' '}
            <a
              className="underline"
              title="Open Github Issues on new tab"
              rel="nofollow noopener"
              target="_blank"
              href="mailto:manusansan22@gmail.com"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
