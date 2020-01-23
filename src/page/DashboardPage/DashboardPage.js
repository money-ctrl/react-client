import './DashboardPage.css'
import React from 'react'
import Title from '../../ui/Title'
import MoneyDisplay from '../../components/MoneyDisplay'
import CategoriesCarousel from '../../components/CategoriesCarousel'
import classNames from 'classnames'
import PropTypes from 'prop-types'

function DashboardPage({ className }) {
  return (
    <div className={classNames('dashboard-page', className)}>
      <Title title="Dashboard" />
      <MoneyDisplay
        label="Total Balance"
        monochromatic={true}
        size={1.5}
        value={2099}
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
