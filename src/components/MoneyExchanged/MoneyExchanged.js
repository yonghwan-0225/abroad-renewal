import React from 'react'
import PropTypes from 'prop-types'
import './MoneyExchanged.css'

const MoneyExchanged = ({ value, moneySign }) => (
  <div className='money-exchanged-container'>
    <input value={value} className='money-exchanged' style={value ? styles.exchanged : undefined} type='text' readOnly />
    <div className='money-sign-container'>
      <div className='money-sign-aligner'>
        <span>{moneySign}</span>
      </div>
    </div>
  </div>
)
MoneyExchanged.propTypes = {
  value: PropTypes.string.isRequired,
  moneySign: PropTypes.string.isRequired
}
MoneyExchanged.defaultProps = {
}
export default MoneyExchanged
const styles = {
  exchanged: {
    border: '1px solid lightcoral',
    boxShadow: '0 0 3px lightcoral'
  }
}
