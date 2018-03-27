import * as ACTION from '../action'
import { deepCopy } from '../util'

const boardInitState = {
  sideBoard: {
    mode: 'login',
    brake: false,
    alertMessage: ''
  },
  mainBoard: {
    mode: 'exchange',
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
  order: []
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
          alertMessage: action.alertMessage
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
        order: action.order
      }
    case ACTION.LOG_OUT:
      return {
        login: false
      }
    default:
      return state
  }
}
