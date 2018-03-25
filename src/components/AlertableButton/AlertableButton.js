import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mergeIfExist } from '../../util'
import { Button } from '..'

const AlertableButton = ({ value, errMessage, onClick, style }) => (
  errMessage ? <Button value={errMessage} style={mergeIfExist(styles.buttonErr, style)} /> : <Button value={value} onClick={onClick} style={style} />
)

export default AlertableButton

AlertableButton.propTypes = {
  value: PropTypes.node.isRequired,
  errMessage: PropTypes.string,
  onClick: PropTypes.func
}
const styles = {
  buttonErr: {
    container: {
      backgroundColor: 'crimson'
    },
    text: {
      color: 'white',
      fontSize: '1rem'
    }
  }
}
