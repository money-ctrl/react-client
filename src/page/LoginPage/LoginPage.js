import './LoginPage.css'
import React from 'react'
import Title from '../../ui/Title'
import classNames from 'classnames'
import PropTypes from 'prop-types'

function LoginPage({ className }) {
  return (
    <div className={classNames('login-page', className)}>
      <Title title="Login" />
    </div>
  )
}

LoginPage.propTypes = {
  className: PropTypes.any,
}

export default LoginPage
