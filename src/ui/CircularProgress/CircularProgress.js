import './CircularProgress.css'
import Card from '../Card'
import React from 'react'
import PropTypes from 'prop-types'

function CircularProgress({
  className,
  max = 100,
  value = 50,
}) {
  const isOffLimits = value > max

  const style = isOffLimits ? 'danger' : 'default'

  const _max = Math.max(max, value)
  const _value = Math.min(max, value)

  const percentage = (_value / _max) || 0

  const circleRadius = 220
  const circleLength = Math.PI*(circleRadius*2)
  const filledLength = (1-percentage)*circleLength

  const fill = filledLength * (isOffLimits ? -1 : 1)

  return (
    <Card className={`circular-progress ${className}`}>
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
          strokeWidth="40"
        />
        <circle
          cx="253"
          cy="253"
          r={circleRadius}
          fill="transparent"
          strokeDasharray={circleLength}
          strokeDashoffset={fill}
          strokeWidth="40"
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
}

export default CircularProgress
