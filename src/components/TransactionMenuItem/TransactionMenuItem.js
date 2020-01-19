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

  const Title = isExpanded ? 'div' : 'button'

  return (<>
    {isExpanded && <div className="event-capture" />}
    <Card
      tag='div'
      className={classes}
      {...props}
    >
      <button
        className="transaction-menu-item__cancel"
        onClick={() => setExpanded(false)}
      >
        Cancel
      </button>
      <Title
        className="transaction-menu-item__title"
        onClick={() => setExpanded(true)}
      >
        menu item
      </Title>
      {isExpanded && <div
        className="transaction-menu-item__content"
      >
        <MoneyCalculator />
      </div>}
    </Card>
  </>)
}

export default TransactionMenuItem
