import './App.css'
import Background from './layout/Background'
import DashboardPage from './page/DashboardPage'
import AccountPage from './page/AccountPage'
import CategoriesPage from './page/CategoriesPage'
import React, { useEffect } from 'react'
import ToolbarLayout from './layout/ToolbarLayout'
import LoginPage from './page/LoginPage'
import { useSelector } from 'react-redux'
import SVGDashboard from './assets/dashboard.svg'
import SVGFeather from './assets/feather.svg'
import SVGHome from './assets/home.svg'
import { useLocalStorage } from './hooks/useLocalStorage'
import { enablePersistence } from './services/backend'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

function App() {
  const isLogged = useSelector(state => state.user.isLogged)

  const [isOfflineModeEnabled] = useLocalStorage('offlineMode', false)
  useEffect(() => {
    if (isOfflineModeEnabled) {
      enablePersistence()
    }
  }, [isOfflineModeEnabled])

  return (
    <Router>
      <div className="app">
        <Background />

        {isLogged === true ? <>
          <ToolbarLayout items={[
            { alt: 'dashboard', src: SVGDashboard, path: '/'        },
            { alt: 'history',   src: SVGFeather,   path: '/history' },
            { alt: 'account',   src: SVGHome,      path: '/account' },
          ]}>
            <Switch>
              <Route exact path="/">
                <DashboardPage />
              </Route>

              <Route path="/account">
                <AccountPage />
              </Route>

              <Route path="/categories">
                <CategoriesPage />
              </Route>
            </Switch>
          </ToolbarLayout>
        </> : <>
          <LoginPage />
        </>}
      </div>
    </Router>
  )
}

export default App
