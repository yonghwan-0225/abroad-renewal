import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '..'
import './AlertableButton.css'

const AlertableButton = ({ value, errMessage, onClick, style, className }) => (
  errMessage ? <Button value={errMessage} style={style.err} className={className.err || defaultClassName.err} /> : <Button value={value} onClick={onClick} style={style.normal} className={className.normal || defaultClassName.normal} />
)
AlertableButton.propTypes = {
  value: PropTypes.node.isRequired,
  errMessage: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.obejct
}
AlertableButton.defaultProps = {
  className: {},
  style: {}
}
export default AlertableButton
const defaultClassName = {
  normal: {
    container: 'alertable-button__button__container--normal',
    text: 'alertable-button__button__text--normal'
  },
  err: {
    container: 'alertable-button__button__container--err',
    text: 'alertable-button__button__text--err'
  }
}
