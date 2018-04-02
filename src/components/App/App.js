import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'
import { renewExc } from '../../action'
import { excRenewCycle, excRenewURL } from '../../config'
import { sortExc } from '../../util'
import { SideBoard, MainBoard, ExtraBoard } from '..'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.renewExchange = this.renewExchange.bind(this)
  }
  componentDidMount () {
    this.renewExchange()
    this.timer = setInterval(this.renewExchange, excRenewCycle)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  renewExchange () {
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
    const extra = this.props.login ? <ExtraBoard /> : undefined
    return (
      <div className='app'>
        <SideBoard />
        <MainBoard />
        {extra}
      </div>
    )
  }
}
App.propTypes = {
  login: PropTypes.bool.isRequired,
  onRenew: PropTypes.func.isRequired
}
App.defaultProps = {

}
const mapStateToProps = state => ({
  login: state.user.login
})
const mapDispatchToProps = dispatch => ({
  onRenew: payload => dispatch(renewExc(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
