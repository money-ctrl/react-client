import './MoneyCalculator.css'
import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import Button from '@/ui/Button'
import Icon from '@/ui/Icon'
import MoneyDisplay from '@/components/MoneyDisplay'

function MoneyCalculator({ onBackPress, onSubmit, initial }) {
  const [value, setValueRaw] = useState(initial)
  const [hasTouched, setHasTouched] = useState(false)
  const setValue = (newValue) => {
    setHasTouched(true)
    setValueRaw(newValue)

    if (!hasTouched && initial !== 0) {
      // if there was an initial value, but the user want's to change the
      // initial value, act as if the initial value was 0, this prevents the
      // need of clearing the input value before inserting the actual desired
      // value.
      setValueRaw((v) => v % 10)
    }
  }

  const isBackPress = value === 0

  const backButton = () => {
    if (isBackPress) {
      onBackPress()
      return
    }

    setValue(Math.floor(value / 10))
  }

  /**
   * @param e {KeyboardEvent}
   */
  const eventKeydown = (e) => {
    const wasNumber = /^[0-9]$/.test(e.key)
    const wasBack = 'Backspace' === e.key

    if (wasNumber) {
      const number = Number(e.key)
      setValue(value * 10 + number)
    } else if (wasBack) {
      backButton()
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', eventKeydown, { passive: true })
    return () => {
      window.removeEventListener('keydown', eventKeydown, { passive: true })
    }
  })

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
            <Icon name={isBackPress ? 'xmark-large' : 'delete-left'} />
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
