import './App.css'
import Background from './layout/Background'
import DashboardPage from './page/DashboardPage'
import React from 'react'
import Toolbar from './components/Toolbar'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Background />
        <DashboardPage />
        <Toolbar />
      </div>
    )
  }
}

export default App
