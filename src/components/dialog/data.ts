export type TextSampleProps = {
  string: string
  speed: number
  color?: string
  page: number
}

export type RenderedTextProps = {
  renderedString: string
  color?: string
}

export const SPEEDS = {
  pause: 500,
  slow: 120,
  normal: 70,
  fast: 40,
}

export const TEXT_SAMPLES = [
  {
    string: 'Hello, I am a dialog box.',
    speed: SPEEDS.normal,
    page: 1,
  },
  {
    string: "What's up?",
    speed: SPEEDS.normal,
    color: 'text-red-500',
    page: 1,
  },
  {
    string: 'How are you doing?',
    speed: SPEEDS.fast,
    page: 1,
  },
  {
    string: 'I am coming on a new page!',
    speed: SPEEDS.fast,
    page: 2,
  },
  {
    string: 'What do you think about this?!',
    speed: SPEEDS.fast,
    color: 'text-green-500',
    page: 2,
  },
]
