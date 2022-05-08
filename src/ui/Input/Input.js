import './Input.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Input({
  className,
  ...rest
}) {
  return (
    <div
      className={classnames([
        'input',
        className,
      ])}
    >
      <input
        className="input__input"
        {...rest}
      />
    </div>
  )
}

Input.propTypes = {
  className: PropTypes.string,
}

Input.defaultProps = {
}

export default Input
