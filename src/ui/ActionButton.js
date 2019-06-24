import './ActionButton.css'
import React from 'react'
import Card from './Card'

class ActionButton extends React.Component {
  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this)

    this.state = {menuOpened:false}
  }

  openMenu() {
    this.setState(({menuOpened}) => ({
      menuOpened: !menuOpened,
    }))
  }

  render() {
    return (
      <div className={`${this.props.className}`}>
        <Card
          tag="button"
          className="action-button"
          onClick={this.openMenu}
        >
          <img
            className={`action-button__icon ${this.state.menuOpened ? 'action-button__icon--is-open' : ''}`}
            src={require('../assets/plus.svg')}
            alt="transaction"
            height="30px"
            width="30px"
          />
        </Card>
        <div className="action-button__menu">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default ActionButton
