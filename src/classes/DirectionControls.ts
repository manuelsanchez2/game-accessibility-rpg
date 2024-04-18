import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DirectionProps,
} from '@/constants'

export class DirectionControls {
  directionKeys: { [key: string]: DirectionProps }
  heldDirections: DirectionProps[]
  directionKeyDownHandler: (e: KeyboardEvent) => void
  directionKeyUpHandler: (e: KeyboardEvent) => void

  constructor() {
    this.directionKeys = {
      ArrowLeft: DIRECTION_LEFT,
      ArrowRight: DIRECTION_RIGHT,
      ArrowUp: DIRECTION_UP,
      ArrowDown: DIRECTION_DOWN,
      s: DIRECTION_DOWN,
      a: DIRECTION_LEFT,
      w: DIRECTION_UP,
      d: DIRECTION_RIGHT,
    }
    this.heldDirections = []

    this.directionKeyDownHandler = (e) => {
      const dir = this.directionKeys[e.key]
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir)
        console.log(this.heldDirections)
      }
    }

    this.directionKeyUpHandler = (e) => {
      const dir = this.directionKeys[e.key]
      const index = this.heldDirections.indexOf(dir)
      if (index > -1) {
        this.heldDirections.splice(index, 1)
        console.log(this.heldDirections)
      }
    }

    document.addEventListener('keydown', this.directionKeyDownHandler)
    document.addEventListener('keyup', this.directionKeyUpHandler)
  }

  get direction() {
    return this.heldDirections[0]
  }

  unbind() {
    document.removeEventListener('keydown', this.directionKeyDownHandler)
    document.removeEventListener('keyup', this.directionKeyUpHandler)
  }
}
