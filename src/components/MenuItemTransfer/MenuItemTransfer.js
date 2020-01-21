import './MenuItemTransfer.css'
import React from 'react'
import MenuItemBase from '../MenuItemBase'
import Icon from '../../ui/Icon'

function MenuItemIncome() {
  return (
    <MenuItemBase
      slotTitle={( <>
        Transfer
        <Icon name="chevron-right"/>
      </>)}
    />
  )
}

export default MenuItemIncome
