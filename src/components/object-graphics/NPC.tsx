import React from 'react'
import { Sprite } from './Sprite'
import { TILES } from '@/constants'
import { useSpriteStore } from '@/store/use-sprite-store'
import { Coordinate, PlacementProps } from '@/types'
import { useSettingsMotionStore } from '@/store/use-settings-store'

const NPC = ({
  config,
  frameCoord,
}: {
  config?: Pick<PlacementProps, 'extra' | 'type' | 'name'>
  frameCoord: Coordinate
}) => {
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
