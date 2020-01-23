import './DashboardPage.css'
import React from 'react'
import Title from '../../ui/Title'
import MoneyDisplay from '../../components/MoneyDisplay'
import CategoriesCarousel from '../../components/CategoriesCarousel'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function DashboardPage({ className }) {
  const totalMoneyAvailable = useSelector(state => state.totalMoneyAvailable)

  return (
    <div className={classNames('dashboard-page', className)}>
      <Title title="Dashboard" />
      <MoneyDisplay
        label="Total Balance"
        monochromatic={true}
        size={1.5}
        value={totalMoneyAvailable}
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
