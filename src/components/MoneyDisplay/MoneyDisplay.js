import './MoneyDisplay.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function MoneyDisplay({ size = 1, label, value, monochromatic, behavior, formatOptions, className }) {
  const classes = classnames([
    'money-display',
    monochromatic && 'money-display--monocromatic',
    behavior && `money-display--${behavior}`,
    className
  ])

  return (
    <div className={classes} style={{fontSize:`${size}rem`}}>
      <div className="money-display__label">
        {label}
      </div>
      <span className="money-display__value">
        {new Intl.NumberFormat('en-US', formatOptions).format(value)}
      </span>
    </div>
  )
}

MoneyDisplay.propTypes = {
  label: PropTypes.string,
  monochromatic: PropTypes.bool,
  size: PropTypes.number,
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
