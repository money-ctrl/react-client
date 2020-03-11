import './HistoryPage.css'
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import MoneyDisplay from '../../components/MoneyDisplay'

function HistoryPage() {
  const categories = useSelector(state => state.categories.list)

  const amountSum = categories.reduce((acc, cur) => acc + cur.amount, 0)
  const limitSum = categories.reduce((acc, cur) => acc + cur.limit, 0)

  const totalMoney = useSelector(state => state.money.total)


  return (
    <div className="history-page">
      <MoneyDisplay
        label="Total available"
        monochromatic={true}
        value={totalMoney}
      />
      <MoneyDisplay
        label="Total already spent"
        monochromatic={true}
        value={amountSum}
      />
      <MoneyDisplay
        label="Total allocated in category's limits"
        monochromatic={true}
        value={limitSum}
      />
    </div>
  )
}

HistoryPage.propTypes = {
  className: PropTypes.any,
}

export default HistoryPage
