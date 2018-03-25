import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Join.css'

class Join extends Component {
  constructor (props) {
    super (props)
    this.state = {

    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
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
  render () {
    return (
      <div className=''>

        <Input value={inputName} placeholder=' NAME' onChange={this.handleNameChange} />
        <Input value={inputEmail} placeholder=' EMAIL' onChange={this.handleEmailChange} />
        <Input value={inputPhone} placeholder=' PHONE' onChange={this.handlePhoneChange} />
      </div>
    )
  }
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(Join)

Join.propTypes = {

}
Join.defaultProps = {

}
