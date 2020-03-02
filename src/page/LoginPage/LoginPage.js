import './LoginPage.css'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Title from '../../ui/Title'
import Loading from '../../ui/Loading'
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
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(userLogin(user))
    }, (error) => {
      console.error(error) // eslint-disable-line no-console
    })

    firebaseUI.start('#firebaseui-auth-container', uiConfig)
  }, [dispatch])

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
