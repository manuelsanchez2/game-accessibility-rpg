import { useEffect, useState } from 'react'

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
    setIsMobile(window.innerWidth < 768)
    setIsTablet(window.innerWidth < 1024)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Este efecto no depende de ninguna prop o estado, así que no tiene dependencias y se ejecutará una sola vez

  return { windowWidth, isMobile, isTablet }
}

export default useWindowWidth
