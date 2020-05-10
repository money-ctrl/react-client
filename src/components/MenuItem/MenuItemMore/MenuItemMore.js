import './MenuItemMore.css'
import React, { useState } from 'react'
import MenuItemBase from '../MenuItemBase'
import MoneyCalculator from '../../MoneyCalculator'
import CategorySelector from '../../CategorySelector'
import Button from '../../../ui/Button'
import PropTypes from 'prop-types'
import { resetCycle } from './resetCycle'
import { addBudgetToCategory } from './addBudgetToCategory'
import { useSelector } from 'react-redux'

function MenuItemTransfer({style}) {
  const categories = useSelector(state => state.categories.list)

  const [isLoading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)

  const pages = [
    ({ close, nextStep }) => (
      <div className="menu-item-more__button-list">
        <Button
          isLoading={isLoading}
          onClick={async () => {
            setLoading(true)
            await resetCycle({categories})
            setLoading(false)
            close()
          }}
        >
          Reset cycle
        </Button>

        <Button onClick={nextStep}>
          Add budget to a category
        </Button>
      </div>
    ),
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
        title="Where to add budget?"
        onBackPress={previousStep}
        onSubmit={(category) => {
          addBudgetToCategory({category, amount})
          close()
        }}
      />
    ),
  ]

  return (
    <MenuItemBase
      style={style}
      title="Actions"
      icon="ellipsis-v"
      iconColors={['hsl(211deg, 83%, 96%)', '#2887ed']}
      pages={pages}
    />
  )
}

MenuItemTransfer.propTypes = {
  style: PropTypes.any,
}

export default MenuItemTransfer
