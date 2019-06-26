import './TransactionMenuItem.css'
import Card from '../ui/Card'
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

class TransactionMenuItem extends React.Component {
  constructor(props) {
    super(props)
    this.expand = this.expand.bind(this)

    this.self = React.createRef()

    this.state = {
      isExpanded:false,
      cardStyle:{},
    }
  }

  expand() {
    this.setState(({isExpanded, cardStyle}) => {
      let newCardStyle = cardStyle

      if (!isExpanded) {
        const button = ReactDOM.findDOMNode(this.self.current)
        const bounding = button.getBoundingClientRect()

        const style = {
          closed: {
            transitionDelay: `0s`,
            transform: `translate(0px, 0px)`,
            width: `${bounding.width}px`,
            height: `${bounding.height}px`,
          },
          expanded: {
            transitionDelay: `0s`,
            transform: `translate(${window.innerWidth - bounding.width - bounding.x - 4}px, ${window.innerHeight - bounding.height - bounding.y - 4}px)`,
            width: `calc(100vw - 8px)`,
            height: `50vh`,
          },
        }
        newCardStyle = {
          entering: style.closed,
          entered: style.expanded,
          exiting: style.expanded,
          exited: style.closed,
        }
      }

      console.log(newCardStyle)

      return {
        isExpanded: !isExpanded,
        cardStyle: newCardStyle,
      }
    });
  }

  render() {
    const {
      style,
      ...attrs
    } = this.props

    const cardClasses = classNames(
      'transaction-menu-item',
      this.state.isExpanded && 'transaction-menu-item--is-expanded',
    )

    return (
      <Transition in={this.state.isExpanded} timeout={0}>
        {state =>
          <Card
            ref={this.self}
            tag={this.state.isExpanded ? 'div' : 'button'}
            className={cardClasses}
            onClick={this.expand}
            style={{...style,...this.state.cardStyle[state]}}
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
        }
      </Transition>
    )
  }
}

export default TransactionMenuItem
