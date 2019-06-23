import './Toolbar.css'
import Card from '../ui/Card'
import React from 'react'

class Toolbar extends React.Component {
  render() {
    return (
      <Card className="toolbar">
        <img
          src={require('../assets/001-pie-chart.svg')}
          alt=""
          height="30px"
          width="30px"
        />

        <Card>
          +
        </Card>
      </Card>
    )
  }
}

export default Toolbar
