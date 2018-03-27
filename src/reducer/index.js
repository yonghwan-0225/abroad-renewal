import * as ACTION from '../action'
import { deepCopy } from '../util'

const appInitState = {
  brake: 'none',
  alertMessage: ''
}
const modeInitState = {
  sideBoard: 'login',
  mainBoard: 'exchange'
}
const excInitState = {
  loaded: false
}
const userInitState = {
  login: false,
  order: []
}
export function app (state = appInitState, action) {
  switch(action.type) {
    case ACTION.SET_BRAKE:
      return deepCopy(state, {
        brake: action.brake
      })
    case ACTION.CLEAR_BRAKE:
      return deepCopy(state, {
        brake: 'none',
        alertMessage: action.alertMessage
      })
    default:
      return state
  }
}
export function mode (state = modeInitState, action) {
  switch(action.type) {
    case ACTION.CHANGE_MODE:
      return deepCopy(state, {
        sideBoard: action.sideBoard || state.sideBoard,
        mainBoard: action.mainBoard || state.mainBoard
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
