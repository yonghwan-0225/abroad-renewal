export function equals (e1, e2) {
  if (typeof e1 === 'object') {
    if (typeof e1 != typeof e2) return false
    for (let e in e1) {
        if (typeof e1[e] === 'object') {
          if (typeof e2[e] !== 'object' || !equals (e1[e], e2[e])) return false
        } else {
          if (typeof e2[e] !== typeof e1[e] || e1[e] !== e2[e]) return false
        }
    }
  } else {
    if (typeof e1 != typeof e2 || e1 != e2) return false
  }
  return true
}
export function insertComma (value) {
  let valueWithComma = value
  let idxOfDot = valueWithComma.indexOf('.')
  idxOfDot = idxOfDot != -1 ? idxOfDot : valueWithComma.length
  let count = 0
  for (let i = idxOfDot - 3; i > 0; i--) {
    if (count % 3 === 0) valueWithComma = valueWithComma.substring(0, i) + ',' + valueWithComma.substring(i)
    count = count + 1
  }
  return valueWithComma
}
export function sortExc (erData) {
  return {
    fromW: _sortExc(deepCopy(erData), 'fromW'),
    toW: _sortExc(deepCopy(erData), 'toW')
  }
}
function _sortExc (erData, method) {
  const sortedExc = {}
  let sortMethod
  if (method === 'fromW') {
    sortMethod = (e1, e2) => Number(e1.fromW) > Number(e2.fromW)
  } else {
    sortMethod = (e1, e2) => Number(e1.toW) < Number(e2.toW)
  }
  for (let e in erData) {
    sortedExc[e] = erData[e].sort(sortMethod)
  }
  return sortedExc
}
export function deepCopy (target, option) {
  let copy
  if (Object.prototype.toString.call(target) === '[object Object]') {
    copy = Object.assign({}, target)
  } else if (Object.prototype.toString.call(target) === '[object Array]') {
    copy = Object.assign([], target)
  } else {
    return option !== undefined ? option : target
  }
  for (let child in copy) {
    copy[child] = deepCopy(copy[child])
  }
  if (Object.prototype.toString.call(option) === '[object Object]') {
    for (let key in option) {
      copy[key] = deepCopy(copy[key], option[key])
    }
  }
  return copy
}
export function mergeIfExist (target, option) {
  if (option) return deepCopy(target, option)
  else return target
}
export function excType2String (typeNo) {
  switch(typeNo) {
    case 1:
      return '₩ >> $'
    case 2:
      return '₩ >> €'
    case 3:
      return '₩ >> 元'
    case 4:
      return '₩ >> ￥'
    case 5:
      return '$ >> ₩'
    case 6:
      return '€ >> ₩'
    case 7:
      return '元 >> ₩'
    case 8:
      return '￥ >> ₩'
    default:
      return 'undefined'
  }
}
export function excType2From (typeNo) {
  switch(typeNo) {
    case 1:
    case 2:
    case 3:
    case 4:
      return '₩'
    case 5:
      return '$'
    case 6:
      return '€'
    case 7:
      return '元'
    case 8:
      return '￥'
    default:
      return 'undefined'
  }
}
export function excType2To (typeNo) {
  switch(typeNo) {
    case 1:
      return '$'
    case 2:
      return '€'
    case 3:
      return '元'
    case 4:
      return '￥'
    case 5:
    case 6:
    case 7:
    case 8:
      return '₩'
    default:
      return 'undefined'
  }
}
