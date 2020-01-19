import './Button.css'
import React from 'react'
import PropTypes from 'prop-types'

function Button({ className, children }) {
  return (
    <button className={className}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
}

export default Button
