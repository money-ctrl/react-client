import './MenuItemIncome.css'
import React from 'react'
import MenuItemBase from '../MenuItemBase'
import Icon from '../../ui/Icon'
import PropTypes from 'prop-types'

function MenuItemIncome({style}) {
  return (
    <MenuItemBase
      style={style}
      slotTitle={( <>
        Income
        <Icon name="plus"/>
      </>)}
    />
  )
}

MenuItemIncome.propTypes = {
  style: PropTypes.any,
}

export default MenuItemIncome
