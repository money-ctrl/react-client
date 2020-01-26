import './LoginPage.css'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Title from '../../ui/Title'
import Loading from '../../layout/Loading'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  firebase,
  ui as firebaseUI,
  uiConfig,
} from '../../services/firebase'
import { userLogin } from '../../actions'

function LoginPage({ className }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (firebaseUI.isPendingRedirect()) {
      firebaseUI.start('#firebaseui-auth-container', uiConfig)
    }

    firebase.auth().onAuthStateChanged((user) => {
      dispatch(userLogin({ info:user }))
    }, (error) => {
      console.error(error) // eslint-disable-line no-console
    })
  })

  const isLogged = useSelector(state => state.user.isLogged)

  return (
    <div className={classNames('login-page', className)}>
      { isLogged === null ? <>
        <Loading />
      </> : <>
        <Title title="Login" />

        <div id="firebaseui-auth-container" />
      </>}
    </div>
  )
}

LoginPage.propTypes = {
  className: PropTypes.any,
}

export default LoginPage
