import './MoneyCalculator.css'
import React, {useState} from 'react'
import Button from '../../ui/Button'
import MoneyDisplay from '../MoneyDisplay'
import PropTypes from 'prop-types'
import Icon from '../../ui/Icon'

function MoneyCalculator({ onBackPress, onSubmit, initial }) {
  const [value, setValue] = useState(initial)

  const backButton = () => {
    if (value === 0) {
      onBackPress()
      return
    }

    setValue(Math.floor(value / 10))
  }

  return (
    <div className="money-calculator">
      <MoneyDisplay
        className="money-calculator__display"
        value={value}
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
            onClick={backButton}
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
            onClick={() => onSubmit(value)}
          >
            <Icon name="check" />
          </Button>
        </div>
      </div>
    </div>
  )
}

MoneyCalculator.propTypes = {
  initial: PropTypes.number,
  onBackPress: PropTypes.func,
  onSubmit: PropTypes.func,
}

MoneyCalculator.defaultProps = {
  initial: 0,
  onBackPress: () => {},
  onSubmit: () => {},
}

export default MoneyCalculator
