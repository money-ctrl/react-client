import './App.css'
import Background from './layout/Background'
import DashboardPage from './page/DashboardPage'
import React from 'react'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Background />
        <DashboardPage />
      </div>
    )
  }
}

export default App
