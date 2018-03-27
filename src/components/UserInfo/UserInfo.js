import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeMode } from '../../action'

const UserInfo = ({ id, name, setModeEdit, setModeLogin }) => {
  function handleEditClick () {
    setModeEdit()
  }
  function handleLogoutClick () {
    alert('로그아웃 되었어요')
    setModeLogin()
  }
  return (
    <div style={styles.container}>
      <img src='img/bronze.png' style={styles.gradeImg} />
      <div style={styles.imgWrapper}>
        <img src='img/edit.png' onClick={handleEditClick} style={styles.editImg} />
        <img src='img/logout.png' onClick={handleLogoutClick} style={styles.logoutImg} />
      </div>
      <p style={styles.name}>{name}</p>
      <p style={styles.id}>{id}</p>
    </div>
  )
}
const styles = {
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
const mapStateToProps = state => ({
  id: state.user.id,
  name: state.user.name
})
const mapDispatchToProps = dispatch => ({
  setModeEdit: () => dispatch(changeMode({ board: 'sideBoard', mode: 'edit' })),
  setModeLogin: () => dispatch(changeMode({ board: 'sideBoard', mode: 'login' }))
})
UserInfo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setModeEdit: PropTypes.func.isRequired,
  setModeLogin: PropTypes.func.isRequired
}
UserInfo.defaultProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
