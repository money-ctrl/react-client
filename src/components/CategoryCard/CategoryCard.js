import Card from '../../ui/Card'
import CircularProgress from '../../ui/CircularProgress'
import MoneyDisplay from '../MoneyDisplay'
import React from 'react'

class CategoryCard extends React.Component {
  render() {
    return (
      <Card className="categories-carousel__card">
        <CircularProgress className="categories-carousel__progress" />
        <MoneyDisplay
          label="Bank account"
          value={1148.9}
        />
      </Card>
    )
  }
}

export default CategoryCard
