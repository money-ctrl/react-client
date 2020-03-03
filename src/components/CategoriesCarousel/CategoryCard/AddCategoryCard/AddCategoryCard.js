import './AddCategoryCard.css'
import Card from '../../../../ui/Card'
import MoneyDisplay from '../../../MoneyDisplay'
import React from 'react'

class CategoryCard extends React.Component {
  render() {
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
}

export default CategoryCard
