import './Carousel.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Carousel({ nativeRefWrapper, nativeRef, className, children }) {
  return (
    <div
      ref={nativeRefWrapper}
      className={classNames('carousel', className)}
    >
      <div
        ref={nativeRef}
        className="carousel__slides"
      >
        {children}
      </div>
    </div>
  )
}

Carousel.propTypes = {
  nativeRefWrapper: PropTypes.any,
  nativeRef: PropTypes.any,
  className: PropTypes.any,
  children: PropTypes.any,
}

export default Carousel
