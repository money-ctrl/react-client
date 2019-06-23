import './DashboardPage.css'
import React from 'react'
import Title from '../ui/Title'
import MoneyDisplay from '../components/MoneyDisplay'

class DashboardPage extends React.Component {
  render() {
    return (
      <div className="dashboard-page">
        <Title title="Dashboard" />
        <MoneyDisplay
          label="Total Balance"
          monocromatic={true}
          size={1.5}
          value={2099}
        />
      </div>
    )
  }
}

export default DashboardPage
