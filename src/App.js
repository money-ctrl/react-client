import './App.css'
import Background from './layout/Background'
import DashboardPage from './page/DashboardPage'
import React, { useState } from 'react'
import Toolbar from './components/Toolbar'
import Loading from './layout/Loading'
import LoginPage from './page/LoginPage'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const isLogged = useSelector(state => state.user.isLogged)

  const pageClass = classNames(
    'page',
    isMenuOpen && 'page--menu-is-open'
  )

  let content

  if (isLogged === true) {
    content = <>
      <DashboardPage className={pageClass} />
      <Toolbar onMenuOpen={setMenuOpen} />
    </>
  } else if (isLogged === false) {
    content = <LoginPage />
  } else {
    content = <Loading />
  }

  return (
    <div className="app">
      <Background />
      {content}
    </div>
  )
}

export default App
