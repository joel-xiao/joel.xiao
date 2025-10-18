import React from 'react'

export default function ReactRoot() {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      border: '1px solid red',
      padding: '10px',
      zIndex: '9999',
    }}
    >
      <p>React 加载成功！</p>
    </div>
  )
}
