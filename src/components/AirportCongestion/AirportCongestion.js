import React from 'react'
import PropTypes from 'prop-types'
import { airportCongestionURL } from '../../config'
import { Phrase } from '..'

const AirportCongestion = () => {
  function handleClick () {
    window.open(airportCongestionURL, "pop", `width=${window.innerWidth}, height=${window.innerHeight}, scrollbars=yes, resizable=yes`)
  }
  return (
    <Phrase value='공항 혼잡도' onClick={handleClick} className={{ text: 'basic-phrase' }} />
  )
}
export default AirportCongestion
