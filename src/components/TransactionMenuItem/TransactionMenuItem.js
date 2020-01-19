import './TransactionMenuItem.css'
import Card from '../../ui/Card'
import React, { useState } from 'react'
import classnames from 'classnames'
import MoneyCalculator from '../MoneyCalculator'

function TransactionMenuItem({ ...props }) {
  const [isExpanded, setExpanded] = useState(false)

  const classes = classnames([
    'transaction-menu-item',
    isExpanded && 'transaction-menu-item--is-expanded'
  ])

  return (
    <Card
      tag={isExpanded ? 'div' : 'button'}
      onClick={() => setExpanded(!isExpanded)}
      className={classes}
      {...props}
    >
      <div className="transaction-menu-item__title">
        menu item
      </div>
      {isExpanded && <div
        className="transaction-menu-item__content"
        hidden={!isExpanded}
      >
        <MoneyCalculator />
      </div>}
    </Card>
  )
}

export default TransactionMenuItem
