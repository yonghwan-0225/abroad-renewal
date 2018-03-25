import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Login } from '..'
import './SideBoard.css'

const SideBoard = ({ mode }) => (
  <div className='sideboard'>
    {mode === 'login' ? <Login /> : undefined}
  </div>
)
SideBoard.propTypes = {
  mode: PropTypes.string.isRequired
}
SideBoard.defaultProps = {

}
const styles = {

}
const mapStateToProps = state => ({
  mode: state.mode.sideboard
})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(SideBoard)
