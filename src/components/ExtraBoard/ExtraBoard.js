import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SearchRoute, AirportMap } from '..'
import './ExtraBoard.css'

const ExtraBoard = () => (
  <div className='extra-board__container'>
    <SearchRoute />
    <AirportMap />
  </div>
)
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
ExtraBoard.propTypes = {
}
ExtraBoard.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(ExtraBoard)
