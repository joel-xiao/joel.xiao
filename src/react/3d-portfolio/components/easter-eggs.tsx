/* eslint-disable no-console */
'use client'
import React, { useEffect } from 'react'
// import { useDevToolsOpen } from '../hooks/use-devtools-open'
import NyanCat from './nyan-cat'

function EasterEggs() {
  // const { isDevToolsOpen } = useDevToolsOpen()
  useEffect(() => {
    // if (!isDevToolsOpen)
    //   return
    if (typeof console !== 'undefined') {
      console.log(
        '%cWhoa, look at you! 🕵️‍♂️\n'
        + 'You seem to have discovered the secret console! 🔍\n'
        + 'Want to see some magic? ✨\n'
        + 'Just type %cmy first name%c and hit enter! 🎩🐇',
        'color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px',
        'color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px',
        'color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;',
      );

      ['naresh', 'Naresh', 'NARESH'].forEach((name) => {
        if (Object.hasOwn(window, name))
          return
        Object.defineProperty(window, name, {
          get() {
            console.log(
              '%c✨ Abra Kadabra! ✨\n\n'
              + 'You just summoned the magic of Naresh! 🧙‍♂️\n'
              + 'What??? youre not impressed? Fine, but remember: With great power comes great responsibility! 💻⚡',
              'color: #FF4500; font-size: 18px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:10px',
            )

            const timer = setTimeout(() => {
              console.log(
                '%cPssttt! 🤫\n\n'
                + 'Do you like cats?? 😺 If yes, then press \'n\' on viewport and see what happens! 🐱✨',
                'color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;',
              )
              clearTimeout(timer)
            }, 7000)
            return ''
          },
        })
      })
    }
  }, [])
  // }, [isDevToolsOpen])

  return (
    <>
      <NyanCat />
    </>
  )
}

export default EasterEggs
