import { Howl } from 'howler'
import { useSettingsAudioStore } from '@/store/use-settings-store'

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
    this.musicVolume = useSettingsAudioStore.getState().volumeMusic
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

  updateVolume() {
    this.musicVolume = useSettingsAudioStore.getState().volumeMusic
    Object.values(this.howls).forEach((howl) => howl.volume(this.musicVolume))
  }
}

const musicManager = new Music()
export default musicManager
