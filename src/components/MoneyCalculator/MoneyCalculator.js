import './MoneyCalculator.css'
import React from 'react'
import Button from '../../ui/Button'
import MoneyDisplay from '../MoneyDisplay'

export default function MoneyCalculator() {
  const buttons = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

  return (
    <div className="money-calculator">
      <MoneyDisplay
        className="money-calculator__display"
        value={0}
      />
      <Button className="money-calculator__button">
        go
      </Button>
      <Button className="money-calculator__button">
        .
      </Button>
      {buttons.map((number) =>
        <Button
          key={number}
          className="money-calculator__button"
        >
          {number}
        </Button>
      )}
    </div>
  )
}
