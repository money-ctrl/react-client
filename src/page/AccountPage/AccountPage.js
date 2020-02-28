import './AccountPage.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../ui/Title'
import Button from '../../ui/Button'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { userLogout } from '../../actions'

function AccountPage({ className }) {
  const dispatch = useDispatch()
  const user = useSelector(({user}) => user.info)

  return (
    <div className={classnames('account-page', className)}>
      <div>
        <Title title="Account" />

        <div className="account-page__user">
          <img
            src={user.photoURL}
            alt={`${user.displayName}'s profile image`}
            className="account-page__user-photo"
          />

          <strong>
            {user.displayName}
          </strong>
        </div>

        <Button
          behavior="block"
          onClick={() => dispatch(userLogout())}
        >
          Sign Out
        </Button>
      </div>

      <footer className="account-page__footer">
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
        </a>
      </footer>
    </div>
  )
}

AccountPage.propTypes = {
  className: PropTypes.any,
}

export default AccountPage
