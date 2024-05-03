'use client'

import { useDialogModal } from '@/store/use-dialog-modal'
import React, { useEffect, useRef, useState } from 'react'
import { RenderedTextProps, TEXT_SAMPLES, TextSampleProps } from './data'
import { DIALOG_NEXT_SVG } from './DialogNextSVG'

const Dialog = () => {
  const { isOpen, close } = useDialogModal()
  const dialogRef = useRef(null)
  const [currentTexts, setCurrentTexts] = useState<TextSampleProps[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(1)
  const [renderedChars, setRenderedChars] = useState<RenderedTextProps[]>([])
  const [isFastForward, setIsFastForward] = useState(false) // Flag to control fast forward

  const textSize = 'text-3xl'

  useEffect(() => {
    const initialTexts = TEXT_SAMPLES.filter((text) => text.page === 1).map(
      (text) => ({ ...text, string: text.string + ' ' })
    )
    setCurrentTexts(initialTexts)
    setRenderedChars(
      initialTexts.map((text) => ({ renderedString: '', color: text.color }))
    )
  }, [])

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
    const nextPageTexts = TEXT_SAMPLES.filter(
      (text) => text.page === nextPageIndex
    ).map((text) => ({ ...text, string: text.string + ' ' }))
    if (nextPageTexts.length > 0) {
      setCurrentTexts(nextPageTexts)
      setRenderedChars(
        nextPageTexts.map((text) => ({ ...text, renderedString: '' }))
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
      className="bg-white z-[100] h-[250px] w-[90vw] max-w-[1440px] left-1/2 -translate-x-1/2 absolute bottom-4 border-pixel p-8 pr-10"
    >
      {renderedChars.map((text, index) => (
        <span
          className={`font-pressStart2P max-w-[90vw] ${textSize} ${
            text.color || 'text-black'
          }`}
          key={index}
        >
          {text.renderedString}
        </span>
      ))}

      <button className="absolute right-4 bottom-4" onClick={handleNextPage}>
        <DIALOG_NEXT_SVG extraClasses="w-12 h-12 motion-safe:rpg-bounce" />
      </button>
    </div>
  )
}

export default Dialog
