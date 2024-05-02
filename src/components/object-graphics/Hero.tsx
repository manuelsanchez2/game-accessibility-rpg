import React from 'react'
import { Sprite } from './Sprite'
import { TILES } from '@/constants'
import { useSpriteStore } from '@/store/use-sprite-store'
import { Coordinate } from '@/types'

const Hero = ({ frameCoord }: { frameCoord: Coordinate }) => {
  const heroSpriteSheet = useSpriteStore((state) => state.characterSpriteSheet)
  return (
    <div className="relative">
      <div>
        <Sprite frameCoord={TILES.SHADOW} />
      </div>
      <div className="absolute z-[100] -left-[8px] -top-[16px]">
        <Sprite
          alternativeSpriteSheetImage={heroSpriteSheet}
          frameCoord={frameCoord}
          cropWidth={32} // added`
          cropHeight={32} // added
        />
      </div>
    </div>
  )
}

export default Hero
