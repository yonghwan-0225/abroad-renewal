import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mergeIfExist } from '../../util'
import { Button } from '..'

const AlertableButton = ({ value, errMessage, onClick, style }) => (
  errMessage ? <Button value={errMessage} style={mergeIfExist(styles.errButton, style)} /> : <Button value={value} onClick={onClick} style={style} />
)

export default AlertableButton

AlertableButton.propTypes = {
  value: PropTypes.node.isRequired,
  errMessage: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}
const styles = {
  errButton: {
    container: {
      backgroundColor: 'crimson',
      cursor: 'not-allowed'
    },
    text: {
      color: 'white',
      fontSize: '1rem'
    }
  }
}
