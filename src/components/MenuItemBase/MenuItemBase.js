import './MenuItemBase.css'
import Card from '../../ui/Card'
import React, { useState } from 'react'
import classnames from 'classnames'
import MoneyCalculator from '../MoneyCalculator'
import PropTypes from 'prop-types'
import Icon from '../../ui/Icon'

function MenuItemBase({
  title,
  icon,
  iconColors = [],
  onSubmit = () => {},
  style,
}) {
  const [isExpanded, setExpanded] = useState(false)

  const classes = classnames([
    'menu-item-base',
    isExpanded && 'menu-item-base--is-expanded'
  ])

  const Title = isExpanded ? 'div' : 'button'

  return (<>
    {isExpanded && <div className="event-capture" />}
    <Card
      tag='div'
      className={classes}
      style={style}
    >
      <button
        className="menu-item-base__cancel"
        onClick={() => setExpanded(false)}
      >
        Cancel
      </button>
      <Title
        onClick={() => setExpanded(true)}
        className={classnames(
          'menu-item-base__title',
          isExpanded && 'menu-item-base__title--is-expanded'
        )}
      >
        <span>
          {title}
        </span>

        <div
          className="menu-item-base__title-icon"
          style={{
            backgroundColor: iconColors[0],
            color: iconColors[1],
          }}
        >
          <Icon name={icon} />
        </div>
      </Title>
      {isExpanded && <div
        className="menu-item-base__content"
      >
        <MoneyCalculator
          onSubmit={onSubmit}
        />
      </div>}
    </Card>
  </>)
}

MenuItemBase.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  iconColors: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
  style: PropTypes.any,
}

export default MenuItemBase
