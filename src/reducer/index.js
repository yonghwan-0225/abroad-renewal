import * as ACTION from '../action'
import { deepCopy } from '../util'

const boardInitState = {
  sideBoard: {
    mode: 'reception',
    brake: false,
    alertMessage: ''
  },
  mainBoard: {
    mode: 'exchange',
    brake: false,
    alertMessage: ''
  },
  extraBoard: {
    mode: 'insurance',
    brake: false,
    alertMessage: ''
  }
}
const excInitState = {
  loaded: false,
  entry: [],
  excData: {},
  measure: {},
  serviceRate: {}
}
const userInitState = {
  login: false,
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  orderData: []
}
export function board (state = boardInitState, action) {
  switch(action.type) {
    case ACTION.SET_BRAKE:
      return deepCopy(state, {
        [action.board]: {
          brake: true
        }
      })
    case ACTION.CLEAR_BRAKE:
      return deepCopy(state, {
        [action.board]: {
          brake: false,
          alertMessage: action.alertMessage || ''
        }
      })
    case ACTION.CHANGE_MODE:
      return deepCopy(state, {
        [action.board]: {
          mode: action.mode
        }
      })
    default:
      return state
  }
}
export function exc (state = excInitState, action) {
  switch(action.type) {
    case ACTION.RENEW_EXC:
      return {
        loaded: true,
        entry: action.entry,
        excData: action.excData,
        measure: action.measure,
        serviceRate: action.serviceRate
      }
    default:
      return state
  }
}
export function user (state = userInitState, action) {
  switch(action.type) {
    case ACTION.LOG_IN:
      return {
        login: true,
        id: action.id,
        name: action.name,
        email: action.email,
        phone: action.phone,
        address: action.address,
        orderData: action.orderData
      }
    case ACTION.LOG_OUT:
      return {
        login: false
      }
    case ACTION.RENEW_ORDER_DATA:
      return {
        login: state.login,
        id: state.id,
        name: state.name,
        email: state.email,
        phone: state.phone,
        address: state.address,
        orderData: deepCopy(state.orderData, {
          [state.orderData.length]: action.newOrderData
        })
      }
    default:
      return state
  }
}
