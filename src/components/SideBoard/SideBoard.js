import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Bar, Login, Join, User, Brake } from '..'
import './SideBoard.css'

const SideBoard = ({ mode, brake }) => (
  <div className='side-board'>
    <img src='img/abroad.png' style={styles.logoImg} />
    <Bar style={styles.bar} />
    {mode === 'login' ? <Login /> : mode === 'join' ? <Join /> : mode === 'user' ? <User /> : undefined}
    <Brake brake={brake} />
  </div>
)
SideBoard.propTypes = {
  mode: PropTypes.string.isRequired
}
SideBoard.defaultProps = {

}
const styles = {
  logoImg: {
    marginBottom: 20
  },
  bar: {
    width: 300,
    margin: '0 auto 40',
    borderWidth: 0.5,
  }
}
const mapStateToProps = state => ({
  mode: state.mode.sideBoard,
  brake: state.app.brake === 'sideBoard'
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(SideBoard)
