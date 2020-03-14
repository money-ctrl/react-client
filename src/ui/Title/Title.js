import './Title.css'
import React from 'react'
import PropTypes from 'prop-types'

function Title({ tag = 'h1', title }) {
  const Heading = tag

  return (
    <Heading className="title">
      {title}
    </Heading>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  tag: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  ]),
}

export default Title
