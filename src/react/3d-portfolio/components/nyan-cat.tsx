'use client'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
} from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

function getRandomHeight() {
  return `${Math.random() * 100}vh`
}

function NyanCat() {
  const [divs, setDivs] = useState<
    {
      id: string
    }[]
  >([])

  const spawnDiv = () => {
    const newDiv = {
      id: (Math.random() * 100000).toFixed(),
    }
    setDivs(prevDivs => [...prevDivs, newDiv])
  }
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'n')
        spawnDiv()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div className="fixed left-0 top-0 w-screen h-screen overflow-hidden z-[-1]">
      <AnimatePresence>
        {divs.length > 0 && (
          <div className="fixed w-screen flex left-0 top-16">{divs.length}</div>
        )}
      </AnimatePresence>
      {divs
        && divs.map(div => (
          <AnimatedDiv
            key={div.id}
            id={div.id}
            onClick={() => {}}
            onCompleted={() => {
              setDivs(divs.filter(d => d.id !== div.id))
            }}
          />
        ))}
    </div>
  )
}

function AnimatedDiv({
  id,
  onClick,
  onCompleted,
}: {
  id: string
  onClick: () => void
  onCompleted: () => void
}) {
  const randY = getRandomHeight()

  const controls = useAnimationControls()

  React.useEffect(() => {
    controls.start({
      x: '100vw',
      y: randY,
      transition: { duration: 5, ease: 'linear' },
    })
  }, [controls])

  const handlePause = () => {
    onClick()
  }

  return (
    <motion.div
      key={id}
      initial={{ x: '-20vw', y: randY }}
      animate={controls}
      onAnimationComplete={onCompleted}
      onClick={handlePause}
    >
      <img
        src="/assets/nyan-cat.gif"
        className={cn('fixed z-10 h-40 w-auto')}
        alt="Nyan Cat"
      />
    </motion.div>
  )
}

export default NyanCat
