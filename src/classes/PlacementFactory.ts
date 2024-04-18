import { LevelProps, PlacementProps } from '@/types'
import { HeroPlacement } from '../game-objects/HeroPlacement'
import { PLACEMENT_TYPE_HERO } from '@/constants'
// import { GoalPlacement } from '../game-objects/GoalPlacement'

class PlacementFactory {
  createPlacement(config: PlacementProps, level: LevelProps) {
    const instance = this.getInstance(config, level)
    // make ID here...
    // console.log(instance)
    return instance
  }

  getInstance(config: PlacementProps, level: LevelProps) {
    switch (config.type) {
      case PLACEMENT_TYPE_HERO:
        return new HeroPlacement(config, level)
      //   case PLACEMENT_TYPE_GOAL:
      //     return new GoalPlacement(config, level)
      default:
        console.warn('NO TYPE FOUND', config.type)
        return null
    }
  }
}

export const placementFactory = new PlacementFactory()
