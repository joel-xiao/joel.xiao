import React from 'react'

interface TestReactProps {
  title?: string
  content?: string
}

const TestReact: React.FC<TestReactProps> = ({ title = '默认标题', content = '默认内容' }) => {
  return (
    <div style={{
      backgroundColor: '#f0f7ff',
      border: '2px solid #42b983',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px 0',
    }}
    >
      <h3 style={{ color: '#42b983' }}>{title}</h3>
      <p>{content}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        这是一个在 Vue 中渲染的 React 组件
      </p>
    </div>
  )
}

export default TestReact
