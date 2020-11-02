import './AccountPage.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../ui/Title'
import Button from '../../ui/Button'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { userLogout } from '../../actions'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useHistory } from 'react-router-dom'

function AccountPage({ className }) {
  const dispatch = useDispatch()
  const user = useSelector(({user}) => user.info)

  const [isOfflineModeEnabled, setOfflineMode] = useLocalStorage('offlineMode', false)

  const history = useHistory()
  const logout = async () => {
    await dispatch(userLogout())
    history.push('/')
  }

  return (
    <div className={classnames('account-page', className)}>
      <div className="account-page__menu">
        <Title title="Account" />

        <div className="account-page__user">
          <img
            src={user.photoURL}
            alt={`${user.displayName}'s profile`}
            className="account-page__user-photo"
          />

          <strong>
            {user.displayName}
          </strong>
        </div>

        <Button
          behavior="block"
          variant={isOfflineModeEnabled ? 'primary' : 'default'}
          onClick={() => setOfflineMode(!isOfflineModeEnabled)}
        >
          {isOfflineModeEnabled ? 'Disable' : 'Enable'} off-line mode
        </Button>

        <Button
          behavior="block"
          onClick={() => history.push('/schedules')}
        >
          Scheduled transactions
        </Button>

        <Button
          behavior="block"
          onClick={logout}
        >
          Sign Out
        </Button>
      </div>

      <footer className="account-page__footer mt-l">
        Icons made by
        <a href="https://www.flaticon.com/authors/pixel-perfect" data-what="toolbar icons" title="Pixel perfect">
          Pixel perfect
        </a> and
        <a href="https://www.flaticon.com/authors/eucalyp" data-what="logo" title="Eucalyp">
          Eucalyp
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
        is licensed by
        <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">
          CC 3.0 BY
        </a>.
        <br />
        <br />
        Version: {process.env.REACT_APP_VERSION}
      </footer>
    </div>
  )
}

AccountPage.propTypes = {
  className: PropTypes.any,
}

export default AccountPage
