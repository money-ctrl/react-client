import './DashboardPage.css'
import React, { useEffect } from 'react'
import Title from '../../ui/Title'
import MoneyDisplay from '../../components/MoneyDisplay'
import CategoriesCarousel from '../../components/CategoriesCarousel'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { moneyAssign } from '../../actions'
import { database } from '../../services/backend'

function DashboardPage({ className }) {
  const dispatch = useDispatch()

  const totalMoney = useSelector(state => state.money.total)

  useEffect(() => {
    const unsubscribe = database()
      .onSnapshot((doc) => {
        dispatch(moneyAssign(doc.data()))
      })

    return unsubscribe
  }, [dispatch])

  return (
    <div className={classNames('dashboard-page', className)}>
      <Title title="Dashboard" />
      <MoneyDisplay
        label="Total Balance"
        monochromatic={true}
        size={1.5}
        value={totalMoney}
        formatOptions={{ maximumFractionDigits: 0 }}
      />
      <CategoriesCarousel
        className="dashboard-page__categories"
      />
    </div>
  )
}

DashboardPage.propTypes = {
  className: PropTypes.any,
}

export default DashboardPage
