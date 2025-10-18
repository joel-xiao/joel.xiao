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

/**
 * 将 React 组件包装成 Vue 组件
 */
export function reactToVue<P extends Record<string, any>>(ReactComponent: React.FC<P>) {
  return defineComponent({
    name: `ReactInVue(${ReactComponent.displayName || ReactComponent.name || 'Anonymous'})`,
    // 👇 明确声明 props 类型
    props: {} as unknown as P,

    setup(rawProps) {
      const el: Ref<HTMLElement | null> = ref(null)
      let root: ReactDOM.Root | null = null

      /**
       * ✅ 将 Vue 的 Proxy props 转换为普通对象
       * 这样就不会再触发 “No overload matches this call”
       */
      const toPlain = (p: typeof rawProps): P => JSON.parse(JSON.stringify(p))

      const renderReact = (propsData: typeof rawProps) => {
        if (!root)
          return
        const plain = toPlain(propsData)
        root.render(React.createElement(ReactComponent, plain))
      }

      onMounted(() => {
        if (el.value) {
          root = ReactDOM.createRoot(el.value)
          renderReact(rawProps)
        }
      })

      // props 变化时重新渲染 React
      watch(
        () => ({ ...rawProps }),
        (newProps) => {
          renderReact(newProps)
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
