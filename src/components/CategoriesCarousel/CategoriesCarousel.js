import './CategoriesCarousel.css'
import Carousel from '../../ui/Carousel'
import CategoryCard from '../CategoryCard'
import React from 'react'
import PropTypes from 'prop-types'

function CategoriesCarousel({ className }) {
  return (
    <Carousel className={className}>
      <CategoryCard />
    </Carousel>
  )
}

CategoriesCarousel.propTypes = {
  className: PropTypes.any,
}

export default CategoriesCarousel
