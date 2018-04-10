import React from 'react'
import PropTypes from 'prop-types'
import { SearchRoute, AirportMap, AirportCongestion } from '..'
import './ExtraBoard.css'

const ExtraBoard = () => (
  <div className='extra-board__container'>
    <SearchRoute />
    <AirportMap />
    <AirportCongestion />
  </div>
)
export default ExtraBoard
