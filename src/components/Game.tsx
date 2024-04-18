'use client'

import { Level } from '@/core/Level'
import React, { useEffect, useRef } from 'react'
import { type Layer, type MapData } from '@/types'

import mapJson from '@/maps/first.json'
import mapBackground from '@/maps/first.png'
import { SCALE_FACTOR } from '@/constants'

const myMapData: MapData = mapJson as MapData

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        const level = new Level(myMapData, ctx)
        level.loadTilesets(() => {
          // This callback ensures tilesets are loaded
          console.log('Tilesets loaded.')

          if (!canvasRef.current) return
          // canvasRef.current.width = canvasWidth
          // canvasRef.current.height = canvasHeight

          const backgroundImage = new Image()
          backgroundImage.onload = () => {
            if (!canvasRef.current) return
            ctx.drawImage(
              backgroundImage,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            )
            myMapData.layers.forEach((layer: Layer) => {
              if (layer.visible) {
                level.drawLayer(layer)
              }
            })
          }
          backgroundImage.src = mapBackground.src

          backgroundImage.onerror = (error) => {
            console.error('Error loading the background image:', error)
          }
        })
      }
    }
  }, [])

  return (
    <div>
      <canvas width={1600} height={900} ref={canvasRef}></canvas>
    </div>
  )
}

export default Game
