import './Button.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button({ className, variant, children }) {
  return (
    <button
      className={classnames([
        'button',
        variant && `button--${variant}`,
        className,
      ])}
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
}

export default Button
