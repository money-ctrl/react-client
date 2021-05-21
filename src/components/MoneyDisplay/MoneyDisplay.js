import './MoneyDisplay.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function MoneyDisplay({ size = 'm', label, value, monochromatic, behavior, formatOptions, className }) {
  const classes = classnames([
    'money-display',
    monochromatic && 'money-display--monocromatic',
    behavior && `money-display--${behavior}`,
    className
  ])

  const sizes = {
    xxs: 0.5,
    xs: 0.75,
    s: 0.85,
    m: 1,
    l: 1.25,
    xl: 1.75,
    xxl: 1.5,
  }

  const labelMultiplier = {
    xxs: 1.5,
    xs: 1.3,
    s: 1,
    m: 1,
    l: 1,
    xl: 1,
    xxl: 1,
  }

  return (
    <div className={classes} style={{fontSize:`${sizes[size]}rem`}}>
      {label && <div className="money-display__label">
        <span style={{fontSize:`${labelMultiplier[size]}em`}}>{label}</span>
      </div>}

      <div className="money-display__value">
        {new Intl.NumberFormat('en-US', formatOptions).format(value)}
      </div>
    </div>
  )
}

MoneyDisplay.propTypes = {
  label: PropTypes.string,
  monochromatic: PropTypes.bool,
  size: PropTypes.oneOf([
    'xxs',
    'xs',
    'm',
    'xxl',
  ]),
  value: PropTypes.number.isRequired,
  formatOptions: PropTypes.shape({
    minimumFractionDigits: PropTypes.number,
    maximumFractionDigits: PropTypes.number,
  }),
  className: PropTypes.string,
  behavior: PropTypes.oneOf([
    'inline',
    'block',
  ]),
}

export default MoneyDisplay
