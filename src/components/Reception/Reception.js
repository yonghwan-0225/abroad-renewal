import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'
import { loginURL, joinURL } from '../../config'
import { setBrake, clearBrake, login, changeMode } from '../../action'
import { Input, AlertableButton, Bar, Phrase } from '..'
import './Reception.css'

class Reception extends Component {
  constructor (props) {
    super (props)
    this.state = {
      mode: 'login',
      inputID: '',
      inputPW: '',
      inputName: '',
      inputEmail: '',
      inputPhone: '',
      inputAddress: '',
      errMessage: ''
    }
    this.setModeLogin = this.setModeLogin.bind(this)
    this.setModeJoin = this.setModeJoin.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleJoinClick = this.handleJoinClick.bind(this)
    this.update = this.update.bind(this)
    this.test = this.test.bind(this)
  }
  setModeLogin () {
    this.setState({
      mode: 'login'
    })
  }
  setModeJoin () {
    this.setState({
      mode: 'join'
    })
  }
  handleLoginClick () {
    const { setBrake, clearBrake, onLogin, setModeUser } = this.props
    const errMessage = this.test()
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
          this.update({ errMessage: 'Business서버가 고장났습니다' })
          clearBrake()
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
  handleJoinClick () {
    const { setBrake, clearBrake } = this.props
    const errMessage = this.test()
    if (errMessage) {
      this.update({ errMessage })
    } else {
      const { inputID, inputPW, inputName, inputEmail, inputPhone, inputAddress } = this.state
      const params = {
        id: inputID,
        pw: inputPW,
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
        address: inputAddress
      }
      setBrake()
      request.post(joinURL).type('form').send(params).end((err, res) => {
        if (err) {
          this.update({ errMessage: 'Business서버가 고장났습니다' })
          clearBrake()
          return
        }
        const { status, message } = res.body
        if (status) {
          this.setModeLogin()
          clearBrake('가입 되었습니다')
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
  test () {
    const { mode, inputID, inputPW, inputName, inputEmail, inputPhone, inputAddress } = this.state
    if (inputID.length === 0) return '아이디를 입력해주세요'
    else if (inputID.length < 4) return '아이디의 길이는 4자 이상이어야 합니다'
    else if (inputPW.length === 0) return '비밀번호를 입력해주세요'
    else if (inputPW.length < 6) return '비밀번호의 길이는 6자 이상이어야 합니다'
    else if (mode === 'login') return ''
    else if (inputName.length === 0) return '이름을 입력해주세요'
    else if (inputName.length < 2) return '이름의 길이는 2자 이상이어야 합니다'
    else if (inputEmail.length === 0) return '이메일을 입력해주세요'
    else if (inputPhone.length === 0) return '전화번호를 입력해주세요'
    else if (inputAddress.length === 0) return '주소를 입력해주세요'
  }
  render () {
    const { mode, inputID, inputPW, inputName, inputEmail, inputPhone, inputAddress, errMessage } = this.state
    const submitButton = mode === 'login' ? (
      <AlertableButton value='로그인' errMessage={errMessage} onClick={this.handleLoginClick} style={style.alertableButton} />
    ) : (
      <AlertableButton value='가입하기' errMessage={errMessage} onClick={this.handleJoinClick} style={style.alertableButton} />
    )
    const phrases = mode === 'login' ? (
      <div className='reception__phrases'>
        <Phrase value='가입하고 싶은데 어떡하죠?' onClick={this.setModeJoin} className={{ text: 'basic-phrase' }} />
        <Phrase value='여기가 대체 뭐하는 곳인가요?' onClick={this.props.setModeIntroduce} className={{ text: 'basic-phrase' }} />
      </div>
    ) : (
      <div className='reception__phrases--spread'>
        <Phrase value='되돌아갈래요' onClick={this.setModeLogin} className={{ text: 'basic-phrase' }} />
      </div>
    )
    return (
      <div>
        <div className={mode === 'login' ? 'reception__inputs-container' : 'reception__inputs-container--spread'}>
          <Input value={inputID} placeholder=' 아이디' onChange={this.update} type='id' />
          <Input value={inputPW} placeholder=' 비밀번호' onChange={this.update} type='password' />
          <Input value={inputName} placeholder=' 이름' onChange={this.update} type='name' />
          <Input value={inputEmail} placeholder=' 이메일' onChange={this.update} type='email' />
          <Input value={inputPhone} placeholder=' 전화번호' onChange={this.update} type='phone' />
          <Input value={inputAddress} placeholder=' 주소' onChange={this.update} type='address' />
        </div>
        {submitButton}
        <Bar />
        {phrases}
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  setBrake: () => dispatch(setBrake({ board: 'sideBoard' })),
  clearBrake: alertMessage => dispatch(clearBrake({ board: 'sideBoard', alertMessage })),
  onLogin: payload => dispatch(login(payload)),
  setModeUser: () => dispatch(changeMode({ board: 'sideBoard', mode: 'user' })),
  setModeIntroduce: () => dispatch(changeMode({ board: 'sideBoard', mode: 'introduce' }))
})
Reception.propTypes = {
  setBrake: PropTypes.func.isRequired,
  clearBrake: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
}
export default connect(undefined, mapDispatchToProps)(Reception)
const style = {
  alertableButton: {
    err: {
      container: {
        position: 'relative',
        width: 250,
        height: 45,
        margin: '0 auto 40',
        padding: '0 10',
        backgroundColor: '#CD3855'
      },
      text: {
        color: 'white'
      }
    },
    normal: {
      container: {
        position: 'relative',
        width: 250,
        height: 45,
        margin: '0 auto 40',
        padding: '0 10',
        backgroundColor: 'goldenrod'
      },
      text: {
        fontSize: '1.2rem'
      }
    }
  }
}
