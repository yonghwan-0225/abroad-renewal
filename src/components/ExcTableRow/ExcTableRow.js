import React from 'react'
import PropTypes from 'prop-types'

const ExcTableRow = ({ bank, fromW, toW }) => (
  <tr>
    <th>{bank}</th>
    <td><span>{fromW}</span></td>
    <td><span>{toW}</span></td>
  </tr>
)
export default ExcTableRow
