import './Loading.css'
import React from 'react'
import PropTypes from 'prop-types'

function Loading({ style }) {
  return (
    <div className="loading" style={style}>
      <div className="loading__spinner" />
      <div className="loading__spinner loading__spinner--drag-behind" />
    </div>
  )
}

Loading.propTypes = {
  style: PropTypes.object,
}

export default Loading
