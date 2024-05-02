import { GameLoop } from '@/classes/GameLoop'

export type PlacementProps = {
  id: number
  x: number
  y: number
  frameCoord?: string
  type?: string
  name?: string
  extra?: string
}

type LevelProps = {
  theme: string
  tilesWidth: number
  tilesHeight: number
  placements: PlacementProps[]
  heroRef: any
  getState: any
  cameraTransformX?: number
  cameraTransformY?: number
  gameLoop: GameLoop
  isPositionOutOfBounds: (x: number, y: number) => boolean
} | null

export type LevelBackgroundTilesLayerProps = {
  level: LevelProps
}

export type SpriteProps = {
  frameCoord: string
  size?: number
  alternativeSpriteSheetImage?: HTMLImageElement | CanvasImageSource | null
  cropWidth?: number
  cropHeight?: number
}

export type MapCellProps = {
  frameCoord: string
  x: number
  y: number
}

export type Coordinate = `${number}x${number}`

export type PlacementPropertiesProps = {
  id?: number // This is added by the PlacementFactory
  x: number
  y: number
  frameCoord?: Coordinate
  type: PlacementTypes
  direction?: DirectionProps
  corner?: any
  isRaised?: boolean

  canCollectItems?: boolean
  canCompleteLevel?: boolean
  turnsAroundAtWater?: boolean
  interactsWithGround?: boolean
}

export interface PlacementWithSpecificPropsAndMethods
  extends PlacementPropertiesProps,
    LevelProps {
  travelPixelsPerFrame: number
  movingPixelsRemaining: number
  movingPixelDirection: DirectionProps
  spriteFacingDirection: DirectionProps
  spriteWalkFrame: number
  hasBeenCollected: boolean

  changesHeroSkinOnCollide: () => void
  damagesBodyOnCollide: (body: PlacementPropertiesProps) => boolean
  canBeDeleted: () => boolean
  tick: () => void
  displayXY: () => [number, number]
  displayMovingXY: () => [number, number]
  canBeUnlocked: () => boolean
  isSolidForCollider: (body: PlacementPropertiesProps) => boolean
  addsItemToInventoryOnCollide: (
    body: PlacementPropertiesProps
  ) => null | string
  zIndex: () => number
  collect: () => void
  renderComponent: () => JSX.Element
  completeLevelOnCollide: () => boolean
}
