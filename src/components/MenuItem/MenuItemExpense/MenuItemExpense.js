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

function MenuItemExpense({style, onSubmit}) {
  const [amount, setAmount] = useState(0)

  const onExpenseSubmit = ({ name, id }, close) => {
    addTransaction({
      expense: {
        amount,
        recipient: `category:${name}`,
        categoryId: id,
      },
    })

    close()
    onSubmit()
  }

  const categories = useSelector(state => state.money.expenseCategories)

  return (
    <MenuItemBase
      style={style}
      title="Expense"
      icon="minus"
      iconColors={['#fff0f4', '#da7a98']}
      className="menu-item-expense"
      pages={[
        ({ nextStep }) => (
          <MoneyCalculator
            onSubmit={(amount) => {
              setAmount(amount)
              nextStep(false)
            }}
          />
        ),
        ({ previousStep, close }) => (
          <TopNavigationLayout onBackPress={previousStep}>
            {categories.map((category) => (
              <div key={category.id} className="menu-item-expense__menu-item">
                <CircularProgress value={category.amount} max={category.limit} />

                <Button onClick={() => onExpenseSubmit(category, close)}>
                  {category.name}
                </Button>
              </div>
            ))}
          </TopNavigationLayout>
        ),
      ]}
    />
  )
}

MenuItemExpense.propTypes = {
  style: PropTypes.any,
  onSubmit: PropTypes.func,
}

export default MenuItemExpense
