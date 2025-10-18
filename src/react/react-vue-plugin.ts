import React from 'react'
import type { App } from 'vue'
import React from 'react'
import Portfolio3D from './3d-portfolio/app/page'
import PageContainer from './3d-portfolio/app/page-container'
import { reactToVue } from './utils/react-to-vue'

export default {
  install(app: App) {
    const CombinedComponent = () =>
      React.createElement(PageContainer, null, React.createElement(Portfolio3D))
    app.component('Portfolio3D', reactToVue(CombinedComponent))
  },
}
