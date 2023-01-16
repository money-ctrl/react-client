import './CategoryCardFacet.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Card from '@/ui/Card'
import CircularProgress from '@/ui/CircularProgress'
import MoneyDisplay from '@/components/MoneyDisplay'
import { categoryPresenter } from '@/services/category'

function CategoryCard({
  onClick = () => {},
  className,
  style = {},
  category = {
    name: 'Add category',
    allocated: 0,
    debt: 0,
    amount: 0,
    scheduled: [],
  },
}) {
  const { name, allocated, debt, amountWithDeductions } = categoryPresenter(category)

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
        value={amountWithDeductions}
      />

      {debt < 0 && <MoneyDisplay
        className="category-card__dept"
        label={'debt'}
        value={debt}
        size={'xxs'}
      />}

      <MoneyDisplay
        label={name}
        value={amountWithDeductions}
        formatOptions={{
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }}
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
