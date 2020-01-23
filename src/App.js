import './App.css'
import Background from './layout/Background'
import DashboardPage from './page/DashboardPage'
import React, { useState } from 'react'
import Toolbar from './components/Toolbar'
import classNames from 'classnames'

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const pageClass = classNames(
    'page',
    isMenuOpen && 'page--menu-is-open'
  )

  return (
    <div className="App">
      <Background />
      <DashboardPage classNames={pageClass} />
      <Toolbar onMenuOpen={setMenuOpen} />
    </div>
  )
}

export default App
