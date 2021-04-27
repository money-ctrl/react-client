import './ToolbarLayout.css'
import ActionButton from '../../ui/ActionButton'
import Card from '../../ui/Card'
import React, { useState } from 'react'
import {
  MenuItemExpense,
  MenuItemIncome,
  MenuItemMore,
  MenuItemTransfer,
} from '../../components/MenuItem'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function ToolbarLayout({ items = [], children, requestLowOpacity = false }) {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const menu = items.map((item) =>
    <NavLink
      key={item.alt}
      to={item.path}
      className="toolbar-layout__item"
      activeClassName="toolbar-layout__item--active"
      exact
    >
      <img
        src={item.src}
        alt={item.alt}
        height="30px"
        width="30px"
      />
    </NavLink>
  )

  return (<>
    <div className={classNames(
      'toolbar-layout__tab-container',
      (isMenuOpen || requestLowOpacity) && 'toolbar-layout__tab-container--menu-is-open',
    )}>
      {children}
    </div>

    <Card className={classNames('toolbar-layout__toolbar', isMenuOpen && 'toolbar-layout__toolbar--menu-is-open')}>
      {menu}

      <ActionButton
        className="toolbar-layout__action-button"
        isMenuOpen={isMenuOpen}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <MenuItemMore onSubmit={() => setMenuOpen(false)} />
        <MenuItemIncome onSubmit={() => setMenuOpen(false)} />
        <MenuItemTransfer onSubmit={() => setMenuOpen(false)} />
        <MenuItemExpense onSubmit={() => setMenuOpen(false)} />
      </ActionButton>
    </Card>
  </>)
}

ToolbarLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    path: PropTypes.any.isRequired,
  })),
  children: PropTypes.any,
  requestLowOpacity: PropTypes.bool,
}

export default ToolbarLayout
