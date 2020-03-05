import './AddCategoryCardFacet.css'
import Card from '../../../../ui/Card'
import MoneyDisplay from '../../../MoneyDisplay'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function AddCategoryCard({
  onClick = () => {},
  className,
  style = {},
}) {
  return (
    <Card
      className={classNames('add-category-card', className)}
      onClick={onClick}
      style={style}
    >
      <Card className="add-category-card__progress" />
      <MoneyDisplay
        monochromatic={true}
        label="Add Category"
        value={0}
      />
    </Card>
  )
}

AddCategoryCard.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.any,
  style: PropTypes.object,
}

export default AddCategoryCard
