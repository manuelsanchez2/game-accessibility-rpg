import { CELL_SIZE } from '@/constants'
import { Sprite } from '../object-graphics/Sprite'
import { MapCellProps } from '@/types'

export default function MapCell({ frameCoord, x, y }: MapCellProps) {
  const style = {
    left: x * CELL_SIZE + 'px',
    top: y * CELL_SIZE + 'px',
  }

  return (
    <div className="absolute" style={style}>
      <Sprite frameCoord={frameCoord} />
    </div>
  )
}
