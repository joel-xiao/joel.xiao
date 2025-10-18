import type { App } from 'vue'
import TestReact from './components/TestReact'
import { reactToVue } from './utils/react-to-vue'

export default {
  install(app: App) {
    app.component('TestReact', reactToVue(TestReact))
  },
}
