import './Input.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icon from '@/ui/Icon'

function Select({
  className,
  options: optionsRaw,
  ...rest
}) {
  const options = (() => optionsRaw.map(item => {
    if (typeof item === 'string') {
      return [item, item]
    }

    if (!Array.isArray(item)) {
      return [item.value, item.label]
    }

    return item
  }))()

  return (
    <div
      className={classnames([
        'input',
        className,
      ])}
    >
      <select
        className="input__input"
        {...rest}
      >
        {options.map(([value, label]) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))}
      </select>

      <Icon
        name="chevron-down"
        className="input__right-icon"
      />
    </div>
  )
}

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ])),
}

Select.defaultProps = {
}

export default Select

