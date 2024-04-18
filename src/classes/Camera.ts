import {
  CELL_SIZE,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '@/constants'
import { LevelProps } from '@/types'

const CAMERA_SPEED = 0.02
const CAMERA_LOOKAHEAD = 3
const USE_SMOOTH_CAMERA = true

export class Camera {
  level: LevelProps
  cameraX: number
  cameraY: number
  transformOffset: number
  constructor(level: LevelProps) {
    this.level = level
    console.log('level', level)
    const [heroX, heroY] = this.level?.heroRef.displayXY()
    this.cameraX = heroX
    this.cameraY = heroY
    this.transformOffset = -4.5 * CELL_SIZE
  }

  get transformX() {
    return -this.cameraX - this.transformOffset + 'px'
  }

  get transformY() {
    return -this.cameraY - this.transformOffset + 'px'
  }

  static lerp(currentValue: number, destinationValue: number, time: number) {
    return currentValue * (1 - time) + destinationValue * time
  }

  tick() {
    // Start where the Hero is now
    const hero = this.level?.heroRef
    const [heroX, heroY] = hero.displayXY()
    let cameraDestinationX = heroX
    let cameraDestinationY = heroY

    //If moving, put the camera slightly ahead of where Hero is going
    if (hero.movingPixelsRemaining > 0) {
      if (hero.movingPixelDirection === DIRECTION_DOWN) {
        cameraDestinationY += CAMERA_LOOKAHEAD * CELL_SIZE
      } else if (hero.movingPixelDirection === DIRECTION_UP) {
        cameraDestinationY -= CAMERA_LOOKAHEAD * CELL_SIZE
      } else if (hero.movingPixelDirection === DIRECTION_LEFT) {
        cameraDestinationX -= CAMERA_LOOKAHEAD * CELL_SIZE
      } else if (hero.movingPixelDirection === DIRECTION_RIGHT) {
        cameraDestinationX += CAMERA_LOOKAHEAD * CELL_SIZE
      }
    }

    if (USE_SMOOTH_CAMERA) {
      this.cameraX = Camera.lerp(this.cameraX, cameraDestinationX, CAMERA_SPEED)
      this.cameraY = Camera.lerp(this.cameraY, cameraDestinationY, CAMERA_SPEED)
    } else {
      this.cameraX = cameraDestinationX
      this.cameraY = cameraDestinationY
    }
  }
}
