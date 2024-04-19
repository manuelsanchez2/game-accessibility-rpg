import {
  LevelProps,
  PlacementPropertiesProps,
  PlacementWithSpecificPropsAndMethods,
} from '@/types'

/**
 * Represents a collision detection mechanism in a game or simulation.
 *
 * @remarks
 * The `Collision` class is responsible for handling and identifying collisions
 * between a specified "collider" object and other objects within a given level.
 */
export class Collision {
  /**
   * The object that acts as the collider or "forBody".
   */
  public collider: PlacementPropertiesProps

  /**
   * The level within which the collision detection occurs.
   */
  public level: LevelProps

  /**
   * A list of objects that are colliding with the `collider` at its current position.
   */
  public placementAtPosition: any[]

  /**
   * The x-coordinate of the collider's position.
   */
  public x: number

  /**
   * The y-coordinate of the collider's position.
   */
  public y: number

  /**
   * Creates an instance of the `Collision` class.
   *
   * @param collider - The object that will act as the collider.
   * @param level - The level or environment within which the collision detection takes place.
   * @param position - The initial position (x, y) of the collider. If not provided, it defaults to the `collider`'s position.
   *
   * @remarks
   * The constructor initializes the `Collision` instance and scans for placements at the given position.
   */
  constructor(
    collider: PlacementPropertiesProps,
    level: LevelProps,
    position?: {
      x: number
      y: number
    }
  ) {
    this.collider = collider
    this.level = level
    this.placementAtPosition = []
    this.x = position ? position.x : collider.x
    this.y = position ? position.y : collider.y
    this.scanPlacementsAtPosition()
  }

  /**
   * Scans for any placements at the collider's current position within the level.
   */
  scanPlacementsAtPosition() {
    // @ts-ignore
    this.placementAtPosition = this.level?.placements.filter((p) => {
      const isSelf = p.id === this.collider.id
      return !isSelf && p.x === this.x && p.y === this.y
    })

    console.log(
      'This is the thing we are colliding to',
      this.placementAtPosition
    )
  }

  /**
   * Checks if the placement at the collider's current position is solid, meaning that the player cannot go through it.
   */

  isSolidPlacement() {
    return this.placementAtPosition.find(
      (p: PlacementWithSpecificPropsAndMethods) =>
        p.isSolidForCollider(this.collider)
    )
  }

  /**
   * Checks if the placement at the collider's current position adds an item to the player's inventory.
   */
  isItemForInventoryPlacement() {
    // If you want to pick up a lot of things, we need to change the find
    if (this.collider.canCollectItems) {
      return this.placementAtPosition.find((p) => {
        return (
          !p.hasBeenCollected && p.addsItemToInventoryOnCollide(this.collider)
        )
      })
    }
    return null
  }

  withPlacementMovesBody() {
    if (this.collider.interactsWithGround) {
      return this.placementAtPosition.find((p) => {
        return p.autoMovesBodyOnCollide(this.collider)
      })
    }
    return null
  }
}
