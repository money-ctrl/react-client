import React from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'
import { addTransaction } from '../../../services/backend'
import MoneyCalculator from '../../MoneyCalculator'

function MenuItemIncome({
  style,
  onSubmit = () => {},
}) {

  const onMoneySubmit = (amount) => {
    addTransaction({
      income: { amount },
    })

    onSubmit()
  }

  return (
    <MenuItemBase
      style={style}
      title="Income"
      icon="plus"
      iconColors={['#eff9f6', '#5bbaa4']}
      pages={[
        ({ close }) => (
          <MoneyCalculator
            onSubmit={(amount) => {
              close()
              onMoneySubmit(amount)
            }}
          />
        ),
      ]}
    />
  )
}

MenuItemIncome.propTypes = {
  style: PropTypes.any,
  onSubmit: PropTypes.func,
}

export default MenuItemIncome
