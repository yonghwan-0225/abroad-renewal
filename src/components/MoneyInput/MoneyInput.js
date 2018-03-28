import React from 'react'
import PropTypes from 'prop-types'
import './MoneyInput.css'

const MoneyInput = ({ value, moneySign, onChange }) => {

  return (
    <div className='money-input-container'>
      <input value={value} onChange={onChange} className='money-input' type='text' />
      <div className='money-sign-container'>
        <div className='money-sign-aligner'>
          <span>{moneySign}</span>
        </div>
      </div>
    </div>
  )
}
MoneyInput.propTypes = {
  value: PropTypes.string.isRequired,
  moneySign: PropTypes.string.isRequired,
  onChange: PropTypes.func
}
MoneyInput.defaultProps = {

}
export default MoneyInput
