import type { Ref } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,

  watch,
} from 'vue'

export function reactToVue<P extends Record<string, any>>(ReactComponent: React.FC<P>) {
  return defineComponent({
    name: `ReactInVue(${ReactComponent.displayName || ReactComponent.name || 'Anonymous'})`,
    props: {} as unknown as P,

    setup(props) {
      const el: Ref<HTMLElement | null> = ref(null)
      let root: ReactDOM.Root | null = null

      const renderReact = (propsData: unknown) => {
        const plainProps = JSON.parse(JSON.stringify(propsData)) as P
        root?.render(React.createElement(ReactComponent, plainProps))
      }

      onMounted(() => {
        if (el.value) {
          root = ReactDOM.createRoot(el.value)
          renderReact(props)
        }
      })

      watch(
        () => ({ ...props }),
        (newProps) => {
          if (root)
            renderReact(newProps as P)
        },
        { deep: true },
      )

      onBeforeUnmount(() => {
        root?.unmount()
      })

      return () => h('div', { ref: el })
    },
  })
}
