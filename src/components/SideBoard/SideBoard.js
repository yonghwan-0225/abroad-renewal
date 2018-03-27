import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Bar, Login, Join, User, Edit, Brake } from '..'
import './SideBoard.css'

const SideBoard = ({ mode, brake, alertMessage, style }) => (
  <div className='side-board'>
    <img src='img/abroad.png' style={style.logoImg} />
    <Bar />
    {mode === 'login' ? <Login /> : mode === 'join' ? <Join /> : mode === 'user' ? <User /> : mode === 'edit' ? <Edit /> : undefined}
    <Brake brake={brake} alertMessage={alertMessage} />
  </div>
)
const mapStateToProps = state => ({
  mode: state.board.sideBoard.mode,
  brake: state.board.sideBoard.brake,
  alertMessage: state.board.sideBoard.alertMessage
})
const mapDispatchToProps = dispatch => ({

})
SideBoard.propTypes = {
  mode: PropTypes.string.isRequired,
  brake: PropTypes.bool.isRequired,
  style: PropTypes.object
}
SideBoard.defaultProps = {
  style: {
    logoImg: {
      marginBottom: 20
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBoard)
