import './MenuItemMore.css'
import React, { useState } from 'react'
import MenuItemBase from '../MenuItemBase'
import MoneyCalculator from '../../MoneyCalculator'
import CategorySelector from '../../CategorySelector'
import Button from '../../../ui/Button'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { resetCycle, addBudgetToCategory } from './actions'

const actionList = {
  addBudgetToCategory: {
    handler: addBudgetToCategory,
    label: 'Add budget to a category',
  },
}

function MenuItemMore({style}) {
  const categories = useSelector(state => state.categories.list)

  const [isLoading, setLoading] = useState(false)

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

        {Object.entries(actionList).map(([key, { label }]) => (
          <Button
            key={key}
            onClick={()=>nextStep({ action: key })}
          >
            { label }
          </Button>
        ))}
      </div>
    ),
    ({ nextStep }) => (
      <MoneyCalculator
        onSubmit={(amount) => nextStep({ amount })}
      />
    ),
    ({ previousStep, close, payload: { action, ...payload } }) => (
      <CategorySelector
        title="Where to add budget?"
        onBackPress={previousStep}
        onSubmit={(category) => {
          actionList[action].handler({ ...payload, category })
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

MenuItemMore.propTypes = {
  style: PropTypes.any,
}

export default MenuItemMore
