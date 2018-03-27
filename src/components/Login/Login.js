import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'
import { loginURL } from '../../config'
import { setBrake, clearBrake, login, changeMode } from '../../action'
import { Input, AlertableButton, Bar, Phrase } from '..'

class Login extends Component {
  constructor (props) {
    super (props)
    this.state = {
      inputID: '',
      inputPW: '',
      errMessage: ''
    }
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.update = this.update.bind(this)
  }
  handleLoginClick () {
    const { setBrake, clearBrake, onLogin, setModeUser } = this.props
    const errMessage = this.test(this.state)
    if (errMessage) {
      this.update({ errMessage })
    } else {
      const { inputID, inputPW } = this.state
      const params = {
        id: inputID,
        pw: inputPW
      }
      setBrake()
      request.post(loginURL).type('form').send(params).end((err, res) => {
        if (err) {
          clearBrake('서버가 고장났습니다')
          return
        }
        const { status, message, userData, orderData } = res.body
        if (status) {
          onLogin({ userData, orderData })
          setModeUser()
          clearBrake('로그인 되었습니다')
        } else {
          this.update({ errMessage: message })
          clearBrake()
        }
      })
    }
  }
  update ({ target, inputValue, errMessage }) {
    if (errMessage) {
      this.setState({
        errMessage
      })
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({
          errMessage: ''
        })
      }, 3000)
    } else {
      this.setState({
        [target]: inputValue,
        errMessage: ''
      })
    }
  }
  test ({ inputID, inputPW }) {
    let errMessage
    if (inputID.length === 0) errMessage = '아이디를 입력해주세요'
    else if (inputID.length < 4) errMessage = '아이디의 길이는 4자 이상이어야 합니다'
    else if (inputPW.length === 0) errMessage = '비밀번호를 입력해주세요'
    else if (inputPW.length < 6) errMessage = '비밀번호의 길이는 6자 이상이어야 합니다'
    return errMessage
  }
  render () {
    const { inputID, inputPW, errMessage } = this.state
    return (
      <div>
        <Input value={inputID} placeholder=' 아이디' onChange={this.update} type='id' />
        <Input value={inputPW} placeholder=' 비밀번호' onChange={this.update} type='password' />
        <AlertableButton value='로그인' errMessage={errMessage} onClick={this.handleLoginClick} style={styles.loginButton} />
        <Bar />
        <Phrase value='가입하고 싶은데 어떡하죠?' onClick={this.props.setModeJoin} style={styles.phrase} className={{ text: 'basic-phrase' }} />
      </div>
    )
  }
}
const styles = {
  loginButton: {
    container: {
      marginBottom: 40
    }
  },
  phrase: {
    container: {
      marginBottom: 30
    }
  }
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
  setBrake: () => dispatch(setBrake({ brake: 'sideBoard' })),
  clearBrake: payload => dispatch(clearBrake(payload)),
  onLogin: payload => dispatch(login(payload)),
  setModeUser: () => dispatch(changeMode({ sideBoard: 'user' })),
  setModeJoin: () => dispatch(changeMode({ sideBoard: 'join' }))
})
Login.propTypes = {
  setBrake: PropTypes.func.isRequired,
  clearBrake: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  setModeUser: PropTypes.func.isRequired,
  setModeJoin: PropTypes.func.isRequired
}
Login.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
