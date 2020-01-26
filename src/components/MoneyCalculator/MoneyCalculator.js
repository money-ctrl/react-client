import './MoneyCalculator.css'
import React, {useState} from 'react'
import Button from '../../ui/Button'
import MoneyDisplay from '../MoneyDisplay'
import PropTypes from 'prop-types'

function MoneyCalculator({ onSubmit = (() => {}) }) {
  const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]

  const [value, setValue] = useState(0)

  return (
    <div className="money-calculator">
      <MoneyDisplay
        className="money-calculator__display"
        value={value/100}
        formatOptions={{
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}
      />
      <Button
        type="round"
        variant="primary"
        className="money-calculator__enter"
        onClick={() => onSubmit(value/100)}
      >
        <i className="fas fa-check"></i>
      </Button>
      <Button
        type="round"
        variant="ghost"
        className="money-calculator__back"
        onClick={() => setValue(Math.floor(value / 10))}
      >
        <i className="fas fa-backspace"></i>
      </Button>
      {buttons.map((number) =>
        <Button
          key={number}
          type="round"
          variant="ghost"
          className="money-calculator__number"
          onClick={() => setValue(value * 10 + number)}
        >
          {number}
        </Button>
      )}
    </div>
  )
}

MoneyCalculator.propTypes = {
  onSubmit: PropTypes.func,
}

export default MoneyCalculator
