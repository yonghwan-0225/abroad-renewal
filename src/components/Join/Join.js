import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'
import { joinURL } from '../../config'
import { setBrake, clearBrake, changeMode } from '../../action'
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
    this.handleJoinClick = this.handleJoinClick.bind(this)
    this.update = this.update.bind(this)
  }
  handleJoinClick () {
    const { setBrake, clearBrake, setModeLogin } = this.props
    const errMessage = this.test(this.state)
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
          clearBrake({ board: 'sideBoard', alertMessage: '서버가 고장났습니다' })
          return
        }
        const { status, message } = res.body
        if (status) {
          setModeLogin()
          clearBrake({ board: 'sideBoard', alertMessage: '가입 되었습니다' })
        } else {
          this.update({ errMessage: message })
          clearBrake({ board: 'sideBoard' })
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
  test ({ inputID, inputPW, inputName, inputEmail, inputPhone, inputAddress }) {
    let errMessage
    if (inputID.length === 0) errMessage = '아이디를 입력해주세요'
    else if (inputID.length < 4) errMessage = '아이디의 길이는 4자 이상이어야 합니다'
    else if (inputPW.length === 0) errMessage = '비밀번호를 입력해주세요'
    else if (inputPW.length < 6) errMessage = '비밀번호의 길이는 6자 이상이어야 합니다'
    else if (inputName.length === 0) errMessage = '이름을 입력해주세요'
    else if (inputName.length < 2) errMessage = '이름의 길이는 2자 이상이어야 합니다'
    else if (inputEmail.length === 0) errMessage = '이메일을 입력해주세요'
    else if (inputPhone.length === 0) errMessage = '전화번호를 입력해주세요'
    else if (inputAddress.length === 0) errMessage = '주소를 입력해주세요'
    return errMessage
  }
  render () {
    const { inputID, inputPW, inputName, inputEmail, inputPhone, inputAddress, errMessage } = this.state
    return (
      <div>
        <Input value={inputID} placeholder=' 아이디' onChange={this.update} type='id' />
        <Input value={inputPW} placeholder=' 비밀번호' onChange={this.update} type='password' />
        <Input value={inputName} placeholder=' 이름' onChange={this.update} type='name' />
        <Input value={inputEmail} placeholder=' 이메일' onChange={this.update} type='email' />
        <Input value={inputPhone} placeholder=' 전화번호' onChange={this.update} type='phone' />
        <Input value={inputAddress} placeholder=' 주소' onChange={this.update} type='address' />
        <AlertableButton value='가입하기' errMessage={errMessage} onClick={this.handleJoinClick} />
        <Bar />
        <Phrase value='아 맞다, 나 가입했었구나' onClick={this.props.setModeLogin} className={{ text: 'basic-phrase' }} />
      </div>
    )
  }
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
  setBrake: () => dispatch(setBrake({ board: 'sideBoard' })),
  clearBrake: payload => dispatch(clearBrake(payload)),
  setModeLogin: () => dispatch(changeMode({ board: 'sideBoard', mode: 'login' }))
})
Join.propTypes = {
  setBrake: PropTypes.func.isRequired,
  clearBrake: PropTypes.func.isRequired,
  setModeLogin: PropTypes.func.isRequired
}
Join.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Join)
