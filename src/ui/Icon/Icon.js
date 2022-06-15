import './Icon.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const iconTypeDict = {
  'solid': 'fas',
  'regular': 'far',
  'light': 'fal',
  'thin': 'fat',
  'duotone': 'fad',
}

const fontModifierDict = {
  'xs': 'xs',
  's': 'sm',
  'm': null,
  'l': 'lg',
  'xl': '2x',
  'xxl': '3x',
}

function Icon({className, style, name, size, type}) {
  return (
    <div
      className={classnames('icon', className)}
      style={style}
    >
      <FontAwesomeIcon
        icon={[iconTypeDict[type], name]}
        size={fontModifierDict[size]}
      />
    </div>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(fontModifierDict)),
  style: PropTypes.object,
  type: PropTypes.oneOf(['solid', 'regular', 'light', 'thin', 'duotone'])
}

Icon.defaultProps = {
  style: {},
  size: 'm',
  type: 'solid',
}

export default Icon
