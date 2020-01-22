import './MenuItemTransfer.css'
import React from 'react'
import MenuItemBase from '../MenuItemBase'
import Icon from '../../ui/Icon'
import PropTypes from 'prop-types'

function MenuItemTransfer({style}) {
  return (
    <MenuItemBase
      style={style}
      slotTitle={( <>
        Transfer
        <Icon name="chevron-right"/>
      </>)}
    />
  )
}

MenuItemTransfer.propTypes = {
  style: PropTypes.any,
}

export default MenuItemTransfer
