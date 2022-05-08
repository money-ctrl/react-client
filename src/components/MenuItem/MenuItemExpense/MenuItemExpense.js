import React, { useEffect } from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'
import { addTransaction } from '../../../services/backend'
import MoneyCalculator from '../../MoneyCalculator'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import CategorySelector from '../../CategorySelector'

const Execute = ({ onRender }) => {
  useEffect(() => onRender(), [onRender])
  return null
}

function MenuItemExpense({style, onSubmit}) {
  const categoriesPageMatch = useRouteMatch('/categories/:categoryId')
  const categories = useSelector(state => state.categories.ids)

  const pages = [
    ({ previousStep, nextStep }) => (
      <CategorySelector
        onBackPress={previousStep}
        onSubmit={category => nextStep({ category })}
        title="Where to spend?"
      />
    ),
    ({ previousStep, nextStep }) => (
      <MoneyCalculator
        onBackPress={previousStep}
        onSubmit={(amount) => nextStep({ amount })}
      />
    ),
    ({ close, payload }) => (
      <Execute onRender={() => {
        const { category, amount } = payload

        addTransaction({
          type: 'expense',
          transactionNature: window.prompt() || 'Nature not specified',
          amount,
          sender: { type: 'category', ...category },
          recipient: { type: 'reason', name: 'Unknown', id: 'unknown' },
        })

        close()
        onSubmit()
      }} />
    ),
  ]

  if (categoriesPageMatch) {
    const { categoryId } = categoriesPageMatch.params
    const categoryFromUrl = categories[categoryId]

    pages.shift()
    pages.unshift(({ nextStep }) => (
      <Execute onRender={() => nextStep({
        category: categoryFromUrl,
      })} />
    ))
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
