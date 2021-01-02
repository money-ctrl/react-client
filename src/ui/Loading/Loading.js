import './Loading.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Loading({ style, size }) {
  return (
    <div className={classnames('loading', `loading--size-${size}`)} style={style}>
      <div className="loading__spinner" />
      <div className="loading__spinner loading__spinner--drag-behind" />
    </div>
  )
}

Loading.defaultProps = {
    size: 'l',
}

Loading.propTypes = {
  style: PropTypes.object,
  size: PropTypes.oneOf(['m','l']),
}

export default Loading
