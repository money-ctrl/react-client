import './TopNavigationLayout.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@/ui/Button'
import Icon from '@/ui/Icon'

function TopNavigationLayout({ children, onBackPress, actions = [], titleSlot, className }) {
  return (
    <div className={classNames('top-navigation-layout', className)}>
      <div className="top-navigation-layout__toolbar">
        <Button variant="secondary" onClick={onBackPress} className="top-navigation-layout__back">
          <Icon name="chevron-left" />
        </Button>

        {titleSlot}

        {actions.map(({ icon, onClick }) => (
          <Button
            key={icon}
            variant="secondary"
            onClick={onClick}
          >
            <Icon name={icon} />
          </Button>
        ))}
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
  actions: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    icon: PropTypes.string,
  })),
  titleSlot: PropTypes.any,
  className: PropTypes.string,
}

export default TopNavigationLayout
