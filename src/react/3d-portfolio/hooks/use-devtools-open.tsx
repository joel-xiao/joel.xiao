import devtoolsDetector from 'devtools-detector'
import { useEffect, useState } from 'react'

export function useDevToolsOpen() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined')
      return

    const { addListener, launch, stop } = devtoolsDetector

    addListener((isOpen) => {
      if (isOpen) {
        setIsDevToolsOpen(true)
        stop()
      }
    })

    launch()

    return () => {
      stop()
    }
  }, [])

  return { isDevToolsOpen }
}
