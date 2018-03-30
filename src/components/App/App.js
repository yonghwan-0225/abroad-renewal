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
    request.get(excRenewURL).query({ dummy: String(parseInt(Math.random() * 100000000)) }).accept('application/json').end((err, res) => {
      if (err) return
      const { status, message, entry, excData, measure, serviceRate } = res.body
      if (status) {
        this.props.onRenew({
          entry, excData: sortExc(excData), measure, serviceRate
        })
      } else {
        console.log(message)
      }
    })
  }
  render () {
    return (
      <div className='app'>
        <SideBoard />
        <MainBoard />
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
