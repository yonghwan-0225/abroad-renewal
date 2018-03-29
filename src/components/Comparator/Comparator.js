import React from 'react'
import PropTypes from 'prop-types'
import { LabeledInput } from '..'
import './Comparator.css'

const Comparator = ({ moneyType, moneyInput, exchangedAbroad, exchangedToCompare, compareBankName }) => (
  <div className='comparator' >
    <LabeledInput label={<div>{compareBankName}에서 환전하면</div>} value={exchangedToCompare + ' ' + moneyType} readOnly={true} style={style.exchangedToCompare} />
    <LabeledInput label={<div><img src='img/abroad.png' height='16px' style={{ position: 'relative', top: 2 }} />에서 환전하면</div>} value={exchangedAbroad + ' ' + moneyType} readOnly={true} style={style.exchangedAbroad} />
  </div>
)
Comparator.propTypes = {
  moneyType: PropTypes.string.isRequired,
  moneyInput: PropTypes.string.isRequired,
  exchangedAbroad: PropTypes.string.isRequired,
  exchangedToCompare: PropTypes.string.isRequired,
  compareBankName: PropTypes.string.isRequired
}
Comparator.defaultProps = {

}
export default Comparator
const style = {
  exchangedAbroad: {
    container: {
      border: '1px solid lightcoral',
      boxShadow: '0 0 3px lightcoral'
    },
    input: {
      cursor: 'default'
    }
  },
  exchangedToCompare: {
    container: {
      border: '1px solid darkslategrey',
      boxShadow: '0 0 3px darkslategrey'
    },
    input: {
      cursor: 'default'
    }
  }
}
