import React from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'

function MenuItemTransfer({style}) {
  return (
    <MenuItemBase
      style={style}
      title="Transfer"
      icon="chevron-right"
      iconColors={['#f8efff', '#9a73e4']}
    />
  )
}

MenuItemTransfer.propTypes = {
  style: PropTypes.any,
}

export default MenuItemTransfer
