import './Title.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Title({ tag = 'h1', title, children, color = 'light', className, size }) {
  const Heading = tag

  return (
    <Heading
      className={classNames(
        'title',
        color !== 'light' && `title--${color}`,
        Boolean(size) && `title--size-${size}`,
        className,
      )}
    >
      {children || title}
    </Heading>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  tag: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong',
  ]),
  children: PropTypes.any,
  color: PropTypes.oneOf([
    'light',
    'dark',
  ]),
  size: PropTypes.oneOf([
    '100', '200', '300', '400', '500', '600', '700', '800',
  ]),
  className: PropTypes.string,
}

export default Title
