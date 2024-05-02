import { LevelState } from '@/classes/LevelState'
import { THEME_BACKGROUNDS } from '@/constants'
import { type LevelProps } from '@/types'
import { useEffect, useState } from 'react'
import LevelBackgroundTilesLayer from './LevelBackgroundTilesLayer'
import LevelPlacementsLayer from './LevelPlacementLayer'
import TopHud from '../hud/TopHud'
import SettingsModal from '../modals/settings-modal'

export default function RenderLevel() {
  const [level, setLevel] = useState<LevelProps>(null)

  useEffect(() => {
    // Create and subscribe to state changes
    // This will get called when the state changes
    const levelState = new LevelState('1-1', (newState: LevelProps) => {
      // This will get trigerred when onEmit is called in the LevelState class
      setLevel(newState)
    })

    // Set initial state
    setLevel(levelState.getState())

    //Destroy method when this component unmounts for cleanup
    return () => {
      levelState.destroy()
    }
  }, [])

  if (!level) {
    return null
  }

  const cameraTranslate = `translate3d(${level.cameraTransformX}, ${level.cameraTransformY}, 0)`

  return (
    <>
      <div
        style={{
          backgroundColor: THEME_BACKGROUNDS[level.theme],
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="!hidden absolute bottom-8 text-center gap-3 flex-col max-w-[500px]">
          <h1 className="text-2xl text-white">
            Accessibility Game Template (Settings)
          </h1>
          <p className="text-lg text-white">
            This is a demo. You can move the character with <kbd>w</kbd>,{' '}
            <kbd>a</kbd>, <kbd>s</kbd> or <kbd>d</kbd>. But the attempt here is
            to make accessible options for most of the users!
          </p>
        </div>
        <div
          className="w-[var(--game-viewport-width)] h-[var(--game-viewport-height)]"
          style={{ transform: `scale(var(--pixel-size))` }}
        >
          <div
            style={{
              transform: cameraTranslate,
            }}
          >
            <LevelBackgroundTilesLayer level={level} />

            <LevelPlacementsLayer level={level} />
          </div>
        </div>
        <TopHud level={level} />
      </div>
      <SettingsModal level={level} />
    </>
  )
}
