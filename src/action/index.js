export const RENEW_EXC = 'RE'
export const CHANGE_MODE = 'MC'

export const renewExc = ({ entry, excData, measure, serviceRate }) => ({
  type: RENEW_EXC,
  entry,
  excData,
  measure,
  serviceRate
})
export const changeMode = ({ sideboard, mainboard }) => ({
  type: CHANGE_MODE,
  sideboard,
  mainboard
})
