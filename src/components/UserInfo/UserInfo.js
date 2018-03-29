import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeMode, logout } from '../../action'

const UserInfo = ({ id, name, setModeEdit, setModeLogin, onLogout }) => {
  function handleEditClick () {
    setModeEdit()
  }
  function handleLogoutClick () {
    alert('로그아웃 되었어요')
    setModeLogin()
    onLogout()
  }
  return (
    <div className='user-info__container'>
      <img src='img/bronze.png' className='user-info__grade-img' />
      <div className='user-info__img-wrapper' >
        <img src='img/edit.png' onClick={handleEditClick} className='user-info__edit-img' />
        <img src='img/logout.png' onClick={handleLogoutClick} className='user-info__logout-img' />
      </div>
      <p className='user-info__name'>{name}</p>
      <p className='user-info__id'>{id}</p>
    </div>
  )
}
const mapStateToProps = state => ({
  id: state.user.id,
  name: state.user.name
})
const mapDispatchToProps = dispatch => ({
  setModeEdit: () => dispatch(changeMode({ board: 'sideBoard', mode: 'edit' })),
  setModeLogin: () => dispatch(changeMode({ board: 'sideBoard', mode: 'login' })),
  onLogout: () => dispatch(logout())
})
UserInfo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setModeEdit: PropTypes.func.isRequired,
  setModeLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
}
UserInfo.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
