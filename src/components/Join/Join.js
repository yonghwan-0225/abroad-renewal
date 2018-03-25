import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeMode } from '../../action'
import { Input, AlertableButton, Bar, Phrase } from '..'

class Join extends Component {
  constructor (props) {
    super (props)
    this.state = {
      inputID: '',
      inputPW: '',
      inputName: '',
      inputEmail: '',
      inputPhone: '',
      inputAddress: '',
      errMessage: ''
    }
    this.handleIDChange = this.handleIDChange.bind(this)
    this.handlePWChange = this.handlePWChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
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
  handleNameChange (e) {
    const inputValue = e.target.value.replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ ]/g, '')
    let errMessage
    if (e.target.value != inputValue) errMessage = '이름은 알파벳과 한글, 공백만 가능합니다'
    else if (inputValue.length > 20) errMessage = '이름의 길이는 20자 이하이어야 합니다'
    else if (/ /.test(inputValue.charAt(0))) errMessage = '이름의 첫 글자는 공백이 될 수 없습니다'
    this.update({
      target: 'inputName',
      inputValue,
      errMessage
    })
  }
  handleEmailChange (e) {
    const inputValue = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '')
    let errMessage
    if (e.target.value != inputValue || inputValue.match(/@/g) && inputValue.match(/@/g).length > 1) errMessage = 'Email 형식에 맞지 않습니다'
    this.update({
      target: 'inputEmail',
      inputValue,
      errMessage
    })
  }
  handlePhoneChange (e) {
    if (this.props.login) return <Redirect to='/' />
    const inputValue = e.target.value.replace(/[^0-9-]/g, '')
    let errMessage
    if (inputValue.match(/-/g)) errMessage = '하이픈(-)없이 숫자만 입력해주세요'
    else if (e.target.value != inputValue || inputValue.match(/@/g) && inputValue.match(/@/g).length > 1) errMessage = '숫자만 입력 가능합니다'
    else if (inputValue.length > 11) errMessage = 'phone number의 길이는 11자를 넘을 수 없습니다'
    this.update({
      target: 'inputPhone',
      inputValue,
      errMessage
    })
  }
  handleJoinClick () {

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
    const { inputID, inputPW, inputName, inputEmail, inputPhone, inputAddress, errMessage } = this.state
    return (
      <div>
        <Input value={inputID} placeholder=' 아이디' onChange={this.handleIDChange} />
        <Input value={inputPW} placeholder=' 비밀번호' onChange={this.handlePWChange} type='password' />
        <Input value={inputName} placeholder=' 이름' onChange={this.handleNameChange} />
        <Input value={inputEmail} placeholder=' 이메일' onChange={this.handleEmailChange} />
        <Input value={inputPhone} placeholder=' 전화번호' onChange={this.handlePhoneChange} />
        <Input value={inputAddress} placeholder=' 주소' style={styles.inputAddress} />
        <AlertableButton value='가입하기' errMessage={errMessage} onClick={this.handleJoinClick} style={styles.joinButton} />
        <Bar style={styles.bar} />
        <Phrase value='아, 나 가입했었구나' onClick={this.props.setModeLogin} style={styles.phrase} className={{ text: 'basic-phrase' }} />
      </div>
    )
  }
}
const styles = {
  inputAddress: {
    height: '90px'
  },
  joinButton: {
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
  setModeLogin: () => dispatch(changeMode({ sideBoard: 'login' }))
})
Join.propTypes = {
  setModeLogin: PropTypes.func.isRequired
}
Join.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Join)
