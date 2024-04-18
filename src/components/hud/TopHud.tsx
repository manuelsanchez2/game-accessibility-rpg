import { useSettingsModal } from '@/store/use-settings-modal'
import { LevelProps } from '@/types'
import Image from 'next/image'

const TopHud = ({ level }: { level: LevelProps }) => {
  const { open } = useSettingsModal()

  const handleOpenSettingsModal = () => {
    level?.gameLoop.stop()
    open()
  }

  return (
    <div className="z-10 absolute top-0 w-full min-h-[120px] flex items-center justify-between pl-6 pr-12">
      <div className="w-fit mt-1">
        <TopHudCharacter />
      </div>

      <button
        onClick={() => handleOpenSettingsModal()}
        className="bg-white rounded-full p-3 border-pixel transition-transform hover:scale-105 focus:scale-105"
      >
        <TopHudElement
          id="gear"
          alt="Button to open settings menu"
          width={40}
          height={40}
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

function TopHudCharacter() {
  return (
    <TopHudElement
      id="character"
      alt="Protagonist of the game, with health and mana bars, also some info about number of coins and keys. Static. Fake."
      width={400}
      height={120}
    />
  )
}
