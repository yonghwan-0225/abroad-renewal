import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ExcTableRow } from '..'
import './ExcTable.css'

const ExcTable = ({ selected, header, excData, serviceRate }) => (
  <div className='exc-table'>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>{header.fromW}</th>
          <th>{header.toW}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th><img src='img/abroad.png' height='70%' /></th>
          <td><span>{serviceRate.fromW}</span></td>
          <td><span>{serviceRate.toW}</span></td>
        </tr>
        {excData.map(e => <ExcTableRow key={e.bank} {...e} />)}
      </tbody>
    </table>
  </div>
)
ExcTable.propTypes = {
  header: PropTypes.object.isRequired,
  excData: PropTypes.array.isRequired,
  serviceRate: PropTypes.object.isRequired
}
ExcTable.defaultProps = {

}
export default ExcTable
