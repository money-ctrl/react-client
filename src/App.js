import './App.css'
import Background from './layout/Background'
import DashboardPage from './page/DashboardPage'
import AccountPage from './page/AccountPage'
import CategoriesPage from './page/CategoriesPage'
import SchedulesPage from './page/SchedulesPage'
import StatsPage from './page/StatsPage'
import React, { useEffect } from 'react'
import ToolbarLayout from './layout/ToolbarLayout'
import LoginPage from './page/LoginPage'
import { useSelector, useDispatch } from 'react-redux'
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
import { database, migrateUserData } from './services/backend'
import { moneyAssign, categoriesAssign } from './actions'

function App() {
  const isLogged = useSelector(state => state.user.isLogged)

  const [isOfflineModeEnabled] = useLocalStorage('offlineMode', false)
  useEffect(() => {
    if (isOfflineModeEnabled) {
      enablePersistence()
    }
  }, [isOfflineModeEnabled])

  const dispatch = useDispatch()
  useEffect(() => {
    if (isLogged !== true) return

    migrateUserData(database)

    const unsubscribe = database()
      .onSnapshot((doc) => {
        dispatch(moneyAssign(doc.data()))
      })

    const unsubscribeCategories = database().collection('expenseCategories')
      .where('visible', '==', true)
      .onSnapshot((snapshot) => {
        dispatch(categoriesAssign(snapshot.docs
          .map(doc => ({id: doc.id, ...doc.data()}))
        ))
      })

    return () => {
      unsubscribe()
      unsubscribeCategories()
    }
  }, [dispatch, isLogged])

  return (
    <Router>
      <div className="app">
        <Background />

        {isLogged === true ? <>
          <ToolbarLayout items={[
            { alt: 'dashboard', src: SVGDashboard, path: '/'        },
            { alt: 'stats',     src: SVGFeather,   path: '/stats' },
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

              <Route path="/stats">
                <StatsPage />
              </Route>

              <Route path="/schedules">
                <SchedulesPage />
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
