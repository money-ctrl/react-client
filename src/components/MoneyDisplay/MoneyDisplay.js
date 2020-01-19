import './MoneyDisplay.css'
import React from 'react'
import PropTypes from 'prop-types'

function MoneyDisplay({ size, label, value, monochromatic }) {
  let blockClasses = 'money-display'
  if (monochromatic) {
    blockClasses += ' money-display--monocromatic'
  }

  return (
    <div className={blockClasses} style={{fontSize:`${size}rem`}}>
      <div className="money-display__label">
        {label}
      </div>
      <span className="money-display__value">
        {value.toLocaleString()}
      </span>
    </div>
  )
}

MoneyDisplay.propTypes = {
  label: PropTypes.string,
  monochromatic: PropTypes.bool,
  size: PropTypes.number,
  value: PropTypes.number.isRequired,
}

export default MoneyDisplay
