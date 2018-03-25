import React from 'react'
import PropTypes from 'prop-types'

const Bar = ({ color, style }) => (
  <hr color={color} style={style} />
)
Bar.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object
}
Bar.defaultProps = {
  color: '#c7c7c7'
}
export default Bar
