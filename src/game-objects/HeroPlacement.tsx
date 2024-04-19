import { Placement } from './Placement'
import Hero from '../components/object-graphics/Hero'
import {
  CELL_SIZE,
  DirectionProps,
  HERO_WALK_FRAMES,
  directionUpdateMap,
} from '@/constants'
import { Coordinate } from '@/types'
import { Collision } from '@/classes/Collision'

export class HeroPlacement extends Placement {
  private currentFrameIndex: number = 0
  private lastDirection: DirectionProps | null = null

  controllerMoveRequested(direction: DirectionProps) {
    if (this.movingPixelsRemaining > 0) {
      return
    }

    if (this.isSolidAtNextPosition(direction)) return

    if (this.lastDirection !== direction) {
      this.currentFrameIndex = 0 // Reset the animation if direction changes
      this.lastDirection = direction
    } else {
      // Increment frame index or reset if it exceeds the number of frames
      this.currentFrameIndex =
        (this.currentFrameIndex + 1) % HERO_WALK_FRAMES[direction].length
    }

    // Start the move
    this.movingPixelsRemaining = CELL_SIZE
    this.movingPixelDirection = direction
  }

  isSolidAtNextPosition(direction: DirectionProps) {
    // Is the next space in bounds?  // dentro de los limites?
    const collision = this.getCollisionAtNextPosition(direction)

    const isOutOfBounds = this?.level?.isPositionOutOfBounds(
      collision.x,
      collision.y
    )
    if (isOutOfBounds) return true

    return Boolean(collision.isSolidPlacement())
  }

  getCollisionAtNextPosition(direction: DirectionProps) {
    const { x, y } = directionUpdateMap[direction]
    const nextX = this.x + x
    const nextY = this.y + y

    // @ts-ignore
    return new Collision(this, this.level, {
      x: nextX,
      y: nextY,
    })
  }

  getFrame(): Coordinate {
    const direction = this.movingPixelDirection as DirectionProps
    const frames = HERO_WALK_FRAMES[direction] as Coordinate[]
    console.log('frames', frames[this.currentFrameIndex])
    return frames[this.currentFrameIndex]
  }

  renderComponent() {
    return <Hero frameCoord={this.getFrame()} />
  }

  tick() {
    this.tickMovingPixelProgress()
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) {
      this.currentFrameIndex = 0 // Reset to idle frame when movement stops
      return
    }

    this.movingPixelsRemaining -= this.travelPixelsPerFrame
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0
      this.onDoneMoving()
      // this.moving = false;
    }
  }

  onDoneMoving() {
    const { x, y } =
      directionUpdateMap[this.movingPixelDirection as DirectionProps]
    this.x += x
    this.y += y
  }
}
