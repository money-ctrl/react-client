import './TopNavigationLayout.css'
import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../ui/Button'

function TopNavigationLayout({ children, onBackPress }) {
  return (
    <div className="top-navigation-layout">
      <div className="top-navigation-layout__toolbar">
        <Button variant="secondary" onClick={onBackPress}>
          <i className="fas fa-chevron-left"></i>
        </Button>
      </div>

      <div className="top-navigation-layout__content">
        {children}
      </div>
    </div>
  )
}

TopNavigationLayout.propTypes = {
  children: PropTypes.any,
  onBackPress: PropTypes.func,
}

export default TopNavigationLayout
