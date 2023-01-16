import './DashboardPage.css'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Title from '@/ui/Title'
import MoneyDisplay from '@/components/MoneyDisplay'
import CategoriesCarousel from '@/components/CategoriesCarousel'

function DashboardPage({ className }) {
  const totalMoney = useSelector(state => state.categories.list.map(item => item.amount).reduce((acc, cur) => acc + cur, 0))

  return (
    <div className={classNames('dashboard-page', className)}>
      <Title title="Current Cycle" />
      <MoneyDisplay
        label="Cycle's Balance"
        monochromatic={true}
        size='xxl'
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
