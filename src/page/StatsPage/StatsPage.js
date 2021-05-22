import './StatsPage.css'
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import MoneyDisplay from '../../components/MoneyDisplay'
import Title from '../../ui/Title'
import Divider from '../../ui/Divider'

const StatMoneyDisplay = (rest) => {
  return (
    <MoneyDisplay
      size="s"
      orientation="horizontal"
      formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
      monochromatic={true}
      {...rest}
    />
  )
}

function StatsPage() {
  const categories = useSelector(state => state.categories.list)
  const amountSum = categories.reduce((acc, cur) => acc + cur.amount, 0)
  const allocatedSum = categories.reduce((acc, cur) => acc + cur.allocated, 0)
  const debtSum = categories.reduce((acc, cur) => acc + cur.debt, 0)

  const scheduleList = useSelector(state => state.schedules.list)
  const scheduledSum = scheduleList.reduce((acc, cur) => acc + cur.transactionPayload.amount, 0)

  const totalMoney = useSelector(state => state.money.amount)

  return (
    <div className="history-page">
      <Title>
        Stats
      </Title>

      <StatMoneyDisplay
        label="Balance aside from cycle's budget"
        value={totalMoney}
      />

      <StatMoneyDisplay
        label="Total debt in categories"
        value={debtSum}
      />

      <StatMoneyDisplay
        label="Balance accounting debt"
        value={totalMoney + debtSum}
      />

      <Divider />

      <StatMoneyDisplay
        label="Cycle's Total Budget"
        value={allocatedSum}
      />

      <StatMoneyDisplay
        label="Total amount scheduled"
        value={scheduledSum}
      />

      <StatMoneyDisplay
        label="Cycle's Total accounting schedules"
        value={allocatedSum - scheduledSum}
      />

      <StatMoneyDisplay
        label="Cycle's Current Balance"
        value={amountSum}
      />
    </div>
  )
}

StatsPage.propTypes = {
  className: PropTypes.any,
}

export default StatsPage
