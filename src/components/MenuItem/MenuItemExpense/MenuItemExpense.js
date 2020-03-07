import React from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'

function MenuItemExpense({style}) {
  return (
    <MenuItemBase
      style={style}
      title="Expense"
      icon="minus"
      iconColors={['#fff0f4', '#da7a98']}
    />
  )
}

MenuItemExpense.propTypes = {
  style: PropTypes.any,
}

export default MenuItemExpense
