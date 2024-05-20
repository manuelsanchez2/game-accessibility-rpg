'use client'

import { useDialogModal } from '@/store/use-dialog-modal'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RenderedTextProps, TextSampleProps } from './config'
import { events } from '../event-manager/EventManager'
import {
  useSettingsDisplayStore,
  useSettingsLanguageStore,
  useSettingsMotionStore,
} from '@/store/use-settings-store'
import { DIALOG_NEXT_SVG } from './DialogNextSVG'

const Dialog = () => {
  const language = useSettingsLanguageStore((state) => state.language)
  const { isOpen, close, messages, setMessages } = useDialogModal()
  const { textDialogSize, textDialogColor, dialogColorBg } =
    useSettingsDisplayStore((state) => ({
      textDialogSize: state.textDialogSize,
      textDialogColor: state.textDialogColor,
      dialogColorBg: state.dialogColorBg,
    }))

  const textSizeInRem = useMemo(() => {
    const rightAmount = 0.15 * textDialogSize + 1.5
    return `${rightAmount}rem`
  }, [textDialogSize])

  const dialogRef = useRef(null)
  const [currentTexts, setCurrentTexts] = useState<TextSampleProps[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(1)
  const [renderedChars, setRenderedChars] = useState<RenderedTextProps[]>([])
  const [isFastForward, setIsFastForward] = useState(false) // Flag to control fast forward
  const reducedMotion = useSettingsMotionStore((state) => state.reducedMotion)

  useEffect(() => {
    if (!isOpen) {
      events.emit('end-dialog', null)

      setCurrentPageIndex(1)
      setMessages({ en: [], es: [], ru: [], it: [] }) // Ensure valid initial value
      setCurrentTexts([])
      setRenderedChars([])
    }
  }, [isOpen])

  useEffect(() => {
    if (!messages || !messages[language]) return

    let messagesLanguage = messages[language]

    const initialTexts = messagesLanguage
      .filter((text) => text.page === 1)
      .map((text) => ({ ...text, string: text.string + ' ' }))

    setCurrentTexts(initialTexts)
    setRenderedChars(
      initialTexts.map((text) => ({
        renderedString: '',
        color: text.color,
        extra: text.extra,
      }))
    )
  }, [language, messages])

  useEffect(() => {
    let totalDelay = 0
    currentTexts.forEach((text, textIndex) => {
      text.string.split('').forEach((char, charIndex) => {
        const charDelay = isFastForward
          ? 5
          : totalDelay + charIndex * text.speed
        setTimeout(() => {
          setRenderedChars((prev) => {
            const newRenderedChars = [...prev]
            if (!newRenderedChars[textIndex]) return newRenderedChars
            newRenderedChars[textIndex].renderedString += char
            return newRenderedChars
          })
          if (charIndex === text.string.length - 1) {
            setIsFastForward(false) // Reset fast forward after last character
          }
        }, charDelay)
      })
      if (!isFastForward) {
        totalDelay += text.string.length * text.speed // Accumulate total delay for next text
      }
    })
  }, [currentTexts, isFastForward])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault()
        const allTextRendered = renderedChars.every(
          (text, index) =>
            text.renderedString.length === currentTexts[index].string.length
        )
        if (allTextRendered) {
          handleNextPage()
        } else {
          //   setIsFastForward(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [renderedChars, currentTexts])

  const handleNextPage = () => {
    const nextPageIndex = currentPageIndex + 1
    const nextPageTexts = messages[language]
      .filter((text) => text.page === nextPageIndex)
      .map((text) => ({ ...text, string: text.string + ' ' }))
    if (nextPageTexts.length > 0) {
      setCurrentTexts(nextPageTexts)
      setRenderedChars(
        nextPageTexts.map((text) => ({
          ...text,
          renderedString: '',
          color: text.color,
        }))
      )
      setCurrentPageIndex(nextPageIndex)
    } else {
      close() // No more pages, close the dialog
    }
  }
  if (!isOpen) return null

  return (
    <div
      ref={dialogRef}
      style={{
        backgroundColor: dialogColorBg,
      }}
      className="z-[10] h-[250px] w-[90vw] max-w-[1440px] left-1/2 -translate-x-1/2 absolute bottom-4 border-pixel p-8 pr-10"
    >
      <div aria-live="polite" className="sr-only">
        {currentTexts.map((text) => text.string).join(' ')}
      </div>
      {renderedChars.map((text, index) => (
        <span
          className={`font-pressStart2P max-w-[90vw] ${
            text.extra ? text.extra : ''
          } ${text.color}`}
          style={{
            fontSize: textSizeInRem,
            lineHeight: '1.5',
            color: text.color ? text.color : textDialogColor,
          }}
          key={index}
        >
          {text.renderedString}
        </span>
      ))}

      <button className="absolute right-4 bottom-4" onClick={handleNextPage}>
        <DIALOG_NEXT_SVG
          extraClasses={`w-12 h-12 ${
            reducedMotion ? '' : 'motion-safe:rpg-bounce'
          }
        `}
        />
      </button>
    </div>
  )
}

export default Dialog
