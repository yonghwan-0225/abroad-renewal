import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Input.css'

const Input = props => (
  <input className='input' {...props} />
)
export default Input

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
}
Input.defaultProps = {
  type: 'text'
}
