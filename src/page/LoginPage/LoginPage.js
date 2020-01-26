import './LoginPage.css'
import React, { useEffect } from 'react'
import Title from '../../ui/Title'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  firebase,
  ui as firebaseUI,
} from '../../services/firebase'

function LoginPage({ className }) {
  useEffect(() => {
    if (!firebaseUI.isPendingRedirect()) return

    firebaseUI.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      tosUrl: 'www.example.com',
      privacyPolicyUrl: 'www.example.com',
    })
  })

  return (
    <div className={classNames('login-page', className)}>
      <Title title="Login" />

      <div id="firebaseui-auth-container" />
    </div>
  )
}

LoginPage.propTypes = {
  className: PropTypes.any,
}

export default LoginPage
