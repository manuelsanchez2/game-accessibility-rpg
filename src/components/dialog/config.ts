export type TextSampleProps = {
  string: string
  speed: number
  color?: string
  page: number
  extra?: string
}

export type RenderedTextProps = {
  renderedString: string
  color?: string
  extra?: string
}

export const SPEEDS = {
  pause: 200,
  slow: 90,
  normal: 40,
  fast: 20,
}
