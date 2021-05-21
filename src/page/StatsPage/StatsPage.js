import './StatsPage.css'
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import MoneyDisplay from '../../components/MoneyDisplay'
import Title from '../../ui/Title'
import Divider from '../../ui/Divider'

function StatsPage() {
  const categories = useSelector(state => state.categories.list)

  const amountSum = categories.reduce((acc, cur) => acc + cur.amount, 0)
  const allocatedSum = categories.reduce((acc, cur) => acc + cur.allocated, 0)
  const debtSum = categories.reduce((acc, cur) => acc + cur.debt, 0)

  const totalMoney = useSelector(state => state.money.amount)


  return (
    <div className="history-page">
      <Title>
        Stats
      </Title>

      <MoneyDisplay
        label="Balance aside from cycle's budget"
        monochromatic={true}
        value={totalMoney}
      />

      <MoneyDisplay
        label="Total debt in categories"
        monochromatic={true}
        value={debtSum}
      />

      <MoneyDisplay
        label="Balance accounting debt"
        monochromatic={true}
        value={totalMoney + debtSum}
      />

      <Divider />

      <MoneyDisplay
        label="Cycle's Total Budget"
        monochromatic={true}
        value={allocatedSum}
      />

      <MoneyDisplay
        label="Cycle's Current Balance"
        monochromatic={true}
        value={amountSum}
      />
    </div>
  )
}

StatsPage.propTypes = {
  className: PropTypes.any,
}

export default StatsPage
