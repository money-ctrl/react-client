import './Label.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Label({ className, children, name, label, hint, ...rest }) {
  const labelledby = {
    label: `${name}-label`,
    ...(hint && { hint: `${name}-hint` }),
  }

  return (
    <div
      className={classnames([
        'label',
        className,
      ])}
    >
      <label
        id={labelledby.label}
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
        'aria-labelledby': Object.values(labelledby).join(' '),
      })}

      {hint && (
        <span
          id={labelledby.hint}
          className="label__hint mt-xxs"
        >
          {hint}
        </span>
      )}
    </div>
  )
}

Label.propTypes = {
  children: PropTypes.func,
  label: PropTypes.string,
  hint: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.any,
}

export default Label
