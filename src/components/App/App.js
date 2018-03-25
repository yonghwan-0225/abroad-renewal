import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'
import { renewExc } from '../../action'
import { excRenewCycle, excRenewURL } from '../../config'
import { sortExc } from '../../util'
import { SideBoard, MainBoard } from '..'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.renew = this.renew.bind(this)
  }
  componentDidMount () {
    this.renew()
    this.timer = setInterval(this.renew, excRenewCycle)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  renew () {
    request.get(excRenewURL).accept('application/json').end((err, { body }) => {
      if (err) return
      const { entry, excData, measure, serviceRate } = body
      this.props.onRenew({
        entry, excData: sortExc(excData), measure, serviceRate
      })
    })
  }
  render () {
    return (
      <div className='app-wrapper'>
        <div className='app'>
          <SideBoard />
          <MainBoard />
        </div>
      </div>
    )
  }
}
App.propTypes = {
  onRenew: PropTypes.func.isRequired
}
App.defaultProps = {

}
const mapDispatchToProps = dispatch => ({
  onRenew: payload => dispatch(renewExc(payload))
})
export default connect(undefined, mapDispatchToProps)(App)
