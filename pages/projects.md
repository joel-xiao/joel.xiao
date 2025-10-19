---
title: Projects - Joel Xiao
display: Projects
description: List of projects that I am proud of
wrapperClass: 'text-center'
art: dots
projects:
  Web & Visualization:
    - name: 'Visualization Editor'
      link: 'https://github.com/joel-xiao/visual-studio'
      desc: 'A Vue-based visual editor for creating and editing data visualizations.'
      icon: 'i-logos-vue-icon saturate-0'
    - name: 'Visualization Editor Electron'
      link: 'https://github.com/joel-xiao/visual-studio.electron'
      desc: 'Electron desktop version of the Visualization Editor for offline and native workflows.'
      icon: 'i-logos-electron-icon saturate-0'
    - name: 'React AG Grid Demo'
      link: 'https://github.com/joel-xiao/react-ag-grid-demo'
      desc: 'Demo project integrating React with AG Grid for interactive data tables.'
      icon: 'i-logos-react-icon saturate-0'
    - name: 'AI Dashboard Prompt Library'
      link: 'https://github.com/joel-xiao/ai-dashboard'
      desc: 'A collection of prompts and templates for building AI dashboards.'
      icon: 'i-logos-wx-icon saturate-0'
    - name: 'JS ↔ Native App File & Image Uploader'
      link: 'https://github.com/joel-xiao/uploarder'
      desc: 'Demonstration of how JavaScript interacts with native apps for file and image uploads.'
      icon: 'i-logos-mobile-icon saturate-0'

  Personal & Blog:
    - name: 'Personal Blog 2023'
      link: 'https://github.com/joel-xiao/personal-blog'
      desc: 'Updated 2023 version of my personal blog with improved architecture.'
      icon: 'i-logos-javascript-icon saturate-0'
    - name: 'Personal Blog 2017'
      link: 'https://github.com/joel-xiao/old-personal-blog'
      desc: 'Legacy 2017 version of my blog preserved for reference.'
      icon: 'i-logos-javascript-icon saturate-0'

  Mobile & Mini Programs:
    - name: 'Team Signup Management Platform (Web + H5)'
      link: 'https://github.com/joel-xiao/baoming-h5'
      desc: 'A Vue-based web and H5 platform for managing team registrations.'
      icon: 'i-logos-vue-icon saturate-0'
    - name: 'Smart Tour Map'
      link: 'https://github.com/joel-xiao/smart-tour-map'
      desc: 'A UniApp-based hybrid app providing interactive maps and travel routes.'
      icon: 'i-logos-uniapp-icon saturate-0'
    - name: 'WeXin Mini-Program Play Demo'
      link: 'https://github.com/joel-xiao/wx-ply'
      desc: 'A WeChat Mini Program demonstrating media playback features.'
      icon: 'i-logos-wx-icon saturate-0'
    - name: 'WeXin Mini-Program Map Demo'
      link: 'https://github.com/joel-xiao/wx-map'
      desc: 'A WeChat Mini Program showing map integration and geolocation.'
      icon: 'i-logos-wx-icon saturate-0'

  Utilities & Experiments:
    - name: 'Steam Saves'
      link: 'https://github.com/joel-xiao/steam-saves'
      desc: 'A utility for managing and backing up Steam game save files.'
    - name: 'Dotfiles'
      link: 'https://github.com/joel-xiao/dotfiles'
      desc: 'Configurations for development environments, shells, and editors.'
    - name: 'Lazy Neovim'
      link: 'https://github.com/joel-xiao/lazy-nvim'
      desc: 'A modern Neovim configuration setup built using LazyVim, featuring plugins and optimized developer workflow.'
---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
