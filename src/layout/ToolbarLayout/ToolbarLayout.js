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
  const [activeIndex, setActiveIndex] = useState(0)

  const menu = items.map((item, index) =>
    <img
      key={item.alt}
      src={item.src}
      alt={item.alt}
      height="30px"
      width="30px"
      className={activeIndex !== index ? 'toolbar-layout__item--inactive' : ''}
      tabIndex="0"
      role="button"
      onClick={() => setActiveIndex(index)}
    />
  )

  const { page: SelectedTab } = items.filter((_item, index) => index === activeIndex)[0]

  return (<>
    <div className="toolbar-layout__tab-container">
      <SelectedTab className={classNames('toolbar-layout__page', isMenuOpen && 'toolbar-layout__page--menu-is-open')} />
    </div>

    <Card className={classNames('toolbar-layout__toolbar', isMenuOpen && 'toolbar-layout__toolbar--menu-is-open')}>
      {menu}

      <ActionButton
        className="toolbar-layout__action-button"
        isMenuOpen={isMenuOpen}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <MenuItemIncome onSubmit={() => setMenuOpen(false)} />
        <MenuItemExpense onSubmit={() => setMenuOpen(false)} />
        <MenuItemTransfer onSubmit={() => setMenuOpen(false)} />
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
