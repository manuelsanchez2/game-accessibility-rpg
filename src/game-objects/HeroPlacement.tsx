import { Placement } from './Placement'
import Hero from '../components/object-graphics/Hero'
import {
  CELL_SIZE,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DirectionProps,
  HERO_WALK_FRAMES,
  directionUpdateMap,
} from '@/constants'
import { Coordinate } from '@/types'
import { Collision } from '@/classes/Collision'
import soundsManager from '@/classes/Sounds'
import { NPCPlacement } from './NPCPlacement'
import { events } from '@/components/event-manager/EventManager'

export class HeroPlacement extends Placement {
  private currentFrameIndex: number = 0
  private lastDirection: DirectionProps | null = null
  private canMove: boolean = true

  constructor(properties: any, level: any) {
    super(properties, level)

    this.ready()
    document.addEventListener('keydown', this.handleSpacePress)
  }

  ready() {
    events.on('start-dialog', null, () => {
      this.toggleMovement(false)
      // console.log('start dialog')
    })

    events.on('end-dialog', null, () => {
      this.toggleMovement(true)
      // console.log('finish dialog')
    })
  }

  toggleMovement(boolean: boolean) {
    this.canMove = boolean
  }

  // Cleanup to avoid memory leaks
  destroy() {
    document.removeEventListener('keydown', this.handleSpacePress)
  }

  handleSpacePress = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      this.tryInteraction()
    }
  }

  tryInteraction() {
    if (this.movingPixelsRemaining > 0) {
      return // Skip if currently moving
    }

    const direction = this.movingPixelDirection as DirectionProps // Default direction if not moving
    if (this.isSolidAtNextPosition(direction)) {
      this.handleInteraction(direction)
    }
  }

  handleInteraction(direction: DirectionProps) {
    const collision = this.getCollisionAtNextPosition(direction)
    if (!collision) return

    const collidee = collision.placementAtPosition.find((placement) =>
      placement.isSolidForCollider()
    ) as NPCPlacement
    const getOppositeDirection = () => {
      switch (direction) {
        case DIRECTION_UP:
          return DIRECTION_DOWN
        case DIRECTION_DOWN:
          return DIRECTION_UP
        case DIRECTION_LEFT:
          return DIRECTION_RIGHT
        case DIRECTION_RIGHT:
          return DIRECTION_LEFT
        default:
          return DIRECTION_DOWN
      }
    }

    if (collidee) {
      collidee.changeDirection(getOppositeDirection())
      collidee.startInteraction()
    }
  }

  controllerMoveRequested(direction: DirectionProps) {
    if (!this.canMove) return

    if (this.movingPixelsRemaining > 0) {
      return
    }
    this.movingPixelDirection = direction

    if (this.isSolidAtNextPosition(direction)) return

    this.initiateMovement(direction)
  }

  initiateMovement(direction: DirectionProps) {
    if (this.lastDirection !== direction) {
      this.currentFrameIndex = 0 // Reset the animation if direction changes
      this.lastDirection = direction
      soundsManager.playSfx('MOVE')
    } else {
      // Increment frame index or reset if it exceeds the number of frames
      this.currentFrameIndex =
        (this.currentFrameIndex + 1) % HERO_WALK_FRAMES[direction].length
    }

    // Start the move
    this.movingPixelsRemaining = CELL_SIZE
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
