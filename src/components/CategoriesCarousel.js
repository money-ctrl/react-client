import './CategoriesCarousel.css'
import Carousel from '../ui/Carousel'
import CategoryCard from './CategoryCard'
import React from 'react'

class CategoriesCarousel extends React.Component {
  render() {
    return (
      <Carousel className={this.props.className}>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </Carousel>
    )
  }
}

export default CategoriesCarousel
