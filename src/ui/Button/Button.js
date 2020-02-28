import './Button.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button({ className, variant, type, behavior, onClick, children }) {
  return (
    <button
      className={classnames([
        'button',
        variant && `button--${variant}`,
        type && `button--${type}`,
        behavior && `button--${behavior}`,
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
  behavior: PropTypes.oneOf([
    'block',
  ]),
  variant: PropTypes.oneOf([
    'ghost',
    'primary',
  ]),
  type: PropTypes.oneOf([
    'round',
  ]),
  onClick: PropTypes.func,
}

export default Button
