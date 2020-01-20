import './MenuItemIncome.css'
import React from 'react'
import MenuItemBase from '../MenuItemBase'
import Icon from '../../ui/Icon'

function MenuItemIncome() {
  return (
    <MenuItemBase
      slotTitle={( <>
        <Icon name="plus"/>
        Income
      </>)}
    />
  )
}

export default MenuItemIncome
