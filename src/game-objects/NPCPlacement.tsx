import { Placement } from './Placement'
import { DirectionProps, HERO_WALK_FRAMES } from '@/constants'
import { Coordinate } from '@/types'
import NPC from '@/components/object-graphics/NPC'

export class NPCPlacement extends Placement {
  private currentFrameIndex: number = 0

  isSolidForCollider() {
    return true
  }

  getFrame(): Coordinate {
    const direction = this.movingPixelDirection as DirectionProps
    const frames = HERO_WALK_FRAMES[direction] as Coordinate[]
    return frames[this.currentFrameIndex]
  }

  renderComponent() {
    const { extra, type } = this
    const config = {
      extra,
      type,
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
