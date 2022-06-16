import './MenuItemMore.css'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Button from '@/ui/Button'
import MenuItemBase from '@/components/MenuItem/MenuItemBase'
import MoneyCalculator from '@/components/MoneyCalculator'
import CategorySelector from '@/components/CategorySelector'
import TransactionForm from '@/components/MenuItem/pages/TransactionForm'
import ScheduleForm from '@/components/MenuItem/pages/ScheduleForm'
import { resetCycle, addBudgetToCategory, schedulePayment } from './actions'

const actionList = {
  addBudgetToCategory: {
    handler: addBudgetToCategory,
    label: 'Add budget to a category',
    pages: ['category', 'money', 'nature'],
  },
  schedulePayment: {
    handler: schedulePayment,
    label: 'Add scheduled payment',
    pages: ['money', 'category', 'nature', 'schedule'],
  },
}

const Execute = ({ onRender }) => {
  useEffect(() => onRender(), [onRender])
  return null
}

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const pagePool = {
  'money': ({ nextStep }) => (
    <MoneyCalculator
      onSubmit={(amount) => nextStep({ amount })}
    />
  ),
  'category': ({ previousStep, nextStep }) => (
    <CategorySelector
      title="Where to add budget?"
      onBackPress={previousStep}
      onSubmit={(category) => nextStep({
        category,
      })}
    />
  ),
  'nature': TransactionForm,
  'schedule': ScheduleForm,
}
/* eslint-enable react/prop-types */
/* eslint-enable react/display-name */

function MenuItemMore({style}) {
  const categories = useSelector(state => state.categories.list)

  const [isLoading, setLoading] = useState(false)
  const [action, setAction] = useState(null)

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
            onClick={() => { setAction(key); nextStep() }}
          >
            { label }
          </Button>
        ))}
      </div>
    ),
    ...(action ? actionList[action].pages.map(pageId => pagePool[pageId]) : []),
    ({ close, payload }) => (
      <Execute onRender={() => {
        actionList[action].handler(payload)
        close()
      }} />
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
