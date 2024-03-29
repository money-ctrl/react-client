import './ContextMenu.css'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import Card from '@/ui/Card'
import Button from '@/ui/Button'
import { contextAssign, contextNext } from '@/actions'

const transitionDuration = 300

function ContextMenu({ onMenuOpen }) {
  const dispatch = useDispatch()

  const { isOpen, queue } = useSelector(state => state.context)
  const [{ optionList = [], header = null } = {}] = queue

  const closeMenu = () => {
    dispatch(contextAssign({ isOpen: false }))

    setTimeout(() => {
      // back to default
      dispatch(contextNext())
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
                option.onClick()
                closeMenu()
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
