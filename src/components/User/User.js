import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UserInfo, Bar } from '..'

class User extends Component {
  constructor (props) {
    super (props)
    this.state = {

    }
  }
  render () {
    return (
      <div>
        <UserInfo />
        <Bar />
      </div>
    )
  }
}
const styles = {
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
User.propTypes = {

}
User.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(User)
