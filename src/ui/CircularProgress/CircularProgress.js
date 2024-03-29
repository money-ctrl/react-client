import './CircularProgress.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Card from '@/ui/Card'

function CircularProgress({
  className,
  max = 100,
  value = 50,
  size,
}) {
  const isOffLimits = value < 0
  const isOverflowing = value > max

  const style = isOffLimits ? 'danger' : 'default'

  const _max = isOffLimits ? Math.abs(value) + max : Math.max(max, value)
  const _value = Math.min(value, max)

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

        <linearGradient id="overflow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="20%"   stopColor="#3bba74"/>
          <stop offset="100%" stopColor="#4bba84"/>
        </linearGradient>

        <circle
          cx="253"
          cy="253"
          r={circleRadius}
          fill="transparent"
          style={{
            stroke: !isOverflowing ? 'hsla(0, 0%, 100%, 0.4)' : 'url(#overflow)',
          }}
        />
        <circle
          className="circular-progress__fill"
          cx="253"
          cy="253"
          r={circleRadius}
          fill="transparent"
          strokeDasharray={circleLength}
          strokeDashoffset={fill}
          stroke={`url(#${style})`}
          strokeLinecap={!isOverflowing ? 'round' : undefined}
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
