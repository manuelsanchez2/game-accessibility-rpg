import { Howl } from 'howler'

export const MUSIC = {
  AMBIENT: 'AMBIENT',
}

const MUSIC_FILES = {
  [MUSIC.AMBIENT]: './music/ambient.mp3',
}

export class Music {
  public howls: Record<string, Howl>
  public musicVolume: number

  constructor() {
    this.howls = {}
    this.musicVolume = 0.5
  }

  init() {
    Object.keys(MUSIC_FILES).forEach((key) => {
      const file = MUSIC_FILES[key]
      this.howls[key] = new Howl({
        src: [file],
        volume: this.musicVolume,
      })
    })
  }

  playMusic(key: (typeof MUSIC)[keyof typeof MUSIC]) {
    const howl = this.howls[key]

    // Play it with current volume setting
    howl.volume(this.musicVolume)
    howl.play()
  }
}

const musicManager = new Music()
export default musicManager
