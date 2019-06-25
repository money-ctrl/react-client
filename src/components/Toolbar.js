import './Toolbar.css'
import ActionButton from '../ui/ActionButton'
import Card from '../ui/Card'
import React from 'react'
import TransactionMenuItem from '../components/TransactionMenuItem'
import classNames from 'classnames'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    this.onMenuOpen = this.onMenuOpen.bind(this)

    this.state = {isMenuOpen:false}
  }

  onMenuOpen(isMenuOpen) {
    this.props.onMenuOpen(isMenuOpen)
    this.setState({
      isMenuOpen,
    })
  }

  render() {
    const activeIndex = 0;

    const menu = [{
      alt: 'dashboard',
      src: require('../assets/dashboard.svg'),
    },{
      alt: 'history',
      src: require('../assets/feather.svg'),
    },{
      alt: 'account',
      src: require('../assets/home.svg'),
    }].map((item, index) =>
      <img
        key={item.alt}
        src={item.src}
        alt={item.alt}
        height="30px"
        width="30px"
        className={activeIndex !== index ? 'toolbar__item--inactive' : ''}
      />
    )

    const cardClasses = classNames(
      'toolbar',
      this.state.isMenuOpen && 'toolbar--menu-is-open',
    )

    return (
      <Card className={cardClasses}>
        {menu}

        <ActionButton
          className="toolbar__action-button"
          onMenuOpen={this.onMenuOpen}
        >
          <TransactionMenuItem />
          <TransactionMenuItem />
          <TransactionMenuItem />
        </ActionButton>
      </Card>
    )
  }
}

export default Toolbar
