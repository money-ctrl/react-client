import './Loading.css'
import React from 'react'

function Loading() {
  return (
    <div className="loading">
      <div className="loading__spinner" />
      <div className="loading__spinner loading__spinner--drag-behind" />
    </div>
  )
}

export default Loading
