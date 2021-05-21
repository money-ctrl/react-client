import './Divider.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Divider({ variant }) {
  return (
    <hr
      className={classNames('divider', {
        [`divider--${variant}`]: variant,
      })}
    />
  )
}

Divider.propTypes = {
  variant: PropTypes.oneOf([
    'dark',
  ]),
}

export default Divider
