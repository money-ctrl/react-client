import './Carousel.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Carousel({ nativeRef, className, children }) {
  return (
    <div
      ref={nativeRef}
      className={classNames('carousel', className)}
    >
      <div className="carousel__slides">
        {children}
      </div>
    </div>
  )
}

Carousel.propTypes = {
  nativeRef: PropTypes.any,
  className: PropTypes.any,
  children: PropTypes.any,
}

export default Carousel
