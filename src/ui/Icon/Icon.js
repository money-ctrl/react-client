import './Icon.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ICONS = Object.freeze({
  'plus': 'fas fa-plus',
  'minus': 'fas fa-minus',
  'chevron-right': 'fas fa-chevron-right',
})

const fontModifiers = {
  'xs': 0.25,
  's': 0.5,
  'm': 1,
  'l': 1.5,
  'xl': 2,
  'xxl': 2.5,
}

function Icon({className, style = {}, name, size = 'm'}) {
  const fontModifier = fontModifiers[size]

  const classes = classNames(
    ICONS[name] || `fas fa-${name}`,
    className,
  )

  return (
    <i
      className={classes}
      style={{ ...style, fontSize: `${fontModifier}rem` }}
    />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(fontModifiers)),
  style: PropTypes.object,
}

export default Icon
