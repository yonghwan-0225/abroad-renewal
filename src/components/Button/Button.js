import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ value, onClick, style, className }) => (
  <div onClick={onClick} style={style.container} className={className.container || 'button__container'} >
    <span style={style.text} className={className.text || 'button__text'}>{value}</span>
  </div>
)
Button.propTypes = {
  value: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.object
}
Button.defaultProps = {
  style: {},
  className: {}
}
export default Button
