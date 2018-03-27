import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Exchange, Brake } from '..'
import './MainBoard.css'

const MainBoard = ({ mode, brake }) => (
  <div className='main-board'>
    {mode === 'exchange' ? <Exchange /> : undefined}
    <Brake brake={brake} />
  </div>
)
MainBoard.propTypes = {
  mode: PropTypes.string.isRequired,
  brake: PropTypes.bool.isRequired
}
MainBoard.defaultProps = {

}
const styles = {

}
const mapStateToProps = state => ({
  mode: state.mode.mainBoard,
  brake: state.app.brake === 'mainBoard'
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(MainBoard)
