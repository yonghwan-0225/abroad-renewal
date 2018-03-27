import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeMode, logout } from '../../action'

const UserInfo = ({ id, name, setModeEdit, setModeLogin, onLogout, style }) => {
  function handleEditClick () {
    setModeEdit()
  }
  function handleLogoutClick () {
    alert('로그아웃 되었어요')
    onLogout()
    setModeLogin()
  }
  return (
    <div style={style.container}>
      <img src='img/bronze.png' style={style.gradeImg} />
      <div style={style.imgWrapper}>
        <img src='img/edit.png' onClick={handleEditClick} style={style.editImg} />
        <img src='img/logout.png' onClick={handleLogoutClick} style={style.logoutImg} />
      </div>
      <p style={style.name}>{name}</p>
      <p style={style.id}>{id}</p>
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
  onLogout: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
}
UserInfo.defaultProps = {
  style: {
    container: {
      width: 260,
      height: 50,
      margin: '0 auto 40'
    },
    gradeImg: {
      float: 'left',
      height: '100%'
    },
    name: {
      height: '50%',
      marginLeft: 70,
      textAlign: 'left',
      fontWeight: 600,
      cursor: 'default'
    },
    id: {
      height: '50%',
      marginLeft: 70,
      textAlign: 'left',
      cursor: 'default'
    },
    imgWrapper: {
      float: 'right',
      width: 65,
      height: 37,
      paddingTop: 13
    },
    editImg: {
      float: 'left',
      height: 25,
      marginRight: 15,
      cursor: 'pointer'
    },
    logoutImg: {
      float: 'left',
      height: 25,
      cursor: 'pointer'
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
