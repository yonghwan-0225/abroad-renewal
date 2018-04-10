import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { excTypeFullString, excTypeFormerString, excTypeAfterString, insertComma } from '../../util'
import { LabeledInput } from '..'
import './UserOrder.css'

class UserOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggle: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }))
  }
  render () {
    const { orderNo, orderType, status, amount, serviceRate, total, time } = this.props
    return (
      <div className={this.state.toggle ? 'user-order__container--toggle' : 'user-order__container'} onClick={this.handleClick} >
        <LabeledInput label='환전번호' value={orderNo} style={style.labeledInput} readOnly={true} />
        <LabeledInput label='상태' value={status} style={style.labeledInput} readOnly={true} />
        <LabeledInput label='요청환전종류' value={excTypeFullString(orderType)} style={style.labeledInput} readOnly={true} />
        <LabeledInput label='제공환율' value={serviceRate} style={style.labeledInput} readOnly={true} />
        <LabeledInput label='결제금액' value={insertComma(amount)} style={style.labeledInputWithFooter} footer={excTypeFormerString(orderType)} readOnly={true} />
        <LabeledInput label='환전금액' value={insertComma(total)} style={style.labeledInputWithFooter} footer={excTypeAfterString(orderType)} readOnly={true} />
        <LabeledInput label='요청일시' value={time} style={style.labeledInputWide} readOnly={true} />
      </div>
    )
  }
}
UserOrder.propTypes = {
  orderNo: PropTypes.node.isRequired,
  orderType: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  serviceRate: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
}
export default UserOrder
const style = {
  labeledInput: {
    container: {
      float: 'left',
      width: '150px',
      height: '60px',
      margin: 0,
      border: 'none'
    },
    label: {
      width: '135px',
      height: '15px',
      paddingTop: '10px',
      paddingLeft: '15px',
      fontSize: '0.7rem',
      cursor: 'inherit'
    },
    input: {
      top: '25px',
      width: '150px',
      height: '35px',
      paddingLeft: '5px',
      paddingRight: '15px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'inherit'
    }
  },
  labeledInputWithFooter: {
    container: {
      float: 'left',
      width: '150px',
      height: '60px',
      margin: 0,
      border: 'none'
    },
    label: {
      width: '135px',
      height: '15px',
      paddingTop: '10px',
      paddingLeft: '15px',
      fontSize: '0.7rem',
      cursor: 'inherit'
    },
    input: {
      top: '25px',
      width: '150px',
      height: '35px',
      paddingLeft: '5px',
      paddingRight: '35px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'inherit'
    },
    footer: {
      top: '25px',
      width: '30px',
      height: '35px',
      paddingRight: '5px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'inherit'
    }
  },
  labeledInputWide: {
    container: {
      float: 'left',
      width: '300px',
      height: '60px',
      margin: 0,
      border: 'none'
    },
    label: {
      width: '135px',
      height: '15px',
      paddingTop: '10px',
      paddingLeft: '15px',
      fontSize: '0.7rem',
      cursor: 'inherit'
    },
    input: {
      top: '25px',
      width: '300px',
      height: '35px',
      fontSize: '1.1rem',
      textAlign: 'center',
      fontWeight: 'bold',
      cursor: 'inherit'
    }
  }
}
