import './MenuItemExpense.css'
import React, { useState } from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'
import { addTransaction } from '../../../services/backend'
import MoneyCalculator from '../../MoneyCalculator'
import TopNavigationLayout from '../../../layout/TopNavigationLayout'
import { useSelector } from 'react-redux'
import Button from '../../../ui/Button'
import CircularProgress from '../../../ui/CircularProgress'
import { useRouteMatch } from 'react-router-dom'

function MenuItemExpense({style, onSubmit}) {
  const [amount, setAmount] = useState(0)

  const onExpenseSubmit = ({ name, id }, close, value = 0) => {
    addTransaction({
      expense: {
        amount: value || amount,
        recipient: `category:${name}`,
        categoryId: id,
      },
    })

    close()
    onSubmit()
  }

  const categorylist = useSelector(state => state.categories.list)

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
      <TopNavigationLayout onBackPress={previousStep}>
        {categorylist.map((category) => (
          <div key={category.id} className="menu-item-expense__menu-item">
            <CircularProgress value={category.amount} max={category.limit} />

            <Button onClick={() => onExpenseSubmit(category, close)}>
              {category.name}
            </Button>
          </div>
        ))}
      </TopNavigationLayout>
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
