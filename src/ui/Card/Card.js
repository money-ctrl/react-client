import './Card.css'
import React from 'react'

class Card extends React.Component {
  render() {
    const {
      children,
      className,
      tag,
      ...attrs
    } = this.props

    const Tag = tag || 'div'

    return (
      <Tag
        className={`card ${className}`}
        {...attrs}
      >
        {children}
      </Tag>
    )
  }
}

export default Card
