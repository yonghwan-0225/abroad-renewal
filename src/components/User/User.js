import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UserInfo, Bar, UserOrder } from '..'
import './User.css'

const User = ({ orderData }) => (
  <div className='user__container'>
    <UserInfo />
    <Bar />
    {orderData.map(e => <UserOrder key={e.orderNo} {...e} />)}
  </div>
)
const mapStateToProps = state => ({
  orderData: state.user.orderData
})
const mapDispatchToProps = dispatch => ({

})
User.propTypes = {
  orderData: PropTypes.array.isRequired

}
User.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(User)
