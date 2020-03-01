import './Card.css'
import React from 'react'
import PropTypes from 'prop-types'

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
      className={`card ${className}`}
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
