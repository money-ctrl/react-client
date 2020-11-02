import './Button.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button({
  variant = 'default',
  type = 'default',
  size = 'medium',
  behavior = 'default',
  isLoading = false,
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
        size !== 'medium' && `button--${size}`,
        className,
      ])}
      onClick={onClick}
      disabled={isLoading}
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
    'secondary',
    'primary',
  ]),
  type: PropTypes.oneOf([
    'default',
    'round',
  ]),
  size: PropTypes.oneOf([
    'small',
    'medium',
  ]),
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default Button
