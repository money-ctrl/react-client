import './Background.css'
import React, { useState, useEffect } from 'react'

function randomBetween({ min = 0, max = 1}) {
  return Math.random() * (max - min) + min
}

function Background() {
  const [items, setItems] = useState(Array.from({length:12}, (_value, id) => ({
    id,
    width: randomBetween({ min: 80, max: 150 }),
    height: randomBetween({ min: 80, max: 150 }),
    left: randomBetween({ max: window.innerWidth - 150 }),
    top: randomBetween({ max: window.innerHeight - 150 }),
    direction: Math.ceil(randomBetween({ max: 4 })),
    velocity: Math.ceil(randomBetween({ max: 10 })),
  })))

  const interval = 100

  const moveItem = (item) => {
    const {left, top} = item

    const newPosition = { left, top }
    const velocity = item.velocity * (interval/1000)

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

  useEffect(() => {
    const updateTimerId = setInterval(() => {
      setItems(items => items.map(moveItem))
    }, interval)

    return () => {
      clearInterval(updateTimerId)
    }
  }, [])

  return (
    <div className="background">
      {items.map(({top, left, height, width, id}) =>
        <div
          key={id}
          className="background__item"
          style={{
            transform: `translate(${left}px, ${top}px)`,
            height,
            width,
          }}
        />)
      }
    </div>
  )
}

export default Background
