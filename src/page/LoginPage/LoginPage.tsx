import './LoginPage.css'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin } from '@/actions'
import Title from '@/ui/Title'
import Loading from '@/ui/Loading'
import {
  firebase,
  ui as firebaseUI,
  uiConfig,
} from '@/services/firebase'

function LoginPage({ className }) {
  const dispatch = useDispatch()

  const isLogged = useSelector(state => state.user.isLogged)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(userLogin(user))
    }, (error) => {
      console.error(error) // eslint-disable-line no-console
    })

    if (isLogged !== null){
      firebaseUI.start('#firebaseui-auth-container', uiConfig)
    }
  }, [dispatch, isLogged])

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
