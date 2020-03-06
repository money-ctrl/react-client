import './CategoriesCarousel.css'
import Carousel from '../../ui/Carousel'
import CategoryCard, { AddCategoryCard } from './CategoryCard'
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { SwitchTransition, Transition } from 'react-transition-group'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'

function CategoriesCarousel({ className }) {
  const carousel = useRef(null)
  const [containerStyle, setContainerStyle] = useState({
    entering: {},
    entered: {},
    exiting: { position: 'absolute' },
    exited: {},
  })
  const [hasClicked, setHasClicked] = useState(false)

  const onAddCardClick = (event) => {
    const { x, y, width, height } = event.currentTarget.getBoundingClientRect()
    const { pageX, pageY } = event

    const containerDiagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))

    setContainerStyle({
      ...containerStyle,
      entering: {
        position: 'absolute',
        clipPath: `circle(0px at ${pageX - x}px ${pageY - y}px)`,
      },
      entered: {
        clipPath: `circle(${containerDiagonal}px at ${pageX - x}px ${pageY - y}px)`,
      },
    })
    setHasClicked(!hasClicked)
  }

  const history = useHistory()
  const transitionEndHandler = (done) => {
    done()

    history.push('/categories/new')
  }

  return (
    <Carousel
      nativeRef={carousel}
      className={classnames('categories-carousel', className)}
    >
      <SwitchTransition mode="in-out">
        <Transition
          in={hasClicked}
          timeout={{ enter: 0, exit: 300 }}
          key={hasClicked ? 'add' : 'card'}
          addEndListener={(node, done) => {
            // use the css transitionend event to mark the finish of a transition
            node.addEventListener('transitionend', () => transitionEndHandler(done), false)
          }}
        >
          {state => (<>
            <div
              className="categories-carousel__card-container"
              style={containerStyle[state]}
              onClick={onAddCardClick}
            >
              {!hasClicked ?
                <AddCategoryCard className="categories-carousel__card" />
                :
                <CategoryCard className="categories-carousel__card" />
              }
            </div>
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
