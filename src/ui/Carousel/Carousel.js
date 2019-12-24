import './Carousel.css'
import React from 'react'

class Carousel extends React.Component {
  render() {
    return (
      <div className={`carousel ${this.props.className}`}>
        <div className="carousel__slides">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Carousel
