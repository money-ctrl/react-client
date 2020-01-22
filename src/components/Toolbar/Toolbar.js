import './Toolbar.css'
import ActionButton from '../../ui/ActionButton'
import Card from '../../ui/Card'
import React, { useState } from 'react'
import MenuItemIncome from '../MenuItemIncome'
import MenuItemExpense from '../MenuItemExpense'
import MenuItemTransfer from '../MenuItemTransfer'
import classNames from 'classnames'
import SVGDashboard from '../../assets/dashboard.svg'
import SVGFeather from '../../assets/feather.svg'
import SVGHome from '../../assets/home.svg'
import PropTypes from 'prop-types'

function Toolbar({ onMenuOpen = () => {} }) {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const openMenu = (isMenuOpen) => {
    onMenuOpen(isMenuOpen)
    setMenuOpen(isMenuOpen)
  }

  const activeIndex = 0

  const menu = [{
    alt: 'dashboard',
    src: SVGDashboard,
  },{
    alt: 'history',
    src: SVGFeather,
  },{
    alt: 'account',
    src: SVGHome,
  }].map((item, index) =>
    <img
      key={item.alt}
      src={item.src}
      alt={item.alt}
      height="30px"
      width="30px"
      className={activeIndex !== index ? 'toolbar__item--inactive' : ''}
    />
  )

  const cardClasses = classNames(
    'toolbar',
    isMenuOpen && 'toolbar--menu-is-open',
  )

  return (
    <Card className={cardClasses}>
      {menu}

      <ActionButton
        className="toolbar__action-button"
        onMenuOpen={openMenu}
      >
        <MenuItemIncome />
        <MenuItemExpense />
        <MenuItemTransfer />
      </ActionButton>
    </Card>
  )
}

Toolbar.propTypes = {
  onMenuOpen: PropTypes.func,
}

export default Toolbar
