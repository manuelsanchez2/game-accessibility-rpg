import { SCALE_FACTOR } from '@/constants'
import { Layer, MapData, LoadedTileset } from '@/types'

export class Level {
  private map: MapData
  private ctx: CanvasRenderingContext2D
  tilesets: Map<number, LoadedTileset> = new Map()

  /**
   * Creates an instance of the Level class.
   * @param map - The map data including layers and tilesets.
   * @param ctx - The rendering context of a canvas.
   */
  constructor(map: MapData, ctx: CanvasRenderingContext2D) {
    this.map = map
    this.ctx = ctx
    this.tilesets = new Map()
  }

  /**
   * Loads the tileset images into memory for rendering.
   */

  loadTilesets(callback: () => void): void {
    const tilesetLoads = this.map.tilesets.map((tileset) => {
      return new Promise<void>((resolve) => {
        const image = new Image()
        image.onload = () => {
          this.tilesets.set(tileset.firstgid, {
            ...tileset,
            image: image, // Here, you convert to LoadedTileset
          })
          resolve()
        }
        image.src = tileset.image
      })
    })

    Promise.all(tilesetLoads).then(() => {
      callback()
    })
  }

  /**
   * Draws a specified layer on the canvas.
   * @param layer - The layer data to draw.
   */
  drawLayer(layer: Layer): void {
    if (layer.type === 'tilelayer') {
      for (let y = 0; y < layer.height; y++) {
        for (let x = 0; x < layer.width; x++) {
          const tile = layer.data[y * layer.width + x]
          if (tile !== 0) {
            this.drawTile(tile, x, y)
          }
        }
      }
    }
  }

  /**
   * Draws a single tile.
   * @param tileId - The ID of the tile to draw.
   * @param x - The x coordinate where the tile starts.
   * @param y - The y coordinate where the tile starts.
   */
  private drawTile(tileId: number, x: number, y: number): void {
    const entries = Array.from(this.tilesets.entries()) // Convert to an array

    for (const [firstGid, tileset] of entries) {
      if (tileId >= firstGid && tileId < firstGid + tileset.tilecount) {
        const tile = tileId - firstGid
        const tilesPerRow = tileset.imagewidth / tileset.tilewidth
        const sx = (tile % tilesPerRow) * tileset.tilewidth
        const sy = Math.floor(tile / tilesPerRow) * tileset.tileheight

        // Define the scaling factor
        const scale = SCALE_FACTOR

        this.ctx.drawImage(
          tileset.image, // This is the image loaded in the parent component,
          sx,
          sy,
          tileset.tilewidth, // How much to crop from the spritesheet
          tileset.tileheight, // How much to crop from the spritesheet
          x * tileset.tilewidth, // Where to place the image on the canvas
          y * tileset.tileheight + 130, // Where to place the image on the canvas
          tileset.tilewidth * scale, // How big the image should scale on the canvas
          tileset.tileheight * scale // How big the image should scale on the canvas
        )

        break
      }
    }
  }
}
