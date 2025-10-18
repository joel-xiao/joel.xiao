import Spline from '@splinetool/react-spline'
import React, { Suspense } from 'react'

function NotFoundPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline scene="/assets/404.spline" style={{ height: '100vh' }} />
      </Suspense>
    </>
  )
}

export default NotFoundPage
