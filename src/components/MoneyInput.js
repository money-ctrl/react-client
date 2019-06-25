import './MoneyInput.css'
import React from 'react'

class MoneyInput extends React.Component {
  render() {
    return (
      <div className="money-input">
        <span className="money-input__value">
          0.00$
        </span>
      </div>
    )
  }
}

export default MoneyInput
