import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuItemBase from '@/components/MenuItem/MenuItemBase'
import MoneyCalculator from '@/components/MoneyCalculator'
import CategorySelector from '@/components/CategorySelector'
import { addTransaction } from '@/services/backend'
import { resourceId } from '@/utils'

function MenuItemTransfer({style}) {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState(0)

  const onTransactionSubmit = ({ amount, sender, recipient }) => {
    addTransaction({
      type: 'transfer',
      amount,
      sender: {type: 'category', ...sender},
      recipient: {type: 'category', ...recipient},
      transactionNature: 'Transference',
    })
  }

  const pages = [
    ({ nextStep }) => (
      <MoneyCalculator
        key="amount"
        onSubmit={(amount) => {
          setAmount(amount)
          nextStep()
        }}
      />
    ),
    ({ previousStep, nextStep }) => (
      <CategorySelector
        key="Where to take?"
        title="Where to take?"
        onBackPress={previousStep}
        onSubmit={(category) => {
          setFrom(category)
          nextStep()
        }}
      />
    ),
    ({ previousStep, close }) => (
      <CategorySelector
        key="Where to deposit?"
        title="Where to deposit?"
        blocklist={[resourceId(from)]}
        onBackPress={previousStep}
        onSubmit={(category) => {
          onTransactionSubmit({
            amount,
            sender: from,
            recipient: category,
          })
          close()
        }}
      />
    ),
  ]

  return (
    <MenuItemBase
      style={style}
      title="Transfer"
      icon="chevron-right"
      iconColors={['#f8efff', '#9a73e4']}
      pages={pages}
    />
  )
}

MenuItemTransfer.propTypes = {
  style: PropTypes.any,
}

export default MenuItemTransfer
