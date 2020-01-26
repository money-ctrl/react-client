import './ToolbarLayout.css'
import ActionButton from '../../ui/ActionButton'
import Card from '../../ui/Card'
import React, { useState } from 'react'
import MenuItemIncome from '../../components/MenuItemIncome'
import MenuItemExpense from '../../components/MenuItemExpense'
import MenuItemTransfer from '../../components/MenuItemTransfer'
import classNames from 'classnames'
import PropTypes from 'prop-types'

function ToolbarLayout({ items = [] }) {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const activeIndex = 0

  const menu = items.map((item, index) =>
    <img
      key={item.alt}
      src={item.src}
      alt={item.alt}
      height="30px"
      width="30px"
      className={activeIndex !== index ? 'toolbar__item--inactive' : ''}
    />
  )

  const { page: SelectedTab } = items.filter((_item, index) => index === activeIndex)[0]

  return (<>
    <SelectedTab className={classNames('page', isMenuOpen && 'page--menu-is-open')} />

    <Card className={classNames('toolbar', isMenuOpen && 'toolbar--menu-is-open')}>
      {menu}

      <ActionButton
        className="toolbar__action-button"
        onMenuOpen={setMenuOpen}
      >
        <MenuItemIncome />
        <MenuItemExpense />
        <MenuItemTransfer />
      </ActionButton>
    </Card>
  </>)
}

ToolbarLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
    page: PropTypes.any.isRequired,
  })),
}

export default ToolbarLayout
