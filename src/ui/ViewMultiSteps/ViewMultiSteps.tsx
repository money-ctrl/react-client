import './ViewMultiSteps.css'
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

function ViewMultiSteps({ pages, onClose }) {
  const [stepsPayload, setPagePayload] = useState({})
  const [pageIndex, setPageIndex] = useState(0)

  const close = () => {
    setPageIndex(-1)
    onClose()
  }

  const previousStep = () => setPageIndex((pageIndex) => {
    if (pageIndex === 0) {
      close()
      return 0
    }

    return pageIndex - 1
  })
  const nextStep = (payload) => {
    setPagePayload({ ...stepsPayload, ...payload })
    setPageIndex((pageIndex) => {
      return pageIndex === (pages.length - 1) ? pageIndex : pageIndex + 1
    })
  }

  const displayCurrentPage = () => {
    if (typeof pages[pageIndex] === 'function') {
      return pages[pageIndex]({
        payload: stepsPayload,
        nextStep,
        previousStep,
        close,
      })
    } else {
      return pages[pageIndex]
    }
  }

  return (
    <SwitchTransition>
      <CSSTransition key={pageIndex} classNames="slide-left" timeout={250}>
        <div>
          {displayCurrentPage()}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

ViewMultiSteps.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
  onClose: PropTypes.func,
}

ViewMultiSteps.defaultProps = {
  pages: [],
  onClose: () => {},
}

export default ViewMultiSteps
