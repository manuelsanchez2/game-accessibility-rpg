import { TextSampleProps } from '@/components/dialog/config'
import {
  CELL_SIZE,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '@/constants'
import { LevelProps, PlacementProps } from '@/types'

export class Placement {
  id: string | number
  type: string | undefined
  x: number
  y: number
  level: LevelProps
  extra?: string
  messages?: TextSampleProps[]
  travelPixelsPerFrame: number
  movingPixelsRemaining: number
  movingPixelDirection: string

  constructor(properties: PlacementProps, level: LevelProps) {
    this.id = properties.id
    this.type = properties.type
    this.extra = properties.extra
    this.x = properties.x
    this.y = properties.y
    this.messages = properties.messages
    this.level = level

    this.travelPixelsPerFrame = 1.5
    this.movingPixelsRemaining = 0
    this.movingPixelDirection = DIRECTION_DOWN
  }

  ready() {
    // To be overridden
  }

  /**
   * @method isSolidForCollider
   * @description Determines if the placement is solid for a collider
   * @param {PlacementPropertiesProps} _body - The colliding body
   * @returns {boolean} Is solid for collider
   */
  isSolidForCollider(): boolean {
    return false
  }

  renderComponent() {}

  tick() {}

  /**
   * @method displayXY
   * @description Calculates the display coordinates (x, y)
   * @returns {[number, number]} The display coordinates
   */
  displayXY(): [number, number] {
    if (this.movingPixelsRemaining > 0) {
      return this.displayMovingXY()
    }

    const x = this.x * CELL_SIZE
    const y = this.y * CELL_SIZE
    return [x, y]
  }

  displayMovingXY(): [number, number] {
    const x = this.x * CELL_SIZE
    const y = this.y * CELL_SIZE

    const progressPixels = CELL_SIZE - this.movingPixelsRemaining
    switch (this.movingPixelDirection) {
      case DIRECTION_LEFT:
        return [x - progressPixels, y]
      case DIRECTION_RIGHT:
        return [x + progressPixels, y]
      case DIRECTION_UP:
        return [x, y - progressPixels]
      default:
        return [x, y + progressPixels]
    }
  }
}
