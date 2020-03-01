import './ActionButton.css'
import React from 'react'
import Card from '../Card'
import classNames from 'classnames'
import SVGPlus from '../../assets/plus.svg'

class ActionButton extends React.Component {
  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this)
    this.addAnimationDelay = this.addAnimationDelay.bind(this)

    this.state = {isMenuOpen:false}
  }

  openMenu() {
    this.setState(({isMenuOpen}) => {
      this.props.onMenuOpen(!isMenuOpen)

      return {isMenuOpen: !isMenuOpen}
    })
  }

  addAnimationDelay(children) {
    return React.Children.map(children, (child, index) => React.cloneElement(child, {
      style: {animationDelay: `${index * 0.1}s`},
    }))
  }

  render() {
    const {
      isMenuOpen,
    } = this.state

    return (
      <div className={classNames('action-button', this.props.className)}>
        <div
          className={classNames(isMenuOpen && 'action-button__overlay')}
          onClick={this.openMenu}
        />
        <div
          aria-hidden={!isMenuOpen}
          className={`action-button__menu ${isMenuOpen ? 'action-button__menu--is-open' : ''}`}
        >
          {this.addAnimationDelay(this.props.children)}
        </div>
        <Card
          tag="button"
          className="action-button__button"
          onClick={this.openMenu}
        >
          <img
            className={`action-button__icon ${isMenuOpen ? 'action-button__icon--is-open' : ''}`}
            src={SVGPlus}
            alt="transaction"
            height="30px"
            width="30px"
          />
        </Card>
      </div>
    )
  }
}

export default ActionButton
