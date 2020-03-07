import './CircularProgress.css'
import Card from '../Card'
import React from 'react'
import PropTypes from 'prop-types'

function CircularProgress({
  className,
  max = 100,
  value = 50,
}) {
  const percentage = (value / max * 100) || 0

  const circleRadius = 220
  const circleLength = Math.PI*(circleRadius*2)
  const x = ((100-percentage)/100)*circleLength

  return (
    <Card className={`circular-progress ${className}`}>
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="circular-progress__svg">
        <linearGradient id="progress" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#f4bbac"/>
          <stop offset="100%" stopColor="#ff799d"/>
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
          strokeDashoffset={x}
          strokeWidth="40"
          stroke="url(#progress)"
        />
      </svg>
    </Card>
  )
}

CircularProgress.propTypes = {
  className: PropTypes.string,
  max: PropTypes.number,
  value: PropTypes.number,
}

export default CircularProgress
