import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'
import { editURL } from '../../config'
import { setBrake, clearBrake, changeMode, renewUser } from '../../action'
import { Input, AlertableButton, Bar, Phrase } from '..'

class Edit extends Component {
  constructor (props) {
    super (props)
    this.state = {
      inputID: this.props.id,
      inputPW: '',
      inputNewPW: '',
      inputName: this.props.name,
      inputEmail: this.props.email,
      inputPhone: this.props.phone,
      inputAddress: this.props.address,
      errMessage: ''
    }
    this.handleIDClick = this.handleIDClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.update = this.update.bind(this)
  }
  handleIDClick () {
    this.update({ errMessage: '아이디는 바꿀 수 없습니다' })
  }
  handleIDClick () {
    this.update({ errMessage: '이름은 앵간하면 바꿀 수 없습니다' })
  }
  handleEditClick () {
    const { setBrake, clearBrake, setModeUser, onEdit } = this.props
    const errMessage = this.test(this.state)
    if (errMessage) {
      this.update({ errMessage })
    } else {
      const { inputID, inputPW, inputNewPW, inputName, inputEmail, inputPhone, inputAddress } = this.state
      const params = {
        id: inputID,
        pw: inputPW,
        newPw: inputNewPW,
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
        address: inputAddress
      }
      setBrake()
      request.post(editURL).type('form').send(params).end((err, res) => {
        if (err) {
          this.update({ errMessage: 'Business서버가 고장났습니다' })
          clearBrake()
          return
        }
        const { status, userData, message } = res.body
        if (status) {
          onEdit({ userData })
          setModeUser()
          clearBrake('수정되었습니다')
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
    const { inputID, inputPW, inputNewPW, inputName, inputEmail, inputPhone, inputAddress, errMessage } = this.state
    return (
      <div>
        <Input value={inputID} placeholder=' 아이디' onClick={this.handleIDClick} type='id' readOnly={true} />
        <Input value={inputPW} placeholder=' 비밀번호' onChange={this.update} type='password' />
        <Input value={inputNewPW} placeholder=' 새 비밀번호' onChange={this.update} type='new-password' />
        <Input value={inputName} placeholder=' 이름' onClick={this.handleNameClick} type='name' readOnly={true} />
        <Input value={inputEmail} placeholder=' 이메일' onChange={this.update} type='email' />
        <Input value={inputPhone} placeholder=' 전화번호' onChange={this.update} type='phone' />
        <Input value={inputAddress} placeholder=' 주소' onChange={this.update} type='address' />
        <AlertableButton value='수정하기' errMessage={errMessage} onClick={this.handleEditClick} style={style.alertableButton} />
        <Bar />
        <Phrase value='그냥 안바꿀래요' onClick={this.props.setModeUser} className={{ text: 'basic-phrase' }} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  id: state.user.id,
  pw: state.user.pw,
  name: state.user.name,
  email: state.user.email,
  phone: state.user.phone,
  address: state.user.address
})
const mapDispatchToProps = dispatch => ({
  setBrake: () => dispatch(setBrake({ board: 'sideBoard' })),
  clearBrake: alertMessage => dispatch(clearBrake({ board: 'sideBoard', alertMessage })),
  setModeUser: () => dispatch(changeMode({ board: 'sideBoard', mode: 'user' })),
  onEdit: payload => dispatch(renewUser(payload))
})
Edit.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  setBrake: PropTypes.func.isRequired,
  clearBrake: PropTypes.func.isRequired,
  setModeUser: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit)
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
