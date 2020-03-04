import './CategoriesCarousel.css'
import Carousel from '../../ui/Carousel'
import CategoryCard, { AddCategoryCard } from './CategoryCard'
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { SwitchTransition, Transition } from 'react-transition-group'
import classnames from 'classnames'

function CategoriesCarousel({ className }) {
  const carousel = useRef(null)
  const [containerStyle, setContainerStyle] = useState({
    exited: {},
    exiting: {},
    entering: {},
    entered: {}
  })
  const [cardStyle, setCardStyle] = useState({
    exited: {},
    exiting: {},
    entering: {},
    entered: {}
  })
  const [hasClicked, setHasClicked] = useState(false)

  const onAddCardClick = (event) => {
    const { x: carouselX, y: carouselY } = carousel.current.getBoundingClientRect()
    const { pageX, pageY } = event

    setContainerStyle({
      entering: {
        position: 'absolute',
        transform: `translate(${pageX - carouselX}px, ${pageY - carouselY}px)`,
      },
      entered: {
        transform: 'translate(0px, 0px)',
      },
      exiting: {
        position: 'absolute',
      },
      exited: {
      },
    })
    setCardStyle({
      entering: {
        transform: `translate(-${pageX - carouselX}px, -${pageY - carouselY}px)`,
      },
      entered: {
        transform: 'translate(0px, 0px)',
      },
      exiting: {
      },
      exited: {},
    })
    setHasClicked(!hasClicked)
  }


  return (
    <Carousel
      nativeRef={carousel}
      className={classnames('categories-carousel', className)}
    >
      <SwitchTransition mode="in-out">
        <Transition
          in={hasClicked}
          timeout={300}
          key={hasClicked ? 'add' : 'card'}
        >
          {state => (<>
            {!hasClicked ?
              <div
                className="categories-carousel__card-container"
                style={containerStyle[state]}
                onClick={onAddCardClick}
              >
                <AddCategoryCard
                  className="categories-carousel__card"
                  style={cardStyle[state]}
                />
              </div>
              :
              <div
                className="categories-carousel__card-container"
                style={containerStyle[state]}
                onClick={onAddCardClick}
              >
                <CategoryCard
                  className="categories-carousel__card"
                  style={cardStyle[state]}
                />
              </div>
            }
          </>)}
        </Transition>
      </SwitchTransition>
    </Carousel>
  )
}

CategoriesCarousel.propTypes = {
  className: PropTypes.any,
}

export default CategoriesCarousel
