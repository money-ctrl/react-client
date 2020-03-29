import './DashboardPage.css'
import React from 'react'
import Title from '../../ui/Title'
import MoneyDisplay from '../../components/MoneyDisplay'
import CategoriesCarousel from '../../components/CategoriesCarousel'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function DashboardPage({ className }) {
  const totalMoney = useSelector(state => state.categories.list.map(item => item.amount).reduce((acc, cur) => acc + cur, 0))

  return (
    <div className={classNames('dashboard-page', className)}>
      <Title title="Current Cycle" />
      <MoneyDisplay
        label="Cycle's Balance"
        monochromatic={true}
        size={1.5}
        value={Math.floor(totalMoney)}
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
