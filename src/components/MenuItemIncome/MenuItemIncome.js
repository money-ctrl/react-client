import React from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'

function MenuItemIncome({style}) {
  return (
    <MenuItemBase
      style={style}
      title="Income"
      icon="plus"
      iconColors={['#eff9f6', '#5bbaa4']}
    />
  )
}

MenuItemIncome.propTypes = {
  style: PropTypes.any,
}

export default MenuItemIncome
