import './MoneyDisplay.css'
import React from 'react'

class MoneyDisplay extends React.Component {
  render() {
    let blockClasses = "money-display"
    if (this.props.monocromatic) {
      blockClasses += " money-display--monocromatic"
    }

    return (
      <div className={blockClasses} style={{fontSize:`${this.props.size}rem`}}>
        <div className="money-display__label">
          {this.props.label}
        </div>
        <span className="money-display__value">
          {this.props.value.toLocaleString()}
        </span>
      </div>
    )
  }
}

export default MoneyDisplay
