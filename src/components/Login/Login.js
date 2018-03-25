import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Input, AlertableButton, Button } from '..'
import './Login.css'

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

  }
  render () {
    const { inputID, inputPW, errMessage } = this.state
    return (
      <div className='login'>
        <img src='img/abroad.png' style={styles.logoImg} />
        <hr color='#c7c7c7' style={styles.bar} />
        <Input value={inputID} placeholder=' 아이디' onChange={this.handleIDChange} />
        <Input value={inputPW} placeholder=' 비밀번호' onChange={this.handlePWChange} type='password' />
        <AlertableButton value='로그인' errMessage={errMessage} onClick={this.handleLoginClick} style={styles.loginButton} />
        <hr color='#c7c7c7' style={styles.bar} />
      </div>
    )
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
}
const styles = {
  logoImg: {
    marginBottom: 20
  },
  bar: {
    width: 300,
    margin: '0 auto 40',
    borderWidth: 0.5,
  },
  loginButton: {
    container: {
      marginBottom: 40
    }
  }
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
Login.propTypes = {

}
Login.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
