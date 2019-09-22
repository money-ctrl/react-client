import './TransactionMenuItem.css'
import Card from '../ui/Card'
import React, { useState } from 'react'

function TransactionMenuItem({ ...props }) {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <Card
      tag={isExpanded ? 'div' : 'button'}
      onClick={() => setExpanded(!isExpanded)}
      className="transaction-menu-item"
      {...props}
    >
      <div className="transaction-menu-item__title">
        menu item
      </div>
      <div
        className="transaction-menu-item__content"
        hidden={!isExpanded}
      >
        this is the card content!!<br />
        this is the card content!!<br />
        this is the card content!!<br />
        this is the card content!!<br />
        this is the card content!!<br />
        this is the card content!!<br />
      </div>
    </Card>
  )
}

export default TransactionMenuItem
