import './App.css'
import Background from './layout/Background'
import DashboardPage from './page/DashboardPage'
import AccountPage from './page/AccountPage'
import React, { useEffect } from 'react'
import ToolbarLayout from './layout/ToolbarLayout'
import LoginPage from './page/LoginPage'
import { useSelector } from 'react-redux'
import SVGDashboard from './assets/dashboard.svg'
import SVGFeather from './assets/feather.svg'
import SVGHome from './assets/home.svg'
import { useLocalStorage } from './hooks/useLocalStorage'
import { enablePersistence } from './services/backend'

function App() {
  const isLogged = useSelector(state => state.user.isLogged)

  const [isOfflineModeEnabled] = useLocalStorage('offlineMode', false)
  useEffect(() => {
    if (isOfflineModeEnabled) {
      enablePersistence()
    }
  }, [isOfflineModeEnabled])

  return (
    <div className="app">
      <Background />

      {isLogged === true ? <>
        <ToolbarLayout items={[
          {
            alt: 'dashboard',
            src: SVGDashboard,
            page: DashboardPage,
          },
          {
            alt: 'history',
            src: SVGFeather,
            page: DashboardPage,
          },
          {
            alt: 'account',
            src: SVGHome,
            page: AccountPage,
          },
        ]} />
      </> : <>
        <LoginPage />
      </>}
    </div>
  )
}

export default App
