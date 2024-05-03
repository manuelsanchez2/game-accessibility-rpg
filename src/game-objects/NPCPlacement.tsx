import { Placement } from './Placement'
import { DIRECTION_LEFT, DirectionProps, HERO_WALK_FRAMES } from '@/constants'
import { Coordinate } from '@/types'
import NPC from '@/components/object-graphics/NPC'
import { events } from '@/components/event-manager/EventManager'

export class NPCPlacement extends Placement {
  private currentFrameIndex: number = 0
  private isInteracting: boolean = false
  movingPixelDirection: string = DIRECTION_LEFT

  constructor(properties: any, level: any) {
    super(properties, level)

    this.ready()
  }

  startInteraction() {
    events.emit('start-dialog', this.messages)
    this.isInteracting = true
  }

  endInteraction() {
    this.isInteracting = false
  }

  ready() {
    events.on('end-dialog', null, this.endInteraction.bind(this))
  }

  isSolidForCollider() {
    return true
  }

  changeDirection(direction: DirectionProps) {
    this.movingPixelDirection = direction
  }

  getFrame(): Coordinate {
    const direction = this.movingPixelDirection as DirectionProps
    const frames = HERO_WALK_FRAMES[direction] as Coordinate[]
    return frames[this.currentFrameIndex]
  }

  renderComponent() {
    const { extra, type, messages } = this
    const config = {
      extra,
      type,
      messages,
      interacting: this.isInteracting,
    }

    return <NPC config={config} frameCoord={this.getFrame()} />
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
      // this.moving = false;
    }
  }
}
