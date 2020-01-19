import './TransactionMenuItem.css'
import Card from '../../ui/Card'
import React, { useState } from 'react'
import classnames from 'classnames'
import MoneyCalculator from '../MoneyCalculator'
import PropTypes from 'prop-types'

function TransactionMenuItem({
  slotTitle,
  onSubmit = () => {},
  ...props
}) {
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
        {slotTitle}
      </Title>
      {isExpanded && <div
        className="transaction-menu-item__content"
      >
        <MoneyCalculator
          onSubmit={onSubmit}
        />
      </div>}
    </Card>
  </>)
}

TransactionMenuItem.propTypes = {
  slotTitle: PropTypes.any,
  onSubmit: PropTypes.func,
}

export default TransactionMenuItem
