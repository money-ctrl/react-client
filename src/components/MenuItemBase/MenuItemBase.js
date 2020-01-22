import './MenuItemBase.css'
import Card from '../../ui/Card'
import React, { useState } from 'react'
import classnames from 'classnames'
import MoneyCalculator from '../MoneyCalculator'
import PropTypes from 'prop-types'

function MenuItemBase({
  slotTitle,
  onSubmit = () => {},
  style,
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
      style={style}
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

MenuItemBase.propTypes = {
  slotTitle: PropTypes.any,
  onSubmit: PropTypes.func,
  style: PropTypes.any,
}

export default MenuItemBase
