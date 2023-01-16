import React from 'react'
import PropTypes from 'prop-types'
import MoneyCalculator from '@/components/MoneyCalculator'
import MenuItemBase from '@/components/MenuItem/MenuItemBase'
import { addTransaction } from '@/services/backend'

function MenuItemIncome({
  style,
  onSubmit = () => {},
}) {

  const onMoneySubmit = (amount) => {
    addTransaction({
      type: 'income',
      transactionNature: 'Nature not specified',
      amount,
      sender: {
        type: 'reason',
        name: 'Unknown',
        id: 'unknown',
      },
      recipient: {
        type: 'wallet',
        name: 'Main wallet',
        id: 'main',
      },
    })

    const amountDisplay = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

    alert(`Ok, ${amountDisplay}$ was successfully added to your total balance, you can check it on the Stats Page`)
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
