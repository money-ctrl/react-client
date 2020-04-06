import React from 'react'
import MenuItemBase from '../MenuItemBase'
import PropTypes from 'prop-types'

function MenuItemTransfer({style}) {
  const pages = [
    <div key="0">
      This is a work in progress

      <div key="1">
        Reset cycle
      </div>
      <div key="2">
        Add salary
      </div>
    </div>,
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
