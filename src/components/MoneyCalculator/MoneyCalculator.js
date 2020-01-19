import './MoneyCalculator.css'
import React from 'react'
import Button from '../../ui/Button'
import MoneyDisplay from '../MoneyDisplay'

export default function MoneyCalculator() {
  const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]

  return (
    <div className="money-calculator">
      <MoneyDisplay
        className="money-calculator__display"
        value={0}
      />
      <Button
        className="money-calculator__enter"
        variant="primary"
      >
        go
      </Button>
      <Button className="money-calculator__point">
        .
      </Button>
      {buttons.map((number) =>
        <Button
          key={number}
          className="money-calculator__number"
        >
          {number}
        </Button>
      )}
    </div>
  )
}
