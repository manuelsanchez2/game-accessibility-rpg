import useWindowWidth from '@/hooks/useWindowWidth'
import { useSettingsModal } from '@/store/use-settings-modal'
import { useSettingsDisplayStore } from '@/store/use-settings-store'
import { LevelProps } from '@/types'
import Image from 'next/image'
import { useMemo } from 'react'
import { TopHudCharacter } from './TopHudCharacter'
import { useDialogModal } from '@/store/use-dialog-modal'

const TopHud = ({ level }: { level: LevelProps }) => {
  const { open } = useSettingsModal()
  const { isOpen: isDialogOpen } = useDialogModal()

  const { isMobile } = useWindowWidth()
  const { textSize, textColor, hudColorBg } = useSettingsDisplayStore(
    (state) => ({
      textSize: state.textSize,
      textColor: state.textColor,
      hudColorBg: state.hudColorBg,
    })
  )

  const textSizeInRem = useMemo(() => {
    const rightAmount = 0.15 * textSize + 0.5
    return `${rightAmount}rem`
  }, [textSize])

  const iconSize = useMemo(() => {
    const sizeInRem = parseFloat(textSizeInRem.replace('rem', ''))
    return 16 * sizeInRem + 16
  }, [textSize])

  const handleOpenSettingsModal = () => {
    level?.gameLoop.stop()
    open()
  }

  return (
    <div className="z-10 absolute top-0 w-full flex items-center justify-between pl-6 pr-12">
      <div className="w-fit relative">
        <TopHudCharacter bgColor={hudColorBg} />

        <div className="absolute bottom-[15%] right-10 flex items-end text-end  gap-3">
          <div className="flex items-center gap-2">
            <TopHudElement
              id="coin"
              alt="Coin Icon"
              width={iconSize}
              height={iconSize}
            />
            <span
              style={{
                color: textColor,
                fontSize: textSizeInRem,
                textShadow: '0 0 5px #000',
              }}
              className="font-pressStart2P"
            >
              x05
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TopHudElement
              id="key"
              alt="Coin Icon"
              width={iconSize}
              height={iconSize}
            />

            <span
              style={{
                color: textColor,
                fontSize: textSizeInRem,
                textShadow: '0 0 5px #000',
              }}
              className="font-pressStart2P"
            >
              x01
            </span>
          </div>
        </div>
      </div>

      <button
        disabled={isDialogOpen}
        onClick={() => handleOpenSettingsModal()}
        className={`${
          isDialogOpen
            ? 'pointer-events-none opacity-35'
            : 'pointer-events-auto'
        } bg-white rounded-full p-3 border-pixel transition-transform hover:scale-105 focus:scale-105`}
      >
        <TopHudElement
          id="gear"
          alt="Button to open settings menu"
          width={isMobile ? 20 : 40}
          height={isMobile ? 20 : 40}
        />
      </button>
    </div>
  )
}

export default TopHud

function TopHudElement({
  id,
  alt,
  width,
  height,
}: {
  id: string
  alt: string
  width: number
  height: number
}) {
  return (
    <Image
      src={`/assets/top-hud-${id}.png`}
      alt={alt}
      width={width}
      height={height}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
