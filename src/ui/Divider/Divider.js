import './Divider.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Divider({ variant, space }) {
  return (
    <hr
      className={classNames('divider', {
        [`divider--${variant}`]: variant,
        [`divider--${space}`]: space,
      })}
    />
  )
}

Divider.propTypes = {
  variant: PropTypes.oneOf([
    'dark',
  ]),
  space: PropTypes.oneOf([
    '0',
    'm',
  ]),
}

Divider.defaultProps = {
  space: '0',
}

export default Divider
