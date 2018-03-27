import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Bar, Login, Join, User, Edit, Brake } from '..'
import './SideBoard.css'

const SideBoard = ({ mode, brake }) => (
  <div className='side-board'>
    <img src='img/abroad.png' style={styles.logoImg} />
    <Bar />
    {mode === 'login' ? <Login /> : mode === 'join' ? <Join /> : mode === 'user' ? <User /> : mode === 'edit' ? <Edit /> : undefined}
    <Brake brake={brake} />
  </div>
)
SideBoard.propTypes = {
  mode: PropTypes.string.isRequired,
  brake: PropTypes.bool.isRequired
}
SideBoard.defaultProps = {

}
const styles = {
  logoImg: {
    marginBottom: 20
  }
}
const mapStateToProps = state => ({
  mode: state.mode.sideBoard,
  brake: state.app.brake === 'sideBoard'
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(SideBoard)
