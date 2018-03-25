import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'
import { setBrake, clearBrake, login, changeMode } from '../../action'
import { loginURL } from '../../config'
import { Input, AlertableButton, Bar, Phrase } from '..'

class Login extends Component {
  constructor (props) {
    super (props)
    this.state = {
      inputID: '',
      inputPW: '',
      errMessage: ''
    }
    this.handleIDChange = this.handleIDChange.bind(this)
    this.handlePWChange = this.handlePWChange.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.update = this.update.bind(this)
  }
  handleIDChange (e) {
    const inputValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
    let errMessage
    if (e.target.value != inputValue) errMessage = 'ID는 알파벳 대소문자와 숫자의 조합이어야 합니다'
    else if (inputValue.length > 12) errMessage = 'ID의 길이는 12자 이하이어야 합니다'
    else if (/[0-9]/.test(inputValue.charAt(0))) errMessage = 'ID의 첫 글자는 숫자가 될 수 없습니다'
    this.update({
      target: 'inputID',
      inputValue,
      errMessage
    })
  }
  handlePWChange (e) {
    const inputValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
    let errMessage
    if (e.target.value != inputValue) errMessage = 'PW는 알파벳 대소문자와 숫자의 조합이어야 합니다'
    else if (inputValue.length > 12) errMessage = 'PW의 길이는 12자 이하이어야 합니다'
    this.update({
      target: 'inputPW',
      inputValue,
      errMessage
    })
  }
  handleLoginClick () {
    const { setBrake, clearBrake, onLogin } = this.props
    const errMessage = this.test(this.state)
    if (errMessage) {
      this.update({ errMessage })
    } else {
      const { id, pw } = this.state
      setBrake()
      request.post(loginURL).type('form').send({ id, pw }).end((err, { body }) => {
        if (err) return
        const { status, message, userData, orderData } = body
        clearBrake()
        if (status) {
          onLogin({ userData, orderData })
        } else {
          this.update({ errMessage: message })
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
    if (inputID.length < 4) errMessage = 'ID의 길이는 4자 이상이어야 합니다'
    else if (inputPW.length < 6) errMessage = 'PW의 길이는 6자 이상이어야 합니다'
    return errMessage
  }
  render () {
    const { inputID, inputPW, errMessage } = this.state
    return (
      <div>
        <Input value={inputID} placeholder=' 아이디' onChange={this.handleIDChange} />
        <Input value={inputPW} placeholder=' 비밀번호' onChange={this.handlePWChange} type='password' />
        <AlertableButton value='로그인' errMessage={errMessage} onClick={this.handleLoginClick} style={styles.loginButton} />
        <Bar style={styles.bar} />
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
  bar: {
    width: 300,
    margin: '0 auto 40',
    borderWidth: 0.5,
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
  clearBrake: () => dispatch(clearBrake()),
  onLogin: payload => dispatch(login(payload)),
  setModeJoin: () => dispatch(changeMode({ sideBoard: 'join' }))
})
Login.propTypes = {
  setBrake: PropTypes.func.isRequired,
  clearBrake: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  setModeJoin: PropTypes.func.isRequired
}
Login.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
