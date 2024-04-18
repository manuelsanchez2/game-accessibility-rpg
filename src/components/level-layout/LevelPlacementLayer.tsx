import { LevelBackgroundTilesLayerProps } from '@/types'

export default function LevelPlacementsLayer({
  level,
}: LevelBackgroundTilesLayerProps) {
  if (!level) return null

  return (
    <>
      {level &&
        level.placements.map((placement: any) => {
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
