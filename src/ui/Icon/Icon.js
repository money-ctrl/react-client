import './Icon.css'
import React from 'react'
import PropTypes from 'prop-types'

const ICONS = Object.freeze({
  'plus': 'fas fa-plus',
  'minus': 'fas fa-minus',
  'chevron-right': 'fas fa-chevron-right',
})

function Icon({name}) {


  return (
    <i className={ICONS[name]} />
  )
}

Icon.propTypes = {
  name: PropTypes
    .oneOf(Object.keys(ICONS))
    .isRequired,
}

export default Icon
