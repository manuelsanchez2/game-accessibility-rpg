import { Placement } from './Placement'
import Hero from '../components/object-graphics/Hero'
import { CELL_SIZE, DirectionProps, directionUpdateMap } from '@/constants'
import { Coordinate } from '@/types'

export class HeroPlacement extends Placement {
  controllerMoveRequested(direction: DirectionProps) {
    //Attempt to start moving
    // TODO: IMPORTANT: if we remove this check, we can move the hero while they are moving, not on a grid based system
    if (this.movingPixelsRemaining > 0) {
      return
    }

    //Start the move
    this.movingPixelsRemaining = CELL_SIZE
    this.movingPixelDirection = direction
  }

  getFrame() {
    let defaultFrame = '2x0' as Coordinate
    switch (this.movingPixelDirection) {
      case 'LEFT':
        defaultFrame = '2x2'
        break
      case 'RIGHT':
        defaultFrame = '2x4'
        break
      case 'UP':
        defaultFrame = '2x6'
        break
      case 'DOWN':
        defaultFrame = '2x0'
        break
    }

    return defaultFrame
  }

  renderComponent() {
    return <Hero frameCoord={this.getFrame()} />
  }

  tick() {
    this.tickMovingPixelProgress()
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) return

    console.log('this.movingPixelsRemaining', this.movingPixelsRemaining)
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
