import React from 'react'
import PropTypes from 'prop-types'
import './LabeledInput.css'

const LabeledInput = ({ label, value, footer, onClick, onChange, onFocus, onBlur, style, className, type, readOnly }) => {
  let _input
  function handleClick () {
    _input.focus()
    onClick()
  }
  let footerElement
  if (footer) footerElement = <div style={style.footer} className={className.footer || 'labeled-input__footer'}><div style={{ display: 'table-cell', verticalAlign: 'middle' }}>{footer}</div></div>
  return (
    <div onClick={handleClick} style={style.container} className={className.container || 'labeled-input__container'}>
      <div style={style.label} className={className.label || 'labeled-input__label'}>{label}</div>
      <input value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} style={style.input} className={className.input || 'labeled-input__input'} type={type} readOnly={readOnly} ref={_this => _input = _this} tabIndex={-1} />
      {footerElement}
    </div>
  )
}
LabeledInput.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.object,
  type: PropTypes.string,
  readOnly: PropTypes.bool
}
LabeledInput.defaultProps = {
  value: '',
  onClick: f => f,
  type: 'text',
  readOnly: false,
  style: {},
  className: {}
}
export default LabeledInput
