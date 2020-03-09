import './MenuItemBase.css'
import React, { useState, useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'
import classnames from 'classnames'
import Card from '../../../ui/Card'
import PropTypes from 'prop-types'
import Icon from '../../../ui/Icon'

function MenuItemBase({
  title,
  icon,
  iconColors = [],
  style,
  pages = [],
  className,
}) {
  const [isExpanded, setExpanded] = useState(false)

  const Title = isExpanded ? 'div' : 'button'

  const [cardTransitions, setCardTransitions] = useState({})
  const cardRef = useRef(null)
  useEffect(() => {
    if (cardTransitions.exited) return

    const {
      right,
      bottom,
      height,
      left,
    } = cardRef.current.getBoundingClientRect()

    const exited = {
      position: 'fixed',
      height: `${height}px`,
      right: `${window.innerWidth - right}px`,
      bottom: `${window.innerHeight - bottom}px`,
      left: `${left}px`,
    }

    const entered = {
      position: 'fixed',
      height: '500px',
      bottom: 'var(--space-xxs)',
      right: 'var(--space-xxs)',
      left: 'var(--space-xxs)',
      zIndex: 2,
    }

    setCardTransitions({
      exited,
      exiting: entered,
      entering: { ...exited, zIndex: 2 },
      entered,
    })
  }, [cardTransitions.exited])

  const [pageIndex, setPageIndex] = useState(0)
  const nextStep = () => setPageIndex(pageIndex+1)
  const previousStep = () => setPageIndex(pageIndex-1)
  const close = () => {setExpanded(false);setPageIndex(0)}
  const displayCurrentPage = () => {
    if (typeof pages[pageIndex] === 'function') {
      return pages[pageIndex]({
        nextStep,
        previousStep,
        close,
      })
    } else {
      return pages[pageIndex]
    }
  }

  return (<>
    {isExpanded && <div className="event-capture" />}
    <Transition
      in={isExpanded}
      timeout={0}
      classNames="menu-item-base--is-expanded"
    >
      {state => (
        <Card
          reference={cardRef}
          tag='div'
          style={{
            ...style,
            ...cardTransitions[state],
          }}
          className={classnames([
            'menu-item-base',
            isExpanded && 'menu-item-base--is-expanded',
            className,
          ])}
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
            {displayCurrentPage()}
          </div>}
        </Card>
      )}
    </Transition>
  </>)
}

MenuItemBase.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  iconColors: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.any,
  pages: PropTypes.arrayOf(PropTypes.func),
  className: PropTypes.string,
}

export default MenuItemBase
