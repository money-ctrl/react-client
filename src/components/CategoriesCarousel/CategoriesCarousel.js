import './CategoriesCarousel.css'
import Carousel from '../../ui/Carousel'
import CategoryCard, { AddCategoryCard } from './CategoryCard'
import React from 'react'
import PropTypes from 'prop-types'

function CategoriesCarousel({ className }) {
  return (
    <Carousel className={className}>
      <CategoryCard className="categories-carousel__card" />
      <AddCategoryCard className="categories-carousel__card" />
    </Carousel>
  )
}

CategoriesCarousel.propTypes = {
  className: PropTypes.any,
}

export default CategoriesCarousel
