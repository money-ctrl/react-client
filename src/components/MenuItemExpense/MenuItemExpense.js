import './MenuItemExpense.css'
import React from 'react'
import MenuItemBase from '../MenuItemBase'
import Icon from '../../ui/Icon'

function MenuItemIncome() {
  return (
    <MenuItemBase
      slotTitle={(<>
        Expense
        <Icon name="minus"/>
      </>)}
    />
  )
}

export default MenuItemIncome
