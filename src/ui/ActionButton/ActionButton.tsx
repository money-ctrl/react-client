import './ActionButton.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SVGPlus from '@/assets/plus.svg'
import Card from '@/ui/Card'

function ActionButton({
  children,
  className,
  isMenuOpen,
  onClick = () => {},
}) {
  const addAnimationDelay = (children) => {
    return React.Children.map(children, (child, index) => React.cloneElement(child, {
      style: {animationDelay: `${(index + 1) * 0.1}s`},
    }))
  }

  return (
    <div className={classNames('action-button', className)}>
      <div
        className={classNames(isMenuOpen && 'action-button__overlay')}
        onClick={onClick}
      />
      <div
        aria-hidden={!isMenuOpen}
        className={`action-button__menu ${isMenuOpen ? 'action-button__menu--is-open' : ''}`}
      >
        {addAnimationDelay(children)}
      </div>
      <Card
        tag="button"
        className="action-button__button"
        onClick={onClick}
      >
        <img
          className={`action-button__icon ${isMenuOpen ? 'action-button__icon--is-open' : ''}`}
          src={SVGPlus}
          alt="transaction"
          height="30px"
          width="30px"
        />
      </Card>
    </div>
  )
}

ActionButton.propTypes = {
  className: PropTypes.any,
  children: PropTypes.any,
  isMenuOpen: PropTypes.bool,
  onClick: PropTypes.func,
}

export default ActionButton
