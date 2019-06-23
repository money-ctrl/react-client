import './CategoriesCarousel.css'
import Card from '../ui/Card'
import Carousel from '../ui/Carousel'
import MoneyDisplay from '../components/MoneyDisplay'
import React from 'react'

class CategoriesCarousel extends React.Component {
  render() {
    return (
      <Carousel className={this.props.className}>
        <Card className="categories-carousel__card">
          <MoneyDisplay
            label="Bank account"
            value={1148.9}
          />
        </Card>
        <Card className="categories-carousel__card">
          <MoneyDisplay
            label="Bank account"
            value={1148.9}
          />
        </Card>
        <Card className="categories-carousel__card">
          <MoneyDisplay
            label="Bank account"
            value={1148.9}
          />
        </Card>
      </Carousel>
    )
  }
}

export default CategoriesCarousel
