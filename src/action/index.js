export const SET_BRAKE = 'SB'
export const CLEAR_BRAKE = 'CB'
export const CHANGE_MODE = 'CM'
export const RENEW_EXC = 'RE'
export const LOG_IN = 'LI'
export const LOG_OUT = 'LO'

export const setBrake = ({ board }) => ({
  type: SET_BRAKE,
  board
})
export const clearBrake = ({ board, alertMessage }) => ({
  type: CLEAR_BRAKE,
  board,
  alertMessage
})
export const changeMode = ({ board, mode }) => ({
  type: CHANGE_MODE,
  board,
  mode
})
export const renewExc = ({ entry, excData, measure, serviceRate }) => ({
  type: RENEW_EXC,
  entry,
  excData,
  measure,
  serviceRate
})
export const login = ({ userData, orderData }) => ({
  type: LOG_IN,
  id: userData.id,
  name: userData.name,
  email: userData.email,
  phone: userData.phone,
  address: userData.address,
  order: orderData
})
export const logout = () => ({
  type: LOG_OUT
})
