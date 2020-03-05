import './CategoryCard.css'
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
}) {
  return (
    <Card
      className={classNames('category-card', className)}
      onClick={onClick}
      style={style}
    >
      <CircularProgress className="category-card__progress" />
      <MoneyDisplay
        label="Add Category"
        value={0}
      />
    </Card>
  )
}

CategoryCard.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.any,
  style: PropTypes.object,
}

export default CategoryCard
