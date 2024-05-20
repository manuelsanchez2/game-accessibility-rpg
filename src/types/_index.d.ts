export type Property = {
  name: string
  type: string
  value: boolean
}

export type InitialTileset = {
  columns: number
  firstgid: number
  image: string // URL to the image file
  imageheight: number
  imagewidth: number
  margin: number
  name: string
  spacing: number
  tilecount: number
  tileheight: number
  tilewidth: number
}

export type LoadedTileset = {
  columns: number
  firstgid: number
  image: HTMLImageElement // Loaded image element
  imageheight: number
  imagewidth: number
  margin: number
  name: string
  spacing: number
  tilecount: number
  tileheight: number
  tilewidth: number
}

export type ObjectDetail = {
  ellipse?: boolean
  height: number
  id: number
  name: string
  point?: boolean
  rotation: number
  type?: string
  visible: boolean
  width: number
  x: number
  y: number
  properties?: Property[]
}

export type BaseLayer = {
  id: number
  name: string
  opacity: number
  type: string
  visible: boolean
  x: number
  y: number
}

export type TileLayer = BaseLayer & {
  type: 'tilelayer'
  data: number[]
  height: number
  width: number
  offsetx?: number
  offsety?: number
}

export type ObjectGroupLayer = BaseLayer & {
  type: 'objectgroup'
  objects: ObjectDetail[]
  draworder?: string
  color?: string
  tintcolor?: string
  // No height or width as these are not required for object groups
}

export type Layer = TileLayer | ObjectGroupLayer

export type MapData = {
  compressionlevel: number
  height: number
  infinite: boolean
  layers: Layer[]
  nextlayerid: number
  nextobjectid: number
  orientation: string
  renderorder: string
  tiledversion: string
  tileheight: number
  tilesets: InitialTileset[] // Use InitialTileset here
  tilewidth: number
  type: string
  version: string
  width: number
}

export type LanguageProps = 'en' | 'es' | 'ru' | 'it'
