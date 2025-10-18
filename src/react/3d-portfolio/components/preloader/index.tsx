'use client'
import type {
  ReactNode,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
// import Loader from './loader'

interface PreloaderContextType {
  isLoading: boolean
  loadingPercent: number
  bypassLoading: () => void
}
const INITIAL: PreloaderContextType = {
  isLoading: false,
  loadingPercent: 0,
  bypassLoading: () => {},
}
export const preloaderContext = createContext<PreloaderContextType>(INITIAL)

interface PreloaderProps {
  children: ReactNode
  disabled?: boolean
}

export function usePreloader() {
  const context = useContext(preloaderContext)
  if (!context) {
    throw new Error('usePreloader must be used within a PreloaderProvider')
  }
  return context
}

const LOADING_TIME = 2.5

function Preloader({ children, disabled: _disabled = false }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingPercent, setLoadingPercent] = useState(0)
  const loadingTween = useRef<gsap.core.Tween>()

  const bypassLoading = () => {
    loadingTween.current?.progress(0.99).kill()
    setLoadingPercent(100)
    setIsLoading(false)
  }

  const loadingPercentRef = useRef<{ value: number }>({ value: 0 })

  useEffect(() => {
    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 100,
      duration: LOADING_TIME,
      ease: 'slow(0.7,0.7,false)',
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value)
      },
      onComplete: () => {
        setIsLoading(false)
      },
    })
  }, [])

  return (
    <preloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent }}
    >
      {/* <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence> */}
      {children}
    </preloaderContext.Provider>
  )
}

export default Preloader
