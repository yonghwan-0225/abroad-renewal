import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '..'

const AlertableButton = ({ value, errMessage, onClick, style }) => (
  errMessage ? <Button value={errMessage} style={style.err} /> : <Button value={value} onClick={onClick} style={style.normal} />
)
AlertableButton.propTypes = {
  value: PropTypes.node.isRequired,
  errMessage: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}
AlertableButton.defaultProps = {
  style: {
    err: {
      container: {
        position: 'relative',
        width: 250,
        height: 45,
        margin: '0 auto 40',
        padding: '0 10',
        textAlign: 'center',
        backgroundColor: '#CD3855',
        cursor: 'not-allowed',
        transition: '0.3s',
        display: 'table'
      },
      aligner: {
        display: 'table-cell',
        verticalAlign: 'middle'
      },
      text: {
        color: 'white',
        fontSize: '1rem'
      }
    },
    normal: {
      container: {
        position: 'relative',
        width: 250,
        height: 45,
        margin: '0 auto 40',
        padding: '0 10',
        textAlign: 'center',
        backgroundColor: 'goldenrod',
        cursor: 'pointer',
        transition: '0.3s',
        display: 'table'
      },
      aligner: {
        display: 'table-cell',
        verticalAlign: 'middle'
      },
      text: {
        fontSize: '1.2rem'
      }
    }
  }
}
export default AlertableButton
