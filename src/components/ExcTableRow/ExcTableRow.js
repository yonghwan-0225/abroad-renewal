import React from 'react'
import PropTypes from 'prop-types'

const ExcTableRow = ({ bank, fromW, toW }) => (
  <tr>
    <th>{bank}</th>
    <td><span>{fromW}</span></td>
    <td><span>{toW}</span></td>
  </tr>
)
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
ExcTableRow.propTypes = {
}
ExcTableRow.defaultProps = {

}
export default ExcTableRow
