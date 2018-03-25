import * as ACTION from '../action'
import { deepCopy } from '../util'

const modeInitState = {
  sideboard: 'login',
  mainboard: 'exc'
}
export function mode (state = modeInitState, action) {
  switch(action.type) {
    case ACTION.CHANGE_MODE:
      return deepCopy(state, {
        sideboard: action.sideboard || state.sideboard,
        mainboard: action.mainboard || state.mainboard
      })
    default:
      return state
  }
}
const excInitState = {
  loaded: false,
  entry: [],
  excData: {},
  measure: [],
  serviceRate: {}
}
export function exc (state = excInitState, action) {
  switch(action.type) {
    case ACTION.RENEW_EXC:
      return deepCopy(state, {
        loaded: true,
        entry: action.entry,
        excData: action.excData,
        measure: action.measure,
        serviceRate: action.serviceRate
      })
    default:
      return state
  }
}
export function etc (state = {}, action) {
  return state
}
