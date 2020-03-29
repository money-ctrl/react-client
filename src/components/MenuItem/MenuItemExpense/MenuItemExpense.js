import React, { useState } from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'
import { addTransaction } from '../../../services/backend'
import MoneyCalculator from '../../MoneyCalculator'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import CategorySelector from '../../CategorySelector'

function MenuItemExpense({style, onSubmit}) {
  const [amount, setAmount] = useState(0)

  const onExpenseSubmit = (sender, close, value = 0) => {
    addTransaction({
      type: 'expense',
      transactionNature: 'Nature not specified',
      amount: value || amount,
      sender: {type: 'category', ...sender},
      recipient: {
        type: 'reason',
        name: 'Unknown',
        id: 'unknown',
      },
    })

    close()
    onSubmit()
  }

  let pages = [
    ({ nextStep }) => (
      <MoneyCalculator
        onSubmit={(amount) => {
          setAmount(amount)
          nextStep()
        }}
      />
    ),
    ({ previousStep, close }) => (
      <CategorySelector
        onBackPress={previousStep}
        onSubmit={category => onExpenseSubmit(category, close)}
        title="Where to spend?"
      />
    ),
  ]

  const categoriesPageMatch = useRouteMatch('/categories/:categoryId')
  const categories = useSelector(state => state.categories.ids)
  if (categoriesPageMatch) {
    const { categoryId } = categoriesPageMatch.params
    const categoryFromUrl = categories[categoryId]

    pages = [({ close }) => (
      <MoneyCalculator
        onSubmit={(amount) => {
          onExpenseSubmit(categoryFromUrl, close, amount)
        }}
      />
    )]
  }

  return (
    <MenuItemBase
      style={style}
      title="Expense"
      icon="minus"
      iconColors={['#fff0f4', '#da7a98']}
      className="menu-item-expense"
      pages={pages}
    />
  )
}

MenuItemExpense.propTypes = {
  style: PropTypes.any,
  onSubmit: PropTypes.func,
}

export default MenuItemExpense
