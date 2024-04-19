'use client'

import useWindowWidth from '@/hooks/useWindowWidth'
import { useMemo } from 'react'

export function TopHudCharacter({ bgColor }: { bgColor: string }) {
  const { isMobile } = useWindowWidth()

  const sizesForIcon = useMemo(() => {
    if (isMobile) {
      return {
        width: 280,
        height: 120,
      }
    }
    return {
      width: 400,
      height: 195,
    }
  }, [isMobile])

  return (
    <svg
      width={sizesForIcon.width}
      height={sizesForIcon.height}
      viewBox="0 0 530 255"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M133 81V96C133 102.075 137.925 107 144 107H468C474.075 107 479 102.075 479 96V81C479 74.9249 474.075 70 468 70H144C137.925 70 133 74.9249 133 81Z"
        fill="#EA0505"
        stroke="#030303"
        stroke-width="2"
      />
      <path
        d="M133 118V131C133 137.075 137.925 142 144 142H467C473.075 142 478 137.075 478 131V118C478 111.925 473.075 107 467 107H144C137.925 107 133 111.925 133 118Z"
        fill="#3D80A3"
        stroke="#030303"
        stroke-width="2"
      />
      <g clip-path="url(#clip0_27_180)">
        <rect
          x="25.2046"
          y="52.5097"
          width="159.629"
          height="159.629"
          rx="79.8147"
          fill={bgColor}
        />
        <rect
          x="25.2046"
          y="75.3138"
          width="158.429"
          height="136.825"
          fill="url(#pattern0_27_180)"
        />
      </g>
      <rect
        x="23.7046"
        y="51.0097"
        width="162.629"
        height="162.629"
        rx="81.3147"
        stroke="black"
        stroke-width="3"
      />
      <defs>
        <pattern
          id="pattern0_27_180"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_27_180"
            transform="matrix(0.0454545 0 0 0.0526316 -1.68182 -0.315789)"
          />
        </pattern>
        <clipPath id="clip0_27_180">
          <rect
            x="25.2046"
            y="52.5097"
            width="159.629"
            height="159.629"
            rx="79.8147"
            fill="white"
          />
        </clipPath>
        <image
          style={{ imageRendering: 'pixelated' }}
          id="image0_27_180"
          width="96"
          height="128"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}
