import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeMode } from '../../action'
import { Bar, Reception, User, Edit, Introduce, Brake } from '..'
import './SideBoard.css'

const SideBoard = ({ mode, brake, alertMessage, login, setModeDefault }) => (
  <div className='side-board__container'>
    <img src='img/abroad.png' onClick={() => setModeDefault(login ? 'user' : 'reception')} style={style.logoImg} />
    <Bar />
    {mode === 'reception' ? <Reception /> : mode === 'user' ? <User /> : mode === 'edit' ? <Edit /> : mode === 'introduce' ? <Introduce /> : undefined}
    <Brake brake={brake} alertMessage={alertMessage} />
  </div>
)
const mapStateToProps = state => ({
  mode: state.board.sideBoard.mode,
  brake: state.board.sideBoard.brake,
  alertMessage: state.board.sideBoard.alertMessage,
  login: state.user.login
})
const mapDispatchToProps = dispatch => ({
  setModeDefault: sideBoardMode => {
    dispatch(changeMode({ board: 'sideBoard', mode: sideBoardMode }))
    dispatch(changeMode({ board: 'mainBoard', mode: 'exchange' }))
  }
})
SideBoard.propTypes = {
  mode: PropTypes.string.isRequired,
  brake: PropTypes.bool.isRequired,
  login: PropTypes.bool.isRequired,
  setModeDefault: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBoard)
const style = {
    logoImg: {
      marginBottom: 30,
      cursor: 'pointer'
    }
  }
