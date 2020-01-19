import './Button.css'
import React from 'react'
import PropTypes from 'prop-types'

function Button({ children }) {
  return (
    <button>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.string,
}

export default Button
