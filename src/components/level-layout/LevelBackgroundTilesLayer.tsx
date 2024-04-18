import { THEME_TILES_MAP } from '@/constants'
import MapCell from './MapCell'
import { LevelBackgroundTilesLayerProps } from '@/types'

export default function LevelBackgroundTilesLayer({
  level,
}: LevelBackgroundTilesLayerProps) {
  if (!level) return null

  const widthWithWalls = level.tilesWidth + 1
  const heightWithWalls = level.tilesHeight + 1
  const { LEFT, RIGHT, TOP, BOTTOM, FLOOR } = THEME_TILES_MAP[level.theme]

  const getBackgroundTile = (x: number, y: number) => {
    if (x === 0) return LEFT
    if (x === widthWithWalls) return RIGHT
    if (y === 0) return TOP
    if (y === heightWithWalls) return BOTTOM
    return FLOOR
  }

  let canvases = []
  for (let y = 0; y <= heightWithWalls; y++) {
    for (let x = 0; x <= widthWithWalls; x++) {
      // add a cell to the map
      // Skip Bottom Left and Bottom Right for intentional blank tiles in those corners
      if (y === heightWithWalls) {
        if (x === 0 || x === widthWithWalls) {
          continue
        }
      }

      canvases.push(
        <MapCell
          x={x}
          y={y}
          frameCoord={getBackgroundTile(x, y)}
          key={`${x}_${y}`}
        />
      )
    }
  }

  return <div>{canvases}</div>
}
