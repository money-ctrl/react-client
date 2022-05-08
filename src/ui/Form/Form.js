import React from 'react'
import PropTypes from 'prop-types'

function Form({ onSubmit, children, ...rest }) {
  return (
    <form
      {...rest}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          data: Object.fromEntries(new FormData(event.target).entries()),
          event: event.nativeEvent,
        })
      }}
    >
      {children}
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node,
}

Form.defaultProps = {
  onSubmit: () => {},
}

export default Form
