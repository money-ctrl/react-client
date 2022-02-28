import './MenuItemMore.css'
import React, { useState, useEffect } from 'react'
import MenuItemBase from '../MenuItemBase'
import MoneyCalculator from '../../MoneyCalculator'
import CategorySelector from '../../CategorySelector'
import Button from '../../../ui/Button'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { resetCycle, addBudgetToCategory, schedulePayment } from './actions'

const actionList = {
  addBudgetToCategory: {
    handler: addBudgetToCategory,
    label: 'Add budget to a category',
    pages: ['money', 'category', 'nature'],
  },
  schedulePayment: {
    handler: schedulePayment,
    label: 'Add scheduled payment',
    pages: ['money', 'category', 'nature'],
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
  'category': ({ previousStep, nextStep, payload }) => (
    <CategorySelector
      title="Where to add budget?"
      onBackPress={previousStep}
      onSubmit={(category) => nextStep({
        ...payload,
        category,
      })}
    />
  ),
  'nature': ({ nextStep, payload }) => (
    <Execute onRender={() => nextStep({
      ...payload,
      transactionNature: window.prompt('Edit transition nature', 'Nature not specified'),
    })} />
  ),
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
