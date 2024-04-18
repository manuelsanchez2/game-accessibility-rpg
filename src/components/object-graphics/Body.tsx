import React from 'react'
import { Sprite } from './Sprite'
import { TILES } from '@/constants'
import { Coordinate } from '@/types'

const Body = ({
  frameCoord,
  yTranslate,
  showShadow,
}: {
  frameCoord: Coordinate
  yTranslate: number
  showShadow: boolean
}) => {
  return (
    <div className="relative">
      <div>{showShadow && <Sprite frameCoord={TILES.SHADOW} />}</div>
      <div className="absolute left-[-8px] top-[-19px]">
        <Sprite frameCoord={frameCoord} size={32} />
      </div>
    </div>
  )
}

export default Body
