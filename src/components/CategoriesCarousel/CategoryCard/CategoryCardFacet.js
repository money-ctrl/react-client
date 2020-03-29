import './CategoryCardFacet.css'
import Card from '../../../ui/Card'
import CircularProgress from '../../../ui/CircularProgress'
import MoneyDisplay from '../../MoneyDisplay'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function CategoryCard({
  onClick = () => {},
  className,
  style = {},
  category: { name, allocated, amount } = {
    name: 'Add category',
    allocated: 0,
    amount: 0,
  },
}) {
  return (
    <Card
      tag="button"
      className={classNames('category-card', className)}
      onClick={onClick}
      style={style}
    >
      <CircularProgress
        className="category-card__progress"
        max={allocated}
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
  className: PropTypes.any,
  style: PropTypes.object,
  category: PropTypes.shape({
    name: PropTypes.string,
    allocated: PropTypes.number,
    amount: PropTypes.number,
  }),
}

export default CategoryCard
