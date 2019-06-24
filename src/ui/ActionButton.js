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
    this.setState(({menuOpened}) => {
      this.props.onMenuOpen(!menuOpened)

      return {menuOpened: !menuOpened}
    })
  }

  addAnimationDelay() {

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
        <div
          ariaHidden={!this.state.menuOpened}
          className={`action-button__menu ${this.state.menuOpened ? 'action-button__menu--is-open' : ''}`}
        >
          {this.props.children.map((i) => i)}
        </div>
      </div>
    )
  }
}

export default ActionButton
