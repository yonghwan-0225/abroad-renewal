import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ value, onClick, style }) => (
  <div onClick={onClick} style={style.container}>
    <div style={style.aligner}><span style={style.text}>{value}</span></div>
  </div>
)
Button.propTypes = {
  value: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object
}
Button.defaultProps = {
  style: {
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
      fontSize: '1.2rem'
    }
  }
}
export default Button
