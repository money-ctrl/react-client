import React from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'
import { database } from '../../services/backend'

function MenuItemIncome({
  style,
  onSubmit = () => {},
}) {

  const onMoneySubmit = (amount) => {
    database().set({
      total: amount,
    })

    onSubmit()
  }

  return (
    <MenuItemBase
      style={style}
      title="Income"
      icon="plus"
      iconColors={['#eff9f6', '#5bbaa4']}
      onSubmit={onMoneySubmit}
    />
  )
}

MenuItemIncome.propTypes = {
  style: PropTypes.any,
  onSubmit: PropTypes.func,
}

export default MenuItemIncome
