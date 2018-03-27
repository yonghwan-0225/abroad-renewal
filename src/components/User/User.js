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
        <Bar style={styles.bar} />
      </div>
    )
  }
}
const styles = {
  bar: {
    width: 300,
    margin: '0 auto 40',
    borderWidth: 0.5,
  }
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
