import React from 'react'
import PropTypes from 'prop-types'
import { mergeIfExist } from '../../util'

const Trench = ({ toggle, children, style, className }) => (
  <div style={mergeIfExist({ display: toggle ? 'block' : 'none'}, style.container)} className={className.container || 'trench__container'}>
    {children}
  </div>
)
Trench.propTypes = {
  toggle: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.object
}
Trench.defaultProps = {
  style: {},
  className: {}
}
export default Trench
