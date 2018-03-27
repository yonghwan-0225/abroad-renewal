import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Input.css'

const Input = ({ value, placeholder, onChange, type }) => {
  function handleOnChange (e) {
    switch(type) {
      case 'id':
        onChange(handleIDChange(e))
        return
      case 'password':
        onChange(handlePWChange(e))
        return
      case 'new-password':
        onChange(handlePWChange(e, true))
        return
      case 'name':
        onChange(handleNameChange(e))
        return
      case 'email':
        onChange(handleEmailChange(e))
        return
      case 'phone':
        onChange(handlePhoneChange(e))
        return
      default:
        return
    }
  }
  function handleIDChange (e) {
    const inputValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
    let errMessage
    if (e.target.value != inputValue) errMessage = '아이디는 알파벳 대소문자와 숫자의 조합이어야 합니다'
    else if (inputValue.length > 12) errMessage = '아이디의 길이는 12자 이하이어야 합니다'
    else if (/[0-9]/.test(inputValue.charAt(0))) errMessage = '아이디의 첫 글자는 숫자가 될 수 없습니다'
    return {
      target: 'inputID',
      inputValue,
      errMessage
    }
  }
  function handlePWChange (e, isNew) {
    const inputValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
    let errMessage
    if (e.target.value != inputValue) errMessage = '비밀번호는 알파벳 대소문자와 숫자의 조합이어야 합니다'
    else if (inputValue.length > 12) errMessage = '비밀번호의 길이는 12자 이하이어야 합니다'
    return {
      target: isNew ? 'inputNewPW' : 'inputPW',
      inputValue,
      errMessage
    }
  }
  function handleNameChange (e) {
    const inputValue = e.target.value.replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]/g, '')
    let errMessage
    if (e.target.value != inputValue) errMessage = '이름은 알파벳과 한글만 가능합니다'
    else if (inputValue.length > 20) errMessage = '이름의 길이는 4자 이하이어야 합니다'
    return {
      target: 'inputName',
      inputValue,
      errMessage
    }
  }
  function handleEmailChange (e) {
    const inputValue = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '')
    let errMessage
    if (e.target.value != inputValue || inputValue.match(/@/g) && inputValue.match(/@/g).length > 1) errMessage = '이메일 형식에 맞지 않습니다'
    return {
      target: 'inputEmail',
      inputValue,
      errMessage
    }
  }
  function handlePhoneChange (e) {
    const inputValue = e.target.value.replace(/[^0-9-]/g, '')
    let errMessage
    if (inputValue.match(/-/g)) errMessage = '하이픈(-)없이 숫자만 입력해주세요'
    else if (e.target.value != inputValue || inputValue.match(/@/g) && inputValue.match(/@/g).length > 1) errMessage = '숫자만 입력 가능합니다'
    else if (inputValue.length > 11) errMessage = '전화번호의 길이는 11자를 넘을 수 없습니다'
    return {
      target: 'inputPhone',
      inputValue,
      errMessage
    }
  }
  let popWindow
  function inputAddress () {
    switch(type) {
      case 'address':
        const socket = io()
        socket.on('address', address => {
          popWindow.close()
          onChange({
            target: 'inputAddress',
            inputValue: '[' + address.zipNo + '] ' + address.roadFullAddr
          })
        })
        popWindow = window.open("/pop/address-pop.html", "pop", "width=570, height=420, scrollbars=yes, resizable=yes")
      default:
        return
    }
  }
  return type !== 'address' ? <input value={value} placeholder={placeholder} onChange={handleOnChange} className='basic-input' type={type === 'password' || type === 'new-password' ? 'password' : 'text'} /> : <textarea value={value} placeholder={placeholder} onClick={inputAddress} className='wide-input' readOnly />
}
Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
}
Input.defaultProps = {
  type: 'text'
}
export default Input
