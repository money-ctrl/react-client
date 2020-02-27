import './Background.css'
import React from 'react'

class Background extends React.Component {
  constructor(props) {
    super(props)

    this.moveItem = this.moveItem.bind(this)

    this.state = {
      items: Array.from({length:12}, (_value, id) => ({
        id,
        width: Math.random() * (150 - 80) + 80,
        height: Math.random() * (150 - 80) + 80,
        left: Math.random() * (window.innerWidth - 150),
        top: Math.random() * (window.innerHeight - 150),
        direction: Math.ceil(Math.random() * 4),
        velocity: Math.ceil(Math.random() * 10),
      })),
    }
  }

  componentDidMount() {
    this.interval = 100

    this.updateTimerId = setInterval(() => {
      this.setState(({items}) => ({
        items: items.map(this.moveItem),
      }))
    }, this.interval)
  }

  componentWillUnmount() {
    clearInterval(this.updateTimerId)
  }

  moveItem(item) {
    const {left, top} = item

    const newPosition = { left, top }
    const velocity = item.velocity * (this.interval/1000)

    switch(item.direction) {
      case 1://left
        newPosition.left += velocity
        break
      case 2://right
        newPosition.left -= velocity
        break
      case 3://top
        newPosition.top += velocity
        break
      default://bottom
        newPosition.top -= velocity
        break
    }

    if (newPosition.left + item.width < 0) newPosition.left = window.innerWidth
    if (newPosition.left > window.innerWidth) newPosition.left = -item.width
    if (newPosition.top + item.height < 0) newPosition.top = window.innerHeight
    if (newPosition.top > window.innerHeight) newPosition.top = -item.height

    return {
      ...item,
      ...newPosition,
    }
  }

  render() {
    const items = this.state.items.map(({top, left, height, width, id}) =>
      <div
        key={id}
        className="background__item"
        style={{
          transform: `translate(${left}px, ${top}px)`,
          height,
          width,
        }}
      />
    )

    return (
      <div className="background">
        {items}
      </div>
    )
  }
}

export default Background
