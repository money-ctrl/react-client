import './CircularProgress.css'
import Card from '../Card'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function CircularProgress({
  className,
  max = 100,
  value = 50,
  size,
}) {
  const isOffLimits = value < 0

  const style = isOffLimits ? 'danger' : 'default'

  const _max = isOffLimits ? Math.abs(value) + max : max
  const _value = value

  const percentage = (_value / _max) || 0

  const circleRadius = 220
  const circleLength = Math.PI*(circleRadius*2)
  const filledLength = (1-percentage)*circleLength

  const fill = filledLength * -1

  return (
    <Card className={classNames('circular-progress', size && `circular-progress--${size}`, className)}>
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="circular-progress__svg">
        <linearGradient id="default" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#f7b7ab"/>
          <stop offset="100%" stopColor="#ff7a9e"/>
        </linearGradient>

        <linearGradient id="danger" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#f00"/>
          <stop offset="70%" stopColor="#ff3333"/>
        </linearGradient>

        <circle
          className="circular-progress__bar"
          cx="253"
          cy="253"
          r={circleRadius}
          fill="transparent"
        />
        <circle
          cx="253"
          cy="253"
          r={circleRadius}
          fill="transparent"
          strokeDasharray={circleLength}
          strokeDashoffset={fill}
          stroke={`url(#${style})`}
        />
      </svg>
    </Card>
  )
}

CircularProgress.propTypes = {
  className: PropTypes.string,
  max: PropTypes.number,
  value: PropTypes.number,
  inverted: PropTypes.bool,
  size: PropTypes.oneOf([
    'small',
  ]),
}

export default CircularProgress
