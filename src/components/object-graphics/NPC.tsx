import React, { useEffect } from 'react'
import { Sprite } from './Sprite'
import { TILES } from '@/constants'
import { useSpriteStore } from '@/store/use-sprite-store'
import { Coordinate, PlacementProps } from '@/types'
import { useSettingsMotionStore } from '@/store/use-settings-store'
import { useDialogModal } from '@/store/use-dialog-modal'
import { TextSampleProps } from '../dialog/config'
import { wait } from '@/helpers'

type NPCProps = {
  config?: {
    extra: string | undefined
    type: string | undefined
    messages: TextSampleProps[] | undefined
    name?: string
    interacting?: boolean
  }
  frameCoord: Coordinate
}

const NPC = ({ config, frameCoord }: NPCProps) => {
  const { open, setMessages } = useDialogModal()
  const standardNPCSpriteSheet = useSpriteStore((state) => state.npcSpriteSheet)
  const infoNPCSpriteSheet = useSpriteStore((state) => state.npcInfoSpriteSheet)
  let finalNPCSpriteSheet = standardNPCSpriteSheet
  const { reducedMotion } = useSettingsMotionStore((state) => ({
    reducedMotion: state.reducedMotion,
  }))
  const hasExtraInfo = config && config.extra === 'info'

  let defaultConfig = {
    width: 32,
    height: 32,
    name: 'npc1',
  }

  if (config && config.name === 'npc2') {
    // finalNPCSpriteSheet = useSpriteStore((state) => state.npcSpriteSheet)
  }

  useEffect(() => {
    if (config?.interacting && config?.messages) {
      wait(100)
      setMessages(config.messages)

      wait(100)
      open()
    }
  }, [config?.interacting])

  return (
    <div className="relative">
      {hasExtraInfo && (
        <div
          className={
            reducedMotion
              ? 'absolute -top-[28px]'
              : 'absolute -top-[28px] motion-safe:rpg-bounce'
          }
        >
          <Sprite
            frameCoord="0x0"
            alternativeSpriteSheetImage={infoNPCSpriteSheet}
          />
        </div>
      )}
      <div>
        <Sprite frameCoord={TILES.SHADOW} />
      </div>
      <div className="absolute -left-[8px] -top-[16px]">
        <Sprite
          alternativeSpriteSheetImage={
            finalNPCSpriteSheet ? finalNPCSpriteSheet : standardNPCSpriteSheet
          }
          frameCoord={frameCoord}
          cropWidth={defaultConfig.width}
          cropHeight={defaultConfig.height}
        />
      </div>
    </div>
  )
}

export default NPC
