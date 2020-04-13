import './MoneyCalculator.css'
import React, {useState} from 'react'
import Button from '../../ui/Button'
import MoneyDisplay from '../MoneyDisplay'
import PropTypes from 'prop-types'
import Icon from '../../ui/Icon'

function MoneyCalculator({ onSubmit = (() => {}) }) {
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
      {[
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
      ].map((numbers, index) => (
        <div
          key={index}
          className="money-calculator__row"
        >
          {numbers.map((number) => (
            <div
              key={number}
              onClick={() => setValue(value * 10 + number)}
              className="money-calculator__button-wrapper"
            >
              <Button
                type="round"
                variant="ghost"
                className="money-calculator__number"
              >
                {number}
              </Button>
            </div>
          ))}
        </div>
      ))}
      <div className="money-calculator__row">
        <div className="money-calculator__back money-calculator__button-wrapper">
          <Button
            type="round"
            variant="ghost"
            onClick={() => setValue(Math.floor(value / 10))}
          >
            <Icon name="backspace" />
          </Button>
        </div>

        <div
          onClick={() => setValue(value * 10)}
          className="money-calculator__button-wrapper"
        >
          <Button
            type="round"
            variant="ghost"
            className="money-calculator__number"
          >
            0
          </Button>
        </div>

        <div className="money-calculator__enter money-calculator__button-wrapper">
          <Button
            type="round"
            variant="primary"
            onClick={() => onSubmit(value/100)}
          >
            <Icon name="check" />
          </Button>
        </div>
      </div>
    </div>
  )
}

MoneyCalculator.propTypes = {
  onSubmit: PropTypes.func,
}

export default MoneyCalculator
