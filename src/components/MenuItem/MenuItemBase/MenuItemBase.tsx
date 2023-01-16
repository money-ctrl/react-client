import './MenuItemBase.css'
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Transition } from 'react-transition-group'
import Card from '@/ui/Card'
import Icon from '@/ui/Icon'
import ViewMultiSteps from '@/ui/ViewMultiSteps'

const sleep = (time) => new Promise((r) => setTimeout(r, time))

function MenuItemBase({
  title,
  icon,
  iconColors = [],
  style,
  pages = [],
  className,
}) {
  const [isExpanded, setExpanded] = useState(false)
  const [preExpand, setPreExpand] = useState(false)

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
      maxHeight: 'calc(100vh - var(--cancel-button-top-offset))',
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

  const close = () => {setExpanded(false)}

  return (<>
    {isExpanded && <div className="event-capture" />}
    <Transition
      in={isExpanded}
      timeout={0}
      onExited={() => setPreExpand(false)}
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
            preExpand && 'menu-item-base--about-to-expand',
            isExpanded && 'menu-item-base--is-expanded',
            className,
          ])}
        >
          <button
            className="menu-item-base__cancel"
            onClick={close}
          >
            Cancel
          </button>
          <div className="menu-item-base__wrapper">
            <Title
              onClick={async () => {
                setPreExpand(true)
                await sleep(100)
                setExpanded(true)
              }}
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

            {isExpanded && (
              <ViewMultiSteps
                pages={pages}
                onClose={close}
              />
            )}
          </div>
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
  pages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
  className: PropTypes.string,
}

export default MenuItemBase
