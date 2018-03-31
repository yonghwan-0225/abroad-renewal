import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Insurance, Brake } from '..'
import './ExtraBoard.css'

const ExtraBoard = ({ mode, brake, alertMessage }) => (
  <div className='extra-board__container'>
    {mode === 'insurance' ? <Insurance /> : undefined}
    <Brake brake={brake} alertMessage={alertMessage} />
  </div>
)
const mapStateToProps = state => ({
  mode: state.board.extraBoard.mode,
  brake: state.board.extraBoard.brake,
  alertMessage: state.board.extraBoard.alertMessage
})
const mapDispatchToProps = dispatch => ({

})
ExtraBoard.propTypes = {
  mode: PropTypes.string.isRequired,
  brake: PropTypes.bool.isRequired
}
ExtraBoard.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ExtraBoard)
