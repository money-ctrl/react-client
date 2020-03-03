import './AddCategoryCard.css'
import Card from '../../../../ui/Card'
import MoneyDisplay from '../../../MoneyDisplay'
import React from 'react'

function CategoryCard() {
  return (
    <Card className="add-category-card">
      <Card className="add-category-card__progress" />
      <MoneyDisplay
        monochromatic={true}
        label="Add Category"
        value={0}
      />
    </Card>
  )
}

export default CategoryCard
