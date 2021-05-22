import './Button.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button({
  variant,
  type,
  size,
  behavior,
  isLoading,
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
    'danger',
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

Button.defaultProps = {
  variant: 'default',
  type: 'default',
  size: 'medium',
  behavior: 'default',
  isLoading: false,
}

export default Button
