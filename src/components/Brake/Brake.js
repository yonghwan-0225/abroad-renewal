import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Brake.css'

class Brake extends Component {
  constructor (props) {
    super(props)
    this.state = {
      display: 'none',
      opacity0: 0,
      opacity1: 0,
      opacity2: 0
    }
    this.idx = 0
  }
  componentWillReceiveProps ({ brake }) {
    if (brake) {
      this.setState({ display: 'block' })
      this.loadingWave()
      this.timer = setInterval(() => {
        this.loadingWave()
      }, 800)
    } else {
      setTimeout(() => {
        clearInterval(this.timer)
        this.setState({ display: 'none' })
      }, 800)
    }
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render () {
    return (
      <div className='brake' style={{ display: this.state.display}}>
        {[0, 1, 2].map(e => <img key={e} style={{opacity: this.state['opacity' + e]}} className={`dot${e}`} src='img/dot.png' />)}
      </div>
    )
  }
  loadingWave () {
    this.setState({opacity0: 1})
    setTimeout(() => this.setState({opacity1: 1}), 100)
    setTimeout(() => this.setState({opacity2: 1}), 200)
    setTimeout(() => this.setState({opacity0: 0}), 400)
    setTimeout(() => this.setState({opacity1: 0}), 500)
    setTimeout(() => this.setState({opacity2: 0}), 600)
  }
}
const mapStateToProps = state => ({
  
})
Brake.propTypes = {
  brake: PropTypes.bool.isRequired
}
export default connect(mapStateToProps)(Brake)
