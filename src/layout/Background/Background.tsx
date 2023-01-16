import './Background.css'
import React from 'react'
import classnames from 'classnames'
import { useLocalStorage } from '@/hooks/useLocalStorage'

function randomBetween({ min = 0, max = 1} = {}) {
  return Math.random() * (max - min) + min
}

function chooseOne(array) {
  return array[Math.floor(randomBetween({ max: array.length }))]
}

const maxDuration = 140

const items = Array.from({length:12}, (_value, index) => ({
  id: index,
  style: {
    width: randomBetween({ min: 80, max: 150 }),
    height: randomBetween({ min: 80, max: 150 }),
    ...(chooseOne([
      {
        animationName: 'slide-down',
        left: randomBetween({ max: window.innerWidth - 150 }),
      },
      {
        animationName: 'slide-right',
        top: randomBetween({ max: window.innerHeight - 150 }),
      },
    ])),
    animationDirection: Math.round(randomBetween()) ? 'normal' : 'reverse',
    animationDuration: `${randomBetween({ min: maxDuration -25, max: maxDuration })}s`,
    animationDelay: `${randomBetween({ min: -maxDuration, max: 0 })}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
}))

function Background() {
  const [isAnimatedBackgroundEnabled] = useLocalStorage('animatedBackground', false)

  return (
    <div className={classnames([
      'background',
      !isAnimatedBackgroundEnabled && 'background--paused-animation'
    ])}>
      {items.map(({style, id}) =>
        <div
          key={id}
          className="background__item"
          style={style}
        />)
      }
    </div>
  )
}

export default Background
