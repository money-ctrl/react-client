import './HistoryPage.css'
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

function LoginPage() {
  const categories = useSelector(state => state.categories.expenseCategories)
  const limitSum = categories.reduce((acc, cur) => acc + cur.limit, 0)

  return (
    <div>
      history, yeah
      the total money you spent was:<br />
      {limitSum}
    </div>
  )
}

LoginPage.propTypes = {
  className: PropTypes.any,
}

export default LoginPage
