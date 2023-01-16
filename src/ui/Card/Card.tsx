import './Card.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Card({
  reference,
  children,
  className,
  tag,
  ...attrs
}) {
  const Tag = tag || 'div'

  return (
    <Tag
      ref={reference}
      className={classNames('card', className)}
      {...attrs}
    >
      {children}
    </Tag>
  )
}

Card.propTypes = {
  reference: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.any,
  tag: PropTypes.string,
}

export default Card
