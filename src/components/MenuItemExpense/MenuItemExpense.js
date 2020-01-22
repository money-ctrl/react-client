import './MenuItemExpense.css'
import React from 'react'
import MenuItemBase from '../MenuItemBase'
import Icon from '../../ui/Icon'
import PropTypes from 'prop-types'

function MenuItemExpense({style}) {
  return (
    <MenuItemBase
      style={style}
      slotTitle={(<>
        Expense
        <Icon name="minus"/>
      </>)}
    />
  )
}

MenuItemExpense.propTypes = {
  style: PropTypes.any,
}

export default MenuItemExpense
