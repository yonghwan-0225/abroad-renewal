import React from 'react'
import PropTypes from 'prop-types'

const Bar = ({ color, style, className }) => (
  <hr color={color} style={style} className={className.bar} />
)
Bar.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.object
}
Bar.defaultProps = {
  color: '#c7c7c7',
  style: {
    width: 300,
    margin: '0 auto 40',
    borderWidth: 0.5
  },
  className: {}
}
export default Bar
