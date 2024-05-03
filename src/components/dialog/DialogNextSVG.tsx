export const DIALOG_NEXT_SVG = ({
  extraClasses,
}: {
  extraClasses?: string
}) => {
  return (
    <svg
      style={{ imageRendering: 'pixelated' }}
      className={extraClasses}
      width="11"
      height="10"
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="11" height="10" fill="url(#pattern0_1184_125)" />
      <defs>
        <pattern
          id="pattern0_1184_125"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1184_125"
            transform="matrix(0.0909091 0 0 0.1 -0.181818 -0.3)"
          />
        </pattern>
        <image
          id="image0_1184_125"
          width="16"
          height="16"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAI9JREFUOI1jYBgFjDjE/xOrFpvg//1nL8M5z1++ZJAUF2dwNNbFqh5dAEUzMYYwYXMWVCEDAwMDAz8PN0OUlws2ZbgN2H/2MoOjsS4DPw83g5G6EsP+s5cZPn7+QpwBz1++ZGBgYGA4d/MeimZ+Xh6sBmANxGXb9jBIioszMDAwwDUTG4hwQ4i0bBQwMDAAAMJmLKsvOMrRAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  )
}
