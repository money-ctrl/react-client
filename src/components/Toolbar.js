import './Toolbar.css'
import ActionButton from '../ui/ActionButton'
import Card from '../ui/Card'
import React from 'react'

class Toolbar extends React.Component {
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
        src={item.src}
        alt={item.alt}
        height="30px"
        width="30px"
        className={activeIndex !== index ? 'toolbar__item--inactive' : ''}
      />
    )

    return (
      <Card className="toolbar">
        {menu}

        <ActionButton
          className="toolbar__action-button"
        />
      </Card>
    )
  }
}

export default Toolbar
