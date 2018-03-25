import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mergeIfExist } from '../../util'

const Button = ({ value, onClick, style }) => (
  <div className='button' onClick={onClick} style={style ? mergeIfExist(styles.container, style.container) : styles.container}>
    <div style={styles.aligner}><span style={style ? mergeIfExist(styles.text, style.text) : styles.text}>{value}</span></div>
  </div>
)
const styles = {
  container: {
    position: 'relative',
    width: 250,
    height: 45,
    margin: '0 auto 10',
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
    color: 'white',
    fontSize: '1.2rem'
  }
}
Button.propTypes = {
  value: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object
}
export default Button
