import './Label.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Label({ className, children, name, label, ...rest }) {
  return (
    <div
      className={classnames([
        'label',
        className,
      ])}
    >
      <label
        htmlFor={name}
        className="label__label"
        {...rest}
      >
        {label}
      </label>

      {children({
        id: name,
        name,
        placeholder: label,
      })}
    </div>
  )
}

Label.propTypes = {
  children: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.any,
}

export default Label
