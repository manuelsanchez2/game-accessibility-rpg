/**
 * Are we debugging settings?
 */
export const IS_DEBUG_SETTINGS_MODE_ENABLED = false

/**
 * Size of the tiles in the game in pixels
 */
export const CELL_SIZE = 16 // Base tile size for all game graphics

/**
 * Scale factor for the game graphics
 */
export const SCALE_FACTOR = 2 // Scale factor for the game graphics

/**
 * Path to the general sprite sheet
 */
export const SPRITE_SHEET_SRC = '/assets/midgardtiles.png'

/**
 * Path to the character sprite sheet
 */
export const SPRITE_SHEET_CHARACTER = '/assets/midgardmascElderHuman1.png'

export type ThemeType = (typeof LEVEL_THEMES)[keyof typeof LEVEL_THEMES]

export const PLACEMENT_TYPE_HERO = 'HERO'
export const PLACEMENT_TYPE_GOAL = 'GOAL'

export const LEVEL_THEMES = {
  GREEN: 'GREEN',
}

export const DIRECTION_LEFT = 'LEFT' as const
export const DIRECTION_RIGHT = 'RIGHT' as const
export const DIRECTION_UP = 'UP' as const
export const DIRECTION_DOWN = 'DOWN' as const

export type DirectionProps =
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_RIGHT
  | typeof DIRECTION_UP
  | typeof DIRECTION_DOWN

export const directionUpdateMap = {
  [DIRECTION_LEFT]: { x: -1, y: 0 },
  [DIRECTION_RIGHT]: { x: 1, y: 0 },
  [DIRECTION_UP]: { x: 0, y: -1 },
  [DIRECTION_DOWN]: { x: 0, y: 1 },
} as const

export type DirectionUpdateMapProps = typeof directionUpdateMap

export const THEME_BACKGROUNDS = {
  [LEVEL_THEMES.GREEN]: '#273701',
}

export const THEME_TILES_MAP = {
  [LEVEL_THEMES.GREEN]: {
    FLOOR: '1x1',
    TOP: '1x0',
    LEFT: '0x1',
    RIGHT: '2x1',
    BOTTOM: '1x2',
    WALL: '0x2',
  },
}

export const HERO_WALK_FRAMES: { [key in DirectionProps]: string[] } = {
  DOWN: ['2x0', '0x0', '2x0', '4x0'],
  LEFT: ['2x2', '0x2', '2x2', '4x2'],
  RIGHT: ['2x4', '0x4', '2x4', '4x4'],
  UP: ['2x6', '0x6', '2x6', '4x6'],
}

export const TILES = {
  // Basics
  SHADOW: '1x3',
}
