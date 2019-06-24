import './App.css'
import Background from './layout/Background'
import DashboardPage from './page/DashboardPage'
import React from 'react'
import Toolbar from './components/Toolbar'
import classNames from 'classnames'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isMenuOpen:false}
  }

  render() {
    const pageClass = classNames(
      'page',
      this.state.isMenuOpen && 'page--menu-is-open'
    )

    return (
      <div className="App">
        <Background />
        <DashboardPage
          classNames={pageClass}
        />
        <Toolbar
          onMenuOpen={(e) => this.setState({isMenuOpen:e})}
        />
      </div>
    )
  }
}

export default App
