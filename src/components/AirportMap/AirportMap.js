import React from 'react'
import PropTypes from 'prop-types'
import { airportMapURL } from '../../config'
import { Phrase } from '..'

const AirportMap = () => {
  function handleClick () {
    window.open(airportMapURL, "pop", `width=960px, height=${window.innerHeight}, scrollbars=yes, resizable=yes`)
  }
  return (
    <Phrase value='공항가서 뭐 먹지?' onClick={handleClick} className={{ text: 'basic-phrase' }} />
  )
}
export default AirportMap
