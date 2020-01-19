import './Button.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button({ className, variant, onClick, children }) {
  return (
    <button
      className={classnames([
        'button',
        variant && `button--${variant}`,
        className,
      ])}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
  ]),
  onClick: PropTypes.func,
}

export default Button
