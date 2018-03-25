export const SET_BRAKE = 'SB'
export const CLEAR_BRAKE = 'CB'
export const RENEW_EXC = 'RE'
export const CHANGE_MODE = 'MC'
export const LOG_IN = 'LI'
export const LOG_OUT = 'LO'

export const setBrake = ({ brake }) => ({
  type: SET_BRAKE,
  brake
})
export const clearBrake = () => ({
  type: CLEAR_BRAKE
})
export const renewExc = ({ entry, excData, measure, serviceRate }) => ({
  type: RENEW_EXC,
  entry,
  excData,
  measure,
  serviceRate
})
export const changeMode = ({ sideBoard, mainBoard }) => ({
  type: CHANGE_MODE,
  sideBoard,
  mainBoard
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
  tpye: LOG_OUT
})
