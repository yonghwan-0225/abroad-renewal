import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Input.css'

const Input = ({ value, placeholder, onChange, style, type }) => (
  <input value={value} placeholder={placeholder} onChange={onChange} style={style} className='input' type={type} />
)
Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
}
Input.defaultProps = {
  type: 'text'
}
export default Input
