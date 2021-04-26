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
  category: { name, allocated, amount, debt, scheduled } = {
    name: 'Add category',
    allocated: 0,
    debt: 0,
    amount: 0,
    scheduled: [],
  },
}) {
  const futureDeductions = (scheduled || []).reduce((sum, current) => {
    return sum + current.transactionPayload.amount
  }, 0)

  const value = amount - futureDeductions

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
        value={value}
      />

      {debt < 0 && <MoneyDisplay
        className="category-card__dept"
        label={'debt'}
        value={debt}
        size={'xxs'}
      />}

      <MoneyDisplay
        label={name}
        value={value}
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
    scheduled: PropTypes.array,
  }),
}

export default CategoryCard
