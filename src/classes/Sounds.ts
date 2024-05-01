import { Howl } from 'howler'
import { useSettingsAudioStore } from '@/store/use-settings-store'

export const SFX = {
  MOVE: 'MOVE',
}

const SFX_FILES = {
  [SFX.MOVE]: './music/move.mp3',
}

export class Sounds {
  public howls: Record<string, Howl>
  public sfxVolume: number

  constructor() {
    this.howls = {}
    this.sfxVolume = useSettingsAudioStore.getState().volumeEffects
  }

  init() {
    Object.keys(SFX_FILES).forEach((key) => {
      const file = SFX_FILES[key]
      this.howls[key] = new Howl({
        src: [file],
        volume: this.sfxVolume,
      })

      // console.log(`Loaded SFX: ${key}`)
    })
  }

  playSfx(key: (typeof SFX)[keyof typeof SFX]) {
    const howl = this.howls[key]

    // Play it with current volume setting
    howl.volume(this.sfxVolume)
    howl.play()
  }

  updateVolume() {
    this.sfxVolume = useSettingsAudioStore.getState().volumeEffects
    Object.values(this.howls).forEach((howl) => howl.volume(this.sfxVolume))
  }
}

const soundsManager = new Sounds()
export default soundsManager
