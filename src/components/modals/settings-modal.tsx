'use client'

import { useSettingsModal } from '@/store/use-settings-modal'
import {
  useSettingsAudioStore,
  useSettingsDisplayStore,
  useSettingsLanguageStore,
  useSettingsMotionStore,
} from '@/store/use-settings-store'
import { LevelProps } from '@/types'
import { useEffect, useRef, useState } from 'react'
import RangeInput from '../inputs/RangeInput'
import ColorInput from '../inputs/ColorInput'
import CheckboxInput from '../inputs/CheckboxInput'
import musicManager from '@/classes/Music'
import soundsManager from '@/classes/Sounds'
import { i18nData } from '@/i18n/data'
import { LanguageProps } from '@/types/_index'

enum SETTINGS {
  DISPLAY = 'DISPLAY',
  AUDIO = 'AUDIO',
  MOTION = 'MOTION',
  LANGUAGE = 'LANGUAGE',
}

function resetAllSettings() {
  if (!confirm('Are you sure you want to reset all settings?')) return

  useSettingsAudioStore.getState().resetAudioSettings()
  useSettingsDisplayStore.getState().resetDisplaySettings()
  useSettingsMotionStore.getState().resetMotionSettings()
}

const SettingsModal = ({ level }: { level: LevelProps }) => {
  const { isOpen, close } = useSettingsModal()
  const modalRef = useRef<HTMLDivElement>(null)

  // This useEffect will handle clicks outside the modal element
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        level?.gameLoop.restart()
        close()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Clean up the event listener when the component is unmounted or the modal is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, close, level?.gameLoop])

  if (!isOpen) {
    return null
  }

  return <SettingsContent modalRef={modalRef} close={close} level={level} />
}

export default SettingsModal

const SettingsContent = ({
  modalRef,
  close,
  level,
}: {
  modalRef: React.RefObject<HTMLDivElement>
  close: () => void
  level: LevelProps
}) => {
  const { language } = useSettingsLanguageStore()
  const [settingsShown, setSettingsShown] = useState(SETTINGS.LANGUAGE)

  const settingsOptions = Object.values(SETTINGS).map((setting) => {
    let nameToRender: string = setting

    if (setting === 'LANGUAGE')
      nameToRender = i18nData[language].SETTINGS.LANGUAGE
    if (setting === 'MOTION') nameToRender = i18nData[language].SETTINGS.MOTION
    if (setting === 'AUDIO') nameToRender = i18nData[language].SETTINGS.AUDIO
    if (setting === 'DISPLAY')
      nameToRender = i18nData[language].SETTINGS.DISPLAY

    return (
      <li key={setting}>
        <button
          onClick={() => setSettingsShown(setting)}
          className={`font-pressStart2P ${
            settingsShown === setting ? 'text-black font-bold' : 'text-gray-400'
          }`}
        >
          {nameToRender.charAt(0) + nameToRender.slice(1).toLowerCase()}
        </button>
      </li>
    )
  })

  return (
    <div className="fixed w-full inset-0 z-10">
      <div className="bg-black/25 absolute inset-0 w-full h-full"></div>
      <div
        ref={modalRef}
        id="modal-settings"
        className="absolute max-h-[80vh] md:max-h-[65vh] scroll-y-auto overflow-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black p-6 border-pixel"
      >
        {/* Close button */}
        <div className="flex items-center justify-end">
          <button
            className="text-lg border-pixel px-3 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300"
            onClick={() => {
              level?.gameLoop.restart()
              close()
            }}
          >
            x
          </button>
        </div>

        <div className="text-center font-bold text-2xl mb-12 font-pressStart2P capitalize">
          {i18nData[language].GENERAL.SETTINGS}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-32 md:min-w-[500px]">
          {/* Whole Body of Settings */}
          <nav
            className="flex flex-col-reverse md:flex-col md:gap-10 items-center md:items-start h-full justify-between min-h-[150px] md:min-h-[250px]"
            aria-label="List of all settings"
          >
            <ul>{settingsOptions}</ul>

            <button
              onClick={() => resetAllSettings()}
              className="text-xs font-pressStart2P bg-red-400 p-2 border-pixel text-nowrap"
            >
              {i18nData[language].GENERAL.RESET_ALL_SETTINGS}
            </button>
          </nav>

          {/* Conditional Rendering  */}
          <div className="p-2 pr-5 max-h-[250px] overflow-y-auto">
            {settingsShown === SETTINGS.DISPLAY && <SettingsDisplay />}
            {settingsShown === SETTINGS.AUDIO && <SettingsAudio />}
            {settingsShown === SETTINGS.MOTION && <SettingsMotion />}
            {settingsShown === SETTINGS.LANGUAGE && <SettingsLanguage />}
          </div>
        </div>
      </div>
    </div>
  )
}

