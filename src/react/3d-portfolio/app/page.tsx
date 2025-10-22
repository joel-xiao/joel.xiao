'use client'

import React from 'react'
import AnimatedBackground from '../components/animated-background'
import ContactSection from '../components/sections/contact'
import HeroSection from '../components/sections/hero'
import ProjectsSection from '../components/sections/projects'
import SkillsSection from '../components/sections/skills'
import SmoothScroll from '../components/smooth-scroll'
import { cn } from '../lib/utils'

function MainPage() {
  return (
    <>
      <SmoothScroll>
        <main className={cn('bg-slate-100 dark:bg-transparent')}>
          <AnimatedBackground />
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </SmoothScroll>
    </>
  )
}

export default MainPage
