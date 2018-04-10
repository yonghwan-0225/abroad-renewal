import React from 'react'
import PropTypes from 'prop-types'
import './Phrase.css'

const Phrase = ({ value, onClick, style, className }) => (
  <div style={style.container} className={className.container || 'phrase__container'}>
    <div className={className.aligner || 'phrase__aligner'} style={style.aligner}><span onClick={onClick} style={style.text} className={className.text || 'phrase__text'}>{value}</span></div>
  </div>
)
Phrase.propTypes = {
  value: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.object
}
Phrase.defaultProps = {
  style: {},
  className: {}
}
export default Phrase
