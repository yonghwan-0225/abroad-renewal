import React from 'react'
import PropTypes from 'prop-types'
import './Bar.css'

const Bar = ({ color, style, className }) => (
  <hr color={color} style={style.bar} className={className.bar || 'bar'} />
)
Bar.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.object
}
Bar.defaultProps = {
  color: '#c7c7c7',
  style: {},
  className: {}
}
export default Bar
