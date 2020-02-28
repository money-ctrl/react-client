import './Button.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button({
  variant = 'default',
  type = 'default',
  behavior = 'default',
  className,
  onClick,
  children,
}) {
  return (
    <button
      className={classnames([
        'button',
        variant !== 'default' && `button--${variant}`,
        type !== 'default' && `button--${type}`,
        behavior !== 'default' && `button--${behavior}`,
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
    'default',
    'block',
  ]),
  variant: PropTypes.oneOf([
    'default',
    'ghost',
    'primary',
  ]),
  type: PropTypes.oneOf([
    'default',
    'round',
  ]),
  onClick: PropTypes.func,
}

export default Button
