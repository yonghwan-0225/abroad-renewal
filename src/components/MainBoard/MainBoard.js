import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Exchange, Brake } from '..'
import './MainBoard.css'

const MainBoard = ({ mode, brake, alertMessage }) => (
  <div className='main-board__container'>
    {mode === 'exchange' ? <Exchange /> : undefined}
    <Brake brake={brake} alertMessage={alertMessage} />
  </div>
)
const mapStateToProps = state => ({
  mode: state.board.mainBoard.mode,
  brake: state.board.mainBoard.brake,
  alertMessage: state.board.mainBoard.alertMessage
})
MainBoard.propTypes = {
  mode: PropTypes.string.isRequired,
  brake: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired
}
export default connect(mapStateToProps)(MainBoard)
