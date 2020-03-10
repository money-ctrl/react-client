import './CategoryCardFacet.css'
import Card from '../../../ui/Card'
import CircularProgress from '../../../ui/CircularProgress'
import MoneyDisplay from '../../MoneyDisplay'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function CategoryCard({
  onClick = () => {},
  tabIndex = -1,
  className,
  style = {},
  category: { name, limit, amount } = {
    name: 'Add category',
    limit: 0,
    amount: 0,
  },
}) {
  return (
    <Card
      className={classNames('category-card', className)}
      onClick={onClick}
      style={style}
      tabIndex={tabIndex}
    >
      <CircularProgress
        className="category-card__progress"
        max={limit}
        value={amount}
      />

      <MoneyDisplay
        label={name}
        value={amount}
      />
    </Card>
  )
}

CategoryCard.propTypes = {
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  className: PropTypes.any,
  style: PropTypes.object,
  category: PropTypes.shape({
    name: PropTypes.string,
    limit: PropTypes.number,
    amount: PropTypes.number,
  }),
}

export default CategoryCard
