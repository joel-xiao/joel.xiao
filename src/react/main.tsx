import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactRoot from './components/ReactRoot.tsx'

document.addEventListener('DOMContentLoaded', () => {
  const reactMountNode = document.getElementById('app-react')
  if (reactMountNode) {
    ReactDOM.createRoot(reactMountNode).render(
      <React.StrictMode>
        <ReactRoot />
      </React.StrictMode>,
    )
  }
  else {
    console.error('未找到 id 为 app-react 的 DOM 节点')
  }
})
