import './MenuItemMore.css'
import React, { useState } from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'
import Button from '../../../ui/Button'
import { resetCycle } from './resetCycle'
import { useSelector } from 'react-redux'

function MenuItemTransfer({style}) {
  const categories = useSelector(state => state.categories.list)

  const [isLoading, setLoading] = useState(false)

  const pages = [
    ({ close }) => (
      <div>
        This is a work in progress

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

          <Button isLoading={true}>
            Add salary
          </Button>

          <Button isLoading={true}>
            Add budget to a category
          </Button>
        </div>
      </div>
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
