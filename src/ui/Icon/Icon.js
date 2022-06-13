import './Icon.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const fontModifiers = {
  'xs': 'fa-xs',
  's': 'fa-sm',
  'm': '',
  'l': 'fa-lg',
  'xl': 'fa-2x',
  'xxl': 'fa-3x',
}

function Icon({className, style, name, size, type}) {
  const fontModifier = fontModifiers[size]

  if (['xmark-large', 'delete-left'].includes(name)) {
    console.log('fuck', name)
  }

  return (
    <div
      className={classnames('icon', className)}
      style={style}
    >
      <i
        className={classnames(`fa-${type} fa-${name}`, fontModifier)}
      />
    </div>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(fontModifiers)),
  style: PropTypes.object,
  type: PropTypes.oneOf(['solid', 'regular', 'light', 'thin', 'duotone'])
}

Icon.defaultProps = {
  style: {},
  size: 'm',
  type: 'solid',
}

export default Icon
