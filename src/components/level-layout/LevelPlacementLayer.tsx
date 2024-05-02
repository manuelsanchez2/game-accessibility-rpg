import { LevelBackgroundTilesLayerProps } from '@/types'

export default function LevelPlacementsLayer({
  level,
}: LevelBackgroundTilesLayerProps) {
  if (!level) return null

  const sortedPlacements = level.placements.sort((a, b) => a.y - b.y)

  return (
    <>
      {sortedPlacements.map((placement: any, index) => {
        const [x, y] = placement.displayXY()
        const style = {
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }

        return (
          <div key={placement.id} style={style} className="absolute">
            {placement.renderComponent()}
          </div>
        )
      })}
    </>
  )
}
