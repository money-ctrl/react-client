import './MoneyDisplay.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function MoneyDisplay({ size, label, value, monochromatic, formatOptions, className }) {
  const classes = classnames([
    'money-display',
    monochromatic && 'money-display--monocromatic',
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
}

export default MoneyDisplay
