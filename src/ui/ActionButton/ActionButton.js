import './ActionButton.css'
import React from 'react'
import Card from '../Card'
import classNames from 'classnames'
import SVGPlus from '../../assets/plus.svg'

class ActionButton extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.addAnimationDelay = this.addAnimationDelay.bind(this)
  }

  onClick() {
    this.props.onClick()
  }

  addAnimationDelay(children) {
    return React.Children.map(children, (child, index) => React.cloneElement(child, {
      style: {animationDelay: `${(index + 1) * 0.1}s`},
    }))
  }

  render() {
    return (
      <div className={classNames('action-button', this.props.className)}>
        <div
          className={classNames(this.props.isMenuOpen && 'action-button__overlay')}
          onClick={this.onClick}
        />
        <div
          aria-hidden={!this.props.isMenuOpen}
          className={`action-button__menu ${this.props.isMenuOpen ? 'action-button__menu--is-open' : ''}`}
        >
          {this.addAnimationDelay(this.props.children)}
        </div>
        <Card
          tag="button"
          className="action-button__button"
          onClick={this.onClick}
        >
          <img
            className={`action-button__icon ${this.props.isMenuOpen ? 'action-button__icon--is-open' : ''}`}
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
