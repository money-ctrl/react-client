import './CategoryCard.css'
import Card from '../../../ui/Card'
import CircularProgress from '../../../ui/CircularProgress'
import MoneyDisplay from '../../MoneyDisplay'
import React from 'react'

function CategoryCard() {
  return (
    <Card className="category-card">
      <CircularProgress className="category-card__progress" />
      <MoneyDisplay
        label="Bank account"
        value={1148.9}
      />
    </Card>
  )
}

export default CategoryCard
