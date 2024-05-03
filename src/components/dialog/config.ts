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

export const TEXT_SAMPLES = [
  {
    string: 'Hi! I am a simple NPC.',
    speed: SPEEDS.normal,
    page: 1,
  },
  {
    string: 'Look how cool I am, I can change colors!',
    speed: SPEEDS.normal,
    extra: 'underline',
    color: '!text-red-500',
    page: 1,
  },
  {
    string: 'Or even speak a bit faster.',
    speed: SPEEDS.fast,
    page: 1,
  },
  {
    string: 'Or come on a new page!',
    speed: SPEEDS.fast,
    page: 2,
  },
  {
    string:
      'Change the settings by clicking the icon on the top right corner of the screen.',
    speed: SPEEDS.fast,
    color: '!text-green-500',
    page: 2,
  },
]
