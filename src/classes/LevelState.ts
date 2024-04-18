import { LEVEL_THEMES, PLACEMENT_TYPE_HERO, ThemeType } from '@/constants'
import { placementFactory } from './PlacementFactory'
import { GameLoop } from './GameLoop'
import { DirectionControls } from './DirectionControls'
import { PlacementProps } from '@/types'
import { Camera } from './Camera'

type EmitHandler = (state: any) => void

export class LevelState {
  public id: string
  public onEmit: EmitHandler
  public theme: ThemeType
  public tilesWidth: number
  public tilesHeight: number
  public placements: any
  public gameLoop: GameLoop
  public directionControls: DirectionControls
  public heroRef: any
  public camera: Camera | null = null

  // The order of the arguments is important here.
  // The first argument is the id of the level.
  // The second argument is the function that will be called when the state changes as callback
  constructor(
    levelId: string,
    onEmit: EmitHandler,
    theme: ThemeType = LEVEL_THEMES.BLUE,
    tilesWidth: number = 12,
    tilesHeight: number = 8
  ) {
    this.id = levelId
    this.onEmit = onEmit
    this.directionControls = new DirectionControls()
    this.theme = theme
    this.tilesWidth = tilesWidth
    this.tilesHeight = tilesHeight
    this.placements = []
    this.gameLoop = new GameLoop(() => {
      console.log('Game loop starting')
    })
    this.heroRef = null

    this.start()
  }

  private start() {
    // this.theme = LEVEL_THEMES.BLUE
    // this.tilesWidth = 8
    // this.tilesHeight = 8
    this.placements = [
      { id: 0, x: 2, y: 2, type: PLACEMENT_TYPE_HERO },
      // { id: 1, x: 6, y: 5, type: PLACEMENT_TYPE_GOAL },
    ].map((config) => {
      // This here is where we receive the new instance of the placement with the level inside
      return placementFactory.createPlacement(config, this)
    })

    this.startGameLoop()

    this.heroRef = this.placements.find(
      (p: PlacementProps) => p.type === PLACEMENT_TYPE_HERO
    )

    this.camera = new Camera(this)
  }

  private startGameLoop() {
    this.gameLoop?.stop()
    this.gameLoop = new GameLoop(() => {
      this.tick()
    })
  }

  public pauseGameLoop() {
    this.gameLoop.stop()
  }

  tick() {
    if (this.directionControls.direction) {
      this.heroRef.controllerMoveRequested(this.directionControls.direction)
    }

    // Call 'tick' on any Placement that wants to update
    this.placements.forEach((placement: { tick: () => void }) => {
      placement.tick()
    })

    // Update the camera
    this?.camera?.tick()

    //Emit any changes to React
    this.onEmit(this.getState())
  }

  public getState(): any {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
      cameraTransformX: this?.camera?.transformX ?? 0,
      cameraTransformY: this?.camera?.transformY ?? 0,
      heroRef: this.heroRef,
      gameLoop: this.gameLoop,
    }
  }

  public destroy(): void {
    this.gameLoop.stop()
    this.directionControls.unbind()
  }
}
