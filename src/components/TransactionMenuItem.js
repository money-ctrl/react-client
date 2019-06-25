import './TransactionMenuItem.css'
import Card from '../ui/Card'
import React from 'react'
import classNames from 'classnames'

class TransactionMenuItem extends React.Component {
  constructor(props) {
    super(props)
    this.expand = this.expand.bind(this)

    this.state = {isExpanded:false}
  }

  expand() {
    this.setState(({isExpanded}) => ({
      isExpanded: !isExpanded,
    }));
  }

  render() {
    const {
      ...attrs
    } = this.props

    const cardClasses = classNames(
      'transaction-menu-item',
      this.state.isExpanded && 'transaction-menu-item--is-expanded'
    )

    return (
      <Card
        tag={this.state.isExpanded ? 'div' : 'button'}
        className={cardClasses}
        onClick={this.expand}
        {...attrs}
      >
        <div className="transaction-menu-item__title">
          menu item
        </div>
        <div
          className="transaction-menu-item__content"
          hidden={!this.state.isExpanded}
        >
          this is the card content!!<br />
          this is the card content!!<br />
          this is the card content!!<br />
          this is the card content!!<br />
          this is the card content!!<br />
          this is the card content!!<br />
        </div>
      </Card>
    )
  }
}

export default TransactionMenuItem
