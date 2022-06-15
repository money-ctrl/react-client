import './ContextMenu.css'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import Button from '../Button'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { contextAssign } from '../../actions'
import { initialState } from '../../reducers/context'

const transitionDuration = 300

function ContextMenu({ onMenuOpen }) {
  const dispatch = useDispatch()

  const { isOpen, optionList, header } = useSelector(state => state.context)

  const closeMenu = () => {
    dispatch(contextAssign({ isOpen: false }))

    setTimeout(() => {
      // back to default
      dispatch(contextAssign(initialState))
    }, transitionDuration)
  }

  useEffect(() => {
    onMenuOpen(isOpen)
  })

  return (
    <div className="context-menu">
      {isOpen && <div className="context-menu__click-bait" onClick={closeMenu}></div>}

      <Card
        className={classNames(
          'context-menu__dialog',
          isOpen && 'context-menu__dialog--open',
        )}
        style={{transitionDuration: `${transitionDuration}ms`}}
      >
        <div
          className="context-menu__drag-hint"
          onClick={closeMenu}
        ></div>

        <div className="context-menu__content">
          {header && header({
            closeMenu,
          })}

          {optionList.map(option => (
            <Button
              key={option.label}
              behavior="block"
              variant={option.variant}
              onClick={() => {
                let defaultBehavior = true
                const event = {
                  preventDefault: () => {
                    defaultBehavior = false
                  },
                }

                option.onClick(event)

                if (defaultBehavior) {
                  closeMenu()
                }
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}

ContextMenu.propTypes = {
  onMenuOpen: PropTypes.func,
}

export default ContextMenu
