import React, { useState } from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'
import MoneyCalculator from '../../MoneyCalculator'
import CategorySelector from '../../CategorySelector'
import { addTransaction, resourceIdentifier } from '../../../services/backend'

function MenuItemTransfer({style}) {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState(0)

  const onTransactionSubmit = ({ amount, sender, recipient }) => {
    addTransaction({
      type: 'transfer',
      amount,
      sender: {type: 'category', ...sender},
      recipient: {type: 'category', ...recipient},
      transactionNature: 'transference',
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
        blacklist={[resourceIdentifier(from)]}
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