const SettingsDisplay = () => {
  const {
    textSize,
    textColor,
    textDialogSize,
    textDialogColor,
    dialogColorBg,
    setDialogColorBg,
    setTextSize,
    setTextColor,
    setTextDialogSize,
    setTextDialogColor,
    hudColorBg,
    setHudColorBg,
  } = useSettingsDisplayStore((state) => ({
    textSize: state.textSize,
    textColor: state.textColor,
    textDialogSize: state.textDialogSize,
    textDialogColor: state.textDialogColor,
    setTextSize: state.setTextSize,
    setTextColor: state.setTextColor,
    setTextDialogSize: state.setTextDialogSize,
    setTextDialogColor: state.setTextDialogColor,
    hudColorBg: state.hudColorBg,
    setHudColorBg: state.setHudColorBg,
    dialogColorBg: state.dialogColorBg,
    setDialogColorBg: state.setDialogColorBg,
  }))

  return (
    <>
      <RangeInput
        id="text-size"
        label="Text Size"
        value={textSize}
        onChange={(e) => setTextSize(+e.target.value)}
        min={1}
        max={5}
        step={1}
      />
      <ColorInput
        id="text-color"
        label="Text Color"
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
      />
      <RangeInput
        id="text-dialog-size"
        label="Text Dialog Size"
        value={textDialogSize}
        onChange={(e) => setTextDialogSize(+e.target.value)}
        min={1}
        max={5}
        step={1}
      />
      <ColorInput
        id="text-dialog-color"
        label="Text Dialog Color"
        value={textDialogColor}
        onChange={(e) => setTextDialogColor(e.target.value)}
      />
      <ColorInput
        id="hud-color-bg"
        label="HUD Color BG"
        value={hudColorBg}
        onChange={(e) => setHudColorBg(e.target.value)}
      />
      <ColorInput
        id="dialog-color-bg"
        label="Dialog Color BG"
        value={dialogColorBg}
        onChange={(e) => setDialogColorBg(e.target.value)}
        extraClasses="mb-0"
      />
    </>
  )
}

const SettingsAudio = () => {
  const { volumeMusic, setVolumeMusic, volumeEffects, setVolumeEffects } =
    useSettingsAudioStore((state) => ({
      volumeMusic: state.volumeMusic,
      setVolumeMusic: state.setVolumeMusic,
      volumeEffects: state.volumeEffects,
      setVolumeEffects: state.setVolumeEffects,
    }))

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = +e.target.value
    setVolumeMusic(newVolume)
    musicManager.updateVolume()
  }

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = +e.target.value
    setVolumeEffects(newVolume)
    soundsManager.updateVolume()
  }

  return (
    <>
      <RangeInput
        id="volume-music"
        label="Volume Music"
        value={volumeMusic}
        onChange={handleMusicVolumeChange}
        min={0}
        max={1}
        minLabel={0}
        maxLabel={10}
        step={0.1}
      />
      <RangeInput
        id="sfx-music"
        label="Volume SFX"
        value={volumeEffects}
        onChange={handleSfxVolumeChange}
        min={0}
        max={1}
        minLabel={0}
        maxLabel={10}
        step={0.1}
      />
    </>
  )
}

const SettingsMotion = () => {
  const { reducedMotion, setReducedMotion } = useSettingsMotionStore(
    (state) => ({
      reducedMotion: state.reducedMotion,
      setReducedMotion: state.setReducedMotion,
    })
  )

  return (
    <>
      <CheckboxInput
        id="motion-reduced"
        label="Motion Reduced?"
        checked={reducedMotion}
        onChange={setReducedMotion}
      />
    </>
  )
}

const SettingsLanguage = () => {
  const { language, setLanguage } = useSettingsLanguageStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage,
  }))

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as LanguageProps)
  }

  return (
    <>
      <select
        className="border-pixel font-pressStart2P p-2 text-xs"
        defaultValue={language}
        onChange={changeLanguage}
        name="language"
        id="language"
      >
        <option value="en">English 🇺🇸</option>
        <option value="es">Español 🇪🇸</option>
        <option value="ru">Русский 🇷🇺</option>
        <option value="it">Italiano 🇮🇹</option>
      </select>
    </>
  )
}
