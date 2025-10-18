'use client'

import { useInView } from 'framer-motion'
import Link from 'next/link'
import React, { useRef } from 'react'
import { SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si' // SiTwitter
import { config } from '../../data/config'
import { Button } from '../ui/button'

const BUTTONS = [
  {
    name: 'Github',
    href: config.social.github,
    icon: <SiGithub size="24" color="#fff" />,
  },
  {
    name: 'LinkedIn',
    href: config.social.linkedin,
    icon: <SiLinkedin size="24" color="#fff" />,
  },
  // {
  //   name: "Twitter",
  //   href: config.social.twitter,
  //   icon: <SiTwitter size={"24"} color={"#fff"} />,
  // },
  {
    name: 'Instagram',
    href: config.social.instagram,
    icon: <SiInstagram size="24" color="#fff" />,
  },
]

function SocialMediaButtons() {
  const ref = useRef<HTMLDivElement>(null)
  const show = useInView(ref, { once: true })
  return (
    <div ref={ref} className="z-10">
      {show
        && BUTTONS.map(button => (
          <Link href={button.href} key={button.name} target="_blank">
            <Button variant="ghost">{button.icon}</Button>
          </Link>
        ))}
    </div>
  )
}

export default SocialMediaButtons
