import './ActionButton.css'
import React from 'react'
import Card from './Card'
import classNames from 'classnames'

class ActionButton extends React.Component {
  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this)

    this.state = {isMenuOpen:false}
  }

  openMenu() {
    this.setState(({isMenuOpen}) => {
      this.props.onMenuOpen(!isMenuOpen)

      return {isMenuOpen: !isMenuOpen}
    })
  }

  addAnimationDelay() {

  }

  render() {
    const {
      isMenuOpen,
    } = this.state

    return (
      <div className={this.props.className}>
        <div
          className={classNames(isMenuOpen && 'action-button__overlay')}
          onClick={this.openMenu}
        />
        <Card
          tag="button"
          className="action-button"
          onClick={this.openMenu}
        >
          <img
            className={`action-button__icon ${isMenuOpen ? 'action-button__icon--is-open' : ''}`}
            src={require('../assets/plus.svg')}
            alt="transaction"
            height="30px"
            width="30px"
          />
        </Card>
        <div
          ariaHidden={!isMenuOpen}
          className={`action-button__menu ${isMenuOpen ? 'action-button__menu--is-open' : ''}`}
        >
          {this.props.children.map((i) => i)}
        </div>
      </div>
    )
  }
}

export default ActionButton
