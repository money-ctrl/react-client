import './AccountPage.css'
import React from 'react'
import Button from '../../ui/Button'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function AccountPage({ className }) {
  return (
    <div className={classnames('account-page', className)}>
      <Button>
        Sign Out
      </Button>

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
